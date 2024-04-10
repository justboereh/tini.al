<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input/index';
	import { Clipboard, DotsVertical, Trash, Loop } from 'svelte-radix';
	import type { Link } from '$lib/types';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import relative from 'dayjs/plugin/relativeTime';
	import { clickOutsideAction } from 'svelte-legos';
	import { safeParse } from 'valibot';
	import { idSchema } from '$lib/links';
	import { ofetch } from 'ofetch';
	import { toast } from 'svelte-sonner';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ refresh: void }>();

	dayjs.extend(utc);
	dayjs.extend(relative);

	export let link: Link;
	let state: 'deleting' | 'editing' | null = null;
	let link_id = link.id;
	let input: any;

	async function Updatelink_id() {
		state = null;

		if (link_id === link.id) return;

		const linkParsed = safeParse(idSchema, link_id);
		if (!link_id || !linkParsed.success) {
			toast.error((linkParsed.issues || [{ message: 'Unknown error' }])[0].message);
			link_id = link.id;

			return;
		}

		try {
			await ofetch<string>(`/api/links/${link.id}`, {
				method: 'PATCH',
				body: { id: link_id }
			});

			toast.success(
				'Link ID updated successfully. Please wait a few seconds for the changes to take effect.'
			);
		} catch (e: any) {
			toast.error('An error occurred while updating the link ID');

			console.log(e);

			link.id = link_id;
		}
	}

	async function DeleteLink() {
		if (state === 'deleting') return;
		state = 'deleting';

		try {
			await ofetch(`/api/links/${link.id}`, {
				method: 'DELETE'
			});

			dispatch('refresh');

			toast.success('Link deleted successfully');
		} catch (e) {
			toast.error('An error occurred while deleting the link');
		}

		state = null;
	}
</script>

<div
	class="flex w-full max-w-full items-center space-x-4 overflow-hidden rounded-md border px-4 py-2 pt-4"
>
	<div class="max-w-full flex-grow space-y-1 overflow-hidden text-ellipsis text-sm">
		<div class="flex justify-between">
			<div>
				<p class="flex gap-0">
					{#if state === 'editing'}
						<div use:clickOutsideAction={Updatelink_id}>
							<Input
								bind:node={input}
								bind:value={link_id}
								on:blur={() => Updatelink_id()}
								on:keypress={(event) => {
									if (event.key !== 'Enter') return;

									state = null;
								}}
							/>
						</div>
					{:else}
						tini.si/{link_id}
					{/if}
				</p>

				<p class=" text-black/50 dark:text-white/50">
					{dayjs.utc(link.created * 1000).fromNow()}
				</p>
			</div>

			<div>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button variant="ghost" size="icon">
							{#if state !== null}
								<Loop size={16} class="animate-spin" />
							{:else}
								<DotsVertical size={16} />
							{/if}
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item on:click={async () => (state = 'editing')}>
								<Trash size={16} class="mr-2" />
								Edit
							</DropdownMenu.Item>

							<DropdownMenu.Item
								on:click={() => {
									navigator.clipboard.writeText(`https://tini.si/${link_id}`);
								}}
							>
								<Clipboard size={16} class="mr-2" />

								Copy
							</DropdownMenu.Item>

							<DropdownMenu.Item on:click={async () => DeleteLink()}>
								<Trash size={16} class="mr-2" />
								Delete
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>

		<span class="max-w-full overflow-auto whitespace-nowrap pb-2 text-black/50 dark:text-white/50">
			{link.location}
		</span>
	</div>
</div>
