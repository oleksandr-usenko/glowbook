import {createContext, useContext, useState, useCallback, ReactNode} from "react";
import {Snackbar} from "react-native-paper";

type ErrorToastContextType = {
    showError: (message: string) => void;
};

const ErrorToastContext = createContext<ErrorToastContextType>({
    showError: () => {
    },
});

export const useErrorToast = () => useContext(ErrorToastContext);

export const ErrorToastProvider = ({children}: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");

    const showError = useCallback((msg: string) => {
        setMessage(msg);
        setVisible(true);
    }, []);

    return (
        <ErrorToastContext.Provider value={{showError}}>
            {children}
            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={300000}
                action={{
                    label: "Close",
                    onPress: () => setVisible(false),
                }}
            >
                {message}
            </Snackbar>
        </ErrorToastContext.Provider>
    );
};