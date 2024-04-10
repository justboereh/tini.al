import { test } from '@playwright/test';
import { ofetch } from 'ofetch';

test('api can be created, accessed, updated, and deleted.', async () => {
	try {
		const res = await ofetch('http://localhost:3000/api/links', {
			method: 'PUT',
			body: { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
		});

		const link_id = await res.text();

		console.log(link_id);
	} catch (error) {
		console.log(error);

		throw error;
	}
});
