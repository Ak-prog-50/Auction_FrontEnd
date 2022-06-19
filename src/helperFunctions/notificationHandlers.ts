import { TNotificationDispatch } from "../@auctionTypes";

const handleSuccess = (dispatch: TNotificationDispatch, successMSg?: string) => {
  dispatch({
    type: "info",
    title: successMSg || "Transaction Confirmed!",
    position: "topR",
  });
};

const handleError = (dispatch: TNotificationDispatch, errorMsg?: string) => {
  dispatch({
    type: "error",
    title: errorMsg || "Tranaction Rejected!",
    position: "topR",
  });
};

const handleWarning = (dispatch: TNotificationDispatch, warningMsg: string) => {
  dispatch({
    type: "warning",
    title: warningMsg,
    position: "topR",
  });
};

export { handleSuccess, handleError, handleWarning };
