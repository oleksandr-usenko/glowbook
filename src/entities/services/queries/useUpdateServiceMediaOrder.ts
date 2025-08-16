import {useMutation} from "@tanstack/react-query";
import {updateMediaOrder} from "@/src/services/service";
import {TMediaItem} from "@/src/entities/services/types";
import {useInvalidateServices} from "@/src/entities/services/queries/useInvalidateServices";

export const useUpdateServiceMediaOrder = () => {
    const {invalidateServices} = useInvalidateServices();

    return useMutation({
        mutationFn: (({id, media}: { id: number; media: TMediaItem[] }) => {
            const normalizedMedia: TMediaItem[] = media.map(m => ({
                uri: m.uri,
                mimeType: m.mimeType,
                fileName: m.fileName,
                public_id: m.public_id,
            }));
            return updateMediaOrder(id, normalizedMedia);
        }),
        onSuccess: invalidateServices,
    });
}