import { Friendlist, Run, User, UserAchievement, UserChallenge } from "@prisma/client"
import { AchievementResponse } from "./achievement-model"
import { prismaClient } from "../application/database"

export interface RegisterUserRequest {
    username: string
    email: string
    password: string
}

export interface LoginUserRequest {
    email: string
    password: string
}

export interface UserResponse {
    token?: string
    username: string
    email: string
    password: string
}

export interface PublicUserResponse{
    username: string
    level: number
    totalFriends: number
    achievements: AchievementResponse[]
}

export interface DashboardResponse {
    username: string;
    email: string;
    level: number;
    expBar: number;
    achievements: UserAchievement[];
    notifications: Notification[];
    runs: Run[];
    challenges: UserChallenge[];
    friendLists: Friendlist[];
}

export async function toDashboardResponse(user: any): Promise<DashboardResponse>{
    return {
        username: user.username,
        email: user.email,
        level: user.level,
        expBar: user.expBar,
        achievements: user.achievements,
        notifications: user.notifications,
        runs: user.runs,
        challenges: user.challenges,
        friendLists: user.friendLists,
    };
}
export async function toPublicUserResponse(user: User): Promise<PublicUserResponse>{
    const totalFriends = await prismaClient.friendlist.count({
        where: {
            user_id: user.user_id,
            status: "accepted",
        },
    });

    // Fetch the user's achievements, including details from the `Achievement` model
    const achievements = await prismaClient.userAchievement.findMany({
        where: { user_id: user.user_id },
        include: {
            achievement: true, // Include the related achievement details
        },
    });

    // Map the fetched achievements to the `AchievementResponse` format
    const achievementResponses: AchievementResponse[] = achievements.map((userAchievement) => ({
        achievement_id: userAchievement.achievement.achievement_id,
        name: userAchievement.achievement.name,
        description: userAchievement.achievement.description,
        image: userAchievement.achievement.image
    }));

    // Return the public user response
    return {
        username: user.username,
        level: user.level,
        totalFriends,
        achievements: achievementResponses,
    };
}

export async function toPublicUserResponseList(prismaUsers: User[]): Promise<PublicUserResponse[]> {
    // Use Promise.all to resolve all individual user responses in parallel
    return await Promise.all(prismaUsers.map((user) => toPublicUserResponse(user)));
}

// export function toUserList(prismaUser: User[]): 

export function toUserResponse(user: User): UserResponse{
    return {
        token: user.token ?? "",
        username: user.username,
        email: user.email,
        password: user.password
    }
}

