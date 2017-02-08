module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('users/'),
        rnd_string = Math.random().toString(36).slice(-10),
        schemas = {
            common: require('./schemas/common.schema'),
            users: require('./schemas/user.schema'),
            error: require('./schemas/error.schema')
        };

    describe('Get user skills lists [GET /users/:id/skills]', function () {
        let r, v;
        before('request', function () {
            r = chakram.get(route + 1 + '/skills');
            v = chakram.get(route + storage.fake + '/skills');
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
            v = chakram.post(route + storage.user_id + '/skills', {skill_id: 81929292});
            v2 = chakram.post(route + storage.fake + '/skills', {skill_id: 81});
            v3 = chakram.post(route + storage.user_id + '/skills');
        });

        it('Should send the list of updated skills', function () {
            return expect(r).to.joi(schemas.users.skills).status(200)
        });

        it('Should send an error', function () {
            expect(v).to.joi(schemas.error.description).status(404);
            expect(v2).to.joi(schemas.error.description).status(404);
            expect(v3).to.joi(schemas.error.description).status(404);
            return chakram.wait()
        });
    });

    describe('Remove skill from user [DELETE /users/:id/skills]', function () {
        let r, v, v2, v3;
        before('request', function () {
            r = chakram.delete(route + storage.user.id + '/skills', {skill_id: 81});
            v = chakram.delete(route + storage.user.id + '/skills', {skill_id: 1234029302});
            v2 = chakram.delete(route + storage.fake + '/skills', {skill_id: 81});
            v3 = chakram.delete(route + storage.user.id + '/skills');
        });

        it('Should remove a skill', function () {
            return expect(r).to.joi(schemas.common.success);
        });

        it('Should send an error', function () {
            expect(v).to.joi(schemas.error.description).status(404);
            expect(v2).to.joi(schemas.error.description).status(404);
            expect(v3).to.joi(schemas.error.description).status(404);
            return chakram.wait()
        });
    });
};