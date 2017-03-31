module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('users/'),
        rnd_string = Math.random().toString(36).slice(-10),
        schemas = {
            common: require('./schemas/common.schema'),
            users: require('./schemas/user.schema'),
            error: require('./schemas/error.schema')
        };
describe('', function() {
    it ('should print something big', function() {
        console.log( "\x1b[35m" + " ------------------ Users ------------------\n");
    })
});
// ------------------ Main methods ------------------
// ------------------ Skills ------------------
    describe('Get user skills lists [GET /users/:id/skills]', function () {
        let r, v;
        before('request', function () {
            r = chakram.get(route + 1 + '/skills');
            v = chakram.get(route + storage.fakeId + '/skills');
        });

        it('Should get a list of skills', function () {
            return expect(r).to.joi(schemas.users.skills).status(200);
        });

        it('should send an error', function () {
            return expect(v).to.joi(schemas.error.description).status(404)
        });

    });

    describe('Add skill to user [POST /users/:id/skills]', function () {
        let r, v, v2, v3;
        before('request', function () {
            r = chakram.post(route + storage.user.id + '/skills', {skill_id: 81});
            v = chakram.post(route + 'notanum' + '/skills', {skill_id: 81929292});
            v2 = chakram.post(route + storage.fakeId + '/skills', {skill_id: 81});
            v3 = chakram.post(route + storage.user.id + '/skills');
        });

        it('Should send the list of updated skills', function () {
            return expect(r).to.joi(schemas.users.skills).status(200)
        });

        it('Should send an error 1', function () {
            return expect(v).to.joi(schemas.error.validation_error_schema).status(404);
        });
        it('Should send an error 2', function () {
            return expect(v2).to.joi(schemas.error.description).status(404);
        });
        it('Should send an error 3', function () {
            return expect(v3).to.joi(schemas.error.description).status(404);
        });

    });

    describe('Remove skill from user [DELETE /users/:id/skills]', function () {
        let r, v, v2, v3;
        before('request', function () {
            r = chakram.delete(route + storage.user.id + '/skills', {skill_id: 81});
            v = chakram.delete(route + storage.user.id + '/skills', {skill_id: 1234029302});
            v2 = chakram.delete(route + storage.fakeId + '/skills', {skill_id: 81});
            v3 = chakram.delete(route + storage.user.id + '/skills');
        });

        it('Should remove a skill', function () {
            return expect(r).to.joi(schemas.common.success);
        });

        it('Should send an error', function () {
            expect(v).to.joi(schemas.error.description).status(404);
            v2.then(rr=> console.log(rr.body))
            expect(v2).to.joi(schemas.error.description).status(404);
            expect(v3).to.joi(schemas.error.description).status(404);
            return chakram.wait()
        });
    });
};