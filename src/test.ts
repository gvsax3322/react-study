interface Person {
  nickName: string;
  age: number;
}
interface AI {
  nickName: string;
  gen: number;
}
// 어떤 인터페이스를 사용했는지에 따라서 타입 가드 적용
function isPerson(who: Person | AI) {
  // 타입 가드 역할 못함
  if ("nickName" in who) {
    // 공통적인 내용처리
  }
  //  타입 가드 역할 수행
  if ("age" in who) {
    // 공통적인 내용처리
  }
}
