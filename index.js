function pSome(promises = [], opt) {
    let count, filter;
    if (Number.isInteger(opt)) {
        count = opt;
        filter = () => true;
    } else {
        count = opt.count;
        filter = opt.filter;
    }
    let finished = 0;
    let errored = 0;
    let ret = [];
    if (!promises) {
        throw new Error('Expect an array of Promise, but got', promises);
    }
    if (promises.some((p) => {
        return typeof p.then !== 'function';
    })) {
        throw new Error('Expect an array of promises, but some items are not promises');
    }
    if (promises.length < count) {
        throw new Error('Promise number is less than count');
    }
    return new Promise((resolve, reject) => {
        function ifShouldReject() {
            if (errored + count > promises.length) {
                reject('Fulfilled count less than expected');
            }
        }
        promises.forEach((pro) => {
            pro
                .then((res) => {
                    if (finished < count) {
                        if (filter(res)) {
                            ret.push(res);
                            finished++;
                        } else {
                            errored ++;
                            ifShouldReject();
                        }
                    } else {
                        return resolve(ret);
                    }
                })
                .catch((e) => {
                    errored ++;
                    ifShouldReject();
                });
        });
    });
}

module.exports = pSome;
