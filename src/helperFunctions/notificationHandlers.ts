const handleSuccess = (dispatch: any, successMSg?: string) => {
  dispatch({
    type: "info",
    title: successMSg || "Transaction Confirmed!",
    position: "topR",
  });
};

const handleError = (dispatch: any, errorMsg?: string) => {
  dispatch({
    type: "error",
    title: errorMsg || "Tranaction Rejected!",
    position: "topR",
  });
};

export { handleSuccess, handleError}