{
  "name": "WeeklyReport",
  "type": "object",
  "properties": {
    "week_start": {
      "type": "string",
      "format": "date",
      "description": "Start date of the week"
    },
    "week_end": {
      "type": "string",
      "format": "date",
      "description": "End date of the week"
    },
    "mood_summary": {
      "type": "string",
      "description": "AI-generated summary of mood patterns"
    },
    "insights": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Key insights and observations"
    },
    "suggestions": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Personalized wellness suggestions"
    },
    "streak_count": {
      "type": "number",
      "description": "Current logging streak"
    },
    "badges_earned": {
      "type": "array",
      "items": {
 