const chakram = require('chakram'),
    expect = chakram.expect,
    home = 'http://localhost:3000',
    {db, TABLES} = require('../app/models/index');

describe('Get user share', function () {
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
        db.insert({token: 'toto', user_email: "toto.com"}).into(TABLES.ACCOUNT_VALIDATION).return()
        db.raw(db.insert({profile_id: 2, email: "toto.com"}).into(TABLES.USERS)
            .toString().replace('insert', 'INSERT IGNORE')).return()
    });
    it('Should validate email', function () {
        return chakram.get(home + '/user/valid/toto')
            .then(function (r) {
                expect(r.body.user_email).to.equal('toto.com')
            })
    })
})

describe('Post validation mail', function () {
    it('Should not validate account', function () {
        return chakram.post(home + '/user/valid/toto', {email: 'toto.comwrg'})
            .then(function (r) {
                expect(r.body.message).to.not.equal('Validation successful')
            })
    })
    it('Should validate account', function () {
        return chakram.post(home + '/user/valid/toto', {email: 'toto.com'})
            .then(function (r) {
                expect(r.body.message).to.equal('Validation successful')
            })
    })
})

describe('Check first log', function () {
    it('Should send something', function () {
        return chakram.get(home + '/user/checkLog/1')
            .then(function (r) {
                expect(r.body.value).to.equal(1)
            })
    })
})

describe('Update log', function () {
    it('Should update the log', function () {
        return chakram.put(home + '/user/checkLog/update/1')
            .then(function (r) {
                expect(r.body.success).to.equal(true)
            })
    })

})

describe('Get user from profile', function () {
    it('should get id and username', function () {
        return chakram.get(home + '/userId/1')
            .then(function (r) {
                expect(r).to.have.status(200)
                expect(r.body.success).to.equal(true)
                expect(r.body.content.id).to.be.a('number')
                expect(r.body.content.username).to.be.a('string')
            })
    })

});

describe('Get profile', function () {
    it('Should have properties [genre, birthdate, location_city]', function () {
        return chakram.post(home + '/profiles/1')
            .then(function (r) {
                expect(r).to.have.status(200)
                expect(r.body.success).to.equal(true)
                expect(r.body.content).to.have.property('genre')
                expect(r.body.content).to.have.property('birthdate')
                expect(r.body.content).to.have.property('location_city')
            })
    })
});

describe('Get profile id', function () {
    it('Should return an id', function () {
        return chakram.post(home + '/profileId/1')
            .then(function (r) {
                expect(r.body.content).to.have.property('profile_id')
            })
    })
});

describe('Get users', function () {
    it('Should get a list of users', function () {
        return chakram.get(home + '/users')
            .then(function (r) {
                console.log(r.body.length)
                expect(r.body).to.be.a('array')
                expect(r.body[0]).to.have.property('profile_id')
                expect(r.body[0]).to.have.property('username')
                expect(r.body[0]).to.have.property('location_city')
            })
    })
});

describe('Create users', function () {
	before('Create a new user', function () {
			const data = {
			email: 'cooki@cook.com',
			first_name: 'Toto',
			last_name: 'McTata',
			password: 'whatever'
		}
		new_user = hakram.post(home + '/users',  data)
	})

	it ('Should create a user', function () {
		expect(new_user).to.have.status(200)
		expect(new_user).to.have.property('success')
	})
})