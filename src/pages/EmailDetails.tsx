import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LeftContainer from "../components/global/left-container/LeftContainer";
import { useData } from "../context/ContextApi";
import { geteMailDetails } from "../services/getSpeficEmailDetails";
import EmailBody from "../components/ui/EmailBody";
import DOMPurify from "dompurify";
// import Loader from "../components/global/loader/Loader";

const EmailDetails = () => {
  const { inbox } = useData();
  const location = useLocation();
  const [response, setResponse] = useState("");
  const [currentId, setCurrentId] = useState(location?.state.id || ""); // Initialize with the state from location

  // Fetch email details by ID
  useEffect(() => {
    const fetchEmailDetails = async () => {
      if (!currentId) return; // Skip if no ID is available

      try {
        const data = await geteMailDetails(currentId);
        if (data) {
          // Sanitize the response body
          const sanitizedHTML = DOMPurify.sanitize(data.body);
          setResponse(sanitizedHTML);
        }
      } catch (error) {
        console.error("Failed to fetch email details:", error);
      }
    };

    fetchEmailDetails();
  }, [currentId]);

  // Find the current email from the inbox
  const filteredEmail = inbox.find((item) => item.id === currentId);

  const handleOnContainer = (id: string) => {
    setCurrentId(id); // Update the current ID when a new email is selected
  };

  console.log(response);

  return (
    <section className="px-10 flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <div className="w-full md:w-[450px]  ">
        {inbox.length > 0 ? (
          <LeftContainer
            emails={inbox}
            onClick={handleOnContainer}
            isClicked={true}
            index={location?.state.id || ""}
            id={location?.state.id || ""}
          />
        ) : (
          <div className="text-center text-gray-500 flex justify-center h-[500px] items-center">
            <p className="border border-border px-20 py-4 bg-white rounded-lg">
              🥹 Opps! Email not found
            </p>
          </div>
        )}
      </div>

      {/* Email Details */}
      <div className="flex-1">
        {filteredEmail ? (
          <EmailBody data={filteredEmail}>
            {response ? (
              <div
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: response }}
              />
            ) : (
              <p className="text-gray-500">Loading email content...</p>
            )}
          </EmailBody>
        ) : (
          <div className="text-center text-gray-500 flex justify-center h-[500px] items-center">
            <p className="border border-border px-20 py-4 bg-white rounded-lg">
              🥹 Opps! Select an email to view its details
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmailDetails;
