# class

## 属性
* 静态属性 `static`
   * 实例不能访问静态方法，**只能通过类来访问**
```ts
class User{
  //静态属性只能通过类访问
  static age:number = 18
}
let user1 = new User();
console.log(user1.age)  //undefined
console.log(User.age)   //18
```
* 只读属性 `readonly`
```ts
class User{
  readonly age:number = 18
}
```

## 方法
```ts
class User{
  name:string = "名字"
  say(){
    console.log("say")
  }
}
```

## 构造函数 `constructor` 
* new实例的时候调用
```ts
class User{
  //声明属性
  sex:number
  constructor(sex:number){
    //new的时候执行了constructor
    console.log(this)  //当前实例 user1
    //往user1添加属性
    this.sex = sex
  }
}
let user1 = new User(10);
console.log(user1)
```

## 继承
语法：子类 extends 父类
* 子类会继承父类的所有方法和属性
* 子类里面可以直接写自己的方法和属性，会覆盖父类的数据
* 子类中使用super关键字指的是父类
* 子类的构造函数中必须先执行父类的构造函数super()，因为子类的构造函数会覆盖父类的构造函数，使得父类的构造函数不执行，所以要先在子类执行父类的构造函数

```ts{11-17}
class Class1{
  constructor(age){
    this.age = age
  }
  say(){
    console.log(`我是年龄是${this.age}`)
  }
}
let class1 = new Class1(10)
class1.say()
class Class2 extends Class1{
  constructor(age,name){
    //子类构造函数先执行父类的 使用super关键字
    //参数照样传
    super(age) 
    this.name = name
  }
  //重写父类方法
  say(){
    console.log(`我是年龄是${this.age},名字是${this.name}`)
  }
}
let class2 = new Class2(10,'名字')
class2.say()
```
### this指向问题
* 类中的方法默认开启严格模式
* `class2.say()`的`say`实际上是`class2`的方法,没有往上找类`Clsaa2`的方法
```ts
let class3 = class2.say
//此时的class3的this为undefined 
//类中的方法默认为严格模式所以不指向window
//class2.say()能调用是因为say方法在class2上没有就往他的原型上找在Class2类上找到并调用
//但是class3的原型没有say方法 所以无法调用
class3()  
```
此时可以在类`Class2`的构造函数中为方法**实例**的`say`指定`this`指向
```ts

class Class2 extends Class1{
  constructor(age,name){
    super(age)    // 先执行父类构造函数
    this.name = name
    this.say = this.say.bind(this) //将原型的this给到实例
  }
  say(){
    console.log(this)
    console.log(`我是年龄是${this.age},名字是${this.name}`)
  }
}
```
* 也可以将`say`方法当作类`Class2`的一个属性，然后赋值为一个箭头函数（箭头函数保证`this`的指向是当前实例）
```ts
class Class2 extends Class1{
  constructor(age,name){
   super(age)    // 先执行父类构造函数
   this.name = name
  }
  say = ()=>{
    console.log(this)
    console.log(`我是年龄是${this.age},名字是${this.name}`)
  }
}
```

## abstract（抽象类）
* 禁止使用当前类创建对象
* 抽象类中还能使用抽象方法，继承这个类的子类必须重写抽象方法
```ts
abstract class User{
  //定义抽象方法
  abstract getName():void
}
let user = new User // 无法创建抽象类的实例
class User1 extends User{
  //重写抽象方法
  getName(){}
}
```


## private（私有属性）
* 默认值public 
* protected:当前类和他的子类可访问
```ts
class UserClass{
  //private私有属性 只能在当前类内部修改
  private age:number
  constructor(age:number){
    this.age = age
  }
  getAge(){
    return this.age
  }
  setAge(age:number){
    //此处可对传的值进行判断或修饰
    this.age = age
  }
}
let userclass = new UserClass(10)
// userclass.age = 11 //私有属性 不能修改
// console.log(userclass.age)   //私有属性不能访问
userclass.setAge(11)  //私有属性通过set方法暴露进行修改
console.log(userclass.getAge())   //私有属性通过get方法暴露进行访问
```
内置的get set方法
```ts
class UserClass{
  //private私有属性 只能在当前类内部修改
  private _age:number
  constructor(age:number){
    this._age = age
  }
  get age(){
    return this._age
  }
  set age(age:number){
    this._age = age
  }
}
let userclass = new UserClass(10)
// userclass.age = 11 //私有属性 不能修改
// console.log(userclass.age)   //私有属性不能访问
userclass.age=11  //私有属性通过set方法暴露进行修改
console.log(userclass.age)   //私有属性通过get方法暴露进行访问
```