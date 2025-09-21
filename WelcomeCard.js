import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvokeLLM } from "@/integrations/Core";
import { User } from "@/entities/User";
import { Sparkles, RefreshCw } from "lucide-react";

export default function WelcomeCard({ onNavigate }) {
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const generateDailyQuote = async () => {
    setIsLoading(true);
    try {
      const response = await InvokeLLM({
        prompt: `Generate a short, inspiring daily quote specifically for young people focused on mental wellness, self-care, and personal growth. Make it uplifting, relatable, and empowering. Keep it under 25 words and avoid clichés. Focus on themes like resilience, self-compassion, growth mindset, or finding inner strength.`,
      });
      setQuote(response);
    } catch (error) {
      setQuote("Every small step forward is progress. You're stronger than you know. 🌱");
    }
    setIsLoading(false);
  };

  const loadUserAndQuote = useCallback(async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      await generateDailyQuote();
    } catch (error) {
      await generateDailyQuote();
    }
  }, []);

  useEffect(() => {
    loadUserAndQuote();
  }, [loadUserAndQuote]);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon"; 
    return "evening";
  };

  return (
    <Card className="glass-effect gentle-shadow border-0">
      <CardContent className="p-6 md:p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto mood-gradient rounded-2xl flex items-center justify-center gentle-shadow">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Good {getTimeOfDay()}{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}! 
            </h1>
            <p className="text-gray-600">Welcome to your wellness space</p>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 my-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Daily Inspiration</h3>
              <Button
                variant="ghost" 
                size="sm"
                onClick={generateDailyQuote}
                disabled={isLoading}
                className="text-purple-600 hover:text-purple-700"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-purple-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-purple-200 rounded w-1/2 mx-auto"></div>
              </div>
            ) : (
              <p className="text-purple-800 font-medium text-center leading-relaxed">
                "{quote}"
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}