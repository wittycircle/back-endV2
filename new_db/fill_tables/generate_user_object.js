
_ = require('lodash')
const generate_obj = (db, old) => {
	let o = {}
	return old('users').select('id').then(r => {
		return db('users').select('id').then(rr => {
			let l = r.length;
			for(let i = 0;i< l;i++){
				let k = r[i].id;
				let v = rr[i].id;
				o[k] = v
			}
			console.log(r.length, rr.length)
			// console.log(_.size(o))
			return o;
		})
	})
}
// const generate = (db, old) => {
// 	setInterval(() => generate_obj(db, old), 500)
// }

module.exports = generate_obj