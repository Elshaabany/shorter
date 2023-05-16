import ShortLink from '../model/shortlink.js';

export async function getURL(req, res) {
	const shortLink = await ShortLink.findOne({ slug: req.params.slug });
	if (!shortLink) {
		res.status(404).send({ message: 'link not found' });
		return;
	}
	const userAgent = req.headers['user-agent'];

	if (/iPhone/i.test(userAgent)) {
		res.send(shortLink.ios);
		return;
	}

	if (/Android/i.test(userAgent)) {
		res.send(shortLink.android);
		return;
	}

	res.redirect(shortLink.web);
}
