// import { useState, useContext, useEffect } from 'react';
// import { KycContext } from '../KycContext/KycContex';
// import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";
// import axios from "axios";
// // import { validate } from './validate'; // Adjust the path accordingly

// function SupplierKYC() {
//     const {
//         kycFormData,
//         setKycFormData,
//         handleInputChange,
//         filesDatas,
//         setFilesDatas,

//         handleFileChange,
//         validate
//         , errors, setErrors,
//         handleFileDelete,
//         handleViewImage,
//         extractPANFromGST,
//         fileSizes,
//         fileDatasUrl,
//         getFileName
//     } = useContext(KycContext);
//    console.log(kycFormData)
//     const { setActiveSection ,setActiveComponent} = useContext(DashBoardContext);
//     const [postalData, setPostalData] = useState([]);
//     console.log(kycFormData.supplierCategory)

//     // Function to validate the entire form
//     const handleValidate = () => {
//         const validationErrors = validate(kycFormData, filesDatas,fileDatasUrl);
//         console.log(validationErrors)

//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             ...validationErrors,
//         }));

//         return Object.keys(validationErrors).length === 0;
//     };

//     // Handle form submission
//     // const handleSubmit = (event) => {
//     //     event.preventDefault();
//     //     if (handleValidate()) {
//     //         // Proceed with form submission
//     //         console.log("Form is valid. Submitting...");
//     //         contextHandleSubmit(event); // Call context's handleSubmit if necessary
//     //     } else {
//     //         console.log("Form has errors.");
//     //     }
//     // };

//     // Handle navigation to the next section
//     const handleNext = () => {
//         if (handleValidate()) {
//             localStorage.setItem("kycData", JSON.stringify(kycFormData));

//             // setActiveSection("Principal Address");
//             setActiveComponent("Principal Address")

//         } else {
//             console.log("Form has errors. Cannot proceed to next section.");
//         }
//     };

//     // Handle input changes with validation
//     useEffect(() => {
//         if (kycFormData.gst && kycFormData.gst.length > 0) {
//             const panNo = extractPANFromGST(kycFormData.gst);
//             localStorage.setItem("kycData", JSON.stringify(kycFormData));

//             const fieldErrors = validate({ ...kycFormData, ["pan"]: panNo }, filesDatas,fileDatasUrl);
//             setErrors((prevErrors) => ({
//                 ...prevErrors,
//                 ["pan"]: fieldErrors["pan"]
//             }));
//         }
//     }, [kycFormData.gst]);
//     const handleInputChangeWithValidation = (event) => {
//         handleInputChange(event); // Update the form data
//         const { name, value } = event.target;
//         console.log(name, value)
//         // Validate the specific field
//         const fieldErrors = validate({ ...kycFormData, [name]: value }, filesDatas,fileDatasUrl);
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: fieldErrors[name]
//         }));
//     };
//     console.log(errors, kycFormData,fileDatasUrl)
//     // Handle file changes with validation
//     const handleFileChangeWithValidation = (event) => {
//         handleFileChange(event); // Update the file data
//         const { name, files } = event.target;
//         const file = files[0];

//         // Update the filesDatas with the new file
//         const updatedFilesDatas = { ...filesDatas, [name]: file };

//         // Validate the specific file field
//         const fieldErrors = validate(kycFormData, updatedFilesDatas,fileDatasUrl);
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: fieldErrors[name]
//         }));
//     };
//     // console.log(errors)

//     return (
//         <div className="flex items-center justify-center">
//             <div className="mx-auto w-full bg-white p-6">
//                 <form className='w-full '>
//                     <h3 className="font-bold text-center mb-6">Business Address</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
//                         {/* Left side fields */}
//                         <div>

