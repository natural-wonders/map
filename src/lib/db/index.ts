import { SQLocal } from 'sqlocal';

import { opfsFileExists, writeBinaryToOPFS } from '$lib/fs/opfs';
import { downloadFile } from '$lib/fs/fetch';

async function loadDbIntoOPFS() {
	// Place online DB in OPFS
	console.log('Recreating DB on OPFS: nwm.sqlite3');
	const dbUrl = new URL('$static/nwm.sqlite3', import.meta.url).href;
	const dbData = await downloadFile(dbUrl);
	if (dbData) {
		await writeBinaryToOPFS('nwm.sqlite3', dbData);
	} else {
		console.warn('OPFS DB not created, app will not function');
		return false;
	}
	return true;
}

export async function initDb() {
	const dbExists = await opfsFileExists('nwm.sqlite3');
	if (!dbExists) {
		return await loadDbIntoOPFS();
	}
	return true;
}

export async function queryDb(query: string) {
	const dbReady = await initDb();
	if (dbReady) {
		const { sql } = new SQLocal('nwm.sqlite3');
		return await sql([query], ['']);
	} else {
		console.error('Failed to init DB');
		return [];
	}
}
