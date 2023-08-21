<script lang="ts">
	import { onMount } from 'svelte';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';

	import { getAllWonders } from '$lib/db/get';

	let wonders: Array<Record<string, any>> = [];
	onMount(async () => {
		wonders = await getAllWonders();
	});

	$: nwmTable = {
		head: ['Name', 'Tier', 'Type', 'Country'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(wonders, ['name', 'tier', 'type', 'country']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(wonders, ['lat', 'lon', 'elev']),
		foot: ['Total', '', `<code class="${wonders.length}">5</code>`]
	};
</script>

<div class="card p-4">
	<Table source={nwmTable} />
</div>
