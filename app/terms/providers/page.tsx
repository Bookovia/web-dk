import Link from "next/link"

export default function TermsProviders() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <Link href="/" className="text-primary hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Terms and Conditions for Providers</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: April 04, 2025</p>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to Bookovia Technologies Inc. ("Bookovia", "we", "us", or "our"). We are Bookovia Technologies Inc.,
            a company incorporated in the United States with a registered office address at 254 Chapman Rd, Ste 208
            #21058, Newark, Delaware 19702, USA. These Terms and Conditions govern your use of our platform as a Car
            Specialist providing vehicle services. By using Bookovia Technologies Inc., you agree to comply with these
            terms.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Definitions</h2>
          <p>"Platform" refers to Bookovia Technologies Inc., including our website and mobile applications.</p>
          <p>"User" refers to anyone accessing or using Bookovia Technologies Inc.</p>
          <p>"Car Owner" refers to individuals using Bookovia Technologies Inc. to book car services.</p>
          <p>"Car Specialist" refers to professionals providing vehicle services through Bookovia Technologies Inc.</p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Specialist Accounts</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Car Specialists must provide accurate and up-to-date business and service information.</li>
            <li>You are responsible for maintaining the security of your account credentials.</li>
            <li>
              Bookovia Technologies Inc. reserves the right to suspend or terminate accounts suspected of fraudulent or
              unauthorized activity.
            </li>
            <li>
              Your email address and phone number will be used for account management, notifications, and support
              purposes.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Service Listings and Responsibilities</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Car Specialists must accurately describe their services, pricing, and availability.</li>
            <li>You are responsible for delivering high-quality services in accordance with industry standards.</li>
            <li>
              Failure to meet service expectations may result in penalties, suspension, or removal from the platform.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Payments and Fees</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Bookovia Technologies Inc. charges a commission on all services booked through the platform.</li>
            <li>
              Payments will be processed through third-party providers and remitted according to the payout schedule.
            </li>
            <li>
              As a Car Specialist, you have the right to set your preferred payout schedule, determining when your
              earnings are remitted to your account.
            </li>
            <li>Car Specialists must ensure their payment details are accurate to receive payouts.</li>
            <li>Applicable taxes will be collected on behalf of the government.</li>
            <li>
              Bookovia Technologies Inc. uses Stripe and Bosthog for payment processing and tracking transactions.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Cancellations and Refunds</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Car Specialists must outline their cancellation policies, which will be displayed to Car Owners at the
              time of booking.
            </li>
            <li>Refunds will be handled in accordance with Bookovia Technologies Inc.'s Refund Policy.</li>
            <li>Disputes regarding cancellations and refunds must be reported to customer support for resolution.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Code of Conduct</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Car Specialists must provide professional and courteous service to Car Owners.</li>
            <li>You may not engage in fraudulent, abusive, or illegal activities on the platform.</li>
            <li>Any misuse of the platform may result in account termination.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">8. Liability and Disclaimers</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Bookovia Technologies Inc. acts solely as a marketplace and does not assume liability for the services
              provided.
            </li>
            <li>
              Car Specialists are responsible for their own insurance coverage and compliance with local business
              regulations.
            </li>
            <li>Bookovia Technologies Inc. is not liable for disputes between Car Specialists and Car Owners.</li>
            <li>Google Analytics is used to track user activity for performance improvements.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">9. Intellectual Property</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              All content on Bookovia Technologies Inc., including logos, trademarks, and software, is the property of
              Bookovia Technologies Inc.
            </li>
            <li>Car Specialists may not copy, reproduce, or distribute platform content without permission.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">10. SMS Messaging and Notifications</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Car Specialists opting in will receive booking notifications, updates, and promotional messages.</li>
            <li>To cancel SMS service, text "STOP" to the shortcode. Message and data rates may apply.</li>
            <li>For privacy-related inquiries, please refer to our Privacy Policy.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">11. Termination and Suspension</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Bookovia Technologies Inc. reserves the right to suspend or terminate accounts violating these Terms and
              Conditions.
            </li>
            <li>Car Specialists may terminate their accounts at any time by contacting support.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">12. Governing Law</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>These Terms and Conditions are governed by the laws of Maryland, United States.</li>
            <li>Any disputes shall be resolved through arbitration or legal proceedings in Maryland.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">13. Amendments</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Bookovia Technologies Inc. may update these Terms and Conditions from time to time.</li>
            <li>Car Specialists will be notified of significant changes through email or platform notifications.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">14. Contact Us</h2>
          <p>For any questions or concerns, please contact us at support@mail.bookovia.com</p>
        </div>
      </div>
    </div>
  )
}
