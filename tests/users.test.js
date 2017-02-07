module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('users/'),
        rnd_string = Math.random().toString(36).slice(-10),
        schemas = {
            common: require('./schemas/common.schema'),
            users: require('./schemas/user.schema'),
            error: require('./schemas/error.schema')
        };

        describe('Get user skills lists [GET /users/:id/skills]', function() {
        	let r, v;
        	before('request', function() {
        		r = chakram.get(route + 1 + '/skills');
        		v = chakram.get(route + storage.fake + '/skills');
        	});

        	it('Should get a list of skills', function () {
        		return expect(r).to.joi(schemas.users.skills);
        	});

        });

        describe('Add skill to user [POST /users/:id/skills]', function() {
        	let r, v;
        	before('request', function() {
        		r = chakram.post(route + 81 + '/skills');
        		v = chakram.post(route + 2929292929292 + '/skills');
        	});
        
        	it('Should send the list of updated skills', function() {
        		return expect(r).to.joi(schemas.users.skills).status(200)
        	});
        });
};