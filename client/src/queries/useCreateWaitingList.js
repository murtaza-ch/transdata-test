import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../utils/axiosClient";

export const useCreateWaitingList = () => {
  const createWaitingList = async () => {
    return await apiClient.post("/create-waiting-list");
  };

  return useMutation(createWaitingList);
};
