
Promise.series = function (...funcs) {
    return funcs.reduce((a, b) => a.then(b), Promise.resolve());
}

Promise.series1 = function(...funcs) {
    return new Promise((resolve, reject) => {
        let index = 0;
        const len = funcs.length;
        function step(arg) {
            if (index >= len) {
                return resolve(arg);
            }
            return Promise.resolve(arg).
                then(funcs[index++], reject)
                .then(step, reject);
        }
        step();
    })
}

function requestA(sum) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(sum + 1)
        }, 1000);
    })    
}

function requestB(sum) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(sum + 2)
        }, 2000);
    })
}
function requestError() {
    return new Promise((resolve, reject) => {
        throw new Error("sdfasd");
    })
}

Promise.series(() => Promise.resolve(0), requestA, requestB)
    .then((sum) => {
    console.log(sum);
}).catch((err) => {
    console.log(err);
});

Promise.series(() => Promise.resolve(0), requestError, requestA, requestB)
    .then((sum) => {
    console.log(sum);
}).catch((err) => {
    console.log(err);
});

Promise.series1(() => Promise.resolve(0), requestA, requestB)
    .then((sum) => {
    console.log(sum);
}).catch((err) => {
    console.log(err);
});
Promise.series1(() => Promise.resolve(0), requestError, requestA, requestB)
    .then((sum) => {
    console.log(sum);
}).catch((err) => {
    console.log(err);
})

