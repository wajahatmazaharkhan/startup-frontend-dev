import { AboutUs, DoctorUI } from '../components';
import { Footer, Navbar } from '../components';
import HeroSection from '../components/HeroSection';
import Testimonials from '../components/ui/testimonials/Testimonials';
import IntroSection from '../components/IntroSection';
import { useState } from 'react';
import DoctorCard from '../components/ui/cards/DoctorCard';
import TestimonialsCard from '../components/ui/testimonials/TestimonialsCard';

const Home = () => {
  const [showLanding, setShowLanding] = useState(true);
  const isLandingVisible = showLanding;
  const handleGetStarted = () => {
    setShowLanding(false);
  };
  //==== NOT REQUIRED AS OF NOW ====//
  // if (isLandingVisible) {
  //   return <IntroSection onGetStarted={handleGetStarted} />;
  // }
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='grow'>
        <div className='mt-20 md:mt-30'>
          <HeroSection />
        </div>
        <div>
          <AboutUs />
        </div>
        <DoctorUI />
        <div className='flex flex-col justify-center items-center'>
          <div className='text-center mb-12'>
            <h2 class='text-3xl md:text-4xl font-serif font-bold  mb-4 text-[#8473e8]'>
              Featured Counsellors
            </h2>
            <p class='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Connect with our top-rated mental health professionals, each
              carefully vetted and committed to your well-being.
            </p>
          </div>

          <div className='mb-10 bg-[#f7f8f5]'>
            <DoctorCard />
          </div>
          <button class='inline-flex items-center justify-center gap-1 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50  border-[1.5px] border-[var(--color-brand)] bg-transparent text-[var(--text-purple-500)] hover:bg-[var(--color-brand)] hover:text-white py-3 rounded-2xl px-6 text-sm  '>
            View All Counsellors
          </button>
        </div>
        <section className='mt-10'>
          <Testimonials />
        </section>
        <section>
          <IntroSection />
        </section>
      </main>
    </div>
  );
};

export default Home;
