"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  status: string;
  rating?: number | null;
}

export default function BookDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchBook() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch book");
      }

      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id]);

  async function markAsRead() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "read",
            rating: 5,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      await fetchBook();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteBook() {
    const confirmed = confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      router.push("/books");
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <main className="p-8">
        <p>Loading...</p>
      </main>
    );
  }

  if (!book) {
    return (
      <main className="p-8">
        <p>Book not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow">
        <h1 className="mb-2 text-3xl font-bold">
          {book.title}
        </h1>

        <p className="mb-4 text-gray-600">
          {book.author}
        </p>

        <p className="mb-2 capitalize">
          Status: {book.status.replaceAll("_", " ")}
        </p>

        <p className="mb-6">
          Rating: {book.rating ?? "N/A"}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={markAsRead}
            className="w-fit rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Mark as Read
          </button>

          <button
            onClick={deleteBook}
            className="w-fit rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete Book
          </button>
        </div>
      </div>
    </main>
  );
}