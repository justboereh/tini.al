import { maxLength, minLength, regex, string, toTrimmed, url } from 'valibot';

export const idSchema = string([minLength(4), maxLength(32), regex(/^[a-zA-Z0-9_-]+$/)]);

export const urlSchema = string([url(), toTrimmed()]);
