<script lang="ts">
	import { type Storage } from 'unstorage';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input/index';
	import { Clipboard, DotsVertical, Trash } from 'svelte-radix';
	import type { Link } from '$lib/types';
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import relative from 'dayjs/plugin/relativeTime';
	import { clickOutsideAction } from 'svelte-legos';
	import { safeParse } from 'valibot';
	import { idSchema } from '$lib/links';
	import { ofetch } from 'ofetch';
	import { toast } from 'svelte-sonner';

	dayjs.extend(utc);
	dayjs.extend(relative);

	export let link: Link;
	let isEditingID = false;
	let linkID = link.id;
	let input: any;

	async function UpdateLinkID() {
		isEditingID = false;

		if (linkID === link.id) return;
		if (!linkID || !safeParse(idSchema, linkID).success) return (linkID = link.id);

		try {
			await ofetch<string>(`/api/links/${link.id}`, {
				method: 'PATCH',
				body: { id: linkID }
			});
		} catch (e) {
			toast.error('An error occurred while updating the link ID');
			linkID = link.id;
		}
	}
</script>

<div
	class="flex w-full max-w-full items-center space-x-4 overflow-hidden rounded-md border px-4 py-2 pt-4"
>
	<div class="max-w-full flex-grow space-y-1 overflow-hidden text-ellipsis text-sm">
		<div class="flex justify-between">
			<div>
				<p class="flex gap-0">
					{#if isEditingID === true}
						<div use:clickOutsideAction={UpdateLinkID}>
							<Input
								bind:node={input}
								bind:value={linkID}
								on:blur={() => UpdateLinkID()}
								on:keypress={(event) => {
									if (event.key !== 'Enter') return;

									isEditingID = false;
								}}
							/>
						</div>
					{:else}
						tini.si/{linkID}
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
							<DotsVertical size={16} />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item on:click={async () => (isEditingID = true)}>
								<Trash size={16} class="mr-2" />
								Edit
							</DropdownMenu.Item>

							<DropdownMenu.Item
								on:click={() => {
									navigator.clipboard.writeText(`https://tini.si/${link.id}`);
								}}
							>
								<Clipboard size={16} class="mr-2" />

								Copy
							</DropdownMenu.Item>

							<DropdownMenu.Item
								on:click={async () => {
									try {
										await ofetch(`/api/links/${link.id}`, {
											method: 'DELETE'
										});
									} catch (e) {
										toast.error('An error occurred while deleting the link');
									}
								}}
							>
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
