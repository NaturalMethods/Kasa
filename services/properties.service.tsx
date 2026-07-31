import {requestFetch} from "@/services/request.service";
import {PropertyDetail} from "@/types/Property";


export async function getProperties() {

    return await requestFetch(`/api/properties`, "GET")

}

export async function getProperty(propertyId:string) {

    return await requestFetch(`/api/properties/${propertyId}`, "GET")

}

export async function createProperty(property: PropertyDetail) {

    return requestFetch("/api/properties", "POST", property);
}

export async function getFavorites(userId:number) {

    return await requestFetch(`/api/properties/${userId}/favorites`, "GET")

}

export async function addFavorite(propertyId:string) {

    return await requestFetch(`/api/properties/${propertyId}/favorite`, "POST")

}

export async function removeFavorite(propertyId:string) {

    return await requestFetch(`/api/properties/${propertyId}/favorite`, "DELETE")

}