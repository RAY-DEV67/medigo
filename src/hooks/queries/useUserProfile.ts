import { useQuery } from "@tanstack/react-query";
import userService from "../../api/services/userService";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: userService.userProfile,
  });
};
