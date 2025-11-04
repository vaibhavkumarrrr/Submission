console.log("BASICS MODULE")
try {
    console.log("Hello World");
    let i = 0;
    i = i + 300 - 4 * 100;
    console.log(i);
    i = "Vaibhav";
    console.log(i);
    i = null;
    console.log(i);
    i = undefined;
    console.log(i);
} catch (err) {
    console.error("Error in Basics Module:", err.message);
}

console.log("LOOPS MODULE")
try {
    let sum = 0;
    for (let j = 1; j <= 100; j++) {
        sum += j;
    }
    console.log("For Loop Sum:", sum);

    let sum2 = 0;
    let k = 1;
    while (k <= 100) {
        sum2 += k;
        k++;
    }
    console.log("While Loop Sum:", sum2);
} catch (err) {
    console.error("Error in Loops Module:", err.message);
}

console.log("ARRAY MODULE")
try {
    let array = [1, 2, 3, 4, 5, "vk"];
    array.forEach(value => console.log(value));

    var a = [];
    a[10] = 3;
    a.push(5);
    a[6666] = 6;
    a[3000] = "vk";
    console.log(a[0], a[10], a[11], a[6666], a[3000], a.length);

    let values = [10, 20, "hello", 30, 40];
    let sumValues = 0;
    for (let i = 0; i < values.length; i++) {
        if (!isNaN(values[i])) sumValues += values[i];
    }
    console.log("Array:", values);
    console.log("Sum of numbers only:", sumValues);

    var b = [1, 2, 3];
    var c = new Array();
    var d = new Array("Vaibhav", "Kumar");
    var e = new Array(10);
    console.log(a.length, b.length, c.length, d.length, e.length);
    var t = 6;
    console.log(t);
    try {
        var g = new Array(6.7); // FIXED: will throw RangeError intentionally
        console.log(g.length);
    } catch (err) {
        console.log("Error:", err.message);
    }
} catch (err) {
    console.error("Error in Array Module:", err.message);
}

console.log("FUNCTIONS MODULE"); 
try {
    function sayHello(name) {
        if (name != null) {
            console.log("Hello " + name);
        }
    }
    sayHello("vk");
    sayHello(1);
    sayHello(null);

    function $() {
        this.name = "Vaibhav";
        console.log("Inside $ function");
    }
    var bFunc = function () {
        console.log("b function of $");
    };
    $.b = bFunc;
    $.b();

    function block() {
        function foo() {
            console.log(x);
        }
        let x = 3;
        foo(); 
    }
    block();

    let val = [];
    for (var x = 0; x < 4; x += 1) {
        val.push(() => x);
    }
    console.log(val.map(fn => fn()));
} catch (err) {
    console.error("Error in Functions Module:", err.message);
}

console.log("OBJECTS & SYMBOLS MODULE")
try {
    const obj = { par: 3 };
    obj.par = 15;
    let x = 3;
    let xo = { x: x };
    console.log(xo.x);

    let eq = [];
    for (let x = 1; x <= 20; x++) {
        eq.push({ x, y: 2 * x * x - 5 * x + 3 });
    }
    console.log(eq);

    let s1 = Symbol("vk");
    let s2 = Symbol("vk");
    console.log(s1 == s2);
    console.log(s1 === s2);
    let s3 = s1;
    console.log(s1 == s3);
    console.log(s1 === s3);

    const js_obj = {
        name: "vk", age: 60,
        [Symbol.toPrimitive](hint) {
            
            if (hint == "string") return "Hint : guess over 50";
            if (hint == "number") return 58;
            return "somewhere between 50 and 60";
        }
    };
    console.log(`${js_obj}`);
    console.log(js_obj + '');
    console.log(+js_obj);
    console.log(js_obj);
} catch (err) {
    console.error("Error in Objects & Symbols Module:", err.message);
}

console.log("CLASSES MODULE");
try {
    class Jedi {
        constructor() {
            this.forceIsDark = false;
        }
        toString() {
            return (this.forceIsDark ? 'Join' : 'Fear is the path to') + ' the dark side.';
        }
    }
    class Sith extends Jedi {
        constructor() {
            super();
            this.forceIsDark = true;
        }
    }
    let j = new Jedi("yoda");
    console.log(`${j}`);
    let s = new Sith("Darth Vader");
    console.log(`${s}`);
    console.log(s instanceof Jedi);
    console.log(j instanceof Sith);
    console.log(Jedi.__proto__);
    console.log(Sith.__proto__);
    console.log(Sith.prototype.__proto__);
} catch (err) {
    console.error("Error in Classes Module:", err.message);
}

