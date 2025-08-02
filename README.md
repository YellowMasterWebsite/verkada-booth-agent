# Verkada Booth Agent

A lightweight Next.js + Tailwind frontend for BD booth assignment and customer logging.

## 🧪 Local Setup

```bash
npm install
npm run dev
```

### Environment Variable

Create a `.env.local` file with:

```
NEXT_PUBLIC_N8N_URL=https://tulikajatrele1.app.n8n.cloud/webhook-test
```

## 🚀 Vercel Deployment

1. Push this repo to GitHub
2. Go to [https://vercel.com/import](https://vercel.com/import)
3. Set the following environment variable in Vercel Dashboard:

```
NEXT_PUBLIC_N8N_URL=https://tulikajatrele1.app.n8n.cloud/webhook-test
```

Done ✅