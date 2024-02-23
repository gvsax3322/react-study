# 타입스크립트 3

## 1. Type alias

- 타입을 알아볼수 있도록 이름(별명을) 정한다.
- const 변수처럼 만든다. (상수처럼)
- const 변수처럼 재정의가 안된다. (상수처럼)

```ts
const AGE = "20세기";
// 재정의는 오류가 발생
const AGE = "30세기";
```

- Type alias 는 특정한 타입을 설명하기 위한 용도로 작성.

```ts
// 보기 좋지 않은 예
const a: string = "홍길동";

type NickName = string;
const a: NickName = "홍길동";
```

- 타이핑을 줄여준다. (주 용도)

```ts
function Say(title:string | number | boolean | undefined | null){
}
const sample:string | number | boolean | undefined | null;

type All:string | number | boolean | undefined | null;

function Say(title:All){
}
const sample:All;
```

### 1.1. Type alias 와 interface 구별

- 2개의 문법적 요소가 개발 중에 선택의 고민

```ts
interface Person {
  nickName: string;
  age: number;
}
type TPerson = {
  nickName: string;
  age: number;
};
let p: Person;
let t: TPerson;
```

- Type alias 의 특징
  : 유니온(타입 | 타입 | 타입) 타입,
  : 인터셉션(타입 & 타입 & 타입) 타입 적용

  ```ts
  type User = {
    id: string;
    pass: string;
  };

  type Admin = {
    id: string;
    pass: string;
    level: number;
  };

  type Member = User | Admin;
  type Member = User & Admin;
  ```

  : type alias 에는 interface 를 사용할 수 있다.
  : 하지만 interface 에는 type 사용할 수 없다.

  ```ts
  interface Person {
    nickName: string;
    age: number;
  }
  type User = {
    isJoin: boolean;
  };

  type Login = Person & User;
  // 유니온에 의해서 아래처럼 타입의 모양이 결정된다.
  type Login = {
    nickName: string;
    age: number;
    isJoin: boolean;
  };
  ```

### 1.2. Type alias 유니온 와 interface 확장(상속)

- interface 확장(extends) 복습

```ts
interface Parent {
  firtName: string;
  asset: number;
}
interface Child extends Parent {}
// extends 확장(상속)에 의해 만들어진 결과
interface Child {
  firtName: string;
  asset: number;
}

let hong: Child;
hong.firstName = "hong";
hon.asset = 1000;
console.log(hong.firsName);
console.log(hong.asset);
```

- 추가 설명
  : 인터페이스는 여러번 작성하면 계속 ~~ 속성이 합쳐집니다.

```ts
interface User {
  firtName: string;
  asset: number;
}
interface User {
  level: number;
}
// 최종 User 결정 속성
interface User {
  firstName: string;
  asset: number;
  level: number;
}

let hong: User;
```

- type alias 확장

```ts
type User = {
  firtName: string;
  asset: number;
};
type Admin = {
  level: number;
};

let hong: User & Admin;
hong.firstName = "홍";
hong.asset = 1000;
hong.level = 100;
```

### 1.3. Type alias 는 제네릭, 유틸리티 타입, 맵드 타입과 사용

## 2. Enum

- 상수 집합
- 상수를 가독성 올림
- 대문자가 관례, 대문자\_대문자 : POINTA, POINT_A

```ts
enum Direction {
  UP, // 0
  DOWN, // 1
  RIGHT, // 2
  LEFT, // 3
}
console.log(Direction.UP);
console.log(Direction.DOWN);
console.log(Direction.RIGHT);
console.log(Direction.LEFT);
```

```ts
enum Direction {
  UP = 5, // 5
  DOWN, // 6
  RIGHT, // 7
  LEFT, // 8
}
console.log(Direction.UP);
console.log(Direction.DOWN);
console.log(Direction.RIGHT);
console.log(Direction.LEFT);
```

- 아래를 권장함.

```ts
enum Direction {
  UP = "up", // "up"
  DOWN = "down", // "down"
  RIGHT = "right", // "right"
  LEFT = "left", // "left"
}
console.log(Direction.UP);
console.log(Direction.DOWN);
console.log(Direction.RIGHT);
console.log(Direction.LEFT);
```

