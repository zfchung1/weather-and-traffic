import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(`${process.env.DB_SCHEMA}`)
		.createTable("search_record", (table) => {
			table.increments("id").primary();
			table.dateTime("search_date").index();
			table.string("location", 255).index();
			table.string("camera_id", 255).index();
			table.timestamps({ useTimestamps: true, defaultToNow: true });
		});
}


export async function down(knex: Knex): Promise<void> {
}

