'use strict';

const {db, TABLES} = require('../app/models/index'),
    p_empty = ['', null];

const opening_id = 280;

module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('openings/'),
        rnd_string = Math.random().toString(36).slice(-10),
        schemas = {
            common: require('./schemas/common.schema'),
            projects: require('./schemas/project.schema'),
            error: require('./schemas/error.schema')
        };
    describe('', function () {
        it('should print something big', function () {
            console.log("\x1b[35m" + " ------------------ Openings ------------------\n");
        })
    });

    describe('Update opening [/openings/:opening_id]', function () {
        let r, v;
        before('request', function () {
            r = chakram.post(route + opening_id, {description: "Updated description"});
        });

        it('Should send success', function () {
            return expect(r).to.joi(schemas.common.success);
        });

        it('Should hve update the data', function () {
            return db.select('description')
                .from(TABLES.PROJECT_OPENINGS).where({id: opening_id})
                .then(r => {
                    return expect(r[0].description).to.equal('Updated description')
                });
        });
    });

    describe('Delete opening [/openings/:opening_id]', function () {
        let r, v;
        before('request', function () {
            r = chakram.delete(route + opening_id);
        });

        it('Should send success', function () {
            return expect(r).to.joi(schemas.common.success);
        });

        after('Cleanup', function () {
            db.raw('DELETE from project_openings where id > 279').return()
            db.raw('alter table project_openings AUTO_INCREMENT = 280').return();
        });
    });
}// ------------------ end module ------------------