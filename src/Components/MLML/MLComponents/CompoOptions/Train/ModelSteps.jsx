import React, { useState, useContext, useEffect } from "react";
import { MLMLContext } from "pages/MLML";
import { ContainerContext } from "Components/MLML/MLComponents/Container";
import { MODEL_KEY_PREFIX } from "utils/networkConfigs";
import { showDataResult, getModelSteps } from "Components/MLML/MLComponents/CompoOptions/mlUtilFuncs";
import { Select } from "Components/MLML/MLComponents/CompoOptions/CompoPiece";
import { AppContext } from "App";

/**
 * 모델 정보(steps) 확인을 위한 컴포넌트.
 * MakePipeline에서 만든 파이프라인에 어떤 인코더, 스케일러, 모델이 포함되어 있는지 보여준다.
 *
 * @returns pipeline의 steps
 */
function ModelSteps({ formId, resultId, isLoading, setIsLoading, render }) {
  const { userIdx } = useContext(AppContext);
  const { dfd } = useContext(MLMLContext);
  const { modelListRef } = useContext(ContainerContext);
  const initialModelList = modelListRef.current ? modelListRef.current.map((model) => model.model_name) : [];

  const [modelList, setModelList] = useState(initialModelList);
  const [modelName, setModelName] = useState(modelList[0]);

  useEffect(() => {
    setModelList(modelListRef.current ? modelListRef.current.map((model) => model.model_name) : []);
    setModelName(modelListRef.current && modelListRef.current.length > 0 ? modelListRef.current[0].model_name : "");
  }, [render]);

  const handleChange = (event) => {
    setModelName(event.target.value);
  };

  // 백앤드로 데이터 전송
  const handleSubmit = async (event) => {
    setIsLoading(true); // 로딩 시작
    event.preventDefault(); // 실행 버튼 눌러도 페이지 새로고침 안 되도록 하는 것
    getModelSteps(MODEL_KEY_PREFIX + userIdx, modelName, true).then((res) => showDataResult(dfd, res, resultId));
    setIsLoading(false); // 로딩 종료
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <Select className="flex-1 self-center justify-self-stretch" options={modelList} text="모델 목록" onChange={handleChange} defaultValue={modelList[0]} />
    </form>
  );
}

export default React.memo(ModelSteps);
