export async function opfsFileExists(opfsRoot: FileSystemDirectoryHandle, fileName: string) {
	try {
		await opfsRoot.getFileHandle(fileName);
	} catch {
		// File doesn't exist
		return false;
	}

	// File exists
	return true;
}

export async function writeBinaryToOPFS(
	opfsRoot: FileSystemDirectoryHandle,
	fileName: string,
	data: ArrayBuffer
) {
	const fileHandle = await opfsRoot.getFileHandle(fileName, { create: true });
	const writable = await fileHandle.createWritable();
	await writable.write(data);
	await writable.close();
}
