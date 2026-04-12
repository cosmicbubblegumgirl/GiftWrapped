# Screenshot checklist

## Required screenshots

### 1. MongoDB import screenshot
Run:

```bash
cd giftlink-backend
npm run seed:16
```

Capture the terminal showing `Inserted 16 documents into MongoDB.`

### 2. Landing page screenshot
Open your deployed frontend at `/#/` and capture the page with the deployment URL visible in the browser.

### 3. Main page before login screenshot
Open `/#/main` and capture the page with the deployment URL visible.

### 4. Logged-in navbar screenshot
Log in with:
- Email: `demo@giftwrapped.local`
- Password: `password123`

Capture a page showing `Hello, Demo Gifter` in the navbar and the deployment URL in the browser.

### 5. Gift details screenshot
Open `/#/gifts/gift-001` and capture the details page with the deployment URL visible.

### 6. Search results screenshot
Open `/#/search`, choose a category or search term, and capture the visible filtered results with the deployment URL visible.

### 7. CI/CD screenshot
Open GitHub → Actions → `CI/CD` and capture the successful workflow run.
