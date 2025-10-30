import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e?.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form onSubmit={submit} className="flex gap-2 max-w-2xl">
      <input
        aria-label="Search books"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search books, authors, ISBN..."
        className="flex-1 rounded-lg border border-transparent shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none px-4 py-3 bg-white"
      />
      <button
        type="submit"
        className="inline-flex items-center rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 shadow"
      >
        Search
      </button>
    </form>
  );
}