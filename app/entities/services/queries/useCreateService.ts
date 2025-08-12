import {useMutation} from "@tanstack/react-query";
import {createService} from "@/app/services/service";
import {ImagePickerAsset} from "expo-image-picker";
import {useInvalidateServices} from "@/app/entities/services/queries/useInvalidateServices";

type TCreateServicePayload = {
    name: string;
    description?: string;
    price: string;
    duration: string;
    images: ImagePickerAsset[];
}

export const useCreateService = () => {
    const { invalidateServices } = useInvalidateServices();
    return useMutation({
        mutationFn: (payload: TCreateServicePayload) => {
            const formData = new FormData();

            formData.append("name", payload.name);
            formData.append("duration", String(payload.duration));
            if (payload.description) {
                formData.append("description", payload.description);
            }
            formData.append("price", String(payload.price));
            payload.images.forEach((file, index) => formData.append("media", {
                uri: file.uri,
                name:
                    file.fileName ||
                    file.uri.split("/").pop() ||
                    `image_${index}.jpg`,
                type: file.type || file.mimeType || "image/jpeg",
            } as any));

            return createService(formData)
        },
        onSuccess: invalidateServices,
    })
}