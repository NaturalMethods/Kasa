import {requestFetch} from "@/services/request.service";


export async function getProperties() {

    return await requestFetch(`/API/properties`, "GET")

}

export async function getProperty(propertyId:string) {

    return await requestFetch(`/API/properties/${propertyId}`, "GET")

}