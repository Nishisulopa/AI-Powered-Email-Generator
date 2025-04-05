import { useState } from "react";
import axios from "axios";

function EmailGenerator() {
  const [emailType, setEmailType] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [tone, setTone] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");

  const generateEmail = async () => {
    const response = await axios.post("http://localhost:5000/generate-email", {
      emailType,
      userDetails,
      tone,
    });
    setGeneratedEmail(response.data.email);
  };

  return (
    <div className="container">
      {/* <h2>AI-Powered Email Writer</h2> */}

      <select onChange={(e) => setEmailType(e.target.value)}>
        <option>Select Email Type</option>
        <option value="Job Application">Job Application</option>
        <option value="Apology">Apology</option>
        <option value="Business Proposal">Business Proposal</option>
      </select>

      <textarea
        placeholder="Enter key details"
        style={{ width: "100%", height: "200px" }}
        onChange={(e) => setUserDetails(e.target.value)}
      />

      <select onChange={(e) => setTone(e.target.value)}>
        <option>Select Tone</option>
        <option value="Professional">Professional</option>
        <option value="Friendly">Friendly</option>
        <option value="Neutral">Neutral</option>
      </select>

      <button onClick={generateEmail}>Generate Email</button>

      {generatedEmail && (
        <div>
          <h3>Generated Email:</h3>
          <textarea
            style={{ width: "100%", height: "200px" }}
            readOnly
            value={generatedEmail}
          />
          <button onClick={() => navigator.clipboard.writeText(generatedEmail)}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

export default EmailGenerator;
