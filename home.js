import React from "react";
import WelcomeCard from "../components/home/WelcomeCard";
import QuickActions from "../components/home/QuickActions";
import MoodStreak from "../components/home/MoodStreak";

export default function Home() {
  return (
    <div className="p-4 md:p-8 pb-20 lg:pb-8 max-w-6xl mx-auto">
      <div className="space-y-6">
        <WelcomeCard />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          <div>
            <MoodStreak />
          </div>
        </div>
      </div>
    </div>
  );
}