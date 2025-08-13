import {useQueryClient} from "@tanstack/react-query";
import {QUERY_SERVICES} from "@/src/entities/services/queries/useGetServices";

export const useInvalidateServices = () => {
    const queryClient = useQueryClient();

    const invalidateServices = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_SERVICES],
        });
    };

    return {invalidateServices};
}