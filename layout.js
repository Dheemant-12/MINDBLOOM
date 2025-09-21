import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, 
  MessageCircle, 
  Heart, 
  TrendingUp, 
  Users, 
  Shield,
  Sparkles,
  Map // New icon for the journey page
} from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: createPageUrl("Home"), icon: Home },
    { name: "AI Chat", path: createPageUrl("Chat"), icon: MessageCircle },
    { name: "Mood Tracker", path: createPageUrl("MoodTracker"), icon: Heart },
    { name: "My Journey", path: createPageUrl("Journey"), icon: Map }, // New Page
    { name: "Reports", path: createPageUrl("Reports"), icon: TrendingUp },
    { name: "Challenges", path: createPageUrl("Challenges"), icon: Users },
    { name: "Privacy", path: createPageUrl("Privacy"), icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <style>{`
        :root {
 