- 다음 코드를 좋지는 않은 거 같아요.

```ts
enum Direction {
  UP = "up", // "up"
  DOWN = 1, // ``
  RIGHT = up + down, // "up1"
  LEFT = "left".length, // 4
}
console.log(Direction.UP);
console.log(Direction.DOWN);
console.log(Direction.RIGHT);
console.log(Direction.LEFT);
```

- const enum (아주 중요합니다.)
  : const 를 붙여서 만드는 경우 (추천합니다)

  ```ts
  const enum Direction {
    UP = "up", // "up"
    DOWN = "down", // "down"
    RIGHT = "right", // "right"
    LEFT = "left", // "left"
  }
  console.log(Direction.UP);
  console.log(Direction.DOWN);
  console.log(Direction.RIGHT);
  console.log(Direction.LEFT);
  ```

## 3. Class

- 객체를 지향하는 코드의 기본 데이터 타입
- 객체 (속성 + 메소드) 로 구성

## 3.1. 클래스의 장점

- 아래 처럼 작성을 하면 참 힘들어 집니다.

```ts
const hong = {
  name: "홍길동",
  age: 10,
};

const park = {
  name: "황유민",
  age: 20,
};

const kim = {
  name: "김유민",
  age: 15,
};
```

- 위의 코드를 문법을 이용해서 편하게 생성함수 만들자
- 생성자 함수로 만들어진 객체를 인스턴스라고 합니다.

```js
// 객체 {} 를 생성하는 함수 : 생성자 함수 (Pascal)
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const jung = new Person("정호섭", 10);
const jung1 = new Person("김길동", 14);
const jung2 = new Person("박길동", 30);
const jung3 = new Person("둘리", 22);
```

- 조금 더 체계적으로 관리하는 문법을 지원

```js
class Person {}
const hong = new Person();
```

- 위의 코드에서 꼭 참고하면 좋겠어요.
- 아래 코드에서 객체 즉 인스턴스를 생성해 주는 생성자 함수 존재

```js
class Person {
  // 숨겨진 생성자 함수
  // 디폴트 인스턴스 생성자
  constructor() {}
}
const hong = new Person();
```

- 원하는 형태가 아닙니다.

```js
class Person {}
// 아래 코드는 오류가 납니다. paramert 를 받아주지 않습니다.
const hong = new Person("홍길동", 20);
```

