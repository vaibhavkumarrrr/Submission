//let reverse=([x,...y])=>(y.length>0)?[...reverse(y),x]:[x];
//1.function that ake input of 2 arrays--overload one for string
//or for number
//1.5 flatter the array first
//2. common elemts logic 
function findcommon(arr1, arr2) {
    let v1;
    let v2;
    if (typeof (arr1) === "string") {
        v1 = [arr1.toLowerCase()];
        v2 = [arr2.toLowerCase()];
    }
    else {
        v1 = [...arr1];
        v2 = [...arr2];
    }
    let result = new Set();
    for (let i = 0; i < v1.length; i++) {
        for (let j = 0; j < v2.length; j++) {
            if (v1[i] === v2[j]) {
                result.add(v1[i]);
                break;
            }
        }
    }
    return [...result];
}
console.log(findcommon("vaibhav", "vaibhavkumar"));
