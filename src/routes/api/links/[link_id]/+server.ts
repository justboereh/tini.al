import { db } from '$lib/server/db.js';
import { links } from '$lib/server/db.schema.js';
import { and, eq } from 'drizzle-orm';
import { error, text } from '@sveltejs/kit';
import {} from '@auth/sveltekit';
import { sha256 } from 'ohash';
import { object, safeParse } from 'valibot';
import { idSchema } from '$lib/links';

export async function DELETE({ locals, cookies, params: { link_id } }) {
	const session = await locals.auth();
	const hashid = session?.user?.id || cookies.get('tinisi-hashid');

	if (!hashid) return error(401, 'Unauthorized');

	await db.delete(links).where(and(eq(links.id, link_id), eq(links.hash, sha256(hashid))));

	return text('Link deleted');
}

export async function PATCH({ locals, request, cookies, params: { link_id } }) {
	const body = safeParse(object({ id: idSchema }), await request.json());

	if (!body.success) return error(400, 'Invalid request body');

	const session = await locals.auth();
	const hashid = session?.user?.id || cookies.get('tinisi-hashid');

	if (!hashid) return error(401, 'Unauthorized');

	await db
		.update(links)
		.set({ id: body.output.id })
		.where(and(eq(links.id, link_id), eq(links.hash, sha256(hashid))));

	return text('Link updated');
}