//                             {/* Company Name */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Company Name:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="companyname"
//                                         value={kycFormData.companyname}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Company Name"
//                                         disabled
//                                         className={`rounded-md border ${errors.companyname ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.companyname && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.companyname}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Door No */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Door No (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="doorno"
//                                         value={kycFormData.doorno}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Door No "
//                                         maxLength={20}
//                                         className={`rounded-md border ${errors.doorno ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.doorno && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.doorno}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Street */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Street (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="street"
//                                         value={kycFormData.street}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Street"
//                                         maxLength={70}
//                                         className={`rounded-md border ${errors.street ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.street && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.street}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Pin Code */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Pin Code (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="pincode"
//                                         value={kycFormData.pincode}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Pin Code"
//                                         maxLength={6}
//                                         className={`rounded-md border ${errors.pincode ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.pincode && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Area */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Area (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     {/* <select
//                                         name='area'
//                                         value={kycFormData.area}
//                                         onChange={handleInputChangeWithValidation}
//                                         className={`w-64 rounded-md border ${errors.area ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-4 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     >
//                                         {Array.isArray(postalData) && postalData.length > 0 ? (
//                                             postalData.map((data, index) => (
//                                                 <option key={`${data.Name}-${index}`} value={data.Name}>
//                                                     {data.Name}
//                                                 </option>
//                                             ))
//                                         ) : (
//                                             <option disabled>No areas available</option>
//                                         )}
//                                     </select> */}
//                                       <input
//                                         type="text"
//                                         name="area"
//                                         value={kycFormData.area}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Area"
//                                         // maxLength={6}
//                                         className={`rounded-md border ${errors.area ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.area && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.area}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Taluk */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Taluk (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="taluk"
//                                         value={kycFormData.taluk}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Taluk"
//                                         className={`rounded-md border ${errors.taluk ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.taluk && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.taluk}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* City */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         City (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="city"
//                                         value={kycFormData.city}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter City"
//                                         className={`rounded-md border ${errors.city ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.city && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.city}</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right side fields */}
//                         <div>
//                             {/* State */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         State (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="state"
//                                         value={kycFormData.state}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter State"
//                                         className={`rounded-md border ${errors.state ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.state && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.state}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Country :
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="country"
//                                         value={kycFormData.country}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter country"
//                                         className={`rounded-md border ${errors.country ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.country && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.country}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             {/* Mobile Number */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Phone 1:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="Phone1"
//                                         value={kycFormData.Phone1}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Mobile Number"
//                                         maxLength={10}
//                                         className={`rounded-md border ${errors.Phone1 ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                         disabled
//                                     />
//                                     {errors.Phone1 && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.Phone1}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                     Phone 2:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="Phone2"
//                                         value={kycFormData.Phone2}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Phone2 Number"
//                                         maxLength={10}
//                                         className={`rounded-md border ${errors.Phone2 ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                         disabled
//                                     />
//                                     {errors.Phone2 && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.Phone2}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             {/* Email */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         E-Mail 1:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="email1"
//                                         value={kycFormData.email1}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter E-mail Address"
//                                         className={`rounded-md border ${errors.email1 ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.email1 && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.email1}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         E-Mail 2:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="email2"
//                                         value={kycFormData.email2}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter E-mail2 Address"
//                                         className={`rounded-md border ${errors.email2 ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.email2 && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.email2}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Website:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="Website"
//                                         value={kycFormData.Website}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter E-mail2 Address"
//                                         className={`rounded-md border ${errors.Website ? 'border-red-500' : 'border-gray-400'
//                                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.Website && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.Website}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div>
//             {/* Supplier Type */}
//             <div className="md:flex md:items-center mb-6">
//                 <div className='md:w-1/3'>
//                     <label className="mb-3 block text-center text-base font-medium text-black">
//                         Supplier Type:
//                     </label>
//                 </div>
//                 <div className="md:w-2/3">
//                     <select
//                         name='supplierType'
//                         value={kycFormData.supplierType}
//                         onChange={handleInputChangeWithValidation}
//                         className={`w-64 rounded-md border ${errors.supplierType ? 'border-red-500' : 'border-gray-400'}
//                         bg-white py-1 px-10 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                     >
//                         <option></option>
//                         <option>Domestic</option>
//                         <option>Export</option>
//                     </select>
//                     {errors.supplierType && (
//                         <p className="text-red-500 text-sm mt-1">{errors.supplierType}</p>
//                     )}
//                 </div>
//             </div>
//             <div className="md:flex md:items-center mb-6">
//                 <div className='md:w-1/3'>
//                     <label className="mb-3 block text-center text-base font-medium text-black">
//                         Organization:
//                     </label>
//                 </div>
//                 <div className="md:w-2/3">
//                     <select
//                         name='organization'
//                         value={kycFormData.organization}
//                         onChange={handleInputChangeWithValidation}
//                         className={`rounded-md border ${errors.organization ? 'border-red-500' : 'border-gray-400'
//                             } bg-white py-1 px-2 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                     >
//                         {organizationLists.map((data, index) => (
//                             <option value={data} key={`${data}-${index}`}>
//                                 {data}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.organization && (
//                         <p className="text-red-500 text-sm mt-1">{errors.organization}</p>
//                     )}
//                 </div>
//             </div>
//             {/* Proprietor Name */}
//             <div className="md:flex md:items-center mb-6">
//                 <div className='md:w-1/3'>
//                     <label className="mb-3 block text-center text-base font-medium text-black">
//                     Owner/Authorized Representative Name:                                    </label>
//                 </div>
//                 <div className="md:w-2/3">
//                     <input
//                         type="text"
//                         name="propritorname"
//                         value={kycFormData.propritorname}
//                         onChange={handleInputChangeWithValidation}
//                         placeholder="Enter Proprietor Name"
//                         maxLength={60}
//                         className={`rounded-md border ${errors.propritorname ? 'border-red-500' : 'border-gray-400'
//                             } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                         disabled
//                     />
//                     {errors.propritorname && (
//                         <p className="text-red-500 text-sm mt-1">{errors.propritorname}</p>
//                     )}
//                 </div>
//             </div>
//             {/* MSME Registration */}
//             <div className="md:flex md:items-center mb-6">
//                 <div className='md:w-1/3'>
//                     <label className="mb-3 block text-center text-base font-medium text-black">
//                         Reg Under MSME:
//                     </label>
//                 </div>
//                 <div className="md:w-2/3">
//                     <select
//                         name='regUnderMsme'
//                         value={kycFormData.regUnderMsme}
//                         onChange={handleInputChangeWithValidation}
//                         className={`w-64 rounded-md border ${errors.regUnderMsme ? 'border-red-500' : 'border-gray-400'}
//                         bg-white py-1 px-10 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                     >
//                         <option></option>
//                         <option>Yes</option>
//                         <option>No</option>
//                     </select>
//                     {errors.regUnderMsme && (
//                         <p className="text-red-500 text-sm mt-1">{errors.regUnderMsme}</p>
//                     )}
//                 </div>
//             </div>

