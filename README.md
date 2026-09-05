# KISSAN-BAZAAR 🌾

**Kissan Bazaar** is an online marketplace for farmers and agricultural buyers, built as an OOP + Data Structures course project with a full web UI. It applies object-oriented design and DSA-driven logic (product catalogs, cart operations, search) to a real-world agri-commerce problem.

## Features

- 🛒 **Product marketplace** — browse agricultural products with rich product cards
- 🧺 **Shopping cart** — add/remove items with live totals
- 👤 **Authentication** — signup/login with protected routes and session context
- 📊 **Dashboard** — seller/buyer overview of activity and listings

## Tech Stack

- **React + TypeScript** (Vite)
- **Tailwind CSS** for styling, **Lucide React** icons
- **Supabase** for database and auth
- **React Router** for navigation

## Project Structure

The source lives in the project zips (not yet extracted into the repo):

```
OOPS & DSA FINAL PROJECT.zip   ← final submission (React + TypeScript app)
OOPS DSA PROJECT.zip           ← earlier snapshot
```

Extract and run:

```bash
unzip "OOPS & DSA FINAL PROJECT.zip"
cd "OOPS 99/project"
npm install
npm run dev
```

```
src/
├── components/        # HomePage, Dashboard, Cart, ProductCard
│   └── Auth/          # LoginPage, SignupPage, ProtectedRoute
├── contexts/          # AuthContext (session state)
├── types.ts           # shared domain types (Product, User, ...)
├── App.tsx            # routing
└── main.tsx           # entry point
```

## Course Context

Built as a final project for an **OOP & DSA** course: domain entities are modeled as classes/interfaces, and core marketplace operations (catalog search, cart management) are implemented with classic data structures and algorithms behind the UI.

## License

MIT
