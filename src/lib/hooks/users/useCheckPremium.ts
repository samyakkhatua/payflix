import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useCheckPremium = () => {
    const query = useQuery({

        queryKey: ["is-premium"],
        queryFn: async() => {
            const response = await client.api.user["is-premium"]["$get"]();
            if (!response.ok){ 
                throw new Error(response.statusText);
            }

            const data = await response.json();
            return data.isPremium;
        },
    });

    return query;
};