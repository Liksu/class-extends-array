I made small function that makes intermediate prototype with methods from parent class between Array class and parent class.
Due to babel issue: Errors with extending Array [#1424](https://github.com/babel/babel/issues/1424)
This function uses ```__proto__```, so, can fail on IE10 and less.

### Installation

    npm install class-extends-array

### Example

	import extendWithArray from 'class-extends-array';

    // class that should extends Array
    class Foo {
        bar() { return this.map(el => `<${el}>`).join('|') }
    }

	const FooAsArray = extendWithArray(Foo);

	const foo = new FooAsArray(1, 2, 3);
	foo.push(4);
	foo.bar(); // "<1>|<2>|<3>|<4>"