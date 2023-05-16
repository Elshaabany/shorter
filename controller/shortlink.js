import ShortLink from '../model/shortlink.js';
import process from 'node:process';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';

dotenv.config();

export async function getLink(req, res) {
	const links = await ShortLink.find();
	res.json({ links });
}

export async function postLink(req, res) {
	if (req.body.slug) {
		const found = await ShortLink.exists({ slug: req.body.slug });
		if (found) {
			res.status(400).json({ message: 'slug already exsist' });
			return;
		}
	}

	const idLength = 6;
	const link = {
		slug: req.body.slug || nanoid(idLength),
		ios: {
			primary: req.body.ios.primary,
			fallback: req.body.ios.fallback,
		},
		android: {
			primary: req.body.android.primary,
			fallback: req.body.android.fallback,
		},
		web: req.body.web,
	};

	while (await ShortLink.exists({ slug: link.slug })) {
		link.slug = nanoid(idLength);
	}

	const shortLink = await ShortLink.create(link);

	res.json({
		message: 'short link created',
		shortURL: `${process.env.host}/${shortLink.slug}`,
	});
}

export async function putLink(req, res) {
	const shortLink = await ShortLink.findOne({ slug: req.params.slug });
	if (!shortLink) {
		res.status(404).send({ message: 'link not found' });
		return;
	}

	await shortLink.updateOne({
		...req.body,
		slug: shortLink.slug,
	});

	res.json({ message: 'link updated' });
}
