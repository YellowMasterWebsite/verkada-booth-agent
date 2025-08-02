# Verkada Booth Assignment Tracker

This app lets BD reps:
- Check their booth assignments
- Submit customer interaction logs

## 🧑‍💻 Setup (Vercel or Local)

1. Clone the repo
2. Add this to `.env.local`:

```
NEXT_PUBLIC_N8N_URL=https://tulikajatrele1.app.n8n.cloud/webhook-test
```

3. Run locally:
```bash
npm install
npm run dev
```

4. Or deploy directly to Vercel

## 🔗 Backend

- [GET] https://tulikajatrele1.app.n8n.cloud/webhook-test/get-assignments?email=bd_1@verkada.com  
- [POST] https://tulikajatrele1.app.n8n.cloud/webhook-test/submit-log