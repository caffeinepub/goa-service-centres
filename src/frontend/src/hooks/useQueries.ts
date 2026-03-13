import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetAllServiceRequests() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["serviceRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServiceRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitServiceRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      serviceName,
      name,
      phone,
      address,
      problemDescription,
    }: {
      serviceName: string;
      name: string;
      phone: string;
      address: string;
      problemDescription: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitServiceRequest(
        serviceName,
        name,
        phone,
        address,
        problemDescription,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceRequests"] });
    },
  });
}
