export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  notification_type: string;
  data: Record<string, any>;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  unread_only?: boolean;
  notification_type?: string | null;
}

export interface NotificationsResponse {
  success: boolean;
  data: NotificationItem[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
