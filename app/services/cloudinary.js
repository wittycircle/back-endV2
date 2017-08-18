/**
 * Created by rdantzer on 13/02/17.
 */

'use strict';

const cloudinary = require('cloudinary');
const config = require('../private');
cloudinary.config(config.cloudinary);

exports.uploadProjectLogo = url => {
	return new Promise(resolve =>
		cloudinary.uploader.upload(url, result => resolve(result.secure_url), {
			width: 200, 
			height: 200, 
			crop: "fill", 
			format: "jpg"
		})
	);
};
