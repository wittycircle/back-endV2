/**
 * Created by rdantzer on 08/04/17.
 */

'use strict';

const express = require('express'),
		router = express.Router(),
		{ auth, AUTH } = require('../services/auth'),
		upload = require('../controllers/upload');

router.post('/upload/project/logo', auth(AUTH.PRIVATE), upload.uploadProjectLogo);
// router.post('/upload/project/cover_card', auth(AUTH.PRIVATE), upload.uploadProjectCard);
// router.post('/upload/videos', auth(AUTH.PRIVATE), upload.uploadVideoProject);
// router.post('/upload/profile/cover', auth(AUTH.PRIVATE), upload.uploadProfileCover);
// router.post('/upload/profile_pic_icon', auth(AUTH.PRIVATE), upload.uploadPhotoIcon);
// router.post('/upload/profile/cover_card', auth(AUTH.PRIVATE), upload.uploadProfileCard);
// router.post('/upload/delete/videos', auth(AUTH.PRIVATE), upload.deleteVideoProject);
// router.post('/upload/article/picture', auth(AUTH.PRIVATE), upload.uploadArticlePicture);

module.exports = router;