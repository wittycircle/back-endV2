const feedback 			= require('./feedback_to_founders'),
	complete_profile 	= require('./complete_profile') 


const ONE_HOUR = 1000 * 3600,
QUARTER_HOUR = ONE_HOUR / 4,
HALF_HOUR = ONE_HOUR / 2,
TWO_HOURS = ONE_HOUR * 2,
ONE_DAY = ONE_HOUR * 24,
ONE_WEEK = ONE_DAY * 7;

const runTime = () => {
	setInterval(complete_profile, ONE_DAY)
    setInterval(feedback, ONE_DAY * 3);
};

runTime();
