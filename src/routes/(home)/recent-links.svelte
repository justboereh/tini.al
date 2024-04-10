<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Reader, Update } from 'svelte-radix';
	import RecentLinksItem from './recent-links-item.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import type { Link } from '$lib/types';
	import { ofetch } from 'ofetch';
	import { toast } from 'svelte-sonner';

	let links: Link[] = [];
	let open = false;
	let fetchingLinks = false;

	$: if (open) {
		FetchLinks();
	}

	async function FetchLinks() {
		if (fetchingLinks) return;
		fetchingLinks = true;
		links = [];

		links = await ofetch('/api/links', {
			method: 'POST',
			onResponseError() {
				toast.error('An error occurred while fetching links');
			}
		});

		fetchingLinks = false;
	}
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger asChild let:builder>
		<Button
			variant="ghost"
			class="fixed bottom-4 left-1/2 -translate-x-1/2 transform"
			builders={[builder]}
		>
			<Reader class="mr-2 h-4 w-4" />

			Recent Links
		</Button>
	</Sheet.Trigger>

	<Sheet.Content side="right">
		<div class="flex h-full flex-col">
			<Sheet.Header>
				<Sheet.Title>
					<Button
						class="mr-2"
						variant="ghost"
						size="icon"
						disabled={fetchingLinks}
						on:click={async () => FetchLinks()}
					>
						<Update size={16} class={fetchingLinks ? 'animate-spin' : ''} />
					</Button>
					Recent Links</Sheet.Title
				>
				<Sheet.Description>
					This is a list of your recent links. You can click on any of them to view more details.
					All links will expire in 30 days after creation unless you have at least a premium
					account.
				</Sheet.Description>
			</Sheet.Header>

			<div class="flex-grow space-y-4 overflow-auto py-4">
				{#each links.sort((a, b) => b.created - a.created) as link}
					<RecentLinksItem {link} on:refresh={() => FetchLinks()} />
				{/each}

				{#if fetchingLinks}
					<p class="grid h-full place-items-center text-center text-black/50 dark:text-white/50">
						Fetching links...
					</p>
				{:else if links.length < 1}
					<p class="grid h-full place-items-center text-center text-black/50 dark:text-white/50">
						No links found
					</p>
				{/if}
			</div>
		</div>
	</Sheet.Content>
</Sheet.Root>
