function add(a: number, b: number): number {
  return a + b;
}
let result = add(1, 2);

const sum = (a: string, b: string): string => a + b;
let result2 = sum("사랑", "해요");

interface Restaurant {
  ishop: number;
  name: string;
  location: string;
  count: number;
  pics: string[];
  facilities: string[];
}

const 고기집: Restaurant[] = [
  {
    ishop: 1,
    name: "고기굽는남자",
    location: "삼덕동1가 32-10",
    count: 33,
    pics: [
      "22f6a12a-63d9-4c96-a55d-a297d7e2083f.jpg",
      "28bc248f-873d-44ac-bf31-a59fa7be485a.jpg",
      "0d9969ca-dde8-4d42-9b10-3caa87e1aca0.jpg",
    ],
    facilities: ["단체 가능", "예약 가능", "화장실구분"],
  },
  {
    ishop: 2,
    name: "실비소갈비",
    location: "삼덕동2가 132",
    count: 33,
    pics: [
      "0d1cedd2-b347-4772-ac4f-d00f9346a040.jpg",
      "7a902bcb-45b5-4736-a475-24e1d2247c4e.jpg",
    ],
    facilities: ["주차장", "단체 가능", "와이파이", "화장실구분"],
  },
  {
    ishop: 3,
    name: "팔각도",
    location: "삼덕동1가 63-11",
    count: 33,
    pics: [
      "a111be25-0c4a-4a1e-91b8-33bc747febdd.jpg",
      "a4d28843-9247-4190-a77b-53e71d3de4b3.jpg",
    ],
    facilities: ["단체 가능", "와이파이", "예약 가능", "화장실구분"],
  },
  {
    ishop: 4,
    name: "js가든",
    location: "계산동2가 200",
    count: 33,
    pics: [
      "e5c2d247-d419-4038-b376-705f01b15b3a.jpg",
      "136dd470-285e-423b-9c28-0eaf914800ba.jpg",
    ],
    facilities: [],
  },
  {
    ishop: 5,
    name: "국일생갈비",
    location: "대구 중구 국채보상로 492 ",
    count: 33,
    pics: [
      "e6c9b6f2-4062-4a3a-8bde-fe96539148c9.jpg",
      "5e5060a3-2e59-4c31-98c1-a4d21acd4f9d.jpg",
    ],
    facilities: [
      "주차장",
      "단체 가능",
      "포장가능",
      "와이파이",
      "예약 가능",
      "화장실구분",
    ],
  },
  {
    ishop: 6,
    name: "목구멍",
    location: "종로2가 25-1",
    count: 33,
    pics: [
      "2d5e125f-085e-4da7-868e-d9da0cdb15bb.jpg",
      "1a24fe22-0a00-4946-b3be-3b64b1ac15cd.jpg",
    ],
    facilities: ["단체 가능", "와이파이", "예약 가능", "화장실구분"],
  },
  {
    ishop: 7,
    name: "더부처스",
    location: "대구 중구 달구벌대로440길 9-18 1층",
    count: 33,
    pics: [
      "e4985079-788f-4211-9dc1-da3fdc230b52.jpg",
      "0a6bf272-1b4a-4c76-9bfe-dc8bc455beb8.jpg",
    ],
    facilities: ["주차장", "와이파이", "예약 가능"],
  },
  {
    ishop: 8,
    name: "돗소리 종로점",
    location: "대구 중구 종로 24-1",
    count: 33,
    pics: [
      "67c3e7e3-b9c5-492f-a06f-5a12f472c66e.jpg",
      "746cfd05-980d-413f-8c8f-dd5cbfe8dd07.jpg",
    ],
    facilities: ["단체 가능", "와이파이", "예약 가능"],
  },
  {
    ishop: 9,
    name: "혜옥당 종로본점",
    location: "대구 중구 중앙대로81길 28 지상1, 2층",
    count: 33,
    pics: [
      "955d4299-4f2e-4d48-8afd-9f5e9f10eb8e.jpg",
      "c84ad4fc-f817-43ab-8ef8-df5e513a9201.jpg",
    ],
    facilities: ["단체 가능", "와이파이", "예약 가능", "화장실구분"],
  },
  {
    ishop: 10,
    name: "음밀한양",
    location: "대구 중구 달구벌대로450길 10",
    count: 33,
    pics: [
      "729ea550-4f31-4141-bde1-be5b2c54c09a.jpg",
      "4fae44f8-5bee-42fd-8adc-a3cc59efd04e.jpg",
      "02ae0cfe-b970-419a-8430-4c10fb9c7b16.jpg",
    ],
    facilities: [
      "단체 가능",
      "포장가능",
      "와이파이",
      "예약 가능",
      "반려동물",
      "간편결제",
    ],
  },
];
