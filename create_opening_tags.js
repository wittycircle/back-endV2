const config = require('./app/private'),
    {db, TABLES} = require('./app/models/index'),
    _ = require('lodash');


const dropProjectTag = () => db.schema.dropTableIfExists('opening_tags');

const createProjectTag = [db.schema.createTable('opening_tags', function (t) {
    t.increments();
    t.integer('opening_id').notNullable();
    t.string('tag').notNullable();
    t.foreign('opening_id').references('project_openings.id').onDelete('cascade');
    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
    // t.timestamp('updated_at').defaultTo(db.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
})]

const query = () => {
    return db.select('id', 'tags').from(TABLES.PROJECT_OPENINGS).whereRaw('tags <> "0"')
        .then((data) => {
            console.log("Data: ", data)
            console.log("// ------------------  ------------------")
            let z = data.map(e => {
                return {
                    opening_id: e.id,
                    tag: e.tags.replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '').split(',')
                }
            })
            let x = []
            z.forEach(e => {
                e.tag.forEach(t => {
                    x.push({opening_id: e.opening_id, tag: t})
                })
            });
            console.log(x)
            return x;
        });
}

// query()
// ------------------  ------------------

const modify_db = () => {
    return dropProjectTag()
        .then(() => Promise.all(createProjectTag))
        .then(query)
        .then((new_data) => db.batchInsert('opening_tags', new_data))
};

modify_db();