<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { page } from '$app/stores';
	import { Exit } from 'svelte-radix';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import Profile from './profile.svelte';

	export let data: PageData;

	async function SignOut() {
		await signOut({});

		goto('/auth');
	}
</script>

<svelte:head>
	<title>Account - tini.si</title>
</svelte:head>

<div class="p-4">
	<div class="mx-auto max-w-5xl space-y-4">
		<h3>Profile</h3>

		<Profile form={data.accountForm} />

		<Card>
			<CardContent>
				<div class="grid min-h-40 place-items-center">
					<Button variant="default">Add payment method</Button>
				</div>
			</CardContent>
		</Card>

		<h3>Danger Zone</h3>

		<Card>
			<CardContent>
				<Button variant="outline" on:click={() => SignOut()}>
					<Exit class="mr-2 h-4 w-4" />

					Sign out
				</Button>
			</CardContent>
		</Card>
	</div>
</div>
