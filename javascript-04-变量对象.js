/* 
    执行上下文三个重要属性：
        1、变量对象（Variable object,VO)
        2、作用域链 (Scope chain)
        3、this
*/

//变量对象
/* 
    变量对象是与执行上下文相关的"数据作用域"，存储了在上下文中定义的"变量"和"函数声明"
*/

//全局上下文
/* 
    全局对象：
            全局对象是"预定义的对象"，作为 JavaScript 的全局函数和全局属性的"占位符"。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。
            在顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。因为全局对象是"作用域链的头"，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。
            例如，当JavaScript 代码引用 parseInt() 函数时，它引用的是全局对象的 parseInt 属性。全局对象是"作用域链的头"，还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。
*/
//1、在客户端 JavaScript 中，全局对象就是 Window 对象
console.log(this) //window

//2、全局对象是由 Object 构造函数实例化的一个对象。
console.log(this instanceof Object)

//3、预定义了一大堆函数和属性
console.log(Math.random())
console.log(this.Math.random())

//4、作为全局变量的宿主
var a = 1;
console.log(this.a) //1

//5、客户端 JavaScript 中，全局对象有 window 属性"指向自身"
{
    var a = 1;
    console.log(window.a);//1

    this.window.b = 2;
    console.log(this.b);//2
}
/* 
    总结：全局上下文中的变量对象就是全局对象
*/


//函数上下文

/* 
    在函数上下文中,用活动对象(activation object,AO)来表示变量对象。

    活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，
    只有到当"进入"一个执行上下文中，这个执行上下文的变量对象才会被"激活"，所以才叫 activation object 呐，而只有被激活的变量对象，也就是活动对象上的各种属性才能"被访问"。

    活动对象是在"进入函数上下文"时刻被创建的，它通过函数的 "arguments" 属性"初始化"。arguments 属性值是 Arguments 对象。

*/

//执行过程
/* 
    执行上下文的代码会分成两个阶段进行处理：分析和执行
    1.进入执行上下文
    2.代码执行
*/

//执行过程----进入执行上下文（先处理函数声明，再处理变量声明)
/* 
    进入执行上下文时,代码"未执行"
    变量对象包括：
                1.函数的所有形参（函数上下文)
                    由名称和对应值组成的一个变量对象的属性被创建
                    没有实参,属性值设为undefined
                
                2.函数声明
                    由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
                    如果变量对象已经存在相同名称的属性，则"完全替换"这个属性

                3.变量声明
                    由名称和对应值（undefined）组成一个变量对象的属性被创建；
                    如果变量名称跟已经声明的形式参数或函数相同，则变量声明"不会干扰"已经存在的这类属性
*/
{
    function foo(a) {
        var b = 2;
        function c() {}
        var d = function() {};
      
        b = 3;
      
      }
      
      foo(1);
    /* 
        AO = {
            arguments:{
                0:1,
                length:1
            },
            a:1,
            b:undefined,
            c:reference to function c(){},
            d:undefined
        }
        说明：
        活动对象AO在进入上下文时由Arguments对象初始化，能够获得函数的实参了，所以此时有值，而b是函数内部声明的参数,由于变量声明提升，被AO获得，但此时上下文还没执行，没有完成赋值操作所以b的值为undefined
        这个时候的 AO 指的是进入执行上下文时的 AO ，只是完成了变量提升和函数提升，但是并没有进入执行阶段
    */
}

//执行过程----代码执行
/* 
    代码执行阶段，顺序执行代码，根据代码，修改变量对象的值
    代码执行之后
    AO = {
        arguments:{
            0:1,
            length:1
        },
        a:1,
        b:3,
        c:reference to function c(){},
        d:reference to FunctionExpression "d"
    }
*/

/* 
    总结：
        1.全局上下文的变量对象初始化是全局对象
        2.函数上下文的变量对象初始化"只包括Arguments 对象"
        3.在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
        4.在代码执行阶段，会再次修改变量对象的属性值
*/


//思考题
{
    function foo() {
        console.log(a);
        a = 1;
    }
    
    foo(); // ???
    
    function bar() {
        a = 1;
        console.log(a);
    }
    bar(); // ???
}

/* 
    foo() // Uncaught ReferenceError: a is not defined
    bar() // 1


    只有通过 var 声明的变量才会有提升， a 没有提升，执行 console.log(a) 的时候也没有挂载到全局变量上，所以会报错
    foo 函数中 a 没有通过 "var" 关键字声明，所以不会被存放在AO中
    执行foo 函数时 AO:{
        arguments:{
            length:0
        }
    },AO中没有a的值，去全局寻找也没有 所以报错


*/

{
    console.log(foo);

    function foo(){
        console.log("foo");
    }

    var foo = 1;

    /* 
        打印：ƒ foo(){
            console.log("foo");
        }

        console.log(foo)
        function foo(){console.log('foo')}
        var foo
        foo=1

        创建：
        VO:{
            foo:reference to function foo(){}
        }
        执行：
        先执行console.log,再foo=1
        VO:{
            foo:reference to function foo(){}
        }


        在"进入"执行上下文时，首先会处理函数声明，其次会处理变量声明，如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

    */
}
{
    var foo = 1;
    console.log(foo);
    function foo(){
        console.log("foo");
    };
    /* 
        打印：1
        解析：
        代码可以分解为：
        var foo
        foo = 1
        console.log(foo)
        function foo(){
            console.log('foo')
        }
        
        创建阶段：
        VO = {
            foo : reference to function foo(){}
        }
        执行阶段：
        先foo = 1，再console.log
        VO = {
            foo : 1
        }

    */
}

//知识补充：

/* 
    1、Arguments定义
    Argumnets:调用函数时，会为其创建一个Arguments对象，并自动初始化局部变量arguments，指代该Arguments对象。所有作为参数传入的值都会成为Arguments对象的数组元素。

    2、VO 与 AO 的关系：
    AO = VO + function parameters + arguments
    未进入执行阶段之前，变量对象(VO)中的属性都不能访问！但是进入执行阶段之后，变量对象(VO)转变为了活动对象(AO)，里面的属性都能被访问了，然后开始进行执行阶段的操作。
    它们其实都是"同一个对象"，只是处于"执行上下文的不同生命周期"。

    3、执行上下文声明周期
        1)、创建阶段
           在创建阶段中，执行上下文回分别创建变量对象，建立作用域链，以及确定this指向
        
        2)、代码执行阶段
           创建完成之后，就会开始执行代码，这个时候，回完成变量赋值，函数引用，以及执行其他代码

    4、function声明会比var声明优先级更高一点
*/