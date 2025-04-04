  import { useState, useContext, useEffect } from "react";
  import { KycContext } from "../KycContext/KycContex";
  import axios from "axios";
  import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";
  import { FormField } from "../InputComponents/FormField";
  function BankingInformation() {
    const {
      accInfo,
      setAccInfo,
      handleAccInputChange,
      validateAccountInfo,
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
    // const [errors, setErrors] = useState({});

    const [banckAccDetails, setBankAccDetails] = useState({});
    const handleValidate = () => {
      const validationErrors = validateAccountInfo(
        accInfo,
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
      handleAccInputChange(event); // Update the form data
      const { name, value } = event.target;

      // Validate the specific field
      const fieldErrors = validateAccountInfo(
        { ...accInfo, [name]: value },
        filesDatas,
        fileDatasUrl
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: fieldErrors[name],
      }));
    };
    const handleFileChangeWithValidation = (event) => {
      handleFileChange(event); // Update the file data
      const { name, files } = event.target;
      const file = files[0];
console.log(name, file );
      // Update the filesDatas with the new file
      const updatedFilesDatas = { ...filesDatas, [name]: file };

      // Validate the specific file field
      const fieldErrors = validateAccountInfo(
        accInfo,
        updatedFilesDatas,
        fileDatasUrl
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: fieldErrors[name],
      }));
    };
    // Handle navigation to the next section
    const handleNext = () => {
      if (handleValidate()) {
        setActiveComponent("Contact Details");
        localStorage.setItem("KycAcc", JSON.stringify(accInfo));
      } else {
        console.log("Form has errors. Cannot proceed to next section.");
      }
    };
    // const handleNext = () => {
    //     setActiveSection("Contact Information")
    //    }
    console.log(errors);
    useEffect(() => {
      const fetchBankdetails = async () => {
        try {
          const response = await axios.get(
            `https://ifsc.razorpay.com/${accInfo.ifsc}`
          );

          console.log(response.data);
          setAccInfo((prevValue) => ({
            ...prevValue,
            bankname: response.data.BANK,
            bankbranchname: response.data.BRANCH,
            bankaddress: response.data.ADDRESS,
          }));
          setErrors((prevErrors) => {
            const { bankname, bankbranchname, bankaddress, ...rest } = prevErrors;
            return rest;
          });
        } catch (error) {
          console.log(error);
          setAccInfo((prevValue) => ({
            ...prevValue,
            bankname: "",
            bankbranchname: "",
            bankaddress: "",
          }));
        }
      };
      fetchBankdetails();
    }, [accInfo.ifsc]);
    useEffect(() => {
      const fetchBankdetails = async () => {
        try {
          const response = await axios.get(
            `https://ifsc.razorpay.com/${accInfo.ifsc1}`
          );

          console.log(response.data);
          setAccInfo((prevValue) => ({
            ...prevValue,
            bankname1: response.data.BANK,
            bankbranchname1: response.data.BRANCH,
            bankaddress1: response.data.ADDRESS,
          }));
          setErrors((prevErrors) => {
            const { bankname1, bankbranchname1, bankaddress1, ...rest } =
              prevErrors;
            return rest;
          });
        } catch (error) {
          console.log(error);
          setAccInfo((prevValue) => ({
            ...prevValue,
            bankname1: "",
            bankbranchname1: "",
            bankaddress1: "",
          }));
        }
      };
      fetchBankdetails();
    }, [accInfo.ifsc1]);
    return (
      <div className="flex items-center justify-center p-2">
        <div className="mx-auto w-full bg-white p-6">
          <form className="w-full">
            <h3 className="font-bold text-center mb-6">Banking Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left column */}
              <div>
                <FormField
                  label="A/c holder Name"
                  name="acholdername"
                  value={accInfo.acholdername}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter A/c holder Name"
                  maxLength={60}
                  errors={errors}
                />

                <FormField
                  label="A/c Number"
                  name="acnumber"
                  value={accInfo.acnumber}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter A/c Number"
                  maxLength={20}
                  errors={errors}
                />

                <FormField
                  label="A/c Type"
                  name="actype"
                  type="select"
                  value={accInfo.actype}
                  onChange={handleInputChangeWithValidation}
                  options={["Savings Account", "Current Account", "NRI Account"]}
                  errors={errors}
                />

                <FormField
                  label="IFSC"
                  name="ifsc"
                  value={accInfo.ifsc}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter IFSC"
                  maxLength={11}
                  errors={errors}
                />
              </div>

              {/* Right column */}
              <div>
                <FormField
                  label="Bank Name"
                  name="bankname"
                  value={accInfo.bankname}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter Bank Name"
                  disabled={true}
                  errors={errors}
                />

                <FormField
                  label="Bank Branch Name"
                  name="bankbranchname"
                  value={accInfo.bankbranchname}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter Bank Branch Name"
                  disabled={true}
                  errors={errors}
                />

                <FormField
                  label="Bank Address"
                  name="bankaddress"
                  value={accInfo.bankaddress}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter Bank Address"
                  disabled={true}
                  errors={errors}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left column */}
              <div>
                <FormField
                  label="A/c holder Name"
                  name="acholdername1"
                  value={accInfo.acholdername1}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter A/c holder Name"
                  maxLength={60}
                  errors={errors}
                />

                <FormField
                  label="A/c Number"
                  name="acnumber1"
                  value={accInfo.acnumber1}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter A/c Number"
                  maxLength={20}
                  errors={errors}
                />

                <FormField
                  label="A/c Type"
                  name="actype1"
                  type="select"
                  value={accInfo.actype1}
                  onChange={handleInputChangeWithValidation}
                  options={["Savings Account", "Current Account", "NRI Account"]}
                  errors={errors}
                />

                <FormField
                  label="IFSC"
                  name="ifsc1"
                  value={accInfo.ifsc1}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter IFSC"
                  maxLength={11}
                  errors={errors}
                />
              </div>

              {/* Right column */}
              <div>
                <FormField
                  label="Bank Name"
                  name="bankname1"
                  value={accInfo.bankname1}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter Bank Name"
                  disabled={true}
                  errors={errors}
                />

                <FormField
                  label="Bank Branch Name"
                  name="bankbranchname1"
                  value={accInfo.bankbranchname1}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter Bank Branch Name"
                  disabled={true}
                  errors={errors}
                />

                <FormField
                  label="Bank Address"
                  name="bankaddress1"
                  value={accInfo.bankaddress1}
                  onChange={handleInputChangeWithValidation}
                  placeholder="Enter Bank Address"
                  disabled={true}
                  errors={errors}
                />
              </div>
            </div>
            {/* Cheque  Upload with Preview */}
            <div className="flex flex-row grid grid-cols-1 md:grid-cols-3 gap-6 justify-center items-center mt-6">
              <div className="mb-5">
                {filesDatas.chequeFile1 || fileDatasUrl.chequeFile1 ? (
                  <div className="mt-4 p-4 border rounded-md bg-gray-50 w-30">
                    <p className="text-base font-medium mb-2">
                      Uploaded Cancelled Cheque 1:
                    </p>
                    {filesDatas.chequeFile1?.type === "application/pdf" ||
                    fileDatasUrl.chequeFile1?.endsWith(".pdf") ||
                    fileDatasUrl.chequeFile1?.endsWith("blob") ? (
                      <p className="text-sm text-gray-700">
                        {filesDatas?.chequeFile1?.name ||
                          getFileName(fileDatasUrl?.chequeFile)}
                      </p>
                    ) : (
                      <img
                        src={
                          filesDatas.chequeFile1
                            ? URL.createObjectURL(filesDatas.chequeFile1)
                            : fileDatasUrl.chequeFile1?.startsWith('"') &&
                              fileDatasUrl.chequeFile1?.endsWith('"')
                            ? fileDatasUrl.chequeFile1.slice(1, -1)
                            : fileDatasUrl.chequeFile1
                        }
                        alt="Cancelled Cheque Preview"
                        className="h-32 w-32 object-cover rounded-md"
                      />
                    )}
                    <div className="flex mt-2">
                      <button
                        onClick={(event) =>
                          handleViewImage(
                            filesDatas.chequeFile1,
                            event,
                            fileDatasUrl?.chequeFile1
                          )
                        }
                        className="text-green-500 hover:text-green-700 text-sm mr-5"
                        type="button"
                      >
                        View
                      </button>
                      <button
                        onClick={() =>
                          handleFileDelete(
                            "chequeFile1",
                            fileDatasUrl.chequeFile1
                          )
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
                    label="Upload Cancelled Cheque 1"
                    name="chequeFile1"
                    type="file"
                    onChange={handleFileChangeWithValidation}
                    errors={errors}
                    filesDatas={filesDatas}
                  />
                )}
              </div>
              {/* Cheque 1 Upload with Preview */}
              <div className="mb-5">
                {filesDatas.chequeFile2 || fileDatasUrl.chequeFile2 ? (
                  <div className="mt-4 p-4 border rounded-md bg-gray-50">
                    <p className="text-base font-medium mb-2">
                      Uploaded Cancelled Cheque 2:
                    </p>
                    {filesDatas.chequeFile2?.type === "application/pdf" ||
                    fileDatasUrl.chequeFile2?.endsWith(".pdf") ||
                    fileDatasUrl.chequeFile2?.endsWith("blob") ? (
                      <p className="text-sm text-gray-700">
                        {filesDatas?.chequeFile2?.name ||
                          getFileName(fileDatasUrl?.chequeFile2)}
                      </p>
                    ) : (
                      <img
                        src={
                          filesDatas.chequeFile2
                            ? URL.createObjectURL(filesDatas.chequeFile2)
                            : fileDatasUrl.chequeFile2?.startsWith('"') &&
                              fileDatasUrl.chequeFile2?.endsWith('"')
                            ? fileDatasUrl.chequeFile2.slice(1, -1)
                            : fileDatasUrl.chequeFile2
                        }
                        alt="Cancelled Cheque Preview"
                        className="h-32 w-32 object-cover rounded-md"
                      />
                    )}
                    <div className="flex mt-2">
                      <button
                        onClick={(event) =>
                          handleViewImage(
                            filesDatas.chequeFile2,
                            event,
                            fileDatasUrl?.chequeFile2
                          )
                        }
                        className="text-green-500 hover:text-green-700 text-sm mr-5"
                        type="button"
                      >
                        View
                      </button>
                      <button
                        onClick={() =>
                          handleFileDelete(
                            "chequeFile2",
                            fileDatasUrl.chequeFile2
                          )
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
                    label="Upload Cancelled Cheque 2"
                    name="chequeFile2"
                    type="file"
                    onChange={handleFileChangeWithValidation}
                    errors={errors}
                    filesDatas={filesDatas}
                  />
                )}
              </div>
            </div>

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

  export default BankingInformation;

  