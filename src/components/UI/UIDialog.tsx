import {ReactNode} from "react";
import {Dialog, DialogProps, Portal} from "react-native-paper";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    View,
} from "react-native";

type Props = {
    title?: ReactNode;
    content?: ReactNode;
    actions?: ReactNode;
} & Required<Pick<DialogProps, "visible" | "onDismiss">> &
    Omit<DialogProps, "children">;

const UIDialog = ({title, content, actions, ...rest}: Props) => {
    return (
        <Portal>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{
                    flex: 1
                }}
            >
                <Dialog theme={{roundness: 4}} {...rest} style={{
                    alignSelf: "center",
                }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View>
                            {title && <Dialog.Title>{title}</Dialog.Title>}
                            {content && <Dialog.Content>{content}</Dialog.Content>}
                            {actions && <Dialog.Actions>{actions}</Dialog.Actions>}
                        </View>
                    </TouchableWithoutFeedback>
                </Dialog>
            </KeyboardAvoidingView>
        </Portal>
    );
};

export default UIDialog;

