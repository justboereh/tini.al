<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { mediaQuery } from 'svelte-legos';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id: string = '';

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');

	function OpenChange(...args: any) {
		console.log(...args);
	}
</script>

{#if $isDesktop}
	<Dialog.Root open={true} onOpenChange={OpenChange}>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Edit profile</Dialog.Title>
				<Dialog.Description>
					Make changes to your profile here. Click save when you're done.
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root open={true} onClose={() => dispatch('close')}>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Edit profile</Drawer.Title>
				<Drawer.Description>
					Make changes to your profile here. Click save when you're done.
				</Drawer.Description>
			</Drawer.Header>

			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Okay</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
