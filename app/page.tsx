"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow">
        <h1 className="mb-4 text-4xl font-bold text-blue-600">
          Book Tracker
        </h1>

        <p className="mb-6 text-gray-700">
          Track books you want to read, are currently reading,
          and already finished.
        </p>

        <div className="flex gap-4">
          <Link
            href="/books"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            View Books
          </Link>

          <Link
            href="/books/new"
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Add Book
          </Link>
        </div>
      </div>
    </main>
  );
}