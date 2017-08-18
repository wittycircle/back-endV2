const hello = require('./feedback-to-founders')

const runTime = () => {
    setInterval(hello, 1000);
};

runTime();

