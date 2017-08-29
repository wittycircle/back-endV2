const feedback 			= require('./feedback_to_founders'),
	complete_profile 	= require('./complete_profile'),
	complete_project 	= require('./complete_project')


const ONE_HOUR = 1000 * 3600,
QUARTER_HOUR = ONE_HOUR / 4,
HALF_HOUR = ONE_HOUR / 2,
TWO_HOURS = ONE_HOUR * 2,
ONE_DAY = ONE_HOUR * 24,
ONE_WEEK = ONE_DAY * 7;

const runTime = () => {
	/* COMPLETE PROFILE */
	setInterval(complete_profile(1), ONE_DAY);
	setInterval(complete_profile(10), ONE_DAY * 10);
	setInterval(complete_profile(30), ONE_DAY * 30);

	/* COMPLETE PROJECT */
	setInterval(complete_project(2), ONE_DAY * 2);
	setInterval(complete_project(10), ONE_DAY * 10);
	setInterval(complete_project(30), ONE_DAY * 30);

	/* FEEDBACK */
    setInterval(feedback, ONE_DAY);
};

runTime();
