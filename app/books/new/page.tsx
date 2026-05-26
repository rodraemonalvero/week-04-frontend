"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewBookPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("want_to_read");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            author,
            status,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create book");
      }

      router.push("/books");
    } catch (err) {
      alert("Error creating book");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">
          Add New Book
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block font-medium">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Author
            </label>

            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded border p-2"
            >
              <option value="want_to_read">
                Want to Read
              </option>

              <option value="reading">
                Reading
              </option>

              <option value="read">
                Read
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {isSubmitting
              ? "Adding..."
              : "Add Book"}
          </button>
        </form>
      </div>
    </main>
  );
}