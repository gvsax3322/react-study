# 카카오 로그인

- 정부 정책으로 이메일 수집 중지
- 카카오 애플리케이션 등록을 수정해야 합니다.
- 카카오 로그인을 백엔드에서 처리(협업)
- 카카로 로그인을 프론트에서 처리

## 1. 애플리케이션 설정

- Rest API 키 보관(본인 정보로 수정필요)
  : f6f075f2097bcc9ea1f1920bb63c450e

- Web 플랫폼 추가(도메인 또는 ip 정보로 추가 필요)
  : http://localhost:3000

- 카카오 로그인 사용 시 Redirect URI를 등록해야 합니다.

- Redirect URI(도메인 또는 ip 정보로 추가 필요)
  : http://localhost:3000/member/kakao

- 동의항목 결정
  : 닉네임 필수

- 카카오 로그인 > 활성화 설정

- [관련문서](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)

## 2. API 만들기

- /src/api/kakaoApi.js

```js
// 앱 등록시 Rest 키 값(절대 오픈 금지)
const rest_api_key = "f6f075f2097bcc9ea1f1920bb63c450e";
// 카카오 로그인 통과시 이동할 주소
const redirect_uri = "http://localhost:3000/member/kakao";
// 카카오 로그인 문서 참조
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

## 3. 카카오로 연결해보기

- /src/components/member/LoginComponent.js

```js
import React, { useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getKakaoLoginLink } from "../../api/kakaoApi";
import { Link } from "react-router-dom";

// 초기값
const initState = {
  email: "",
  pw: "",
};
const LoginComponents = () => {
  const [loginParam, setLoginParam] = useState(initState);
  const handleChange = e => {
    // e.target.name
    // e.target.value
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  // 커스터훅 사용하기
  const { doLogin, moveToPath } = useCustomLogin();

  // slice 값(state)을 읽을때        useSelector
  // slice 값(state)를 업데이트할때  useDispatch()
  // const dispatch = useDispatch();
  const handleClick = e => {
    // // loginSlice 의  state 업데이트
    // // dispatch(login(loginParam));
    // dispatch(loginPostAsync({ loginParam, successFn, failFn, errorFn }));

    // 아래 구문을 실행하고 나면 Promise 돌려 받아요
    doLogin({ loginParam, successFn, failFn, errorFn });
  };

  const successFn = result => {
    console.log("성공", result);
    moveToPath("/");
  };

  const failFn = result => {
    console.log("실패", result);
    alert("이메일 및 비밀번호 확인하세요.");
  };

  const errorFn = result => {
    console.log("서버 에러", result);
  };

  // 카카오 로그인
  const kakaoLogin = getKakaoLoginLink();

  return (
    <div>
      <div>
        <div>이메일</div>
        <div>
          <input
            type="email"
            name="email"
            value={loginParam.email}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>

      <div>
        <div>비밀번호</div>
        <div>
          <input
            type="password"
            name="pw"
            value={loginParam.pw}
            onChange={e => handleChange(e)}
          />
        </div>
      </div>

      <div>
        <button onClick={handleClick}>로그인</button>
      </div>

      <div>
        <Link to={kakaoLogin}>카카오로그인</Link>
      </div>
    </div>
  );
};

export default LoginComponents;
```

## 4. 연결이후 리다이렉트 패스 확인 해보기

- http://localhost:3000/member/kakao?code=XmKyIjBGOWjLuBl1M3z0Fpd1rDY1gwJGh8ESqgdsDv2l1_rjp4VqzQ2P56EKPXPsAAABjTktXQXMISgqRbFCUQ
- 액세스 코드 받아오기
- 리다이렉트 페이지 만들기
- /src/pages/members/KakaoRedirectPage.js

```js
import React from "react";
import { useSearchParams } from "react-router-dom";

const KakaoRedirectPage = () => {
  const [uRLSearchParams, setURLSearchParams] = useSearchParams();
  // 인증코드 파악하기
  const authCode = uRLSearchParams.get("code");
  return (
    <div>
      <h1>카카오 리다이렉트 페이지</h1>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
```

## 5. 라우터 만들기

- /src/App.js

```js
// KKO 로그인 후 보여줄 페이지
const LazyKaKaoPage = lazy(() => import("./pages/members/KakaoRedirectPage"));

// member 라우터 중첩 코드 안쪽

{
  /* ---Start 카카오로그인 연습 */
}
<Route
  path="kakao"
  element={
    <Suspense fallback={<Loading />}>
      <LazyKaKaoPage />
    </Suspense>
  }
/>;
{
  /* ---END 카카오로그인 연습 */
}
```

## 5. 카카오 Access Token 받기

- /src/api/kakaoApi.js

```js
import axios from "axios";

// 앱 등록시 Rest 키 값(절대 오픈 금지)
const rest_api_key = "f6f075f2097bcc9ea1f1920bb63c450e";
// 카카오 로그인 통과시 이동할 주소
const redirect_uri = "http://localhost:3000/member/kakao";
// 카카오 로그인 문서 참조
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
// access 토큰 받기 경로
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };

  const res = await axios.post(access_token_url, params, header);

  const accessToken = res.data.access_token;

  return accessToken;
};
```

- 1. 인가 코드를 받고 나면 Access Token 을 발급 요청해야 합니다.
- 2. 인가 코드를 이용해서 Access 토큰을 요청해 봅니다.
- /src/pages/members/KakaoRedirectPage.js

```js
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken } from "../../api/kakaoApi";

