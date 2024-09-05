import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetSignedURL = (iFrameURL: string) => {
    const query = useQuery({
        queryKey: ["signedUrl"],
        queryFn: async() => {
            const response = await client.api.video["get-signed-url"].$get({
                query: {
                    iFrameURL: iFrameURL,
                },
            });

            if (!response.ok){ 
                throw new Error(response.statusText);
            }

            const data = await response.json();
            return data.data;
        },
    });

    return query;
};