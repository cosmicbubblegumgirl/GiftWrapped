# GiftWrapped

GiftWrapped is a whimsical full-stack gifting catalogue designed to satisfy the assignment requirements while looking polished and dynamic.

## What is included

- `giftlink-backend/models/db.js` with `await client.connect();`
- `giftlink-backend/routes/giftRoutes.js` with `/` and `/:id` routes and `connectToDatabase()` used inside the route
- `giftlink-backend/routes/searchRoutes.js` with category filtering using `req.query.category`
- `giftlink-backend/routes/authRoutes.js` with `collection.findOne()` for user lookup
- `giftlink-backend/app.js` with `/api/search` and `/api/gifts` route registration
- `giftlink-backend/sentiment/index.js` importing the `natural` package
- React pages for landing, main, search, details, login, register, profile, and users
- 180 preloaded gift items with details and built-in SVG images
- Hover animations that unwrap a gift box over each item image
- A CI/CD workflow and deployment samples
- Submission guides and checklist docs in `/submission`

## Theme direction

GiftWrapped uses a whimsical palette inspired by wrapping paper, satin ribbon, bows, shimmer foil, and keepsake packaging:

- Ribbon red
- Plum velvet
- Lavender tissue
- Mint wrap
- Champagne gold
- Porcelain cream

## Quick start

### Backend

```bash
cd giftlink-backend
cp .env.sample .env
npm install
npm run dev
```

### Frontend

```bash
cd giftlink-frontend
cp .env.sample .env
npm install
npm start
```

### Demo login

- Email: `demo@giftwrapped.local`
- Password: `password123`

## Submission help

Open the docs in `/submission` for:

- step-by-step upload instructions
- where each assignment requirement is satisfied
- the screenshot checklist
- user stories and labels to create in GitHub Issues
