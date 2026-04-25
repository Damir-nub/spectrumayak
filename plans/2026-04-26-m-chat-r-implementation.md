# План реализации M-CHAT-R

**Дата:** 2026-04-26
**Статус:** [ ] В разработке
**Приоритет:** КРИТИЧЕСКИЙ ДЛЯ MVP

---

## Обзор методики M-CHAT-R

**Полное название:** Modified Checklist for Autism in Toddlers, Revised

**Возраст:** 16-30 месяцев

**Количество вопросов:** 20 вопросов (да/нет)

**Цель:** скрининг риска расстройства аутистического спектра (РАС)

**Авторы:** Diana Robins, Deborah Fein, Marianne Barton

---

## Структура методики

### 20 вопросов M-CHAT-R

1. Does your child enjoy being swung, bounced on your knee, etc.? (Ваш ребёнок любит, когда его качают, подбрасывают на коленях и т.д.?)
2. Does your child take interest in other children? (Ваш ребёнок интересуется другими детьми?)
3. Does your child like climbing on things, such as up stairs? (Ваш ребёнок любит карабкаться по предметам, например, по лестнице?)
4. Does your child enjoy playing peek-a-boo/hide-and-seek? (Ваш ребёнок любит играть в прятки/ку-ку?)
5. Does your child ever pretend, for example, to talk on the phone or take care of dolls, or pretend other things? (Ваш ребёнок когда-нибудь притворяется, например, разговаривает по телефону, ухаживает за куклами, или делает вид, что что-то делает?)
6. Does your child ever use his/her index finger to point, to ask for something? (Ваш ребёнок когда-нибудь использует указательный палец, чтобы попросить что-то?)
7. Does your child ever use his/her index finger to point, to indicate interest in something? (Ваш ребёнок когда-нибудь использует указательный палец, чтобы указать на что-то, что его интересует?)
8. Can your child play properly with small toys (e.g., cars or bricks) without just mouthing, fiddling, or dropping them? (Ваш ребёнок может правильно играть с маленькими игрушками (например, машинками, кубиками), а не просто пробовать их на вкус, крутить в руках или ронять?)
9. Does your child ever bring objects over to you (parent) to show you something? (Ваш ребёнок когда-нибудь приносит вам (родителю) предметы, чтобы показать вам что-то?)
10. Does your child look you in the eye for more than a second or two? (Ваш ребёнок смотрит вам в глаза более одной-двух секунд?)
11. Does your child ever seem oversensitive to noise? (e.g., plugging ears) (Ваш ребёнок когда-нибудь кажется чрезмерно чувствительным к шуму? (например, зажимает уши))
12. Does your child smile in response to your face or your smile? (Ваш ребёнок улыбается в ответ на ваше лицо или вашу улыбку?)
13. Does your child imitate you? (e.g., you make a face-will your child imitate it?) (Ваш ребёнок имитирует вас? (например, вы строите рожицу — ваш ребёнок повторяет?))
14. Does your child respond to his/her name when you call? (Ваш ребёнок реагирует на своё имя, когда вы его зовёте?)
15. If you point at a toy across the room, does your child look at it? (Если вы укажете на игрушку через комнату, ваш ребёнок посмотрит на неё?)
16. Does your child walk? (Ваш ребёнок ходит?)
17. Does your child look at things you are looking at? (Ваш ребёнок смотрит на то, на что смотрите вы?)
18. Does your child make unusual finger movements near his/her face? (Ваш ребёнок делает необычные движения пальцами near лица?)
19. Does your child try to attract your attention to his/her own activity? (Ваш ребёнок пытается привлечь ваше внимание к своей собственной деятельности?)
20. Have you ever wondered if your child is deaf? (Вы когда-нибудь задумывались, не глухой ли ваш ребёнок?)

**Ответы:** Да / Нет

---

## Алгоритм подсчёта результатов

### Шаг 1: Определить "risk items"

Критические вопросы (вносят наибольший вклад):

- Question 2: Interest in other children
- Question 7: Pointing to indicate interest
- Question 9: Bringing objects to show
- Question 13: Imitation
- Question 14: Responding to name
- Question 15: Looking at pointed object

### Шаг 2: Подсчёт баллов

**Каждый ответ "Нет" = 1 балл** (для вопросов 2, 7, 9, 13, 14, 15)
**Каждый ответ "Да" = 0 баллов**

**Для остальных вопросов:**

- Некоторые вопросы имеют обратный счёт (нужно уточнить в оригинальной методике)

### Шаг 3: Определение риска

**Low Risk (Низкий риск):**

- 0-2 балла → продолжать наблюдение

**Medium Risk (Средний риск):**

- 3-7 баллов → рекомендована дополнительная диагностика

**High Risk (Высокий риск):**

- 8+ баллов → немедленная консультация специалиста

---

## Структура отчёта

### Страница 1: Основные результаты

**Заголовок:**

