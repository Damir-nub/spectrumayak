# Skill Creator - Создание скиллов для Claude

## Что такое скилл?

Скилл - это папка с файлом `SKILL.md`, содержащим инструкции в формате Markdown с YAML-метаданными. Claude загружает эти инструкции динамически для выполнения специализированных задач.

## Структура скилла

```
my-skill/
└── SKILL.md    ← основной файл скилла
```

## Шаблон скилла

Базовый шаблон находится в [`template/SKILL.md`](template/SKILL.md):

```markdown
---
name: my-skill-name
description: A clear description of what this skill does and when to use it
---

# My Skill Name

[Add your instructions here that Claude will follow when this skill is active]

## Examples

- Example usage 1
- Example usage 2

## Guidelines

- Guideline 1
- Guideline 2
```

## Обязательные поля

- **`name`** - уникальный идентификатор скилла (строчные буквы, дефисы вместо пробелов)
- **`description`** - полное описание того, что делает скилл и когда его использовать

## Как создать свой скилл

### Вариант 1: Использовать /skill-create

1. Откройте Claude Code
2. Введи команду: `/skill-create`
3. Следуй инструкциям

### Вариант 2: Вручную

1. Создай новую папку в `.claude/skills/`: `mkdir my-skill`
2. Скопируй шаблон: `cp .claude/skills/skill-creator/template/SKILL.md .claude/skills/my-skill/SKILL.md`
3. Отредактируй `SKILL.md`:
   - Измени `name` на имя скилла
   - Измени `description` на описание
   - Добавь инструкции после `---`
4. Используй скилл: упомяни его имя в сообщении Claude

## Пример скилла

```markdown
---
name: spectrum-mayak-reports
description: Генерирует отчёты диагностики РАС по методикам M-CHAT-R, ADOS-2, VB-MAPP для проекта СпектраМаяк
---

# СпектраМаяк - Генератор отчётов

Ты помогаешь генерировать структурированные отчёты диагностики РАС (расстройства аутистического спектра) для дефектологов, логопедов и психологов.

## Методики

- M-CHAT-R: скрининг для детей 16-30 месяцев
- ADOS-2: наблюдение и диагностика
- VB-MAPP: оценка речевого поведения

## Формат отчёта

1. Вводная информация (возраст, анамнез)
2. Результаты по каждой методике
3. Заключение и рекомендации
4. Графики и визуализации

## Пример использования

Пользователь: "Создай отчёт по M-CHAT-R для ребёнка 2 лет"
→ Скилл активируется и сгенерирует структурированный отчёт
```

## Полезные ресурсы

- [Agent Skills стандарт](https://agentskills.io)
- [Что такое скиллы?](https://support.claude.com/en/articles/12512176-what-are-skills)
- [Как создавать скиллы](https://support.claude.com/en/articles/12512198-creating-custom-skills)
- [Официальный репозиторий Anthropic](https://github.com/anthropics/skills)
