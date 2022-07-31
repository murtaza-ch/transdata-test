import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../utils/axiosClient";

export const useGetTodayWaitingList = (listId, search, order) => {
  const getTodayWaitingList = async ({ queryKey }) => {
    const { listId, search, order } = queryKey[1];
    const response = await apiClient.get(
      `/get-today-waiting-list/${listId}/${order}?search=${search}`
    );
    return response.data;
  };

  return useQuery(
    ["today-waiting-list", listId, search, order],
    getTodayWaitingList
  );
};
