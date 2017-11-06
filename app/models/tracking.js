const { db, TABLES } = require('./index');

exports.updateTrackingPageClick = (req, params) => {

	const updateClickZone = db('zone_click_activities')
		.whereRaw('zone_id = ? AND page_modal_id = ? AND DATE(creation_date) = CURDATE()', [params.zone_id, params.page_id])
		.increment('rate', 1);

	const insertClickZone = db('zone_click_activities')
		.insert([{zone_id: params.zone_id, page_modal_id: params.page_id, rate: 1}])

	return db('zone_click_activities')
		.count('* as number')
		.whereRaw('zone_id = ? AND page_modal_id = ? AND DATE(creation_date) = CURDATE()', [params.zone_id, params.page_id])
		.then(r => {
			if (r[0].number === 1) {
				Promise.all([
					updateClickZone
				]).then(r => {
					if (params.user_id)
						return db('user_click_activities')
							.insert([{ user_id: params.user_id, zone_id: params.zone_id, page_id: params.page_id }]);
					return ;
				});
			} else {
				Promise.all([
					insertClickZone
				]).then(r => {
					if (params.user_id)
						return db('user_click_activities')
							.insert([{ user_id: params.user_id, zone_id: params.zone_id, page_id: params.page_id }]);
					return ;
				});
			}
		})

};

exports.updateTrackingPageView = (req, params) => {
	const updateViewPage = db('zone_view_activities')
		.whereRaw('page_modal_id = ? AND DATE(creation_date) = CURDATE()', [params.page_id])
		.increment('rate', 1);

	const insertViewPage = db('zone_view_activities')
		.insert([{page_modal_id: params.page_id, rate: 1}]);


	return db('zone_view_activities')
		.count('* as number')
		.whereRaw('page_modal_id = ? AND DATE(creation_date) = CURDATE()', [params.page_id])
		.then(r => {
			if (r[0].number === 1) {
				Promise.all([
					updateViewPage
				]).then(r2 => {
					if (params.user_id)
						return db('user_view_activities')
							.insert([{ user_id: params.user_id, page_id: params.page_id }]);
					return ;
				});
			} else {
				Promise.all([
					insertViewPage
				]).then(r2 => {
					if (params.user_id)
						return db('user_view_activities')
							.insert([{ user_id: params.user_id, page_id: params.page_id }]);
					return ;
				})
			}
		});
};