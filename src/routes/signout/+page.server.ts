import { signOut } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
export const actions: Actions = { default: signOut };

export const load: PageServerLoad = async (event) => {
	const auth = await event.locals.auth();

	if (!auth) throw redirect(301, '/auth');

	throw redirect(301, '/');
};
