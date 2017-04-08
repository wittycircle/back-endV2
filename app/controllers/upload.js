/**
 * Created by rdantzer on 08/04/17.
 */

'use strict';

const cloudinary = require('cloudinary');

exports.uploadProjectCover = function (req, res) {
    cloudinary.uploader.upload(req.body.url, function (result) {
        res.send(result);
    }, {width: 1920, height: 1080, crop: "fill", format: "jpg"});
};
exports.uploadProjectCard = function (req, res) {
    cloudinary.uploader.upload(req.body.url, function (result) {
        res.send(result);
    }, {width: 300, height: 300, crop: "fill", format: "jpg"});
};
exports.uploadPhotoIcon = function (req, res) {
    cloudinary.uploader.upload(req.body.url, function (result) {
        res.send(result);
    }, {width: 200, height: 200, crop: "fill", format: "jpg", gravity: "face"});
};
exports.uploadProfileCover = function (req, res) {
    cloudinary.uploader.upload(req.body.url, function (result) {
        res.send(result);
    }, {width: 1920, height: 1080, crop: "fill", format: "jpg"});
};
exports.uploadProfileCard = function (req, res) {
    cloudinary.uploader.upload(req.body.url, function (result) {
        res.send(result);
    }, {width: 200, height: 100, crop: "fill", format: "jpg"});
};
exports.uploadArticlePicture = function (req, res) {
    cloudinary.uploader.upload(req.body.url, function (result) {
        res.send(result);
    }, {width: 600, height: 400, crop: "fill", format: "jpg"});
};
exports.uploadVideoProject = function (req, res) {
    cloudinary.uploader.upload(req.body.url, function (result) {
        res.send(result);
    }, {
        resource_type: "video"
    });
};