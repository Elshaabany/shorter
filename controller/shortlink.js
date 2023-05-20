import ShortLink from '../model/shortlink.js';
import { nanoid } from 'nanoid';
import { host, port } from '../util/config.js';
import { isUri } from 'valid-url';

function isValidLink(link) {
	if (
		isUri(link.web) &&
		isUri(link.ios.primary) &&
		isUri(link.ios.fallback) &&
		isUri(link.android.primary) &&
		isUri(link.android.fallback)
	)
		return true;
	else return false;
}

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

	if (!isValidLink(link)) {
		res.status(400).send({ message: 'invalid URL format' });
		return;
	}

	while (await ShortLink.exists({ slug: link.slug })) {
		link.slug = nanoid(idLength);
	}

	const shortLink = await ShortLink.create(link);

	res.status(201).json({
		message: 'short link created',
		shortURL: `http://${host}:${port}/${shortLink.slug}`,
	});
}

export async function putLink(req, res) {
	const shortLink = await ShortLink.findOne({ slug: req.params.slug });
	if (!shortLink) {
		res.status(404).send({ message: 'link not found' });
		return;
	}

	const link = {
		slug: shortLink.slug,
		ios: req.body.ios
			? {
					primary: req.body.ios.primary,
					fallback: req.body.ios.fallback,
			  }
			: shortLink.ios,
		android: req.body.android
			? {
					primary: req.body.android.primary,
					fallback: req.body.android.fallback,
			  }
			: shortLink.android,
		web: req.body.web || shortLink.web,
	};

	if (!isValidLink(link)) {
		res.status(400).send({ message: 'invalid URL format' });
		return;
	}

	await shortLink.updateOne({ ...link });

	res.json({ message: 'link updated' });
}
