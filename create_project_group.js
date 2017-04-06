const config = require('./app/private'),
    {db, TABLES} = require('./app/models/index'),
    _ = require('lodash');


const dropProjectTag = () => db.schema.dropTableIfExists('networks_group');

const createProjectTag = [db.schema.createTable('networks_group', function (t) {
    t.increments();
    t.string('title');
    t.string('logo');
    t.string('city');
    t.string('state');
    t.string('country');
    t.text('story');
    t.timestamp('creation_date').defaultTo(db.raw('CURRENT_TIMESTAMP'));
})]


// query()
// ------------------  ------------------

let story = `"42 is a private, nonprofit and tuition-free computer programming school created and funded by French billionaire Xavier Niel (Founder of the telecommunication company Illiad) with several partners including Nicolas Sadirac (previous director-general of the Epitech school in France), Kwame Yamgnane and Florian Bucher (former executives of Epitech). The school was first opened in Paris in 2013."`

let  data = [
	{
	    title: "42",
	    logo : 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/1200px-42_Logo.svg.png',
	    city : 'Paris',
	    state : '',
	    country : 'France',
	    story : story
	}
]

const modify_db = () => {
    return dropProjectTag()
        .then(() => Promise.all(createProjectTag))
        .then(() => db.batchInsert('networks_group', data))
         .then(console.log(data, "-----------------"))
        .catch(err => console.error("Something happened! ", err))
};

modify_db();
