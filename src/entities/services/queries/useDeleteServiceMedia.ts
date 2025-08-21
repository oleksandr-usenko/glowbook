import {useMutation} from "@tanstack/react-query";
import {deleteServiceMedia} from "@/src/services/service";
import {TMediaItem, TService} from "@/src/entities/services/types";
import {useInvalidateServices} from "@/src/entities/services/queries/useInvalidateServices";

type DeleteServiceMediaPayload = {
    serviceId: TService["id"];
    mediaId: TMediaItem["public_id"];
}

export const useDeleteServiceMedia = () => {
    const {invalidateServices} = useInvalidateServices();
    return useMutation({
        mutationFn: ({serviceId, mediaId}: DeleteServiceMediaPayload) => deleteServiceMedia(serviceId, mediaId),
        onSuccess: invalidateServices,
    })
}