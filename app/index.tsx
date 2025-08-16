import "./global.css";
import {DefaultTheme, PaperProvider} from "react-native-paper";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {setAuthHeader} from "@/src/interceptors/refresh.interceptor";
import {useEffect} from "react";
import AppNavigator from "@/app/navigation/Navigation";
import {AuthProvider} from "@/src/context/AuthContext";
import {getToken} from "@/src/utils/authStorage";
import {ErrorToastProvider, useErrorToast} from "@/src/context/ErrorContext";

let showErrorGlobal: (err: any) => void;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            onError: (error: any) => {
                // Pass generic errors to toast
                showErrorGlobal(error);
            },
        },
        mutations: {
            onError: (error: any) => {
                showErrorGlobal(error);
            },
        },
    },
});

export const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,

        // PRIMARY
        primary: '#D88F6F',
        onPrimary: '#FFFFFF',
        primaryContainer: '#F3C8B3',
        onPrimaryContainer: '#5D2C1E',

        // SECONDARY
        secondary: '#E6BCA6',
        onSecondary: '#402C22',
        secondaryContainer: '#FCEAE0',
        onSecondaryContainer: '#5A382C',

        // TERTIARY (optional accent, can be used for highlights or buttons)
        tertiary: '#A3685A',
        onTertiary: '#FFFFFF',
        tertiaryContainer: '#F2DDD7',
        onTertiaryContainer: '#4B2D27',

        // BACKGROUND & SURFACE
        background: '#FFF6F1',
        onBackground: '#40342D',
        surface: '#FFFFFF',
        onSurface: '#40342D',

        // SURFACE VARIANT (used for cards, etc.)
        surfaceVariant: '#F2E3DC',
        onSurfaceVariant: '#675F58',

        // OUTLINE
        outline: '#E7D7CD',

        // ERROR
        error: '#DE6B6B',
        onError: '#FFFFFF',
        errorContainer: '#F9DEDC',
        onErrorContainer: '#410E0B',

        // INVERSE COLORS (for dark surfaces)
        inverseSurface: '#2C1C16',
        inverseOnSurface: '#FBEDE6',
        inversePrimary: '#AA5A45',

        // SHADOW
        shadow: '#000000',

        // Optional for elevation overlays or transparent components
        surfaceDisabled: 'rgba(0,0,0,0.12)',
        onSurfaceDisabled: 'rgba(0,0,0,0.38)',
        backdrop: 'rgba(0,0,0,0.4)',
    },
    roundness: 12,
};

const initializeAuthHeader = async () => {
    const token = await getToken("accessToken")
    setAuthHeader(token || "");
}
const ErrorToastBridge = () => {
    const {showError} = useErrorToast();
    showErrorGlobal = (err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        showError(message);
    };
    return null;
}


export default function Index() {
    useEffect(() => {
        initializeAuthHeader();
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <ErrorToastProvider>
                <ErrorToastBridge/>
                <PaperProvider
                    theme={customTheme}
                >
                    <AuthProvider>
                        <AppNavigator/>
                    </AuthProvider>
                </PaperProvider>
            </ErrorToastProvider>
        </QueryClientProvider>
    );
}
