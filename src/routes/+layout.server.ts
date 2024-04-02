import { nanoid } from 'nanoid';
import { dev } from '$app/environment';

export async function load({ cookies, locals }) {
	const session = await locals.auth();

	if (!session && !cookies.get('tinisi-hashid')) {
		cookies.set('tinisi-hashid', nanoid(64), {
			path: '/',
			sameSite: 'lax',
			secure: !dev,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
		});
	}
}
