import Button from "./components/Button";
import Main from "./pages/Main";

function App() {
  // js 코드 자리
  // return <Main></Main>;
  return (
    <>
      <Button bg="red" ratio={100}>
        구매하기
      </Button>
      <Button bg="blue" ratio={50}>
        공유하기
      </Button>
      <Button bg="orange">추천하기</Button>
    </>
  );
}

export default App;
