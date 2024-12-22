import { Friendlist } from "@prisma/client";

export interface CreateFriendlistRequest {
    user_id: number;
    userfriend_id: number;
    status: string;
}

export interface FriendlistResponse {
    friendlist_id: number;
    user_id: number;
    userfriend_id: number;
    status: string;
}

export function toFriendlistResponse(friendlist: Friendlist): FriendlistResponse {
    return {
        friendlist_id: friendlist.friendlist_id,
        user_id: friendlist.user_id,
        userfriend_id: friendlist.userfriend_id,
        status: friendlist.status
    }
}