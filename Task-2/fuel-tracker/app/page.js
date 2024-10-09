import Link from 'next/link';
import { SiFueler } from "react-icons/si";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <SiFueler className="text-[80px] mb-8 text-[#55679c] animate-spin-slow" />

      <h1 className="mb-4 text-[40px] font-bold text-[#1e2a5e]">Chào mừng đến với Fuel Tracker</h1>
      <Link href="/tracker">
        <button className="text-base bg-[#1e2a5e] h-fit text-[#edf1fb] hover:bg-[#2e3e86] rounded-lg px-6 py-3 whitespace-nowrap">
          Nhập giao dịch
        </button>
      </Link>
    </div>
  );
}
