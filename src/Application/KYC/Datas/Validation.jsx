const validateKycForm = (kycFormData, filesDatas, fileDatasUrl) => {
    let tempErrors = {};
    
    // Company Name
    if (!kycFormData.companyname.trim()) {
        tempErrors.companyname = "Company Name is required.";
    }
    
    // Door No
    if (!kycFormData.doorno.trim()) {
        tempErrors.doorno = "Door No is required.";
    } else if (!/^[a-zA-Z0-9\s\.\,\-\/]+$/.test(kycFormData.doorno)) {
        tempErrors.doorno = "Invalid Door No format";
    }
    
    // Street
    if (!kycFormData.street.trim()) {
        tempErrors.street = "Street is required.";
    } else if (!/^[a-zA-Z0-9\s,.-]+$/.test(kycFormData.street)) {
        tempErrors.street = "Invalid Street Format";
    }
    
    // Pin Code
    if (!kycFormData.pincode.trim()) {
        tempErrors.pincode = "Pin Code is required.";
    } else if (!/^\d{6}$/.test(kycFormData.pincode)) {
        tempErrors.pincode = "Pin Code must be 6 digits.";
    }
    
    // Area
    if (!kycFormData.area.trim()) {
        tempErrors.area = "Area is required.";
    }
    
    // Taluk
    if (!kycFormData.taluk.trim()) {
        tempErrors.taluk = "Taluk is required.";
    }
    
    // City
    if (!kycFormData.city.trim()) {
        tempErrors.city = "City is required.";
    }
    
    // State
    if (!kycFormData?.state?.trim()) {
        tempErrors.state = "State is required.";
    }
    
    // Country
    if (!kycFormData?.country?.trim()) {
        tempErrors.country = "Country is required.";
    }
    
    // Phone Numbers
    if (!kycFormData.Phone1.trim()) {
        tempErrors.Phone1 = "Primary Phone Number is required.";
    } else if (!/^\d{10}$/.test(kycFormData.Phone1)) {
        tempErrors.Phone1 = "Phone Number must be 10 digits.";
    }
    
    if (kycFormData.Phone2.trim() && !/^\d{10}$/.test(kycFormData.Phone2)) {
        tempErrors.Phone2 = "Phone Number must be 10 digits.";
    }
    
    // Email
    if (!kycFormData.email1.trim()) {
        tempErrors.email1 = "Primary Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(kycFormData.email1)) {
        tempErrors.email1 = "Email is invalid.";
    } else if (/\.{2,}/.test(kycFormData.email1)) {
        tempErrors.email1 = "Email should not contain consecutive dots.";
    }
    
    if (kycFormData.email2.trim() && !/\S+@\S+\.\S+/.test(kycFormData.email2)) {
        tempErrors.email2 = "Secondary Email is invalid.";
    } else if (kycFormData.email2.trim() && /\.{2,}/.test(kycFormData.email2)) {
        tempErrors.email2 = "Secondary Email should not contain consecutive dots.";
    }
    
    // Website - Optional but validate format if provided
    if (kycFormData.Website.trim() && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+.*$/.test(kycFormData.Website)) {
        tempErrors.Website = "Website URL is invalid.";
    }
    
    // Supplier Type
   
    return tempErrors;
};

