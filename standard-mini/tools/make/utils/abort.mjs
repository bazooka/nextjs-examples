import colors from 'colors';

/**
* Helper to stop program
* 
* @param {String} msg 
*/
const abort = (msg) => {
    console.log('\n' + colors.red.inverse(' ERROR ') + ' ' + msg + '\n');
    process.exit();
};

export default abort;
