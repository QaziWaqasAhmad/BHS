import Api from "../index";
import { endPoints, requestType } from "../../constants/Variables";

export const buyPlan = (params) => {
    return Api(`${endPoints.buySubscriptionPlan}`, params, requestType.POST)
}