import React from "react";
import WeeklyInsights from "../components/reports/WeeklyInsights";

export default function Reports() {
  return (
    <div className="p-4 md:p-8 pb-20 lg:pb-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Wellness Reports
        </h1>
        <p className="text-gray-600">
          Discover insights about your mental wellness journey
        </p>
      </div>

      <WeeklyInsights />
    </div>
  );
}