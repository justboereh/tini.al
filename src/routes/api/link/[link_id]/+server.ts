import { db } from '$lib/server/db.js';
import { links } from '$lib/server/db.schema.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { and, eq } from 'drizzle-orm';
import { error, text } from '@sveltejs/kit';
import {} from '@auth/sveltekit';
import { sha256 } from 'ohash';

dayjs.extend(utc);

export async function DELETE({ locals, cookies, request, params: { link_id } }) {
	const session = await locals.auth();
	const user_id = session?.user?.id;
	const hash = cookies.get('tinisi-hash');

	if (!user_id && !hash) return error(401, 'Unauthorized');

	const link = await db
		.select({ id: links.id })
		.from(links)
		.where(and(eq(links.id, link_id), eq(links.hash, sha256(user_id || ''))));
	if (link.length === 0) return error(404, 'Link not found');
}

export async function PATCH({ locals, request, cookies, params: { link_id } }) {
	const body = (await request.json()) as { id?: string; alias?: string };
	const session = await locals.auth();
	const hash = cookies.get('tinisi-hash');
	const user_id = session?.user?.id;

	if (!user_id && !hash) return error(401, 'Unauthorized');

	const link = await db
		.select({ id: links.id })
		.from(links)
		.where(and(eq(links.id, link_id), eq(links.hash, sha256(user_id || ''))));
	if (link.length === 0) return error(404, 'Link not found');
}