//             {/* MSME Type (conditional) */}
//             {kycFormData.regUnderMsme === "Yes" && (
//                 <div className="md:flex md:items-center mb-6">
//                     <div className='md:w-1/3'>
//                         <label className="mb-3 block text-center text-base font-medium text-black">
//                             MSME Type:
//                         </label>
//                     </div>
//                     <div className="md:w-2/3">
//                         <select
//                             name='msmeType'
//                             value={kycFormData.msmeType}
//                             onChange={handleInputChangeWithValidation}
//                             className={`w-64 rounded-md border ${errors.msmeType ? 'border-red-500' : 'border-gray-400'}
//                             bg-white py-1 px-10 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                         >
//                             {msmeTypes.map((type, index) => (
//                                 <option value={type} key={`${type}-${index}`}>
//                                     {type}
//                                 </option>
//                             ))}
//                         </select>
//                         {errors.msmeType && (
//                             <p className="text-red-500 text-sm mt-1">{errors.msmeType}</p>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* MSME Number (conditional) */}
//             {kycFormData.regUnderMsme === "Yes" && (
//                 <div className="md:flex md:items-center mb-6">
//                     <div className='md:w-1/3'>
//                         <label className="mb-3 block text-center text-base font-medium text-black">
//                             MSME No:
//                         </label>
//                     </div>
//                     <div className="md:w-2/3">
//                         <input
//                             type="text"
//                             name="msmeNo"
//                             value={kycFormData.msmeNo}
//                             onChange={handleInputChangeWithValidation}
//                             placeholder="Enter MSME Number"
//                             className={`rounded-md border ${errors.msmeNo ? 'border-red-500' : 'border-gray-400'}
//                             bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                         />
//                         {errors.msmeNo && (
//                             <p className="text-red-500 text-sm mt-1">{errors.msmeNo}</p>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* GST */}
//             <div className="md:flex md:items-center mb-6">
//                 <div className='md:w-1/3'>
//                     <label className="mb-3 block text-center text-base font-medium text-black">
//                         GST No:
//                     </label>
//                 </div>
//                 <div className="md:w-2/3">
//                     <input
//                         type="text"
//                         name="gst"
//                         value={kycFormData.gst}
//                         onChange={handleInputChangeWithValidation}
//                         placeholder="Enter GST Number"
//                         className={`rounded-md border ${errors.gst ? 'border-red-500' : 'border-gray-400'}
//                         bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                     />
//                     {errors.gst && (
//                         <p className="text-red-500 text-sm mt-1">{errors.gst}</p>
//                     )}
//                 </div>
//             </div>

//             {/* PAN */}
//             <div className="md:flex md:items-center mb-6">
//                 <div className='md:w-1/3'>
//                     <label className="mb-3 block text-center text-base font-medium text-black">
//                         PAN:
//                     </label>
//                 </div>
//                 <div className="md:w-2/3">
//                     <input
//                         type="text"
//                         name="pan"
//                         value={kycFormData.pan}
//                         onChange={handleInputChangeWithValidation}
//                         placeholder="Enter PAN Number"
//                         disabled
//                         className={`rounded-md border ${errors.pan ? 'border-red-500' : 'border-gray-400'}
//                         bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                     />
//                     {errors.pan && (
//                         <p className="text-red-500 text-sm mt-1">{errors.pan}</p>
//                     )}
//                 </div>
//             </div>
//         </div>

//                         </div>
//                     </div>

//                     {/* File Uploads and Next Button */}

//                     <div className='flex flex-row grid grid-cols-3 gap-12 justify-center'>
//                         {/* GST File Upload */}
//                         {/* <div className="flex flex-row grid grid-cols-3 gap-12 justify-center"> */}
//                         <div className="mb-5">
//                             {/* Conditionally render either the file preview or the file input */}
//                             {filesDatas.gstFile||fileDatasUrl.gstFile ? (
//                                 // Display the uploaded image or PDF information
//                                 <div className="mt-4 p-4 border rounded-md bg-gray-50">
//                                     <p className="text-base font-medium mb-2">Uploaded GST file:</p>
//                                     {filesDatas.gstFile?.type === "application/pdf" ||fileDatasUrl.gstFile?.endsWith(".pdf")? (
//                                         <p className="text-sm text-gray-700">{filesDatas?.gstFile?.name||getFileName(fileDatasUrl?.gstFile)}</p>
//                                         // {console.log()}https://backendrate.s3.ap-south-1.amazonaws.com
//                                     ) : (
//                                         <img
//                                             src={filesDatas.gstFile?URL.createObjectURL(filesDatas.gstFile):fileDatasUrl.gstFile}
//                                             alt="Uploaded Preview"
//                                             className="h-32 w-32 object-cover rounded-md"
//                                         />
//                                     )}
//                                     <button
//                                         onClick={(event) => handleViewImage(filesDatas.gstFile, event,fileDatasUrl.gstFile)}
//                                         className="mt-2 text-green-500 hover:text-green-700 text-sm mr-5"
//                                     >
//                                         View
//                                     </button>
//                                     <button
//                                         onClick={() => handleFileDelete('gstFile',fileDatasUrl.gstFile)}
//                                         className="mt-2 text-red-500 hover:text-red-700 text-sm"
//                                     >
//                                         Delete
//                                     </button>
//                                     <p >
//                                         gstFile: {fileSizes["gstFile"]} KB
//                                     </p>
//                                 </div>
//                             ) : (
//                                 // Display the file input if there’s no uploaded file
//                                 <div>
//                                     <label className="mb-3 block text-base font-medium">
//                                         Upload GST PDF or Image
//                                     </label>
//                                     <input
//                                         type="file"
//                                         name="gstFile"
//                                         accept="application/pdf, image/*"
//                                         onChange={handleFileChangeWithValidation}
//                                         className={`w-full rounded-md border ${errors.gstFile ? 'border-red-500' : 'border-[#e0e0e0]'
//                                             } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                 </div>
//                             )}

//                             {/* Display error message if validation fails */}
//                             {errors.gstFile && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.gstFile}</p>
//                             )}
//                         </div>
//                         {/* </div> */}

