<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS Blog API (NestJS + TypeORM)

A backend API built with **NestJS** using a **global response transform interceptor** and **global HTTP exception filter** to enforce a consistent response shape.

This repository includes **Dockerfile** and **docker-compose.yml** for local development/deployment.

---

## ✨ Key Features

* 🚀 **NestJS** modular structure
* 🗄️ **TypeORM** (`data-source.ts`) for database connection and migrations
* 🧩 Domain modules: **auth**, **user**, **posts**
* 🧱 **Global response wrapper** via `src/core/interceptor/transform`
* ❌ **Global exception handling** via `src/core/filter/http-exception`
* ⚙️ Environment config via `.env` / `.env.local`
* 🐳 Docker support (Dockerfile + docker-compose)

---

## 📂 Project Structure

```
src/
├── auth/                          # Auth module (e.g. login/register, JWT, guards/strategy)
├── user/                          # User module
├── posts/                         # Posts module
├── dto/                           # Shared DTOs (if any)
├── core/
│   ├── interceptor/
│   │   └── transform/             # Response transform interceptor
│   └── filter/
│       └── http-exception/        # HTTP exception filter
├── app.module.ts
├── main.ts
└── app.controller.ts

data-source.ts                      # TypeORM DataSource (migrations/config)

docker-compose.yml                  # Local stack (API + DB, etc.)
Dockerfile                          # Container build
```

---

## 📡 API Response Format

All endpoints are wrapped into a consistent structure by the **transform interceptor**.

Example:

```json
{
  "code": 0,
  "message": "ok",
  "data": {}
}
```

* `code === 0`: success
* `code !== 0`: business / validation error

> The **HTTP exception filter** ensures thrown exceptions are also converted into the same response shape.

---

## ⚙️ Environment Variables

Create `.env.local` (recommended for local dev) or `.env` (for production-like runs).

Example:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=nest_user
DB_PASSWORD=Abc123456?
DB_DATABASE=blog
SECRET=Def123456?
```

> Names may vary depending on your `data-source.ts` / config loader. Keep them consistent with your code.

---

## ▶️ Run Locally

### Install

```bash
pnpm install
```

### Development

```bash
pnpm start:dev
```

### Build & Production

```bash
pnpm build
pnpm start:prod
```

---

## 🐳 Docker

### Start with docker-compose

```bash
docker compose up -d
```

### Rebuild

```bash
docker compose up -d --build
```

---

## 🧪 Tests

```bash
pnpm test
pnpm test:e2e
```

---

## Notes

* If you run into character set issues (e.g. Chinese usernames), ensure your **table/columns** are `utf8mb4` (database default alone is not enough).
* The response format is enforced centrally; the frontend can reliably handle `code/message/data`.

---

## License

MIT
