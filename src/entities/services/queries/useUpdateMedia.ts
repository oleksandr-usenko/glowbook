import {useMutation} from "@tanstack/react-query";
import {addMedia} from "@/src/services/service";
import {useInvalidateServices} from "@/src/entities/services/queries/useInvalidateServices";
import {GenericImage} from "@/src/entities/services/AddServiceForm";

export const useUpdateMedia = () => {
    const {invalidateServices} = useInvalidateServices();

    return useMutation({
        mutationFn: ({id, images}: { id: number, images: GenericImage[] }) => {
            const formData = new FormData();

            images.forEach((file, index) => formData.append("media", {
                uri: file.uri,
                name:
                    file.fileName ||
                    file.uri.split("/").pop() ||
                    `image_${index}.jpg`,
                type: file.type || file.mimeType || "image/jpeg",
            } as any));
            return addMedia(id, formData)
        },
        onSuccess: invalidateServices,
    })
}