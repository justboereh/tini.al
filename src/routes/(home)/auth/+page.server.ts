import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const auth = await event.locals.auth();
	const redirectTo = event.url.searchParams.get('redirect');

	if (auth && redirectTo) throw redirect(301, redirectTo);
	else if (auth) throw redirect(301, '/account');
}
