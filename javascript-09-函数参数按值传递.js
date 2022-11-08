/* 

    ECMAScript中所有函数的参数都是按值传递的。
    
    按值传递：把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样
*/

//按值传递
{
    var value = 1;
    function foo(v) {
        v = 2;
        console.log(v); //2
    }
    foo(value);
    console.log(value) // 1
}

//引用传递  引用传递是传递对象的引用
{
    var obj = {
        value: 1
    };
    function foo(o) {
        o.value = 2;
        console.log(o.value); //2
    }
    foo(obj);
    console.log(obj.value) // 2
}

//共享传递  共享传递是指，在传递对象的时候，传递"对象的引用的副本"
{
    var obj = {
        value: 1
    };
    function foo(o) {
        o = 2;
        console.log(o); //2
    }
    foo(obj);
    console.log(obj.value) // 1
}


/* 
    总结：
    参数如果是基本类型是按值传递，如果是引用类型按共享传递

*/