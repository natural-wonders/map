<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import { opfsFileExists, writeBinaryToOPFS } from '$lib/fs/opfs';
	import { downloadFile } from '$lib/fs/fetch';

	onMount(async () => {
		const dbName = import.meta.env.VITE_DB_NAME;

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
	});
</script>

<AppShell>
	<svelte:fragment slot="pageHeader">
		<AppBar class="bg-primary-500">Natural Wonders</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
