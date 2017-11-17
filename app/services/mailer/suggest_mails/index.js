const suggestion_profile 	= require('./suggestion_profile'),
	suggestion_project 		= require('./suggestion_project')

const ONE_HOUR = 1000 * 3600,
QUARTER_HOUR = ONE_HOUR / 4,
HALF_HOUR = ONE_HOUR / 2,
TWO_HOURS = ONE_HOUR * 2,
ONE_DAY = ONE_HOUR * 24,
ONE_WEEK = ONE_DAY * 7;

const runTime = () => {
	console.log("RUNTIME !")
	suggestion_profile();
	suggestion_project();
	runTime2();
	setInterval(suggestion_profile, (ONE_WEEK - (ONE_HOUR * 6)));
	setInterval(suggestion_project, (ONE_WEEK - (ONE_HOUR * 6)));
	console.log("RUNTIME SUCCESS!");
};

const runTime2 = () => {
	console.log("RUNTIME 2 CHECK!");
	setInterval(suggestion_profile, ((ONE_WEEK - (ONE_DAY * 3)) - (ONE_HOUR * 6)) );
	setInterval(suggestion_project, ((ONE_WEEK - (ONE_DAY * 3)) - (ONE_HOUR * 6)) );
};

runTime();