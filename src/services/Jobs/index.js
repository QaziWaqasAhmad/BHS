import Api from "../index";
import { endPoints, requestType } from "../../constants/Variables";

//Jobs apis

export const getJobs = (jobTitle, city, experience, jobDescripion) => {
    return Api(`${endPoints.getAllJobs}?jobTitle=${jobTitle}&city=${city}&experience=${experience}&category=${jobDescripion}`, null, requestType.GET)
}

export const addFavouriteJob = (params) => {
    return Api(`${endPoints.addFavourite}`, params, requestType.POST)
}

export const removeFavouriteJob = (params) => {
    return Api(`${endPoints.removeFavourite}`, params, requestType.DELETE)
}

export const getFavouriteJobsById = (id) => {
    return Api(`${endPoints.getFavouriteById}/${id}`, null, requestType.GET)
}

export const applyJob = (params) => {
    return Api(`${endPoints.applyJob}`, params, requestType.POST)
}

export const getAppliedJobsById = (params) => {
    return Api(`${endPoints.getAppliedJobs}`, params, requestType.POST)
}
export const getJobsByCompanyId = (id) => {
    return Api(`${endPoints.getJobsByCompanyId}/${id}`, null, requestType.GET)
}
export const getTotalPostedJob = (id) => {
    return Api(`${endPoints.getTotalPostedJob}/${id}`, null, requestType.GET)
}

export const getJobByType = (type) => {
    return Api(`${endPoints.getJobByType}?jobType=${type}`, null, requestType.GET)
}