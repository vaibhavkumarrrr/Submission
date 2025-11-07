// BASICS MODULE
console.log("BASICS MODULE");
try {
    console.log("Hello World");
    let i: number | string | null | undefined = 0;
    i = i + 300 - 4 * 100;
    console.log(i);
    i = "Vaibhav";
    console.log(i);
    i = null;
    console.log(i);
    i = undefined;
    console.log(i);
} catch (err: any) {
    console.error("Error in Basics Module:", err.message);
}

// LOOPS MODULE
console.log("LOOPS MODULE");
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
} catch (err: any) {
    console.error("Error in Loops Module:", err.message);
}

// ARRAY MODULE
console.log("ARRAY MODULE");
try {
    let array: (number | string)[] = [1, 2, 3, 4, 5, "vk"];
    array.forEach((value: number | string) => console.log(value));

    const a: any[] = [];
    a[10] = 3;
    a.push(5);
    a[6666] = 6;
    a[3000] = "vk";
    console.log(a[0], a[10], a[11], a[6666], a[3000], a.length);

    const values: (number | string)[] = [10, 20, "hello", 30, 40];
    let sumValues = 0;
    for (let i = 0; i < values.length; i++) {
    const val = values[i];
    if (typeof val === "number") sumValues += val;
    }
    console.log("Array:", values);
    console.log("Sum of numbers only:", sumValues);

    
    const b = [1, 2, 3];
    const c: any[] = [];
    const d = new Array("Vaibhav", "Kumar");
    const e = new Array(10);
    console.log(a.length, b.length, c.length, d.length, e.length);

    const t = 6;
    console.log(t);

    try {
        // @ts-ignore - intentional runtime RangeError
        const g = new Array(6.7);
        console.log(g.length);
    } catch (err: any) {
        console.log("Error:", err.message);
    }
} catch (err: any) {
    console.error("Error in Array Module:", err.message);
}

// FUNCTIONS MODULE
console.log("FUNCTIONS MODULE");
try {
    function sayHello(name: string | number | null): void {
        if (name != null) {
            console.log("Hello " + name);
        }
    }
    sayHello("vk");
    sayHello(1);
    sayHello(null);

    function $(this: any): void {
        this.name = "Vaibhav";
        console.log("Inside $ function");
    }

    const bFunc = function (): void {
        console.log("b function of $");
    };
    ($ as any).b = bFunc;
    ($ as any).b();

    function block(): void {
        function foo(): void {
            console.log(x);
        }
        let x = 3;
        foo();
    }
    block();

    const val: (() => number)[] = [];
    for (let x = 0; x < 4; x += 1) {
        val.push(() => x);
    }
    console.log(val.map(fn => fn()));
} catch (err: any) {
    console.error("Error in Functions Module:", err.message);
}

// OBJECTS & SYMBOLS MODULE
console.log("OBJECTS & SYMBOLS MODULE");
try {
    const obj = { par: 3 };
    obj.par = 15;

    let x = 3;
    const xo = { x };
    console.log(xo.x);

    const eq: { x: number; y: number }[] = [];
    for (let x = 1; x <= 20; x++) {
        eq.push({ x, y: 2 * x * x - 5 * x + 3 });
    }
    console.log(eq);

    const s1: symbol = Symbol("vk");
    const s2: symbol = Symbol("vk");
    console.log(s1 == s2);
    console.log(s1 === s2);
    const s3 = s1;
    console.log(s1 == s3);
    console.log(s1 === s3);

    const js_obj = {
        name: "vk",
        age: 60,
        [Symbol.toPrimitive](hint: string) {
            if (hint === "string") return "Hint : guess over 50";
            if (hint === "number") return 58;
            return "somewhere between 50 and 60";
        },
    };
    console.log(`${js_obj}`);
    console.log(js_obj + "");
    console.log(+js_obj);
    console.log(js_obj);
} catch (err: any) {
    console.error("Error in Objects & Symbols Module:", err.message);
}

// CLASSES MODULE
console.log("CLASSES MODULE");
try {
    class Jedi {
        forceIsDark: boolean;
        constructor() {
            this.forceIsDark = false;
        }
        toString(): string {
            return (this.forceIsDark ? "Join" : "Fear is the path to") + " the dark side.";
        }
    }

    class Sith extends Jedi {
        constructor() {
            super();
            this.forceIsDark = true;
        }
    }

    const j = new Jedi();
    console.log(`${j}`);
    const s = new Sith();
    console.log(`${s}`);
    console.log(s instanceof Jedi);
    console.log(j instanceof Sith);
    console.log(Object.getPrototypeOf(Jedi));
    console.log(Object.getPrototypeOf(Sith));
    console.log(Object.getPrototypeOf(Sith.prototype));
} catch (err: any) {
    console.error("Error in Classes Module:", err.message);
}

