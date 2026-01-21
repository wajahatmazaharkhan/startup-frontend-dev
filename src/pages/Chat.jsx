import React, { useState, useRef } from 'react';
import { Send, Paperclip, Camera, ArrowLeft, Mic } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

// If you're using React Router, uncomment this:
// import { useNavigate } from 'react-router-dom';

function Chat() {
  // If using React Router, uncomment this:
  // const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chats');
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '✨', '💯', '🙏', '😍', '😢', '😎', '🤔', '👏', '🌟', '💪'];

  // Close emoji picker when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const conversations = [
    {
      id: 1,
      name: 'Dr. Abhishek Mehta',
      message: 'Good Morning Dear Sir! I am Swapnil Shah, as discussed...',
      time: '04:00PM',
      avatar: '👨‍⚕️'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Patel',
      message: 'Good Morning Dear Sir! I am Swapnil Shah, as discussed...',
      time: '03:45PM',
      avatar: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Dr. Priya Shah',
      message: 'Good Morning Dear Sir! I am Swapnil Shah, as discussed...',
      time: '03:30PM',
      avatar: '👩‍⚕️'
    },
    {
      id: 4,
      name: 'Dr. Amit Kumar',
      message: 'Good Morning Dear Sir! I am Swapnil Shah, as discussed...',
      time: '03:15PM',
      avatar: '👨‍⚕️'
    },
    {
      id: 5,
      name: 'Dr. Neha Gupta',
      message: 'Good Morning Dear Sir! I am Swapnil Shah, as discussed...',
      time: '03:00PM',
      avatar: '👩‍⚕️'
    },
    {
      id: 6,
      name: 'Dr. Vikram Singh',
      message: 'Good Morning Dear Sir! I am Swapnil Shah, as discussed...',
      time: '02:45PM',
      avatar: '👨‍⚕️'
    },
    {
      id: 7,
      name: 'Dr. Kavita Desai',
      message: 'Good Morning Dear Sir! I am Swapnil Shah, as discussed...',
      time: '02:30PM',
      avatar: '👩‍⚕️'
    },
    {
      id: 8,
      name: 'Dr. Sanjay Verma',
      message: 'Good Morning Dear Sir! I am Swapnil Shah, as discussed...',
      time: '02:15PM',
      avatar: '👨‍⚕️'
    },
    {
      id: 9,
      name: 'Dr. Anjali Joshi',
      message: 'Good Morning Dear Sir! I am Swapnil Shah, as discussed...',
      time: '02:00PM',
      avatar: '👩‍⚕️'
    },
    {
      id: 10,
      name: 'Dr. Rahul Sharma',
      message: 'Good Morning Dear Sir! I am Swapnil Shah, as discussed...',
      time: '01:45PM',
      avatar: '👨‍⚕️'
    }
  ];

  const [messagesList, setMessagesList] = useState([
    {
      id: 1,
      text: "Hello, I've been feeling anxious at night. My thoughts don't stop, and sleep is difficult.",
      time: '04:00PM',
      sent: false,
      date: 'Yesterday'
    },
    {
      id: 2,
      text: "Okay, Let's have a Voice Session.",
      time: '04:00PM',
      sent: true,
      date: 'Yesterday'
    },
    {
      id: 3,
      text: "Hello, I've been feeling anxious at night. My thoughts don't stop, and sleep is difficult.",
      time: '04:00PM',
      sent: false,
      date: 'Yesterday'
    },
    {
      id: 4,
      text: "Okay, Let's have a Voice Session.",
      time: '04:00PM',
      sent: true,
      date: 'Yesterday'
    },
    {
      id: 5,
      text: "Hello, I've been feeling anxious at night. My thoughts don't stop, and sleep is difficult.",
      time: '04:00PM',
      sent: false,
      date: 'Today'
    }
  ]);

  const groupedMessages = messagesList.reduce((acc, msg) => {
    if (!acc[msg.date]) {
      acc[msg.date] = [];
    }
    acc[msg.date].push(msg);
    return acc;
  }, {});

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messagesList.length + 1,
        text: message,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        sent: true,
        date: 'Today'
      };
      setMessagesList([...messagesList, newMessage]);
      setMessage('');
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      setStream(mediaStream);
      setShowCamera(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (err) {
      console.error('Camera error:', err);
      alert('Unable to access camera. Please allow camera permissions.');
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        console.log('Photo captured:', blob);
        alert('Photo captured successfully!');
        closeCamera();
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name, file.size);
      alert(`File selected: ${file.name}`);
    }
  };

  const handleChatClick = (index) => {
    setSelectedChat(index);
    setIsMobileView(true);
  };

  const handleBackToList = () => {
    setIsMobileView(false);
    setSelectedChat(null);
  };

  const addEmoji = (emojiObject) => {
    setMessage(message + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // Navigation logic
    if (tab === 'chats') {
      // Using React Router (uncomment if you have React Router):
      // navigate('/chat');

      // Using window.location (works without React Router):
      window.location.href = '/chat';
    } else if (tab === 'calls') {
      // Using React Router (uncomment if you have React Router):
      // navigate('/calls');

      // Using window.location (works without React Router):
      window.location.href = '/calls';
    }
  };

  const selectedConversation = selectedChat !== null ? conversations[selectedChat] : null;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation Tabs - Outside and Above Everything */}
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
        {/* Sidebar - Chat List */}
        <div className={`w-full md:w-96 lg:w-[380px] bg-white border-r border-gray-200 flex flex-col ${isMobileView ? 'hidden md:flex' : 'flex'
          }`}>
          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv, index) => (
              <div
                key={conv.id}
                onClick={() => handleChatClick(index)}
                className={`flex items-center px-4 py-4 cursor-pointer border-b border-gray-100 transition-all ${selectedChat === index ? 'bg-purple-50' : 'hover:bg-gray-50'
                  }`}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
                  {conv.avatar}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 text-base">
                      {conv.name}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {conv.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {conv.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col bg-white ${!isMobileView && selectedChat === null ? 'hidden md:flex' : 'flex'
          }`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <button
                    onClick={handleBackToList}
                    className="md:hidden mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ArrowLeft size={22} className="text-gray-700" />
                  </button>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xl shadow-md">
                    {selectedConversation.avatar}
                  </div>
                  <div className="ml-3">
                    <h2 className="font-semibold text-gray-900 text-base">{selectedConversation.name}</h2>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 bg-white">
                {Object.entries(groupedMessages).map(([date, msgs]) => (
                  <div key={date}>
                    {/* Date Separator */}
                    <div className="flex justify-center my-6">
                      <span className="px-4 py-1.5 bg-purple-100 text-purple-600 text-xs rounded-full font-medium">
                        {date}
                      </span>
                    </div>

                    {/* Messages */}
                    {msgs.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex mb-4 ${msg.sent ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] px-5 py-3 rounded-3xl shadow-sm ${msg.sent
                              ? 'bg-white text-gray-900 border border-gray-200'
                              : 'bg-purple-100 text-gray-900'
                            }`}
                        >
                          <p className="text-sm leading-relaxed mb-1">{msg.text}</p>
                          <span className="text-xs text-gray-400">
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Typing Indicator */}
                <div className="flex items-center space-x-1.5 mb-4">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input - Fixed at Bottom */}
              <div className="bg-white border-t border-gray-200 px-5 py-4">
                <div className="flex items-center gap-3 relative">
                  {/* Emoji Picker Popup */}
                  {showEmojiPicker && (
                    <div ref={emojiPickerRef} className="absolute bottom-16 left-0 z-50">
                      <EmojiPicker
                        onEmojiClick={addEmoji}
                        width={350}
                        height={400}
                      />
                    </div>
                  )}

                  {/* Emoji Button */}
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-gray-400 hover:text-purple-600 transition-colors flex-shrink-0 p-2 hover:bg-purple-50 rounded-full"
                  >
                    <svg width="46" height="46" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="28" cy="28" r="28" fill="#EDD9FF" fill-opacity="0.5" />
                      <path d="M28.0024 42.2641C35.8803 42.2641 42.2666 35.8778 42.2666 28C42.2666 20.1221 35.8803 13.7358 28.0024 13.7358C20.1246 13.7358 13.7383 20.1221 13.7383 28C13.7383 35.8778 20.1246 42.2641 28.0024 42.2641Z" fill="#EDD9FF" fill-opacity="0.5" />
                      <path d="M22.2968 30.8528C22.2968 30.8528 24.4364 33.7056 28.0024 33.7056C31.5685 33.7056 33.7081 30.8528 33.7081 30.8528" fill="#EDD9FF" fill-opacity="0.5" />
                      <path d="M22.2968 30.8528C22.2968 30.8528 24.4364 33.7056 28.0024 33.7056C31.5685 33.7056 33.7081 30.8528 33.7081 30.8528M23.7232 23.7207H23.7375M32.2817 23.7207H32.2959M42.2666 28C42.2666 35.8778 35.8803 42.2641 28.0024 42.2641C20.1246 42.2641 13.7383 35.8778 13.7383 28C13.7383 20.1221 20.1246 13.7358 28.0024 13.7358C35.8803 13.7358 42.2666 20.1221 42.2666 28Z" stroke="black" stroke-opacity="0.54" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </button>

                  {/* Message Input */}
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a Message"
                    className="flex-1 px-5 py-3 bg-[#EDD9FF80] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                  />

                  {/* Action Buttons - Show different buttons based on message */}
                  {message.trim() ? (
                    <button
                      onClick={sendMessage}
                      className="text-white bg-purple-600 hover:bg-purple-700 transition-all flex-shrink-0 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Send size={20} />
                    </button>
                  ) : (
                    <>
                      

                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-gray-400 hover:text-purple-600 transition-colors flex-shrink-0 p-2 hover:bg-purple-50 rounded-full"
                      >
                        <svg width="46" height="46" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="28" cy="28" r="28" fill="#EDD9FF" fill-opacity="0.5"/>
<path d="M30.6295 38.1925C28.8812 39.9408 26.7753 40.8104 24.3119 40.8013C21.8485 40.7922 19.7362 39.9071 17.9749 38.1458C16.2137 36.3846 15.3285 34.2723 15.3194 31.8088C15.3104 29.3454 16.18 27.2396 17.9282 25.4913L27.258 16.1615C28.5188 14.9007 30.035 14.2736 31.8067 14.2801C33.5783 14.2866 35.0992 14.925 36.3693 16.1951C37.6394 17.4652 38.2778 18.9861 38.2843 20.7577C38.2909 22.5294 37.6637 24.0456 36.4029 25.3064L27.5774 34.1319C26.8042 34.9051 25.8776 35.2898 24.7977 35.2858C23.7179 35.2818 22.7885 34.8903 22.0094 34.1113C21.2304 33.3323 20.8389 32.4029 20.835 31.323C20.831 30.2432 21.2156 29.3166 21.9889 28.5433L31.3187 19.2135L33.3509 21.2457L24.0211 30.5755C23.8026 30.7941 23.6938 31.0467 23.6949 31.3336C23.6959 31.6204 23.8066 31.8739 24.0267 32.0941C24.2469 32.3142 24.5004 32.4248 24.7872 32.4259C25.074 32.4269 25.3267 32.3182 25.5453 32.0997L34.3707 23.2742C35.0598 22.5512 35.4068 21.7046 35.4117 20.7345C35.4165 19.7643 35.0633 18.9236 34.3521 18.2124C33.6408 17.5011 32.7959 17.1436 31.8172 17.14C30.8386 17.1364 29.9963 17.4876 29.2902 18.1937L19.9604 27.5235C18.75 28.7001 18.152 30.1278 18.1667 31.8067C18.1813 33.4856 18.7898 34.9262 19.9922 36.1286C21.1776 37.314 22.6013 37.9056 24.2633 37.9033C25.9252 37.901 27.3699 37.32 28.5973 36.1603L38.4314 26.3262L40.4636 28.3584L30.6295 38.1925Z" fill="black" fill-opacity="0.54"/>
</svg>

                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="*/*"
                      />

                      <button
                        onClick={openCamera}
                        className="text-gray-400 hover:text-purple-600 transition-colors flex-shrink-0 p-2 hover:bg-purple-50 rounded-full"
                      >
                        <svg width="46" height="46" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="28" cy="28" r="28" fill="#EDD9FF" fill-opacity="0.5"/>
<path d="M42.2666 37.5681C42.2666 38.2531 41.9933 38.9101 41.507 39.3944C41.0206 39.8788 40.3609 40.1509 39.6731 40.1509H16.3318C15.6439 40.1509 14.9843 39.8788 14.4979 39.3944C14.0115 38.9101 13.7383 38.2531 13.7383 37.5681V23.3627C13.7383 22.6777 14.0115 22.0207 14.4979 21.5363C14.9843 21.052 15.6439 20.7799 16.3318 20.7799H21.5187L24.1122 16.9056H31.8927L34.4861 20.7799H39.6731C40.3609 20.7799 41.0206 21.052 41.507 21.5363C41.9933 22.0207 42.2666 22.6777 42.2666 23.3627V37.5681Z" stroke="black" stroke-opacity="0.54" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M28.0024 34.9853C30.8671 34.9853 33.1894 32.6726 33.1894 29.8197C33.1894 26.9668 30.8671 24.6541 28.0024 24.6541C25.1378 24.6541 22.8155 26.9668 22.8155 29.8197C22.8155 32.6726 25.1378 34.9853 28.0024 34.9853Z" stroke="black" stroke-opacity="0.54" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 bg-gray-50">
              <div className="text-center">
                <div className="text-7xl mb-4">💬</div>
                <p className="text-xl font-medium text-gray-500">Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 max-w-3xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Camera</h3>
              <button
                onClick={closeCamera}
                className="text-gray-500 hover:text-gray-700 text-4xl leading-none"
              >
                ×
              </button>
            </div>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-2xl bg-black"
              style={{ maxHeight: '60vh' }}
            />
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={closeCamera}
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 font-medium shadow-lg"
              >
                Capture Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;