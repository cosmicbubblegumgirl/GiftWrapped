# Assignment requirements map

## Prompt 1
Public GitHub repo created from the template.

This zip includes `submission/USER_STORIES_AND_LABELS.md` with five ready-to-copy user stories and labels.
You must create those as GitHub issues manually because issues cannot be created from a zip file.

## Prompt 2
Screenshot that shows 16 documents imported into MongoDB.

Use:

```bash
cd giftlink-backend
npm run seed:16
```

## Prompt 3
`giftlink-backend/models/db.js`

Contains `await client.connect();`

## Prompt 4
`giftlink-backend/routes/giftRoutes.js`

Contains `connectToDatabase()` inside the `router.get('/', async ...)` scope.

## Prompt 5
`giftlink-backend/routes/giftRoutes.js`

Contains:

- `"/"` route serving `/api/gifts`
- `"/:id"` route serving `/api/gifts/:id`

## Prompt 6
`giftlink-backend/routes/searchRoutes.js`

Contains category filtering with:

```js
const query_category = req.query.category;
```

## Prompt 7
`giftlink-backend/app.js`

Contains route registration for `/api/search`.

## Prompt 8
`giftlink-backend/sentiment/index.js`

Contains:

```js
const natural = require('natural');
```

## Prompt 9
`giftlink-frontend/src/components/RegisterPage/RegisterPage.js`

Contains a fetch request with:

- `method: 'POST'`
- `headers`
- `'content-type': 'application/json'`

## Prompt 10
`giftlink-frontend/src/components/LoginPage/LoginPage.js`

Contains a fetch request with:

- `'content-type'`
- `Authorization`

## Prompt 11
`giftlink-backend/routes/authRoutes.js`

Contains `collection.findOne()` to look up users.

## Prompt 12
Landing page screenshot

Use `/#/` after deployment.

## Prompt 13
MainPage before login screenshot

Use `/#/main` after deployment.

## Prompt 15
Logged-in page with username in navbar

Log in using the demo account, then take a screenshot on `/#/main` or `/#/profile` showing the navbar.

## Prompt 16
Gift details page screenshot

Use `/#/gifts/gift-001` after deployment.

## Prompt 17
Search results screenshot

Use `/#/search`, search or filter gifts, then capture the visible matching results.

## Prompt 18
Successful CI/CD screenshot

Push to GitHub and open the Actions tab after the `CI/CD` workflow passes.
