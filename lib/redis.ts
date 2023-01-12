import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
	if (!client.isOpen()) {
		await client.open(process.env.REDIS_URL);
	}
}

type Data = {
	name: string;
	attempts: string;
	success: string;
	url: string;
};

interface Theme {
	entityId: string;
	name: string;
	attempts: string;
	success: string;
	url: string;
}

class Theme extends Entity {}

let schema = new Schema(
	Theme,
	{
		name: { type: "text", sortable: true  },
		attempts: { type: "string" },
		success: { type: "string" },
		url: { type: "string" },
	},
	{
		dataStructure: "JSON",
	}
);

export async function CreateTheme(data: Data) {
	await connect();
	const repository = client.fetchRepository(schema);
	const theme = repository.createEntity(data);
	const id = await repository.save(theme);
	return id;
}

export async function SearchRedis() {
	await connect();
	const repository = client.fetchRepository(schema);
	await repository.createIndex();
	const themes = await repository.search().return.all();
	return themes;
}

export async function UpdateTheme(id: string, process: string) {
	await connect();
	const repository = client.fetchRepository(schema);
	const theme = await repository.fetch(id);
	if (theme) {
		if (process === "correct") {
			theme.success = (parseInt(theme.success) + 1).toString();
			theme.attempts = (parseInt(theme.attempts) + 1).toString();
		} else {
			theme.attempts = (parseInt(theme.attempts) + 1).toString();
		}
		await repository.save(theme);
	}
	return theme;
}

export async function SearchTheme(text: string) {
	await connect();
	const repository = client.fetchRepository(schema);
	const term = text + "*";
	if (text == ""){
		const themes = await repository.search().sortAscending('name').return.all();
		return themes;
	}
	const themes = await repository
		.search()
		.where("name")
		.matches(term)
		.sortAscending('name')
		.return.all();
        
	return themes;
}