//                         {console.log(fileDatasUrl)}
//                         <div className="mb-5">

//                             {filesDatas.panFile ||fileDatasUrl.panFile? (
//                                 <div className="mt-4 p-4 border rounded-md bg-gray-50">
//                                     <p className="text-base font-medium mb-2">Uploaded PAN file:</p>
//                                     {filesDatas.panFile?.type === "application/pdf"||fileDatasUrl.panFile?.endsWith(".pdf") ? (
//                                         <p className="text-sm text-gray-700">{filesDatas?.panFile?.name||getFileName(fileDatasUrl?.panFile)}</p>
//                                     ) : (
//                                         <img
//                                         src={filesDatas.panFile ? URL.createObjectURL(filesDatas.panFile) : fileDatasUrl.panFile}
//                                         alt="PAN Uploaded Preview"
//                                         className="h-32 w-32 object-cover rounded-md"
//                                     />
//                                     )}
//                                     <button
//                                         onClick={(event) => handleViewImage(filesDatas.panFile, event,fileDatasUrl.panFile)}
//                                         className="mt-2 text-green-500 hover:text-green-700 text-sm mr-5"
//                                     >
//                                         View
//                                     </button>
//                                     <button
//                                         onClick={() => handleFileDelete('panFile',fileDatasUrl.panFile)}
//                                         className="mt-2 text-red-500 hover:text-red-700 text-sm"
//                                     >
//                                         Delete
//                                     </button>
//                                     <p >
//                                         panFile: {fileSizes["panFile"]} KB
//                                     </p>

//                                 </div>
//                             ) : (
//                                 <div>
//                                     <label className="mb-3 block text-base font-medium">
//                                         Upload PAN PDF or Image
//                                     </label>
//                                     <input
//                                         type="file"
//                                         name="panFile"
//                                         accept="application/pdf, image/*"
//                                         onChange={handleFileChangeWithValidation}
//                                         className={`w-full rounded-md border ${errors.panFile ? 'border-red-500' : 'border-[#e0e0e0]'
//                                             } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                 </div>
//                             )}
//                             {errors.panFile && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.panFile}</p>
//                             )}
//                         </div>

//                         {/* MSME File Upload (Conditional) */}
//                         {kycFormData.regUnderMsme === "Yes" && (
//                             <div className="mb-5">

//                                 {filesDatas.msmeFile||fileDatasUrl.msmeFile ? (
//                                     <div className="mt-4 p-4 border rounded-md bg-gray-50">
//                                         <p className="text-base font-medium mb-2">Uploaded MSME file:</p>
//                                         {filesDatas.msmeFile?.type === "application/pdf"||fileDatasUrl.msmeFile?.endsWith(".pdf") ? (
//                                             <p className="text-sm text-gray-700">{filesDatas?.msmeFile?.name||getFileName(fileDatasUrl?.msmeFile)}</p>
//                                         ) : (
//                                             <img
//                                                 src={filesDatas.msmeFile?URL.createObjectURL(filesDatas.msmeFile):fileDatasUrl.msmeFile}
//                                                 alt="MSME Uploaded Preview"
//                                                 className="h-32 w-32 object-cover rounded-md"
//                                             />
//                                         )}
//                                         <button
//                                             onClick={(event) => handleViewImage(filesDatas.msmeFile, event,fileDatasUrl.msmeFile)}
//                                             className="mt-2 text-green-500 hover:text-green-700 text-sm mr-5"
//                                         >
//                                             View
//                                         </button>
//                                         <button
//                                             onClick={() => handleFileDelete('msmeFile',fileDatasUrl.msmeFile)}
//                                             className="mt-2 text-red-500 hover:text-red-700 text-sm"
//                                         >
//                                             Delete
//                                         </button>
//                                         <p >
//                                             msmeFile: {fileSizes["msmeFile"]} KB
//                                         </p>

//                                     </div>
//                                 ) : (
//                                     <div>
//                                         <label className="mb-3 block text-base font-medium">
//                                             Upload MSME PDF or Image
//                                         </label>

//                                         <input
//                                             type="file"
//                                             name="msmeFile"
//                                             accept="application/pdf, image/*"
//                                             onChange={handleFileChangeWithValidation}
//                                             className={`w-full rounded-md border ${errors.msmeFile ? 'border-red-500' : 'border-[#e0e0e0]'
//                                                 } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-black focus:shadow-md`}
//                                         />
//                                     </div>
//                                 )}
//                                 {errors.msmeFile && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.msmeFile}</p>
//                                 )}
//                             </div>
//                         )}
//                         {/* </div> */}

//                         {/* Next Button */}

//                     </div>
//                     <div className='flex justify-center'>
//                         <button
//                             type="button"
//                             className="center mt-4 rounded-md bg-blue-500 py-2 px-6 text-base font-semibold text-white outline-none hover:shadow-form"
//                             onClick={handleNext}
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default SupplierKYC;

// import { useState, useContext, useEffect } from 'react';
// import { KycContext } from '../KycContext/KycContex';
// import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";
// import axios from "axios";

// function SupplierKYC() {
//     const {
//         kycFormData,
//         setKycFormData,
//         handleInputChange,
//         filesDatas,
//         setFilesDatas,
//         handleFileChange,
//         validate,
//         errors,
//         setErrors,
//         handleFileDelete,
//         handleViewImage,
//         extractPANFromGST,
//         fileSizes,
//         fileDatasUrl,
//         getFileName
//     } = useContext(KycContext);

