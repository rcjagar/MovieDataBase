# MovieDataBase - Testing Setup

## Overview
This project now includes:
- ✅ Custom hooks for cleaner code organization (`useMovieSearch`)
- ✅ Environment variables for API key management
- ✅ Vitest + React Testing Library for unit testing
- ✅ Improved error handling and loading states

## Setup Instructions

### Environment Variables
1. Create a `.env.local` file in the root directory (already created)
2. Add your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Project Structure
```
src/
├── components/
│   └── SearchMovies/
│       ├── SearchMovies.jsx
│       └── SearchMovies.css
├── hooks/
│   ├── useMovieSearch.js        # Custom hook for movie search logic
│   └── useMovieSearch.test.js   # Tests for the hook
├── test/
│   └── setup.js                 # Vitest configuration & setup
└── App.jsx
```

## Custom Hooks

### useMovieSearch
Encapsulates all movie search logic including:
- State management (query, movies, loading, error)
- API calls with error handling
- Input validation

**Usage:**
```javascript
const { query, setQuery, movies, isLoading, error, searchMovies } = useMovieSearch();
```

## Features
- Search movies by name
- Display movie cards with poster, title, and overview
- Loading state while fetching
- Error handling with user feedback
- Secure API key management
- Responsive grid layout
- Test coverage with Vitest

## Next Steps
- Add more component tests
- Add integration tests
- Implement movie detail page
- Add favorites feature
