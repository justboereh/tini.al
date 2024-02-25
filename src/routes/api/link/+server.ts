import { db } from '$lib/server/db.js';
import { links } from '$lib/server/db.schema.js';
import { nanoid } from 'nanoid';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }): Promise<Response> {
	const { url } = (await request.json()) as { url: string; alias: string };

	console.log('url', url);

	if (url.trim() === '') return new Response('URL is required', { status: 400 });

	try {
		new URL(url);
	} catch (e) {
		return new Response('Invalid URL', { status: 400 });
	}

	try {
		db.insert(links).values({
			id: nanoid(),
			long: url,
			short: nanoid(6)
		});
	} catch (e) {
		console.log('Error creating link', e);
		return new Response('Error creating link', { status: 400 });
	}

	return new Response('OK', { status: 200 });
}
