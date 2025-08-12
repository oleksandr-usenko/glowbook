import {useQueryClient} from "@tanstack/react-query";
import {QUERY_SERVICES} from "@/app/entities/services/queries/useGetServices";

export const useInvalidateServices = () => {
    const queryClient = useQueryClient();

    const invalidateServices = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_SERVICES],
        });
    };

    return { invalidateServices };
}