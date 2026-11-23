# CineVault

Find your next favorite movie. CineVault lets you search TMDB's movie catalog, browse poster cards, and open a movie to see its overview, release year, language, and rating.

## Features

- Search movies by title
- Browse results with posters, release years, and ratings
- Open a movie for a larger poster and its story overview
- Responsive layout for desktop and mobile
- Loading and API error feedback

## Built with

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs)
- [Vitest](https://vitest.dev/) and Testing Library

## Get started

### Requirements

- Node.js (LTS recommended)
- npm
- A TMDB API key

### Install and run

From the repository root:

```bash
cd MovieDataBase
npm install
```

Create a `.env.local` file in the `MovieDataBase` directory and add your TMDB API key:

```dotenv
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Replace the example value with your own key from your TMDB account. Keep `.env.local` out of version control; this project ignores `*.local` files.

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available commands

Run these from the `MovieDataBase` directory:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test -- --run` | Run the tests once |
| `npm run test` | Run the tests in watch mode |

## API key safety

The app reads the TMDB key from `VITE_TMDB_API_KEY`. **This is configuration, not a private secret:** Vite exposes `VITE_` variables to browser code, and requests to TMDB are made directly from the user's browser. Do not put a sensitive credential in this variable or commit a real key. Use any key restrictions TMDB provides, and rotate the key if it has been exposed. For stronger protection, API requests would need to go through a server that keeps credentials private.

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Project structure

```text
src/
├── components/
│   └── SearchMovies/       # Search form and movie result cards
├── hooks/                  # Movie search hook and tests
├── assets/                 # Static image assets
├── App.jsx                 # App shell and selected movie details
└── main.jsx                # React entry point
```
