<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm as _superForm } from 'sveltekit-superforms';
	import { accountSchema } from './schema.js';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import Error from '../../+error.svelte';

	export let form: SuperValidated<Infer<typeof accountSchema>>;

	const superForm = _superForm(form, {
		validators: valibotClient(accountSchema)
	});

	const { form: formData, enhance } = superForm;
</script>

<Card>
	<CardContent>
		<form method="POST" use:enhance class="space-y-4 pt-4">
			<Form.Field form={superForm} name="username">
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>

					<Input {...attrs} bind:value={$formData.username} />
				</Form.Control>
				<Form.Description>
					This is your display name. There is a non-100% chance no one will see this.
				</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field form={superForm} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>

					<Input {...attrs} value={$formData.email} disabled />
					<Form.Description>
						Your email address that was used when you logged in with Github.
					</Form.Description>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button>Submit</Form.Button>
		</form>
	</CardContent>
</Card>
