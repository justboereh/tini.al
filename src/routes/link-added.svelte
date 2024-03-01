<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { mediaQuery, debounceClickAction } from 'svelte-legos';
	import { createEventDispatcher } from 'svelte';
	import { Rocket, Clipboard } from 'svelte-radix';
	import { set } from 'zod';

	const dispatch = createEventDispatcher();

	export let id: string = '';

	let copied = false;
	const isDesktop = mediaQuery('(min-width: 768px)');

	function OpenChange(...args: any) {
		console.log(...args);
	}
</script>

{#if $isDesktop}
	<Dialog.Root open={true} onOpenChange={OpenChange}>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Link Shortened</Dialog.Title>
				<Dialog.Description>
					The link have been shortened successfully. You can now share it with others. Note that the
					shorten link will expire in 30 days.
				</Dialog.Description>
			</Dialog.Header>

			<div class="flex items-center space-x-4 rounded-md border px-4 py-2">
				<div class="flex-1 space-y-1 text-sm">
					https://tini.si/{id}
				</div>

				<Button disabled={copied} variant="ghost" size={copied ? 'default' : 'icon'}>
					{#if copied}
						Copied
					{:else}
						<Clipboard
							size={16}
							on:click={() => {
								navigator.clipboard.writeText(`https://tini.si/${id}`);
								copied = true;

								setTimeout(() => (copied = false), 1000);
							}}
						/>
					{/if}
				</Button>
			</div>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root open={true} onClose={() => dispatch('close')}>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Link Shortened</Drawer.Title>
				<Drawer.Description>
					The link have been shortened successfully. You can now share it with others. Note that the
					shorten link will expire in 30 days.
				</Drawer.Description>
			</Drawer.Header>

			<div class="p-4 pb-16">
				<div class="flex items-center space-x-4 rounded-md border px-4 py-2">
					<div class="flex-1 space-y-1 text-sm">
						https://tini.si/{id}
					</div>

					<Button disabled={copied} variant="ghost" size={copied ? 'default' : 'icon'}>
						{#if copied}
							Copied
						{:else}
							<Clipboard
								size={16}
								on:click={() => {
									navigator.clipboard.writeText(`https://tini.si/${id}`);
									copied = true;

									setTimeout(() => (copied = false), 1000);
								}}
							/>
						{/if}
					</Button>
				</div>
			</div>
		</Drawer.Content>
	</Drawer.Root>
{/if}