- 추천은 가능하면 constructor 를 생성하시길 권장.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const hong = new Person("홍길동", 20);
```

## 3.2. 클래스 문법

- 속성과 메서드 정의
  : 예전 (생성자 함수)

  ```js
  function Persone(name, age) {
    // 속성만 정의
    this.name = name;
    this.age = age;
  }
  // 메서드 (객체에 소속된 함수)
  Persone.prototype.say = function () {
    console.log("안녕");
  };
  const hong = new Person("홍길동", 20);
  ```

  - 위의 코드를 class 로 변경

  ```js
  class Persone {
    // 생성자 작성
    constructor(name, age) {
      // 속성을 할당했다.
      this.name = name;
      this.age = age;
    }
    // 메소드 정의
    say() {
      console.log("안녕");
    }
  }

  const hong = new Person("홍길동", 20);
  ```

- 클래스 확장 (상속) extends
  : 클래스 데이터의 종류인데 속성(변수) + 메소드(함수)
  : 상속 보다는 확장으로 생각
  : 부모(super) 클래스 를 확장해서 자식(sub) 클래스를 생성한다.
  : 부모의 속성 및 기능을 자식이 내려받아서 활용한다.

  ```js
  class Person {
    // 생성자
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    // 메서드 (축약형)
    say() {
      console.log("안녕");
    }
  }
  // 프로게이머
  class Gamer {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    say() {
      console.log("안녕");
    }
  }
  // 가수
  class Singer {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    say() {
      console.log("안녕");
    }
  }
  ```

  : 확장을 적용한 형태로 변경

  ```js
  class Person {
    // 생성자
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    // 메서드 (축약형)
    say() {
      console.log("안녕");
    }
  }

  new human = new Person("홍길동", 20);
  human.say();
  // 아래 코드는 문제 발생 소지가 있다.
  // 여러분이 constructor 를 적었다.
  // 반드시 super() 를 호출
  // 프로게이머
  class Gamer extends Person {
    constructor(name, age) {
      // 부모의 생성자 실행
      super(name, age);
    }
    // 기본 속성, 메소드 외에 추가기능
    play() {
      console.log("게임을 잘해요")
    }
  }

  const faker = new Gamer("페이커", 30);
  faker.say();
  faker.play();

  // 가수
  class Singer extends Person {
    constructor(name, age) {
      // 부모의 생성자 실행
      super(name, age);
    }
    // 기본 속성, 메소드 외에 추가기능
    song() {
      console.log("노래를 잘해요")
    }
  }
  const iu = new Singer("아이유", 30);
  iu.say();
  iu.song();
  ```

- 타입스크립트 클래스 생성
  : 타입 정의

  ```ts
  class Persone {
    // 속성의 타입을 정의한다.
    name: string;
    age: number;

    // parameter 오류를 발생시킵니다.
    // 클래스의 생성자(constructor)는
    // 반환 타입을 명시하지 않습니다.
    constructor(name: string, age: number) {
      // 속성이 오류를 일으킵니다.
      this.name = name;
      this.age = age;
      // 절대로 함수라고 생각해서 return 하지 마세요.
      // return this;
    }
    // any 타입은 타입스크립트가 체크대상에서 제외
    // 리턴값 없는 경우 : void
    say(message: string): void {
      console.log(message + "하세요");
    }
    // 리턴값이 숫자인 경우 : number
    pay(money: number): number {
      return money;
    }
  }
  ```

- 접근제어자
  : 외부에 노출되어서 활용되는지 아닌지 결정
  : 클래스 내부 속성(변수)/ 내부 메서드(함수)
  : 종류는 3가지외에는 없다.
  : public (기본)
  : private (외부사용불가 js 만되는 # )
  : protected (상속한 자식 클래스만 가능)

  : public(기본) 예제
  : 접근제어자를 명시 안하면 public

  ```ts
  class Persone {
    public name: string;
    public age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    public say(message: string): void {
      console.log(message + "하세요");
    }
    public pay(money: number): number {
      return money;
    }
  }

  // 모든 속성, 메서드 public
  const faker: Persone = new Persone("페이커", 20);
  // 속성 접근 가능
  console.log(faker.age);
  console.log(faker.name);
  // 메서드(함수) 접근 가능
  const 비상금 = faker.pay(1000);
  faker.say("식사");
  ```

  : public(기본) 확장(상속)을 적용한 경우

  ```ts
  class Persone {
    public name: string;
    public age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    public say(message: string): void {
      console.log(message + "하세요");
    }
    public pay(money: number): number {
      return money;
    }
  }
  // 자식 클래스
  class Gamer extends Persone {
    constructor(name: string, age: number) {
      super(name, age);
    }
  }
  // 모든 속성, 메서드 public
  // const faker: Persone = new Person("페이커", 20);
  // const faker: Persone = new Gamer("페이커", 20);

  const faker: Gamer = new Gamer("페이커", 20);
  // 속성 접근 가능
  console.log(faker.age);
  console.log(faker.name);
  // 메서드(함수) 접근 가능
  const 비상금 = faker.pay(1000);
  faker.say("식사");
  ```

  : private 는 속성, 메서드 아예 접근불가 (상속도 포함)

  ```js
  class Persone {
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    private say(message: string): void {
      console.log(message + "하세요");
    }
    private pay(money: number): number {
      return money;
    }
  }
  // const iu:Persone = new Persone("아이유", 20)
  // iu.age;
  // iu.name;

  // 자식 클래스
  class Gamer extends Persone {
    constructor(name: string, age: number) {
      super(name, age);
    }
  }

  // 모든 속성, 메서드 public
  // const faker: Persone = new Person("페이커", 20);
  // const faker: Persone = new Gamer("페이커", 20);

  const faker: Gamer = new Gamer("페이커", 20);
  // 속성 접근 가능
  console.log(faker.age);
  console.log(faker.name);
  // 메서드(함수) 접근 가능
  const 비상금 = faker.pay(1000);
  faker.say("식사");
  ```

  : protected 는 상속을 따진다.

  ```ts
  class Persone {
    protected name: string;
    protected age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    protected say(message: string): void {
      console.log(message + "하세요");
    }
    protected pay(money: number): number {
      return money;
    }
  }
  // protected 라서 직접 접근사용 못함
  // const iu:Persone = new Persone("아이유", 20)
  // iu.age;
  // iu.name;

  // 자식 클래스
  class Gamer extends Persone {
    public myName: string;
    public myAge: number;
    constructor(name: string, age: number) {
      super(name, age);
      this.myName = this.name;
      this.myAge = this.age;
    }
    public mySay(message: string) {
      this.say(message);
    }
    public myPay(money: number): number {
      return this.pay(money);
    }
  }

  // 모든 속성, 메서드 public
  // const faker: Persone = new Person("페이커", 20);
  // const faker: Persone = new Gamer("페이커", 20);
  const faker: Gamer = new Gamer("페이커", 20);
  // 속성 접근 가능
  console.log(faker.myAge);
  console.log(faker.myName);
  // 메서드(함수) 접근 가능
  const 비상금 = faker.myPay(1000);
  faker.mySay("식사");
  ```

## 4. Generic <타입> : 제네릭

- 실시간 타입 정의하기
- 타입스크립트는 작성 중에 타입 결정
- 하지만, 실행중 타입을 다르게 정의해야 할 때 활용

### 4.1. 제네릭 이해하기

- 타입을 넘기고 타입을 사용한다.
- 실행하기 전까지는 타입이 정해지지 않았다.
- 오류를 발생시키지 않는 형태가 제네릭

```ts
function getMessage(msg: string | number | boolean): string | number | boolean {
  return msg;
}
const res: string | number | boolean = getMessage("안녕");
const no: string | number | boolean = getMessage(5000);
const isStatus: string | number | boolean = getMessage(true);
```

```ts
type MsgType = string | number | boolean | string[] | number[];
function getMessage(msg: MsgType): MsgType {
  return msg;
}
const res: MsgType = getMessage("안녕");
const no: MsgType = getMessage(5000);
const isStatus: MsgType = getMessage(true);
const isStrArray = getMessage(["a", "b", "c"]);
const isNumberArray = getMessage([1, 2, 3, 4, 5]);
```

### 4.2. 제네릭 모양

```ts
function getMessage<T>(msg: T): T {
  return msg;
}

