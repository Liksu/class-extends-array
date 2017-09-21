'use strict';
export default function extendWithArray(ParentClass, options = {}) {
	options = Object.assign({
		onlyMethods: false,
		allowConstructor: true
	}, options);

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
        
        const isMethod = method instanceof Function;
        const isConstructor = method === ParentClass;

        let canCopy =  isMethod &&  isConstructor && options.allowConstructor
                   ||  isMethod && !isConstructor
                   || !isMethod && !options.onlyMethods;
        
        if (canCopy) ChildArrayClass.prototype[name] = method;
    });

    return ChildArrayClass;
};
