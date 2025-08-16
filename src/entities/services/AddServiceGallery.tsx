import {forwardRef, Ref} from "react";
import {View, Image, TouchableOpacity} from "react-native";
import {Button, IconButton} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import DraggableFlatList from "react-native-draggable-flatlist/src/components/DraggableFlatList";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {GenericImage} from "@/src/entities/services/AddServiceForm";
import {OpacityDecorator, RenderItemParams} from "react-native-draggable-flatlist";

type AddServiceGalleryProps = {
    images: GenericImage[];
    setImages: (images: GenericImage[]) => void;
    setOrder: (orderedList: GenericImage[]) => void;
}

export const AddServiceGallery = forwardRef<Ref<View>, AddServiceGalleryProps>(({
                                                                                    images,
                                                                                    setImages,
                                                                                    setOrder
                                                                                }, ref) => {
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

    const handleDrop = ({data}: { data: GenericImage[] }) => {
        setOrder(data);
    };

    const handleDelete = (item) => {
    };

    const renderItem = ({item, drag, isActive}: RenderItemParams<GenericImage>) => (
        <OpacityDecorator>
            <TouchableOpacity
                onLongPress={drag}
                disabled={isActive}
                style={{
                    opacity: isActive ? 0.8 : 1,
                    transform: isActive ? [{scale: 1.05}] : [{scale: 1}],
                }}
            >
                <Image
                    source={{uri: item.uri}}
                    style={{width: 300, height: 200, borderRadius: 16, margin: 4}}
                />
                <IconButton
                    icon="delete"
                    size={20}
                    style={{position: "absolute", top: 4, right: 4}}
                    onPress={() => handleDelete(item)}
                />
            </TouchableOpacity>
        </OpacityDecorator>
    );

    return (
        <GestureHandlerRootView style={{minHeight: 280, maxHeight: 500}}>
            <DraggableFlatList
                ref={ref}
                data={images}
                keyExtractor={(item) => item.uri}
                contentContainerStyle={{paddingBottom: 16}}
                onDragEnd={handleDrop}
                renderItem={renderItem}
            />
            <Button style={{marginTop: 8, marginBottom: 8}} icon="file-image-plus-outline" mode="contained"
                    onPress={pickImage}>Add images</Button>
        </GestureHandlerRootView>
    )
});
AddServiceGallery.displayName = "AddServiceGallery";