const { db, TABLES } = require('../app/models/index');
const p_empty = ['', null];

module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('replies/'),
        rnd_string = Math.random().toString(36).slice(-10),
        schemas = {
            common: require('./schemas/common.schema'),
            discussion: require('./schemas/discussion.schema'),
            error: require('./schemas/error.schema')
        };

    describe('Should update reply from discussion [PUT /replies/reply_id]', function() {
        let r, v, v2;
        before('request', function() {
            r = chakram.put(route + 263, {message: "Stupidty"});
            v = chakram.put(route + 263);
            v2 = chakram.put(route + storage.fakeId, {message: "lalala"});
        });
    
        it('Should send success', function() {
            return expect(r).to.joi(schemas.common.success).status(200);
        });

        it('Should match validation error', function() {
        	expect(v).to.joi(schemas.error.validation_error_schema);
        	expect(v2).to.joi(schemas.error.description);
        	return chakram.wait();
        });
    });

    describe('Should remove reply [comment] from discussion [DELETE /replies/reply_id]', function() {
        let r, v;
        before('request', function() {
            r = chakram.delete(route + 263);
            // v = chakram.delete(route + )
        });
    
        it('Should send success true', function() {
            return expect(r).to.joi(schemas.common.success).status(200);
        });

        after('Cleanup db', function() {
            db.raw('DELETE from project_discussion_replies where id > 260').return()
            db.raw('alter table project_discussion_replies AUTO_INCREMENT = 263').return();
        });
    });

};