```
Результаты скрининга M-CHAT-R
Ребёнок: [ID]
Возраст: [возраст в месяцах]
Дата прохождения: [дата]
```

**Блок 1: Общий результат**

```
РISK: [Low/Medium/High]
Баллы: [количество]/20
Рекомендация: [текст рекомендация]
```

**Блок 2: Детализация по вопросам**

```
✅ / ❌ Вопрос 1: [текст вопроса]
Ответ: [Да/Нет]

✅ / ❌ Вопрос 2: [текст вопроса]
Ответ: [Да/Нет]
...
```

**Блок 3: График**

```
[График с ответами на вопросы]
- Ось X: номера вопросов
- Ось Y: ответы (0 = Да, 1 = Нет)
- Выделение цветом: risk items
```

### Страница 2: Рекомендации

**Блок 1: Интерпретация результата**

```
При [Low/Medium/High] риске рекомендуется:
- [конкретные рекомендации]
- [конкретные действия]
```

**Блок 2: Дисклеймер**

```
⚠️ Заключение сформировано автоматически на основании введённых данных.
Является вспомогательным инструментом для специалиста.
Не является медицинским диагнозом.
```

---

## Схема базы данных

### Таблица: `children`

```sql
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,  -- условный код ребёнка (не ФИО)
  age_months INTEGER NOT NULL,       -- возраст в месяцах (не точная дата рождения)
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Таблица: `assessments`

```sql
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES children(id),
  method VARCHAR(50) NOT NULL,        -- 'MCHATR'
  status VARCHAR(20) NOT NULL,        -- 'IN_PROGRESS', 'COMPLETED'
  total_score INTEGER,
  risk_level VARCHAR(20),             -- 'LOW', 'MEDIUM', 'HIGH'
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

### Таблица: `responses`

```sql
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID REFERENCES assessments(id),
  question_number INTEGER NOT NULL,   -- 1-20
  question_text TEXT NOT NULL,
  answer BOOLEAN NOT NULL,            -- true = Да, false = Нет
  is_risk_item BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Таблица: `users` (для авторизации)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  subscription_type VARCHAR(20),      -- 'FREE', 'STANDARD', 'DISCOUNTED'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Техническая реализация

### Frontend (Next.js 14)

**Компоненты:**

- `MCHATRForm.tsx` — форма с 20 вопросами
- `MCHATRResult.tsx` — отображение результатов
- `MCHATRPDF.tsx` — генерация PDF

**State management:**

- React Context или Zustand для хранения ответов
- Промежуточное сохранение в localStorage

### Backend (Next.js API Routes)

**Endpoints:**

- `POST /api/assessments/start` — создать новую оценку
- `POST /api/assessments/:id/responses` — сохранить ответы
- `GET /api/assessments/:id/result` — получить результат
- `GET /api/assessments/:id/pdf` — сгенерировать PDF

### Генерация PDF

**Библиотека:** `jsPDF` или `react-pdf`

**Процесс:**

1. Получить данные оценки из БД
2. Сформировать структуру отчёта
3. Сгенерировать PDF
4. Вернуть файл пользователю

---

## Тестирование

### Тест-кейс 1: Низкий риск

**Входные данные:** 2 ответа "Нет" (остальные "Да")
**Ожидаемый результат:** Risk Level = LOW, Recommendation = "Продолжать наблюдение"

### Тест-кейс 2: Средний риск

**Входные данные:** 5 ответов "Нет" (включая 2 risk items)
**Ожидаемый результат:** Risk Level = MEDIUM, Recommendation = "Рекомендована дополнительная диагностика"

### Тест-кейс 3: Высокий риск

**Входные данные:** 10+ ответов "Нет" (включая 5+ risk items)
**Ожидаемый результат:** Risk Level = HIGH, Recommendation = "Немедленная консультация специалиста"

---

## Сроки реализации

**Неделя 1:**

- [ ] Изучить оригинальную методику M-CHAT-R
- [ ] Уточнить алгоритм подсчёта баллов
- [ ] Подготовить текст вопросов на русском

**Неделя 2:**

- [ ] Создать схему БД (Prisma schema)
- [ ] Реализовать API endpoints
- [ ] Сделать базовую форму ввода

**Неделя 3:**

- [ ] Реализовать алгоритм подсчёта результатов
- [ ] Сделать страницу с результатами
- [ ] Добавить генерацию PDF

**Неделя 4:**

- [ ] Тестирование на себе
- [ ] Баг-фиксы
- [ ] Подготовка к запуску

---

## Следующие шаги

1. [ ] Найти оригинальную методику M-CHAT-R (английский вариант)
2. [ ] Уточнить лицензирование для коммерческого использования
3. [ ] Перевести вопросы на русский (или найти существующий перевод)
4. [ ] Создать Prisma schema

---

**Дата последнего обновления:** 2026-04-26
**Статус:** [ ] Требует проверки авторских прав
