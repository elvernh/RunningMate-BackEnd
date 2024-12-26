"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFriendlistResponse = toFriendlistResponse;
function toFriendlistResponse(friendlist) {
    return {
        friendlist_id: friendlist.friendlist_id,
        user_id: friendlist.user_id,
        userfriend_id: friendlist.userfriend_id,
        status: friendlist.status
    };
}
