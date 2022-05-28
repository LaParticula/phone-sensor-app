const borderRadius = arr => {
  if (arr.length === 1) {
    return {
      borderBottomEndRadius: arr[0],
      borderTopEndRadius: arr[0],
      borderTopStartRadius: arr[0],
      borderBottomStartRadius: arr[0],
    };
  } else {
    return {
      borderTopStartRadius: arr[0],
      borderTopEndRadius: arr[1],
      borderBottomEndRadius: arr[2],
      borderBottomStartRadius: arr[3],
    };
  }
};

export default borderRadius;
