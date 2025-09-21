import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoodLog } from "@/entities/MoodLog";
import { Badge } from "@/components/ui/badge";
import { Flame, Calendar, Smile } from "lucide-react";
import { format, subDays, isToday } from "date-fns";

export default function MoodStreak() {
  const [streak, setStreak] = useState(0);
  const [todayLogged, setTodayLogged] = useState(false);
  const [recentMoods, setRecentMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMoodData();
  }, []);

  const loadMoodData = async () => {
    try {
      const logs = await MoodLog.list("-date", 30);
      const today = format(new Date(), 'yyyy-MM-dd');
      
      setTodayLogged(logs.some(log => log.date === today));
      setRecentMoods(logs.slice(0, 7));
      
      // Calculate streak
      let currentStreak = 0;
      const sortedLogs = logs.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      let checkDate = new Date();
      for (let i = 0; i < 30; i++) {
        const dateStr = format(checkDate, 'yyyy-MM-dd');
        const hasLog = sortedLogs.some(log => log.date === dateStr);
        
        if (hasLog) {
          currentStreak++;
        } else if (i === 0 && !isToday(checkDate)) {
          // If today hasn't been logged, don't break streak yet
          checkDate = subDays(checkDate, 1);
          continue;
        } else {
          break;
        }
        
        checkDate = subDays(checkDate, 1);
      }
      
      setStreak(currentStreak);
    } catch (error) {
      console.error("Error loading mood data:", error);
    }
    setIsLoading(false);
  };

  const getMoodEmoji = (mood) => {
    const emojis = {
      very_happy: "😄",
      happy: "😊", 
      neutral: "😐",
      sad: "😢",
      stressed: "😰",
      anxious: "😟",
      excited: "🤗",
      grateful: "🙏",
      angry: "😠",
      overwhelmed: "🤯"
    };
    return emojis[mood] || "😊";
  };

  if (isLoading) {
    return (
      <Card className="glass-effect gentle-shadow border-0">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="flex gap-2">
              {Array(7).fill(0).map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 rounded-full"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect gentle-shadow border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="w-5 h-5 text-orange-500" />
          Mood Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">{streak}</div>
          <p className="text-sm text-gray-600">day streak</p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Today:</span>
          {todayLogged ? (
            <Badge className="bg-green-100 text-green-800">Logged ✓</Badge>
          ) : (
            <Badge variant="outline">Not logged yet</Badge>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
            <Smile className="w-4 h-4" />
            Recent moods:
          </p>
          <div className="flex gap-1 flex-wrap">
            {recentMoods.length > 0 ? (
              recentMoods.map((log, index) => (
                <div
                  key={log.id}
                  className="text-2xl"
                  title={`${log.mood} on ${format(new Date(log.date), 'MMM d')}`}
                >
                  {getMoodEmoji(log.mood)}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">Start tracking to see your mood patterns</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}