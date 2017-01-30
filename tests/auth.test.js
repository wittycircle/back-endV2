/**
 * Created by rdantzer on 29/01/17.
 */

'use strict';

const chakram = require('chakram'),
    expect = chakram.expect,
    schemas = require('./schemas/auth.schema');

chakram.addMethod('joi', require('chakram-joi'));

describe('Local auth strategy', function () {
    let user = {
        ok: null,
        wrongEmail: null,
        wrongPassword: null
    };

    before('authenticate user', function () {
        user.ok = chakram.post('http://localhost:3000/api/auth/local', {
            email: "raphael@wittycircle.com",
            password: "helloworld"
        })
    });

    before('authenticate user with fake email', function () {
        user.wrongEmail = chakram.post('http://localhost:3000/api/auth/local', {
            email: "bidon@bidon.xyz",
            password: "helloworld"
        })
    });

    before('try to authenticate user with wrong password', function () {
        user.wrongPassword = chakram.post('http://localhost:3000/api/auth/local', {
            email: "raphael@wittycircle.com",
            password: "definitively_not_the_good_password"
        })
    });

    it('should return 200 on success', function () {
        return expect(user.ok).to.have.status(200);
    });

    it('should match response format', function () {
        return expect(user.ok).to.joi(schemas.auth_response_schema);
    });

    it('should return 400 when the email doesn\'t exist', function () {
        return expect(user.wrongEmail).to.have.status(400);
    });

    it('should return 400 when the passwords doesn\'t match', function () {
        return expect(user.wrongPassword).to.have.status(400);
    });
});