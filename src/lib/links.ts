import { maxLength, minLength, regex, string, toTrimmed, url } from 'valibot';

export const idSchema = string([
	minLength(4, 'Link alias must be at least 3 characters long.'),
	maxLength(32, 'Link alias must be at most 32 characters long.'),
	regex(
		/^[a-zA-Z0-9_-]+$/,
		'Link alias must contain only letters, numbers, underscores, and hyphens.'
	)
]);

export const urlSchema = string([url('Invalid URL'), toTrimmed()]);
