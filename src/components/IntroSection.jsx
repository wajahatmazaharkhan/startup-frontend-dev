
import { ArrowRight } from 'lucide-react';

const IntroSection = ({ onGetStarted }) => {
  return (
    //  Added consistent horizontal padding (px-4 sm:px-6) for safety margins on mobile
    <div className=" fixed inset-0  z-50 min-h-screen flex flex-col items-center justify-center bg-white px-4 sm:px-6">
      
      <div className="max-w-3xl text-center w-full">
       
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 md:mb-8">
          Patients can consult with healthcare providers from the comfort of their home,
          
          
          <span className="block text-gray-300 mt-2 sm:mt-3">
            eliminating travel time and costs.
          </span>
        </h1>

      
        <div className="mt-8 md:mt-10 flex justify-center">
          <button
            onClick={onGetStarted}
           
            className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-purple-500 hover:bg-purple-600 text-white font-medium py-3.5 px-8 sm:px-10 text-base sm:text-lg rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            Get Started
           
            <div className="bg-white/20 rounded-full p-1 transition-transform duration-300 group-hover:translate-x-1">
               <ArrowRight size={18} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;