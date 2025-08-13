export type TAPIError = {
    message: string;
    error_type?: TErrorTypes;
}

type TErrorTypes = "invalidLogin"
