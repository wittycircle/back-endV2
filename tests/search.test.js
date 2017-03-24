'use strict';

const {db, TABLES} = require('../app/models/index');
const p_empty = ['', null];

module.exports = (storage, chakram) => {
    const expect = chakram.expect,
        route = storage.resource(''),
        rnd_string = Math.random().toString(36).slice(-10),
        schemas = {
            common: require('./schemas/common.schema'),
            search: require('./schemas/search.schema'),
            error: require('./schemas/error.schema')
        };
    describe('', function () {
        it('should print something big', function () {
            console.log("\x1b[35m" + " ------------------ Search ------------------\n");
        })
    });

    describe('Project cards [/projects/search]', function () {
        const data = {
            "query": {
                "sort": {
                    "field": "followers",
                    "reverse": true
                },
                "members": [

                    {
                        "field": "skills",
                        "value": ["javascript"]
                    },
                    {
                        "field": "network",
                        "value": "wittycircle"
                    }
                ]
            },
            "paginate": {
                "limit": 1000,
                "offset": 0
            }
        };
        let r, v;
        before('request', function () {
            r = chakram.post(route + 'projects/search', data);
            v = chakram.post(route + 'projects/search', {badata: "bad data"})
        });

        it('Should match schema', function () {
            return r.then(rr => console.log(rr.body.projects))
            return expect(r).to.joi(schemas.search.projects);
        });
        it('Should match validation error', function () {
            return expect(v).to.joi(schemas.error.validation_error_schema)
        });
    });
// ------------------ Profiles ------------------
    describe('Profiles cards [/profiles/search]', function () {
        const data = {
            "query": {
                "sort": {
                    "field": "rank",
                    "reverse": false
                },
                "members": [{
                    "field": "skills",
                    "value": "javascript"

                }]
            },
            "paginate": {
                "limit": 100,
                "offset": 0
            }
        };
        let r, v;
        before('request', function () {
            r = chakram.post(route + 'profiles/search', data);
            v = chakram.post(route + 'profiles/search', {badata: "bad data"})
        });

        it('Should match schema', function () {
            return expect(r).to.joi(schemas.search.profiles);
        });
        it('Should match validation error', function () {
            return expect(v).to.joi(schemas.error.validation_error_schema);
        });
    });
}