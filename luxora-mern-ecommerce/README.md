# LUXORA — E-Commerce Store

A full storefront (Express + React + Node.js) with:

- **Home page** — hero, category strip, "Popular in Women", promo banner, "New Collections"
- **Shoes**, **Dresses**, **Watches**, **Perfumes** pages — 64 products total, each with a Men / Women / All filter
- **Login / Register page** with JWT auth
- **Cart** with an "Add to cart" button on every product, a cart badge in the navbar, and a full cart page
- **Footer** with working Company / Products / Offices / About / Contact pages + social icons + a real newsletter subscription form
- Fully responsive design with breakpoints at **1280px, 1024px, 800px, and 500px**
- A custom "LUXORA" color/type system (plum, blush, gold, rose) — no default templates

**No database to install.** Product/user/cart data is stored in a local JSON
file (`server/data/db.json`) that's created automatically the first time the
server starts — no MongoDB, no service, nothing to configure. Product photos
live in `client/public/assets/products/<category>/` — `npm start` (see step 3)
downloads the real photos into that folder for you automatically.

---

## 1. Project structure

```
luxora-mern-ecommerce/
├── server/               Express API
│   ├── config/db.js        local JSON database loader
│   ├── config/store.js     generic collection helpers (find/create/save)
│   ├── models/              Product, User, Cart
│   ├── routes/               auth, products, cart
│   ├── middleware/auth.js
│   ├── data/db.json          created automatically on first run
│   ├── seed.js                loads the 64-product catalogue
│   ├── server.js
│   └── .env.example
└── client/                React app (Vite)
    └── src/
        ├── components/    Navbar, Footer, ProductCard
        ├── pages/          Home, Shoes, Dresses, Watches, Perfumes, Login, Cart,
        │                     Company, Products, Offices, About, Contact
        ├── context/         CartContext, AuthContext
        ├── data/products.js    fallback data if the API is offline
        └── styles/           one CSS file per page/component
    └── public/assets/products/   product photos — downloaded automatically by "npm start" (shoes/dresses/watches/perfumes)
```

---

## 2. Prerequisites

- [Node.js](https://nodejs.org) v18+ installed
- VS Code (or any editor)

That's it — no database software to install.

---

## 3. Run everything with one command (recommended)

From the **root** `luxora-mern-ecommerce` folder, the only command you ever need is:

```bash
npm start
```

The first time you run it, it automatically:
1. Installs the server's and client's dependencies
2. Creates `server/.env` from `server/.env.example`
3. Seeds the 64-product catalogue into the local database
4. Downloads the real product photos into `client/public/assets/products/` (needs an internet connection for this one step)
5. Starts **both** the Express API (port 5000) and the React app (port 3000) together

Every step above is skipped automatically once it's already done, so `npm start` is also exactly what you run every time after that — no other commands, no re-installing, no re-seeding, no re-downloading images.

Then open **http://localhost:3000**. Press `Ctrl+C` once to stop both.

If you ever want to reset the catalogue back to the original 64 products, delete `server/data/db.json` and run `npm start` again. If you'd rather run the server and client separately (e.g. to see each one's logs on its own), see the manual steps below.

---

## 3b. Manual backend setup (Express + local database)

```bash
cd server
npm install
cp .env.example .env
```

Load the product catalogue into the local database:

```bash
npm run seed
```

Start the API server:

```bash
npm run dev
```

You should see:

```
✅ Local database ready: .../server/data/db.json
🚀 LUXORA server running on http://localhost:5000
```

---

## 4b. Manual frontend setup (React + Vite)

Open a **second terminal**:

```bash
cd client
npm install
npm run dev
```

Vite will start the site at **http://localhost:3000**. Any request to `/api/...` is automatically proxied to your Express server on port 5000 (see `vite.config.js`).

> If you skip the backend setup, the site still renders using built‑in sample data (`src/data/products.js`) and bundled images, so the UI is always browsable. Add-to-cart, login, and register need the backend running to actually persist data.

---

## 5. Using the site

- **Home** (`/`) — hero banner, category tiles (Shoes / Dresses / Watches / Perfumes), popular picks, promo banner
- **Shoes** (`/shoes`), **Dresses** (`/dresses`), **Watches** (`/watches`), **Perfumes** (`/perfumes`) — each has an All / Men / Women toggle
- **Login** (`/login`) — toggle between Sign In and Create Account; successful auth stores a JWT in `localStorage`
- **Cart** (`/cart`) — click the cart icon in the navbar, adjust quantities, see subtotal/shipping/total
- **Company / Products / Offices / About** — brand content pages, linked from the footer
- **Contact** (`/contact`) — a real contact form that saves messages via the backend (`POST /api/contact`)
- **Newsletter** — the footer subscribe form calls the backend (`POST /api/newsletter/subscribe`) and stores emails locally

---

## 6. Opening in VS Code

```bash
code luxora-mern-ecommerce
```

Recommended: open two integrated terminals side-by-side — one running `npm run dev` in `server/`, one running `npm run dev` in `client/`. Or just use `npm start` from the root, which does both at once.

---

## 7. Customizing

- **Colors/fonts/breakpoints** — all design tokens live in `client/src/styles/global.css` (`:root` variables) — change once, it updates everywhere.
- **Products** — edit `server/seed.js` and re-run `npm run seed`, or add products via `POST /api/products`.
- **Product images** — replace any file in `client/public/assets/products/<category>/` with your own photo, keeping the same filename (e.g. `s1.jpg`).
- **Brand name/logo** — search for "LUXORA" across `client/src` and swap in your own name; the circular "LX" seal is generated from CSS, not an image file.
- **Resetting all data** — delete `server/data/db.json` and run `npm run seed` again.

Enjoy building on top of it! 🛍️
