'use strict';

const { db, TABLES } = require('../app/models/index'),
     p_empty = ['', null];

module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource('projects/'),
        rnd_string = Math.random().toString(36).slice(-10),
        test_project = {
            id: 502
        },
        schemas = {
            common: require('./schemas/common.schema'),
            projects: require('./schemas/project.schema'),
            error: require('./schemas/error.schema')
        };

// ------------------ Projects [main methods] ------------------

    describe.only('Create project [POST /projects]', function() {
        let r, v;
        before('request', function() {
            let data = {
                title: "Chakram",
                category: 1,
                description: "Creating a project",
                about: "Lost of stuff with <p> tags <div> urls </div> </p> and stuff",
                location: {
                country: "France"
                },
                picture: "",
                video: "",
                network: "",
                public: true,
                members: [1, 2, 3],
                openings: [{
                    status: "any",
                    description: "Help for things and stuff",
                    tags: "Javascript, php",
                }],
                discussions: [{
                    title: "Very much conversation",
                    message: "Heart of space"
                }],
            };
            r = chakram.post(route, data);
            v = chakram.post(route, {video:"to"})
        });
    
        it('Should send back the id', function() {
            return expect(r).to.joi(schemas.common.id);
        });
        it('Should fail', function() {
            return expect(v).to.joi(schemas.error.validation_error_schema)
        });
    });

    describe('Update project [POST /projects/:id]', function() {
        let data = {
            title: "Chakram 2.0",
            category: 1,
            description: "Creating and Updating project",
            about: "UPDATED about"
        };
        let r, v;
        before('request', function() {
            r = chakram.post(route + test_project.id, data);
        });
    
        it('Should send success', function() {
            return expect(r).to.joi(schemas.common.success);
        });

        it('Should have updated the data', function () {
         return   db.select(['title', 'description', 'about']).from(TABLES.PROJECTS).where({id: test_project.id})
            .then(r => {
                return expect(r[0].about).to.equal('UPDATED about')
            })
        })
    });
// ------------------ Upvotes ------------------
    describe('Get project likes', function () {
        let pl;
        before('[GET /projects/:id/up', function () {
            pl = chakram.get(route + test_project.id + '/up');
        });

        it('Should get followers', function () {
            return expect(pl).to.joi(schemas.common.upvotes)
        });
    });

    describe('up project', function () {
        let r, v;
        before('[POST /projects/:id/up]', function () {
            r = chakram.post(route + test_project.id + '/up');
            v = chakram.get(route + test_project.id + '/up');
        });

        it('Should up a project', function () {
            expect(r).to.joi(schemas.common.success).to.have.status(200);
            return chakram.wait()
        });

        it('Should appear in db', function () {
            v.then(res => {
                return expect(res.body.upvotes.who[res.body.upvotes.who.length - 1])
                    .to.have.property('id', storage.user.profile_id)
            });
        })
    });

    describe('Unup project', function () {
        let r, v;
        before('[DELETE /projects/:id/up', function () {
            r = chakram.delete(route + test_project.id + '/up')
        });

        it('Should send success true', function () {
            return expect(r).to.joi(schemas.common.success).to.have.status(200)
        });
    });
// ------------------ DISCUSSION ------------------
    describe('Get project discussion [GET /projects/:id/discussions]', function() {
        let r, v;
        before('request', function() {
            r = chakram.get(route + 242 + '/discussions');
            v = chakram.get(route + storage.fakeId + '/discussions');
        });
    
        it('Should get a project list', function() {
            return expect(r).to.joi(schemas.projects.discussions);
        });

        it('Should send an error', function() {
            return expect(v).to.joi(schemas.error.description);
        });
    });

    describe('Create project discussion [POST /projects/:id/discussions]', function() {
        let r,r2, v;
        before('request', function() {
            r = chakram.post(route + test_project.id + '/discussions', {message: "Testy test", title: "Waddya do"});
        });
    
        it('Should send success', function() {
            return expect(r).to.joi(schemas.common.id);
        });
    });

    require('./discussions.test')(storage, chakram);
// ------------------ OPENINGS ------------------
    describe('Get project openings [GET /projects/:id/openings]', function() {
        let r, v;
        before('request', function() {
            r = chakram.get(route + 7 + '/openings');
        });
    
        it('should get openings list', function() {
            return expect(r).to.joi(schemas.projects.openings);
        });
    });

    describe('Create project openings [POST /projects/:id/openings]', function() {
        let r, v;
        const data = {
            status: 'any',
            description: 'very test so chakram',
            tags: `['mocha', 'chai', 'chakram']`
    }; 
        before('request', function() {
            r = chakram.post(route + 7 + '/openings', data);
        });
    
        it('Should create a project opening', function() {
            return expect(r).to.joi(schemas.common.id);
        });
    });
    require('./openings.test')(storage, chakram)

// ------------------ PROJECTS [main methods: remove project] ------------------
    describe('Remove project [DELETE /projects/:id]', function() {
        let r, v;
        before('request', function() {
            r = chakram.delete(route + 502);
        });
    
        it('Should remove a project', function() {
            return expect(r).to.joi(schemas.common.success);
        });

        after('cleanup id', function() {
            db.raw('DELETE from projects where id > 501').return()
            db.raw('alter table projects AUTO_INCREMENT = 502').return();
        });
});

};// ------------------ end module ------------------