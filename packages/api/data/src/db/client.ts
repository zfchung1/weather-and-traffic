import { Knex, knex } from "knex";
import { readFileSync } from "fs";
import { join } from "path";
import { checkUndefinedOrNull } from "@weather-and-traffic-shared/helper";

function configureClient() {
	// Uncomment if required for direct db connect (for testing purpose only, not for production)
	// const sslConfig = { ca: readFileSync(join(__dirname, "../../../../../cert/ap-southeast-1-bundle.pem")) };
	const dbClient = knex({
		client: "pg",
		connection: {
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			// ssl: sslConfig
		},
		pool: {
			idleTimeoutMillis: 30000,
			min: 2,
			max: 10
		}
	});
	dbClient.on("error", closeClientConnection);
	return dbClient;
}

let client: Knex | undefined;

export function getClient() {
	client = (client || configureClient()) as Knex;
	return client;
}

export function getDBClient<T extends {}>(tableName: string) {
	const clientConfig = getClient();
	return clientConfig<T>(tableName).withSchema(checkUndefinedOrNull("Environment Variable:DB_SCHEMA", process.env.DB_SCHEMA));
}

async function closeClientConnection(event: unknown) {
	console.error("CLOSE DB CLIENT:", JSON.stringify({ event, client }));
	if (client) {
		await client.destroy();
		client = undefined;
	}
}

//do something when app is closing
process.on("exit", closeClientConnection);

//catches ctrl+c event
process.on("SIGINT", closeClientConnection);

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", closeClientConnection);
process.on("SIGUSR2", closeClientConnection);

//catches uncaught exceptions
process.on("uncaughtException", closeClientConnection);
