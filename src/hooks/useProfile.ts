import OApi from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => useQuery(
    ["getProfile"],
    () => OApi.me.getProfile(),
    {
        retry: 0,
        refetchInterval: 15000,
    }
);