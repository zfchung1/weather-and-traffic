import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex("search_record").insert([
		{ search_date: "2024-05-15 22:30:00.000 +0800", location: "Bedok",  camera_id: "3793"}
	]);
}


export async function down(knex: Knex): Promise<void> {
}

