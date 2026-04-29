import { Header } from "@/components/Header";
import { FooterNew } from "@/components/FooterNew";
import { PageTransition } from "@/components/PageTransition";

const PrivacyPolicy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold text-black mb-6">
              Privacy Policy
            </h1>

            <p className="text-gray-700 mb-4 text-sm">
              At <strong>Jelimo Creatives</strong>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              We may collect personal information that you provide directly, such as your name, email address, phone number, billing and shipping details. We may also collect non-personal information automatically through your use of our website, such as IP address, browser type, pages visited, and other analytics data.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 font-semibold mb-4">
              Your information is used to:
            </p>
            <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
              <li>Process and fulfill orders and services.</li>
              <li>Communicate with you regarding your orders, promotions, or updates.</li>
              <li>Improve our website, products, and services.</li>
              <li>Ensure the security and integrity of our systems.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-text-gray-900 mb-3 mt-6">
              3. Sharing Your Information
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who help us operate our website, process payments, or deliver products. These providers are bound to keep your information secure.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              4. Cookies and Tracking
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can choose to disable cookies in your browser settings, though some features of our site may not function properly.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              5. Data Security
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              6. Your Rights
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              You have the right to access, update, or request deletion of your personal information. You may also unsubscribe from marketing communications at any time by following the instructions in the messages or contacting us directly.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              We may update this Privacy Policy from time to time. The updated version will be posted on this page with the effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">
              8. Contact Us
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at:
            </p>
            <p className="text-gray-700 font-semibold">
              Email: jelimocreatives@gmail.com <br />
              Phone: +254 704-904-678 <br />
              Address: Nairobi, Kenya
            </p>
          </div>
        </section>

        <FooterNew />
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicy;
