'use strict';

const { db, TABLES } = require('../app/models/index');
const p_empty = ['', null];

module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('discussions/'),
        rnd_string = Math.random().toString(36).slice(-10),
        schemas = {
            common: require('./schemas/common.schema'),
            discussions: require('./schemas/discussion.schema'),
            error: require('./schemas/error.schema')
        };

    describe('Update project discussion [PUT /discussions/:discussion_id', function() {
        let r, v;
        before('request', function() {
            return r = chakram.put(route  + 196, {title: "Changed title!", message: "testy"});
        });
        before('bad request', function() {
            return v = chakram.put(route  + 196, {title: "Changed title!"});
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
// ------------------ REPLIES ------------------

    describe('Reply to discussion [POST /discussions/:discussion_id/replies]', function() {
        let r, v, v2;
        before('request', function() {
            r = chakram.post(route + 196 + '/replies', {message: "Waltz"});
            v = chakram.post(route + 196 + '/replies');
            v2 = chakram.post(route + storage.fakeId + '/replies', {message: "no luck"});
        });
    
        it('Should send success', function() {
            return expect(r).to.joi(schemas.common.success).status(200);
        });

        it('Should match validation error', function() {
            return expect(v).to.joi(schemas.error.validation_error_schema);
        });

        it('Should match description error', function() {
            return expect(v2).to.joi(schemas.error.description);
        });
    });

    describe('Should like discussion', function() {
        let r, v;
        before('request', function() {
            r = chakram.post(route + 196 + '/like');
            v = chakram.post(route + storage.fakeId + '/like')
        });
    
        it('Should send the id of like', function() {
            return expect(r).to.joi(schemas.common.id);
        });

        it('Should match description error', function() {
            return expect(v).to.joi(schemas.error.description);
        })
    });

    describe('Should unlike reply', function() {
        let r, v;
        before('request', function() {
            r = chakram.delete(route + 196 + '/like');
            v = chakram.delete(route + storage.fakeId + '/like');
        });
            it('Should send success', function() {
            return expect(r).to.joi(schemas.common.success).status(200);
        });
        it('Should match description error', function() {
            return expect(v).to.joi(schemas.error.description).status(404);
        });
    });

    describe('Get discussion replies [GET /discussion/discussion_id/replies]', function() {
        let r, v;
        before('request', function() {
            r = chakram.get(route + 196 + '/replies');
        });
    
        it('', function() {
            return expect(r).to.joi(schemas.discussions.replies);
        });
    });

    require('./replies.test')(storage, chakram);

// ------------------ END REPLIES ------------------
    describe('Remove project discussion [DELETE /discussions/:discussion_id]', function() {
        let r, v;
        before('request', function() {
            r = chakram.delete(route + 196);
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