'use strict';

const { db, TABLES } = require('../app/models/index');
const p_empty = ['', null];

module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('projects/'),
        rnd_string = Math.random().toString(36).slice(-10),
        test_project = {
            id: 1,
            public_id: 34474
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

        it('Should get followers', function () {
            return expect(pl).to.joi(schemas.common.likes)
        });
    });

    describe('Like project', function () {
        let r, v;
        before('[POST /projects/:id/like]', function () {
            r = chakram.post(route + test_project.id + '/like');
            v = chakram.get(route + test_project.id + '/like');
        });

        it('Should like a project', function () {
            expect(r).to.joi(schemas.common.success).to.have.status(200);
            return chakram.wait()
        });

        it('Should appear in db', function () {
            v.then(res => {
                return expect(res.body.like.who[res.body.like.who.length - 1])
                    .to.have.property('id', storage.user.profile_id)
            });
            // chakram.wait()
        })
    });

    describe('Unlike project', function () {
        let r, v;
        before('[DELETE /projects/:id/like', function () {
            r = chakram.delete(route + test_project.id + '/like')
        });

        it('Should send success true', function () {
            return expect(r).to.joi(schemas.common.success).to.have.status(200)
        });
    });

    describe('Get project discussion [GET /projects/:id/discussions]', function() {
        let r, v;
        before('request', function() {
            r = chakram.get(route + 242 + '/discussions');
            v = chakram.get(route + storage.fakeId + '/discussions');
        });
    
        it('Should get a project list', function() {
            return expect(r).to.joi(schemas.projects.discussions);
        });

        it('Should send an error', function() {
            return expect(v).to.joi(schemas.error.description);
        });
    });

    describe('Create project discussion [POST /projects/:id/discussions]', function() {
        let r,r2, v;
        before('request', function() {
            r = chakram.post(route + 3 + '/discussions', {message: "Testy test", title: "Waddya do"});
        });
    
        it('Should send success', function() {
            return expect(r).to.joi(schemas.common.success);
        });
    });


};