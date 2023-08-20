export async function downloadFile(fileUrl: string): Promise<ArrayBuffer> {
	try {
		const response = await fetch(fileUrl);
		if (!response.ok) {
			throw new Error(`Failed to download file: ${fileUrl}`);
		}
		const arrayBuffer = await response.arrayBuffer();
		return arrayBuffer;
	} catch (error) {
		console.error(error);
		console.error('Error downloading file: ', fileUrl);
		throw error;
	}
}
