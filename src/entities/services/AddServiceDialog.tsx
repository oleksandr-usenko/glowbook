import {Button, SegmentedButtons, Text, useTheme} from "react-native-paper";
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

type DialogTitleProps = {
    activeScreen: "form" | "gallery";
    setScreen: (screen: "form" | "gallery") => void;
}

const DialogTitle = ({activeScreen, setScreen}: DialogTitleProps) => {
    const theme = useTheme();
    return (<View className="flex justify-between">
        <View style={{marginBottom: 16}}>
            <Text variant="headlineSmall">Add new service</Text>
        </View>
        <SegmentedButtons density="small" theme={{
            colors: {
                secondaryContainer: theme.colors.primary,
                onSecondaryContainer: theme.colors.onPrimary
            }
        }}
                          style={{width: "100%"}} value={activeScreen} onValueChange={setScreen}
                          buttons={[
                              {
                                  value: "form",
                                  icon: "note-edit-outline",
                              },
                              {
                                  value: "gallery",
                                  icon: "image-outline",
                              },
                          ]}/>
    </View>)
}
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

const AddServiceDialog = ({open, onClose, service}: Props) => {
    const [snackbarText, setSnackbarText] = useState("");

    const [activeScreen, setActiveScreen] = useState<"form" | "gallery">("form");

    return (
        <View>
            <UIDialog
                visible={open}
                onDismiss={onClose}
                title={<DialogTitle activeScreen={activeScreen} setScreen={setActiveScreen}/>}
                content={<AddServiceForm activeScreen={activeScreen} service={service} close={onClose}/>}
            />
            <UISnackbar visible={snackbarText !== ""} onDismiss={() => setSnackbarText("")}>
                <Text>{snackbarText}</Text>
            </UISnackbar>
        </View>)
}

export default AddServiceDialog;