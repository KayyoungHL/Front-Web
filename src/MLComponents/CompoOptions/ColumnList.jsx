import React, { useContext } from "react";
import { targetURL, MLFUNC_URL, MLFUNC_SUFFIX_DF, URLS_PREPROCESS, httpConfig } from "./networkConfig";
import { AppContext } from "../../App";

function ColumnList({ formId, resultId }) {
  const { storage } = useContext(AppContext);

  // 백앤드로 데이터 전송
  const handleSubmit = async (event) => {
    event.preventDefault(); // 실행 버튼 눌러도 페이지 새로고침 안 되도록 하는 것

    // 백앤드 전송을 위한 설정
    // 백앤드 API URL에 파라미터 추가
    const targetUrl = targetURL(MLFUNC_URL.concat(MLFUNC_SUFFIX_DF, URLS_PREPROCESS.ColumnList));
    const df = storage.getItem("df"); // 기존에 스토리지에 저장되어 있던 데이터프레임(JSON) 가져오기

    // 데이터 전송 후 받아온 결과를 사용자에게 보여주기 위한 코드
    await fetch(targetUrl, httpConfig(JSON.stringify(df)))
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(resultId).innerText = data; // 결과 영역에 출력
      })
      .catch((error) => console.error(error));
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <span>옵션 없음</span>
    </form>
  );
}

export default React.memo(ColumnList);
