import React from 'react';
import Logo from '../../../assets/Logo.png';
import { socialLinks } from '../../../data/social';
import { ChevronDown } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='w-full bg-white pt-10 pb-6'>
      <div className='container mx-auto px-6'>
        {/* MAIN FOOTER CARD */}
        <div className='rounded-2xl bg-gray-100 px-6 py-14 md:px-12'>
          {/* TOP */}
          <div className='flex flex-col items-center text-center'>
            {/* LOGO */}
            <img
              src={Logo}
              alt='Safe Harbour logo'
              className='h-10 w-10 mb-4'
            />

            {/* BRAND TAGLINE */}
            <p className='text-sm text-gray-600 max-w-md'>
              Safe Harbour Pvt Ltd is committed to delivering secure,
              personalized, and reliable healthcare services you can trust.
            </p>
          </div>

          {/* NAV LINKS */}
          <div className='mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-medium text-gray-700'>
            <a href='/' className='hover:text-purple-600 transition'>
              Home
            </a>
            <a href='/about' className='hover:text-purple-600 transition'>
              About
            </a>
            <a
              href='/services'
              className='flex items-center gap-1 hover:text-purple-600 transition'
            >
              Services <ChevronDown size={14} />
            </a>
            <a
              href='/privacy-policy'
              className='hover:text-purple-600 transition'
            >
              Privacy Policy
            </a>
            <a
              href='/terms-and-conditions'
              className='hover:text-purple-600 transition'
            >
              Terms & Conditions
            </a>
          </div>

          {/* DIVIDER */}
          <div className='my-10 h-px w-full bg-gray-200' />

          {/* BOTTOM */}
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            {/* SOCIAL ICONS */}
            <div className='flex gap-5'>
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.name}
                  className='transition-opacity hover:opacity-70'
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className='h-6 w-6 md:h-7 md:w-7 object-contain'
                  />
                </a>
              ))}
            </div>

            {/* COPYRIGHT */}
            <p className='text-xs md:text-sm text-gray-600 text-center'>
              © {new Date().getFullYear()} Safe Harbour Pvt Ltd. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
