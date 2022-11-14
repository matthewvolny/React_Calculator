export const deleteVal = (str) => {
  let arr = str.split("");
  arr.pop();
  return arr.join("");
};
