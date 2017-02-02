/**
 * Created by rdantzer on 01/02/17.
 */

'use strict';

const chakram = require('chakram'),
    expect = chakram.expect,
    schemas = {
        profiles: require('./schemas/profile.schema'),
        error: require('./schemas/error.schema')
    };

chakram.addMethod('joi', require('chakram-joi'));

describe('Profile list', function () {
    let profiles = {
        list: null
    };

    before('Get profile list', function () {
        profiles.list = chakram.get('http://localhost:3000/api/profiles')
    });

    it('should return 200 on success', function () {
        return expect(profiles.list).to.have.status(200);
    });

    it('should comply to the api format', function () {
        return expect(profiles.list).to.joi(schemas.profiles.list);
    });
});

describe('Profile detail', function () {
    let profile = {
        quentin: null,
        invalid: null
    };

    before('Get profile info', function () {
        profile.quentin = chakram.get('http://localhost:3000/api/profiles/1')
    });

    before('Get profile with wrong id', function () {
        profile.invalid = chakram.get('http://localhost:3000/api/profiles/asda')
    });

    it('should return 200 on success', function () {
        return expect(profile.quentin).to.have.status(200);
    });

    it('should comply to the api format', function () {
        return expect(profile.quentin).to.joi(schemas.profiles.profile);
    });

    it('should return 404 on invalid resource id', function () {
        return expect(profile.invalid).to.have.status(404);
    })
});

describe('Profile like', function () {

});

describe('Profile location', function () {

});
