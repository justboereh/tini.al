<script>
	import '../app.pcss';
	import { onMount } from 'svelte';
</script>

<slot />

<style>
	:global(h1) {
		@apply scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl;
	}

	:global(h2) {
		@apply mb-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0;
	}

	:global(h3) {
		@apply mt-8 scroll-m-20 text-2xl font-semibold tracking-tight;
	}
</style>
