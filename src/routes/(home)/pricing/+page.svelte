<script lang="ts">
	import { Card, CardHeader, CardContent } from '$lib/components/ui/card';
	import { Tooltip, TooltipTrigger, TooltipContent } from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import { Check, Cross1 } from 'svelte-radix';
	import { cn } from '$lib/utils';

	const pricings = [
		{
			title: 'Free / No Account',
			price: '$0.00',
			pros: ['Unlimited links', 'Unlimited visits', 'Links deletion'],
			cons: [
				'Custom alias',
				'Custom domains',
				'Link editing',
				'Analytics',
				'API access',
				'Personalized support'
			]
		},
		{
			title: 'Basic',
			price: '$0.99',
			pros: ['Everything in Free', 'Custom links alias', 'Link editing'],
			cons: ['Custom domains', 'Analytics', 'API access', 'Personalized support']
		},
		{
			title: 'Pro',
			most_popular: true,
			price: '$4.99',
			pros: [
				'Everything in Basic',
				'Analytics (coming soon)',
				'Custom domains (coming soon)',
				'API access (coming soon)'
			],
			cons: ['Personalized support', 'Free humpback whale', 'X-ray vision']
		},
		{
			title: 'Teams',
			price: '$24.99',
			pros: ['Everything in Pro', 'Personalized Support'],
			cons: [
				'Access control',
				'A whole lot of nothing',
				'Seriously, nothing',
				'Free humpback whale',
				'X-ray vision'
			]
		}
	];
</script>

<div class="p-4">
	<div class="mx-auto max-w-5xl space-y-4">
		<h1 class="text-center">Simple, transparent pricing</h1>
		<p></p>

		<br />

		<div class="flex flex-col justify-center gap-8">
			{#each pricings as pricing}
				<Card class={cn('min-h-52')}>
					<div class="flex flex-col gap-8 p-8 md:flex-row">
						<div class="flex-grow">
							<h1 class="mb-4 flex items-center gap-4">
								<span class="text-2xl font-bold">{pricing.title}</span>

								{#if pricing.most_popular}
									<Tooltip openDelay={0}>
										<TooltipTrigger asChild let:builder>
											<Button
												builders={[builder]}
												size="sm"
												variant="link"
												class="rounded-full bg-yellow-700">Most Popular</Button
											>
										</TooltipTrigger>

										<TooltipContent>
											<p class="text-center">This is the most popular plan, trust me bro.</p>
										</TooltipContent>
									</Tooltip>
								{/if}
							</h1>

							<ul class="grid flex-grow grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
								{#each pricing.pros as feature}
									<li class="flex items-center gap-1">
										<Check />

										{feature}
									</li>
								{/each}

								{#each pricing.cons as feature}
									<li class="flex items-center gap-1 text-black/50 dark:text-white/50">
										<Cross1 size={16} class="mx-1" />

										{feature}
									</li>
								{/each}
							</ul>
						</div>

						<div class="flex min-h-36 flex-col items-center justify-between md:min-h-0">
							<div>
								<h1 class="text-center text-5xl font-bold">{pricing.price}</h1>
								<p class="text-center text-black/50 dark:text-white/50">billed monthly</p>
							</div>

							<Button
								variant={pricing.title === 'Pro' ? 'default' : 'outline'}
								size="lg"
								class="w-full"
							>
								Get Started
							</Button>
						</div>
					</div>
				</Card>
			{/each}
		</div>
	</div>
</div>