const validateAgentInfo = (agentInfo) => {
    let tempErrors = {};
    
    // Agent Name
    if (!agentInfo.agentname.trim()) {
        tempErrors.agentname = "Agent Name is required.";
    }
    
    // Agent Door No
    if (!agentInfo.agentDoorNo.trim()) {
        tempErrors.agentDoorNo = "Door No is required.";
    } else if (!/^[a-zA-Z0-9\s\.\,\-\/]+$/.test(agentInfo.agentDoorNo)) {
        tempErrors.agentDoorNo = "Invalid Door No format";
    }
    
    // Agent Street
    if (!agentInfo.agentStreet.trim()) {
        tempErrors.agentStreet = "Street is required.";
    } else if (!/^[a-zA-Z0-9\s,.-]+$/.test(agentInfo.agentStreet)) {
        tempErrors.agentStreet = "Invalid Street Format";
    }
    
    // Agent Area
    if (!agentInfo.agentArea.trim()) {
        tempErrors.agentArea = "Area is required.";
    }
    
    // Agent City
    if (!agentInfo.agentCity.trim()) {
        tempErrors.agentCity = "City is required.";
    }
    
    // Agent State
    if (!agentInfo.agentState.trim()) {
        tempErrors.agentState = "State is required.";
    }
    
    // Agent Country
    if (!agentInfo.agentCountry.trim()) {
        tempErrors.agentCountry = "Country is required.";
    }
    
    // Agent Pincode
    if (!agentInfo.agentPincode.trim()) {
        tempErrors.agentPincode = "Pin Code is required.";
    } else if (!/^\d{6}$/.test(agentInfo.agentPincode)) {
        tempErrors.agentPincode = "Pin Code must be 6 digits.";
    }
    
    // Agent Phone
    if (!agentInfo.agentPhone.trim()) {
        tempErrors.agentPhone = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(agentInfo.agentPhone)) {
        tempErrors.agentPhone = "Phone Number must be 10 digits.";
    }
    
    // Agent Email
    if (!agentInfo.agentEmail.trim()) {
        tempErrors.agentEmail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(agentInfo.agentEmail)) {
        tempErrors.agentEmail = "Email is invalid.";
    } else if (/\.{2,}/.test(agentInfo.agentEmail)) {
        tempErrors.agentEmail = "Email should not contain consecutive dots.";
    }
    
    // Agent GST (optional)
    if (!agentInfo.agentGst.trim()) {
        tempErrors.agentGst = "GST Number is required.";
    } 
    else if (agentInfo.agentGst.trim() && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(agentInfo.agentGst)) {
        tempErrors.agentGst = "GST Number is invalid.";
    }
    
    return tempErrors;
};

const validateBusinessDetails = (businessDetails, filesDatas, fileDatasUrl) => {
    let tempErrors = {};
    
    // Basic field validation
    if (!businessDetails.supplierType) {
      tempErrors.supplierType = "Supplier Type is required.";
    }
    
    // Organization
    if (!businessDetails.organization) {
      tempErrors.organization = "Organization is required.";
    }
    
    // Proprietor Name
    if (!businessDetails.propritorname?.trim()) {
      tempErrors.propritorname = "Proprietor Name is required.";
    }
    
    // MSME Registration
    if (!businessDetails.regUnderMsme) {
      tempErrors.regUnderMsme = "MSME Registration status is required.";
    }
    
    // MSME fields validation (only if registered as Yes)
    if (businessDetails.regUnderMsme === "Yes") {
      // MSME Type
      if (!businessDetails.msmeType) {
        tempErrors.msmeType = "MSME Type is required.";
      }
      
      // MSME Number
      if (!businessDetails.msmeNo?.trim()) {
        tempErrors.msmeNo = "MSME Number is required.";
      }
      
      // MSME File
      if (!filesDatas.msmeFile && !fileDatasUrl.msmeFile) {
        tempErrors.msmeFile = "MSME File is required.";
      } else if (
        filesDatas.msmeFile &&
        filesDatas.msmeFile.size > 100 * 1024
      ) {
        tempErrors.msmeFile = "MSME File size must be below 100 KB.";
      }
    }
    
    // GST validation
    if (!businessDetails.gst?.trim()) {
      tempErrors.gst = "GST Number is required.";
    } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(businessDetails.gst)) {
      tempErrors.gst = "GST Number is invalid.";
    }
    
    // PAN validation
    if (!businessDetails.pan?.trim()) {
      tempErrors.pan = "PAN is required.";
    } else if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(businessDetails.pan)) {
      tempErrors.pan = "PAN is invalid.";
    }
    
    // File validations
    if (!filesDatas.gstFile && !fileDatasUrl.gstFile) {
      tempErrors.gstFile = "GST File is required.";
    } else if (
      filesDatas.gstFile &&
      filesDatas.gstFile.size > 100 * 1024
    ) {
      tempErrors.gstFile = "GST File size must be below 100 KB.";
    }
    
    if (!filesDatas.panFile && !fileDatasUrl.panFile) {
      tempErrors.panFile = "PAN File is required.";
    } else if (
      filesDatas.panFile &&
      filesDatas.panFile.size > 100 * 1024
    ) {
      tempErrors.panFile = "PAN File size must be below 100 KB.";
    }
    
    // Export-specific validations (only when supplierType is "Export")
    if (businessDetails.supplierType === "Export") {
      // Country
      if (!businessDetails.buzzCountry?.trim()) {
        tempErrors.buzzCountry = "Country is required.";
      }
      
      // Region
      if (!businessDetails.region?.trim()) {
        tempErrors.region = "Region is required.";
      }
      
      // Currency
      if (!businessDetails.currency?.trim()) {
        tempErrors.currency = "Currency is required.";
      }
      
      // IBAN Number
      if (!businessDetails.ibanNo?.trim()) {
        tempErrors.ibanNo = "IBAN Number is required.";
      } else if (!/^[A-Z0-9]+$/.test(businessDetails.ibanNo)) {
        tempErrors.ibanNo = "IBAN Number can only contain letters and numbers.";
      }
      
      // Swift Code
      if (!businessDetails.swiftCode?.trim()) {
        tempErrors.swiftCode = "Swift Code is required.";
      } else if (!/^[A-Z0-9]+$/.test(businessDetails.swiftCode)) {
        tempErrors.swiftCode = "Swift Code can only contain letters and numbers.";
      }
    }
    
    return tempErrors;
  };

