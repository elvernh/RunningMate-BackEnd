"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNotificationResponse = toNotificationResponse;
function toNotificationResponse(notification) {
    return {
        notification_id: notification.notification_id,
        user_id: notification.user_id,
        date: notification.date
    };
}
