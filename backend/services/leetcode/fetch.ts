import axios from "axios";

export const getLeetCodeContests = async () => {
    try {
        const query = `
            query contestV2UpcomingContests {
                contestV2UpcomingContests {
                    titleSlug
                    title
                    titleCn
                    startTime
                    duration
                    cardImg
                    cardImgApp
                }
            }
        `;

        const { data } = await axios.post(
            "https://leetcode.com/graphql/",
            {
                query,
                variables: {},
                operationName: "contestV2UpcomingContests",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const contests = data.data.contestV2UpcomingContests;

        return contests.map((contest: any) => ({
            name: contest.title,
            startTime: contest.startTime,
            duration: contest.duration,
            platform: "LeetCode",
            url: `https://leetcode.com/contest/${contest.titleSlug}`
        }));

    } catch (err) {
        console.error("Something went wrong fetching LC data", err);
        return [];
    }
};