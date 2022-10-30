//this
//参考链接：汤姆大叔 https://www.cnblogs.com/TomXu/archive/2012/01/17/2310479.html
//参考链接：牙羽 https://github.com/mqyqingfeng/Blog/issues/7

/* 
    this是执行上下文中的一个属性
    executionContext={
        VO:{...},
        Scope,
        this,
    }

    this与上下文中可执行代码的类型有直接关系，this值在"进入上下文"时确定，并且在上下文运行期间"永久不变"

    不管怎样，在代码运行时的this值是不变的，也就是说，因为它不是一个变量，就不可能为其分配一个新值

    {

        var foo = {x: 10};
        var bar = {
        x: 20,
        test: function () {
        
            alert(this === bar); // true
            alert(this.x); // 20
        
            this = foo; // 错误，任何时候不能改变this的值
        
            alert(this.x); // 如果不出错的话，应该是10，而不是20
        
        }
        
        };
    }
    
*/


//函数中this的调用

/* 
在通常的函数调用中，this是由激活上下文代码的调用者来提供的，即"调用函数的父上下文"(parent context )。this取决于调用函数的方式



*/

{
      function foo() {
        alert(this);
      }
       
      foo(); // global
       
      alert(foo === foo.prototype.constructor); // true
       
      // 但是同一个function的不同的调用表达式，this是不同的
       
      foo.prototype.constructor(); // foo.prototype
}


//引用类型Reference Type

/* 
    引用类型的值定义：
    var valueOfReferenceType = {
        base: <base object>, 属性所在的对象
        propertyName: <property name> 属性名
    };

    引用类型的值只有以下两种情况：
        1、当我们处理一个标示符时 （标识符：变量名，函数名，函数参数名和全局对象中未识别的属性名）
        2、或一个属性访问器 （点（.）语法、括号语法（[]））

    “一个函数上下文中确定this值的通用规则如下：在一个函数上下文中，this由调用者提供，由调用函数的方式来决定。
    如果调用括号()的左边是引用类型的值，this将设为"引用类型值的base对象"（base object），
    在其他情况下（与引用类型不同的任何其它属性），这个值为null。
    不过，实际不存在this的值为null的情况，因为当this的值为null的时候，其值会被隐式转换为全局对象。
    注：第5版的ECMAScript中，已经不强迫转换成全局变量了，而是赋值为undefined。”
*/
{
    function foo() {
        alert(this);
      }
       
      foo(); // global, because
       
      var fooReference = {
        base: global,
        propertyName: 'foo'
      };
       
      alert(foo === foo.prototype.constructor); // true
       
      // 另外一种形式的调用表达式
       
      foo.prototype.constructor(); // foo.prototype, because
       
      var fooPrototypeConstructorReference = {
        base: foo.prototype,
        propertyName: 'constructor'
      };
}
/* 
    从引用类型中获取值的方法：
    function GetValue(value) {
        if (Type(value) != Reference) {
            return value;
        }
        var base = GetBase(value);
        
        if (base === null) {
            throw new ReferenceError;
        }
        return base.[[Get]](GetPropertyName(value));
    }

    内部的[[Get]]方法返回对象属性真正的值，包括对原型链中继承的属性分析。


*/

//函数调用和非引用类型

/* 
    (function () {
        alert(this); // null => global
    })();   


    var foo = {
    bar: function () {
        alert(this);
    }
    };
    
    foo.bar(); // Reference, OK => foo
    (foo.bar)(); // Reference, OK => foo
    
    (foo.bar = foo.bar)(); // global?
    (false || foo.bar)(); // global?
    (foo.bar, foo.bar)(); // global?

    解析：
    1、引用类型，this为base 对象 => foo
    2、（）组运算符的返回值仍旧是个引用类型，所以 this 为base对象 =>
    3、= 赋值运算符 调用了GetValue方法 返回了函数对象(不是引用类型)，this为null 结果是global
    4、逗号运算符、逻辑运算符调用了GetValue方法返回了函数丢失了引用类型，this为null 结果是global

*/

//引用类型和this为null

/* 
    场景：
    当调用表达式限定了calle括号左边的引用类型的值， 
    尽管this被设定为null，但结果被隐式转化成global。当引用类型值的base对象是被活动对象时，这种情况就会出现。

    function foo() {
        function bar() {
            alert(this); // global
        }
        bar(); // the same as AO.bar()
    }
    AO.bar()相当于null.bar()

    活动对象(AO)总是作为this返回，值为null


    1、特殊情况 with

    如果with对象包含一个函数名属性，在with语句的内部块中调用函数。With语句添加到该对象作用域的"最前端"，
    即在活动对象的前面。相应地，也就有了引用类型（通过标示符或属性访问器）， 
    其base对象不再是活动对象，而是with语句的对象。

    var x = 10;
    with (
        {
            foo: function () {
                alert(this.x);
            },
            x: 20
            
        }
    ) {
            
        foo(); // 20
            
       }
    // because
    var  fooReference = {
        base: __withObject,
        propertyName: 'foo'
    };


    2、命名函数的递归调用中
        在函数的第一次调用中，base对象是父活动对象（或全局对象），在递归调用中，base对象应该是存储着函数表达式可选名称的特定对象。但是，在这种情况下，this总是指向全局对象。

        (function foo(bar) {
        
            alert(this);
        
            !bar && foo(1); // "should" be special object, but always (correct) global
        
        })(); // global


    3、作为构造器调用函数中的this
        function A() {
            alert(this); // "a"对象下创建一个新属性
            this.x = 10;
        }
        
        var a = new A();
        alert(a.x); // 10








*/