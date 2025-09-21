import React from "react";
import UserStats from "../components/journey/UserStats";
import BadgeCollection from "../components/journey/BadgeCollection";

export default function Journey() {
  return (
    <div className="p-4 md:p-8 pb-20 lg:pb-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          My Wellness Journey
        </h1>
        <p className="text-gray-600">
          Celebrate your progress, milestones, and achievements.
        </p>
      </div>

      <div className="space-y-6">
        <UserStats />
        <BadgeCollection />
        {/* ProgressTimeline component could be added here in the future */}
      </div>
    </div>
  );
}