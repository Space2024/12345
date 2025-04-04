import { useContext, useEffect } from "react";
import { KycContext } from "../KycContext/KycContex";
import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";
import { useState } from "react";
import { FormField } from "../InputComponents/FormField";

function ExportInformation() {
  const {
    accInfo,
    setAccInfo,
    handleAccInputChange,
    validateBankingInfo,
    errors,
    setErrors,
    handleFileChange,
    filesDatas,
    validate,
    handleFileDelete,
    handleViewImage,
    fileDatasUrl,
    getFileName,
  } = useContext(KycContext);
  const { setActiveSection, setActiveComponent } = useContext(DashBoardContext);
  const {
    businessDetails,
    setBusinessDetails,
    handleExportInputChange,
    validateBusinessDetails,
    handleSubmit,
  } = useContext(KycContext);
  // const [errors, setErrors] = useState({});

  const handleValidate = () => {
    const validationErrors = validateBusinessDetails(
      businessDetails,
      filesDatas,
      fileDatasUrl
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validationErrors,
    }));

    return Object.keys(validationErrors).length === 0;
  };
  const handleInputChangeWithValidation = (event) => {
    handleExportInputChange(event); // Update the form data
    const { name, value } = event.target;

    // Validate the specific field
    const fieldErrors = validateBusinessDetails(
      { ...businessDetails, [name]: value },
      filesDatas,
      fileDatasUrl
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name],
    }));

    localStorage.setItem("KycExpo", JSON.stringify(businessDetails));
  };
  const handleFileChangeWithValidation = (event) => {
    handleFileChange(event); // Update the file data
    const { name, files } = event.target;
    const file = files[0];

    // Update the filesDatas with the new file
    const updatedFilesDatas = { ...filesDatas, [name]: file };

    // Validate the specific file field
    const fieldErrors = validateBusinessDetails(
      businessDetails,
      updatedFilesDatas,
      fileDatasUrl
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name],
    }));
  };
  // Handle navigation to the next section
  const handleNext = async () => {
    // if (handleValidate()) {
    //     setActiveComponent("Contact Information");
    //     localStorage.setItem("KycExport",JSON.stringify(businessDetails))
    const result = await handleSubmit();
    console.log(result);
    // } else {
    //     console.log("Form has errors. Cannot proceed to next section.");
    // }
  };
  // const handleNext = () => {
  //     setActiveSection("Contact Information")
  //    }
  console.log(errors);

  return (
    <div className="flex items-center justify-center p-2">
      <div className="mx-auto w-full bg-white p-6">
        <form className="w-full">
          <h3 className="font-bold text-center mb-6">Export Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left side fields */}
            <div>
              <FormField
                label="Country"
                name="buzzCountry"
                value={businessDetails.buzzCountry}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Country"
                maxLength={60}
                errors={errors}
              />

              <FormField
                label="Region"
                name="region"
                value={businessDetails.region}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Region"
                maxLength={34}
                errors={errors}
              />

              {/* <FormField
                  label="Currency"
                  name="currency"
                  type="select"
                  value={businessDetails.currency}
                  onChange={handleInputChangeWithValidation}
                  options={["", "Savings Account", "Current Account", "NRI Account"]}
                  errors={errors}
                /> */}
              <FormField
                label="Currency"
                name="currency"
                value={businessDetails.currency}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter IBAN NO"
                maxLength={11}
                errors={errors}
              />

              <FormField
                label="IBAN NO"
                name="ibanNo"
                value={businessDetails.ibanNo}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter IBAN NO"
                maxLength={11}
                errors={errors}
              />
            </div>

            {/* Right side fields */}
            <div>
              <FormField
                label="Swift Code"
                name="swiftCode"
                value={businessDetails.swiftCode}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Swift Code"
                maxLength={60}
                errors={errors}
              />

              {/* Add more fields here as needed */}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="mt-4 rounded-md bg-blue-500 py-2 px-6 text-base font-semibold text-white outline-none hover:shadow-form"
              onClick={handleNext}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExportInformation;
