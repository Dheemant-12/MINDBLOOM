import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Heart } from "lucide-react";

export default function Privacy() {
  return (
    <div className="p-4 md:p-8 pb-20 lg:pb-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Privacy First Policy
        </h1>
        <p className="text-gray-600">
          Your mental health journey is personal. Here's how we protect your privacy.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="glass-effect gentle-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Your Data is Safe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold">Encrypted Storage</h3>
                </div>
                <p className="text-sm text-gray-700">
                  All your mood logs, chat messages, and personal data are encrypted and stored securely.
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">Anonymous Analytics</h3>
                </div>
                <p className="text-sm text-gray-700">
                  We only use anonymous, aggregated data to improve the app experience for everyone.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect gentle-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              What We Collect & Why
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Mood & Wellness Data</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Your daily mood logs, chat conversations, and wellness insights to provide personalized support.
                </p>
                <p className="text-xs text-green-600">✓ Used only for your personal wellness journey</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Basic Account Info</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Your name and email to create your account and send wellness reminders (if you opt in).
                </p>
                <p className="text-xs text-green-600">✓ Never shared with third parties</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Usage Analytics</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Anonymous data about how features are used to improve the app experience.
                </p>
                <p className="text-xs text-green-600">✓ Completely anonymized and aggregated</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect gentle-shadow border-0">
          <CardHeader>
            <CardTitle>Your Rights & Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Data Access</p>
                  <p className="text-sm text-gray-600">You can export all your data at any time from the Reports section.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Data Deletion</p>
                  <p className="text-sm text-gray-600">Contact us to permanently delete your account and all associated data.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Communication Control</p>
                  <p className="text-sm text-gray-600">Opt in or out of wellness reminders and updates at any time.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect gentle-shadow border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Questions About Privacy?</h3>
              <p className="text-sm text-gray-600 mb-4">
                We're committed to transparency. Reach out anytime with privacy concerns.
              </p>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}