{
    var foo = function () {

        console.log('foo1');
    
    }
    
    foo();  // foo1
    
    var foo = function () {
    
        console.log('foo2');
    
    }
    
    foo(); // foo2
}

{
    function foo() {

        console.log('foo1');
    
    }
    
    foo();  // foo2
    
    function foo() {
    
        console.log('foo2');
    
    }
    
    foo(); // foo2
}
/* 
    JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。当执行一段代码的时候，会进行一个“准备工作”，比如第一个例子中的变量提升，和第二个例子中的函数提升
*/

//可执行代码（executable code)
/* 
    可执行代码：全局代码(函数外面的代码)、函数代码、eval代码(eval 函数中写的代码)
    "执行到"一个函数的时候,就会进行准备工作，专业说法叫"执行上下文（execution context）"
*/

//执行上下文栈（Execution context stack,ECS）----管理执行上下文
/* 
    ECStack = []
        |
        |
        | js解释执行代码时，最先遇到全局代码，所以初始化时首先向ECS压入一个全局执行上下文(globalContext),只有整个程序结束时,ECS才会被清空,所以程序结束之前，ECS最底部永远有个globalContext;
        ↓
    ECStack = [
        globalContext
    ]

    js 遇到以下代码：

        function fun3() {
            console.log('fun3')
        }

        function fun2() {
            fun3();
        }

        function fun1() {
            fun2();
        }

        fun1();

    当"执行"一个函数时，就会创建一个执行上下文，并且压入执行上下文栈，函数执行完毕，就会将函数的执行上下文从栈中弹出
    
    执行fun1()
    ECStack.push(<fun1>functionContext)
        ↓
    fun1中调用了fun2,所以创建fun2的执行上下文
    ECStack.push(<fun2>functionContext)
        ↓
    fun2中调用了fun3
    ECStack.push(<fun3>functionContext)
        ↓
    fun3()执行完毕
    ECStack.pop()
        ↓
    fun2()执行完毕
    ECStack.pop()
        ↓
    fun1()执行完毕
    ECStack.pop()

    javascript接着执行下面的代码，但是ECStack底层永远有个globalContext



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
    checkscope();
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
    checkscope()();
}

/* 
    解析：两段代码执行结果一样，但执行上下文栈的变化不一样

    第一段代码：
    ECStack.push(<checkscope> functionContext);
    ECStack.push(<f> functionContext);
    ECStack.pop();
    ECStack.pop();

    第二段代码：
    ECStack.push(<checkscope> functionContext);
    ECStack.pop();
    ECStack.push(<f> functionContext);
    ECStack.pop();
*/
