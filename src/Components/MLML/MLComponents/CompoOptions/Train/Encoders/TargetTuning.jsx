import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import { Switch, TuningParam } from "Components/MLML/MLComponents/CompoOptions/CompoPiece";
import MultiSelect from "react-select";
import { colArrayToObjArray } from "Components/MLML/MLComponents/CompoOptions/mlUtilFuncs";

function Target({ handleOptions, handleSteps, steps, step, optimizer }) {
  const initialOpts = {
    // cols: null,
    // drop_invariant: false,
    // return_df: true,
    handle_unknown: [],
    handle_missing: [],
    min_samples_leaf: ["_randint", null, null, null],
    smoothing: ["_randint", null, null, null],
  };
  // 옵션 상태 값 저장
  const [options, setOptions] = useState(step ? step : initialOpts); // 입력해야 할 파라미터 설정

  // 옵션 변경 시 MakePipeline 컴포넌트에 전달
  useEffect(() => {
    steps.hasOwnProperty("encoders")
      ? handleSteps({ encoders: Object.assign(steps.encoders, { target_encoder: options }) })
      : handleSteps({ encoders: Object.assign({}, { target_encoder: options }) });
  }, [handleSteps, options]);

  const dropInvariantRef = useRef();

  // 옵션 상태 값 저장
  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (event.target.type === "checkbox") {
      setOptions(
        checked
          ? {
              ...options,
              [name]: [true, false],
            }
          : _.omit(
              {
                ...options,
              },
              [name]
            )
      );
    }
  };

  return (
    <div className="flex flex-col space-y-2 border border-blue-400 rounded-lg p-1">
      <h3>Target Encoder</h3>
      <div className="flex flex-row space-x-2">
        <Switch
          ref={dropInvariantRef}
          text="dropInvariant : "
          title={"선택 시 true, false 두 경우 모두에 대하여 학습 진행"}
          onChange={handleChange}
          name={"drop_invariant"}
          checked={options.drop_invariant ? true : false}
        />
      </div>
      <div className="flex flex-row space-x-2">
        <label className="flex-1 self-center">
          handle_unknown
          <MultiSelect
            options={handleOptions}
            onChange={(e) => {
              setOptions({
                ...options,
                handle_unknown: [...e.map((col) => col.value)],
              });
            }}
            className="flex-1"
            isMulti={true}
            closeMenuOnSelect={false}
            defaultValue={colArrayToObjArray(options.handle_unknown)}
          />
        </label>
        <label className="flex-1 self-center">
          handle_missing
          <MultiSelect
            options={handleOptions}
            onChange={(e) => {
              setOptions({
                ...options,
                handle_missing: [...e.map((col) => col.value)],
              });
            }}
            className="flex-1"
            isMulti={true}
            closeMenuOnSelect={false}
            defaultValue={colArrayToObjArray(options.handle_missing)}
          />
        </label>
      </div>
      <div className="flex flex-row space-x-2">
        <label className="self-center flex-1">
          minSamplesLeaf
          <TuningParam name={"min_samples_leaf"} options={options} setOptions={setOptions} optimizer={optimizer} />
        </label>
        <label className="self-center flex-1">
          smoothing
          <TuningParam name={"smoothing"} options={options} setOptions={setOptions} optimizer={optimizer} />
        </label>
      </div>
    </div>
  );
}

export default React.memo(Target);
