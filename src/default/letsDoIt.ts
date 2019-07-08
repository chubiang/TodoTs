// Compiled with --strictNullChecks
/* eslint no-unused-vars:  */

let val: any = undefined;
// never형 리턴타입 {}안에 실행되는 코드가 반환되는 것으로 끝나지 않아야한다.
// 무한이거나 에러를 던지거나
function throwError(): never {
  throw new Error(`I'm a wicked function!`);
}
const user: { name: string; age: number } = { name: "김지연", age: 28 };
// 오브젝트형 타입 선언
type ProductType = {
  name: string;
  price: number;
  expirDate: Date;
  makedDate: Date;
};
type sumFunc = (a: number, b: number) => number;
const bow: ProductType = {
  name: "milk",
  price: 2500,
  expirDate: new Date("2019-07-04"),
  makedDate: new Date("2019-07-14")
};

// sum 네임드 함수를 yetSum 변수에 주소값 저장
let sum = (x: number, y: number): number => {
  return x + y;
};
const yetSum: (a: number, b: number) => number = sum;

// 에로우 함수형태
const arrowSum: (a: number, b: number) => number = (a, b) => a + b;
// 타입을 이용해서
const typeSum: sumFunc = (a, b) => a + b;

const onePlusOne: () => number = () => 2;
// 매개변수의 기본값 지정
function greetings(name: string = "Man"): void {
  console.log(`Hello, ${name}`);
}
greetings();
// 필수가 아닌 매개변수 경우에는 이름 뒤에 ? 붙인다.
function pickColors(color1: string, color2?: string) {
  console.log(color1, color2);
}
pickColors("pink");

// 오버로딩
function print(str: string): string;
function print(num: number): number;
function print(arr: boolean[]): boolean[];

function print(arg) {
  if (typeof arg === "string") {
    return `string = ${arg}`;
  } else if (typeof arg === "number") {
    return `number = ${arg}`;
  } else if (Array.isArray(arg)) {
    return `array = ${arg}`;
  }
}
// 인터페이스 활용
interface Elem {
  elem: string;
  attrs: string[];
  callback: () => void;
}
class Img implements Elem {
  elem: string;
  attrs: string[];
  callback: () => void;

  constructor() {
    this.elem = "img";
    this.attrs = ["src", "alt", "class", "id"];
  }

  getElementById() {
    console.log(this.elem, this.attrs);
  }
}
const img: Img = new Img();
img.getElementById();
// 제네릭 활용
function getLastElem<T>(arr: T[]): T {
  return arr.splice(-1)[0];
}
console.log(getLastElem(["a", "b", "c"]));
//유니온 타입 - 리턴타입이 여러개 중 하나
function unionReFunc(value: number, returnStr: boolean): number | string {
  if (!!returnStr) {
    return (value * value).toString();
  }
  return value * value;
}
const multiple: number | string = unionReFunc(5, true);
console.log(multiple, typeof multiple);
