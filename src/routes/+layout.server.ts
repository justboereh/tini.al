import { sha256 } from 'ohash';
import { nanoid } from 'nanoid';
import { dev } from '$app/environment';

const HASH_NAME = 'tinisi-hash';

export function load({ cookies }) {
	if (!cookies.get(HASH_NAME))
		cookies.set(HASH_NAME, sha256(nanoid()), {
			path: '/',
			sameSite: 'lax',
			secure: !dev,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
		});
}
