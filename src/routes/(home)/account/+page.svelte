<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { page } from '$app/stores';
	import { Exit } from 'svelte-radix';
</script>

<div class="p-4">
	<div class="mx-auto max-w-2xl space-y-4">
		<p>
			{$page.data.session?.user?.name} •
			<span class="md-3 text-foreground/50">{$page.data.session?.user?.email}</span>
		</p>

		<h3>Payment Method</h3>

		<Card.Root>
			<Card.Content class="Content">
				<div class="grid min-h-40 place-items-center">
					<Button variant="default">Add payment method</Button>
				</div>
			</Card.Content>
		</Card.Root>

		<h3>Danger Zone</h3>

		<Button variant="destructive">
			<Exit class="mr-2 h-4 w-4" />
			Sign out
		</Button>
	</div>
</div>
