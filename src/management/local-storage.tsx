const GET_DATA = (rootName: string) => {
  let data: any = {};
  if (window.localStorage) {
    data = JSON.parse(localStorage.getItem(rootName)) || {};
  }
  return data;
};

const SET_DATA = (rootName: string, data) => {
  typeof data === "object" && (data = JSON.stringify(data));
  if (window.localStorage) {
    localStorage.setItem(rootName, data);
  }
};

const UPDATE_DATA = (rootName, label, value) => {
  let storageData = GET_DATA(rootName);
  storageData[label] = value;
  SET_DATA(rootName, JSON.stringify(storageData));
};

export { GET_DATA, SET_DATA, UPDATE_DATA };
