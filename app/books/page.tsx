"use client";

import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  status: string;
  rating?: number | null;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/books`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError("Error loading books");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <main className="p-8">
        <p>Loading books...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Books
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div
            key={book.id}
            className="rounded-lg bg-white p-4 shadow"
          >
            <h2 className="text-xl font-bold">
              {book.title}
            </h2>

            <p className="text-gray-600">
              {book.author}
            </p>

            <p className="mt-2">
              Status: {book.status}
            </p>

            <p>
              Rating: {book.rating ?? "N/A"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}