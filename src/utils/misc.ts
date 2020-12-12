/**
 * uniqueID文字列みたいなのを返す
 * @param index number
 */
export const uid = () => Math.random().toString(36).substring(6);
