"use client";

import Link from "next/link";
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

        const data: Book[] = await response.json();
        setBooks(data);
      } catch {
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
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Books</h1>

          <Link
            href="/books/new"
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Add Book
          </Link>
        </div>

        {books.length === 0 ? (
          <div className="rounded-lg bg-white p-6 shadow">
            <p className="mb-4 text-gray-700">No books yet.</p>

            <Link
              href="/books/new"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Add your first book
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                className="rounded-lg bg-white p-4 shadow hover:bg-gray-50"
              >
                <h2 className="text-xl font-bold">{book.title}</h2>

                <p className="text-gray-600">{book.author}</p>

                <p className="mt-2">Status: {book.status}</p>

                <p>Rating: {book.rating ?? "N/A"}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}