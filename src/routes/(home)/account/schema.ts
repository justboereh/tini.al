import { email, minLength, object, string } from 'valibot';

export const accountSchema = object({
	username: string([minLength(3, 'Username must be at least 3 characters long.')]),
	email: string([email('Invalid email address.')])
});
