import { Knex, knex } from "knex";
import { readFileSync } from "fs";

jest.mock("fs");
jest.mock("knex");

describe("DB Client", () => {
	const mockClient = { client: "db" };
	const mockKnex = () => ({ withSchema: () => mockClient });
	const mockTransaction = {
		commit: jest.fn().mockReturnThis(),
		rollback: jest.fn().mockReturnThis(),
	} as object as Knex.Transaction;
	mockKnex.transaction = jest.fn();
	mockKnex.on = jest.fn();
	mockKnex.destroy = jest.fn();
	const mockCertificate = "mockCertificate";
	process.env.DB_HOST = "mock host";
	process.env.DB_PORT = "9999";
	process.env.DB_USER = "mock user";
	process.env.DB_PASSWORD = "mock password";
	process.env.DB_SCHEMA = "mock schema";
	process.env.DB_NAME = "mock db";

	beforeEach(() => {
		mockKnex.transaction = jest.fn().mockResolvedValueOnce(mockTransaction);
		(knex as object as jest.Mock).mockReturnValue(mockKnex);
		(readFileSync as jest.Mock).mockReturnValue(mockCertificate);
	});
	afterEach(() => {
		jest.resetAllMocks();
	});
	it("should return DB Client successfully", () => {
		jest.isolateModules(async () => {
			const { getDBClient } = require("./client");

			const client = await getDBClient("test");

			expect(knex).toHaveBeenCalledWith({
				client: "pg",
				connection: {
					database: "mock db",
					host: "mock host",
					password: "mock password",
					port: 9999,
					user: "mock user"
				},
				pool: {
					idleTimeoutMillis: 30000,
					min: 2,
					max: 10,
				},
			});
			expect(client).toEqual(mockClient);
			expect(mockKnex.on).toHaveBeenCalled();
		});
	});


	it("should be a singleton", () => {
		jest.isolateModules(async () => {
			const { getDBClient } = require("./client");

			await getDBClient( "test");
			await getDBClient( "test");
			await getDBClient( "test");

			expect(knex).toHaveBeenCalledTimes(1);
		});
	});
	it("should not use client certificate when environment is local", () => {
		jest.isolateModules(async () => {
			const { getDBClient } = require("./client");

			const client = await getDBClient(
				"test"
			);

			expect(knex).toHaveBeenCalledWith({
				client: "pg",
				connection: {
					database: "mock db",
					host: "mock host",
					password: "mock password",
					port: 9999,
					user: "mock user"
				},
				pool: {
					idleTimeoutMillis: 30000,
					min: 2,
					max: 10,
				},
			});
			expect(client).toEqual(mockClient);
			expect(mockKnex.on).toHaveBeenCalled();
		});
	});
	it("should close DB connection when an interrupt is sent", () => {
		jest.isolateModules(async () => {
			const { getDBClient } = require("./client");

			const client = await getDBClient( "test");

			process.emit("SIGINT");
			expect(client).toEqual(mockClient);
			expect(mockKnex.destroy).toHaveBeenCalled();
		});
	});
});
