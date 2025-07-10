'use client';

import React, { useState } from 'react';

interface UserData {
    username: string;
  name: string;
  about: string;
  github: string;
  linkedin: string;
  skills: string[];
  projects: { name: string; description: string }[];
  experience: string;
}

interface PortfolioAIChatProps {
  userData: UserData;
}

export default function PortfolioAIChat({ userData }: PortfolioAIChatProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const formatUserData = (data: UserData) => `
Name: ${data.name}
About: ${data.about}
GitHub: ${data.github}
LinkedIn: ${data.linkedin}
Skills: ${data.skills.join(', ')}
Experience: ${data.experience}
Projects:
${data.projects.map((p) => `- ${p.name}: ${p.description}`).join('\n')}
`;

  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    setError('');

    try {
      const res = await fetch('/api/geminiaitwo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: formatUserData(userData),
          question,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setAnswer(data.answer || "I'm designed to provide insights into this portfolio. Please ask something specific.");
      } else {
        setError(data.error || 'AI failed to respond.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to connect to AI service.');
    } finally {
      setLoading(false);
    }
  };

  // Changed from Next.js Image component to standard <img> tag
  const RobotAvatar = () => (
    <img
      src="/robot.webp" // Using a placeholder image for the robot avatar
      alt="AI Assistant Avatar"
      width={60}
      height={60}
      className="rounded-full border-4 border-green-500 shadow-2xl animate-pulse hover:scale-110 transition-transform duration-300"
    />
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isChatOpen && (
        <div
          className="flex flex-col items-center cursor-pointer p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 shadow-xl animate-bounce"
          onClick={() => setIsChatOpen(true)}
          aria-label="Open AI chat"
        >
          <RobotAvatar />
          <p className="text-white text-xs mt-1 font-medium text-center px-2">Ask AI<br />about {userData.username}</p>
        </div>
      )}

      {isChatOpen && (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl text-white w-[calc(100vw-2rem)] max-w-md md:w-full border border-gray-700 relative animate-fadeIn flex flex-col max-h-[80vh]">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
            onClick={() => setIsChatOpen(false)}
            aria-label="Close AI chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-2xl font-extrabold mb-5 text-green-400 text-center">Portfolio AI Assistant</h2>

          <input
            type="text"
            placeholder="Ask about skills, projects, or experience..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && askAI()}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />

          <button
            onClick={askAI}
            disabled={loading}
            className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-800 rounded-lg text-red-200 text-sm flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              {error}
            </div>
          )}

          {answer && (
            <div className="mt-6 bg-gray-700 p-4 rounded-xl shadow-inner flex items-start space-x-3 overflow-y-auto flex-grow">
              {/* Changed from Next.js Image component to standard <img> tag */}
              <img
                src="https://placehold.co/50x50/22c55e/ffffff?text=AI" // Using a placeholder image for the robot avatar
                alt="AI"
                width={50}
                height={50}
                className="rounded-full border-2 border-green-500 shadow-md"
              />
              <div className="flex-grow">
                <strong className="text-green-300 text-md block mb-1">AI Assistant:</strong>
                <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{answer}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
