# Step-by-step instructions

## 1. Replace the repo contents

1. Download the zip.
2. Extract it locally.
3. Open your existing repo folder.
4. Delete the current project contents except the `.git` folder.
5. Copy everything from this zip into that repo folder.
6. Commit the replacement files.

## 2. Configure environment variables

### Backend

1. Go to `giftlink-backend`.
2. Copy `.env.sample` to `.env`.
3. Set:
   - `PORT=5000`
   - `MONGO_URI=your MongoDB connection string`
   - `DB_NAME=giftwrapped`
   - `JWT_SECRET=your secret`
   - `FRONTEND_URL=http://localhost:3000`

### Frontend

1. Go to `giftlink-frontend`.
2. Copy `.env.sample` to `.env`.
3. Set `REACT_APP_API_URL=http://localhost:5000` for local work.

## 3. Install dependencies

### Backend

```bash
cd giftlink-backend
npm install
```

### Frontend

```bash
cd giftlink-frontend
npm install
```

## 4. Seed MongoDB for the screenshot requirement

To create the exact screenshot for the 16 documents task:

```bash
cd giftlink-backend
npm run seed:16
```

Take a screenshot of the terminal after it prints:

```text
Inserted 16 documents into MongoDB.
```

Then run this to load the full catalogue:

```bash
npm run seed:all
```

## 5. Run locally

### Backend

```bash
cd giftlink-backend
npm run dev
```

### Frontend

```bash
cd giftlink-frontend
npm start
```

## 6. Test the pages you need for submission

- Landing page: `/#/`
- Main page before login: `/#/main`
- Search page: `/#/search`
- Gift details page: `/#/gifts/gift-001`
- Login page: `/#/login`
- Register page: `/#/register`
- Profile page: `/#/profile`
- Users page: `/#/users`

## 7. Deploy

Deploy the backend to any Node hosting provider and set the backend environment variables there.
Deploy the frontend to any static hosting provider and set `REACT_APP_API_URL` to your deployed backend URL.

## 8. Capture the screenshots for submission

Use the checklist in `submission/SCREENSHOT_CHECKLIST.md`.

## 9. Push to GitHub

```bash
git add .
git commit -m "Rebuild project as GiftWrapped"
git push origin main
```

## 10. Final manual GitHub tasks

You still need to do these directly on GitHub:

- create at least 5 user stories as issues with labels
- wait for the Actions workflow to pass
- copy the GitHub file links for the code prompts
- submit the repo link, file links, and screenshots