//     const { setActiveSection, setActiveComponent } = useContext(DashBoardContext);
//     const [postalData, setPostalData] = useState([]);

//     // Define missing constants
//     const organizationLists = [
//         "",
//         "Proprietorship",
//         "Partnership",
//         "Private Limited",
//         "Public Limited",
//         "LLP"
//     ];

//     const msmeTypes = [
//         "",
//         "Micro",
//         "Small",
//         "Medium"
//     ];

//     // Function to validate the entire form
//     const handleValidate = () => {
//         const validationErrors = validate(kycFormData, filesDatas, fileDatasUrl);

//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             ...validationErrors,
//         }));

//         return Object.keys(validationErrors).length === 0;
//     };

//     // Handle navigation to the next section
//     const handleNext = () => {
//         if (handleValidate()) {
//             localStorage.setItem("kycData", JSON.stringify(kycFormData));
//             setActiveComponent("Principal Address");
//         } else {
//             console.log("Form has errors. Cannot proceed to next section.");
//         }
//     };

//     // Extract PAN from GST when GST is entered
//     useEffect(() => {
//         if (kycFormData.gst && kycFormData.gst.length > 0) {
//             const panNo = extractPANFromGST(kycFormData.gst);

//             // Update kycFormData with the extracted PAN
//             setKycFormData(prevData => ({
//                 ...prevData,
//                 pan: panNo
//             }));

//             localStorage.setItem("kycData", JSON.stringify({
//                 ...kycFormData,
//                 pan: panNo
//             }));

//             const fieldErrors = validate({ ...kycFormData, pan: panNo }, filesDatas, fileDatasUrl);
//             setErrors((prevErrors) => ({
//                 ...prevErrors,
//                 pan: fieldErrors.pan
//             }));
//         }
//     }, [kycFormData.gst]);

//     // Handle input changes with validation
//     const handleInputChangeWithValidation = (event) => {
//         handleInputChange(event); // Update the form data
//         const { name, value } = event.target;

//         // Validate the specific field
//         const fieldErrors = validate({ ...kycFormData, [name]: value }, filesDatas, fileDatasUrl);
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: fieldErrors[name]
//         }));
//     };

//     // Handle file changes with validation
//     const handleFileChangeWithValidation = (event) => {
//         handleFileChange(event); // Update the file data
//         const { name, files } = event.target;
//         const file = files[0];

//         // Update the filesDatas with the new file
//         const updatedFilesDatas = { ...filesDatas, [name]: file };

//         // Validate the specific file field
//         const fieldErrors = validate(kycFormData, updatedFilesDatas, fileDatasUrl);
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: fieldErrors[name]
//         }));
//     };

