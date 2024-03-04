<script>
	import { page } from '$app/stores';
	import Layout from './(home)/+layout.svelte';
</script>

<Layout>
	<h1>{$page.status}whattt: {$page.error?.message}</h1>
</Layout>
