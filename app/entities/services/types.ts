export type TService = {
    id: number;
    user_id: number;
    name: string;
    duration: number;
    price: number;
    description?: string;
    media_urls?: string[];
};
