import { Schema, model } from 'mongoose';

const shortLinkSchema = new Schema({
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	ios: {
		primary: {
			type: String,
			required: true,
		},
		fallback: {
			type: String,
			required: true,
		},
	},
	android: {
		primary: {
			type: String,
			required: true,
		},
		fallback: {
			type: String,
			required: true,
		},
	},
	web: {
		type: String,
		required: true,
	},
});

const ShortLink = model('ShortLink', shortLinkSchema);

export default ShortLink;