const validateNatureOfBusiness = (natureOfBusiness) => {
    let tempErrors = {};
    
    // Supplier Type
    if (!natureOfBusiness.supplierType) {
        tempErrors.supplierType = "Supplier Type is required.";
    }
    
    // Organization
    if (!natureOfBusiness.organization) {
        tempErrors.organization = "Organization is required.";
    }
    
    // MSME Registration
    if (!natureOfBusiness.regUnderMsme) {
        tempErrors.regUnderMsme = "MSME Registration status is required.";
    }
    
    // MSME Type (if registered)
    if (natureOfBusiness.regUnderMsme === "Yes" && !natureOfBusiness.msmeType) {
        tempErrors.msmeType = "MSME Type is required.";
    }
    
    // MSME Number (if registered)
    if (natureOfBusiness.regUnderMsme === "Yes" && !natureOfBusiness.msmeNo.trim()) {
        tempErrors.msmeNo = "MSME Number is required.";
    }
    
    // GST
    if (!natureOfBusiness.gst.trim()) {
        tempErrors.gst = "GST Number is required.";
    } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(natureOfBusiness.gst)) {
        tempErrors.gst = "GST Number is invalid.";
    }
    
    // PAN
    if (!natureOfBusiness.pan.trim()) {
        tempErrors.pan = "PAN is required.";
    } else if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(natureOfBusiness.pan)) {
        tempErrors.pan = "PAN is invalid.";
    }
    
    return tempErrors;
};

