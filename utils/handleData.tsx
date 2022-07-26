export const saveData = (dataName: string, dataValue: string): void => {
  window.localStorage.setItem(dataName, dataValue);
};



export const getData = (dataName: string): string | null => {
 
  return window.localStorage.getItem(dataName);
}