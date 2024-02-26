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
// const pair3: Pair<boolean> = { first: true };
