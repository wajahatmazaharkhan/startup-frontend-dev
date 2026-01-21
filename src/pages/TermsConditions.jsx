const TermsConditions = () => {
  return (
    <section className='w-full bg-white py-16 px-4 md:px-8'>
      <div className='max-w-[1100px] mx-auto'>
        {/* PAGE TITLE */}
        <h1 className='text-[32px] md:text-[48px] font-semibold text-black mb-4'>
          Terms & Conditions
        </h1>

        <p className='text-sm md:text-base text-gray-600 mb-10'>
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* INTRO */}
        <p className='text-gray-700 leading-relaxed mb-8'>
          Welcome to <span className='font-semibold'>Safe Harbour Pvt Ltd</span>
          . These Terms and Conditions govern your access to and use of our
          website, mobile applications, and healthcare-related services. By
          accessing or using our services, you agree to be bound by these terms.
        </p>

        {/* SECTION 1 */}
        <div className='mb-8'>
          <h2 className='text-xl md:text-2xl font-semibold mb-3'>
            1. About Safe Harbour Pvt Ltd
          </h2>
          <p className='text-gray-700 leading-relaxed'>
            Safe Harbour Pvt Ltd is a healthcare technology company providing
            digital healthcare services, including consultations, wellness
            support, and access to qualified medical professionals. Our services
            are intended to support, not replace, professional medical advice.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className='mb-8'>
          <h2 className='text-xl md:text-2xl font-semibold mb-3'>
            2. Eligibility
          </h2>
          <p className='text-gray-700 leading-relaxed'>
            You must be at least 18 years old to use our services. If you are
            using the platform on behalf of another individual, you confirm that
            you are legally authorized to do so.
          </p>
        </div>

        {/* SECTION 3 */}
        <div className='mb-8'>
          <h2 className='text-xl md:text-2xl font-semibold mb-3'>
            3. Medical Disclaimer
          </h2>
          <p className='text-gray-700 leading-relaxed'>
            The information provided through Safe Harbour Pvt Ltd is for
            informational purposes only and does not constitute medical advice,
            diagnosis, or treatment. Always consult a qualified healthcare
            professional regarding any medical condition.
          </p>
        </div>

        {/* SECTION 4 */}
        <div className='mb-8'>
          <h2 className='text-xl md:text-2xl font-semibold mb-3'>
            4. User Responsibilities
          </h2>
          <ul className='list-disc list-inside text-gray-700 space-y-2'>
            <li>Provide accurate and complete information</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Use the platform only for lawful purposes</li>
            <li>Not misuse or attempt to disrupt our services</li>
          </ul>
        </div>

        {/* SECTION 5 */}
        <div className='mb-8'>
          <h2 className='text-xl md:text-2xl font-semibold mb-3'>
            5. Privacy & Data Protection
          </h2>
          <p className='text-gray-700 leading-relaxed'>
            Your privacy is important to us. All personal and medical data is
            handled in accordance with applicable data protection laws and our
            Privacy Policy. By using our services, you consent to the collection
            and use of your information as described therein.
          </p>
        </div>

        {/* SECTION 6 */}
        <div className='mb-8'>
          <h2 className='text-xl md:text-2xl font-semibold mb-3'>
            6. Payments & Refunds
          </h2>
          <p className='text-gray-700 leading-relaxed'>
            Any fees for paid services will be clearly disclosed before
            purchase. Payments are non-refundable unless otherwise stated or
            required by law.
          </p>
        </div>

        {/* SECTION 7 */}
        <div className='mb-8'>
          <h2 className='text-xl md:text-2xl font-semibold mb-3'>
            7. Limitation of Liability
          </h2>
          <p className='text-gray-700 leading-relaxed'>
            Safe Harbour Pvt Ltd shall not be liable for any indirect,
            incidental, or consequential damages arising from your use of our
            services, including reliance on medical information provided through
            the platform.
          </p>
        </div>

        {/* SECTION 8 */}
        <div className='mb-8'>
          <h2 className='text-xl md:text-2xl font-semibold mb-3'>
            8. Modifications to Terms
          </h2>
          <p className='text-gray-700 leading-relaxed'>
            We reserve the right to update or modify these Terms & Conditions at
            any time. Continued use of the platform after changes are posted
            constitutes acceptance of the updated terms.
          </p>
        </div>

        {/* SECTION 9 */}
        <div className='mb-12'>
          <h2 className='text-xl md:text-2xl font-semibold mb-3'>
            9. Contact Information
          </h2>
          <p className='text-gray-700 leading-relaxed'>
            If you have any questions regarding these Terms & Conditions, please
            contact us at:
          </p>
          <p className='mt-2 text-gray-800 font-medium'>Safe Harbour Pvt Ltd</p>
        </div>

        {/* FOOTER NOTE */}
        <p className='text-sm text-gray-500'>
          © {new Date().getFullYear()} Safe Harbour Pvt Ltd. All rights
          reserved.
        </p>
      </div>
    </section>
  );
};

export default TermsConditions;
