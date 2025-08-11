import Link from "next/link"

export default function TermsUsers() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <Link href="/" className="text-primary hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Terms and Conditions for Users</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: April 04, 2025</p>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to Bookovia Technologies Inc. ("Bookovia", "we", "us", or "our"). We are Bookovia Technologies Inc.,
            a company incorporated in the United States with a registered office address at 254 Chapman Rd, Ste 208
            #21058, Newark, Delaware 19702, USA. These Terms and Conditions govern your use of our platform as a Car
            Owner, including booking services for vehicle maintenance and detailing. By using Bookovia Technologies
            Inc., you agree to comply with these terms. If you are a Car Specialist providing services through our
            platform, please refer to our separate Terms and Conditions for Service Providers.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Definitions</h2>
          <p>"Platform" refers to Bookovia Technologies Inc., including our website and mobile applications.</p>
          <p>"User" refers to anyone accessing or using Bookovia Technologies Inc.</p>
          <p>"Car Owner" refers to individuals using Bookovia Technologies Inc. to book car services.</p>
          <p>"Car Specialist" refers to professionals providing vehicle services through Bookovia Technologies Inc.</p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>You must provide accurate and complete information when creating an account.</li>
            <li>You are responsible for maintaining the security of your account credentials.</li>
            <li>
              Bookovia Technologies Inc. reserves the right to suspend or terminate accounts suspected of fraudulent or
              unauthorized activity.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Booking Services</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Car Owners can request vehicle services from Car Specialists listed on the platform.</li>
            <li>
              Bookovia Technologies Inc. facilitates bookings but does not directly provide vehicle repair or
              maintenance services.
            </li>
            <li>Car Specialists are responsible for the quality and completion of services.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Payments, Fees, and Taxes</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Users agree to pay service fees as displayed on the platform at the time of booking.</li>
            <li>Payments are processed securely through third-party payment providers, including Stripe.</li>
            <li>
              Bookovia Technologies Inc. collects applicable taxes on behalf of the government in accordance with
              Maryland state laws.
            </li>
            <li>Bookovia Technologies Inc. charges a commission fee for services booked through the platform.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Cancellations and Refunds</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Cancellation policies vary by Car Specialist and are displayed at the time of booking.</li>
            <li>Refunds are processed in accordance with Bookovia Technologies Inc.'s refund policy.</li>
            <li>Users may contact customer support for dispute resolution.</li>
            <li>
              For details, refer to the full Refund Policy, which outlines specific refund scenarios, processing
              timelines, and required documentation.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. User Responsibilities</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Users agree to provide accurate vehicle details and service requirements.</li>
            <li>Users shall not engage in fraudulent, abusive, or illegal activities on the platform.</li>
            <li>Car Specialists must comply with industry standards and provide quality services.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">8. Liability and Disclaimers</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Bookovia Technologies Inc. is a marketplace connecting Users and Car Specialists; we do not guarantee the
              quality of services provided.
            </li>
            <li>
              Bookovia Technologies Inc. is not liable for damages, losses, or disputes arising from service
              engagements.
            </li>
            <li>
              Users agree to hold Bookovia Technologies Inc. harmless from any claims related to service transactions.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">9. Intellectual Property</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              All content on Bookovia Technologies Inc., including logos, trademarks, and software, is the property of
              Bookovia Technologies Inc.
            </li>
            <li>Users may not copy, reproduce, or distribute platform content without permission.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">10. SMS Messaging and Notifications</h2>
          <p>Program Name: Bookovia Technologies Inc. SMS Notifications</p>
          <p>
            Program Description: Users opting in will receive booking confirmations, updates, reminders, and promotional
            messages related to car services.
          </p>
          <p>
            You can cancel the SMS service at any time by texting "STOP" to the shortcode. Upon sending "STOP", we will
            confirm your unsubscribe status via SMS. Following this confirmation, you will no longer receive SMS
            messages from us. To rejoin, sign up as you did initially, and we will resume sending SMS messages to you.
          </p>
          <p>
            If you experience issues with the messaging program, reply with the keyword "HELP" for more assistance, or
            reach out directly to support@mail.bookovia.com
          </p>
          <p>Carriers are not liable for delayed or undelivered messages.</p>
          <p>
            Message and data rates may apply for messages sent to you from us and to us from you. Message frequency
            varies. For questions about your text plan or data plan, contact your wireless provider.
          </p>
          <p>For privacy-related inquiries, please refer to our Privacy Policy.</p>

          <h2 className="text-xl font-semibold mt-8 mb-4">11. Termination and Suspension</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Bookovia Technologies Inc. reserves the right to suspend or terminate accounts violating these Terms and
              Conditions.
            </li>
            <li>Users may terminate their accounts at any time by contacting support.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">12. Governing Law</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>These Terms and Conditions are governed by the laws of Maryland, United States.</li>
            <li>Any disputes shall be resolved through arbitration or legal proceedings in Maryland.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">13. Amendments</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Bookovia Technologies Inc. may update these Terms and Conditions from time to time.</li>
            <li>Users will be notified of significant changes through email or platform notifications.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">14. Contact Us</h2>
          <p>For any questions or concerns, please contact us at support@mail.bookovia.com</p>
        </div>
      </div>
    </div>
  )
}
