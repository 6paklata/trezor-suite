// This scripts finds messages (translations) that are not used anywhere. 
// We dont want to have such messages as they mean unneccessary work for translators

const fs = require('fs');
const recursive = require('recursive-readdir-sync');

// all messages should be in this one and only file
import messages from '../../packages/suite/src/support/messages';


// read all paths we are interested in. filter out those we are not. 
const paths = recursive('../../packages/suite/src').filter(path => {
    // - we dont need file with defined messages
    if (path.includes('messages.ts')) return false;
    if (path.includes('.messages.ts')) return false;
    if (path.includes('__test__')) return false;
    if (path.includes('__tests__')) return false;
    if (path.includes('.test.ts')) return false;
    // all other are ok.
    return true;
});

// just an object we are going to use to count occurrences of messages throughout the codebase
const tracker = {};

paths.forEach(path => {
    const file = fs.readFileSync(path, 'utf-8');
    Object.keys(messages).forEach(m => {
        if (!tracker[m]) {
            tracker[m] = 0;
        }

        if (file.includes(m)) {
            tracker[m]++;
        }
    })
});

// lets check the results
const unused = Object.entries(tracker).filter(t => {
    return t[1] === 0;
}).map(t => t[0]);

if (unused.length === 0) {
    console.log('Good job, no useless keys in messages');
    process.exit(0);
} 

console.log(unused);
console.log(`Achtung achtung!, there is total ${unused.length} unused messages.`)
process.exit(1);