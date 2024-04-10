import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, AUTH_SECRET } from '$env/static/private';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/db';
import { stripe } from '$lib/stripe';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: DrizzleAdapter(db),
	providers: [GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET })],
	secret: AUTH_SECRET,
	events: {
		createUser({ user }) {
			const customer = stripe.customers.create({
				email: user.email || undefined,
				name: user.name || undefined,
				metadata: {
					user_id: user.id || null
				}
			});

			console.log('user', user);
			console.log('customer', customer);
		}
	}
});
