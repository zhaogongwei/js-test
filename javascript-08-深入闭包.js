/*
    理论上的闭包：
    MDN对闭包的定义：闭包是指那些能够访问"自由变量"的函数。

    自由变量:指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

    闭包 = 函数 + 函数能够访问的自由变量


    实践上的闭包：
    ECMAScript中，闭包指的是：

    从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
    从实践角度：以下函数才算是闭包：
        即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
        在代码中引用了自由变量

*/


/* 
    代码解析：
    var data = [];

    for (var i = 0; i < 3; i++) {
    data[i] = function () {
        console.log(i);
    };
    }

    data[0]();  //3
    data[1]();  //3
    data[2]();  //3
    当执行到 data[0] 函数之前，此时全局上下文的 VO 为：

    globalContext = {
        VO: {
            data: [...],
            i: 3
        }
    }
    当执行 data[0] 函数的时候，data[0] 函数的作用域链为：

    data[0]Context = {
        Scope: [AO, globalContext.VO]
    }
    data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3。

    data[1] 和 data[2] 是一样的道理。


    改成闭包

    var data = [];

    for (var i = 0; i < 3; i++) {
    data[i] = (function (i) {
            return function(){
                console.log(i);
            }
    })(i);
    }

    data[0]();
    data[1]();
    data[2]();
    当执行到 data[0] 函数之前，此时全局上下文的 VO 为：

    globalContext = {
        VO: {
            data: [...],
            i: 3
        }
    }
    跟没改之前一模一样。

    当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：

    data[0]Context = {
        Scope: [AO, 匿名函数Context.AO globalContext.VO]
    }
    匿名函数执行上下文的AO为：

    匿名函数Context = {
        AO: {
            arguments: {
                0: 0,
                length: 1
            },
            i: 0
        }
    }
    data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是0。

    data[1] 和 data[2] 是一样的道理。
*/