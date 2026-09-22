# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Tienda Tech" (package name `tienda-react`) — a React 18 + Vite practice/course-exercise app: a product catalog and shopping cart UI in Spanish. No backend; product data is fetched live from the public API `https://dummyjson.com/products` (list, search via `/search?q=`, and a hardcoded category list: beauty, fragrances, furniture, groceries). Checkout just shows an `alert()` and clears the cart.

## Structure

Only 5 source files, all in `src/`:
- `main.jsx` — entry point
- `App.jsx` — fetch logic, search/category/cart state, layout
- `ProductCard.jsx`, `Cart.jsx` — components
- `App.css` — all styling (plain CSS, no modules/Tailwind)

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — ESLint (flat config in `eslint.config.js`, React + hooks rules)

There are no test or format scripts/configs in this project. The `react-hooks` plugin is intentionally scoped to the classic `rules-of-hooks`/`exhaustive-deps` rules only — the plugin's full "recommended" set (v7+) bundles React Compiler rules that flag idiomatic code like `setState` calls inside a fetch effect.

## Gitignore quirk

`.gitignore` excludes all `*.md` files (comment: "Markdown notes and answer guides") — a deliberate rule to keep course-exercise notes/answer keys out of version control. This CLAUDE.md is force-added (`git add -f`) as an intentional exception; don't assume other `.md` files you create will be tracked without doing the same.

## Known issues (documented, not yet fixed)

- `addToCart` in `App.jsx` mutates state directly (`cart.push(...)` then `setCart(cart)`) instead of creating a new array.
- `removeFromCart` removes by `item.category` (`cart.filter(c => c.category !== item.category)`), which deletes every cart item sharing that category instead of just the one clicked.
- `.add-btn` CSS uses `#4a90d9` background with `#5a9ae0` text — low contrast, likely unintentional.
- `.cart` has `z-index: -1`, which would place the cart sidebar behind other content.
