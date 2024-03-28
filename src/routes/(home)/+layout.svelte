<script lang="ts">
	import { HamburgerMenu } from 'svelte-radix';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ExternalLink } from 'svelte-radix';

	const navigationLinks = [
		{ label: 'About', href: '/about' },
		{ label: 'Github', href: 'https://github.com/justboereh/tini.si', target: '_blank' },
		{ label: 'Pricing', href: '/pricing' },
		{ label: 'Account', href: '/account' }
	];
</script>

<div class="p-4">
	<div class="relative mx-auto flex h-10 max-w-7xl items-center justify-center">
		<div class="min-w-content grid gap-4 sm:grid-cols-5">
			<a href="/about" class="hidden place-items-center sm:grid">
				<Button variant="link">About</Button>
			</a>

			<a href="https://github.com/justboereh/tini.si" class="hidden place-items-center sm:grid">
				<Button variant="link">
					Github

					<ExternalLink class="ml-2" size={14} />
				</Button>
			</a>

			<a href="/" class="tinial-logo place-items-center font-bold hover:underline sm:grid">
				tini.si
			</a>

			<a href="/pricing" class="hidden place-items-center sm:grid">
				<Button variant="link">Pricing</Button>
			</a>

			<a href="/account" class="hidden place-items-center sm:grid">
				<Button variant="link">Account</Button>
			</a>
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
						{#each navigationLinks as { label, href, target }}
							<DropdownMenu.Item {href} {target}>
								{label}

								{#if target}
									<ExternalLink class="ml-2" size={14} />
								{/if}
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</div>

<slot />

<Toaster />

<style>
	.tinial-logo {
		font-family: 'Poppins', sans-serif;
	}

	:global(.h-screen-nav) {
		height: calc(100vh - 5rem);
	}
</style>
