import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../utils/axiosClient";

export const useGetDailyWaitingList = () => {
  const getLists = async () => {
    const response = await apiClient.get("get-daily-waiting-lists");
    return response.data;
  };

  return useQuery(["daily-waiting-lists"], getLists);
};
