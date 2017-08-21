const hello = require('./feedback-to-founders')

const ONE_HOUR = 1000 * 3600,
QUARTER_HOUR = ONE_HOUR / 4,
HALF_HOUR = ONE_HOUR / 2,
TWO_HOURS = ONE_HOUR * 2,
ONE_DAY = ONE_HOUR * 24,
ONE_WEEK = ONE_DAY * 7;

const runTime = () => {
    setInterval(hello, ONE_DAY);
};

runTime();
