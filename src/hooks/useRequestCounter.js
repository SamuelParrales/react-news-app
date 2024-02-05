import { useIsFetching, useIsMutating } from "react-query";

export const useRequestCounter = () => {
    return useIsFetching() + useIsMutating();
}
