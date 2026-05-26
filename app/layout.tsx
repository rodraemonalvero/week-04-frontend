import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Tracker",
  description: "Full stack book tracker app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b bg-white p-4 shadow-sm">
          <div className="mx-auto flex max-w-5xl gap-6">
            <Link href="/" className="font-semibold text-blue-600">
              Home
            </Link>

            <Link href="/books" className="font-semibold text-blue-600">
              My Books
            </Link>

            <Link href="/books/new" className="font-semibold text-blue-600">
              Add Book
            </Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}