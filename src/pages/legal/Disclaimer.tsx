import LegalLayout from "../../components/LegalLayout";
import { WEBSITE_NAME } from "../../constant/SharedConstant";

export default function Disclaimer() {
  return (
    <LegalLayout title="Disclaimer">
      <p>
        <strong>{WEBSITE_NAME}</strong> is an informational website only.
      </p>

      <h5>No Government Affiliation</h5>
      <p>
        We are not affiliated with any government organization. Users must
        verify details from official government portals.
      </p>

      <h5>No Legal Responsibility</h5>
      <p>
        We are not responsible for any losses arising from the use of
        information on this website.
      </p>
    </LegalLayout>
  );
}
