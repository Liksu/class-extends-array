'use strict';

module.exports = function extendWithArray(ParentClass, options) {
    if (!options) options = {};
    if (options.onlyMethods == null) options.onlyMethods = false;
    if (options.allowConstructor == null) options.allowConstructor = true;

    function ChildArrayClass() {
        var tmp = [];
        tmp.push.apply(tmp, arguments);
        tmp.__proto__ = ChildArrayClass.prototype;
        return tmp;
    };
    ChildArrayClass.prototype = [];

    var protoObject = new ParentClass();
    Object.getOwnPropertyNames(Object.getPrototypeOf(protoObject)).forEach(function (name) {
        var method = protoObject[name];

        var isMethod = method instanceof Function;
        var isConstructor = method === ParentClass;

        var canCopy = isMethod && isConstructor && options.allowConstructor || isMethod && !isConstructor || !isMethod && !options.onlyMethods;

        if (canCopy) ChildArrayClass.prototype[name] = method;
    });

    return ChildArrayClass;
};