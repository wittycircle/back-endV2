/**
 * Created by rdantzer on 06/02/17.
 */

'use strict';

const chakram = require('chakram'),
    expect = chakram.expect;

chakram.addMethod('joi', require('chakram-joi'));

const login = {
        email: 'raphael@wittycircle.com',
        password: 'helloworld'
    },
    storage = {
        token: null,
        resource: (route) => `http://localhost:3000/api/${route}`,
        user: null
    };

describe('Authentication of the test client', function () {
    before('Login with valid credentials', function () {
        storage.user = chakram.post(storage.resource('auth/local'), login);
        return chakram.wait();
    });

    it('Should store the token in the storage for later use', function () {
        expect(storage.user).to.have.status(200);
        storage.user.then(function (authResponse) {
            storage.token = authResponse.body.auth.token;
            chakram.setRequestDefaults({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storage.token}`
                }
            });
        });
        return chakram.wait();
    });

    it('Should run all the tests', function () {
        require('./profiles.test')(storage, chakram);
        require('./projects.test')(storage, chakram);
        return chakram.wait();
    });
});
