export async function opfsFileExists(fileName: string) {
	const opfsRoot = await navigator.storage.getDirectory();
	try {
		await opfsRoot.getFileHandle(fileName);
	} catch {
		// File doesn't exist
		return false;
	}

	// File exists
	return true;
}

export async function writeBinaryToOPFS(fileName: string, data: ArrayBuffer) {
	const opfsRoot = await navigator.storage.getDirectory();
	const fileHandle = await opfsRoot.getFileHandle(fileName, { create: true });
	const writable = await fileHandle.createWritable();
	await writable.write(data);
	await writable.close();
	console.log(`Data written to OPFS file: ${fileName}`);
}

// To delete
// await opfsRoot.removeEntry(dbName, {recursive: true});
