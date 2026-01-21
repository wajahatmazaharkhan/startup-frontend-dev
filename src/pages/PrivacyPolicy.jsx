export default function PrivacyPolicy() {
  return (
    <section className='w-full flex justify-center bg-white py-16 px-4'>
      <div className='w-full max-w-[1000px]'>
        {/* HEADER */}
        <div className='mb-12 text-center'>
          <h1 className='montserrat text-[32px] md:text-[48px] font-semibold text-black'>
            Privacy Policy
          </h1>
          <p className='mt-4 text-gray-500 text-sm md:text-base'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* CONTENT */}
        <div className='space-y-10 text-gray-700 leading-relaxed text-sm md:text-base'>
          {/* INTRO */}
          <p>
            Safe Harbour Pvt Ltd (“Safe Harbour”, “we”, “our”, or “us”) is
            committed to protecting your privacy and safeguarding your personal
            and medical information. This Privacy Policy explains how we
            collect, use, disclose, and protect your information when you use
            our website, mobile applications, and healthcare-related services.
          </p>

          {/* INFORMATION WE COLLECT */}
          <div>
            <h2 className='text-lg md:text-2xl font-semibold text-black mb-3'>
              1. Information We Collect
            </h2>
            <ul className='list-disc pl-6 space-y-2'>
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, date of birth, and contact details.
              </li>
              <li>
                <strong>Health Information:</strong> Medical history, symptoms,
                consultation records, prescriptions, and treatment details
                shared by you or healthcare professionals.
              </li>
              <li>
                <strong>Technical Information:</strong> IP address, device
                information, browser type, and usage data.
              </li>
              <li>
                <strong>Payment Information:</strong> Billing details processed
                securely through third-party payment gateways.
              </li>
            </ul>
          </div>

          {/* HOW WE USE INFO */}
          <div>
            <h2 className='text-lg md:text-2xl font-semibold text-black mb-3'>
              2. How We Use Your Information
            </h2>
            <ul className='list-disc pl-6 space-y-2'>
              <li>To provide and manage healthcare services.</li>
              <li>To connect you with qualified healthcare professionals.</li>
              <li>To improve our platform, services, and user experience.</li>
              <li>
                To communicate important updates and service notifications.
              </li>
              <li>To comply with legal and regulatory obligations.</li>
            </ul>
          </div>

          {/* DATA SHARING */}
          <div>
            <h2 className='text-lg md:text-2xl font-semibold text-black mb-3'>
              3. Information Sharing and Disclosure
            </h2>
            <p>
              We do not sell your personal or medical information. Your data may
              be shared only in the following circumstances:
            </p>
            <ul className='list-disc pl-6 mt-3 space-y-2'>
              <li>With licensed healthcare providers involved in your care.</li>
              <li>
                With trusted service providers under strict confidentiality
                agreements.
              </li>
              <li>When required by law or government authorities.</li>
              <li>
                To protect the rights, safety, and security of users and the
                platform.
              </li>
            </ul>
          </div>

          {/* DATA SECURITY */}
          <div>
            <h2 className='text-lg md:text-2xl font-semibold text-black mb-3'>
              4. Data Security
            </h2>
            <p>
              We implement industry-standard technical and organizational
              measures to protect your data against unauthorized access, loss,
              misuse, or alteration. While we strive to protect your
              information, no system is completely secure.
            </p>
          </div>

          {/* DATA RETENTION */}
          <div>
            <h2 className='text-lg md:text-2xl font-semibold text-black mb-3'>
              5. Data Retention
            </h2>
            <p>
              We retain your personal and health information only for as long as
              necessary to fulfill the purposes outlined in this policy or as
              required by applicable laws and regulations.
            </p>
          </div>

          {/* USER RIGHTS */}
          <div>
            <h2 className='text-lg md:text-2xl font-semibold text-black mb-3'>
              6. Your Rights
            </h2>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Access and review your personal information.</li>
              <li>Request corrections to inaccurate data.</li>
              <li>
                Request deletion of your data, subject to legal obligations.
              </li>
              <li>Withdraw consent where applicable.</li>
            </ul>
          </div>

          {/* THIRD PARTY LINKS */}
          <div>
            <h2 className='text-lg md:text-2xl font-semibold text-black mb-3'>
              7. Third-Party Services
            </h2>
            <p>
              Our platform may contain links to third-party websites or
              services. We are not responsible for the privacy practices or
              content of those third parties.
            </p>
          </div>

          {/* POLICY UPDATES */}
          <div>
            <h2 className='text-lg md:text-2xl font-semibold text-black mb-3'>
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className='text-lg md:text-2xl font-semibold text-black mb-3'>
              9. Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or
              how your data is handled, please contact us at:
            </p>
            <p className='mt-2 font-medium text-black'>Safe Harbour Pvt Ltd</p>
            <p>Email: support@safeharbour.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
