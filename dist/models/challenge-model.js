"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toChallengeResponse = toChallengeResponse;
function toChallengeResponse(challenge) {
    return {
        challenge_id: challenge.id,
        name: challenge.name,
        description: challenge.description,
        image: challenge.image
    };
}