//     return (
//         <div className="flex items-center justify-center">
//             <div className="mx-auto w-full bg-white p-6">
//                 <form className='w-full'>
//                     <h3 className="font-bold text-center mb-6">Business Address</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                         {/* Left side fields */}
//                         <div>
//                             {/* Company Name */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Company Name:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="companyname"
//                                         value={kycFormData.companyname}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Company Name"
//                                         disabled
//                                         className={`rounded-md border ${errors.companyname ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.companyname && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.companyname}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Door No */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Door No (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="doorno"
//                                         value={kycFormData.doorno}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Door No "
//                                         maxLength={20}
//                                         className={`rounded-md border ${errors.doorno ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.doorno && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.doorno}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Street */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Street (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="street"
//                                         value={kycFormData.street}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Street"
//                                         maxLength={70}
//                                         className={`rounded-md border ${errors.street ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.street && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.street}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Pin Code */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Pin Code (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="pincode"
//                                         value={kycFormData.pincode}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Pin Code"
//                                         maxLength={6}
//                                         className={`rounded-md border ${errors.pincode ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.pincode && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Area */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Area (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="area"
//                                         value={kycFormData.area}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Area"
//                                         className={`rounded-md border ${errors.area ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.area && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.area}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Taluk */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Taluk (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="taluk"
//                                         value={kycFormData.taluk}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Taluk"
//                                         className={`rounded-md border ${errors.taluk ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.taluk && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.taluk}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* City */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         City (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="city"
//                                         value={kycFormData.city}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter City"
//                                         className={`rounded-md border ${errors.city ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.city && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.city}</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right side fields */}
//                         <div>
//                             {/* State */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         State (as per Gst):
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="state"
//                                         value={kycFormData.state}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter State"
//                                         className={`rounded-md border ${errors.state ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.state && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.state}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Country */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Country:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="country"
//                                         value={kycFormData.country}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter country"
//                                         className={`rounded-md border ${errors.country ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.country && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.country}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Phone 1 */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Phone 1:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="Phone1"
//                                         value={kycFormData.Phone1}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Mobile Number"
//                                         maxLength={10}
//                                         className={`rounded-md border ${errors.Phone1 ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                         disabled
//                                     />
//                                     {errors.Phone1 && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.Phone1}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Phone 2 */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Phone 2:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="Phone2"
//                                         value={kycFormData.Phone2}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Phone2 Number"
//                                         maxLength={10}
//                                         className={`rounded-md border ${errors.Phone2 ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                         disabled
//                                     />
//                                     {errors.Phone2 && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.Phone2}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Email 1 */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         E-Mail 1:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="email1"
//                                         value={kycFormData.email1}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter E-mail Address"
//                                         className={`rounded-md border ${errors.email1 ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.email1 && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.email1}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Email 2 */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         E-Mail 2:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="email2"
//                                         value={kycFormData.email2}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter E-mail2 Address"
//                                         className={`rounded-md border ${errors.email2 ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.email2 && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.email2}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Website */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Website:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <input
//                                         type="text"
//                                         name="Website"
//                                         value={kycFormData.Website}
//                                         onChange={handleInputChangeWithValidation}
//                                         placeholder="Enter Website Address"
//                                         className={`rounded-md border ${errors.Website ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     />
//                                     {errors.Website && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.Website}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Supplier Type */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Supplier Type:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <select
//                                         name='supplierType'
//                                         value={kycFormData.supplierType}
//                                         onChange={handleInputChangeWithValidation}
//                                         className={`w-64 rounded-md border ${errors.supplierType ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-10 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     >
//                                         <option value=""></option>
//                                         <option value="Domestic">Domestic</option>
//                                         <option value="Export">Export</option>
//                                     </select>
//                                     {errors.supplierType && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.supplierType}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Organization */}
//                             <div className="md:flex md:items-center mb-6">
//                                 <div className='md:w-1/3'>
//                                     <label className="mb-3 block text-center text-base font-medium text-black">
//                                         Organization:
//                                     </label>
//                                 </div>
//                                 <div className="md:w-2/3">
//                                     <select
//                                         name='organization'
//                                         value={kycFormData.organization}
//                                         onChange={handleInputChangeWithValidation}
//                                         className={`rounded-md border ${errors.organization ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-2 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                     >
//                                         {organizationLists.map((data, index) => (
//                                             <option value={data} key={`${data}-${index}`}>
//                                                 {data}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {errors.organization && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.organization}</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Third column for Business details */}
//                     <div className="mt-8">
//                         <h3 className="font-bold text-center mb-6">Business Details</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                             <div>
//                                 {/* Proprietor Name */}
//                                 <div className="md:flex md:items-center mb-6">
//                                     <div className='md:w-1/3'>
//                                         <label className="mb-3 block text-center text-base font-medium text-black">
//                                             Owner/Authorized Representative Name:
//                                         </label>
//                                     </div>
//                                     <div className="md:w-2/3">
//                                         <input
//                                             type="text"
//                                             name="propritorname"
//                                             value={kycFormData.propritorname}
//                                             onChange={handleInputChangeWithValidation}
//                                             placeholder="Enter Proprietor Name"
//                                             maxLength={60}
//                                             className={`rounded-md border ${errors.propritorname ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                             disabled
//                                         />
//                                         {errors.propritorname && (
//                                             <p className="text-red-500 text-sm mt-1">{errors.propritorname}</p>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* MSME Registration */}
//                                 <div className="md:flex md:items-center mb-6">
//                                     <div className='md:w-1/3'>
//                                         <label className="mb-3 block text-center text-base font-medium text-black">
//                                             Reg Under MSME:
//                                         </label>
//                                     </div>
//                                     <div className="md:w-2/3">
//                                         <select
//                                             name='regUnderMsme'
//                                             value={kycFormData.regUnderMsme}
//                                             onChange={handleInputChangeWithValidation}
//                                             className={`w-64 rounded-md border ${errors.regUnderMsme ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-10 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                         >
//                                             <option value=""></option>
//                                             <option value="Yes">Yes</option>
//                                             <option value="No">No</option>
//                                         </select>
//                                         {errors.regUnderMsme && (
//                                             <p className="text-red-500 text-sm mt-1">{errors.regUnderMsme}</p>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* MSME Type (conditional) */}
//                                 {kycFormData.regUnderMsme === "Yes" && (
//                                     <div className="md:flex md:items-center mb-6">
//                                         <div className='md:w-1/3'>
//                                             <label className="mb-3 block text-center text-base font-medium text-black">
//                                                 MSME Type:
//                                             </label>
//                                         </div>
//                                         <div className="md:w-2/3">
//                                             <select
//                                                 name='msmeType'
//                                                 value={kycFormData.msmeType}
//                                                 onChange={handleInputChangeWithValidation}
//                                                 className={`w-64 rounded-md border ${errors.msmeType ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-10 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                             >
//                                                 {msmeTypes.map((type, index) => (
//                                                     <option value={type} key={`${type}-${index}`}>
//                                                         {type}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             {errors.msmeType && (
//                                                 <p className="text-red-500 text-sm mt-1">{errors.msmeType}</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>

