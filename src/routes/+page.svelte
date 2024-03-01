<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { ofetch } from 'ofetch';
	import { Rocket, HamburgerMenu, Reload } from 'radix-icons-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { toast } from 'svelte-sonner';
	import { Toaster } from '$lib/components/ui/sonner';
	import LinkAdded from './link-added.svelte';

	const links = [
		{ label: 'About', href: '/about' },
		{ label: 'Github', href: 'https://github.com/justboereh/tini.si' },
		{ label: 'Pricing', href: '/pricing' },
		{ label: 'Account', href: '/account' }
	];

	let input: string | undefined;
	let alias: string | undefined;
	let added: string | undefined;
	let isShortening = false;
	let input_error = '';
	let shorten_error = '';

	$: canShorten = input !== undefined && input.length > 0 && input_error.length < 1;

	$: {
		input_error = '';

		if (input !== undefined && input.trim() === '') {
			input_error = 'URL is required';
		} else if (input !== undefined) {
			try {
				new URL(input);
			} catch (error) {
				input_error = 'Invalid URL';
			}
		}
	}

	async function Shorten() {
		if (!input) return;
		if (!canShorten) return;
		if (isShortening) return;

		isShortening = true;
		added = undefined;
		shorten_error = '';

		added = await ofetch<string>('/api/link', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: input, alias }),
			onResponseError() {
				toast.error('An error occurred while shortening the URL');
			}
		});

		isShortening = false;
		input = undefined;
	}
</script>

<svelte:head>
	<title>tini.si</title>
</svelte:head>

<div class="pointer-events-none fixed bottom-0 left-0 right-0 top-0 flex flex-col">
	<div class="grid flex-grow place-items-center p-4">
		<form
			class="pointer-events-auto mx-auto flex w-full max-w-lg gap-4"
			on:submit|preventDefault={Shorten}
		>
			<div class="relative flex-grow">
				<Input bind:value={input} placeholder="URL to be shorten" />

				{#if input_error}
					<div class="absolute p-2 text-sm text-red-500">{input_error}</div>
				{/if}
			</div>

			<!-- <div class="flex items-center gap-1">
				<span>https://tini.al/</span>

				<Input placeholder="Custom alias (optional)" />
			</div> -->

			<Button type="submit" disabled={!canShorten || isShortening} color="blue" size="icon">
				{#if isShortening}
					<Reload class="animate-spin" />
				{:else}
					<Rocket />
				{/if}
			</Button>
		</form>
	</div>
</div>

<div class="fixed top-0 w-full p-4">
	<div class="relative mx-auto flex max-w-7xl justify-center">
		<div class="min-w-content grid gap-4 sm:grid-cols-5">
			{#each links.slice(0, 2) as { label, href }}
				<a {href} class="hidden place-items-center sm:grid">
					<Button variant="link">{label}</Button>
				</a>
			{/each}

			<a href="/" class="tinial-logo text-4xl font-bold">tini.si</a>

			{#each links.slice(2, 4) as { label, href }}
				<a {href} class="hidden place-items-center sm:grid">
					<Button variant="link">{label}</Button>
				</a>
			{/each}
		</div>

		<div class="absolute right-0 sm:hidden">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button variant="outline" size="icon">
						<HamburgerMenu />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						{#each links as { label, href }}
							<DropdownMenu.Item {href}>{label}</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</div>

<Toaster />

{#if added}
	<LinkAdded
		id={added}
		on:close={() => {
			added = undefined;
		}}
	/>
{/if}

<style>
	.tinial-logo {
		font-family: 'Poppins', sans-serif;
	}
</style>
