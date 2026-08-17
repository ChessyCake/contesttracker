import axios from "axios";
import * as cheerio from "cheerio";
import { contests } from "../types/contests";

export const getAtCoderContests = async (): Promise<contests[]> => {
    try {
        const { data } = await axios.get(
            "https://atcoder.jp/contests?lang=en"
        );

        const $ = cheerio.load(data);

        const result: contests[] = [];

        const heading = $("h3")
            .filter((_, el) => $(el).text().trim() === "Upcoming Contests");

        const table = heading.next("div").find("table");

        table.find("tbody tr").each((_, row) => {
            const columns = $(row).find("td");

            if (columns.length < 3) return;

            const startTime = $(columns[0]).text().trim();
            const nameCol = $(columns[1]).find("a");
            const name = nameCol.text().trim();
            const urlPath = nameCol.attr("href") || "";
            const duration = $(columns[2]).text().trim();

            result.push({
                name,
                startTime: Math.floor(
                    new Date(startTime).getTime() / 1000
                ),
                duration: durationToSeconds(duration),
                platform: "AtCoder",
                url: `https://atcoder.jp${urlPath}`
            });
        });

        return result;

    } catch (err) {
        console.error("Error fetching AtCoder data", err);
        return [];
    }
};

const durationToSeconds = (duration: string): number => {
    const [hours, minutes] = duration.split(":").map(Number);

    return hours * 3600 + minutes * 60;
};