//                             <div>
//                                 {/* MSME Number (conditional) */}
//                                 {kycFormData.regUnderMsme === "Yes" && (
//                                     <div className="md:flex md:items-center mb-6">
//                                         <div className='md:w-1/3'>
//                                             <label className="mb-3 block text-center text-base font-medium text-black">
//                                                 MSME No:
//                                             </label>
//                                         </div>
//                                         <div className="md:w-2/3">
//                                             <input
//                                                 type="text"
//                                                 name="msmeNo"
//                                                 value={kycFormData.msmeNo}
//                                                 onChange={handleInputChangeWithValidation}
//                                                 placeholder="Enter MSME Number"
//                                                 className={`rounded-md border ${errors.msmeNo ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                             />
//                                             {errors.msmeNo && (
//                                                 <p className="text-red-500 text-sm mt-1">{errors.msmeNo}</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* GST */}
//                                 <div className="md:flex md:items-center mb-6">
//                                     <div className='md:w-1/3'>
//                                         <label className="mb-3 block text-center text-base font-medium text-black">
//                                             GST No:
//                                         </label>
//                                     </div>
//                                     <div className="md:w-2/3">
//                                         <input
//                                             type="text"
//                                             name="gst"
//                                             value={kycFormData.gst}
//                                             onChange={handleInputChangeWithValidation}
//                                             placeholder="Enter GST Number"
//                                             className={`rounded-md border ${errors.gst ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                         />
//                                         {errors.gst && (
//                                             <p className="text-red-500 text-sm mt-1">{errors.gst}</p>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* PAN */}
//                                 <div className="md:flex md:items-center mb-6">
//                                     <div className='md:w-1/3'>
//                                         <label className="mb-3 block text-center text-base font-medium text-black">
//                                             PAN:
//                                         </label>
//                                     </div>
//                                     <div className="md:w-2/3">
//                                         <input
//                                             type="text"
//                                             name="pan"
//                                             value={kycFormData.pan}
//                                             onChange={handleInputChangeWithValidation}
//                                             placeholder="Enter PAN Number"
//                                             disabled
//                                             className={`rounded-md border ${errors.pan ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
// />
//                                         {errors.pan && (
//                                             <p className="text-red-500 text-sm mt-1">{errors.pan}</p>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* GST Upload */}
//                                 <div className="md:flex md:items-center mb-6">
//                                     <div className='md:w-1/3'>
//                                         <label className="mb-3 block text-center text-base font-medium text-black">
//                                             GST Upload:
//                                         </label>
//                                     </div>
//                                     <div className="md:w-2/3">
//                                         <input
//                                             type="file"
//                                             name="gstFile"
//                                             onChange={handleFileChangeWithValidation}
//                                             className={`rounded-md border ${errors.gstFile ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                         />
//                                         {errors.gstFile && (
//                                             <p className="text-red-500 text-sm mt-1">{errors.gstFile}</p>
//                                         )}
//                                         {filesDatas.gstFile && (
//                                             <div className="flex items-center mt-2">
//                                                 <p className="mr-2">{getFileName("gstFile")}</p>
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleViewImage("gstFile")}
//                                                     className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                                                 >
//                                                     View
//                                                 </button>
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleFileDelete("gstFile")}
//                                                     className="bg-red-500 text-white px-2 py-1 rounded"
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* PAN Upload */}
//                                 <div className="md:flex md:items-center mb-6">
//                                     <div className='md:w-1/3'>
//                                         <label className="mb-3 block text-center text-base font-medium text-black">
//                                             PAN Upload:
//                                         </label>
//                                     </div>
//                                     <div className="md:w-2/3">
//                                         <input
//                                             type="file"
//                                             name="panFile"
//                                             onChange={handleFileChangeWithValidation}
//                                             className={`rounded-md border ${errors.panFile ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                         />
//                                         {errors.panFile && (
//                                             <p className="text-red-500 text-sm mt-1">{errors.panFile}</p>
//                                         )}
//                                         {filesDatas.panFile && (
//                                             <div className="flex items-center mt-2">
//                                                 <p className="mr-2">{getFileName("panFile")}</p>
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleViewImage("panFile")}
//                                                     className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                                                 >
//                                                     View
//                                                 </button>
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleFileDelete("panFile")}
//                                                     className="bg-red-500 text-white px-2 py-1 rounded"
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* MSME Upload (conditional) */}
//                                 {kycFormData.regUnderMsme === "Yes" && (
//                                     <div className="md:flex md:items-center mb-6">
//                                         <div className='md:w-1/3'>
//                                             <label className="mb-3 block text-center text-base font-medium text-black">
//                                                 MSME Upload:
//                                             </label>
//                                         </div>
//                                         <div className="md:w-2/3">
//                                             <input
//                                                 type="file"
//                                                 name="msmeFile"
//                                                 onChange={handleFileChangeWithValidation}
//                                                 className={`rounded-md border ${errors.msmeFile ? 'border-red-500' : 'border-gray-400'} bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`}
//                                             />
//                                             {errors.msmeFile && (
//                                                 <p className="text-red-500 text-sm mt-1">{errors.msmeFile}</p>
//                                             )}
//                                             {filesDatas.msmeFile && (
//                                                 <div className="flex items-center mt-2">
//                                                     <p className="mr-2">{getFileName("msmeFile")}</p>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => handleViewImage("msmeFile")}
//                                                         className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                                                     >
//                                                         View
//                                                     </button>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => handleFileDelete("msmeFile")}
//                                                         className="bg-red-500 text-white px-2 py-1 rounded"
//                                                     >
//                                                         Delete
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Navigation buttons */}
//                     <div className="flex justify-end mt-10">
//                         <button
//                             type="button"
//                             onClick={() => setActiveComponent("SupplierSelection")}
//                             className="mx-2 inline-block rounded-lg bg-gray-500 px-5 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-gray-600 focus-visible:ring active:bg-gray-700 md:text-base"
//                         >
//                             Back
//                         </button>
//                         <button
//                             type="button"
//                             onClick={handleNext}
//                             className="mx-2 inline-block rounded-lg bg-indigo-500 px-5 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default SupplierKYC;