const res = getMessage<string>("안녕");
// function getMessage(msg: string): string {
//   return msg;
// }

const resNum = getMessage<number>(123);
// function getMessage(msg: number): number {
//   return msg;
// }

const resStrArr = getMessage<string[]>(["a", "b", "c"]);
// function getMessage(msg: string[]): string[] {
//   return msg;
// }
```

### 4.3. 제네릭을 사용하는 이유

- 중복코드 제거
- 런타임시 타입의 지정
- 자유롭게 타입을 지정할 수 있다.

### 4.4. interface 에 제네릭 활용

```ts
// 제네릭을 사용하여 두 가지 타입의 값을 함께 저장하는 인터페이스 정의
interface Pair<T, U> {
  first: T;
  second: U;
}

// Pair 인터페이스 활용 예시
const pair1: Pair<number, string> = { first: 1, second: "two" };
// interface Pair {
//   first: number;
//   second: string;
// }

const pair2: Pair<string, boolean> = { first: "hello", second: true };
// interface Pair {
//   first: string;
//   second: boolean;
// }

console.log(pair1); // { first: 1, second: 'two' }
console.log(pair2); // { first: 'hello', second: true }
```

### 4.5. 제네릭에 제한 걸기

: extends 및 union 을 활용

```ts
interface Pair<T extends number | string> {
  first: T;
}

const pair1: Pair<number> = { first: 1 };
// interface Pair {
//   first: number;
// }
const pair2: Pair<string> = { first: "a" };
// interface Pair {
//   first: string;
// }

// 제약 조건에 의해 오류로 인식
const pair3: Pair<boolean> = { first: true };
```
