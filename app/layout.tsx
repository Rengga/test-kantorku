import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <header className="bg-blue-900 text-white p-4 shadow">
          <h1 className="text-xl font-semibold">KantorKu HRIS</h1>
        </header>

        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
