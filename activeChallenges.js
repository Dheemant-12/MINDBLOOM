import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Challenge, ChallengeProgress } from "@/entities/all";
import { User } from "@/entities/User";
import { Users, Calendar, CheckCircle, Circle } from "lucide-react";

export default function ActiveChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      const activeChallenges = await Challenge.filter({ is_active: true });
      setChallenges(activeChallenges);
      
      // Load user progress for each challenge
      const user = await User.me();
      const progressPromises = activeChallenges.map(async (challenge) => {
        const progress = await ChallengeProgress.filter({
          challenge_id: challenge.id,
          created_by: user.email
        });
        return { challengeId: challenge.id, progress };
      });
      
      const progressResults = await Promise.all(progressPromises);
      const progressMap = {};
      progressResults.forEach(({ challengeId, progress }) => {
        progressMap[challengeId] = progress;
      });
      setUserProgress(progressMap);
    } catch (error) {
      console.error("Error loading challenges:", error);
    }
    setIsLoading(false);
  };

  const joinChallenge = async (challengeId) => {
    try {
      // Create day 1 progress entry
      await ChallengeProgress.create({
        challenge_id: challengeId,
        day_number: 1,
        completed: false
      });
      
      loadChallenges();
    } catch (error) {
      console.error("Error joining challenge:", error);
    }
  };

  const getChallengeTypeColor = (type) => {
    const colors = {
      gratitude: "bg-yellow-100 text-yellow-800",
      mindfulness: "bg-blue-100 text-blue-800", 
      kindness: "bg-pink-100 text-pink-800",
      creativity: "bg-purple-100 text-purple-800",
      movement: "bg-green-100 text-green-800",
      connection: "bg-orange-100 text-orange-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getProgressStats = (challengeId) => {
    const progress = userProgress[challengeId] || [];
    const completed = progress.filter(p => p.completed).length;
    const total = progress.length;
    return { completed, total, isJoined: total > 0 };
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i} className="glass-effect gentle-shadow border-0">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {challenges.map((challenge) => {
        const stats = getProgressStats(challenge.id);
        return (
          <Card key={challenge.id} className="glass-effect gentle-shadow border-0 hover:scale-105 transition-transform duration-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg mb-2">{challenge.title}</CardTitle>
                  <Badge className={getChallengeTypeColor(challenge.type)}>
                    {challenge.type.replace(/_/g, ' ')}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {challenge.duration_days} days
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <Users className="w-4 h-4" />
                    {challenge.participants_count} joined
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                {challenge.description}
              </p>
              
              {stats.isJoined ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">
                      {stats.completed}/{challenge.duration_days} days
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: challenge.duration_days }, (_, i) => {
                      const dayProgress = userProgress[challenge.id]?.find(p => p.day_number === i + 1);
                      const isCompleted = dayProgress?.completed || false;
                      return (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-green-500 text-white' 
                              : i < stats.total 
                              ? 'bg-gray-300' 
                              : 'bg-gray-100'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Circle className="w-3 h-3" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <Badge className="bg-green-100 text-green-800 w-full justify-center">
                    ✅ Joined
                  </Badge>
                </div>
              ) : (
                <Button
                  onClick={() => joinChallenge(challenge.id)}
                  className="w-full mood-gradient text-white hover:opacity-90"
                >
                  Join Challenge
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}