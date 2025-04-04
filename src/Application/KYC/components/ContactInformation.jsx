import { useState, useContext, useEffect } from 'react';
import { KycContext } from '../KycContext/KycContex';
import axios from 'axios';
import { DashBoardContext } from '../../../DashBoardContext/DashBoardContext';
import { FormField } from '../InputComponents/FormField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ContactInformation = () => {
    const { handleContactInputChange, contactInfo, setContactInfo, validateContactInfo, errors, setErrors,
         filesDatas, handleFileChange,handleFileDelete,
         handleViewImage,fileDatasUrl,getFileName,userRole,validateKycForm,kycFormData ,validateBusinessDetails ,
         businessDetails ,validateAgentInfo ,agentInfo,validateAccountInfo ,accInfo,handleSubmit } = useContext(KycContext);
    const { setActiveSection,setActiveComponent } = useContext(DashBoardContext)
    // const [errors, setErrors] = useState({});
console.log(agentInfo)
    const handleValidate = () => {
        const validationErrors = validateContactInfo(contactInfo, filesDatas,fileDatasUrl);
        const validationSupKycErrors = validateKycForm(
            kycFormData,
            filesDatas,
            fileDatasUrl
          );
          const validationBusinessErrors = validateBusinessDetails(
            businessDetails,
            filesDatas,
            fileDatasUrl
          );
          const validationAgentErrors = validateAgentInfo(agentInfo);
          console.log(validationAgentErrors);
          const validationAccountsErrors = validateAccountInfo(
            accInfo,
            filesDatas,
            fileDatasUrl
          );
        setErrors((prevErrors) => ({
            ...prevErrors,
            ...validationAgentErrors,
            ...validationErrors,
            ...validationSupKycErrors,
            ...validationBusinessErrors,
           
            ...validationAccountsErrors
        }));
        return Object.keys(validationErrors).length === 0;
    };
    console.log(errors)
    const handleNext = async() => {
        // if (handleValidate()) {
        //     // localStorage.setItem("KycContact",JSON.stringify(contactInfo))
        //     handleSubmit()

        //     // setActiveComponent("Export Details");
        //     // setActiveSection("Business Information");
        // } else {
        //     console.log("Form has errors. Cannot proceed to next section.");
        // }
        const isValid = handleValidate(); // Store the result of validation in a variable
        if (isValid) {
            localStorage.setItem("KycContact",JSON.stringify(contactInfo))

            const result = await handleSubmit();
            console.log(result);
            if (result.success) {
                toast.success("KYC Data's submitted successfully!");
            } else {
                toast.error(result.message);
            }
        } else {
            toast.error("Validation errors occurred. Please check your input.");
        }
    };
    const handleInputChangeWithValidation = (event) => {
        handleContactInputChange(event); // Update the form data
        const { name, value } = event.target;

        // Validate the specific field
        const fieldErrors = validateContactInfo({ ...contactInfo, [name]: value }, filesDatas,fileDatasUrl);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldErrors[name]
        }));
    }; console.log(errors)
    const handleFileChangeWithValidation = (event) => {
        handleFileChange(event); // Update the file data
        const { name, files } = event.target;
        const file = files[0];

        // Update the filesDatas with the new file
        const updatedFilesDatas = { ...filesDatas, [name]: file };

        // Validate the specific file field
        const fieldErrors = validateContactInfo(contactInfo, updatedFilesDatas,fileDatasUrl);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldErrors[name]
        }));
    };
    const ownerOptions = ["", "Director", "Patner", "Proprietor"];
    const businessOperationOptions = ["", "General Manager", "Asst General Manager", "Sales Manager", "Marketing Manager"];
    const accountsOptions = ["", "Accounts manager", "Payment manager", "Accounts Incharge", "Payment Incharge"];

    return (
        <div className="flex items-center justify-center p-2">
            <ToastContainer/>
            <div className='mx-auto w-full bg-white p-6'>
            <form className='w-full'>
                <h3 className="font-bold text-center mb-6">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Owner Information */}
                    <div className="form-group">
                        <FormField 
                            label="Owner"
                            name="owner"
                            type="select"
                            value={contactInfo.owner}
                            onChange={handleInputChangeWithValidation}
                            options={ownerOptions}
                            errors={errors}
                        />
                        <FormField 
                            label="Name"
                            name="ownername"
                            value={contactInfo.ownername}
                            onChange={handleInputChangeWithValidation}
                            maxLength={50}
                            errors={errors}
                        />
                        <FormField 
                            label="Mobile"
                            name="ownermobile"
                            value={contactInfo.ownermobile}
                            onChange={handleInputChangeWithValidation}
                            maxLength={10}
                            errors={errors}
                        />
                        <FormField 
                            label="E-Mail"
                            name="owneremail"
                            type="email"
                            value={contactInfo.owneremail}
                            onChange={handleInputChangeWithValidation}
                            errors={errors}
                        />
                    </div>

                    {/* Business Operations */}
                    <div className="form-group">
                        <FormField 
                            label="Business Operations"
                            name="businessoperation"
                            type="select"
                            value={contactInfo.businessoperation}
                            onChange={handleInputChangeWithValidation}
                            options={businessOperationOptions}
                            errors={errors}
                        />
                        <FormField 
                            label="Name"
                            name="boname"
                            value={contactInfo.boname}
                            onChange={handleInputChangeWithValidation}
                            maxLength={50}
                            errors={errors}
                        />
                        <FormField 
                            label="Mobile"
                            name="bomobile"
                            value={contactInfo.bomobile}
                            onChange={handleInputChangeWithValidation}
                            maxLength={10}
                            errors={errors}
                        />
                        <FormField 
                            label="E-Mail"
                            name="boemail"
                            type="email"
                            value={contactInfo.boemail}
                            onChange={handleInputChangeWithValidation}
                            errors={errors}
                        />
                    </div>

                    {/* Accounts */}
                    <div className="form-group">
                        <FormField 
                            label="Accounts"
                            name="accounts"
                            type="select"
                            value={contactInfo.accounts}
                            onChange={handleInputChangeWithValidation}
                            options={accountsOptions}
                            errors={errors}
                        />
                        <FormField 
                            label="Name"
                            name="accname"
                            value={contactInfo.accname}
                            onChange={handleInputChangeWithValidation}
                            maxLength={50}
                            errors={errors}
                        />
                        <FormField 
                            label="Mobile"
                            name="accmobile"
                            value={contactInfo.accmobile}
                            onChange={handleInputChangeWithValidation}
                            maxLength={10}
                            errors={errors}
                        />
                        <FormField 
                            label="E-Mail"
                            name="accemail"
                            type="email"
                            value={contactInfo.accemail}
                            onChange={handleInputChangeWithValidation}
                            errors={errors}
                        />
                    </div>
                </div>

                {/* File Upload Section */}
                <div className="flex flex-row grid grid-cols-1 md:grid-cols-3 gap-6 justify-center items-center mt-6">
                    {contactInfo.owner && (
                        <div className="mb-5">
                            {filesDatas.ownerFile || fileDatasUrl.ownerFile ? (
                                <div className="mt-4 p-4 border rounded-md bg-gray-50">
                                    <p className="text-base font-medium mb-2">Uploaded {contactInfo.owner} Business Card:</p>
                                    {filesDatas.ownerFile?.type === "application/pdf" || 
                                     fileDatasUrl.ownerFile?.endsWith(".pdf") || 
                                     fileDatasUrl.ownerFile?.endsWith("blob") ? (
                                        <p className="text-sm text-gray-700">
                                            {filesDatas?.ownerFile?.name || getFileName(fileDatasUrl?.ownerFile)}
                                        </p>
                                    ) : (
                                        <img
                                            src={filesDatas.ownerFile ? 
                                                URL.createObjectURL(filesDatas.ownerFile) : 
                                                fileDatasUrl.ownerFile?.startsWith('"') && fileDatasUrl.ownerFile?.endsWith('"') ?
                                                fileDatasUrl.ownerFile.slice(1, -1) : fileDatasUrl.ownerFile}
                                            alt="Owner Card Uploaded Preview"
                                            className="h-32 w-32 object-cover rounded-md"
                                        />
                                    )}
                                    <div className="flex mt-2">
                                        <button
                                            onClick={(event) => handleViewImage(filesDatas.ownerFile, event, fileDatasUrl.ownerFile)}
                                            className="text-green-500 hover:text-green-700 text-sm mr-5"
                                            type="button"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleFileDelete('ownerFile', fileDatasUrl.ownerFile)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                            type="button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <FormField 
                                    label={`Upload ${contactInfo.owner} Business Card`}
                                    name="ownerFile"
                                    type="file"
                                    onChange={handleFileChangeWithValidation}
                                    errors={errors}
                                    filesDatas={filesDatas}
                                />
                            )}
                        </div>
                    )}

                    {contactInfo.businessoperation && (
                        <div className="mb-5">
                            {filesDatas.boFile || fileDatasUrl.boFile ? (
                                <div className="mt-4 p-4 border rounded-md bg-gray-50">
                                    <p className="text-base font-medium mb-2">Uploaded {contactInfo.businessoperation} Business Card:</p>
                                    {filesDatas.boFile?.type === "application/pdf" || 
                                     fileDatasUrl.boFile?.endsWith(".pdf") || 
                                     fileDatasUrl.boFile?.endsWith("blob") ? (
                                        <p className="text-sm text-gray-700">
                                            {filesDatas?.boFile?.name || getFileName(fileDatasUrl?.boFile)}
                                        </p>
                                    ) : (
                                        <img
                                            src={filesDatas.boFile ? 
                                                URL.createObjectURL(filesDatas.boFile) : 
                                                fileDatasUrl.boFile?.startsWith('"') && fileDatasUrl.boFile?.endsWith('"') ?
                                                fileDatasUrl.boFile.slice(1, -1) : fileDatasUrl.boFile}
                                            alt="Business Operation Card Uploaded Preview"
                                            className="h-32 w-32 object-cover rounded-md"
                                        />
                                    )}
                                    <div className="flex mt-2">
                                        <button
                                            onClick={(event) => handleViewImage(filesDatas.boFile, event, fileDatasUrl.boFile)}
                                            className="text-green-500 hover:text-green-700 text-sm mr-5"
                                            type="button"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleFileDelete('boFile', fileDatasUrl.boFile)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                            type="button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <FormField 
                                    label={`Upload ${contactInfo.businessoperation} Business Card`}
                                    name="boFile"
                                    type="file"
                                    onChange={handleFileChangeWithValidation}
                                    errors={errors}
                                    filesDatas={filesDatas}
                                />
                            )}
                        </div>
                    )}

                    {contactInfo.accounts && (
                        <div className="mb-5">
                            {filesDatas.accountsFile || fileDatasUrl.accountsFile ? (
                                <div className="mt-4 p-4 border rounded-md bg-gray-50">
                                    <p className="text-base font-medium mb-2">Uploaded {contactInfo.accounts} Business Card:</p>
                                    {filesDatas.accountsFile?.type === "application/pdf" || 
                                     fileDatasUrl.accountsFile?.endsWith(".pdf") || 
                                     fileDatasUrl.accountsFile?.endsWith("blob") ? (
                                        <p className="text-sm text-gray-700">
                                            {filesDatas?.accountsFile?.name || getFileName(fileDatasUrl?.accountsFile)}
                                        </p>
                                    ) : (
                                        <img
                                            src={filesDatas.accountsFile ? 
                                                URL.createObjectURL(filesDatas.accountsFile) : 
                                                fileDatasUrl.accountsFile?.startsWith('"') && fileDatasUrl.accountsFile?.endsWith('"') ?
                                                fileDatasUrl.accountsFile.slice(1, -1) : fileDatasUrl.accountsFile}
                                            alt="Accounts Card Uploaded Preview"
                                            className="h-32 w-32 object-cover rounded-md"
                                        />
                                    )}
                                    <div className="flex mt-2">
                                        <button
                                            onClick={(event) => handleViewImage(filesDatas.accountsFile, event, fileDatasUrl?.accountsFile)}
                                            className="text-green-500 hover:text-green-700 text-sm mr-5"
                                            type="button"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleFileDelete('accountsFile', fileDatasUrl.accountsFile)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                            type="button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <FormField 
                                    label={`Upload ${contactInfo.accounts} Business Card`}
                                    name="accountsFile"
                                    type="file"
                                    onChange={handleFileChangeWithValidation}
                                    errors={errors}
                                    filesDatas={filesDatas}
                                />
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="button"
                        className="rounded-md bg-blue-500 py-2 px-6 text-base font-semibold text-white outline-none hover:shadow-form"
                        onClick={handleNext}
                    >
                        Submit
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default ContactInformation;
