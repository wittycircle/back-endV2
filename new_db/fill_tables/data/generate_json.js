const special_config = {
    client: 'mysql',
    connection: process.env.DATABASE_URL || {
        host: '127.0.0.1',
        user: 'root',
        password: 'dbwitty',
        database: 'newdb', 
    },
    pool: {
        min: 0,
        max: 1
    }
},
    old_config = {
    client: 'mysql',
    connection: process.env.DATABASE_URL || {
        host: '127.0.0.1',
        user: 'root',
        password: 'dbwitty',
        database: 'sunday', 
    },
    pool: {
        min: 0,
        max: 1
    }
};

const db = require('knex')(special_config);
const old = require('knex')(old_config);


const generate_json_user = (db, old) => {
	let users = {}
	let old_u = old('users').select('id');
	let new_u = db('users').select('id');
return 	Promise.all([old_u, new_u]).then(([r, rr]) => {
			let l = r.length;
			for(let i = 0;i< l;i++){
				let k =	 r[i].id;
				let v = rr[i].id;
				users[k] = v
			}
			console.log(JSON.stringify(users))
	})

}

const generate_json_location = (db, old) => {
	return db('location').select('*').then(r => {
		console.log(JSON.stringify(r))
	})
}

generate_json_location(db, old)