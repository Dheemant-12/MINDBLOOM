
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoodLog } from "@/entities/MoodLog";
import { WeeklyReport } from "@/entities/WeeklyReport";
import { InvokeLLM } from "@/integrations/Core";
import { TrendingUp, Download, Sparkles, Award } from "lucide-react";
import { format, startOfWeek, endOfWeek, subWeeks } from "date-fns";

export default function WeeklyInsights() {
  const [report, setReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekDates = useCallback(() => {
    const targetDate = subWeeks(new Date(), weekOffset);
    return {
      start: startOfWeek(targetDate),
      end: endOfWeek(targetDate)
    };
  }, [weekOffset]);

  const generateWeeklyReport = useCallback(async () => {
    setIsGenerating(true);
    const { start, end } = getWeekDates();
    const startStr = format(start, 'yyyy-MM-dd');
    const endStr = format(end, 'yyyy-MM-dd');

    try {
      // Get mood logs for the week
      const moodLogs = await MoodLog.filter({
        date: { $gte: startStr, $lte: endStr }
      });

      if (moodLogs.length === 0) {
        setReport({
          week_start: startStr,
          week_end: endStr,
          mood_summary: "No mood data logged this week.",
          insights: ["Start logging your daily moods to get personalized insights!"],
          suggestions: ["Try to log your mood each day", "Notice patterns in how you feel"],
          streak_count: 0,
          badges_earned: []
        });
        setIsGenerating(false);
        return;
      }

      // Prepare data summary for AI
      const moodSummary = moodLogs.map(log => ({
        date: log.date,
        mood: log.mood,
        intensity: log.intensity,
        activities: log.activities,
        note: log.note
      }));

      const prompt = `You are MindMate, a compassionate AI wellness companion. Analyze this week's mood data and create a supportive wellness report for a young person. Be encouraging, insightful, and focus on growth.

Mood logs: ${JSON.stringify(moodSummary)}

**Your Task:**
1.  **Mood Summary:** Write a short, empathetic paragraph summarizing the overall emotional tone of the week.
2.  **Key Insights:** Generate 2-3 specific, actionable insights. For example: "It looks like you felt happiest on days you socialized with friends," or "I noticed your anxiety seems to be higher on nights when you study late. Maybe a calming ritual before bed could help on those days."
3.  **Suggestions for Growth:** Provide 2-3 positive, forward-looking suggestions for the upcoming week based on the data.

Keep the tone supportive, youth-friendly, and empowering. Focus on progress and self-care.`;

      const aiResponse = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            mood_summary: { type: "string" },
            insights: { type: "array", items: { type: "string" } },
            suggestions: { type: "array", items: { type: "string" } }
          }
        }
      });

      // Calculate streak and badges
      const streakCount = moodLogs.length;
      const badges = [];
      if (streakCount >= 7) badges.push("Week Warrior");
      if (streakCount >= 5) badges.push("Consistency Champion");
      if (moodLogs.some(log => log.activities?.includes("exercise"))) badges.push("Movement Master");
      if (moodLogs.some(log => log.mood === "grateful")) badges.push("Gratitude Guru");

      const reportData = {
        week_start: startStr,
        week_end: endStr,
        mood_summary: aiResponse.mood_summary,
        insights: aiResponse.insights,
        suggestions: aiResponse.suggestions,
        streak_count: streakCount,
        badges_earned: badges
      };

      const savedReport = await WeeklyReport.create(reportData);
      setReport(savedReport);
    } catch (error) {
      console.error("Error generating report:", error);
    }
    setIsGenerating(false);
  }, [getWeekDates]);

  const loadOrGenerateReport = useCallback(async () => {
 