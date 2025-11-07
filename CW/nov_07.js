var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, e_1, _b, e_2, _c, e_3, _d;
var _this = this;
// BASICS MODULE
console.log("BASICS MODULE");
try {
    console.log("Hello World");
    var i = 0;
    i = i + 300 - 4 * 100;
    console.log(i);
    i = "Vaibhav";
    console.log(i);
    i = null;
    console.log(i);
    i = undefined;
    console.log(i);
}
catch (err) {
    console.error("Error in Basics Module:", err.message);
}
// LOOPS MODULE
console.log("LOOPS MODULE");
try {
    var sum = 0;
    for (var j = 1; j <= 100; j++) {
        sum += j;
    }
    console.log("For Loop Sum:", sum);
    var sum2 = 0;
    var k = 1;
    while (k <= 100) {
        sum2 += k;
        k++;
    }
    console.log("While Loop Sum:", sum2);
}
catch (err) {
    console.error("Error in Loops Module:", err.message);
}
// ARRAY MODULE
console.log("ARRAY MODULE");
try {
    var array = [1, 2, 3, 4, 5, "vk"];
    array.forEach(function (value) { return console.log(value); });
    var a = [];
    a[10] = 3;
    a.push(5);
    a[6666] = 6;
    a[3000] = "vk";
    console.log(a[0], a[10], a[11], a[6666], a[3000], a.length);
    var values = [10, 20, "hello", 30, 40];
    var sumValues = 0;
    for (var i = 0; i < values.length; i++) {
        var val = values[i];
        if (typeof val === "number")
            sumValues += val;
    }
    console.log("Array:", values);
    console.log("Sum of numbers only:", sumValues);
    var b = [1, 2, 3];
    var c = [];
    var d = new Array("Vaibhav", "Kumar");
    var e = new Array(10);
    console.log(a.length, b.length, c.length, d.length, e.length);
    var t = 6;
    console.log(t);
    try {
        // @ts-ignore - intentional runtime RangeError
        var g = new Array(6.7);
        console.log(g.length);
    }
    catch (err) {
        console.log("Error:", err.message);
    }
}
catch (err) {
    console.error("Error in Array Module:", err.message);
}
// FUNCTIONS MODULE
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
        var x = 3;
        foo();
    }
    block();
    var val = [];
    var _loop_1 = function (x) {
        val.push(function () { return x; });
    };
    for (var x = 0; x < 4; x += 1) {
        _loop_1(x);
    }
    console.log(val.map(function (fn) { return fn(); }));
}
catch (err) {
    console.error("Error in Functions Module:", err.message);
}
// OBJECTS & SYMBOLS MODULE
console.log("OBJECTS & SYMBOLS MODULE");
try {
    var obj = { par: 3 };
    obj.par = 15;
    var x = 3;
    var xo = { x: x };
    console.log(xo.x);
    var eq = [];
    for (var x_1 = 1; x_1 <= 20; x_1++) {
        eq.push({ x: x_1, y: 2 * x_1 * x_1 - 5 * x_1 + 3 });
    }
    console.log(eq);
    var s1 = Symbol("vk");
    var s2 = Symbol("vk");
    console.log(s1 == s2);
    console.log(s1 === s2);
    var s3 = s1;
    console.log(s1 == s3);
    console.log(s1 === s3);
    var js_obj = (_a = {
            name: "vk",
            age: 60
        },
        _a[Symbol.toPrimitive] = function (hint) {
            if (hint === "string")
                return "Hint : guess over 50";
            if (hint === "number")
                return 58;
            return "somewhere between 50 and 60";
        },
        _a);
    console.log("".concat(js_obj));
    console.log(js_obj + "");
    console.log(+js_obj);
    console.log(js_obj);
}
catch (err) {
    console.error("Error in Objects & Symbols Module:", err.message);
}
// CLASSES MODULE
console.log("CLASSES MODULE");
try {
    var Jedi = /** @class */ (function () {
        function Jedi() {
            this.forceIsDark = false;
        }
        Jedi.prototype.toString = function () {
            return (this.forceIsDark ? "Join" : "Fear is the path to") + " the dark side.";
        };
        return Jedi;
    }());
    var Sith = /** @class */ (function (_super) {
        __extends(Sith, _super);
        function Sith() {
            var _this = _super.call(this) || this;
            _this.forceIsDark = true;
            return _this;
        }
        return Sith;
    }(Jedi));
    var j = new Jedi();
    console.log("".concat(j));
    var s = new Sith();
    console.log("".concat(s));
    console.log(s instanceof Jedi);
    console.log(j instanceof Sith);
    console.log(Object.getPrototypeOf(Jedi));
    console.log(Object.getPrototypeOf(Sith));
    console.log(Object.getPrototypeOf(Sith.prototype));
}
catch (err) {
    console.error("Error in Classes Module:", err.message);
}
// ITERATORS & GENERATORS MODULE
console.log("ITERATORS & GENERATORS MODULE");
try {
    var arr = ["a", "b", "c"];
    for (var i in arr) {
        if (Object.prototype.hasOwnProperty.call(arr, i)) {
            console.log(i);
        }
    }
    try {
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var i = arr_1_1.value;
            console.log(i);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_b = arr_1.return)) _b.call(arr_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.log(__spreadArray([], __read("abcd"), false));
    var _e = __read("vk"), first = _e[0], second = _e[1], rest = _e.slice(2);
    console.log(first, second, rest);
    var it = [1, 2, 3, , 6][Symbol.iterator]();
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    function gen(n) {
        var _a;
        return _a = {},
            _a[Symbol.iterator] = function () {
                var i = 0;
                return {
                    next: function () {
                        return { done: i > n, value: i++ };
                    },
                };
            },
            _a;
    }
    console.log(Array.from(gen(10), function (x) { return x * x; }));
    function genFour() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, 1];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, 2];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, 3];
                case 3:
                    _a.sent();
                    return [2 /*return*/, 4];
            }
        });
    }
    var four = genFour();
    console.log(four.next());
    console.log(four.next());
    console.log(four.next());
    console.log(four.next());
    console.log(four.next());
    function flatten(array) {
        var array_1, array_1_1, x, e_4_1;
        var e_4, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, 8, 9]);
                    array_1 = __values(array), array_1_1 = array_1.next();
                    _b.label = 1;
                case 1:
                    if (!!array_1_1.done) return [3 /*break*/, 6];
                    x = array_1_1.value;
                    if (!Array.isArray(x)) return [3 /*break*/, 3];
                    return [5 /*yield**/, __values(flatten(x))];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, x];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    array_1_1 = array_1.next();
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }
    console.log(__spreadArray([], __read(flatten([1, [2, 3], 4, [5, 6, [7, 8]]])), false));
    function genInf() {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1: return [4 /*yield*/, i];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }
    var genInfinite = genInf();
    console.log(genInfinite.next().value);
    console.log(genInfinite.next().value);
    console.log(genInfinite.next().value);
    var reverse_1 = function (_a) {
        var _b = __read(_a), x = _b[0], y = _b.slice(1);
        return y.length > 0 ? __spreadArray(__spreadArray([], __read(reverse_1(y)), false), [x], false) : [x];
    };
    console.log(reverse_1([1, 2, 3, 4, 5]));
    function squares(n) {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 1;
                    _a.label = 1;
                case 1:
                    if (!(i < n)) return [3 /*break*/, 4];
                    return [4 /*yield*/, i * i];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }
    console.log(__spreadArray([], __read(squares(10)), false));
}
catch (err) {
    console.error("Error in Iterators & Generators Module:", err.message);
}
// ASYNC MODULE
console.log("ASYNC MODULE");
try {
    var rating_1 = [5, 4, 5];
    var sumRating_1 = 0;
    var asynSumFunction_1 = function (a, b) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, a + b];
    }); }); };
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var rating_2, rating_2_1, rate, e_5_1;
        var e_5, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    rating_2 = __values(rating_1), rating_2_1 = rating_2.next();
                    _b.label = 1;
                case 1:
                    if (!!rating_2_1.done) return [3 /*break*/, 4];
                    rate = rating_2_1.value;
                    return [4 /*yield*/, asynSumFunction_1(sumRating_1, rate)];
                case 2:
                    sumRating_1 = _b.sent();
                    console.log("Asynchronous Sum:", sumRating_1);
                    _b.label = 3;
                case 3:
                    rating_2_1 = rating_2.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_5_1 = _b.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (rating_2_1 && !rating_2_1.done && (_a = rating_2.return)) _a.call(rating_2);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 7:
                    console.log("Final sum:", sumRating_1);
                    return [2 /*return*/];
            }
        });
    }); })();
}
catch (err) {
    console.error("Error in Async Module:", err.message);
}
// ARRAY KEYS / ENTRIES MODULE
console.log("ARRAY KEYS/");
try {
    var logArrayElement = function (element, index) {
        console.log("a[".concat(index, "] = ").concat(element));
    };
    [2, 5, , 9].forEach(logArrayElement);
    var arrayLike = { 0: "Hello", 1: "World", length: 2 };
    console.log(Array.from(arrayLike));
    var s1 = ["a", "b", "c"].keys();
    console.log(s1.next());
    console.log(s1.next());
    console.log(s1.next());
    console.log(s1.next());
    var s = __spreadArray([], __read(["a", "b", "c"].keys()), false);
    console.log(s);
    var s3 = Array.from(["a", "b", "c"].entries());
    console.log(s3);
    var s2 = ["a", "b", "c"].entries();
    console.log(s2.next());
    console.log(s2.next());
    console.log(s2.next());
    console.log(s2.next());
}
catch (err) {
    console.error("Error in Array Keys/Entries Module:", err.message);
}
// MAP & SET MODULE
console.log("MAP & SET MODULE");
try {
    console.log([4, 3, 66, 56, 78].find(function (x) { return x > 10; }));
    var m = new Map([["a", 1], ["b", 2], ["c", 3]]);
    console.log(m.get("b"));
    console.log(m.has("c"));
    m.set("d", 4);
    console.log(m.size);
    m.delete("a");
    console.log(m.size);
    try {
        for (var m_1 = __values(m), m_1_1 = m_1.next(); !m_1_1.done; m_1_1 = m_1.next()) {
            var _f = __read(m_1_1.value, 2), key = _f[0], value = _f[1];
            console.log("".concat(key, " : ").concat(value));
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (m_1_1 && !m_1_1.done && (_c = m_1.return)) _c.call(m_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    var m2 = new Map(__spreadArray([], __read("abcd"), false).map(function (x) { return [x, x + x]; }));
    console.log(JSON.stringify(__spreadArray([], __read(m2), false)));
    console.log(JSON.stringify(__spreadArray([], __read(m2.keys()), false)));
    console.log(JSON.stringify(__spreadArray([], __read(m2.values()), false)));
    console.log(JSON.stringify(__spreadArray([], __read(m2.entries()), false)));
    var sSet = new Set([1, 2, 3, 4, 5, 5, 4, 3, 2, 1]);
    sSet.add(6);
    sSet.add(3);
    console.log(sSet.size);
    sSet.delete(2);
    console.log(sSet.size);
    try {
        for (var sSet_1 = __values(sSet), sSet_1_1 = sSet_1.next(); !sSet_1_1.done; sSet_1_1 = sSet_1.next()) {
            var v = sSet_1_1.value;
            console.log(v);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (sSet_1_1 && !sSet_1_1.done && (_d = sSet_1.return)) _d.call(sSet_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
}
catch (err) {
    console.error("Error in Map & Set Module:", err.message);
}
// DESTRUCTURING MODULE
console.log("DESTRUCTURING MODULE");
try {
    var aObj = { x: 3, y: 4 };
    var xVal = aObj.x, zVal = aObj.y;
    console.log(xVal, zVal);
    var y = aObj.y;
    console.log(y);
    var _g = __read([1, undefined], 2), a = _g[0], _h = _g[1], b = _h === void 0 ? 3 : _h;
    console.log(a, b);
    var _j = __read([], 2), _k = _j[0], xDef = _k === void 0 ? 4 : _k, _l = _j[1], yDef = _l === void 0 ? xDef : _l;
    console.log(xDef, yDef);
    var _m = __read([], 2), _o = _m[0], d = _o === void 0 ? 4 : _o, _p = _m[1], c = _p === void 0 ? d : _p;
    console.log(c, d);
}
catch (err) {
    console.error("Error in Destructuring Module:", err.message);
}
