# Технический план MVP

**Дата:** 2026-04-26
**Статус:** [ ] В разработке

---

## 1. Схема базы данных (Prisma)

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  password      String
  subscriptionTier String @default("free") // free, basic, discounted
  createdAt     DateTime @default(now())
  children      Child[]
}

model Child {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  code         String   // ID ребёнка (не ФИО!)
  ageMonths    Int
  gender       String
  createdAt    DateTime @default(now())
  assessments  Assessment[]
}

model Assessment {
  id              String   @id @default(cuid())
  childId         String
  child           Child    @relation(fields: [childId], references: [id])
  date            DateTime @default(now())
  module1Score    Int      // Социальная коммуникация
  module2Score    Int      // Речь и язык
  module3Score    Int      // Игра
  module4Score    Int      // Стереотипии
  module5Score    Int      // Адаптивное поведение
  totalScore      Int
  riskLevel       String   // low, moderate, high
  reports         Report[]
}

model Report {
  id            String   @id @default(cuid())
  assessmentId  String
  assessment    Assessment @relation(fields: [assessmentId], references: [id])
  pdfUrl        String?
  createdAt     DateTime @default(now())
}
```

---

## 2. API эндпоинты

### Auth

- `POST /api/auth/register` — регистрация
- `POST /api/auth/login` — вход
- `POST /api/auth/logout` — выход

### Children

- `GET /api/children` — список детей пользователя
- `POST /api/children` — создать нового ребёнка
- `GET /api/children/[id]` — данные ребёнка
- `PUT /api/children/[id]` — обновить данные
- `DELETE /api/children/[id]` — удалить (мягкое удаление)

### Assessments

- `POST /api/assessments` — создать новую диагностику
- `GET /api/assessments/[id]` — получить результаты
- `GET /api/assessments?childId=[id]` — история диагностик ребёнка

### Reports

- `POST /api/reports/[id]/generate-pdf` — сгенерировать PDF
- `GET /api/reports/[id]` — данные отчёта
- `GET /api/reports/[id]/download` — скачать PDF

---

## 3. Frontend роуты

- `/login` — вход
- `/register` — регистрация
- `/dashboard` — главная (список детей)
- `/children/new` — создать ребёнка
- `/children/[id]` — профиль ребёнка
- `/children/[id]/assessments/new` — новая диагностика
- `/assessments/[id]` — результаты диагностики
- `/reports/[id]` — отчёт
- `/settings` — настройки аккаунта

---

## 4. Интеграции

- **NextAuth.js** — авторизация (email/password)
- **Prisma** — ORM для PostgreSQL
- **jsPDF** — генерация PDF
- **Recharts** — графики для отчётов
- **Resend** — отправка email (подтверждение регистрации)

---

## 5. Фазы разработки

### Фаза 1: Setup (1 неделя)

- [ ] Инициализация Next.js проекта
- [ ] Настройка Prisma + PostgreSQL
- [ ] Настройка NextAuth.js
- [ ] Базовая структура папок

### Фаза 2: Auth (1 неделя)

- [ ] Регистрация
- [ ] Вход
- [ ] Защищённые роуты
- [ ] Подтверждение email

### Фаза 3: Core functionality (6-8 недель)

- [ ] CRUD для детей
- [ ] Форма диагностики (5 модулей)
- [ ] Расчёт результатов
- [ ] Генерация PDF
- [ ] Графики

### Фаза 4: Testing (2-4 недели)

- [ ] Альфа с амбассадорами
- [ ] Баг-фиксы
- [ ] Улучшение UX

---

## 6. Приоритеты

**P0 (критично для MVP):**

- Авторизация
- Создание ребёнка
- Проведение диагностики
- Генерация PDF отчёта

**P1 (важно, можно отложить):**

- История диагностик
- Редактирование данных
- Настройки

**P2 (после MVP):**

- Экспорт в Excel
- Печать из браузера
- Темная тема

---

**Дата последнего обновления:** 2026-04-26
