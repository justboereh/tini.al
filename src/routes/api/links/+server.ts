import { db } from '$lib/server/db.js';
import { links } from '$lib/server/db.schema.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { error, text } from '@sveltejs/kit';
import {} from '@auth/sveltekit';
import { sha256 } from 'ohash';
import { object, optional, safeParse } from 'valibot';
import { idSchema, urlSchema } from '$lib/links';
import { eq } from 'drizzle-orm';

dayjs.extend(utc);

const bodySchema = object({
	url: urlSchema,
	alias: optional(idSchema)
});

export async function PUT({ request, cookies, locals }) {
	const body = safeParse(bodySchema, await request.json());

	if (!body.success) return error(400, 'Invalid request body');

	const url = body.output.url;
	const alias = (body.output.alias || '').trim();
	const session = await locals.auth();
	const hashid = session?.user?.id || cookies.get('tinisi-hashid');

	if (!hashid) return error(401, 'Unauthorized');

	try {
		const link_id = nanoid(9);

		await db.insert(links).values({
			id: session?.user && alias ? alias : link_id,
			location: url.trim(),
			created: dayjs.utc().unix(),
			hash: sha256(hashid)
		});

		return text(link_id, { status: 201 });
	} catch (e) {
		return error(400, 'Error creating link');
	}
}

export async function POST({ cookies, locals }) {
	const session = await locals.auth();
	const hashid = session?.user?.id || cookies.get('tinisi-hashid');

	if (!hashid) return error(401, 'Unauthorized');

	const result = await db
		.select({
			id: links.id,
			created: links.created,
			location: links.location
		})
		.from(links)
		.where(eq(links.hash, sha256(hashid)));

	return text(JSON.stringify(result));
}
