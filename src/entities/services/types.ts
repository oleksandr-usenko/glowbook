export type TService = {
    id: number;
    user_id: number;
    name: string;
    duration: number | null;
    price: number | null;
    currency: "USD" | "EUR" | "UAH";
    timestamp: string;
    description?: string;
    media?: TMediaItem[];
};

export type TMediaItem = {
    uri: string;
    mimeType: string;
    type?: string;
    public_id: string;
    fileName: string;
    order?: number;
}

export type TUpdateServicePayload = Pick<TService,
    | "name"
    | "description"
    | "duration"
    | "price"
    | "currency"
>

export const CURRENCIES_LIST: TCurrency[] = [
    {
        icon: "currency-usd",
        value: "USD",
    },
    {
        icon: "currency-eur",
        value: "EUR",
    },
    {
        icon: "currency-uah",
        value: "UAH",
    }
]

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
