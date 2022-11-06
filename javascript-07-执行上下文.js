var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f();
}
checkscope();

/* 
    执行过程分析：
    1.执行全局代码，创建全局执行上下文，全局上下文被压入执行上下文栈

    ECStack = [
        globalContext
    ];
    2.全局上下文初始化

        globalContext = {
            VO: [global],
            Scope: [globalContext.VO],
            this: globalContext.VO
        }
    2.初始化的同时，checkscope 函数被创建，保存作用域链到函数的内部属性[[scope]]

        checkscope.[[scope]] = [
        globalContext.VO
        ];
    3.执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈

        ECStack = [
            checkscopeContext,
            globalContext
        ];
    4.checkscope 函数执行上下文初始化：

    复制函数 [[scope]] 属性创建作用域链，
    用 arguments 创建活动对象，
    初始化活动对象，即加入形参、函数声明、变量声明，
    将活动对象压入 checkscope 作用域链顶端。
    同时 f 函数被创建，保存作用域链到 f 函数的内部属性[[scope]]

        checkscopeContext = {
            AO: {
                arguments: {
                    length: 0
                },
                scope: undefined,
                f: reference to function f(){}
            },
            Scope: [AO, globalContext.VO],
            this: undefined
        }
    5.执行 f 函数，创建 f 函数执行上下文，f 函数执行上下文被压入执行上下文栈

        ECStack = [
            fContext,
            checkscopeContext,
            globalContext
        ];
    6.f 函数执行上下文初始化, 以下跟第 4 步相同：

    复制函数 [[scope]] 属性创建作用域链
    用 arguments 创建活动对象
    初始化活动对象，即加入形参、函数声明、变量声明
    将活动对象压入 f 作用域链顶端
        fContext = {
            AO: {
                arguments: {
                    length: 0
                }
            },
            Scope: [AO, checkscopeContext.AO, globalContext.VO],
            this: undefined
        }
    7.f 函数执行，沿着作用域链查找 scope 值，返回 scope 值

    8.f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

        ECStack = [
            checkscopeContext,
            globalContext
        ];
    9.checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出

        ECStack = [
            globalContext
        ];
*/
/* 
执行函数checkscope时，分为"预编译阶段"和"执行阶段"，
    预编译阶段就是你所说的创建执行上下文、执行上下文初始化（复制函数[[scope]]属性创建作用域链、使用arguments创建活动对象、初始化活动对象{即形参、函数声明、变量声明}、将活动对象压入作用域链的顶端）。
    当函数checkscope执行，处于预编译阶段中函数声明的时候，此时只是创建了f函数（只是创建了f函数的[[scope]]属性，这个属性只包含了checkscope函数的活动对象和全局变量对象，并不包含f函数的活动对象）
    等到函数checkscope处于执行阶段时，就是return f();，此时调用f()，这时候才会创建f函数的上下文，以及上面所提到的相同四步骤。

*/

var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}
checkscope()();

/* 
    执行过程分析：
*/
