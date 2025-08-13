import {Button, Text} from "react-native-paper";
import UIDialog from "@/src/components/UI/UIDialog";
import {forwardRef, useRef, useState} from "react";
import {ImagePickerAsset} from "expo-image-picker";
import {useCreateService} from "@/src/entities/services/queries/useCreateService";
import AddServiceForm from "@/src/entities/services/AddServiceForm";
import UISnackbar from "@/src/components/UI/UISnackbar";
import {View} from "react-native";

type Props = {
    open: boolean;
    onClose: () => void;
}

const DialogTitle = () => <Text>Add new service</Text>;
type DialogContentRef = {
    getValues: () => {
        name: string;
        description: string;
        price: string;
        duration: string;
        images: ImagePickerAsset[];
    };
};

// const DialogContent = forwardRef<DialogContentRef>((_, ref) => {
//     return <AddServiceForm ref={ref}/>;
// });
// DialogContent.displayName = "DialogContent";

const DialogActions = ({onSave}: { onSave: () => void }) => <Button onPress={onSave}>Save</Button>

const AddServiceDialog = ({open, onClose}: Props) => {
    const contentRef = useRef<DialogContentRef>(null);
    const [snackbarText, setSnackbarText] = useState("");
    const {mutateAsync: createService} = useCreateService();

    const onSave = async () => {
        if (contentRef.current) {
            const payload = contentRef.current.getValues();
            try {
                await createService(payload);
                setSnackbarText("All good!");
                onClose();
            } catch (err) {
                setSnackbarText("Something went wrong! " + err);
            }
        }
    }
    return (
        <View>
            <UIDialog
                visible={open}
                onDismiss={onClose}
                title={<DialogTitle/>}
                content={<AddServiceForm ref={contentRef}/>}
                actions={<DialogActions onSave={onSave}/>}
            />
            <UISnackbar visible={snackbarText !== ""} onDismiss={() => setSnackbarText("")}>
                <Text>{snackbarText}</Text>
            </UISnackbar>
        </View>)
}

export default AddServiceDialog;