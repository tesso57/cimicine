/**
 * uniqueID文字列みたいなのを返す
 * @param index number
 */
export const uid = (index: number) => (index * 0.001).toString(36).substring(6);
