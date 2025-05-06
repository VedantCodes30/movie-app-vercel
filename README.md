# 🎬 Movie Finder App

A sleek, responsive web app that allows users to search, explore, and discover trending and popular movies using the TMDB API.

---

## 🚀 Tech Stack

- **React** — Frontend Library
- **Vite** — Lightning-fast build tool
- **React Router** — For page navigation
- **Framer Motion** — Smooth page transitions and animations
- **Tailwind CSS** — Styling with utility-first CSS
- **TMDB API** — Movie data source
- **Appwrite** — For storing and tracking search trends
- **Netlify / Vercel** — Hosting platform

---

## 🌟 How to Use the Site

### 1. Home Page

- You'll see a hero banner with a tagline: _Find your Binge!_
- Use the **Search bar** to type the name of a movie.
- The search suggestions will appear with a slight delay (debounced search), displaying relevant results.

### 2. Trending Movies

- Below the search, you’ll find a **Trending Movies** section.
- Each trending movie shows its poster and ranking.
- Click on any trending poster to view detailed information.

### 2. Most Searched

- Below the search, you’ll find a **Trending Movies** section.
- Each trending movie shows its poster and ranking.
- Click on any trending poster to view detailed information.

### 3. All Movies

- Scroll down to see **All Movies** based on your search or popular movies.
- Movies are shown in a neat grid with rating, language, and release year.
- Click on any movie to view its details.

### 4. Movie Details Page

- View large poster, overview, rating, release date, and language info.
- Use the **Go Back** button to return to the homepage.

### 5. 404 Page

- If you enter an invalid route or an incorrect movie ID, a custom themed 404 page will guide you back.

---

## ✅ Deployment

- Clone the repo.
- Create a `.env.local` file.
- Register on TMDB and Appwrite to get your own API KEYS.
- Replace API KEYS with your own API KEYS.
- Set up environment variables for TMDB and Appwrite if you want search tracking.
- Run `pnpm install` (or `npm install`).
- Run locally with `pnpm dev`.
- Deploy on **Vercel** or **Netlify**.

---

## 🎉 Enjoy discovering your next movie obsession!
