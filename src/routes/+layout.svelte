<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="pageHeader">
		<AppBar class="bg-primary-500">Natural Wonders</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
