import React, { useState, useEffect } from "react";
import { MoodLog } from "@/entities/MoodLog";
import MoodLogger from "../components/mood/MoodLogger";
import MoodChart from "../components/mood/MoodChart";
import { format, isToday } from "date-fns";

export default function MoodTracker() {
  const [moodLogs, setMoodLogs] = useState([]);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);

  useEffect(() => {
    loadMoodLogs();
  }, []);

  const loadMoodLogs = async () => {
    try {
      const logs = await MoodLog.list("-date", 30);
      setMoodLogs(logs);
      
      const today = format(new Date(), 'yyyy-MM-dd');
      setHasLoggedToday(logs.some(log => log.date === today));
    } catch (error) {
      console.error("Error loading mood logs:", error);
      setMoodLogs([]);
    }
  };

  const handleMoodLogged = () => {
    loadMoodLogs();
    setHasLoggedToday(true);
  };

  return (
    <div className="p-4 md:p-8 pb-20 lg:pb-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Mood Tracker
        </h1>
        <p className="text-gray-600">
          Track your emotions to understand patterns and celebrate growth
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MoodChart moodLogs={moodLogs} />
        </div>
        
        <div>
          {hasLoggedToday ? (
            <div className="glass-effect gentle-shadow border-0 rounded-xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Great job!
              </h3>
              <p className="text-gray-600 mb-4">
                You've already logged your mood today. Keep up the awesome streak!
              </p>
              <button
                onClick={() => setHasLoggedToday(false)}
                className="text-sm text-purple-600 hover:text-purple-700 underline"
              >
                Want to update your mood?
              </button>
            </div>
          ) : (
            <MoodLogger onMoodLogged={handleMoodLogged} />
          )}
        </div>
      </div>
    </div>
  );
}