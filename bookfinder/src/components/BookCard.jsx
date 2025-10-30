import React from "react";

function truncate(text, n = 120) {
  if (!text) return "";
  return text.length > n ? text.slice(0, n) + "…" : text;
}

export default function BookCard({ book }) {
  const {
    title,
    authors,
    imageLinks,
    description,
    averageRating,
    infoLink,
    publisher,
    publishedDate,
  } = book;
  const thumb =
    (imageLinks?.thumbnail || imageLinks?.smallThumbnail || "")
      .replace(/^http:\/\//i, "https://");

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-slate-100 hover:border-indigo-200 flex flex-col min-h-0">
      {/* decorative background */}
      <div className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden>
        <div className="h-full w-full rounded-2xl bg-gradient-to-br from-indigo-300 via-violet-300 to-pink-300 blur-md opacity-20"></div>
      </div>

      {/* card content */}
      <div className="relative z-10 p-4 flex flex-col h-full min-h-0">
        {/* cover - make shorter on small screens, taller on md+ */}
        <div className="relative flex-none h-44 md:h-56 w-full rounded-lg bg-slate-100 overflow-hidden">
          {thumb ? (
            <img
              src={thumb}
              alt={title}
              className="max-h-full w-auto mx-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">No cover</div>
          )}

          {/* overlay (absolute) - does not affect layout */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
            <div className="p-3 w-full opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-300">
              <p className="text-xs text-white/90 line-clamp-2">{truncate(description, 90)}</p>
            </div>
          </div>

          {/* badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-white/80 text-xs text-slate-800 px-2 py-1 rounded-full shadow-sm">
              {averageRating ? `★ ${averageRating}` : "No rating"}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 text-xs text-slate-700 px-2 py-1 rounded-full shadow-sm">
              {publisher ? `${publisher}` : publishedDate ? publishedDate : "—"}
            </span>
          </div>
        </div>

        {/* text/content area */}
        <div className="mt-4 flex-1 flex flex-col min-h-0">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">{title}</h3>
          <p className="mt-1 text-xs text-slate-500">{authors?.slice(0, 2).join(", ")}</p>

          <p className="mt-3 text-sm text-slate-600 flex-1 overflow-hidden">{truncate(description, 140)}</p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              {book.pageCount ? `${book.pageCount} pages` : "—"}
            </div>

            <div className="flex items-center gap-2">
              {infoLink ? (
                <a
                  href={infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md shadow-sm transition"
                >
                  Preview
                </a>
              ) : (
                <button
                  className="inline-flex items-center text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md"
                  disabled
                >
                  Preview
                </button>
              )}

              <button
                className="text-xs text-indigo-600 hover:underline px-2 py-1"
                onClick={(e) => {
                  e.preventDefault();
                }}
                aria-label={`See details for ${title}`}
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}