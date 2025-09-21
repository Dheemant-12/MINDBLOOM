import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoodLog } from "@/entities/MoodLog";
import { Flame, Star, BarChart } from "lucide-react";
import { format, subDays, isSameDay } from "date-fns";

export default function UserStats() {
  const [stats, setStats] = useState({
    totalLogs: 0,
    longestStreak: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateStats = async () => {
      try {
        const logs = await MoodLog.list("-date");
        if (!logs || logs.length === 0) {
          setIsLoading(false);
          return;
        }

        // Total logs
        const totalLogs = logs.length;

        // Longest streak
        let longestStreak = 0;
        let currentStreak = 0;
        const sortedLogs = logs.sort((a, b) => new Date(b.date) - new Date(a.date));
        const logDates = sortedLogs.map(log => new Date(log.date));
        
        // Remove duplicate dates
        const uniqueLogDates = logDates.filter((date, index, self) =>
          index === self.findIndex((d) => isSameDay(d, date))
        );

        if (uniqueLogDates.length > 0) {
            currentStreak = 1;
            longestStreak = 1;
            for (let i = 0; i < uniqueLogDates.length - 1; i++) {
                const diff = (uniqueLogDates[i] - uniqueLogDates[i+1]) / (1000 * 60 * 60 * 24);
                if (diff === 1) {
                    currentStreak++;
                } else {
                    longestStreak = Math.max(longestStreak, currentStreak);
                    currentStreak = 1;
                }
            }
            longestStreak = Math.max(longestStreak, currentStreak);
        }

        setStats({ totalLogs, longestStreak });
      } catch (error) {
        console.error("Error calculating stats:", error);
      }
      setIsLoading(false);
    };

    calculateStats();
  }, []);

  const statItems = [
    {
      label: "Total Moods Logged",
      value: stats.totalLogs,
      icon: BarChart,
      color: "from-blue-400 to-cyan-400"
    },
    {
      label: "Longest Streak",
      value: `${stats.longestStreak} days`,
      icon: Flame,
      color: "from-orange-400 to-red-400"
    },
    {
      label: "Badges Earned",
      value: "Coming Soon", // Placeholder
      icon: Star,
      color: "from-yellow-400 to-amber-400"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-4">
        {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="glass-effect gentle-shadow border-0">
                <CardContent className="p-4">
                    <div className="animate-pulse flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {statItems.map((item, index) => (
        <Card key={index} className="glass-effect gentle-shadow border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${item.color}`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="font-bold text-lg text-gray-800">{item.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}