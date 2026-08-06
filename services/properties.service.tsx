import {requestFetch} from "@/services/request.service";
import {PropertyDetail} from "@/types/Property";

/**
 * Fetch all properties from the server
 */
export async function getProperties() {
    return await requestFetch(`/api/properties`, "GET")
}

/**
 * Fetch a property by its ID
 * @param propertyId
 */
export async function getProperty(propertyId: string) {
    return await requestFetch(`/api/properties/${propertyId}`, "GET")
}

/**
 * Send a request with property infos to create a new one to the server
 * @param property
 */
export async function createProperty(property: PropertyDetail) {

    return requestFetch("/api/properties", "POST", property);
}

/**
 * Send a request to get the favorites of a user using his id
 * @param userId
 */
export async function getFavorites(userId: number) {

    return await requestFetch(`/api/properties/${userId}/favorites`, "GET")

}

/**
 * Ask the server to add a favorite to the user
 * @param propertyId
 */
export async function addFavorite(propertyId: string) {

    return await requestFetch(`/api/properties/${propertyId}/favorite`, "POST")

}

/**
 * Remove a favorite to the user
 * @param propertyId
 */
export async function removeFavorite(propertyId: string) {

    return await requestFetch(`/api/properties/${propertyId}/favorite`, "DELETE")

}