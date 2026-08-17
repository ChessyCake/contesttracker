import axios from "axios";
import { contests } from "../types/contests";

export const getCodeChefContests = async () : Promise<contests[]> => {
    try {
        const { data } = await axios.get(
            "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all"
        );

        const contests = data.future_contests;

        return contests.map((el: any) => ({
            name: el.contest_name,
            startTime: Math.floor(
                new Date(el.contest_start_date_iso).getTime() / 1000
            ),
            duration: Number(el.contest_duration) * 60,
            platform: "CodeChef",
            url: `https://www.codechef.com/${el.contest_code}`
        }));

    } catch (err) {
        console.error("Error fetching CodeChef data", err);
        return [];
    }
};