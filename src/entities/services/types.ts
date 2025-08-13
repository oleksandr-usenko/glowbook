export type TService = {
    id: number;
    user_id: number;
    name: string;
    duration: number;
    price: number;
    description?: string;
    media_urls?: string[];
};

export type TCurrency =
    | {
    icon: "currency-usd",
    value: "USD",
}
    | {
    icon: "currency-eur",
    value: "EUR",
}
    | {
    icon: "currency-uah",
    value: "UAH",
}
