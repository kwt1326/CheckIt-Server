import { RequestData } from "../../framework/modules/router/types";

/**
 * @description validator 함수 입니다.
 * request body 혹은 authtication spec 의 required 값이 모두 들어왔는지 검사합니다.
 * TODO:
 * 추가적으로, type 별 정규식 검사를 추가해야 합니다.
 * 또한, required 가 아닌 값들에 대해서도 type 검사를 해야 합니다.
 * @param data any
 * @param dataType RequestData
 * @returns 
 */
export const validator = (data: any, dataType: RequestData): boolean | string[] => {
  // required body types filtering
  const requiredDataTypeKeys = Object.entries(dataType).filter(([_, value]) => value.required).map(([key, _]) => key);
  // if all required body types are not undefined, return true
  const invalidDescriptions: string[] = [];
  for (const key of requiredDataTypeKeys) {
    if (data[key] === undefined) {
      invalidDescriptions.push(`누락된 데이터: ${dataType[key].description}\n`);
    }
  }
  if (invalidDescriptions.length === 0) {
    return true;
  }
  return invalidDescriptions;
}