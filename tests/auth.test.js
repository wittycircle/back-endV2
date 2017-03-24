/**
 * Created by rdantzer on 29/01/17.
 */

'use strict';
module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        schemas = {
            auth: require('./schemas/auth.schema'),
            error: require('./schemas/error.schema')
        };

describe('', function() {
    it ('should print something big', function() {
        console.log( "\x1b[35m" + " ------------------ Auth ------------------\n");
    })
});

    describe('Local auth strategy', function () {
        let user = {
            ok: null,
            wrongEmail: null,
            wrongPassword: null,
            invalidCredentials: null
        };

        before('authenticate user', function () {
            user.ok = chakram.post('http://localhost:3000/api/auth/local', {
                email: 'raphael@wittycircle.com',
                password: 'helloworld'
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

        before('authenticate user with invalid credentials', function () {
            user.invalidCredentials = chakram.post('http://localhost:3000/api/auth/local', {
                email: "raphael.toto",
                password: "dadasdada",
                test: "Im not needed !"
            });
        });

        it('should return 200 on success', function () {
            return expect(user.ok).to.have.status(200);
        });

        it('should match response format', function () {
            return expect(user.ok).to.joi(schemas.auth.response_schema);
        });

        it('should return 404 when the email doesn\'t exist', function () {
            return expect(user.wrongEmail).to.have.status(404);
        });

        it('should return 404 when the passwords doesn\'t match', function () {
            return expect(user.wrongPassword).to.have.status(404);
        });

        it('should return correct validation errors', function () {
            return expect(user.invalidCredentials).to.joi(schemas.error.validation_error_schema);
        });
    });

    describe('Facebook strategy', function () {
        it('Should not be implemented', function () {
            return expect(1).to.equal(1);
        });
    });
};