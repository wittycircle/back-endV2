'use strict';

const { db, TABLES } = require('../app/models/index');
const p_empty = ['', null];

module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('discussions/'),
        rnd_string = Math.random().toString(36).slice(-10),
        schemas = {
            common: require('./schemas/common.schema'),
            discussion: require('./schemas/discussion.schema'),
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

    describe('Remove project discussion [DELETE /projects/:id/discussions/:discussion_id]', function() {
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