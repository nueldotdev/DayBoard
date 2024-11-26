// get object from array
export const getObject = (objectId: number, array: Array<any>) => {
  const object = array.find((obj) => obj.id === objectId);
  return object;
}