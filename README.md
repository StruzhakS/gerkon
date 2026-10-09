# Геркон · GPON інтернет у Закарпатті

Статичний сайт на React, TypeScript і Vite для збору заявок на підключення. Основний домен налаштований на `gerkon.com`; тарифи, міста покриття, контакти й FAQ зібрані в `src/data/siteData.ts`.

## Локальний запуск

Потрібен Node.js 22 або новіший.

```bash
npm install
npm run dev
```

Production-перевірка та локальний перегляд зібраної версії:

```bash
npm run build
npm run preview
```

## Форми та Telegram

Фронтенд надсилає форму на Cloudflare Worker. Токен Telegram Bot зберігається лише в Worker secrets: **не задавайте `VITE_TELEGRAM_BOT_TOKEN` чи `VITE_TELEGRAM_CHAT_ID` для production**, оскільки всі `VITE_*` значення вбудовуються у відкриті файли сайту. Порожні змінні у `.env.example` наведені лише як нагадування про небезпечний client-side підхід.

1. Створіть Telegram-бота через BotFather і дізнайтеся `chat_id` цільового чату. Додайте бота до чату та надайте дозвіл надсилати повідомлення.
2. У `wrangler.toml` задайте дозволений домен у `ALLOWED_ORIGIN`.
3. Установіть Wrangler (`npm install --save-dev wrangler`) та авторизуйте його (`npx wrangler login`).
4. Додайте секрети й опублікуйте Worker:

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler deploy
```

5. Скопіюйте URL Worker у `.env` як `VITE_LEAD_ENDPOINT`, наприклад `https://gerkon-leads.<account>.workers.dev`, та перебудуйте сайт.

Worker перевіряє origin, метод, формат номера й розмір запиту. Для додаткового захисту від спаму увімкніть Cloudflare Turnstile та rate limiting і перевіряйте токен Turnstile у Worker перед надсиланням до Telegram.

### EmailJS замість Worker

За потреби можна ввімкнути EmailJS без змін у компоненті форми: задайте `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` і `VITE_EMAILJS_PUBLIC_KEY`. Використовуйте лише публічний ключ EmailJS і налаштуйте обмеження домену у кабінеті EmailJS. Якщо EmailJS налаштований повністю, заявка надсилається через нього; інакше використовується Telegram Worker.

## GitHub Pages

1. Запуште проєкт у GitHub у гілку `main` і в налаштуваннях репозиторію відкрийте **Settings → Pages → Build and deployment → GitHub Actions**.
2. Додайте `VITE_LEAD_ENDPOINT` (та, за потреби, EmailJS публічні значення) до **Settings → Secrets and variables → Actions → Variables**. Для цього репозиторію використовуйте `vars` у workflow або зберігайте `.env` лише локально; не комітьте секрети.
3. Workflow `.github/workflows/deploy.yml` збирає `dist` і публікує сайт після кожного push у `main`.
4. Власний домен уже заданий у `public/CNAME`. Додайте DNS-записи нижче та перевірте HTTPS у налаштуваннях Pages.

Vite використовує `base: '/'`, що відповідає кореневому домену `gerkon.com`. Для тимчасового GitHub Pages URL у підкаталозі проєкту потрібно змінити `base` на шлях репозиторію.

## Власний домен gerkon.com і Cloudflare

У реєстратора домену або Cloudflare DNS створіть записи для GitHub Pages:

- `A` для `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- `CNAME` для `www`: `<github-username>.github.io`.
- Якщо GitHub показує додаткові IPv6 `AAAA` адреси, додайте також рекомендовані ним записи.

Увімкніть **Enforce HTTPS** у GitHub Pages. Для Cloudflare DNS почніть із режиму **DNS only** для apex-записів до завершення перевірки домену та випуску сертифіката GitHub Pages; потім за потреби увімкніть proxy й перевірте режим SSL/TLS **Full (strict)**. Redirect `www` на apex налаштуйте одним способом, щоб уникнути циклів. Рекомендовано ввімкнути Brotli, кешування статичних ресурсів і мінімізацію CSS/JS; не кешуйте відповіді Worker із заявками.

## Перед публікацією

- Підтвердіть телефон, email, Telegram-посилання, години роботи й адресу у `src/data/siteData.ts` та JSON-LD у `index.html`.
- Перевірте реальні ціни, склад тарифів і фактичні умови резервного живлення. Суми в `src/data/siteData.ts` — демонстраційні приклади, які потрібно замінити до запуску.
- У відгуках не наведені вигадані оцінки: додайте реальні відгуки клієнтів лише після отримання згоди.
- Перевірте Open Graph preview на цільових соціальних платформах; частина платформ не підтримує SVG-зображення.
- Налаштуйте Vite env для production build у GitHub Actions перед запуском форми.