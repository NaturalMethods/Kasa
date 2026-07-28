import {User} from "@/types/User";

export interface PropertyBase{
    id: string;
    slug?: string;
    title: string;
    description?: string;
    cover?: string;
    location?: string;
    price_per_night: number
    rating_avg?: number;
    ratings_count?: number;
    host?: User

}
export interface PropertyDetail extends PropertyBase {
    pictures: string[];
    equipments: string[];
    tags: string[];
}