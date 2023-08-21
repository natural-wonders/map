<script lang="ts">
	import { onMount } from 'svelte';

	import GleoMap from 'gleo/src/CartesianMap.mjs';
	import Geometry from 'gleo/src/geometry/Geometry.mjs';
	import LngLat from 'gleo/src/geometry/LngLat.mjs';

	import { getMapWonders } from '$lib/db/get';

	let wonders: Array<Record<string, any>> = [];

	onMount(async () => {
		wonders = await getMapWonders();

		// Gleo Map
		const map = (window.map = new GleoMap('gleomap', {}));
		map.center = [0, 0];
		map.span = 1.3;
	});
</script>

<div id="gleomap" style="width: calc(100vw - 16px); height: 80vh; display: inline-block"></div>
