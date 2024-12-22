import { Notification } from "@prisma/client";

export interface CreateNotificationRequest {
    user_id: number;
    date: Date;
}

export interface NotificationResponse {
    notification_id: number;
    user_id: number;
    date: Date;
}

export function toNotificationResponse(notification: Notification): NotificationResponse {
    return {
        notification_id: notification.notification_id,
        user_id: notification.user_id,
        date: notification.date
    }
}