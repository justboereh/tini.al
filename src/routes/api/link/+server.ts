import { db } from '$lib/server/db.js';
import { links } from '$lib/server/db.schema.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { eq } from 'drizzle-orm';
import { error, text } from '@sveltejs/kit';
import {} from '@auth/sveltekit';
import { sha256 } from 'ohash';

dayjs.extend(utc);

export async function POST({ request, cookies, locals }) {
	const body = (await request.json()) as { url: string; alias?: string };
	const url = body.url;
	const alias = (body.alias || '').trim();
	const session = await locals.auth();
	const hash = cookies.get('tinisi-hash');

	if (!hash && (!session || !session.user?.id)) return error(401, 'Unauthorized');
	if (url.trim() === '') return text('URL is required', { status: 400 });
	if (alias.length > 0 && !session?.user)
		return error(400, 'Cannot use alias without being logged in');
	if (alias.length > 0 && !/^[a-zA-Z0-9_-]+$/.test(alias)) return error(400, 'Invalid alias');
	if (alias.length > 32) return error(400, 'Alias too long');
	if (url.length < 4) return error(400, 'URL too short');

	try {
		new URL(url.trim());
	} catch (e) {
		return text('Invalid URL', { status: 400 });
	}

	const existing = await db.select({ id: links.id }).from(links).where(eq(links.location, url));

	if (existing.length > 0) return text(existing[0].id, { status: 200 });

	try {
		const id = nanoid(9);
		const user_id = session?.user?.id;

		await db.insert(links).values({
			id: session?.user && alias ? alias : id,
			location: url.trim(),
			created: dayjs.utc().unix(),
			hash: user_id ? sha256(user_id) : (hash as string)
		});

		return text(id, { status: 201 });
	} catch (e) {
		return error(400, 'Error creating link');
	}
}

export async function DELETE({ locals }) {
	const session = await locals.auth();

	if (!session || !session.user?.id) return error(401, 'Unauthorized');
}

export async function PATCH({ locals }) {
	const session = await locals.auth();

	if (!session || !session.user?.id) return error(401, 'Unauthorized');
}
