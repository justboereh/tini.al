<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	const features = [
		{
			title: 'Custom Alias',
			description:
				'Create a custom alias for your short URL. You can use any combination of letters, numbers, and dashes.'
		},
		{
			title: 'Expiration Date',
			description:
				'Set an expiration date for your short URL. After the expiration date, the short URL will no longer work.'
		},
		{
			title: 'Analytics (Coming Soon)',
			description:
				'View detailed analytics for your short URL. Track the number of clicks, referrers, devices, and more.'
		},
		{
			title: 'QR Code (Coming Soon)',
			description:
				'Generate a QR code for your short URL. Share the QR code on social media, print it on business cards, and more.'
		},
		{
			title: 'API Access (Coming Soon)',
			description:
				'Access the tini.si API to create, update, and delete short URLs programmatically. Integrate tini.si with your app or service.'
		},
		{
			title: 'Custom Domain (Coming Soon)',
			description:
				'Use a custom domain for your short URLs. Point your domain to tini.si and create short URLs with your own domain.'
		}
	];
</script>

<svelte:head>
	<title>About - tini.si</title>
</svelte:head>

<div class="p-4">
	<div class="mx-auto max-w-5xl space-y-4">
		<h1 class="text-center">Elegant URL Shortener</h1>

		<p class="text-center">
			tini.si is a URL shortener service. It is a paid and open source project. That's literally it.
			Why is it called tini.si? Because it's tiny. And it's a .si domain. Get it? It's a pun. It's a
			good pun. It's a great pun. It's a pun that's so good, it's tini. It's tini.si. It's a great
			pun. It's a great domain. It's a great service. It's a great project. It's tini.si. You are
			the only tin-i-si. Copilot wrote the middle half. I wrote the rest. I'm not a good writer. It
			also wrote the two sentences before this one.
		</p>

		<br />

		<h3 class="text-center">Features</h3>

		<div class="grid gap-4 sm:grid-cols-2 md:gap-8">
			{#each features as feature}
				<Card.Root>
					<Card.Header>
						<Card.Title class="mt-0">{feature.title}</Card.Title>
					</Card.Header>

					<Card.Content>
						<Card.Description>{feature.description}</Card.Description>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>
</div>
