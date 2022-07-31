import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../utils/axiosClient";

export const useGetWaitingList = (listId) => {
  const getWaitingList = async (listId) => {
    const response = await apiClient.get(`/waiting-list/${listId}`);
    return response.data;
  };

  return useQuery(["waiting-list", listId], () => getWaitingList(listId));
};
