<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { SQLocal } from 'sqlocal';

	async function opfsFileExists(opfsRoot: FileSystemDirectoryHandle, fileName: string) {
		try {
			await opfsRoot.getFileHandle(fileName);
		} catch {
			// File doesn't exist
			return false;
		}

		// File exists
		return true;
	}

	async function downloadFile(fileUrl: string): Promise<ArrayBuffer> {
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

	async function writeBinaryToOPFS(
		opfsRoot: FileSystemDirectoryHandle,
		fileName: string,
		data: ArrayBuffer
	) {
		const fileHandle = await opfsRoot.getFileHandle(fileName, { create: true });
		const writable = await fileHandle.createWritable();
		await writable.write(data);
		await writable.close();
	}

	onMount(async () => {
		const dbName = 'nwm.sqlite3';

		// Get OPFS filesystem, check DB exists
		const opfsRoot = await navigator.storage.getDirectory();
		const dbExists = await opfsFileExists(opfsRoot, dbName);

		// To delete
		// await opfsRoot.removeEntry(dbName, {recursive: true});

		if (!dbExists) {
			// Download SQLite file hosted online
			const existingDb = await downloadFile(`./${dbName}`);
			await writeBinaryToOPFS(opfsRoot, dbName, existingDb);
		}

		// Connect to DB
		const { sql } = new SQLocal(dbName);
		const query = await sql`SELECT * FROM naturalwonders;`;
		console.log(query);
	});
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="sidebarLeft">
		<nav class="list-nav">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/about">About</a></li>
			</ul>
		</nav>
	</svelte:fragment>
	<slot />
</AppShell>
