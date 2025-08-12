import {Button, Text} from "react-native-paper";
import {UIInput} from "@/app/components/UI/UIInput";
import {View} from "react-native";
import {UIDialog} from "@/app/components/UI/UIDialog";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import * as ImagePicker from "expo-image-picker";
import {ImagePickerAsset} from "expo-image-picker";
import {useCreateService} from "@/app/entities/services/queries/useCreateService";

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
const DialogContent = forwardRef<DialogContentRef>((_, ref) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [images, setImages] = useState<ImagePickerAsset[]>([]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImages(result.assets)
        }
        return null;
    }

    useImperativeHandle(ref, () => ({
        getValues: () => ({
            name,
            description,
            price,
            duration,
            images
        })
    }))
    return (<View className="flex flex-col gap-1">
                <UIInput label="Title" value={name} onChangeText={setName} />
                <UIInput multiline label="Description" value={description} onChangeText={setDescription} />
                <UIInput label="Price" keyboardType={'numeric'} value={price} onChangeText={setPrice} />
                <UIInput label="Duration" keyboardType={'numeric'} value={duration} onChangeText={setDuration} />
                <Button onPress={pickImage}>Add images</Button>
            </View>)
});
DialogContent.displayName = "DialogContent";

const DialogActions = ({ onSave }: { onSave: () => void }) => {
    return <Button onPress={onSave}>Save</Button>
}

export const AddServiceDialog = ({ open, onClose }: Props) =>{
    const contentRef = useRef<DialogContentRef>(null);
    const { mutateAsync: createService } = useCreateService();

    const onSave = () => {
        if (contentRef.current) {
            const payload = contentRef.current.getValues();
            createService(payload);
        }
    }
    return (
        <UIDialog
            visible={open}
            onDismiss={onClose}
            title={<DialogTitle />}
            content={<DialogContent ref={contentRef} />}
            actions={<DialogActions onSave={onSave} />}
        />)
}