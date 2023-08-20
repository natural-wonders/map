<script lang="ts">
	import { onMount } from 'svelte';
	import { SQLocal } from 'sqlocal';

	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';

	// let mapWonders: Array<Record<string, any>> = []
	let allWonders: Array<Record<string, any>> = [];
	$: nwmTable = {
		head: ['Name', 'Tier', 'Type', 'Country'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(allWonders, ['name', 'tier', 'type', 'country']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(allWonders, ['lat', 'lon', 'elev']),
		foot: ['Total', '', `<code class="${allWonders.length}">5</code>`]
	};

	onMount(async () => {
		// Connect to DB
		const { sql } = new SQLocal(import.meta.env.VITE_DB_NAME);
		// mapWonders = await sql`
		// 	SELECT name, type, json_array(lon, lat)
		// 	AS coord FROM naturalwonders;
		// `;
		allWonders = await sql`SELECT * FROM naturalwonders;`;
	});
</script>

<div class="card p-4">
	<!-- <ul>
		{#each allWonders as wonder, index}
		{/each}
	</ul> -->
	<Table source={nwmTable} />
</div>
