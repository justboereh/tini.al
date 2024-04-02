import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db.js';
import { links } from '$lib/server/db.schema.js';
import { eq } from 'drizzle-orm';

export async function load({ params: { link_id }, setHeaders }) {
	const res = await db
		.select({ location: links.location })
		.from(links)
		.where(eq(links.id, link_id))
		.execute();

	setHeaders({ 'Cache-Control': 'no-cache' });

	if (res.length === 0) return error(404, 'Not found');

	redirect(301, res[0].location);
}
