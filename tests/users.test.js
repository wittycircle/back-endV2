const chakram = require('chakram'),
expect = chakram.expect,
home = 'http://localhost:3000',
{ db, TABLES } = require('../app/models/index');

describe ('Users test : ', function () {

describe('Get user share', function() {
	it('should return false', function () {
		return chakram.get(home + '/share/9999999')
			.then(function (r) {
				expect(r.body.success).to.equal(false)
				expect(r).to.have.status(200)
		})
	})
});

describe('Update user share', function () {
	it('should update user share', function () {
		return chakram.put(home + '/share/2')
				.then(function (r) {
					expect(r.body.success).to.equal(true)
				})
	})
})
	// before( function () {
	// 	db.insert({token: 'toto', user_email:"toto.com"}).into(TABLES.ACCOUNT_VALIDATION)
	// })

describe('Get validation mail', function () {
	it('Should validate email', function() {
		return chakram.get(home + '/user/valid/toto')
				.then(function (r) {
					expect(r.body.user_email).to.equal('toto.com')
				})
	})

})

})