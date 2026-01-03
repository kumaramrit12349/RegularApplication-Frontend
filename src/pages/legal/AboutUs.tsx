import LegalLayout from "../../components/LegalLayout";
import { WEBSITE_NAME } from "../../constant/SharedConstant";

export default function AboutUs() {
  return (
    <LegalLayout title="About Us">
      <p>
        <strong>{WEBSITE_NAME}</strong> is a platform dedicated to providing
        verified government job notifications, exam updates, and educational
        opportunities across India.
      </p>

      <p>
        Our goal is to simplify access to authentic information and help users
        stay informed without visiting multiple websites.
      </p>

      <p>
        We do not charge users for accessing information and always encourage
        verification from official sources.
      </p>
    </LegalLayout>
  );
}
