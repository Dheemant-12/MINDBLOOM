import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function QuickActions() {
  const actions = [
    {
      title: "AI Chat",
      description: "Talk with your wellness companion",
      icon: MessageCircle,
      color: "from-blue-400 to-blue-500",
      path: createPageUrl("Chat")
    },
    {
      title: "Log Mood",
      description: "Track how you're feeling today",
      icon: Heart,
      color: "from-pink-400 to-pink-500", 
      path: createPageUrl("MoodTracker")
    },
    {
      title: "View Reports",
      description: "See your wellness insights",
      icon: TrendingUp,
      color: "from-green-400 to-green-500",
      path: createPageUrl("Reports")
    },
    {
      title: "Join Challenge",
      description: "Connect with community goals",
      icon: Users,
      color: "from-purple-400 to-purple-500",
      path: createPageUrl("Challenges")
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {actions.map((action) => (
        <Link key={action.title} to={action.path}>
          <Card className="glass-effect gentle-shadow border-0 hover:scale-105 transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center gentle-shadow group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}