import { AxiosResponse } from "axios";
import apiClient from "../client";
import {
  GetNotificationsParams,
  NotificationsResponse,
} from "../../types/notifications.types";

const notificationService = {
  getNotifications: async (
    params: GetNotificationsParams,
  ): Promise<NotificationsResponse> => {
    const response: AxiosResponse<NotificationsResponse> = await apiClient.get(
      "/notifications/inbox",
      { params },
    );
    return response.data;
  },
};

export default notificationService;
