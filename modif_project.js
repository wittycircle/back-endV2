const {db, TABLES} = require('./app/models/index');

const h = require('./app/models/helper'),
 _ = require('lodash');

const modify_project = () => {
return	db.schema.table('projects', function(t) {
		t.string('link')
		t.string('app')
		t.string('logo')
		t.dropColumns([
"view",
"creator_user_name",
"creator_user_picture",
"category_name",
"picture_position",
"main_video_id",
"picture_card",
"video_poster",
"vote",
"check_vote",
])
	});
};

const modify_db = () => {
	return modify_project().then(console.log("SHould have worked"))
}

modify_db()