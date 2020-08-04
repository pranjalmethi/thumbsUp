const express           = require('express');
const router            = express.Router();
const createThumbs      = require('./../services/createThumbs');
const patchJSON         = require('./../services/patchJSON');
const auth              = require('./../services/authentication');

// GET API`s
router.get('/thumbnail', auth.authenticate, createThumbs.createThumbnail);
router.get('/jsonPatch', auth.authenticate, patchJSON.patchJSON);
// POST API`s
router.post('/login', auth.login);
module.exports = router;