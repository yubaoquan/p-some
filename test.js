const pSome = require('./index');


const promises = [
    wait(100).then(() => 1),
    wait(200).then(() => 2),
    wait(300).then(() => 3),
    wait(400).then(() => 4),

];

function wait(t) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, t);
    });
}

pSome(promises, {
    count: 2,
    filter(n) {
        return n > 1;
    },
})
    .then((arr) => {
        console.info(arr);
    })
    .catch((e) => {
        console.error('error:', e);
    });
