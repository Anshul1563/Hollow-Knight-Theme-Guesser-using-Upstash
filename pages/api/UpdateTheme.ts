import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../lib/upstash-redis";
import { Theme } from "../../typings";

type Data = {
	theme: Theme;
};

type ErrorData = {
	body: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data | ErrorData>
) {
	if (req.method != "POST") {
		res.status(405).json({ body: "Method not allowed" });
		return;
	}

	const { update } = req.body;

	if (redis.status == "end") await redis.connect();
	const themeResponse = await redis.hget("themes", update.id);

	const theme: Theme = JSON.parse(themeResponse!);
	if (update.process == "Correct") {
		theme.success = theme.success + 1;
		theme.attempts = theme.attempts + 1;
	} else {
		theme.attempts = theme.attempts + 1;
	}

	await redis.hset(
		"themes",
		theme.id,
		JSON.stringify(theme),
		async () => await redis.quit()
	);

	res.status(200).json({ theme });
}
