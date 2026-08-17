import { getAtCoderContests } from "./atcoder/fetch";
import { getCodeChefContests } from "./codechef/fetch";
import { getCodeForcesContests } from "./codeforces/fetch";
import { getLeetCodeContests } from "./leetcode/fetch";

export const getAllContests = async () => {
    const [
        leetcode,
        codeforces,
        codechef,
        atcoder
    ] = await Promise.all([
        getLeetCodeContests(),
        getCodeForcesContests(),
        getCodeChefContests(),
        getAtCoderContests()
    ]);

    const contests = [
        ...leetcode,
        ...codeforces,
        ...codechef,
        ...atcoder
    ];

    contests.sort((a, b) => a.startTime - b.startTime);

    return contests;
};