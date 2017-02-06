/**
 * Created by rdantzer on 01/02/17.
 */

'use strict';
module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('profiles/'),
        rnd_string = Math.random().toString(36).slice(-10),
        test_user = {
            id: 3719,
            profile_id: 3755
        },
        fake_user = {
            id: 9999282292,
            profile_id: 3939302932
        },
        schemas = {
            common: require('./schemas/common.schema'),
            profiles: require('./schemas/profile.schema'),
            error: require('./schemas/error.schema')
        };

//Tests
    describe('Profile list [GET /profiles]', function () {
        let profiles = {
            list: null
        };

        before('Get profile list', function () {
            profiles.list = chakram.get(route)
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
            profile.quentin = chakram.get(route + "1")
        });

        before('Get profile with wrong id', function () {
            profile.invalid = chakram.get(route + "asda")
        });

        it('should return 200 on success', function () {
            return expect(profile.quentin).to.have.status(200);
        });

        it('should comply to the api format', function () {
            return expect(profile.quentin).to.joi(schemas.profiles.profile);
        });

        it('should return 404 on invalid resource id', function () {
            return expect(profile.invalid).to.have.status(404);
        });
    });

    describe('Modify profile [PUT /profile/:id]', function () {
        let success = {
            test: null,
            fake: null,
            ret: null
        };
        before('Update profile', function () {
            success.test = chakram.put(route + test_user.profile_id, {
                profile: {
                    first_name: rnd_string
                }
            });
            return success.ret = chakram.get(route + test_user.profile_id);
        });

        before('Fake profile', function () {
            success.fake = chakram.put(route + fake_user.profile_id, {profile: {first_name: "toto"}})
        });

        it('Should return 200', function () {
            return expect(success.test).to.have.status(200)
        });

        it('Should return success: true', function () {
            return expect(success.test).to.joi(schemas.common.success)
        });

        it('Should return 400', function () {
            return expect(success.fake).to.have.status(400)
        });

        it('Should return success: false', function () {
            return expect(success.fake).to.joi(schemas.error.success)
        });

        it('Should have modified the first_name', function () {
            return success.ret.then(r => {
                expect(r.body.profile.first_name).to.equal(rnd_string)
            })
        });
    });

    describe('Get location [GET /profiles/:id/location]', function () {
        let loc;
        before('get profile location', function () {
            loc = chakram.get(route + test_user.profile_id + '/location')
        });

        it('Should have status 200', function () {
            return expect(loc).to.have.status(200);
        });

        it('Should comply to format', function () {
            return expect(loc).to.joi(schemas.profiles.location)
        })
    });

    describe('Update location [PUT /profiles/:id/location]', function () {
        let r;
        let res;
        before('Update profile location', function () {
            r = chakram.put(route + test_user.profile_id + '/location', {
                location: {
                    country: rnd_string,
                    city: rnd_string
                }
            });
            return res = chakram.get(route + test_user.profile_id + '/location')
        });

        it('Should have status 200', function () {
            return expect(r).to.have.status(200);
        });
        it('Should send success true', function () {
            return expect(r).to.joi(schemas.common.success)
        });
        it('Should have update the country', function () {
            return res.then(res => {
                expect(res.body.location.country).to.equal(rnd_string)
            })
        })
    });

    describe('Get profile likes [GET /profiles/:id/like]', function () {
        let likes;
        let fake;
        before("Get profile likes", function () {
            likes = chakram.get(route + test_user.profile_id + '/like');
        });

        before('Fake profile', function () {
            fake = chakram.get(route + fake_user.profile_id + '/like')
        });

        it('Should have status 200', function () {
            return expect(likes).to.have.status(200);
        });

        it('Should match schema', function () {
            return expect(likes).to.joi(schemas.common.likes)
        });

        it('Should send success false', function () {
            return expect(fake).to.joi(schemas.error.success)
        });
    });

    describe('like profile [POST /profiles/:id/like]', function () {
        let lp;
        let fake;
        before('options', function () {
            lp = chakram.post(route + 2 + '/like')
        });

        before('false req', function () {
            fake = chakram.post(route + 29323482 + '/like')
        });

        it('Should send 200', function () {
            return expect(lp).to.have.status(200);
        });

        it('Should match schema', function () {
            return expect(lp).to.joi(schemas.common.success);
        });
        it('Should send error', function () {
            return expect(fake).to.joi(schemas.error.success);
        });
    });

    describe('Unlike profile [DELETE /profiles/:id/like]', function () {
        let remove;
        let fake;

        before('Unlike profile', function () {
            remove = chakram.delete(route + 2 + '/like');
            fake = chakram.delete(route + 2928292 + '/like');
        });

        it('Should send succes true', function () {
            return expect(remove).to.joi(schemas.common.success);
        });

        it('Should send success false', function () {
            return expect(fake).to.joi(schemas.error.success);
        });
    });
};