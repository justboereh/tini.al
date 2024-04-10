<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Tooltip, TooltipTrigger, TooltipContent } from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$lib/components/ui/accordion';
	import { Check, Cross1 } from 'svelte-radix';
	import { cn } from '$lib/utils';
	import { pricings } from '$lib/pricings';

	const FAQs = [
		{
			id: 'refunds',
			question: 'Do you offer refunds?',
			answer:
				'Yes, we offer refunds excluding fees if: It is requested within 7 days of billing cycle and the account has not been used to abuse our services.'
		},
		{
			id: 'cancel',
			question: 'Can I cancel my subscription?',
			answer:
				'Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of the billing cycle.'
		},
		{
			id: 'change',
			question: 'Can I change my plan?',
			answer:
				'Yes, you can change your plan at any time. The changes will take effect immediately and you will be charged or refunded the difference.'
		},
		{
			id: 'payment',
			question: 'What payment methods do you accept?',
			answer:
				'We accept all major credit and debit cards. We also accept PayPal, Apple Pay, Google Pay, and other payment methods.'
		},
		{
			id: 'tax',
			question: 'Do you charge tax?',
			answer:
				'Yes, we charge tax based on your location. The tax amount will be displayed during the checkout process and is handle by Stripe.'
		},
		{
			id: 'trial',
			question: 'Do you offer a free trial?',
			answer: 'No, I do not offer any free trial because I am broke and bad with finance.'
		},
		{
			id: 'open-source',
			question: 'Is this project open-source?',
			answer:
				'Yes, this project is open-source and available on GitHub at https://github.com/justboereh/tini.si. You can use it for free and contribute to the project if you want.'
		}
	];
</script>

<svelte:head>
	<title>Pricing - tini.si</title>
</svelte:head>

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
												class="rounded-full bg-yellow-700 text-white"
											>
												Most Popular
											</Button>
										</TooltipTrigger>

										<TooltipContent>
											<p class="text-center">source: trust me bro.</p>
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

		<br />

		<h3 class="text-center">Never Asked Questions</h3>

		<Accordion>
			{#each FAQs as { id, question, answer }}
				<AccordionItem value={id}>
					<AccordionTrigger>
						{question}
					</AccordionTrigger>

					<AccordionContent>{answer}</AccordionContent>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
</div>
