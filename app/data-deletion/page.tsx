import Link from "next/link"

export default function DataDeletionPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <Link href="/" className="text-primary hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Data Deletion Policy</h1>
        <p className="text-sm text-gray-500 mb-2">Bookovia Marketplace Platform</p>
        <p className="text-sm text-gray-500 mb-8">Last Updated: May 18, 2025</p>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Overview</h2>
          <p>
            Bookovia is committed to protecting your privacy and providing you with control over your personal data.
            This Data Deletion Policy explains how users can request deletion of their personal information, what data
            is deleted, what data may be retained for legal or business purposes, and the process for data deletion
            requests.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Your Right to Data Deletion</h2>
          <p>As a Bookovia user, you have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Request deletion of your personal data from our platform</li>
            <li>Receive confirmation that your data has been deleted</li>
            <li>Understand what data may be retained and why</li>
            <li>Have your data deletion request processed within a reasonable timeframe</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Types of Data Subject to Deletion</h2>

          <h3 className="text-lg font-medium mt-6 mb-3">3.1 User Profile Data</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Name, email address, phone number</li>
            <li>Profile photos and descriptions</li>
            <li>Location information</li>
            <li>Account preferences and settings</li>
            <li>Marketing communication preferences</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3">3.2 Service History Data</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Booking history and details</li>
            <li>Service reviews and ratings you've left</li>
            <li>Communication history between users</li>
            <li>Payment method information (card details are never stored)</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3">3.3 Vehicle Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Vehicle details (make, model, year, etc.)</li>
            <li>Service preferences</li>
            <li>Photos of vehicles (if uploaded)</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3">3.4 Detailing Specialist Data</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Business information and certifications</li>
            <li>Service offerings and pricing</li>
            <li>Portfolio photos</li>
            <li>Business documents and verification materials</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Retention for Legal and Business Purposes</h2>
          <p>Some data may be retained even after a deletion request for the following reasons:</p>

          <h3 className="text-lg font-medium mt-6 mb-3">4.1 Legal Compliance (Retained for up to 7 years)</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Transaction records for tax and accounting purposes</li>
            <li>Records required for dispute resolution</li>
            <li>Data needed to comply with regulatory requirements</li>
            <li>Information required for legal proceedings</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3">
            4.2 Security and Fraud Prevention (Retained for up to 3 years)
          </h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Information needed to prevent fraudulent activities</li>
            <li>Security incident logs</li>
            <li>Account security verification records</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3">4.3 Anonymous Analytics Data</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Aggregated, anonymized usage statistics</li>
            <li>Performance metrics that cannot be linked back to individuals</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Deletion Process</h2>

          <h3 className="text-lg font-medium mt-6 mb-3">5.1 How to Request Data Deletion</h3>

          <p className="font-medium">Option 1: In-App Request</p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Log into your Bookovia account</li>
            <li>Go to Settings &gt; Privacy &amp; Security</li>
            <li>Select "Request Account Deletion"</li>
            <li>Confirm your request and provide reason (optional)</li>
          </ol>

          <p className="font-medium">Option 2: Email Request</p>
          <p>Send an email to: privacy@bookovia.com</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Subject: "Data Deletion Request"</li>
            <li>Include: Full name, email address associated with account, and reason for deletion (optional)</li>
          </ul>

          <p className="font-medium">Option 3: Written Request</p>
          <p>Mail a written request to:</p>
          <p>Bookovia Privacy Team</p>
          <p>254 Chapman Rd, Ste 208 #21058</p>
          <p>Newark, Delaware 19702, USA</p>

          <h3 className="text-lg font-medium mt-6 mb-3">5.2 Identity Verification</h3>
          <p>To protect your privacy and prevent unauthorized deletions, we may require:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Verification of identity through your registered email</li>
            <li>Additional security questions if accessing through email/mail</li>
            <li>Confirmation of account ownership</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3">5.3 Processing Timeline</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Acknowledgment</strong>: Within 3 business days of request
            </li>
            <li>
              <strong>Identity Verification</strong>: Within 5 business days
            </li>
            <li>
              <strong>Data Deletion</strong>: Within 30 days of verified request
            </li>
            <li>
              <strong>Confirmation</strong>: You will receive confirmation once deletion is complete
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. What Happens During Data Deletion</h2>

          <h3 className="text-lg font-medium mt-6 mb-3">6.1 Immediate Actions</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Account access is suspended</li>
            <li>Profile becomes unavailable to other users</li>
            <li>Active bookings are cancelled (with appropriate notifications)</li>
            <li>Marketing communications are stopped</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3">6.2 Data Removal Process</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Personal identifiers are removed from our systems</li>
            <li>Associated files and photos are deleted</li>
            <li>Third-party data processors are notified</li>
            <li>Cached data is cleared from our systems</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3">6.3 Backup Systems</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Data is removed from backup systems within 90 days</li>
            <li>
              Some data may persist in archived backups for disaster recovery purposes but will not be accessible for
              normal operations
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Impact of Data Deletion</h2>

          <h3 className="text-lg font-medium mt-6 mb-3">7.1 For Vehicle Owners</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Loss of booking history and preferences</li>
            <li>Need to create new account for future services</li>
            <li>Loss of saved payment methods</li>
            <li>Loss of service provider relationships</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3">7.2 For Detailing Specialists</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Loss of customer history and relationships</li>
            <li>Need to rebuild profile and portfolio</li>
            <li>Loss of review history and ratings</li>
            <li>Potential impact on search rankings</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">8. Partial Deletion Options</h2>
          <p>Users may request partial deletion of specific data types:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Delete only vehicle information</li>
            <li>Remove service history but keep account</li>
            <li>Delete payment information only</li>
            <li>Remove specific photos or documents</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">9. Third-Party Data</h2>

          <h3 className="text-lg font-medium mt-6 mb-3">9.1 Payment Processors</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>We will request deletion from payment processors</li>
            <li>Some financial data may be retained by processors for compliance</li>
            <li>Users can contact payment processors directly for additional deletion requests</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3">9.2 Marketing Partners</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Email lists are updated within 10 business days</li>
            <li>Third-party marketing platforms are notified</li>
            <li>Advertising profiles are deactivated</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">10. Data of Deceased Users</h2>
          <p>Family members or legal representatives may request deletion of deceased users' data by providing:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Death certificate</li>
            <li>Proof of relationship or legal authority</li>
            <li>Government-issued identification</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">11. Business Account Considerations</h2>
          <p>For business accounts:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Business data may be retained for longer periods due to regulatory requirements</li>
            <li>Employee access is immediately revoked</li>
            <li>Business-related communications may be preserved for legal purposes</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">12. Exceptions to Deletion</h2>
          <p>Data deletion may be denied or delayed if:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>There are pending legal matters involving the account</li>
            <li>The account is under investigation for fraud or policy violations</li>
            <li>Deletion would compromise the safety or security of other users</li>
            <li>Legal or regulatory requirements prevent deletion</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">13. Data Recovery</h2>
          <p>Once data deletion is confirmed:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Recovery is generally not possible</li>
            <li>Users must create new accounts</li>
            <li>Previous transaction history cannot be restored</li>
            <li>We recommend downloading your data before requesting deletion</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">14. Contact Information</h2>
          <p>For questions about this policy or data deletion requests:</p>
          <p>
            <strong>Email</strong>: privacy@bookovia.com
          </p>
          <p>
            <strong>Phone</strong>: (866) 691-4859
          </p>
          <p>
            <strong>Mail</strong>: Bookovia Privacy Team, 254 Chapman Rd, Ste 208 #21058, Newark, Delaware 19702, USA
          </p>
          <p>
            <strong>Data Protection Officer</strong>: dpo@bookovia.com
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">15. Policy Updates</h2>
          <p>This policy may be updated to reflect:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Changes in applicable law</li>
            <li>Updates to our services</li>
            <li>Improvements to our privacy practices</li>
          </ul>
          <p>Users will be notified of significant changes via email and in-app notifications.</p>

          <h2 className="text-xl font-semibold mt-8 mb-4">16. Complaints and Appeals</h2>
          <p>If you're not satisfied with how your deletion request was handled:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Contact our Privacy Team at privacy@bookovia.com</li>
            <li>File a complaint with relevant data protection authorities</li>
            <li>Seek legal counsel if necessary</li>
          </ul>

          <hr className="my-8" />

          <p className="italic">
            This policy complies with applicable privacy laws including GDPR, CCPA, and other relevant data protection
            regulations.
          </p>
        </div>
      </div>
    </div>
  )
}
