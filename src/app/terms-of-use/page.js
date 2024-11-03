// app/terms-of-service/page.js

export default function TermsOfUse() {
  return (
    <main className="flex items-center justify-center px-4 mt-20 dark:bg-gray-950 dark:text-white">
      <div className="max-w-3xl bg-white dark:bg-gray-950 p-8 rounded-lg text-gray-950 dark:text-gray-200">
        <h1 className="sm:text-3xl text-lg font-bold mb-6 text-center">
          Terms of Service
        </h1>

        <section className="mb-4">
          <p className="sm:text-lg text-center">
            Welcome to our blog. By accessing or using our site, you agree to
            comply with these Terms of Service. Please read them carefully.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="sm:text-2xl font-semibold mt-6 mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing this blog, you agree to abide by these terms. If you
            disagree with any part of these terms, please refrain from using our
            site.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="sm:text-2xl font-semibold mt-6 mb-2">
            2. Use of Content
          </h2>
          <p>
            The content on this site is for informational purposes only. You may
            view, download, and print content from this site for personal,
            non-commercial use only. Unauthorized use, including replication,
            distribution, or re-hosting, is prohibited.
          </p>
        </section>

        <section className="sm:mb-4">
          <h2 className="sm:text-2xl font-semibold mt-6 mb-2">3. User Conduct</h2>
          <p>
            You agree not to use this site to post or transmit any material that
            is unlawful, threatening, abusive, defamatory, or otherwise
            objectionable. We reserve the right to remove any content that
            violates these terms.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="sm:text-2xl font-semibold mt-6 mb-2">
            4. Intellectual Property
          </h2>
          <p>
            All content on this site, including text, graphics, logos, and
            images, is the property of this blog or its content suppliers and is
            protected by copyright and other intellectual property laws.
            Unauthorized use may violate copyright laws.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="sm:text-2xl font-semibold mt-6 mb-2">
            5. Third-Party Links
          </h2>
          <p>
            Our blog may contain links to third-party websites. We are not
            responsible for the content or policies of these sites and encourage
            you to review their terms and privacy policies.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="sm:text-2xl font-semibold mt-6 mb-2">
            6. Disclaimer of Warranties
          </h2>
          <p>
            The content on this blog is provided &#39;as is&#39; without
            warranties of any kind. We make no guarantees as to the accuracy,
            completeness, or timeliness of the information on our site.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="sm:text-2xl font-semibold mt-6 mb-2">
            7. Limitation of Liability
          </h2>
          <p>
            In no event shall this blog or its affiliates be liable for any
            direct, indirect, incidental, consequential, or punitive damages
            arising from your use of this site or the information provided.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="sm:text-2xl font-semibold mt-6 mb-2">
            8. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms of Service at any time.
            Changes will be posted on this page, so we encourage you to review
            it periodically.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="sm:text-2xl font-semibold mt-6 mb-2">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at{" "}
            <a
              href="mailto:jesuloluwa.blog@gmail.com"
              className="text-blue-600 dark:text-blue-400 underline"
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
