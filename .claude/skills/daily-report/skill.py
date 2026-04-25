#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Daily Report Skill для проекта СпектраМаяк
Собирает технический отчёт за последние 24 часа
"""

import os
import sys
import subprocess
import re
from datetime import datetime, timedelta
from pathlib import Path

# Настройка кодировки для Windows
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

# Конфигурация
PROJECT_ROOT = Path("g:/DOM PROEKT")
PLANS_DIR = PROJECT_ROOT / "plans"
HISTORY_DIR = PROJECT_ROOT / ".business" / "история"
REPORTS_DIR = PROJECT_ROOT / ".business" / "отчёты"


def run_git_command(cmd):
    """Выполняет git команду и возвращает вывод"""
    full_cmd = f"cd \"{PROJECT_ROOT}\" && {cmd}"
    result = subprocess.run(full_cmd, shell=True, capture_output=True, text=True)
    return result.stdout.strip()


def get_git_stats():
    """Собирает статистику по коммитам за последние 24 часа"""
    # Получаем коммиты за последние 24 часа
    commits = run_git_command(
        'git log --since="24 hours ago" --pretty=format:"%h|%s|%an" --shortstat'
    )

    if not commits:
        return {
            "commits_count": 0,
            "files_changed": 0,
            "lines_added": 0,
            "lines_deleted": 0,
            "commit_messages": []
        }

    commit_list = []
    stats = {
        "commits_count": 0,
        "files_changed": 0,
        "lines_added": 0,
        "lines_deleted": 0,
        "commit_messages": []
    }

    lines = commits.split('\n')
    current_commit = None

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Строка с коммитом: hash|message|author
        if '|' in line and re.match(r'^[a-f0-9]+\|', line):
            parts = line.split('|')
            if len(parts) >= 2:
                current_commit = parts[1]
                stats["commits_count"] += 1
                stats["commit_messages"].append(current_commit)

        # Строка со статистикой: X files changed, Y insertions(+), Z deletions(-)
        elif 'files? changed' in line or 'file changed' in line:
            # Парсим статистику
            files_match = re.search(r'(\d+) files? changed', line)
            if files_match:
                stats["files_changed"] += int(files_match.group(1))

            insertions_match = re.search(r'(\d+) insertions?', line)
            if insertions_match:
                stats["lines_added"] += int(insertions_match.group(1))

            deletions_match = re.search(r'(\d+) deletions?', line)
            if deletions_match:
                stats["lines_deleted"] += int(deletions_match.group(1))

    return stats


def get_todays_history():
    """Читает файлы истории за сегодня"""
    today = datetime.now().strftime("%Y-%m-%d")
    history_content = []

    if not HISTORY_DIR.exists():
        return history_content

    # Ищем файлы за сегодня
    for file in HISTORY_DIR.glob(f"{today}*.md"):
        try:
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
                # Извлекаем заголовок и первые 3 строки содержания
                lines = content.split('\n')
                if len(lines) > 0:
                    history_content.append(f"### {file.name}")
                    history_content.extend(lines[:5])  # Заголовок + пару строк
                    history_content.append("...")
        except Exception as e:
            history_content.append(f"Ошибка чтения {file.name}: {e}")

    return history_content


def get_closed_phases():
    """Находит закрытые фазы в планах"""
    closed_phases = []
    in_progress_phases = []

    if not PLANS_DIR.exists():
        return closed_phases, in_progress_phases

    # Получаем список изменённых файлов за 24 часа
    changed_files = run_git_command(
        'git diff --name-only --since="24 hours ago"'
    ).split('\n')

    # Находим сегодня по названию
    today = datetime.now().strftime("%Y-%m-%d")
    todays_plans = list(PLANS_DIR.glob(f"{today}*.md"))

    # Находим изменённые планы
    changed_plans = [
        PLANS_DIR / f for f in changed_files
        if f.startswith('plans/') and f.endswith('.md')
    ]

    # Объединяем (сначала сегодняшние)
    all_plans = list(set(todays_plans + changed_plans))

    for plan_file in all_plans:
        if not plan_file.exists():
            continue

        try:
            with open(plan_file, 'r', encoding='utf-8') as f:
                content = f.read()
                lines = content.split('\n')

                current_section = None
                for i, line in enumerate(lines):
                    # Ищем секцию фазы
                    if line.strip().startswith('##') and 'фаза' in line.lower():
                        current_section = line.strip()
                        continue

                    # Ищем закрытую фазу [x]
                    if re.search(r'^- \[x\]', line):
                        phase_text = re.sub(r'^- \[x\]\s*', '', line).strip()
                        closed_phases.append({
                            'plan': plan_file.name,
                            'section': current_section,
                            'phase': phase_text
                        })

                    # Ищем фазу в процессе [ ]
                    elif re.search(r'^- \[ \]', line):
                        phase_text = re.sub(r'^- \[ \]\s*', '', line).strip()
                        in_progress_phases.append({
                            'plan': plan_file.name,
                            'section': current_section,
                            'phase': phase_text
                        })

        except Exception as e:
            print(f"Ошибка при чтении {plan_file.name}: {e}")

    return closed_phases, in_progress_phases


def generate_report():
    """Генерирует отчёт"""
    print("[INFO] Собираю данные за последние 24 часа...")

    # Собираем данные
    git_stats = get_git_stats()
    history = get_todays_history()
    closed_phases, in_progress_phases = get_closed_phases()

    # Формируем отчёт
    today = datetime.now().strftime("%Y-%m-%d")
    report_lines = [
        f"# Ежедневный отчёт: {today}",
        "",
        "## [STATS] Статистика коммитов",
        f"- Коммитов: {git_stats['commits_count']}",
        f"- Файлов изменено: {git_stats['files_changed']}",
        f"- Строк добавлено: +{git_stats['lines_added']}",
        f"- Строк удалено: -{git_stats['lines_deleted']}",
        "",
    ]

    # Закрытые фазы
    if closed_phases:
        report_lines.append("## [DONE] Сделано")
        for phase in closed_phases[:10]:  # Максимум 10
            report_lines.append(f"- {phase['phase']}")
        if len(closed_phases) > 10:
            report_lines.append(f"... и ещё {len(closed_phases) - 10}")
        report_lines.append("")

    # В процессе
    if in_progress_phases:
        report_lines.append("## [WIP] В процессе")
        for phase in in_progress_phases[:5]:
            report_lines.append(f"- {phase['phase']}")
        if len(in_progress_phases) > 5:
            report_lines.append(f"... и ещё {len(in_progress_phases) - 5}")
        report_lines.append("")

    # История
    if history:
        report_lines.append("## [HISTORY] История")
        report_lines.extend(history[:10])  # Первые 10 строк
        report_lines.append("")

    # Заблокировано (пока заглушка, можно расширить)
    report_lines.append("## [BLOCKED] Заблокировано")
    report_lines.append("- Нет активных блокеров")
    report_lines.append("")

    # Соединяем всё
    report = '\n'.join(report_lines)

    # Выводим в консоль
    print("\n" + "="*50)
    print(report)
    print("="*50 + "\n")

    # Сохраняем в файл
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    report_file = REPORTS_DIR / f"{today}.md"

    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)

    print(f"[DONE] Отчёт сохранён: {report_file}")
    print(f"[STATS] Коммитов: {git_stats['commits_count']}, Файлов: {git_stats['files_changed']}")
    print(f"[STATS] Закрыто фаз: {len(closed_phases)}, В процессе: {len(in_progress_phases)}")


if __name__ == "__main__":
    generate_report()
