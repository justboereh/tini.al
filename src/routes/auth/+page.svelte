<script lang="ts">
	import { SignIn, SignOut } from '@auth/sveltekit/components';

	type Data = {
		auth?: {
			user: {
				name: string;
				image: string;
			};
		};
	};

	export let data: Data;
</script>

<h1>SvelteKit Auth Example</h1>
<p>
	{#if data.auth}
		{#if data.auth.user.image}
			<span style="background-image: url('{data.auth.user.image}')" class="avatar" />
		{/if}
		<span class="signedInText">
			<small>Signed in as</small><br />
			<strong>{data.auth.user.name ?? 'User'}</strong>
		</span>
		<SignOut />
	{:else}
		<span class="notSignedInText">You are not signed in</span>
		<SignIn provider="github" />
	{/if}
</p>

{JSON.stringify(data, null, 2)}
