const deepCopy = (obj) => {
  // 매개변수 obj가 원시타입이면 그 값을 반환한다.
  if(obj === null || typeof obj !== "object") return obj;

  let newState = null;
  let isArray = Array.isArray(obj);

  if(isArray) {
    newState = [];
  } else {
    newState = {};
  }

  Object.keys(obj).forEach((key, index, allKey)=>{
    if(isArray) {
      newState.push(deepCopy(obj[key]));
    } else {
      newState[key] = deepCopy(obj[key]);
    }
  });

  return newState;
};

export default deepCopy;
