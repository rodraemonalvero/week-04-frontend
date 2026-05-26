import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow">
        <h1 className="mb-4 text-4xl font-bold">Book Tracker</h1>

        <p className="mb-6 text-gray-700">
          A full stack CRUD app for tracking books you want to read, are
          reading, and have finished.
        </p>

        <Link
          href="/books"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          View My Books
        </Link>
      </div>
    </main>
  );
}