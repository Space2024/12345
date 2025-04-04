import { useContext, useEffect } from "react";
import { KycContext } from "../KycContext/KycContex";
import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";
import { useState } from "react";
import { FormField } from "../InputComponents/FormField";
import { currency, countries } from "../Datas/CountryData";
import axios from "axios";

function BusinessInformation() {
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
    kycFormData,
  } = useContext(KycContext);
  console.log(businessDetails);
  const organizationLists = [
    "",
    "Proprietorship",
    "Partnership",
    "Private Limited",
    "Public Limited",
    "LLP",
  ];
  console.log(currency, countries);
  // const [currenciesData,setCurrenciesData]=useState([])
  // const [countriesData,setCountriesData]=useState([])
  // useEffect(()=>{
  //   const fetchCurreicies=async()=>{
  //     const response =await  axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
  //     const currenciesData = Object.keys(response.data).map(key => key.toUpperCase());

  //     setCurrenciesData(currenciesData)

  //   }
  //   fetchCurreicies()

  // },[])

  const msmeTypes = ["", "Micro", "Small", "Medium"];

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
  console.log(errors);
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
    if (handleValidate()) {
      setActiveComponent("Agent Details");
    }
  };

  console.log(errors);

  return (
    <div className="flex items-center justify-center p-2">
      <div className="mx-auto w-full bg-white p-6">
        <form className="w-full">
          <h3 className="font-bold text-center mb-6 text-lg md:text-xl">
            Business Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left side fields */}
            <div>
              <FormField
                label="Supplier Type"
                name="supplierType"
                type="select"
                value={businessDetails.supplierType}
                onChange={handleInputChangeWithValidation}
                options={["", "Domestic", "Export"]}
                errors={errors}
              />

              <FormField
                label="Organization"
                name="organization"
                type="select"
                value={businessDetails.organization}
                onChange={handleInputChangeWithValidation}
                options={organizationLists}
                errors={errors}
              />
            </div>

            {/* Right side fields - intentionally left empty for alignment */}
            <div>
              <FormField
                label="Owner/Authorized Representative Name"
                name="propritorname"
                value={businessDetails.propritorname}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Proprietor Name"
                maxLength={60}
                errors={errors}
              />

              <FormField
                label="Reg Under MSME"
                name="regUnderMsme"
                type="select"
                value={businessDetails.regUnderMsme}
                onChange={handleInputChangeWithValidation}
                options={["", "Yes", "No"]}
                errors={errors}
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10">
              <div>
                <FormField
                  label="GST No"
                  name="gst"
                  value={businessDetails.gst}
                  maxLength={15}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter GST Number"
                  errors={errors}
                />

                <FormField
                  label="PAN"
                  name="pan"
                  value={businessDetails.pan}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter PAN Number"
                  // disabled={true}
                  maxLength={10}
                  errors={errors}
                />
              </div>
              <div>
                {businessDetails.regUnderMsme === "Yes" && (
                  <>
                    <FormField
                      label="MSME Type"
                      name="msmeType"
                      type="select"
                      value={businessDetails.msmeType}
                      onChange={handleInputChangeWithValidation}
                      options={msmeTypes}
                      errors={errors}
                    />
                    <FormField
                      label="MSME No"
                      name="msmeNo"
                      value={businessDetails.msmeNo}
                      onChange={handleInputChangeWithValidation}
                      placeholder="Enter MSME Number"
                      maxLength={20}
                      errors={errors}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Export Details Section - Only visible when supplierType is Export */}
          {businessDetails.supplierType === "Export" && (
            <div className="mt-6">
              <h3 className="font-bold text-center mb-4">Export Details</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10">
                <div>
                  {/* <FormField
                    label="Country"
                    name="buzzCountry"
                    value={businessDetails.buzzCountry}
                    onChange={handleInputChangeWithValidation}
                    placeholder="Enter Country"
                    maxLength={60}
                    errors={errors}
                  /> */}
                  <FormField
                    label="Country"
                    name="buzzCountry"
                    type="select"
                    value={businessDetails.buzzCountry}
                    onChange={handleInputChangeWithValidation}
                    options={countries}
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
                    value={businessDetails.currency}
                    onChange={handleInputChangeWithValidation}
                    placeholder="Enter Currency"
                    maxLength={11}
                    errors={errors}
                  /> */}
                  <FormField
                    label="Currency"
                    name="currency"
                    type="select"
                    value={businessDetails.currency}
                    onChange={handleInputChangeWithValidation}
                    options={currency}
                    errors={errors}
                  />
                </div>

                <div>
                  <FormField
                    label="IBAN NO"
                    name="ibanNo"
                    value={businessDetails.ibanNo}
                    onChange={handleInputChangeWithValidation}
                    placeholder="Enter IBAN NO"
                    maxLength={34}
                    errors={errors}
                  />

                  <FormField
                    label="Swift Code"
                    name="swiftCode"
                    value={businessDetails.swiftCode}
                    onChange={handleInputChangeWithValidation}
                    placeholder="Enter Swift Code"
                    maxLength={11}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Document Upload Section */}
          <div className="mt-6">
            <h3 className="font-bold text-center mb-4">Document Upload</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {/* GST Upload with Preview */}
              {filesDatas.gstFile || fileDatasUrl.gstFile ? (
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="text-base font-medium mb-2">
                    Uploaded GST Document:
                  </p>
                  {filesDatas.gstFile?.type === "application/pdf" ||
                  fileDatasUrl.gstFile?.endsWith(".pdf") ||
                  fileDatasUrl.gstFile?.endsWith("blob") ? (
                    <p className="text-sm text-gray-700">
                      {filesDatas?.gstFile?.name ||
                        getFileName(fileDatasUrl?.gstFile)}
                    </p>
                  ) : (
                    <img
                      src={
                        filesDatas.gstFile
                          ? URL.createObjectURL(filesDatas.gstFile)
                          : fileDatasUrl.gstFile?.startsWith('"') &&
                            fileDatasUrl.gstFile?.endsWith('"')
                          ? fileDatasUrl.gstFile.slice(1, -1)
                          : fileDatasUrl.gstFile
                      }
                      alt="GST Document Preview"
                      className="h-32 w-32 object-cover rounded-md"
                    />
                  )}
                  <div className="flex mt-2">
                    <button
                      onClick={(event) =>
                        handleViewImage(
                          filesDatas.gstFile,
                          event,
                          fileDatasUrl?.gstFile
                        )
                      }
                      className="text-green-500 hover:text-green-700 text-sm mr-5"
                      type="button"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        handleFileDelete("gstFile", fileDatasUrl.gstFile)
                      }
                      className="text-red-500 hover:text-red-700 text-sm"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <FormField
                  label="GST Upload"
                  name="gstFile"
                  type="file"
                  onChange={handleFileChangeWithValidation}
                  errors={errors}
                  filesDatas={filesDatas}
                />
              )}

              {/* PAN Upload with Preview */}
              {filesDatas.panFile || fileDatasUrl.panFile ? (
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="text-base font-medium mb-2">
                    Uploaded PAN Document:
                  </p>
                  {filesDatas.panFile?.type === "application/pdf" ||
                  fileDatasUrl.panFile?.endsWith(".pdf") ||
                  fileDatasUrl.panFile?.endsWith("blob") ? (
                    <p className="text-sm text-gray-700">
                      {filesDatas?.panFile?.name ||
                        getFileName(fileDatasUrl?.panFile)}
                    </p>
                  ) : (
                    <img
                      src={
                        filesDatas.panFile
                          ? URL.createObjectURL(filesDatas.panFile)
                          : fileDatasUrl.panFile?.startsWith('"') &&
                            fileDatasUrl.panFile?.endsWith('"')
                          ? fileDatasUrl.panFile.slice(1, -1)
                          : fileDatasUrl.panFile
                      }
                      alt="PAN Document Preview"
                      className="h-32 w-32 object-cover rounded-md"
                    />
                  )}
                  <div className="flex mt-2">
                    <button
                      onClick={(event) =>
                        handleViewImage(
                          filesDatas.panFile,
                          event,
                          fileDatasUrl?.panFile
                        )
                      }
                      className="text-green-500 hover:text-green-700 text-sm mr-5"
                      type="button"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        handleFileDelete("panFile", fileDatasUrl.panFile)
                      }
                      className="text-red-500 hover:text-red-700 text-sm"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <FormField
                  label="PAN Upload"
                  name="panFile"
                  type="file"
                  onChange={handleFileChangeWithValidation}
                  errors={errors}
                  filesDatas={filesDatas}
                />
              )}

              {/* MSME Upload with Preview - Only shown if registered under MSME */}
              {businessDetails.regUnderMsme === "Yes" &&
                (filesDatas.msmeFile || fileDatasUrl.msmeFile ? (
                  <div className="p-4 border rounded-md bg-gray-50">
                    <p className="text-base font-medium mb-2">
                      Uploaded MSME Document:
                    </p>
                    {filesDatas.msmeFile?.type === "application/pdf" ||
                    fileDatasUrl.msmeFile?.endsWith(".pdf") ||
                    fileDatasUrl.msmeFile?.endsWith("blob") ? (
                      <p className="text-sm text-gray-700">
                        {filesDatas?.msmeFile?.name ||
                          getFileName(fileDatasUrl?.msmeFile)}
                      </p>
                    ) : (
                      <img
                        src={
                          filesDatas.msmeFile
                            ? URL.createObjectURL(filesDatas.msmeFile)
                            : fileDatasUrl.msmeFile?.startsWith('"') &&
                              fileDatasUrl.msmeFile?.endsWith('"')
                            ? fileDatasUrl.msmeFile.slice(1, -1)
                            : fileDatasUrl.msmeFile
                        }
                        alt="MSME Document Preview"
                        className="h-32 w-32 object-cover rounded-md"
                      />
                    )}
                    <div className="flex mt-2">
                      <button
                        onClick={(event) =>
                          handleViewImage(
                            filesDatas.msmeFile,
                            event,
                            fileDatasUrl?.msmeFile
                          )
                        }
                        className="text-green-500 hover:text-green-700 text-sm mr-5"
                        type="button"
                      >
                        View
                      </button>
                      <button
                        onClick={() =>
                          handleFileDelete("msmeFile", fileDatasUrl.msmeFile)
                        }
                        className="text-red-500 hover:text-red-700 text-sm"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <FormField
                    label="MSME Upload"
                    name="msmeFile"
                    type="file"
                    onChange={handleFileChangeWithValidation}
                    errors={errors}
                    filesDatas={filesDatas}
                  />
                ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="mt-6 rounded-md bg-blue-500 py-2 px-6 text-base font-semibold text-white outline-none hover:shadow-form"
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

export default BusinessInformation;
