import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Bookovia",
  description:
    "Learn how Bookovia protects your privacy and personal data. Our comprehensive privacy policy explains data collection, usage, and your rights on our vehicle detailing marketplace platform.",
  metadataBase: new URL("https://www.bookovia.com"),
  openGraph: {
    type: "website",
    title: "Privacy Policy - Bookovia",
    description:
      "Learn how Bookovia protects your privacy and personal data. Our comprehensive privacy policy explains data collection, usage, and your rights on our vehicle detailing marketplace platform.",
    url: "/privacy-policy",
    siteName: "Bookovia",
    images: [
      {
        url: "/assets/privacy-policy-og.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Bookovia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bookovia",
    title: "Privacy Policy - Bookovia",
    description:
      "Learn how Bookovia protects your privacy and personal data. Our comprehensive privacy policy explains data collection, usage, and your rights on our vehicle detailing marketplace platform.",
    images: ["/assets/privacy-policy-og.png"],
  },
  other: {
    "fb:app_id": "4204948016400818",
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <Link href="/" className="text-primary hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: April 04, 2025</p>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to Bookovia Technologies Inc. ("Bookovia", "we", "us", or "our"). We are Bookovia Technologies Inc.,
            a company incorporated in the United States with a registered office address at 254 Chapman Rd, Ste 208
            #21058, Newark, Delaware 19702, USA.
          </p>
          <p>
            We respect your privacy and are committed to protecting your personal information. This Privacy Policy
            explains how we collect, use, and share information when you use our platform as a Car Owner ("User"),
            including booking vehicle services through our platform. By accessing or using Bookovia Technologies Inc.,
            you agree to the terms of this Privacy Policy.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <p>We collect different types of information to provide and improve our services, including:</p>
          <p>
            <strong>Personal Information:</strong> When you create an account or use our services, we may collect your
            name, email, phone number, address, and payment details.
          </p>
          <p>
            <strong>Vehicle Information:</strong> We collect details about your vehicle, such as make, model, year, and
            service history, to facilitate appropriate service matching.
          </p>
          <p>
            <strong>Usage Data:</strong> Information about your interactions with our platform, including IP address,
            browser type, operating system, referral URLs, and service activity.
          </p>
          <p>
            <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to personalize
            your experience, analyze site traffic, and improve our services.
          </p>
          <p>
            <strong>Customer Support Communications:</strong> Any information you provide when contacting our customer
            support team, including email correspondences and chat logs.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use the information collected for various purposes, including but not limited to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Providing and improving our booking services.</li>
            <li>Facilitating communication between car owners and car specialists.</li>
            <li>Processing payments securely and maintaining financial records.</li>
            <li>Sending important notifications, including service updates, reminders, and confirmations.</li>
            <li>Sending marketing communications if you opt in, with an easy option to unsubscribe.</li>
            <li>Conducting data analysis and research to enhance user experience and platform functionality.</li>
            <li>Ensuring security and preventing fraud, unauthorized access, and malicious activities.</li>
            <li>Complying with legal obligations and enforcing our terms and policies.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Information Sharing and Disclosure</h2>
          <p>
            We do not sell or rent your personal information. However, we may share data under the following
            circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>With Car Specialists:</strong> To facilitate bookings, service requests, and communication.
            </li>
            <li>
              <strong>With Third-Party Service Providers:</strong> Including payment processors, hosting providers,
              customer service platforms, and analytics partners who assist in operating our platform.
            </li>
            <li>
              <strong>For Legal and Security Purposes:</strong> If required by law or to protect our legal rights,
              comply with court orders, or respond to legal requests.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your
              information may be transferred to a new entity.
            </li>
            <li>
              <strong>Maryland Compliance:</strong> No mobile information will be shared with third parties/affiliates
              for marketing/promotional purposes. Information sharing to subcontractors in support services, such as
              customer service, is permitted. All other use case categories exclude text messaging originator opt-in
              data and consent; this information will not be shared with any third parties.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
          <p>
            We take data security seriously and implement industry-standard security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or destruction. These measures include
            encryption, access controls, and secure server hosting. However, no method of transmission over the internet
            is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights and Choices</h2>
          <p>You have certain rights concerning your personal information, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Access and Correction:</strong> You may access, update, or correct your information at any time
              through your account settings.
            </li>
            <li>
              <strong>Data Deletion:</strong> You can request the deletion of your personal information, subject to
              certain legal obligations.
            </li>
            <li>
              <strong>Opting Out of Marketing Communications:</strong> If you do not wish to receive promotional emails,
              you can opt out through your account preferences or by clicking the unsubscribe link in our emails.
            </li>
            <li>
              <strong>Restricting Data Processing:</strong> Under certain conditions, you may request that we limit the
              processing of your personal data.
            </li>
            <li>
              <strong>Cookies and Tracking:</strong> You can manage your cookie preferences through your browser
              settings.
            </li>
            <li>
              <strong>Maryland Residents:</strong> If you are a Maryland resident, you have the right to request details
              about the categories of personal data we collect, how we use it, and with whom we share it. You also have
              the right to request the deletion of your personal data. To exercise these rights, please contact us at
              support@mail.bookovia.com.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Data Breach Notification (Maryland Compliance)</h2>
          <p>
            If we experience a data breach involving personal information of Maryland residents, we will notify affected
            individuals within 45 days of discovering the breach, as required by the Maryland Personal Information
            Protection Act (PIPA).
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">8. Third-Party Links and Services</h2>
          <p>
            Our platform may contain links to third-party websites, services, or applications. We are not responsible
            for the privacy practices of these third parties. We encourage you to read their privacy policies before
            providing any personal information.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">9. Retention of Your Information</h2>
          <p>
            We retain your personal data only for as long as necessary to provide our services and comply with legal
            obligations. When no longer required, we securely delete or anonymize your information.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">10. Children's Privacy</h2>
          <p>
            Bookovia Technologies Inc. does not knowingly collect personal information from individuals under the age of
            18. If we discover that we have unintentionally collected such data, we will take steps to delete it
            promptly.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">11. Account Deletion</h2>
          <p>
            If you would like to delete your account and all associated personal information, you can do so at any time
            by following these steps:
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li className="mb-2">
              <strong>In-App Deletion:</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>Log in to your account.</li>
                <li>
                  Navigate to <strong>Account Settings</strong>.
                </li>
                <li>
                  Select <strong>Delete Account</strong> and follow the on-screen instructions to confirm the deletion.
                </li>
              </ul>
            </li>
            <li>
              <strong>Request by Email:</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>
                  You may also request account deletion by contacting our support team at support@mail.bookovia.com.
                </li>
                <li>Please include the email address associated with your account in your request.</li>
                <li>We may take steps to verify your identity before processing your deletion request.</li>
              </ul>
            </li>
          </ol>
          <p>
            Please note that once your account is deleted, your information may no longer be accessible. Certain data
            may be retained where required by law or for legitimate business purposes, as outlined in this Privacy
            Policy.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements,
            or service enhancements. Any modifications will be posted on this page with the updated effective date. We
            encourage you to review this policy periodically.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">13. Contact Us</h2>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:</p>
          <p>Bookovia Technologies Inc.</p>
          <p>Email: support@mail.bookovia.com</p>
          <p>
            Thank you for trusting Bookovia Technologies Inc. with your personal information. Your privacy and security
            are our priority.
          </p>
        </div>
      </div>
    </div>
  )
}
