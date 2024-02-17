import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { TURSO_URL, TURSO_TOKEN } from '$env/static/private';

export const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN });

export const db = drizzle(client);
