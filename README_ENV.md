# Налаштування змінних середовища

## Backend API URL

Створіть файл `.env.local` в корені проекту та додайте наступну змінну:

```env
NEXT_PUBLIC_API_BASE_URL=https://orthospaceabackendtwo-production.up.railway.app
```

## Опис змінних

- `NEXT_PUBLIC_API_BASE_URL` - URL бекенд API сервера
  - Використовується для всіх API запитів до бекенду
  - Має префікс `NEXT_PUBLIC_` щоб бути доступною на клієнті
  - Fallback: `http://localhost:3002` (для розробки)

## Файли, які використовують цю змінну

- `api/client.ts` - основний API клієнт
- `app/api/*/route.ts` - всі API проксі маршрути
- `src/components/sections/*/*.tsx` - компоненти з прямими API запитами

## Міграція з localhost

Усі жорстко закодовані URL `http://localhost:3002` були замінені на використання змінної середовища для легкого переключення між різними середовищами (розробка, продакшн, staging).
