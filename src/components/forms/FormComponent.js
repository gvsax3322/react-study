import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import axios from "axios";

const FormComponent = () => {
  // 1. React Quill 태그 를 저장한다.
  const quillRef = useRef(null);
  // 2. 이미지 핸들링
  const imageHandler = () => {
    // 1. 에디터를 저장한다.
    const editor = quillRef.current.getEditor();
    // 2. 이미지 업로드를 위한 트릭
    //   image를 저장할 html 태그를 즉시 생성한다.
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click(); // 강제클릭

    // 이미지 선택을 한다면 처리를 진행한다.
    input.addEventListener("change", () => {
      // 일반적인 파일 처리과정을 진행한다.
      const file = input.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append("img", file);
      const header = { headers: { "Content-Type": "multipart/form-data" } };
      const res = axios.post("백엔드와 협의한 주소", formData, header);
      // const res = jwtAxios.post("`/api/board/image-upload?iboard=${newIBoard}`", formData, header)
      // res.data ===> "/board/1048/e75629d1-3e06-496a-86f4-11da4a38a4b5.png"
      // 서버 주소  ===> http://192.168.0.144:5223/pic
      const imgUrl = "서버주소" + res.data;

      // 에디터에 이미지 배치하기
      // 현재 에디터에 마우스 커서가 깜빡거리는 위치를 알아낸다.
      const range = editor.getSelection();
      // html 태그 img 생성한다. 그리고, 추가한다.
      editor.insertEmbed(range.index, "image", imgUrl);
      // 강제로 마우스 컷 ㅓ위치를 다음으로 이동한다.
      editor.setSelection(range.index + 1);

      // 백엔드 이미지 서버로 전송해서 이미지경로 받아야 합니다.
      // 1. 화면에 이미지를 보여주기 전에
      // 2. 백엔드로 이미지를 전송한다.
      // 3. 전송이 완료되면 결과를 리턴 받는다.
      // 4. 결과에는 무엇이 담겨지는가 하면
      // 5. 이미지의 경로와 이미지의 파일명이 문자열로 들어온다.
      try {
        console.log("서버로 이미지 전송 axios 실행");
      } catch (err) {
        console.log("err");
      }
    });
  };

  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);

  // 화면이 갱신이 될때 마다 아래 모듈이 적용
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["image", "video"],
          ["clean"],
        ],
        // 이미지 관련해서는 내가 직접 처리할께.
        // 이미지 미리 보기 및 파일 관리는 개발자가 처리한다고 표현
        handlers: { image: imageHandler },
      },
    }),
    [],
  );

  return (
    <div>
      <div>
        <ReactQuill ref={quillRef} onChange={setValue} modules={modules} />
      </div>
      <h2>내용 출력 하기</h2>
      <div>{value}</div>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
    </div>
  );
};

export default FormComponent;
