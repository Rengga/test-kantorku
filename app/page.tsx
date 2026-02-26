import Link from "next/link";
import OnboardingPage from "./onboarding/page";
import AreaAndSubArea from "@/components/areaAndSubArea";

export default function HomePage() {
  return (
    <div className="bg-slate-700 p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-white">Welcome to KantorKu HRIS</h2>

      <OnboardingPage />
      <br />
      <h2 className="text-2xl font-bold mb-4 text-white">Area dan Sub Area</h2>
      <AreaAndSubArea />
    </div>
  );
}
