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
