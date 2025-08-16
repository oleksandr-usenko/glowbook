import {useMutation} from "@tanstack/react-query";
import {TUpdateServicePayload} from "@/src/entities/services/types";
import {updateService} from "@/src/services/service";
import {useInvalidateServices} from "@/src/entities/services/queries/useInvalidateServices";

export const useUpdateService = () => {
    const {invalidateServices} = useInvalidateServices();

    return useMutation({
        mutationFn: ({id, payload}: { id: number; payload: TUpdateServicePayload }) => updateService(id, payload),
        onError: (error) => {
        },
        onSuccess: invalidateServices,
    })
}