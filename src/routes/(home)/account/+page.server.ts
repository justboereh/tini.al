import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { accountSchema } from './schema';

export async function load(event) {
	const session = await event.locals.auth();

	if (!session) return redirect(301, '/auth');

	return {
		user: session.user,
		accountForm: await superValidate(
			valibot(accountSchema, {
				defaults: {
					email: session.user?.email || '',
					username: session.user?.name || ''
				}
			})
		)
	};
}

export const actions = {
	default: async (event) => {
		const session = await event.locals.auth();

		if (!session) return redirect(301, '/auth');

		const accountForm = await superValidate(event, valibot(accountSchema));

		if (!accountForm.valid) {
			return fail(400, {
				user: session.user,
				accountForm
			});
		}

		return {
			user: session.user,
			accountForm
		};
	}
};
