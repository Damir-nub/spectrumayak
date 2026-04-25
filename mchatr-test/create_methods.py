# -*- coding: utf-8 -*-
import json

methods = [
    {
        "id": "mchatr",
        "title": "1. M-CHAT-R: Скрининг аутизма (16-30 мес)",
        "description": "Modified Checklist for Autism in Toddlers - 20 вопросов",
        "type": "screening",
        "questions": [
            {"num": 1, "text": "Любит качели/подбрасывания?", "critical": False, "hint": "Качает на качелях, подбрасывает в воздух, 'ёх-ёх'"},
            {"num": 2, "text": "Интересуется другими детьми?", "critical": True, "hint": "Смотрит на детей, подходит, пытается взаимодействовать"},
            {"num": 3, "text": "Лазает по предметам (лестница)?", "critical": False, "hint": "Карабкается на мебель, лесенки"},
            {"num": 4, "text": "Играет в прятки?", "critical": False, "hint": "Прячется и показывает, смеётся"},
            {"num": 5, "text": "Притворяется (телефон, куклы)?", "critical": False, "hint": "Кормит куклу, 'разговаривает' по игрушке"},
            {"num": 6, "text": "Указывает пальцем чтобы попросить?", "critical": False, "hint": "Показывает на желаемую игрушку"},
            {"num": 7, "text": "Указывает пальцем на интересующее?", "critical": True, "hint": "Показывает на самолёт, собаку"},
            {"num": 8, "text": "Правильно играет с игрушками?", "critical": False, "hint": "Катает машинку, а не только грызёт"},
            {"num": 9, "text": "Приносит предметы показать?", "critical": True, "hint": "Подносит чтобы вы посмотрели"},
            {"num": 10, "text": "Смотрит в глаза 1-2+ секунды?", "critical": False, "hint": "Держит зрительный контакт"},
            {"num": 11, "text": "Чувствителен к шуму (зажимает уши)?", "critical": False, "hint": "Плачет от громких звуков"},
            {"num": 12, "text": "Улыбается в ответ на вашу улыбку?", "critical": False, "hint": "Улыбается когда вы улыбаетесь"},
            {"num": 13, "text": "Имитирует вас (повторяет)?", "critical": True, "hint": "Повторяет 'пока-пока', хлопает"},
            {"num": 14, "text": "Реагирует на своё имя?", "critical": True, "hint": "Оборачивается когда зовёте"},
            {"num": 15, "text": "Смотрит на указанную игрушку?", "critical": True, "hint": "Следит за указыванием"},
            {"num": 16, "text": "Ходит самостоятельно?", "critical": False, "hint": "Ходит без поддержки"},
            {"num": 17, "text": "Смотрит туда же куда и вы?", "critical": False, "hint": "Следит за вашим взглядом"},
            {"num": 18, "text": "Необычные движения пальцами у лица?", "critical": False, "hint": "Вертит пальцами перед глазами"},
            {"num": 19, "text": "Привлекает внимание к себе?", "critical": False, "hint": "Говорит 'смотри!', показывает"},
            {"num": 20, "text": "Задумывались о глухоте?", "critical": False, "hint": "Был период подозрения на глухоту"}
        ],
        "options": [{"value": "yes", "label": "Да"}, {"value": "no", "label": "Нет"}]
    },
    {
        "id": "fast",
        "title": "2. FAST: Функция поведения",
        "description": "Functional Analysis Screening - 16 вопросов",
        "type": "fba",
        "questions": [
            {"num": 1, "text": "Поведение когда ребёнок один?", "func": "attention", "hint": "Никто не смотрит, заняты"},
            {"num": 2, "text": "Поведение когда вы заняты?", "func": "attention", "hint": "Говорите по телефону, готовите"},
            {"num": 3, "text": "Перестаёт при внимании?", "func": "attention", "hint": "Вы смотрите/говорите - behaviour stops"},
            {"num": 4, "text": "Поведение при заданиях?", "func": "escape", "hint": "Просите одеться, есть"},
            {"num": 5, "text": "Перестаёт если снять требование?", "func": "escape", "hint": "Не настаиваете - behaviour stops"},
            {"num": 6, "text": "Поведение когда хочет что-то?", "func": "tangible", "hint": "Хочет игрушку, еду"},
            {"num": 7, "text": "Перестаёт при получении желаемого?", "func": "tangible", "hint": "Получил - behaviour stops"},
            {"num": 8, "text": "Поведение независимо от окружения?", "func": "sensory", "hint": "Один/с людьми - одинаково"},
            {"num": 9, "text": "Продолжается даже когда всё есть?", "func": "sensory", "hint": "Не прекращается ни от чего"},
            {"num": 10, "text": "Выглядит довольным во время?", "func": "sensory", "hint": "Улыбается, смеётся"},
            {"num": 11, "text": "Усиливается при возбуждении?", "func": "sensory", "hint": "Стресс, усталость"},
            {"num": 12, "text": "Для получения реакции?", "func": "attention", "hint": "Добивается внимания"},
            {"num": 13, "text": "Чтобы избежать задания?", "func": "escape", "hint": "Начинается при требованиях"},
            {"num": 14, "text": "Когда не может выразить желание?", "func": "tangible", "hint": "Не может попросить"},
            {"num": 15, "text": "При многих стимулах (шум, люди)?", "func": "sensory", "hint": "Магазины, праздники"},
            {"num": 16, "text": "При смене routine?", "func": "escape", "hint": "Меняете распорядок"}
        ],
        "options": [{"value": "yes", "label": "Да часто"}, {"value": "sometimes", "label": "Иногда"}, {"value": "no", "label": "Нет"}]
    }
]

with open('methods-data.js', 'w', encoding='utf-8') as f:
    f.write('const methodsData = ')
    json.dump({"methods": methods}, f, ensure_ascii=False, indent=2)
    f.write(';')

print("Создан файл methods-data.js")
