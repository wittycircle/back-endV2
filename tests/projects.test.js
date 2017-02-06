'use strict';

const joi = require('joi'),
	p_empty = ['', null];

const token = 'Bearer 18UU6ipLkKyHAWvhFxpmet0x9OaAumBHNreE4sPcNAWQXpfLomxfq2cZiyujnqwl'
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

	it('Should get followers', function() {
		return expect(pl).to.joi(schemas.common.likes)
	});
});

describe('Like project', function() {
    let r, v;
    before('[POST /projects/:id/like]', function() {
        r = chakram.post(route + test_project.id + '/like');
        v = chakram.get(route + test_project.id + '/like');
    });

    it('Should like a profile', function() {
        return expect(r).to.joi(schemas.common.success);
        });

    it('Should appear in db', function() {
        return v.then(res => {
            console.log(res.body.like.who[res.body.like.who.length - 1])
            return expect(res.body.like.who[res.body.like.who.length - 1]).to.have.property('id', 3755)
        })
    })

});