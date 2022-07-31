import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../utils/axiosClient";

export const useRegisterPuppy = () => {
  const registerPuppy = async (body) => {
    return await apiClient.post("/register-puppy", body);
  };

  return useMutation(registerPuppy);
};
