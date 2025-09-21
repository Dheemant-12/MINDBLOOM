import React from "react";
import ChatInterface from "../components/chat/ChatInterface";

export default function Chat() {
  return (
    <div className="h-screen p-4 md:p-8 pb-20 lg:pb-8">
      <div className="max-w-4xl mx-auto h-full">
        <ChatInterface />
      </div>
    </div>
  );
}