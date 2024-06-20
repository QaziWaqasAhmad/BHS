export const requestType = {
    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete",
};

export const endPoints = {
    sendCode: "sendCode",
    registerUser: "registerUser",
    loginUser: "loginUser",
    resetPassword: "resetPasswordUser",

    //User
    getUser: "getUser",
    updateUser: "updateUserProfile",
    changePasswordUser: "changePasswordUser",
    createResume: "createResume",
    updateResume: "updateResume",
    getResume: "getResumeById",
    getResumeScore: "profileCompletion",
    getResumeById: "getResume",
    sendSupportMail: "sendSupportEmail",
    getJobsByCompanyId:"getJobsByCompanyId",
    getTotalPostedJob:"getTotalPostedJob",
    //organization
    updateOrginizationProfile: "updateOrginizationProfile",
    changePasswordOrginization: "changePasswordOrginization",
    buySubscriptionPlan: "buySubscriptionPlan",

    ///job
    createJob: "createJob",
    getJobsById: "getJobsById",
    deleteJob: "deleteJob",
    updateJob: "updateJob",
    getAllJobs: "getAllJobs",
    addFavourite: "addFavourite",
    removeFavourite: "removeFavourite",
    getFavouriteById: "getFavourite",
    applyJob: "applyJobs",
    getAppliedJobs: "getAppliedJobs",
    updateJob: "updateJob",
    getJobByType: "getJobByType",


    getAllUsers: "getAllUsers",
    getAllOrganizations: "getAllOrginization",

    //Resume
    createCoverLetter:"createCoverLetter",
    getCoverLetterById:"getCoverLetterById",
    getCoverLetter:"getCoverLetter",
    getAllCoverLetterByCategory:"getAllCoverLetterByCategory",
    updateCoverLetter:"updateCoverLetter",
    deleteCoverLetter:"deleteCoverLetter",
};
