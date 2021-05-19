import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: `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` });

export const allUsers = (since) => octokit.request("GET /users", {
    since,
    per_page: 10,
});

export const searchUsers = (query, page) => octokit.request('GET /search/users', {
    q: query,
    per_page: 10,
    page,
})