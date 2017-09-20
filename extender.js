'use strict';
export default function extendWithArray(ParentClass) {
    const ChildArrayClass = function() {
        const tmp = [];
        tmp.push.apply(tmp, arguments);
        //eslint-disable-next-line
        tmp.__proto__ = ChildArrayClass.prototype;
        return tmp;
    };
    ChildArrayClass.prototype = [];

    const protoObject = new ParentClass();
    Object.getOwnPropertyNames(Object.getPrototypeOf(protoObject)).forEach(name => {
        const method = protoObject[name];
        if (method instanceof Function && method !== ParentClass) ChildArrayClass.prototype[name] = method;
    });

    return ChildArrayClass;
};
