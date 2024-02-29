<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { ofetch } from 'ofetch';
	import { Rocket } from 'radix-icons-svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	let input: string | undefined;
	let alias: string | undefined;
	let added: string | undefined;
	let input_error = '';

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

		const res = await ofetch<string>('/api/link', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: input, alias })
		});

		console.log(res);
	}
</script>

<svelte:head>
	<title>tini.al</title>
</svelte:head>

<div class="fixed bottom-0 left-0 right-0 top-0 flex flex-col">
	<div class="grid flex-grow place-items-center p-4">
		<form class="mx-auto flex w-full max-w-lg gap-4" on:submit|preventDefault={Shorten}>
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

			<Button type="submit" disabled={!canShorten} color="blue" size="icon">
				<Rocket />
			</Button>
		</form>
	</div>
</div>

<div class="fixed top-0 w-full p-4">
	<div class="mx-auto flex max-w-7xl justify-center">
		<h1 class="tinial-logo text-4xl font-bold">tini.al</h1>
	</div>
</div>

<Dialog.Root open={true}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit profile</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>

<style>
	.tinial-logo {
		font-family: 'Poppins', sans-serif;
	}
</style>
