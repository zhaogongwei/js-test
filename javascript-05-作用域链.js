//作用域链
/* 
    当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，
    一直找到全局上下文的变量对象，也就是全局对象。这样由"多个执行上下文的变量对象构成的链表"就叫做作用域链。
*/

/* 
    函数内部有个属性[[scope]]，当函数创建的时候，会保存"所有父变量对象"到其中,[[scope]]就是所有父变量对象的层级链，但不代表完整的作用域链
*/

{
    function foo(){
        function bar(){}
    }
    /* 
        函数创建时：
        foo.[[scope]] = [
            globalContext.VO
        ]
        bar.[[scope]] = [
            fooContext.AO,
            globalContext.VO
        ]

        函数"激活"时：
        进入函数上下文，创建 VO/AO 后，就会将"活动对象"添加到作用链的"前端"

        作用域链（Scope）
        Scope = [AO].concat([[scope]])
    */
}

{
    var scope = "global scope";
    function checkscope(){
        var scope2 = 'local scope';
        return scope2;
    }
    checkscope();

    //执行过程：
    /* 
        1、 checkscope函数被创建，保存作用域到内部属性[[scope]]
            checkscope.[[scope]] = [
                globalContext.VO
            ]

        2、执行checkscope函数,创建checkscope函数执行上下文,checkscope函数上下文被压入执行上下文栈
            ECStack = [
                checkscopeContext,
                globalContext
            ]
        
        3、checkscope函数不立刻执行，开始准备工作，复制函数[[scope]]属性创建作用域链
            checkscopeContext = {
                Scope:checkscope.[[scope]]
            }

        4、用arguments创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明
            checkscopeContext = {
                AO:{
                    arguments:{
                        length:0
                    },
                    scope2:undefined
                },
                Scope:checkscop.[[scope]]
            }

        5、将活动对象压入checkscope作用域顶端
            checkscopeContext = {
                AO:{
                    arguments:{
                        length:0
                    },
                    scope2:undefined
                },
                Scope:[AO,[[scope]]]
            }

        6、开始执行函数，随着函数执行修改函数
            checkscopeContext = {
                AO: {
                    arguments: {
                        length: 0
                    },
                    scope2: 'local scope'
                },
                Scope: [AO, [[Scope]]]
            }

        7、查找到scope2的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出
            ECS = [
                globalContext
            ]
    */

}


{
    function a() {
        var aaa = 123;
        function b(){
           console.log(aaa); 
           aaa=234;
     };
        b();
        console.dir(aaa);
     };
     a();

     /* 
        1、a函数被创建，保存作用域链到内部属性[[scope]]

        a.[[scope]] = [
            globalContext.VO
        ]

        2、要执行函数a了，创建函数a的执行上下文，并且将执行上下文压入执行上下文栈

        ECStack=[
            aContext,
            globalContext.VO
        ]

        3、a函数并不立刻执行，做准备工作，复制函数a的[[scope]]属性创建作用域链

        aContext = {
            Scope: ascope.[[scope]]
        }

        4、b函数创建

        b.[[scope]] = [
            globalConext.VO
        ]
        5、要执行b函数了，创建函数b的执行上下文，并且将执行上下文压入执行上下文栈

        ECStack = [
            bContext,
            aContext,
            globalContext
        ]

        6、创建函数a活动对象，随后初始化函数a活动对象（加入形参、函数声明、变量声明）

        aContext = {
            AO: {
                arguments: {
                    length: 0
                }
                aaa: undefined
            },
            Scope: ascope.[[scope]]
        }
        7、将函数a活动对象压入ascope作用域链顶端

        aContext = {
            AO: {
                arguments: {
                    length: 0
                },
                aaa: undefined
            },
            Scope: [AO, [[Scope]]]
        }

        8、准备工作做完，开始执行函数a，随着函数a的执行，修改AO的属性值

        aContext = {
            AO: {
                arguments: {
                    length: 0
                }    
                aaa: 123
            },
            Scope: [AO, [Scope]]
        }

        9、随着函数a的执行，函数b创建活动对象，随后初始化函数b的活动对象（加入形参、函数声明、变量声明）

        bContext = {
            AO: {
                arguments: {
                    length: 0
                }
                // aaa: undefined // 如果有var的话，会有此处
            },
            Scope: bscope.[[scope]]
        }

        10、将函数b活动对象压入bscope作用域链顶端

        bContext = {
            AO: {
                arguments: {
                    length: 0
                }
                // aaa: undefined // 如果有var的话，会有此处
            },
            Scope: [AO, bscope.[[scope]]]
        }

        11、准备工作完成，开始执行函数b，随着函数b的执行修改AO属性值

        aContext = {
            AO: {
                arguments: {
                    length: 0
                }    
                // aaa: 234; // 如果有var的话，会有此处
            },
            Scope: [AO, [Scope]] // 没有var的话，会修改[[Scope]]中父作用域链的值，所以第2个console才是234，否则，只能修改本函数上下AO中的值，改变不吝父作用域链的aaa，父作用域连只能是123了。
        }

        12、函数b执行完毕，函数上下文从执行上下文栈中弹出

        ECStack = [
            aContext,
            globalContext
        ]

        13、函数a执行完毕，函数上下文从执行上下文栈中弹出

        ECStack = [
            globalContext
        ]
     
     */
}