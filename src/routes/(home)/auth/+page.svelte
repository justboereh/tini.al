<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { Button } from '$lib/components/ui/button';
	import { GithubLogo, OpenInNewWindow, ArrowTopRight } from 'svelte-radix';
</script>

<svelte:head>
	<title>Authentication - tini.si</title>
</svelte:head>

<div class="h-screen-nav flex flex-col items-center justify-center gap-8">
	<Button on:click={() => signIn('github')}>
		<GithubLogo class="mr-2 h-4 w-4" />

		Continue with Github
	</Button>

	<p class="text-center">
		By clicking "Continue with GitHub", you agree to our
		<Button href="/terms" target="_blank" variant="link" class="px-0 text-blue-500">
			Terms of Service
			<ArrowTopRight class="h-4 w-4" />
		</Button> and
		<Button href="/privacy" target="_blank" variant="link" class="px-0 text-blue-500">
			Privacy Policy
			<ArrowTopRight class="h-4 w-4" />
		</Button>.
	</p>
</div>
