import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(q) {
    if (!q) return;
    setQuery(q);
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=24`
      );
      const data = await res.json();
      setBooks((data.items || []).map((it) => it.volumeInfo));
    } catch (e) {
      setError("Failed to fetch results.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <header className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            BookFinder
          </h1>
          <p className="mt-2 text-indigo-100/90 max-w-2xl">
            Discover books quickly — search by title, author or keyword.
          </p>
          <div className="mt-6">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {error && (
          <div className="mb-6 text-red-600 bg-red-50 p-3 rounded-md">{error}</div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg p-4 shadow">
                <div className="h-48 bg-slate-200 rounded" />
                <div className="mt-3 h-4 bg-slate-200 rounded w-3/4" />
                <div className="mt-2 h-3 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center text-slate-600">
            Try searching for "javascript", "mystery", or an author name.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((b, idx) => (
              <BookCard key={b.industryIdentifiers?.[0]?.identifier || idx} book={b} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t py-6 text-center text-sm text-slate-500">
        Built with the Google Books API — lightweight responsive UI.
      </footer>
    </div>
  );
}
