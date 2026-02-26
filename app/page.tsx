import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-slate-700 p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-white">Welcome to KantorKu HRIS</h2>

      <Link href="/onboarding" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Go to Employee Onboarding
      </Link>
    </div>
  );
}
