//作用域
/* 
    作用域是指程序源代码中 定义变量的区域
    作用域规定了如何查找变量，也就是确定了当前执行代码对变量的访问权限
    JavaScript 采用词法作用域(lexical scoping),也就是静态作用域
*/

//静态作用域与动态作用域
/* 
    JS采用的是词法作用域，函数的作用域在函数定义的时候就决定了
    动态作用域：函数的作用域是在函数调用时才决定的
*/
{
    const value = 1;
    function foo(){
        console.log(value)
    }
    function bar(){
        const value = 2;
        foo()
    }
    bar() // 1
    /* 
        结果分析：因为JS采用的是静态作用域，执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据‘书写的位置’，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1
    */
}

//动态作用域 bash
/* 
    value=1
    function foo () {
        echo $value;
    }
    function bar () {
        local value=2;
        foo;
    }
    bar
*/

//思考题
{
    var scope = "global scope";
    function checkscope(){
        var scope = "local scope";
        function f(){
            return scope;
        }
        return f();
    }
    console.log(checkscope());// local scope
}
{
    var scope = "global scope";
    function checkscope(){
        var scope = "local scope";
        function f(){
            return scope;
        }
        return f;
    }
    console.log(checkscope()());// local scope
}
/* 
    解析：JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置
    词法作用域规定的是查找变量的区域有哪些，并不规定具体的内容有哪些
    JavaScript权威指南：JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f()，这种绑定在执行 f() 时依然有效。
    核心：函数的作用域在函数定义的时候就决定了
*/