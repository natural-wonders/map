<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { SQLocal } from 'sqlocal';

	import { opfsFileExists, writeBinaryToOPFS } from '$lib/fs/opfs';
	import { downloadFile } from '$lib/fs/fetch';

	onMount(async () => {
		const dbName = 'nwm.sqlite3';

		// Get OPFS filesystem, check DB exists
		const opfsRoot = await navigator.storage.getDirectory();

		// To delete
		// await opfsRoot.removeEntry(dbName, {recursive: true});

		const dbExists = await opfsFileExists(opfsRoot, dbName);
		if (!dbExists) {
			// Place online DB in OPFS
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
