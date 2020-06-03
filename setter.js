
function getter(obj, key, defaultValue) {
    if (!key) return ;
    const matches = Array.isArray(key) ? key : key.split(".");
    let result = obj;
    matches.forEach((item) => {
        result = result[item];
    });
    return result;
}

function setter(obj, key, data) {
    if (!key) return ;
    const matches = Array.isArray(key) ? key : key.split(".");
    let middle = obj;
    for (let i = 0, len = matches.length; i < len; i++) {
        if (i === len - 1) {
            middle[matches[i]] = data;
        } else {
            middle = middle[matches[i]] || {};
        }
    }
}

const set = (obj, path, value) => {
    if (Object(obj) !== obj) return obj; // When obj is not an object
    // If not yet an array, get the keys from the string-path
    if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []; 
    path.slice(0,-1).reduce((a, c, i) => // Iterate all of them except the last one
         Object(a[c]) === a[c] // Does the key exist and is its value an object?
             // Yes: then follow that path
             ? a[c] 
             // No: create the key. Is the next key a potential array-index?
             : a[c] = Math.abs(path[i+1])>>0 === +path[i+1] 
                   ? [] // Yes: assign a new array object
                   : {}, // No: assign a new plain object
         obj)[path[path.length-1]] = value; // Finally assign the value to the last key
    return obj; // Return the top-level object to allow chaining
};

// Demo
var obj = { test: true };
set(obj, "test.name.it", "hello");
console.log(obj); // includes an intentional undefined value

// let obj = {
//     person: [ { name: '232323' }, {name:2 } ],
//     item: {
//         title: 'sdfsdf',
//         data: {
//             title: '111'
//         }
//     }
// };
let data ;
// setter(obj, 'person.[0].name', 'sdfsdf32323');
// data = getter(obj, 'person.[0].name');
// console.log(data);

// setter(obj, 'person[0].name', 'dsd');
// data = getter(obj, 'person.[0].name');
// console.log(data);

// setter(obj, ['person', '0', 'name'], 'dsd');
// data = getter(obj, 'person.[0].name');
// console.log(data);
