# Prakash Swarnkar Portfolio

A no-build Node.js + Express portfolio website for Prakash Swarnkar, built with vanilla HTML, CSS, JavaScript ES modules, and Three.js.

## Features

- Express server for one-process deployment
- Static frontend served from `public/`
- Portfolio JSON available at `/data/data.json` and `/api/portfolio`
- Resume served through the explicit `/resume` route
- Premium Three.js hero background
- Neo-Brutalist light theme and Obsidian dark theme
- Functional theme persistence via `localStorage`
- Responsive navigation, mobile menu, scroll interactions, and back-to-top link

## Run locally

```bash
npm start
```

Open `http://localhost:3000`.

## Deployment

This app is Vercel-safe and does not require a frontend build step. Deploy the repository as a Node.js project and route requests through `server.js`.
