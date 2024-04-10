import Stripe from 'stripe';
import { STRIPE_SECRET } from '$env/static/private';

export const stripe = new Stripe(STRIPE_SECRET);
