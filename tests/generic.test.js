const chakram = require('chakram'),
    expect = chakram.expect;

chakram.addMethod('joi', require('chakram-joi'));

module.exports.generic = (method, route, schema, data) => {
    describe('[' + route + ']', function() {
        let r, v;
        before('request', function() {
            r = chakram[method](route, data);
        });
    
        it('should match schema', function() {
            return expect(r).to.joi(schema);
        });
    });
};