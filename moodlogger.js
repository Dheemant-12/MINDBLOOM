import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MoodLog } from "@/entities/MoodLog";
import { Heart, Sparkles } from "lucide-react";
import { format } from "date-fns";

export default function MoodLogger({ onMoodLogged }) {
  const [selectedMood, setSelectedMood] = useState("");
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods = [
    { id: "very_happy", label: "Very Happy", emoji: "😄", color: "bg-yellow-200 text-yellow-800" },
    { id: "happy", label: "Happy", emoji: "😊", color: "bg-green-200 text-green-800" },
    { id: "excited", label: "Excited", emoji: "🤗", color: "bg-orange-200 text-orange-800" },
    { id: "grateful", label: "Grateful", emoji: "🙏", color: "bg-purple-200 text-purple-800" },
    { id: "neutral", label: "Neutral", emoji: "😐", color: "bg-gray-200 text-gray-800" },
    { id: "sad", label: "Sad", emoji: "😢", color: "bg-blue-200 text-blue-800" },
    { id: "stressed", label: "Stressed", emoji: "😰", color: "bg-red-200 text-red-800" },
    { id: "anxious", label: "Anxious", emoji: "😟", color: "bg-indigo-200 text-indigo-800" },
    { id: "angry", label: "Angry", emoji: "😠", color: "bg-red-300 text-red-900" },
    { id: "overwhelmed", label: "Overwhelmed", emoji: "🤯", color: "bg-pink-200 text-pink-800" }
  ];

  const activities = [
    { id: "exercise", label: "Exercise", emoji: "🏃" },
    { id: "meditation", label: "Meditation", emoji: "🧘" },
    { id: "socializing", label: "Socializing", emoji: "👥" },
    { id: "creative", label: "Creative Work", emoji: "🎨" },
    { id: "nature", label: "Time in Nature", emoji: "🌿" },
    { id: "music", label: "Music", emoji: "🎵" },
    { id: "reading", label: "Reading", emoji: "📚" },
    { id: "gaming", label: "Gaming", emoji: "🎮" },
    { id: "studying", label: "Studying", emoji: "📖" },
    { id: "helping_others", label: "Helping Others", emoji: "🤝" }
  ];

  const toggleActivity = (activityId) => {
    setSelectedActivities(prev => 
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    try {
      await MoodLog.create({
        mood: selectedMood,
        intensity,
        note,
        date: format(new Date(), 'yyyy-MM-dd'),
        activities: selectedActivities
      });
      
      // Reset form
      setSelectedMood("");
      setIntensity(5);
      setNote("");
      setSelectedActivities([]);
      
      if (onMoodLogged) onMoodLogged();
    } catch (error) {
      console.error("Error logging mood:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="glass-effect gentle-shadow border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          How are you feeling today?
        </CardTitle>
        <p className="text-sm text-gray-600">
          Today is {format(new Date(), 'EEEE, MMMM do')}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Select your primary mood:</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {moods.map((mood) => (
              <Button
                key={mood.id}
                variant={selectedMood === mood.id ? "default" : "outline"}
                onClick={() => setSelectedMood(mood.id)}
                className={`h-auto p-3 flex flex-col gap-2 ${
                  selectedMood === mood.id 
                    ? 'mood-gradient text-white' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {selectedMood && (
          <div>
            <h3 className="font-medium mb-3">Intensity (1-10):</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Low</span>
              <div className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={intensity >= i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIntensity(i + 1)}
                    className={`w-8 h-8 p-0 ${
                      intensity >= i + 1 
                        ? 'mood-gradient text-white' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <span className="text-sm text-gray-600">High</span>
            </div>
          </div>
        )}

        <div>
          <h3 className="font-medium mb-3">What influenced your mood? (optional)</h3>
          <div className="flex flex-wrap gap-2">
            {activities.map((activity) => (
              <Badge
                key={activity.id}
                variant={selectedActivities.includes(activity.id) ? "default" : "outline"}
                onClick={() => toggleActivity(activity.id)}
                className={`cursor-pointer hover:scale-105 transition-transform ${
                  selectedActivities.includes(activity.id)
                    ? 'mood-gradient text-white'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              >
                <span className="mr-1">{activity.emoji}</span>
                {activity.label}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Add a note (optional)</h3>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind? Any thoughts about your day..."
            className="bg-white/60 border-white/30 focus:bg-white/80 transition-all duration-200"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!selectedMood || isSubmitting}
          className="w-full mood-gradient hover:opacity-90 text-white font-medium py-3"
        >
          {isSubmitting ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Logging your mood...
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 mr-2" />
              Log My Mood
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}