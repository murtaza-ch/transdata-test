import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../utils/axiosClient";

export const useUpdatePuppyStatus = () => {
  const updatePuppyStatus = async ({ listId, puppyId, status }) => {
    return await apiClient.patch(`/update-puppy-status/${listId}/${puppyId}`, {
      status,
    });
  };

  return useMutation(updatePuppyStatus);
};
