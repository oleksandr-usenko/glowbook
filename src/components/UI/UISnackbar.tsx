import {Snackbar, SnackbarProps} from "react-native-paper";
import {useEffect} from "react";

type TSnackbarProps = SnackbarProps & {
    duration?: number;
}

const UISnackbar = ({children, visible, duration = 5000, onDismiss, ...rest}: TSnackbarProps) => {
    useEffect(() => {
        let timer: number;
        if (visible) {
            timer = setTimeout(() => {
                onDismiss?.();
            }, duration);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [visible, duration, onDismiss]);

    return (
        <Snackbar visible={visible} onDismiss={onDismiss} {...rest}>{children}</Snackbar>
    )
}

export default UISnackbar;