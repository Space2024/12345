import { useState, useContext, useEffect } from "react";
import { KycContext } from "../KycContext/KycContex";
import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";
import { FormField } from "../InputComponents/FormField";
import {countries} from "../Datas/CountryData"

function AgentInformation() {
  const { setActiveSection, setActiveComponent } = useContext(DashBoardContext);
  const [errors, setErrors] = useState({});
  const { agentInfo, setAgentInfo, validateAgentInfo, handleInputAgentChange } =
    useContext(KycContext);

  // Function to handle input changes
  const handleInputChangeWithValidation = (event) => {
    handleInputAgentChange(event);
    // Validate the specific field
    const { name, value } = event.target;
    const fieldErrors = validateAgentInfo({ ...agentInfo, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name],
    }));
  };

  
  // Function to validate the entire form
  const handleValidate = () => {
    const validationErrors = validateAgentInfo(agentInfo);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle navigation to the next section
  const handleNext = () => {
    if (handleValidate()) {
      localStorage.setItem("KycAgent", JSON.stringify(agentInfo));
      setActiveComponent("Banking Details");
    } else {
      console.log("Form has errors. Cannot proceed to next section.");
    }
  };

  return (
    <div className="flex items-center justify-center p-2">
      <div className="mx-auto w-full bg-white p-6">
        <form className="w-full">
          <h3 className="font-bold text-center mb-6">Agent Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left side fields */}
            <div>
              <FormField
                label="Agent Name"
                name="agentname"
                value={agentInfo.agentname}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Agent Name"
                maxLength={70}
                errors={errors}
              />

              <FormField
                label="Door No"
                name="agentDoorNo"
                value={agentInfo.agentDoorNo}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Door No"
                maxLength={30}
                errors={errors}
              />

              <FormField
                label="Street"
                name="agentStreet"
                value={agentInfo.agentStreet}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Street"
                maxLength={60}
                errors={errors}
              />

              <FormField
                label="Area"
                name="agentArea"
                value={agentInfo.agentArea}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Area"
                maxLength={30}
                errors={errors}
              />

              <FormField
                label="City"
                name="agentCity"
                value={agentInfo.agentCity}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter City"
                maxLength={30}
                errors={errors}
              />
            </div>

            {/* Right side fields */}
            <div>
              <FormField
                label="State"
                name="agentState"
                value={agentInfo.agentState}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter State"
                maxLength={30}
                errors={errors}
              />

              {/* <FormField
                label="Country"
                name="agentCountry"
                value={agentInfo.agentCountry}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Country"
                maxLength={30}
                errors={errors}
              /> */}
           <FormField
                label="Country"
                name="agentCountry"
                type="select"
                value={agentInfo.agentCountry}
                onChange={handleInputChangeWithValidation}
                options={countries}
                errors={errors}
              />
              <FormField
                label="Pin Code"
                name="agentPincode"
                value={agentInfo.agentPincode}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Pin Code"
                maxLength={6}
                errors={errors}
              />

              <FormField
                label="Phone"
                name="agentPhone"
                value={agentInfo.agentPhone}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Phone"
                maxLength={10}
                errors={errors}
              />

              <FormField
                label="Email"
                name="agentEmail"
                type="email"
                value={agentInfo.agentEmail}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Email"
                errors={errors}
              />

              <FormField
                label="GSTIN"
                name="agentGst"
                value={agentInfo.agentGst}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter GST"
                maxLength={15}
                errors={errors}
              />
            </div>
          </div>

          {/* Remarks - Full width */}
          <div className="md:flex md:items-start mt-2 mb-6">
            <div className="md:w-1/6">
              <label className="mb-3 block text-center text-base font-medium text-black">
                Remarks:
              </label>
            </div>
            <div className="md:w-5/6">
              <textarea
                name="agentRemarks"
                value={agentInfo.agentRemarks}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Remarks"
                rows={3}
                className={`w-full rounded-md border ${
                  errors.agentRemarks ? "border-red-500" : "border-gray-400"
                } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
              />
              {errors.agentRemarks && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.agentRemarks}
                </p>
              )}
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-center">
            <button
              type="button"
              className="mt-4 rounded-md bg-blue-500 py-2 px-6 text-base font-semibold text-white outline-none hover:shadow-form"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgentInformation;
