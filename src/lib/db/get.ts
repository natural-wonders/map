import { queryDb } from '$lib/db';

export async function getMapWonders() {
	return await queryDb(`
        SELECT name, type, json_array(lon, lat)
        AS coord FROM naturalwonders;
    `);
}

export async function getAllWonders() {
	return await queryDb(`
        SELECT * FROM naturalwonders;
    `);
}
