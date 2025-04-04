import { createContext, useState } from "react";
import axios from "axios";
import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";
import { useContext } from "react";
import {
  validateKycForm,
  validateAgentInfo,
  validateBusinessDetails,
  validateNatureOfBusiness,
  validateAccountInfo,
  validateContactInfo
} from "../Datas/Validation";
//validateBusinessInfo
import { useEffect } from "react";
import { KYC_API } from "../../../config/configData";
import { jwtDecode } from "jwt-decode";

const KycContext = createContext();

const KycDataProvider = ({ children }) => {
  // const kycPost = "http://localhost:8080/kyc"
  const {
    user,
    userRole,
    userData,
    decryptToken,
    companyName: cmpyName,
    setExportComp
  } = useContext(DashBoardContext);
  const [companyName, setCompanyName] = useState("");
  const [userName, setUserName] = useState("");

  const [kycFormData, setKycFormData] = useState({
    id:'',
    companyname: "",
    doorno: "",
    street: "",
    pincode: "",
    area: "",
    taluk: "",
    city: "",
    state: "",
    country: "",
    Phone1: "",
    Phone2: "",
    email1: "",
    email2: "",
    Website: "",
   
  });
  // files
  const [filesDatas, setFilesDatas] = useState({
    gstFile: null,
    panFile: null,
    msmeFile: null,
    chequeFile1: null,
    chequeFile2: null,
    ownerFile: null,
    boFile: null,
    accountsFile: null,
  });
  const [fileDatasUrl, setFileDatasUrl] = useState({
    gstFile: "",
    panFile: "",
    msmeFile: "",
    chequeFile1: "",
    chequeFile2: "",
    ownerFile: "",
    boFile: "",
    accountsFile: "",
  });
  console.log(fileDatasUrl.gstFile);

  const [agentInfo, setAgentInfo] = useState({
    agentname: "",
    agentDoorNo: "",
    agentStreet: "",
    agentArea: "",
    agentCity: "",
    agentState: "",
    agentCountry: "",
    agentPincode: "",
    agentPhone: "",
    agentEmail: "",
    agentGst: "",
    agentRemarks: "",
  });
  const [businessDetails, setBusinessDetails] = useState({
    supplierType: "",
    organization: "",

    // Business Details fields
    propritorname: "",
    regUnderMsme: "",
    msmeType: "",
    msmeNo: "",
    gst: "",
    pan: "",
    buzzCountry: "",
    region: "",
    currency: "",
    ibanNo: "",
    swiftCode: "",
  });
  const [natureOfBusiness, setNatureOfBusiness] = useState({
    supplierType: "",
    organization: "",
    regUnderMsme: "",
    msmeType: "", // Added MSME type field
    msmeNo: "",
    gst: "",
    pan: "",
  });
  const [accInfo, setAccInfo] = useState({
    acholdername: "",
    acnumber: "",
    actype: "",
    ifsc: "",
    bankname: "",
    bankbranchname: "",
    bankaddress: "",
    acholdername1: "",
    acnumber1: "",
    actype1: "",
    ifsc1: "",
    bankname1: "",
    bankbranchname1: "",
    bankaddress1: "",
  });
  const [contactInfo, setContactInfo] = useState({
    owner: "",
    ownername: "",
    ownermobile: "",
    owneremail: "",
    businessoperation: "",
    boname: "",
    bomobile: "",
    boemail: "",
    accounts: "",
    accname: "",
    accmobile: "",
    accemail: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [fileSizes, setFileSizes] = useState({});
  function capitalizeValue(value, name = "") {
    if (
      typeof value === "string" &&
      value.length > 0 &&
      !name.includes("email")
    ) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } else if (
      typeof value === "string" &&
      value.length > 0 &&
      name.includes("email")
    ) {
      return value;
    }
    return value; // Return as is if not a string
  }

  console.log("accInfo", accInfo);
  useEffect(()=>{
    if(kycFormData.supplierType==="Export")
    setExportComp(true)
  },[kycFormData.supplierType])
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const Securedtoken = decryptToken(token);
      const decodedToken = jwtDecode(Securedtoken);
      console.log(decodedToken);
      const role = decodedToken.role;
      const name = decodedToken.name;
      const companyName = decodedToken.companyName;
      const MobileNo = decodedToken.MobileNo;
      setCompanyName(companyName);
      setUserName(name);

      setKycFormData((prevState) => ({
        ...prevState,
        companyname: companyName,
        // propritorname: name,
        Phone1: MobileNo,
      }));
    }
  }, []);
  // console.log(companyName, userName);

  console.log(kycFormData);
  const getFileName = (url) => {
    console.log(url);
    return url?.split("/").pop();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("token");
        let kycDatasLocal = localStorage.getItem("kycData");
        let kycDatas = JSON.parse(kycDatasLocal);
        let kycAgent = localStorage.getItem("KycAgent");
        let agent = JSON.parse(kycAgent);
        let kycAcc = localStorage.getItem("KycAcc");
        let accInfo = JSON.parse(kycAcc);
        let KycContact = localStorage.getItem("KycContact");
        let contactInfo = JSON.parse(KycContact);
        let KycExport = localStorage.getItem("KycExpo");
        let exportInfo = JSON.parse(KycExport);
        let kycTrade = localStorage.getItem("KycTrade");
        let tradeinfos = JSON.parse(kycTrade);

        if (kycDatas) setKycFormData(kycDatas);
        if (agent) setAgentInfo(agent);
        if (accInfo) setAccInfo(accInfo);
        if (contactInfo) setContactInfo(contactInfo);
        if(exportInfo)setBusinessDetails(exportInfo)
        // if (tradeinfos) setTradeBusinessInfo(tradeinfos);
        const fetchToken = () => {
          token = localStorage.getItem("token");
        };
        if (!token) {
          console.error("No token found in localStorage");
          fetchToken();
          return;
        }

        const SecuredToken = decryptToken(token);
        const decodedToken = jwtDecode(SecuredToken);
        const companyName = decodedToken.companyName;

        const response = await axios.get(
          `${KYC_API}/geteditdata/${companyName}`
        );
        const data = response.data;
        console.log(data);

        // Update each state with a functional update to ensure proper setting
        setKycFormData((prevState) => ({
          ...prevState,
          id:data.id,
          companyname: data.company_name || prevState.companyname,
          doorno: data.door_no || prevState.doorno,
          street: data.street || prevState.street,
          pincode: data.pincode || prevState.pincode,
          area: data.area || prevState.area,
          taluk: data.taluk || prevState.taluk,
          city: data.city || prevState.city,
         
          state: data.state || prevState.state,
          country: data.country || prevState.country, // Missing in the original state update
          Phone1: data.phone1 || prevState.Phone1, // Ensure phone fields are included
          Phone2: data.phone2 || prevState.Phone2,
          email1: data.email1 || prevState.email1,
          email2: data.email2 || prevState.email2,
          Website: data.website || prevState.Website,
          
        }));
setAgentInfo((prevState) => ({
  ...prevState,
 
    agentname:data.agent_name || prevState.agentname,
    agentDoorNo:data.agent_door_no || prevState.agentDoorNo,
    agentStreet: data.agent_street || prevState.agentStreet,
    agentArea: data.agent_area || prevState.agentArea,
    agentCity:data.agent_city || prevState.agentCity,
    agentState: data.agent_state || prevState.agentState,
    agentCountry: data.agent_country || prevState.agentCountry,
    agentPincode: data.agent_pincode || prevState.agentPincode,
    agentPhone: data.agent_phone || prevState.agentPhone,
    agentEmail: data.agent_email || prevState.agentEmail,
    agentGst: data.agent_gst || prevState.agentGst,
    agentRemarks: data.agent_remarks || prevState.agentRemarks,
 
}));
        setAccInfo((prevState) => ({
          ...prevState,
          acholdername:  data.acc_holder_name || prevState.acholdername,
    acnumber:  data.acc_number || prevState.acnumber,
    actype:  data.acc_type || prevState.actype,
    ifsc:  data.ifsc || prevState.ifsc,
    bankname: data.bank_name || prevState.bankname,
    bankbranchname:  data.bank_branch_name || prevState.bankbranchname,
    bankaddress: data.bank_address || prevState.bankaddress,
    acholdername1:  data.acc_holder_name1 || prevState.acholdername1,
    acnumber1:  data.acc_number1 || prevState.acnumber1,
    actype1:  data.acc_type1 || prevState.actype1,
    ifsc1:  data.ifsc1 || prevState.ifsc1,
    bankname1:  data.bank_name1 || prevState.bankname1,
    bankbranchname1:  data.bank_branch_name1 || prevState.bankbranchname1,
    bankaddress1:  data.bank_address1 || prevState.bankaddress1,
        }));
        console.log(contactInfo);
        setContactInfo((prevState) => ({
          ...prevState,
          owner: data.owner || prevState.owner,
          ownername: data.owner_name || prevState.ownername,
          ownermobile: data.owner_mobile || prevState.ownermobile,
          owneremail: data.owner_email || prevState.owneremail,
          businessoperation:
            data.business_operation || prevState.businessoperation,
          boname: data.bo_name || prevState.boname,
          bomobile: data.bo_mobile || prevState.bomobile,
          boemail: data.bo_email || prevState.boemail,
          accounts: data.accounts || prevState.accounts,
          accname: data.acc_name || prevState.accname,
          accmobile: data.acc_mobile || prevState.accmobile,
          accemail: data.acc_email || prevState.accemail,
        }));

        setBusinessDetails((prevState) => ({
          ...prevState,
          supplierType: data.supplier_type || prevState.supplierType,
          organization: data.organization || prevState.organization,

          // Business Details
          propritorname: data.proprietor_name || prevState.propritorname,
          regUnderMsme: data.reg_under_msme || prevState.regUnderMsme,
          msmeType: data.msme_type || prevState.msmeType,
          msmeNo: data.msme_no || prevState.msmeNo,
          gst: data.gst || prevState.gst,
          pan: data.pan || prevState.pan,
          buzzCountry: data.export_country || prevState.buzzCountry,
          region:data.region || prevState.region,
          currency: data.currency || prevState.currency,
          ibanNo:data.iban_no || prevState.ibanNo,
          swiftCode:data.swift_code || prevState.swiftCode,
        }));

        // // In your fetchData function
        console.log(data);
        setFileDatasUrl({
          gstFile: data?.gst_file?.replace(/^"+|"+$/g, ""), // Remove extra quotes if present
          panFile: data?.pan_file?.replace(/^"+|"+$/g, ""),
          msmeFile: data?.msme_file?.replace(/^"+|"+$/g, ""),
          chequeFile1: data?.cheque_file1?.replace(/^"+|"+$/g, ""),
         
          chequeFile2: data?.cheque_file2?.replace(/^"+|"+$/g, ""),
          ownerFile: data?.owner_file?.replace(/^"+|"+$/g, ""),
          boFile:data?.bo_file?.replace(/^"+|"+$/g, ""),
          accountsFile:data?.accounts_file?.replace(/^"+|"+$/g, ""),
        });

        // Helper function to create URL based on file type
      } catch (error) {
        console.error("Error fetching KYC data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(fileDatasUrl);
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    console.log(type, name, value);

    if (name === "gst") {
      console.log(value);

      // Assuming the PAN number is derived from the GST.
      const panNumber = extractPANFromGST(value); // Custom function to extract PAN
      console.log("Extracted PAN:", panNumber);

      // Update the state with the PAN number
      setKycFormData((prevState) => ({
        ...prevState,
        pan: panNumber, // Assuming 'pan' is the key for PAN in your state
        [name]: type === "checkbox" ? checked : value,
      }));
      localStorage.setItem("kycData", JSON.stringify(kycFormData));
    } else {
      setKycFormData((prevState) => ({
        ...prevState,
        [name]:
          type === "checkbox"
            ? checked
            : name === "email"
            ? value: name === "Website"
            ? value
            : capitalizeValue(value, name),
      }));
      // console.log(capitalizeValue("name"))
      localStorage.setItem("kycData", JSON.stringify(kycFormData));
      console.log(kycFormData);
    }

    validateKycForm(kycFormData, filesDatas, fileDatasUrl);
  };

  const extractPANFromGST = (gstValue) => {
    const panPattern = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    const panData = gstValue.match(panPattern);
    return panData ? panData[0] : "";
  };

  const handleFileChange = async (event) => {
    const { name, files } = event.target;

    if (files && files.length > 0) {
      const originalFile = files[0];
      let processedFile = originalFile;

      // Check file type and process accordingly
      if (originalFile.type.includes("image")) {
        // Compress image and convert to JPG
        processedFile = await compressAndConvertToJPG(originalFile, 100); // Target 100 KB
      }

      // Update state
      setFilesDatas((prevState) => ({
        ...prevState,
        [name]: processedFile,
      }));

      setFileSizes((prevSizes) => ({
        ...prevSizes,
        [name]: (processedFile.size / 1024).toFixed(2), // Store size in KB
      }));
    }
  };

  // Function to compress and convert image to JPG
  const compressAndConvertToJPG = async (file, targetSizeKB) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = async () => {
          let quality = 0.8; // Start with a high quality
          let width = img.width;
          let height = img.height;
          let blob;

          do {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Scale canvas dimensions (if needed)
            canvas.width = width;
            canvas.height = height;

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0, width, height);

            // Compress and convert to JPG
            blob = await new Promise((res) =>
              canvas.toBlob((b) => res(b), "image/jpeg", quality)
            );

            // Reduce quality or dimensions iteratively if size is larger
            if (blob.size / 1024 > targetSizeKB) {
              quality -= 0.1; // Reduce quality
              if (quality < 0.2) {
                // If quality gets too low, scale down the dimensions
                width = Math.round(width * 0.9);
                height = Math.round(height * 0.9);
                quality = 0.8; // Reset quality
              }
            }
          } while (blob.size / 1024 > targetSizeKB);

          // Resolve with the final compressed file
          resolve(
            new File([blob], `${file.name.split(".")[0]}.jpg`, {
              type: "image/jpeg",
            })
          );
        };
      };
      reader.onerror = reject;
    });
  };
  const handleInputAgentChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAgentInfo((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : capitalizeValue(value),
    }));
    localStorage.setItem("KycAgent", JSON.stringify(agentInfo));
  };
  const handleAccInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAccInfo((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : capitalizeValue(value),
    }));
    localStorage.setItem("KycAcc", JSON.stringify(accInfo));
  };
  
  const handleExportInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    // Create the updated state first
    const updatedBusinessDetails = {
      ...businessDetails,
      [name]: type === "checkbox" 
        ? checked 
         : capitalizeValue(value),
    };
    //: (name === "pan" ? extractPANFromGST(businessDetails.gst)
    
    // Update state with the new object
    setBusinessDetails(updatedBusinessDetails);
    
    // Save the updated state to localStorage
    localStorage.setItem("KycExpo", JSON.stringify(updatedBusinessDetails));
  };
  const handleContactInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setContactInfo((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : capitalizeValue(value, name),
    }));
    localStorage.setItem("KycContact", JSON.stringify(contactInfo));
  };
  const handleTradeBusinessInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setTradeBusinessInfo((prevState) => {
      if (type === "checkbox") {
        const updatedTradeMetals = checked
          ? [...prevState.tradeMetals, name]
          : prevState.tradeMetals.filter((item) => item !== name);
        return {
          ...prevState,
          tradeMetals: updatedTradeMetals,
        };
      } else {
        return {
          ...prevState,
          [name]: capitalizeValue(value),
        };
      }
    });
    localStorage.setItem("KycTrade", JSON.stringify(tradeBusinessInfo));
  };

  console.log(contactInfo);
  const handleFileDelete = (fileType) => {
    setFilesDatas((prev) => ({ ...prev, [fileType]: null }));
    setFileDatasUrl((prev) => ({ ...prev, [fileType]: null }));
  };
  const handleViewImage = (file, event, editFile) => {
    if (event) {
      event.preventDefault();
    }

    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");

      setTimeout(() => URL.revokeObjectURL(fileURL), 100);
    }
    if (editFile) {
      console.log(editFile);
      const sanitizedUrl = editFile.replace(/^"(.*)"$/, "$1"); // Remove surrounding quotes
      window.open(sanitizedUrl, "_blank");
    }
  };
  const reset = () => {
    setKycFormData({
      id: "",
      supplierCategory: "",
      companyname: "",
      doorno: "",
      street: "",
      pincode: "",
      area: "",
      taluk: "",
      city: "",
      state: "",
      mobilenumber: "",
      email: "",
      propritorname: "",
      organization: "",
      regUnderMsme: "",

      gst: "",
      pan: "",
      msmeNo: "",
    });
    //pdf files
    setFilesDatas({
      gstFile: null,
      panFile: null,
      msmeFile: null,
      chequeFile: null,
      ownerFile: null,
      boFile: null,
      accountsFile: null,
    });
    setFileDatasUrl({
      gstFile: "",
      panFile: "",
      msmeFile: "",
      chequeFile: "",
      ownerFile: "",
      boFile: "",
      accountsFile: "",
    });

    setAccInfo({
      acholdername: "",
      acnumber: "",
      actype: "",
      ifsc: "",
      bankname: "",
      bankbranchname: "",
      bankaddress: "",
    });
    setContactInfo({
      owner: "",
      ownername: "",
      ownermobile: "",
      owneremail: "",
      businessoperation: "",
      boname: "",
      bomobile: "",
      boemail: "",
      accounts: "",
      accname: "",
      accmobile: "",
      accemail: "",
    });
setBusinessDetails({
  supplierType: "",
    organization: "",

    // Business Details fields
    propritorname: "",
    regUnderMsme: "",
    msmeType: "",
    msmeNo: "",
    gst: "",
    pan: "",
    buzzCountry: "",
    region: "",
    currency: "",
    ibanNo: "",
    swiftCode: "",
})
    setErrors({});
    setErrorMessage("");
    setSuccessMsg("");
    setFileSizes({});
  };
 
  // files
  
  console.log(fileDatasUrl.gstFile);

  
 
 
  
  
  const handleSubmit = async () => {
    const isValid = validateKycForm(kycFormData, filesDatas, fileDatasUrl);
    if (!isValid) {
      return { errorMessage: "Validation failed" }; 
    }

    const formData = new FormData();

    formData.append("SupplierName", user);
    for (const key in kycFormData) {
      formData.append(key, kycFormData[key]);
    }
    for (const key in agentInfo) {
      formData.append(key, agentInfo[key]);
    }
    for (const key in businessDetails) {
      formData.append(key, businessDetails[key]);
    }
    // Append account info
    for (const key in accInfo) {
      formData.append(key, accInfo[key]);
    }

    // Append contact info
    for (const key in contactInfo) {
      formData.append(key, contactInfo[key]);
    }
    console.log("..................", userRole);

    // for (const key in tradeBusinessInfo) {
    //   if (Array.isArray(tradeBusinessInfo[key])) {
    //     // Append arrays as JSON strings
    //     formData.append(key, JSON.stringify(tradeBusinessInfo[key]));
    //   } else {
    //     formData.append(key, tradeBusinessInfo[key]);
    //   }
    // }

   const filesToSubmit = {
      gstFile: filesDatas.gstFile || fileDatasUrl.gstFile,
      panFile: filesDatas.panFile || fileDatasUrl.panFile,
      msmeFile: filesDatas.msmeFile || fileDatasUrl.msmeFile,
      chequeFile1: filesDatas.chequeFile1 || fileDatasUrl.chequeFile1,
      chequeFile2: filesDatas.chequeFile2 || fileDatasUrl.chequeFile2,
      ownerFile: filesDatas.ownerFile || fileDatasUrl.ownerFile,
      boFile: filesDatas.boFile || fileDatasUrl.boFile,
      accountsFile: filesDatas.accountsFile || fileDatasUrl.accountsFile,
   };

    for (const key in filesToSubmit) {
      if (filesToSubmit[key]) formData.append(key, filesToSubmit[key]);
    }

    try {
      // Send the FormData object to your backend using axios
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      console.log(Object.entries(errors));
      // if(Object.entries(errors)===0){

      // }
      const response = await axios.post(
        `${KYC_API}/kycpost/mill`,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        // Set success message
        setSuccessMsg("Data Saved Successfully");
        setErrorMessage("");
      
        localStorage.removeItem("kycData");
        localStorage.removeItem("KycAgent");
        localStorage.removeItem("KycAcc");
        localStorage.removeItem("KycContact");
        localStorage.removeItem("KycExpo");
        localStorage.removeItem("KycTrade");
  

        reset();
        return response.data;
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error);
      setErrorMessage(error.response.data.message);
      setSuccessMsg("");
      return error.response.data;
    }
  };
  console.log(errors);

  return (
    <KycContext.Provider
      value={{
        kycFormData,
        setKycFormData,
        handleInputChange,
        accInfo,
        setAccInfo,
        handleAccInputChange,
        handleContactInputChange,
        contactInfo,
        setContactInfo,
        handleTradeBusinessInputChange,
        filesDatas,
        setFilesDatas,
        KYC_API,
        handleSubmit,
        handleFileChange,
        user,
        userRole,
       
        errors,
        setErrors,
        validateKycForm,
        validateAgentInfo,
        validateBusinessDetails,
        validateAccountInfo,
        validateContactInfo,
        errorMessage,
        successMsg,
        userData,
        handleFileDelete,
        companyName,
        handleViewImage,
        extractPANFromGST,
        fileSizes,
        fileDatasUrl,
        getFileName,

        agentInfo,
        setAgentInfo,
        natureOfBusiness,
        setNatureOfBusiness,
        businessDetails,
        setBusinessDetails,
        handleExportInputChange,
        handleInputAgentChange
      }}
    >
      {children}
    </KycContext.Provider>
  );
};

export { KycDataProvider, KycContext };
