export const reduceArrayOfObject = (arr: any[]) =>
  arr.length
    ? arr.reduce((obj, item) => {
        const key = Object.keys(item)[0];
        return { ...obj, [key]: item[key] };
      })
    : null;
