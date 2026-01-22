import React, { useState } from 'react';
import { MessageSquare, Mic, Video, Sparkles, User, ArrowLeft, ArrowRight } from 'lucide-react';

export default function BookingAssessment() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    feeling: null,
    duration: '',
    spokenBefore: '',
    supportType: '',
    matchingPref: ''
  });
  const [error, setError] = useState('');

  const totalSteps = 5;

  // Validation before moving next
  const handleNext = () => {
    if (step === 0) {
      setStep(1);
      return;
    }

    const currentField = [null, 'feeling', 'duration', 'spokenBefore', 'supportType', 'matchingPref'][step];
    if (formData[currentField] === '' || formData[currentField] === null) {
      setError('Please select an option to continue');
      return;
    }

    setError('');
    setStep(step + 1);
  };

  // Backend API Integration
  const handleSubmit = async () => {
    if (!formData.matchingPref) {
      setError('Please select an option to continue');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      // Replace with your actual MERN backend URL
      const response = await fetch('https://your-api-endpoint.com/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Assessment submitted successfully!");
        // Optional: setStep(0) or redirect to a thank you page
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F3EFFF] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      
      {/* BACKGROUND STYLING: Matching the soft aura effect from your images */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(139, 128, 249, 0.18) 0%, rgba(243, 239, 255, 0) 75%)`
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-purple-400/5 rounded-full blur-[120px] pointer-events-none" />

      {/* NAVIGATION: Back Button */}
      <div className="absolute top-6 left-6 z-20">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-10 h-10 flex items-center justify-center border border-purple-200/50 rounded-full bg-white/60 backdrop-blur-md shadow-sm hover:bg-white transition-all"
            aria-label="Go back"
          >
            <ArrowLeft size={18} className="text-purple-600" />
          </button>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="z-10 w-full max-w-2xl flex flex-col items-center text-center">

        {/* STEP 0: Welcome Screen */}
        {step === 0 && (
          <div className="animate-in fade-in zoom-in duration-700">
            <h1 className="text-4xl sm:text-6xl font-serif mb-6 text-[#1A1A1A] tracking-tight leading-tight">
              Answer a few quick questions
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 font-medium">Takes less than 2 minutes</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleNext}
                className="bg-[#8B80F9] text-white px-10 py-4 rounded-full flex items-center justify-center gap-3 hover:bg-[#7a6ef0] transition-all shadow-xl shadow-purple-500/20 active:scale-95"
              >
                Take Questions
                <ArrowRight size={18} />
              </button>
              <button className="px-10 py-4 rounded-full text-purple-600 border border-purple-200 bg-white/40 backdrop-blur-sm hover:bg-purple-50 transition-all">
                Back to Services
              </button>
            </div>
          </div>
        )}

        {/* ASSESSMENT STEPS */}
        {step > 0 && (
          <div className="w-full flex flex-col items-center animate-in slide-in-from-bottom-6 duration-500">
            <p className="text-purple-500 font-bold mb-6 tracking-widest uppercase text-xs sm:text-sm">
              Question {step} of {totalSteps}
            </p>

            {/* STEP 1: Emotion Selection */}
            {step === 1 && (
              <StepWrapper title="How are you feeling right now?">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-4">
                  {['😭', '🙁', '😐', '🙂', '🤩'].map((emoji, i) => (
                    <button
                      key={i}
                      onClick={() => setFormData({ ...formData, feeling: i })}
                      className={`text-4xl sm:text-5xl p-4 rounded-3xl transition-all ${
                        formData.feeling === i ? 'bg-white shadow-xl scale-125' : 'hover:bg-white/40'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* STEP 2: Duration Timeline */}
            {step === 2 && (
              <StepWrapper title="How long has this been going on?">
                <div className="relative py-4 w-full max-w-xs mx-auto">
                  <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-purple-200" />
                  {['Just Started', 'Few weeks', 'Few months', 'Long time'].map((item, index) => {
                    const isActive = formData.duration === item;
                    return (
                      <button
                        key={item}
                        onClick={() => setFormData({ ...formData, duration: item })}
                        className="relative flex items-center w-full py-5 group"
                      >
                        <div className={`w-1/2 text-right pr-6 transition-all ${isActive ? 'text-purple-700 font-bold' : 'text-gray-400'}`}>
                          {index % 2 === 0 && <span>{item}</span>}
                        </div>
                        <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 z-10 transition-all ${
                          isActive ? 'bg-purple-600 border-purple-100 scale-150' : 'bg-white border-purple-200'
                        }`} />
                        <div className={`w-1/2 text-left pl-6 transition-all ${isActive ? 'text-purple-700 font-bold' : 'text-gray-400'}`}>
                          {index % 2 !== 0 && <span>{item}</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </StepWrapper>
            )}

            {/* STEP 3: History */}
            {step === 3 && (
              <StepWrapper title="Have you spoken to a professional before?">
                <div className="flex flex-col gap-3 w-full max-w-sm">
                  {['Yes', 'No', 'Prefer not to say'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setFormData({ ...formData, spokenBefore: opt })}
                      className={`p-5 rounded-3xl border-2 transition-all font-semibold ${
                        formData.spokenBefore === opt 
                        ? 'border-purple-500 bg-white text-purple-700 shadow-lg scale-[1.02]' 
                        : 'border-transparent bg-white/40 text-gray-600 hover:bg-white/60'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* STEP 4: Support Types */}
            {step === 4 && (
              <StepWrapper title="Preferred support type?" sub="(You can change this later)">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full px-4">
                  <GridCard
                    icon={MessageSquare}
                    label="Chat"
                    active={formData.supportType === 'chat'}
                    onClick={() => setFormData({ ...formData, supportType: 'chat' })}
                  />
                  <GridCard
                    icon={Mic}
                    label="Voice"
                    active={formData.supportType === 'voice'}
                    onClick={() => setFormData({ ...formData, supportType: 'voice' })}
                  />
                  <GridCard
                    icon={Video}
                    label="Video"
                    active={formData.supportType === 'video'}
                    onClick={() => setFormData({ ...formData, supportType: 'video' })}
                  />
                </div>
              </StepWrapper>
            )}

            {/* STEP 5: Matching Preference */}
            {step === 5 && (
              <StepWrapper title="Find your professional">
                <div className="flex flex-col gap-4 w-full px-4 max-w-xl">
                  <BigCard
                    icon={Sparkles}
                    label="Let Safe Harbour choose the right professional for me"
                    active={formData.matchingPref === 'auto'}
                    onClick={() => setFormData({ ...formData, matchingPref: 'auto' })}
                  />
                  <BigCard
                    icon={User}
                    label="I want to choose a professional myself"
                    active={formData.matchingPref === 'manual'}
                    onClick={() => setFormData({ ...formData, matchingPref: 'manual' })}
                  />
                </div>
              </StepWrapper>
            )}

            {/* ERRORS & ACTION BUTTON */}
            {error && <p className="text-red-500 font-semibold text-sm mt-6 bg-white/80 px-4 py-1 rounded-full animate-bounce">{error}</p>}

            <button
              onClick={step === totalSteps ? handleSubmit : handleNext}
              disabled={isSubmitting}
              className={`mt-10 bg-[#8B80F9] text-white w-full sm:w-auto px-14 py-4 rounded-full flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#7a6ef0]'}`}
            >
              <span className="font-bold text-lg">{isSubmitting ? 'Submitting...' : step === totalSteps ? 'Submit' : 'Next'}</span>
              {!isSubmitting && <div className="bg-white rounded-full p-1"><ArrowRight size={14} className="text-[#8B80F9]" /></div>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- UI HELPERS ---------- */

const StepWrapper = ({ title, sub, children }) => (
  <div className="flex flex-col items-center w-full">
    <h2 className="text-3xl sm:text-5xl font-serif text-[#1A1A1A] mb-2 leading-tight px-4">{title}</h2>
    {sub && <p className="text-gray-500 text-sm mb-8 italic">{sub}</p>}
    <div className="w-full mt-4 flex justify-center">{children}</div>
  </div>
);

const GridCard = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-row sm:flex-col items-center justify-center gap-4 sm:gap-0 p-6 sm:p-10 rounded-[2rem] border-2 transition-all duration-300
    ${active ? 'border-purple-500 bg-white shadow-xl scale-105' : 'border-transparent bg-white/40 hover:bg-white/60'}`}
  >
    <Icon size={32} className={active ? 'text-purple-600' : 'text-gray-400'} />
    <span className={`sm:mt-4 font-bold text-lg ${active ? 'text-purple-900' : 'text-gray-500'}`}>{label}</span>
  </button>
);

const BigCard = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-5 p-6 rounded-[2.5rem] border-2 text-left transition-all duration-300
    ${active ? 'border-purple-500 bg-white shadow-xl scale-[1.03]' : 'border-transparent bg-white/40 hover:bg-white/60'}`}
  >
    <div className={`p-4 rounded-2xl shrink-0 ${active ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
      <Icon size={28} />
    </div>
    <span className="font-bold text-gray-800 text-lg sm:text-xl leading-snug">{label}</span>
  </button>
);