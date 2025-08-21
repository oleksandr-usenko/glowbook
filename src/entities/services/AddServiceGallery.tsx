import {forwardRef, Ref, useState} from "react";
import {View, Image, TouchableOpacity, LayoutChangeEvent} from "react-native";
import {ActivityIndicator, Button, Icon, IconButton, Text} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import DraggableFlatList from "react-native-draggable-flatlist/src/components/DraggableFlatList";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {GenericImage} from "@/src/entities/services/AddServiceForm";
import {OpacityDecorator, RenderItemParams} from "react-native-draggable-flatlist";
import {TMediaItem} from "@/src/entities/services/types";

type AddServiceGalleryProps = {
    images: GenericImage[];
    isDeleting: TMediaItem["public_id"][];
    isUploading: boolean;
    setImages: (images: GenericImage[]) => void;
    setOrder: (orderedList: GenericImage[]) => void;
    onDelete: (image: GenericImage) => void;
}

export const AddServiceGallery = ({
                                      images,
                                      isDeleting,
                                      isUploading,
                                      setImages,
                                      setOrder,
                                      onDelete
                                  }: AddServiceGalleryProps) => {
    const [containerWidth, setContainerWidth] = useState(0)

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

    const handleDelete = (item: GenericImage) => {
        if ("public_id" in item && isDeleting.includes(item.public_id)) {
            return;
        }
        onDelete(item);
    }

    const handleLayout = (e: LayoutChangeEvent) => {
        setContainerWidth(e.nativeEvent.layout.width);
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
                    style={{width: containerWidth, height: 200, borderRadius: 16, margin: 4}}
                />
                <IconButton
                    icon={() =>
                        "public_id" in item && isDeleting.includes(item.public_id)
                            ? <ActivityIndicator size="small"/>
                            : <Icon source="delete" size={20}/>
                    }
                    mode="contained-tonal"
                    loading={"public_id" in item && isDeleting.includes(item.public_id)}
                    size={20}
                    style={{position: "absolute", top: 4, right: 4}}
                    onPress={() => handleDelete(item)}
                />
            </TouchableOpacity>
        </OpacityDecorator>
    );

    return (
        <GestureHandlerRootView style={{minHeight: 280, maxHeight: 500, marginBottom: 48}} onLayout={handleLayout}>
            <Text>{isUploading}</Text>
            <DraggableFlatList
                showsVerticalScrollIndicator={false}
                data={images}
                keyExtractor={(item) => item.uri}
                contentContainerStyle={{paddingBottom: 16}}
                onDragEnd={handleDrop}
                renderItem={renderItem}
            />
            <Button style={{marginTop: 8, marginBottom: 8}} icon="file-image-plus-outline" mode="contained"
                    onPress={pickImage} disabled={isUploading} loading={isUploading}>Add images</Button>
        </GestureHandlerRootView>
    )
};
AddServiceGallery.displayName = "AddServiceGallery";