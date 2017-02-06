'use strict';

const joi = require('joi'),
	p_empty = ['', null];

const token = 'Bearer IBAs31sbUArT4X7hnGiMGrDMRDVMYCcO7yL5aTmgBaY2U7hSIjY4MQ4Ziyu0s65w';
const chakram = require('chakram'),
    expect = chakram.expect,
    route = 'http://localhost:3000/api/projects/',
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

chakram.setRequestDefaults({
                headers :  {
                  'Content-Type': 'application/json',
                  'Authorization': token
                }});

chakram.addMethod('joi', require('chakram-joi'));

describe('Get project likes', function() {
	let pl;
	before('[GET /projects/:id/like', function() {
		pl = chakram.get(route + test_project.id + '/like');
	});

	it('Should like a project', function() {
		return expect(pl).to.joi(schemas.common.likes)
	});
});