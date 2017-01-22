const chakram = require('chakram'),
expect = chakram.expect,
home = 'http://localhost:3000',
{ db, TABLES } = require('../app/models/index');

// describe ('Users test : ', function () {

describe('Get user share', function() {
	it('should return false', function () {
		return chakram.get(home + '/share/999999')
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

describe('Validation mail', function () {
	before(function () {
		db.insert({token: 'toto', user_email:"toto.com"}).into(TABLES.ACCOUNT_VALIDATION).return()
		db.raw(db.insert({profile_id: 2, email: "toto.com"}).into(TABLES.USERS)
			.toString().replace('insert', 'INSERT IGNORE')).return()
	});
	it('Should validate email', function() {
		return chakram.get(home + '/user/valid/toto')
				.then(function (r) {
					expect(r.body.user_email).to.equal('toto.com')
				})
	})
})

describe('Post validation mail', function () {
			it ('Should not validate account', function () {
		return chakram.post(home + '/user/valid/toto', {email: 'toto.comwrg'})
			.then(function (r) {
				expect(r.body.message).to.not.equal('Validation successful')
			})
	})
			it ('Should validate account', function () {
			return chakram.post(home + '/user/valid/toto', {email: 'toto.com'})
				.then(function (r) {
					expect(r.body.message).to.equal('Validation successful')
				})
	})
})

describe ('Check first log', function () {
	it('Should send something', function () {
		return chakram.get(home + '/user/checkLog/1')
			.then(function(r) {
				expect(r.body.value).to.equal(1)
			})
	})
})

describe ('Update log', function () {
	it('Should update the log', function () {
		return chakram.put(home + '/user/checkLog/update/1')
			.then(function(r) {
				expect(r.body.success).to.equal(true)
			})
	})

})

describe ('Get user from profile', function () {
	it('should get id and username', function () {
		return chakram.get(home + '/userId/1')
			.then(function(r) {
				expect(r).to.have.status(200)
				expect(r.body.success).to.equal(true)
				expect(r.body.content.id).to.be.a('number')
				expect(r.body.content.username).to.be.a('string')
			})
	})

})
