const chakram = require('chakram'),
expect = chakram.expect,
	home = 'http://localhost:3000'

describe ('Users test : ', function () {

describe('Get user share', function() {
	it('should send social share', function () {
		return chakram.get(home + '/share/9999999')
			.then((r) => {
				expect(r.body.success).to.equal(false)
				expect(r).to.have.status(200)
		})
	})
});

describe('Update user share', function () {
	it('should update user share', function () {
		return chakram.put(home + '/share/2')
				.then((r) => {
					expect(r.body.success).to.equal(true)
				})
	})
})

describe('Get validation mail', function () {

	it('Should validate email', function() {
		return chakram.get(home + 'user/valid/:token')
				.then((r) => {
					expect
				})
	})

})

})