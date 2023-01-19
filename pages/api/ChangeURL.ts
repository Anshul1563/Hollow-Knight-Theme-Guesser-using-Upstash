import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../lib/upstash-redis";
import { Theme } from "../../typings";
import Themes from "../../app/quiz/themes";



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
	// const urls = [
	// 	"https://drive.google.com/file/d/1W2bhFFTHVOyY2iUJOUL8dBNpyEKqW8NY/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1W7YoEzSq17ozR46Tfpjpm2NgAKQ8kaX0/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1W8cwcJjp9TnhZRD2V1gCp8QOL_juj8od/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1WDYlnput3IX9nfAGU45k0Zn_JEREozwO/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1WDlS9vjk0w3yjr9Sd8M3GCrBbSAL2VUo/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1WERa8dWR8Vcr2lDxI5Yg9g322yUuDAFJ/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1WHewJkr8bl38tqXrhZcGMMAZkaYiK0QH/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1WXlOSj3ppr_mdPqw5dd2wwhUEquEuiTv/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1WOex7GRkbTc4ij3zqHaHDcPJ26_xPeCT/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1WXyXa-0OvJCZ1vKMJ2avea3A8GxSuyOQ/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1WrU-e-dl3vQuPHxdmwtax3yUXY8GRrck/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1WwiJMvas395TK2TxKxmoTxFrH_gE5af-/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1Wxs5nDtPk1BSdAh43jsFQ3B525aVhwnf/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1X-5M47aY03lFgQG57O8UtsVzV6_tfLb0/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1XA2q2tElaprdye2iXjUqoA2EYnPY36f4/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1XBbhfgUmQV9qbS2trr7rVGChvsYTjdOo/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1XEHm-BxOZKR16KP0-VqIOASRcjQXZFxZ/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1XhaK-aRFk9SaIvxQGFAqNZfzaArj04EV/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1YVEjbu-gRKVQZ2PYIGMMkuPA897SEbRx/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1XHIfFFLsxwQZ-ndr_aiasSRgTGZ54ugJ/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1XMD9yztfdr28mSl1UBnOfJRre5NUvJW6/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1XXZcXpalh_bAeo1_4wRsda8xv7TskuG8/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1XZpxDEj5DeF804IGNWcMT22m6tQBvpo-/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1XbAIYE3tfVMiYEFAh6G-9xIM-G539GlF/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1XlOjuujUJS6VfIvpUvkciHN5KQ349yQq/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1XlRUvf941_jyrpE3VQUjfmNeUIIx3XaM/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1Y35T4bGfGkeua9NU1BjgS7IiurDD0I7y/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1Y5eQSCfjOnqKxq84uH8z123810lJPQzG/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1Y6wIqpKfwAVVtqN5_5Ez5ClP2uDqTFGx/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1Y7zT5rjo1HVjfTHp2vHkkU8pltxFk_E7/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1Y90qU1kHAz1jZNAZOBUINqQvwnvsHDvi/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1YGR4fOc05PIWR8bFvRzbIyiEphYL19Dn/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1YNWVRATyp_jD-WPXdJoApROjvtZYnZp2/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1YPzciag8qSvXWdukv6DeW5MZPNZr43RT/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1YUL9m7eL6dSWPUpHCSzi20YUP1U1MpHA/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1YVn0Xh6UhcjsLwPjeY40BOwx9bZWkoIk/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1YZyTGqP2vgJIJ5etVDe5oVXTm_nD7XJM/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1Yk_VrDeEcBOL2CPRo5FZLrLsmDMpV9lE/view?usp=sharing",
	// 	"https://drive.google.com/file/d/1YmZKqgXRKZdy_brkyeahFirOGKAqo2I6/view?usp=sharing",
	// ];

	// const themes = Themes.themes
	// let c = -1;
	// const newThemes = themes.map(async (theme) => {
	// 	c++;
	// 	const newTheme = theme;
	// 	const l = urls[c].split("/");
	// 	const url = `https://docs.google.com/uc?export=open&id=${l[5]}`
	// 	console.log(url)
	// 	newTheme.url = url
	// 	await redis.hset("themes",newTheme.id, JSON.stringify(newTheme));
	// 	return newTheme;
	// });


	// console.log(newThemes);
	res.status(200).json({ body : "Not allowed" });
}
