# Платёжная интеграция

**Дата:** 2026-04-26
**Статус:** [ ] Не начата

---

## Провайдер: ЮKassa

**Почему ЮKassa:**

- Российский провайдер (работает с 2022 года)
- Поддержка рекуррентных платежей
- API для подписок
- reasonable fees (от 2.9% + фиксированная сумма)

---

## Архитектура

### 1. Создание платежа

**Endpoint:** `POST /api/payments/create`

**Request:**

```json
{
  "tier": "basic" | "discounted",
  "period": "monthly" | "annual"
}
```

**Response:**

```json
{
  "paymentId": "string",
  "confirmationUrl": "string",
  "amount": 1500
}
```

**Логика:**

1. Пользователь нажимает "Оплатить"
2. Frontend отправляет запрос на `/api/payments/create`
3. Backend создаёт платеж в ЮKassa
4. ЮKassa возвращает `confirmationUrl`
5. Frontend перенаправляет пользователя на `confirmationUrl`
6. Пользователь вводит данные карты
7. ЮKassa обрабатывает платёж
8. ЮKassa отправляет webhook на наш сервер

---

### 2. Webhook от ЮKassa

**Endpoint:** `POST /api/payments/webhook`

**Request от ЮKassa:**

```json
{
  "event": "payment.succeeded",
  "object": {
    "id": "payment_id",
    "metadata": {
      "userId": "user_id",
      "tier": "basic"
    }
  }
}
```

**Логика:**

1. ЮKassa отправляет webhook при успешном платеже
2. Backend проверяет подпись webhook'а (безопасность!)
3. Backend обновляет `subscriptionTier` пользователя
4. Backend отправляет email пользователю об успешной оплате
5. Backend возвращает 200 OK ЮKassa

---

### 3. Проверка статуса подписки

**Endpoint:** `GET /api/payments/subscription-status`

**Response:**

```json
{
  "tier": "basic" | "discounted" | "free",
  "status": "active" | "cancelled" | "expired",
  "nextPaymentDate": "2026-05-26"
}
```

**Используется на frontend:**

- Показать/скрыть платные функции
- Показать баннер "Оплатите подписку"
- Показать дату следующего платежа

---

### 4. Отмена подписки

**Endpoint:** `POST /api/payments/cancel`

**Логика:**

1. Пользователь нажимает "Отменить подписку"
2. Frontend отправляет запрос на `/api/payments/cancel`
3. Backend отменяет рекуррентный платёж в ЮKassa
4. Backend обновляет статус подписки на `cancelled`
5. Пользователь имеет доступ до конца оплаченного периода

---

## Безопасность

### 1. Не хранить данные карт на сервере

- Все данные карт хранятся в ЮKassa
- Мы храним только `paymentId` и `subscriptionId`

### 2. Проверка подписи webhook'ов

- Каждый webhook от ЮKassa подписан секретом
- Backend должен проверять подпись перед обработкой
- Это предотвращает подделку webhook'ов

### 3. SSL для всех запросов

- Все API endpoints должны работать только по HTTPS
- В development можно использовать HTTP, но не в production

### 4. Rate limiting

- Ограничить количество запросов на `/api/payments/create`
- Предотвратить спам созданием платежей

---

## Тестирование

### 1. Тестовый режим ЮKassa

- Использовать тестовые ключи ЮKassa для development
- Тестовые карты для симуляции успешных/неуспешных платежей

### 2. Тестовые сценарии

- [ ] Успешный платёж
- [ ] Неуспешный платёж (недостаточно средств)
- [ ] Отмена платежа пользователем
- [ ] Webhook не приходит (retry logic)
- [ ] Дубликат webhook (idempotency)

### 3. Нагрузочное тестирование

- [ ] 10 одновременных платежей
- [ ] 100 одновременных платежей
- [ ] Webhook при большом количестве пользователей

---

## Интеграция с UI

### Кнопка "Оплатить"

**Компонент:** `SubscribeButton.tsx`

```tsx
interface SubscribeButtonProps {
  tier: "basic" | "discounted";
  period: "monthly" | "annual";
}

export function SubscribeButton({ tier, period }: SubscribeButtonProps) {
  const handleClick = async () => {
    const response = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier, period }),
    });

    const { confirmationUrl } = await response.json();

    // Перенаправление на платёжную форму
    window.location.href = confirmationUrl;
  };

  const price = tier === "basic" ? 1500 : 500;

  return <button onClick={handleClick}>Оплатить {price} ₽/месяц</button>;
}
```

---

## Стек

- **Библиотека:** `yookassa` (неофициальная Node.js библиотека)
- **Или:** HTTP запросы через `fetch` / `axios`
- **Environment variables:**
  - `YOOKASSA_SHOP_ID`
  - `YOOKASSA_SECRET_KEY`
  - `YOOKASSA_WEBHOOK_SECRET`

---

## Стоимость

**Тарифы ЮKassa:**

- 2.9% + 9.9 ₽ за транзакцию (до 10 млн ₽/месяц)
- Бесплатное тестирование

**Ежемесячная стоимость (30 пользователей по 1500 ₽):**

- Выручка: 45 000 ₽
- Комиссия ЮKassa: ~1 500 ₽
- Чистая выручка: ~43 500 ₽

---

## Следующие шаги

1. [ ] Зарегистрироваться в ЮKassa
2. [ ] Получить тестовые ключи
3. [ ] Создать endpoints (`/api/payments/create`, `/api/payments/webhook`)
4. [ ] Реализовать проверку подписи webhook'ов
5. [ ] Протестировать в тестовом режиме
6. [ ] Подключить production ключи
7. [ ] Протестировать с реальной картой (маленькая сумма)
8. [ ] Запустить для пользователей

---

**Дата последнего обновления:** 2026-04-26
