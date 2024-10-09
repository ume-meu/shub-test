import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="mb-4 text-3xl font-bold text-[#1e2a5e]">Welcome to Fuel Tracker</h1>
      <Link href="/tracker">
        <button className="text-sm bg-[#1e2a5e] h-fit text-[#edf1fb] hover:bg-[#2e3e86] rounded-lg px-4 py-2 whitespace-nowrap">
          Go to Tracker Form
        </button>
      </Link>
    </div>
  );
}
