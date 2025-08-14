import {Button, Text} from "react-native-paper";
import UIDialog from "@/src/components/UI/UIDialog";
import {useRef, useState} from "react";
import {ImagePickerAsset} from "expo-image-picker";
import {useCreateService} from "@/src/entities/services/queries/useCreateService";
import AddServiceForm from "@/src/entities/services/AddServiceForm";
import UISnackbar from "@/src/components/UI/UISnackbar";
import {View} from "react-native";
import {TService} from "@/src/entities/services/types";
import {useUpdateService} from "@/src/entities/services/queries/useUpdateService";

type Props = {
    open: boolean;
    onClose: () => void;
    service: TService | undefined;
}

const DialogTitle = () => <Text>Add new service</Text>;
type DialogContentRef = {
    getValues: () => {
        name: string;
        description: string;
        price: number | null;
        currency: "UAH" | "USD" | "EUR";
        duration: number | null;
        images: ImagePickerAsset[];
    };
};

const DialogActions = ({onSave}: { onSave: () => void }) => <Button onPress={onSave}>Save</Button>

const AddServiceDialog = ({open, onClose, service}: Props) => {
    const contentRef = useRef<DialogContentRef>(null);
    const [snackbarText, setSnackbarText] = useState("");
    const {mutateAsync: createService} = useCreateService();
    const {mutateAsync: updateService, error, isError} = useUpdateService()

    const onSave = async () => {
        if (contentRef.current) {
            const payload = contentRef.current.getValues();
            if (!payload.price || !payload.duration) return;
            try {
                if (service) {
                    await updateService({id: service.id, payload});
                } else {
                    await createService(payload);
                }
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
                title={isError ? <Text>{(error as any).response?.data?.message}</Text> : <DialogTitle/>}
                content={<AddServiceForm service={service} ref={contentRef}/>}
                actions={<DialogActions onSave={onSave}/>}
            />
            <UISnackbar visible={snackbarText !== ""} onDismiss={() => setSnackbarText("")}>
                <Text>{snackbarText}</Text>
            </UISnackbar>
        </View>)
}

export default AddServiceDialog;