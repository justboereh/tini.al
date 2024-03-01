import { db } from '$lib/server/db.js';
import { links } from '$lib/server/db.schema.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { eq } from 'drizzle-orm';

dayjs.extend(utc);

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }): Promise<Response> {
	const { url } = (await request.json()) as { url: string; alias: string };

	if (url.trim() === '') return new Response('URL is required', { status: 400 });

	try {
		new URL(url.trim());
	} catch (e) {
		return new Response('Invalid URL', { status: 400 });
	}

	const existing = await db.select({ id: links.id }).from(links).where(eq(links.location, url));

	if (existing.length > 0) {
		return new Response(existing[0].id, { status: 200 });
	}

	try {
		const id = nanoid(9);

		await db.insert(links).values({
			id,
			location: url.trim(),
			created: dayjs.utc().unix()
		});

		return new Response(id, { status: 201 });
	} catch (e) {
		return new Response('Error creating link', { status: 400 });
	}
}
