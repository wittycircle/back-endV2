module.exports = (storage, chakram) => {
    const expect = chakram.expect,
    route = storage.resource('skills/'),
    rnd_string = Math.random().toString(36).slice(-10),
    schemas = {
        common: require('./schemas/common.schema'),
        skills: require('./schemas/skill.schema'),
        error: require('./schemas/error.schema')
    };

    describe('Get skill list [/skills]', function() {
    	let r, v;
    	before('request', function() {
    		r = chakram.get(route);
    	});
    
    	it('Should match schema', function() {
    		return expect(r).to.joi(schemas.skills.list);
    	});
    });
}// ------------------ end module ------------------