const KakaoRedirectPage = () => {
  const [uRLSearchParams, setURLSearchParams] = useSearchParams();
  // 인증코드 파악하기
  const authCode = uRLSearchParams.get("code");

  // 인증코드로 Access Token 요청하기
  useEffect(() => {
    getAccessToken(authCode).then(data => {
      console.log("access Token", data);
    });
  }, [authCode]);

  return (
    <div>
      <h1>카카오 리다이렉트 페이지</h1>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
```

## 6. 카카오 애플리케이션 비즈앱 등록하기

- 카카오 개발자 콘솔 > 애플리케이션 선택 > 비즈니스 > 앱 아이콘 등록 > 기본 정보 > 수정 > 아이콘 등록 > 저장
- 비즈니스 > 개인 개발자 비즈 앱 전환 > 이메일 필수 동의 > 전환
- 비즈니스 > 비즈 앱 정보 확인
- 요약정보 > Biz 탭 활성화 확인
- 카카오 로그인 > 동의항목 > 이메일 설정

## 7. API 서버에서 사용자 정보 추출하기

- 리액트 에서 카카오 로그인 호출
- 웹브라우저에서 카카오 인가 창으로 이동
- 인가 완료되면 리액트 리다이렉트 화면으로 이동
- 리다이렉트 화면에서 Access Token 요청
- 요청에 의한 결과가 리턴
- 다시 사용자의 상세 정보호출이 가능합니다.
- API 백엔드 에게 맡긴다.
- 위의 정보로 사용자 등록을 한다.
- /src/api/kakaoApi.js

```js
import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

// 앱 등록시 Rest 키 값(절대 오픈 금지)
const rest_api_key = "f6f075f2097bcc9ea1f1920bb63c450e";
// 카카오 로그인 통과시 이동할 주소
const redirect_uri = "http://localhost:3000/member/kakao";
// 카카오 로그인 문서 참조
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
// access 토큰 받기 경로
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };

  const res = await axios.post(access_token_url, params, header);

  const accessToken = res.data.access_token;

  return accessToken;
};

// Access Token 으로 회원정보 가져오기
export const getMemberWithAccessToken = async accessToken => {
  console.log("백엔드에 회원 등록을 위한 액세스 토큰 전달 ", accessToken);
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`,
  );

  return res.data;
};
```

## 8. API 서버에 액세스 토큰 전달해서 회원정보 등록 요청

- /src/pages/members/KakaoRedirectPage.js

```js
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";

const KakaoRedirectPage = () => {
  const [uRLSearchParams, setURLSearchParams] = useSearchParams();
  // 인증코드 파악하기
  const authCode = uRLSearchParams.get("code");

  // 인증코드로 Access Token 요청하기
  useEffect(() => {
    getAccessToken(authCode).then(accessToken => {
      console.log("access Token", accessToken);
      getMemberWithAccessToken(accessToken).then(memberInfo => {
        console.log("-------------------");
        console.log(memberInfo);
      });
    });
  }, [authCode]);

  return (
    <div>
      <h1>카카오 리다이렉트 페이지</h1>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
```
