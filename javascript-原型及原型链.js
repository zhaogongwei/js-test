//使用构造函数创建对象
function Person(){

}
let person = new Person()
person.name = 'Kevin'
console.log(person.name)// kevin

function Person1(){

}
//prototype属性 函数才会有
Person1.prototype.name = 'Kevin1'
let person1 = new Person1()
let person2 = new Person1()

console.log(person1.name)//kevin1
console.log(person2.name)//kevin1

/* prototype属性的指向：函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型 */
/*  原型：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性 */



//__proto__  每一个JavaScript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型
/* 
    __proto__实际来自Object.prototype，与其说是个属性，不如说是个getter/setter, 使用obj.__proto__ 时，可理解返回了 Object.getPrototypeOf(obj)
*/

function Person3(){
}

let person3 = new Person3()
console.log(person3.__proto__ === Person3.prototype) //true


//constructor 指向关联的构造函数
function Person4(){

}
console.log(Person4 === Person4.prototype.constructor) // true

//es5 获取对象的原型
console.log(Object.getPrototypeOf(person3) === Person3.prototype)



//实例与原型
/* 当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。 */
{
    function Person(){}
    Person.prototype.name = 'Kevin'
    let person = new Person()
    person.name = 'Daisy'
    console.log(person.name) //Daisy
    delete person.name
    console.log(person.name) // kevin
}


//原型的原型
/* 原型对象就是通过 Object 构造函数生成的，结合之前所讲，实例的 __proto__ 指向构造函数的 prototype  */
/*                      prototype
    Person(构造函数)    -----------> Person.prototype（实列原型)
            |           <----------     ↑         |
            |           constructor     |         |
            |                           |         |
            |                           |         |__proto__
            ↓     __proto__             |         |
        person  ------------------------          |
                     prototype                    ↓
    Object  ------------------------------->Object.prototype
            <-------------------------------       |
                constructor                        |
                                                   ↓
                                                   null

*/
{
    let obj = new Object()
    obj.name = 'Kevin'
    console.log(obj.name) //kevin
}

//原型链 Object.prototype 的原型 ：null
//null与undefined区别
/* 
    null:表示没有对象，即该处不应该有值
*/
/* 
    原型链：由相互关联的原型组成的链状结构就是原型链
*/
{
    console.log(Object.prototype.__proto__ === null) //true, 表明Object.prototype没有原型
}
