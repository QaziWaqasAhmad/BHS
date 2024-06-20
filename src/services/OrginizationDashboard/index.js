import Api from "../index";
import { endPoints, requestType } from "../../constants/Variables";

///Orginization Profile
export const updateOrginizationProfile = (id, params) => {
    return Api(`${endPoints.updateOrginizationProfile}/${id}`, params, requestType.PUT)
}
export const changePasswordOrginization = (params) => {
    return Api(`${endPoints.changePasswordOrginization}`, params, requestType.POST)
}
//Jobs 
export const createJob = (params) => {
    return Api(`${endPoints.createJob}`, params, requestType.POST)
}
export const getJobsById = (id) => {
    return Api(`${endPoints.getJobsById}/${id}`, null, requestType.GET)
}
export const deleteJob = (id) => {
    return Api(`${endPoints.deleteJob}/${id}`, null, requestType.DELETE)
}

export const updateJob = (id, params) => {
    return Api(`${endPoints.updateJob}/${id}`, params, requestType.PUT)
}

export const getResume = (id) => {
    return Api(`${endPoints.getResumeById}/${id}`, null, requestType.GET)
}