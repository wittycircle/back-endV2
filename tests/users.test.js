const chakram = require('chakram'),
expect = chakram.expect,
	home = 'http://localhost:3000'

describe("Get user share", function() {
	it("should send social share", function () {
		return chakram.get(home + "/share/2")
			.then((r) => {
				expect(r.body.social_share).to.equal(0)
				expect(r).to.have.status(200)
		})
	})
});
