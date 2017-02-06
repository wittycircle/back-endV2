'use strict';

const joi = require('joi'),
    p_empty = ['', null];

module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = 'http://localhost:3000/api/projects/',
        rnd_string = Math.random().toString(36).slice(-10),
        test_project = {
            id: 1,
            public_id: 34474
        },
        fake_project = {
            id: 9999282292,
            public_id: 3939302932
        },
        schemas = {
            common: require('./schemas/common.schema'),
            projects: require('./schemas/project.schema'),
            error: require('./schemas/error.schema')
        };

    describe('Get project likes', function () {
        let pl;
        before('[GET /projects/:id/like', function () {
            pl = chakram.get(route + test_project.id + '/like');
        });

        it('Should like a project', function () {
            return expect(pl).to.joi(schemas.common.likes)
        });
    });
};
