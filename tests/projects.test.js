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

    describe('Update project discussion [PUT /projects/:id/discussions/:discussion_id', function() {
        let r, v;
        before('request', function() {
            return r = chakram.put(route + 3 + '/discussions/' + 196, {title: "Changed title!", message: "testy"});
        });
        before('bad request', function() {
            return v = chakram.put(route + 3 + '/discussions/' + 196, {title: "Changed title!"});
        });

        it('Should update the info', function() {
            db.select('title').from(TABLES.PROJECT_DISCUSSION).where({id: 196}).then((rr) => {
                expect(rr[0].title).to.equal('Changed title!')
                expect(r).to.joi(schemas.common.success)
                return chakram.wait()
            })
        });

        it('Should match validation error', function() {
            return expect(v).to.joi(schemas.error.validation_error_schema)
        });
    });

    describe('Remove project discussion [DELETE /projects/:id/discussions/:discussion_id]', function() {
        let r, v;
        before('request', function() {
            r = chakram.delete(route + 3 + '/discussions/' + 195);
        });
    
        it('Should remove the discussion', function() {
            return expect(r).to.joi(schemas.common.success);
        });

        after('cleanup id', function() {
            db.raw('DELETE from project_discussion where id > 195').return()
            db.raw('alter table project_discussion AUTO_INCREMENT = 195').return();
        })
    });


};