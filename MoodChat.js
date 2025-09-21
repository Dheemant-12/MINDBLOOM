import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays } from "date-fns";

export default function MoodChart({ moodLogs }) {
  const getMoodScore = (mood) => {
    const scores = {
      very_happy: 10,
      happy: 8,
      excited: 9,
      grateful: 8,
      neutral: 5,
      sad: 3,
      stressed: 2,
      anxious: 2,
      angry: 1,
      overwhelmed: 1
    };
    return scores[mood] || 5;
  };

  const prepareChartData = () => {
    const last14Days = Array.from({ length: 14 }, (_, i) => {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const log = moodLogs.find(log => log.date === dateStr);
      
      return {
        date: format(date, 'MMM d'),
        mood_score: log ? getMoodScore(log.mood) : null,
        intensity: log ? log.intensity : null,
        hasData: !!log
      };
    }).reverse();

    return last14Days;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (data.hasData) {
        return (
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/20 gentle-shadow">
            <p className="font-medium">{label}</p>
            <p className="text-sm text-blue-600">
              Mood Score: {data.mood_score}/10
            </p>
            <p className="text-sm text-purple-600">
              Intensity: {data.intensity}/10
            </p>
          </div>
        );
      }
    }
    return null;
  };

  const chartData = prepareChartData();

  return (
    <Card className="glass-effect gentle-shadow border-0">
      <CardHeader>
        <CardTitle>Mood Trends (Last 14 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 69, 19, 0.1)" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#8B4513"
              />
              <YAxis 
                domain={[0, 10]}
                tick={{ fontSize: 12 }}
                stroke="#8B4513"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="mood_score" 
                stroke="url(#moodGradient)" 
                strokeWidth={3}
                dot={{ r: 6, fill: "#8B7CF6" }}
                connectNulls={false}
              />
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#A8C8E1" />
                  <stop offset="50%" stopColor="#B8A9C9" />
                  <stop offset="100%" stopColor="#87A96B" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Track your mood daily to see patterns and celebrate your wellness journey! 📈
          </p>
        </div>
      </CardContent>
    </Card>
  );
}