console.log("ITERATORS & GENERATORS MODULE")
try {
    let arr = ['a', 'b', 'c'];
    for (let i in arr) {
        if (arr.hasOwnProperty(i)) {
            console.log(i);
        }
    }
    for (let i of arr) {
        console.log(i);
    }
    console.log([... "abcd"]);
    let [first, second, ...rest] = "vk";
    console.log(first);
    console.log(second);
    console.log(rest[0]);
    console.log(rest);

    // FIXED: Correct iterator usage
    let it = [1, 2, 3, , 6][Symbol.iterator]();
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());

    // FIXED: Rewritten gen function correctly
    function gen(n) {
        return {
            [Symbol.iterator]() {
                let i = 0;
                return {
                    next() {
                        return {
                            done: i > n,
                            value: i++
                        };
                    }
                };
            }
        };
    }
    console.log(Array.from(gen(10), x => x * x));

    function* genFour() {
        yield 1;
        yield 2;
        yield 3;
        return 4;
    }
    let four = genFour();
    console.log(four.next());
    console.log(four.next());
    console.log(four.next());
    console.log(four.next());
    console.log(four.next());

    function* flatten(array) {
        for (let x of array) {
            if (x instanceof Array) {
                yield* flatten(x);
            } else {
                yield x;
            }
        }
    }
    console.log([...flatten([1, [2, 3], 4, [5, 6, [7, 8]]])]);

    function* genInf() {
        for (let i = 0; ; i++) {
            yield i;
        }
    }
    let genInfinite = genInf();
    console.log(genInfinite.next().value);
    console.log(genInfinite.next().value);
    console.log(genInfinite.next().value);

    let reverse = ([x, ...y]) => (y.length > 0 ? [...reverse(y), x] : [x]);
    console.log(reverse([1, 2, 3, 4, 5]));

    function* squares(n) {
        for (let i = 1; i < n; i += 1) {
            yield i * i;
        }
    }
    console.log([...squares(10)]);
} catch (err) {
    console.error("Error in Iterators & Generators Module:", err.message);
}

console.log("ASYNC MODULE")
try {
    const rating = [5, 4, 5];
    let sumRating = 0;
    const asynSumFunction = async (a, b) => a + b;

    
    (async () => {
        for (const rate of rating) {
            sumRating = await asynSumFunction(sumRating, rate);
            console.log("Asynchronous Sum:", sumRating);
        }
        console.log("Final sum:", sumRating);
    })();
} catch (err) {
    console.error("Error in Async Module:", err.message);
}

console.log("ARRAY KEYS/")
try {
    const logArrayElement = (element, index) => {
        console.log(`a[${index}] = ${element}`);
    };
    [2, 5, , 9].forEach(logArrayElement);

    let arrayLike = { 0: 'Hello', 1: 'World', length: 2 };
    console.log(Array.from(arrayLike));

    // FIXED: show iterator properly
    var s1 = ['a', 'b', 'c'].keys();
    console.log(s1.next());
    console.log(s1.next());
    console.log(s1.next());
    console.log(s1.next());

    var s = [...['a', 'b', 'c'].keys()];
    console.log(s);

    var s3 = Array.from(['a', 'b', 'c'].entries());
    console.log(s3);

    var s2 = ['a', 'b', 'c'].entries();
    console.log(s2.next());
    console.log(s2.next());
    console.log(s2.next());
    console.log(s2.next());
} catch (err) {
    console.error("Error in Array Keys/Entries Module:", err.message);
}

console.log("MAP & SET MODULE")
try {
    console.log([4, 3, 66, 56, 78].find(x => x > 10));
    var m = new Map([['a', 1], ['b', 2], ['c', 3]]);
    console.log(m.get('b'));
    console.log(m.has('c'));
    m.set('d', 4);
    console.log(m.size);
    m.delete('a');
    console.log(m.size);
    for (let [key, value] of m) {
        console.log(key + " : " + value);
    }

    let m2 = new Map([...'abcd'].map(x => [x, x + x]));
    console.log(JSON.stringify([...m2]));
    console.log(JSON.stringify([...m2.keys()]));
    console.log(JSON.stringify([...m2.values()]));
    console.log(JSON.stringify([...m2.entries()]));

    let sSet = new Set([1, 2, 3, 4, 5, 5, 4, 3, 2, 1]);
    sSet.add(6);
    sSet.add(3);
    console.log(sSet.size);
    sSet.delete(2);
    console.log(sSet.size);
    for (let v of sSet) {
        console.log(v);
    }
} catch (err) {
    console.error("Error in Map & Set Module:", err.message);
}

console.log("DESTRUCTURING MODULE")
try {
    let aObj = { x: 3, y: 4 };
    let { x: xVal, y: zVal } = aObj;
    console.log(xVal);
    console.log(zVal);
    let { y } = aObj;
    console.log(y);

    let [a, b = 3] = [1, undefined];
    console.log(a);
    console.log(b);

    let [xDef = 4, yDef = xDef] = [];
    console.log(xDef);
    console.log(yDef);

 
    let [d = 4, c = d] = [];
    console.log(c);
    console.log(d);
} catch (err) {
    console.error("Error in Destructuring Module:", err.message);
}


