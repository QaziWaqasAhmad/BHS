import Api from "../index";
import { endPoints, requestType } from "../../constants/Variables";


// Profile apis
export const getUser = (id) => {
    return Api(`${endPoints.getUser}/${id}`, null, requestType.GET)
}

export const updateUser = (id, params) => {
    return Api(`${endPoints.updateUser}/${id}`, params, requestType.PUT)
}

export const changePasswordUser = (params) => {
    return Api(`${endPoints.changePasswordUser}`, params, requestType.POST)
}


// Resume apis
export const createResume = (params) => {
    return Api(`${endPoints.createResume}`, params, requestType.POST)
}

export const updateResume = (id, params) => {
    return Api(`${endPoints.updateResume}/${id}`, params, requestType.PUT)
}

export const getResume = (id) => {
    return Api(`${endPoints.getResume}/${id}`, null, requestType.GET)
}

export const getProfileScore = (params) => {
    return Api(`${endPoints.getResumeScore}`, params, requestType.POST)
}

export const sendSupportMail = (params) => {
    return Api(`${endPoints.sendSupportMail}`, params, requestType.POST)
}


//Cover Letter

export const createCoverLetter = (params) => {
    return Api(`${endPoints.createCoverLetter}`, params, requestType.POST)
}

export const updateCoverLetter = (id, params) => {
    return Api(`${endPoints.updateCoverLetter}/${id}`, params, requestType.PUT)
}

export const getCoverLetter = (id) => {
    return Api(`${endPoints.getCoverLetter}/${id}`, null, requestType.GET)
}

export const getCoverLetterById = (id) => {
    return Api(`${endPoints.getCoverLetterById}/${id}`, null, requestType.GET)
}
