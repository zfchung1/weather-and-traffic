import "dotenv/config";
import type { Knex } from "knex";
import { readFileSync } from "fs";

const config: { [key: string]: Knex.Config } = {
	production: {
		client: "pg",
		connection: {
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			ssl: { ca: readFileSync("../../../cert/ap-southeast-1-bundle.pem") }
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: "./migrations",
			schemaName: process.env.DB_SCHEMA,
			extension: "ts"
		}
	}
};

module.exports = config;
