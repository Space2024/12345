import {
  BankingInformation,
  ContactInformation,
  AgentInformation,
  // TradeInformation,
  SupplierKYC,
  adminIcon,
  Admin,
  kycicon,
  statutatoryimg,
  bankingicon,
  contacticon,
  tradeicon,
  KycView,
  KycApproval,
  // NatureOfTheCompany,
  ExportInformation,
  KycViewAccepted,
  BusinessInformation
} from "../Components/ComponentRoutes.js";
import {
  KycDataProvider,
  KycContext,
} from "../Application/KYC/KycContext/KycContex";

const sectionComponents = {
  "Kyc View": (
    <KycDataProvider>
      <KycView />
    </KycDataProvider>
  ),
  "Business Address": (
    <KycDataProvider>
      <SupplierKYC />
    </KycDataProvider>
  ),
  "Agent Details": (
    <KycDataProvider>
      <AgentInformation />
    </KycDataProvider>
  ),
  "Banking Details": (
    <KycDataProvider>
      <BankingInformation />
    </KycDataProvider>
  ),
  "Contact Details": (
    <KycDataProvider>
      <ContactInformation />
    </KycDataProvider>
  ),
  "Export Details": (
    <KycDataProvider>
      <ExportInformation />
    </KycDataProvider>
  ),
  "Business Details": (
    <KycDataProvider>
      <BusinessInformation />
    </KycDataProvider>
  ),
  // "Trade Information": <KycDataProvider><TradeInformation /></KycDataProvider>,
  // "Nature of the Company":<KycDataProvider><NatureOfTheCompany /></KycDataProvider>,
  "Kyc Approval": (
    <KycDataProvider>
      <KycApproval />
    </KycDataProvider>
  ),
  "Approved KYCs": (
    <KycDataProvider>
      <KycViewAccepted />
    </KycDataProvider>
  ),
  "Admin Page": <Admin />,
};
const sectionImages = {
  "Business Address": kycicon,
  "Business Details":kycicon,
  "Principal Address": statutatoryimg,
  "Banking Information": bankingicon,
  "Contact Information": contacticon,
  "Trade Information": tradeicon,
  "Kyc Approval": kycicon,
  "Kyc View": statutatoryimg,
  "Approved KYCs":tradeicon,
  "Admin Page":adminIcon
};
export { sectionComponents, sectionImages };
