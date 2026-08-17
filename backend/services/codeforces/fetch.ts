import axios from "axios";

export const getCodeForcesContests = async () => {
    try {
        const { data } = await axios.get(
            "https://codeforces.com/api/contest.list?gym=false"
        );

        const results = data.result;

        const contests = results
            .filter((contest: any) => contest.phase === "BEFORE")
            .map((contest: any) => ({
                name: contest.name,
                startTime: contest.startTimeSeconds,
                duration: contest.durationSeconds,
                platform: "Codeforces",
                url: `https://codeforces.com/contests/${contest.id}`
            }));

        return contests;

    } catch (err) {
        console.error("Something went wrong fetching CF data", err);
        return [];
    }
};