import { useState, useContext, useEffect } from "react";
import { KycContext } from "../KycContext/KycContex";
import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";
import axios from "axios";
import { FormField } from "../InputComponents/FormField";
import { countries } from "../Datas/CountryData";
function SupplierKYC() {
  const {
    kycFormData,
    setKycFormData,
    handleInputChange,
    filesDatas,
    setFilesDatas,
    handleFileChange,
    validateKycForm,
    errors,
    setErrors,
    handleFileDelete,
    handleViewImage,
    extractPANFromGST,
    fileSizes,
    fileDatasUrl,
    getFileName,
  } = useContext(KycContext);

  const { setActiveSection, setActiveComponent } = useContext(DashBoardContext);
  const [postalData, setPostalData] = useState([]);

  // Define missing constants

  // Function to validate the entire form
  const handleValidate = () => {
    const validationErrors = validateKycForm(
      kycFormData,
      filesDatas,
      fileDatasUrl
    );

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validationErrors,
    }));

    return Object.keys(validationErrors).length === 0;
  };

  // Handle navigation to the next section
  const handleNext = () => {
    if (handleValidate()) {
      localStorage.setItem("kycData", JSON.stringify(kycFormData));
      setActiveComponent("Business Details");
    } else {
      console.log("Form has errors. Cannot proceed to next section.");
    }
  };

  // Extract PAN from GST when GST is entered
  useEffect(() => {
    if (kycFormData.gst && kycFormData.gst.length > 0) {
      const panNo = extractPANFromGST(kycFormData.gst);

      // Update kycFormData with the extracted PAN
      setKycFormData((prevData) => ({
        ...prevData,
        pan: panNo,
      }));

      localStorage.setItem(
        "kycData",
        JSON.stringify({
          ...kycFormData,
          pan: panNo,
        })
      );

      // const fieldErrors = validate({ ...kycFormData, pan: "" }, filesDatas, fileDatasUrl);
      // setErrors((prevErrors) => ({
      //     ...prevErrors,
      //     pan: fieldErrors.pan
      // }));
    }
  }, [kycFormData.gst]);

  // Handle input changes with validation
  const handleInputChangeWithValidation = (event) => {
    handleInputChange(event); // Update the form data
    const { name, value } = event.target;

    // Validate the specific field
    const fieldErrors = validateKycForm(
      { ...kycFormData, [name]: value },
      filesDatas,
      fileDatasUrl
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name],
    }));
  };

  // Handle file changes with validation
  const handleFileChangeWithValidation = (event) => {
    handleFileChange(event); // Update the file data
    const { name, files } = event.target;
    const file = files[0];

    // Update the filesDatas with the new file
    const updatedFilesDatas = { ...filesDatas, [name]: file };

    // Validate the specific file field
    const fieldErrors = validateKycForm(
      kycFormData,
      updatedFilesDatas,
      fileDatasUrl
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name],
    }));
  };

  // Reusable form field component to maintain consistency and reduce repetition

  return (
    <div className="flex items-center justify-center w-full p-2">
      <div className="mx-auto w-full bg-white p-4">
        <form className="w-full">
          <h3 className="font-bold text-center mb-6 text-lg md:text-xl">
            Business Address
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10">
            {/* Left side fields */}
            <div>
              <FormField
                label="Company Name"
                name="companyname"
                value={kycFormData.companyname}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Company Name"
                errors={errors}
                disabled={true}
              />

              <FormField
                label="Door No (as per Gst)"
                name="doorno"
                value={kycFormData.doorno}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Door No"
                errors={errors}
                maxLength={20}
              />

              <FormField
                label="Street (as per Gst)"
                name="street"
                value={kycFormData.street}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Street"
                errors={errors}
                maxLength={70}
              />

              <FormField
                label="Pin Code (as per Gst)"
                name="pincode"
                value={kycFormData.pincode}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Pin Code"
                errors={errors}
                maxLength={6}
              />

              <FormField
                label="Area (as per Gst)"
                name="area"
                value={kycFormData.area}
                onChange={handleInputChangeWithValidation}
                errors={errors}
                placeholder="Enter Area"
              />

              <FormField
                label="Taluk (as per Gst)"
                name="taluk"
                value={kycFormData.taluk}
                onChange={handleInputChangeWithValidation}
                errors={errors}
                placeholder="Enter Taluk"
              />

              <FormField
                label="City (as per Gst)"
                name="city"
                value={kycFormData.city}
                onChange={handleInputChangeWithValidation}
                errors={errors}
                placeholder="Enter City"
              />
            </div>

            {/* Right side fields */}
            <div>
              <FormField
                label="State (as per Gst)"
                name="state"
                value={kycFormData.state}
                onChange={handleInputChangeWithValidation}
                errors={errors}
                placeholder="Enter State"
              />

              {/* <FormField
                label="Country"
                name="country"
                value={kycFormData.country}
                onChange={handleInputChangeWithValidation}
                errors={errors}
                placeholder="Enter Country"
              /> */}
              <FormField
                label="Country"
                name="country"
                type="select"
                value={kycFormData.country}
                onChange={handleInputChangeWithValidation}
                options={countries}
                errors={errors}
              />
              <FormField
                label="Phone "
                name="Phone1"
                value={kycFormData.Phone1}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Phone Number"
                errors={errors}
                maxLength={10}
                disabled={true}
              />

              <FormField
                label="Whats App Number"
                name="Phone2"
                value={kycFormData.Phone2}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Whats App Number"
                errors={errors}
                maxLength={10}
                // disabled={true}
              />

              <FormField
                label="E-Mail 1"
                name="email1"
                value={kycFormData.email1}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter E-mail Address"
                errors={errors}
              />

              <FormField
                label="E-Mail 2"
                name="email2"
                value={kycFormData.email2}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter E-mail2 Address"
                errors={errors}
              />

              <FormField
                label="Website"
                name="Website"
                value={kycFormData.Website}
                onChange={handleInputChangeWithValidation}
                placeholder="Enter Website Address"
                errors={errors}
              />
            </div>
          </div>

          {/* Business details section */}

          {/* Navigation buttons */}
          <div className="flex justify-center">
            {/* <button
                            type="button"
                            onClick={() => setActiveComponent("SupplierSelection")}
                            className="w-full sm:w-auto inline-block rounded-lg bg-gray-500 px-5 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-gray-600 focus-visible:ring active:bg-gray-700 md:text-base"
                        >
                            Back
                        </button> */}
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

export default SupplierKYC;
