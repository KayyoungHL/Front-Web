import React from "react";
import classNames from "classnames";
import { inputStyle } from "MLComponents/componentStyle";
import { USER_IDX } from "MLComponents/CompoOptions/networkConfigs";

function NewProject({ isOpened, setIsOpened, newProject }) {
  const [newProjName, setNewProjName] = React.useState("");

  return (
    <div className={classNames(!isOpened && "hidden", "fixed inset-0 z-10 flex justify-center items-center")}>
      <div className="fixed top-0 right-0 bottom-0 left-0 backdrop-blur-sm" />
      <div className="absolute w-2/5 h-1/5 bg-white border-2 rounded-lg flex flex-col justify-around divide-solid">
        <h3 className="text-xl p-2">새 프로젝트 생성</h3>
        <input
          type="text"
          className={inputStyle + " mx-2"}
          placeholder="프로젝트명을 입력해주세요"
          value={newProjName}
          onChange={(e) => setNewProjName(e.target.value)}
        />
        <div className="flex flex-row justify-around">
          <button
            type="button"
            onClick={() => {
              setIsOpened(false);
              newProject(newProjName);
            }}
            className="border border-blue-500 hover:bg-blue-300 text-black text-sm md:text-xs font-bold w-2/5 py-2 px-2 rounded">
            확인
          </button>
          <button
            type="button"
            onClick={() => setIsOpened(false)}
            className="border border-red-500 hover:bg-red-300 text-black text-md md:text-xs font-bold w-2/5 py-2 px-2 rounded">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(NewProject);
