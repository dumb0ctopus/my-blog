// app/privacy-policy/page.js

export default function PrivacyPolicy() {
  return (
    <main className="flex items-center justify-center min-h-screen px-4 mt-24 pb-40 dark:bg-gray-950 dark:text-white">
      <div className="max-w-3xl bg-white dark:bg-gray-950 p-8 rounded-lg text-gray-800 dark:text-gray-200 max-h-[80vh]">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <section className="mb-4">
          <p className="text-lg text-center">
            Your privacy is of utmost importance to us. This Privacy Policy
            outlines how we collect, use, and protect your personal information.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Information We Collect
          </h2>
          <p>
            The only information we collect is your email address, which you
            provide voluntarily for receiving updates, newsletters, or other
            communications.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            How We Use Your Information
          </h2>
          <p>
            We use your email address solely for sending newsletters and
            relevant updates. Your email will not be used for any other purpose.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Information Sharing and Disclosure
          </h2>
          <p>
            We respect your privacy and do not share, sell, or rent your email
            address to any third parties. However, we may use third-party
            services to assist us in sending emails, newsletters, and other
            communications. These services are trusted partners that adhere to
            strict data protection standards.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-6 mb-2">Data Security</h2>
          <p>
            We take reasonable measures to protect your email address and ensure
            its confidentiality. However, please understand that no method of
            electronic transmission or storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Changes to this Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically. Any changes will be
            posted on this page, so we encourage you to review it occasionally.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at
            <a
              href="mailto:jesuloluwa.blog@gmail.com"
              className="text-blue-600 dark:text-blue-400 underline ml-1"
            >
              jesuloluwa.blog@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
