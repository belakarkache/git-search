import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: `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` });

export const allUsers = octokit.request("GET /users");

export const searchUsers = (query) => octokit.request('GET /search/users', {
    q: query,
})