const validateAccountInfo = (accInfo, filesDatas, fileDatasUrl) => {
    let tempErrors = {};
    
    // A/C holder Name
    if (!accInfo.acholdername.trim()) {
        tempErrors.acholdername = "A/C holder Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(accInfo.acholdername)) {
        tempErrors.acholdername = "A/c holder name can only contain alphabets.";
    } else if (accInfo.acholdername.length < 3) {
        tempErrors.acholdername = "A/c holder name must be at least 3 characters.";
    }
    
    // A/c No
    if (!accInfo.acnumber.trim()) {
        tempErrors.acnumber = "A/c No is required.";
    } else if (!/^[a-zA-Z0-9\s&'-]+$/.test(accInfo.acnumber)) {
        tempErrors.acnumber = "A/c No cannot contain special characters.";
    }
    
    // A/c type
    if (!accInfo.actype.trim()) {
        tempErrors.actype = "A/c type is required.";
    }
    
    // IFSC
    if (!accInfo.ifsc.trim()) {
        tempErrors.ifsc = "IFSC is required.";
    } else if (!/^[a-zA-Z0-9\s&'-]+$/.test(accInfo.ifsc)) {
        tempErrors.ifsc = "IFSC cannot contain special characters.";
    }
    
    // Bank name
    if (!accInfo.bankname.trim()) {
        tempErrors.bankname = "Bank name is required.";
    } else if (!/^[a-zA-Z0-9\s&'-]+$/.test(accInfo.bankname)) {
        tempErrors.bankname = "Bank name cannot contain special characters.";
    }
    
    // Bank Branch
    if (!accInfo.bankbranchname.trim()) {
        tempErrors.bankbranchname = "Bank Branch is required.";
    }
    
    // Bank Address
    if (!accInfo.bankaddress.trim()) {
        tempErrors.bankaddress = "Bank Address is required.";
    }
    if (!accInfo.acholdername1.trim()) {
        tempErrors.acholdername1 = "A/C holder Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(accInfo.acholdername1)) {
        tempErrors.acholdername1 = "A/c holder name can only contain alphabets.";
    } else if (accInfo.acholdername1.length < 3) {
        tempErrors.acholdername1 = "A/c holder name must be at least 3 characters.";
    }
    
    // A/c No
    if (!accInfo.acnumber1.trim()) {
        tempErrors.acnumber1 = "A/c No is required.";
    } else if (!/^[a-zA-Z0-9\s&'-]+$/.test(accInfo.acnumber1)) {
        tempErrors.acnumber1 = "A/c No cannot contain special characters.";
    }
    
    // A/c type
    if (!accInfo.actype1.trim()) {
        tempErrors.actype1 = "A/c type is required.";
    }
    
    // IFSC
    if (!accInfo.ifsc1.trim()) {
        tempErrors.ifsc1 = "IFSC is required.";
    } else if (!/^[a-zA-Z0-9\s&'-]+$/.test(accInfo.ifsc1)) {
        tempErrors.ifsc1 = "IFSC cannot contain special characters.";
    }
    
    // Bank name
    if (!accInfo.bankname1.trim()) {
        tempErrors.bankname1 = "Bank name is required.";
    } else if (!/^[a-zA-Z0-9\s&'-]+$/.test(accInfo.bankname1)) {
        tempErrors.bankname = "Bank name cannot contain special characters.";
    }
    
    // Bank Branch
    if (!accInfo.bankbranchname1.trim()) {
        tempErrors.bankbranchname1 = "Bank Branch is required.";
    }
    
    // Bank Address
    if (!accInfo.bankaddress1.trim()) {
        tempErrors.bankaddress1 = "Bank Address is required.";
    }
    
    // Cheque Files
    if (!filesDatas.chequeFile1 && !fileDatasUrl.chequeFile1) {
        tempErrors.chequeFile1 = "Cancelled Cheque is required.";
    } else if (
        filesDatas.chequeFile1 && 
        filesDatas.chequeFile1.type === 'application/pdf' &&
        filesDatas.chequeFile1.size > 100 * 1024
    ) {
        tempErrors.chequeFile1 = "Cancelled cheque size must be below 100 KB.";
    }
    
    if (filesDatas.chequeFile2 && 
        filesDatas.chequeFile2.type === 'application/pdf' &&
        filesDatas.chequeFile2.size > 100 * 1024
    ) {
        tempErrors.chequeFile2 = "Second cheque file size must be below 100 KB.";
    }
    
    return tempErrors;
};

const validateContactInfo = (contactInfo, filesDatas, fileDatasUrl) => {
    let tempErrors = {};
    
    // Owner details
    if (!contactInfo.owner.trim()) {
        tempErrors.owner = "Owner details is required.";
    }
    
    // Owner name
    if (!contactInfo.ownername.trim()) {
        tempErrors.ownername = "Owner name is required.";
    } else if (!/^[a-zA-Z\s.]+$/.test(contactInfo.ownername)) {
        tempErrors.ownername = "Owner name can only contain letters, spaces, and periods.";
    }
    
    // Owner mobile
    if (!contactInfo.ownermobile.trim()) {
        tempErrors.ownermobile = "Owner mobile is required.";
    } else if (!/^\d{10}$/.test(contactInfo.ownermobile)) {
        tempErrors.ownermobile = "Mobile Number must be 10 digits.";
    }
    
    // Owner email
    if (!contactInfo.owneremail.trim()) {
        tempErrors.owneremail = "Owner email is required.";
    } else if (!/\S+@\S+\.\S+/.test(contactInfo.owneremail)) {
        tempErrors.owneremail = "Email is invalid.";
    } else if (/\.{2,}/.test(contactInfo.owneremail)) {
        tempErrors.owneremail = "Email should not contain consecutive dots.";
    }
    
    // Business Operation
    if (!contactInfo.businessoperation.trim()) {
        tempErrors.businessoperation = "Business Operation details is required.";
    }
    
    // BO name
    if (!contactInfo.boname.trim()) {
        tempErrors.boname = "BO name is required.";
    } else if (!/^[a-zA-Z\s.]+$/.test(contactInfo.boname)) {
        tempErrors.boname = "BO name can only contain letters, spaces, and periods.";
    }
    
    // BO mobile
    if (!contactInfo.bomobile.trim()) {
        tempErrors.bomobile = "BO mobile is required.";
    } else if (!/^\d{10}$/.test(contactInfo.bomobile)) {
        tempErrors.bomobile = "Mobile Number must be 10 digits.";
    }
    
    // BO email
    if (!contactInfo.boemail.trim()) {
        tempErrors.boemail = "BO email is required.";
    } else if (!/\S+@\S+\.\S+/.test(contactInfo.boemail)) {
        tempErrors.boemail = "Email is invalid.";
    } else if (/\.{2,}/.test(contactInfo.boemail)) {
        tempErrors.boemail = "Email should not contain consecutive dots.";
    }
    
    // Accounts
    if (!contactInfo.accounts.trim()) {
        tempErrors.accounts = "Accounts details is required.";
    } else if (!/^[a-zA-Z\s.]+$/.test(contactInfo.accounts)) {
        tempErrors.accounts = "Accounts should only contain letters, spaces, and periods.";
    }
    
    // Accounts name
    if (!contactInfo.accname.trim()) {
        tempErrors.accname = "Accounts name is required.";
    } else if (!/^[a-zA-Z\s.]+$/.test(contactInfo.accname)) {
        tempErrors.accname = "Accounts name should only contain letters, spaces, and periods.";
    }
    
    // Accounts mobile
    if (!contactInfo.accmobile.trim()) {
        tempErrors.accmobile = "Accounts mobile is required.";
    } else if (!/^\d{10}$/.test(contactInfo.accmobile)) {
        tempErrors.accmobile = "Mobile Number must be 10 digits.";
    }
    
    // Accounts email
    if (!contactInfo.accemail.trim()) {
        tempErrors.accemail = "Accounts email is required.";
    } else if (!/\S+@\S+\.\S+/.test(contactInfo.accemail)) {
        tempErrors.accemail = "Email is invalid.";
    } else if (/\.{2,}/.test(contactInfo.accemail)) {
        tempErrors.accemail = "Email should not contain consecutive dots.";
    }
    
    // Files
    // if (!filesDatas.ownerFile && !fileDatasUrl.ownerFile) {
    //     tempErrors.ownerFile = "Owner's Cards file is required.";
    // } else if (
    //     filesDatas.ownerFile && 
    //     filesDatas.ownerFile.type === 'application/pdf' &&
    //     filesDatas.ownerFile.size > 100 * 1024
    // ) {
    //     tempErrors.ownerFile = "Owner's Cards file size must be below 100 KB.";
    // }
    
    // if (!filesDatas.boFile && !fileDatasUrl.boFile) {
    //     tempErrors.boFile = "Business Operation Cards file is required.";
    // } else if (
    //     filesDatas.boFile && 
    //     filesDatas.boFile.type === 'application/pdf' &&
    //     filesDatas.boFile.size > 100 * 1024
    // ) {
    //     tempErrors.boFile = "Business Operation Cards file size must be below 100 KB.";
    // }
    
    // if (!filesDatas.accountsFile && !fileDatasUrl.accountsFile) {
    //     tempErrors.accountsFile = "Accounts card file is required.";
    // } else if (
    //     filesDatas.accountsFile && 
    //     filesDatas.accountsFile.type === 'application/pdf' &&
    //     filesDatas.accountsFile.size > 100 * 1024
    // ) {
    //     tempErrors.accountsFile = "Accounts card file size must be below 100 KB.";
    // }
    
    return tempErrors;
};

export {
    validateKycForm,
    validateAgentInfo,
    validateBusinessDetails,
    validateNatureOfBusiness,
    validateAccountInfo,
    validateContactInfo
};