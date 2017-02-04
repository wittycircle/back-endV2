/**
 * Created by rdantzer on 01/02/17.
 */

'use strict';

const chakram = require('chakram'),
    expect = chakram.expect,
    home = 'http://localhost:3000',
    test_user = {
        id: 3719,
        profile_id: 3755
    },
    fake_user = {
        id: 9999282292,
        profile_id: 3939302932
    },
    schemas = {
        profiles: require('./schemas/profile.schema'),
        error: require('./schemas/error.schema')
    };

chakram.addMethod('joi', require('chakram-joi'));

//Tests
describe('Profile list [GET /profiles]', function () {
    let profiles = {
        list: null
    };

    before('Get profile list', function () {
        profiles.list = chakram.get(home + '/api/profiles')
    });

    it('should return 200 on success', function () {
        return expect(profiles.list).to.have.status(200);
    });

    it('should comply to the api format', function () {
        return expect(profiles.list).to.joi(schemas.profiles.list);
    });
});

describe('Profile detail [GET /profiles/:id]', function () {
    let profile = {
        quentin: null,
        invalid: null
    };

    before('Get profile info', function () {
        profile.quentin = chakram.get(home + '/api/profiles/1')
    });

    before('Get profile with wrong id', function () {
        profile.invalid = chakram.get(home + '/api/profiles/asda')
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

describe('Modify profile [PUT /profile/:id]', function () {
    let success = {
        test: null,
        fake: null
    }

    before('Update profile', function () {
        success.test = chakram.put(home + '/api/profiles/' + test_user.profile_id, {
            profile: {
                first_name: "Sequoya"
            }
        })
    });

    before('Fake profile', function () {
        success.fake = chakram.put(home + '/api/profiles/' + fake_user.profile_id, {profile: {first_name: "toto"}})
    })

    it('Should return 200', function() {
        return expect(success.test).to.have.status(200)
    })

    it('Should return success: true', function() {
        return expect(success.test).to.joi(schemas.profiles.success)
    })

    it('Should return 400', function() {
        return expect(success.fake).to.have.status(400)
    })

    it('Should return success: false', function() {
        return expect(success.fake).to.joi(schemas.error.success)
    })
});