// ITERATORS & GENERATORS MODULE
console.log("ITERATORS & GENERATORS MODULE");
try {
    const arr = ["a", "b", "c"];
    for (const i in arr) {
        if (Object.prototype.hasOwnProperty.call(arr, i)) {
            console.log(i);
        }
    }
    for (const i of arr) {
        console.log(i);
    }

    console.log([... "abcd"]);

    const [first, second, ...rest] = "vk";
    console.log(first, second, rest);

    const it = [1, 2, 3, , 6][Symbol.iterator]();
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());

    function gen(n: number): Iterable<number> {
        return {
            [Symbol.iterator]() {
                let i = 0;
                return {
                    next() {
                        return { done: i > n, value: i++ };
                    },
                };
            },
        };
    }
    console.log(Array.from(gen(10), x => x * x));

    function* genFour(): Generator<number, number, void> {
        yield 1;
        yield 2;
        yield 3;
        return 4;
    }
    const four = genFour();
    console.log(four.next());
    console.log(four.next());
    console.log(four.next());
    console.log(four.next());
    console.log(four.next());

    function* flatten(array: any[]): Generator<any> {
        for (const x of array) {
            if (Array.isArray(x)) yield* flatten(x);
            else yield x;
        }
    }
    console.log([...flatten([1, [2, 3], 4, [5, 6, [7, 8]]])]);

    function* genInf(): Generator<number> {
        for (let i = 0; ; i++) {
            yield i;
        }
    }
    const genInfinite = genInf();
    console.log(genInfinite.next().value);
    console.log(genInfinite.next().value);
    console.log(genInfinite.next().value);

    const reverse = ([x, ...y]: number[]): number[] =>
        y.length > 0 ? [...reverse(y), x] : [x];
    console.log(reverse([1, 2, 3, 4, 5]));

    function* squares(n: number): Generator<number> {
        for (let i = 1; i < n; i++) {
            yield i * i;
        }
    }
    console.log([...squares(10)]);
} catch (err: any) {
    console.error("Error in Iterators & Generators Module:", err.message);
}

// ASYNC MODULE
console.log("ASYNC MODULE");
try {
    const rating = [5, 4, 5];
    let sumRating = 0;

    const asynSumFunction = async (a: number, b: number): Promise<number> => a + b;

    (async () => {
        for (const rate of rating) {
            sumRating = await asynSumFunction(sumRating, rate);
            console.log("Asynchronous Sum:", sumRating);
        }
        console.log("Final sum:", sumRating);
    })();
} catch (err: any) {
    console.error("Error in Async Module:", err.message);
}

// ARRAY KEYS / ENTRIES MODULE
console.log("ARRAY KEYS/");
try {
    const logArrayElement = (element: any, index: number): void => {
        console.log(`a[${index}] = ${element}`);
    };
    [2, 5, , 9].forEach(logArrayElement);

    const arrayLike = { 0: "Hello", 1: "World", length: 2 };
    console.log(Array.from(arrayLike));

    const s1 = ["a", "b", "c"].keys();
    console.log(s1.next());
    console.log(s1.next());
    console.log(s1.next());
    console.log(s1.next());

    const s = [...["a", "b", "c"].keys()];
    console.log(s);

    const s3 = Array.from(["a", "b", "c"].entries());
    console.log(s3);

    const s2 = ["a", "b", "c"].entries();
    console.log(s2.next());
    console.log(s2.next());
    console.log(s2.next());
    console.log(s2.next());
} catch (err: any) {
    console.error("Error in Array Keys/Entries Module:", err.message);
}

// MAP & SET MODULE
console.log("MAP & SET MODULE");
try {
    console.log([4, 3, 66, 56, 78].find(x => x > 10));

    const m = new Map<string, number>([["a", 1], ["b", 2], ["c", 3]]);
    console.log(m.get("b"));
    console.log(m.has("c"));
    m.set("d", 4);
    console.log(m.size);
    m.delete("a");
    console.log(m.size);

    for (const [key, value] of m) {
        console.log(`${key} : ${value}`);
    }

    const m2 = new Map<string, string>([..."abcd"].map(x => [x, x + x]));
    console.log(JSON.stringify([...m2]));
    console.log(JSON.stringify([...m2.keys()]));
    console.log(JSON.stringify([...m2.values()]));
    console.log(JSON.stringify([...m2.entries()]));

    const sSet = new Set<number>([1, 2, 3, 4, 5, 5, 4, 3, 2, 1]);
    sSet.add(6);
    sSet.add(3);
    console.log(sSet.size);
    sSet.delete(2);
    console.log(sSet.size);
    for (const v of sSet) {
        console.log(v);
    }
} catch (err: any) {
    console.error("Error in Map & Set Module:", err.message);
}

// DESTRUCTURING MODULE
console.log("DESTRUCTURING MODULE");
try {
    const aObj = { x: 3, y: 4 };
    const { x: xVal, y: zVal } = aObj;
    console.log(xVal, zVal);

    const { y } = aObj;
    console.log(y);

    const [a, b = 3] = [1, undefined];
    console.log(a, b);

    const [xDef = 4, yDef = xDef] = [];
    console.log(xDef, yDef);

    const [d = 4, c = d] = [];
    console.log(c, d);
} catch (err: any) {
    console.error("Error in Destructuring Module:", err.message);
}
