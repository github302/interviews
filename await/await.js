function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("data"), 1000);
    });
} 

async function test() {
    const data = await getData();
    console.log("Data:", data);
    const data2 = await getData();
    console.log("data2:", data2);
    return "success";
}

test().then((res) => {
    console.log(res);
});


function* testG() {
    const data = yield getData();
    console.log("data:", data);
    const data2 = yield getData();
    console.log("data2", data2);
    return "success";
}
/**
 * 手动调用generator方法
 */
function test1() {
    const gen = testG();
    console.log(gen);
    var dataPromise = gen.next().value;
    console.log(dataPromise);
    dataPromise.then((value1) => {
        console.log("value1:", value1);
        var dataPromise2 = gen.next(value1).value;

        dataPromise2.then((value2) => {
            console.log("value2:", value2);
            gen.next(value2);
        })
    })
}
test1();

/**
 * 用 generator 实现 await
 * @param {*} generatorFunc 
 */
function asyncToGenerator(generatorFunc) {
    return function() {
        const gen = generatorFunc.apply(this, arguments);
        return new Promise((resolve, reject) => {
            function step(key, arg) {
                let generatorResult;
                try {
                    generatorResult = gen[key](arg);
                } catch(err) {
                    return reject(err);
                }

                const { value, done } = generatorResult;
                if (done) {
                    return resolve(value);
                }
                return Promise.resolve(value).then(
                    (val) => step('next', val),
                    err => step('throw', err),
                )
            }
            step("next");
        })
    }
}

var test2 = asyncToGenerator(testG);
test2().then((res) => console.log(res));
