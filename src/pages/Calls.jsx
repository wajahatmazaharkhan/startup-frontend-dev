import React, { useState } from 'react';
import { Mic, Video } from 'lucide-react';

function Calls() {
  const [activeTab, setActiveTab] = useState('calls');
    const [active, setActive] = useState("voice");

  const callHistory = [
    {
      id: 1,
      name: 'Dr. Abhishek Mehta',
      duration: '50 minutes Voice Session',
      time: '04:00PM',
      type: 'voice',
      avatar: '👨‍⚕️'
    },
    {
      id: 2,
      name: 'Dr. Abhishek Mehta',
      duration: '50 minutes Voice Session',
      time: '04:00PM',
      type: 'video',
      avatar: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Dr. Abhishek Mehta',
      duration: '50 minutes Voice Session',
      time: '04:00PM',
      type: 'voice',
      avatar: '👨‍⚕️'
    },
    {
      id: 4,
      name: 'Dr. Abhishek Mehta',
      duration: '50 minutes Voice Session',
      time: '04:00PM',
      type: 'video',
      avatar: '👨‍⚕️'
    },
    {
      id: 5,
      name: 'Dr. Abhishek Mehta',
      duration: '50 minutes Voice Session',
      time: '04:00PM',
      type: 'voice',
      avatar: '👨‍⚕️'
    },
    {
      id: 6,
      name: 'Dr. Abhishek Mehta',
      duration: '50 minutes Voice Session',
      time: '04:00PM',
      type: 'video',
      avatar: '👨‍⚕️'
    },
    {
      id: 7,
      name: 'Dr. Abhishek Mehta',
      duration: '50 minutes Voice Session',
      time: '04:00PM',
      type: 'voice',
      avatar: '👨‍⚕️'
    },
    {
      id: 8,
      name: 'Dr. Abhishek Mehta',
      duration: '50 minutes Voice Session',
      time: '04:00PM',
      type: 'video',
      avatar: '👨‍⚕️'
    },
    {
      id: 9,
      name: 'Dr. Abhishek Mehta',
      duration: '50 minutes Voice Session',
      time: '04:00PM',
      type: 'voice',
      avatar: '👨‍⚕️'
    },
    {
      id: 10,
      name: 'Dr. Abhishek Mehta',
      duration: '50 minutes Voice Session',
      time: '04:00PM',
      type: 'video',
      avatar: '👨‍⚕️'
    }
  ];

  const specialists = [
    {
      id: 1,
      name: 'Dr. Abhishek Mehta',
      specialty: 'Mental Health and Wellness & Therapy Specialist',
      price: '₹499',
      avatar: '👨‍⚕️'
    },
    {
      id: 2,
      name: 'Dr. Abhishek Mehta',
      specialty: 'Mental Health and Wellness & Therapy Specialist',
      price: '₹499',
      avatar: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Dr. Abhishek Mehta',
      specialty: 'Mental Health and Wellness & Therapy Specialist',
      price: '₹499',
      avatar: '👨‍⚕️'
    },
    {
      id: 4,
      name: 'Dr. Abhishek Mehta',
      specialty: 'Mental Health and Wellness & Therapy Specialist',
      price: '₹499',
      avatar: '👨‍⚕️'
    },
    {
      id: 5,
      name: 'Dr. Abhishek Mehta',
      specialty: 'Mental Health and Wellness & Therapy Specialist',
      price: '₹499',
      avatar: '👨‍⚕️'
    },
    {
      id: 6,
      name: 'Dr. Abhishek Mehta',
      specialty: 'Mental Health and Wellness & Therapy Specialist',
      price: '₹499',
      avatar: '👨‍⚕️'
    },
    {
      id: 7,
      name: 'Dr. Abhishek Mehta',
      specialty: 'Mental Health and Wellness & Therapy Specialist',
      price: '₹499',
      avatar: '👨‍⚕️'
    }
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'chats') {
      window.location.href = '/chat';
    } else if (tab === 'calls') {
      window.location.href = '/calls';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation Tabs */}
      <div className="flex justify-center items-center bg-white border-b border-gray-200 py-4 px-4 z-20">
        <div className="flex gap-12">
          <button
            onClick={() => handleTabClick('chats')}
            className={`pb-2 font-semibold text-base transition-all relative ${activeTab === 'chats'
                ? 'text-purple-600'
                : 'text-gray-400'
              }`}
          >
            Chats
            {activeTab === 'chats' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
            )}
          </button>
          <button
            onClick={() => handleTabClick('calls')}
            className={`pb-2 font-semibold text-base transition-all relative ${activeTab === 'calls'
                ? 'text-purple-600'
                : 'text-gray-400'
              }`}
          >
            Calls
            {activeTab === 'calls' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Call History */}
        <div className="w-full md:w-96 lg:w-[380px] bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
          {callHistory.map((call) => (
            <div
              key={call.id}
              className="flex items-center justify-between px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer"
            >
              <div className="flex items-center flex-1">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
                  {call.avatar}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-semibold text-gray-900 text-base mb-0.5">
                    {call.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {call.duration}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{call.time}</span>
                {call.type === 'voice' ? (
                  <button className="p-2 hover:bg-purple-50 rounded-full transition-colors">
                    <Mic size={20} className="text-gray-600" />
                  </button>
                ) : (
                  <button className="p-2 hover:bg-purple-50 rounded-full transition-colors">
                    <Video size={20} className="text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Book a Session */}
        <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
          {/* Header */}
          <div className="text-center py-8 bg-white">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Book a Session</h1>
            <div className="flex justify-center gap-4">
              <div className="relative flex w-[320px] bg-purple-200 rounded-full p-1 shadow-lg">

                {/* Sliding Background */}
                <div
                  className={`absolute top-1 left-1 h-[calc(100%-8px)] w-1/2 bg-purple-600 rounded-full transition-all duration-300 ${active === "video" ? "translate-x-full" : ""
                    }`}
                />

                {/* Voice Call */}
                <button
                  onClick={() => setActive("voice")}
                  className="relative z-10 flex items-center justify-center gap-2 w-1/2 py-3 text-white font-medium"
                >
                  <Mic size={20} />
                  Voice Call
                </button>

                {/* Video Call */}
                <button
                  onClick={() => setActive("video")}
                  className="relative z-10 flex items-center justify-center gap-2 w-1/2 py-3 text-white font-medium"
                >
                  <Video size={20} />
                  Video Call
                </button>
              </div>
            </div>
          </div>

          {/* Specialists List */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
              {specialists.map((specialist, index) => (
                <div
                  key={specialist.id}
                  className={`flex items-center justify-between py-4 ${index !== specialists.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                >
                  <div className="flex items-center flex-1">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
                      {specialist.avatar}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-gray-900 text-base mb-1">
                        {specialist.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {specialist.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-3 hover:bg-purple-50 rounded-full transition-colors">
                      <Mic size={22} className="text-gray-600 hover:text-purple-600" />
                    </button>
                    <span className="text-sm text-gray-500 font-medium">/ {specialist.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calls;