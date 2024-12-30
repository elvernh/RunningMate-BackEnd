import { Challenge } from "@prisma/client";

export interface CreateChallengeRequest {
    name: string;
    description: string;
    image: string;
}

export interface ChallengeResponse {
    challenge_id: number;
    name: string;
    description: string;
    image: string;
}

export function toChallengeResponse(challenge: Challenge): ChallengeResponse {
    return {
        challenge_id: challenge.id,
        name: challenge.name,
        description: challenge.description,
        image: challenge.image
    }
}