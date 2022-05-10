import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { notify, dismissNotification, dismissNotifications } from "reapop";

const useNotify = () => {
  const dispatch = useDispatch();

  const notifySystem = useCallback((title: string, message: string, type: string) => {
    console.log(`Notify: ${title} Message: ${message} Type: ${type}`);
  }, []);

  const notifySuccess = useCallback(
    (title: string, message: string) => {
      dispatch(
        notify({
          title,
          message,
          status: "success",
        })
      );
    },
    [dispatch]
  );

  const notifyError = useCallback(
    (title: string, message: string) => {
      dispatch(
        notify({
          title,
          message,
          status: "error",
        })
      );
    },
    [dispatch]
  );

  const notifyLoading = useCallback(
    (title: string, message: string) => {
      let nt = dispatch(
        notify({
          title,
          message,
          status: "loading",
          dismissAfter: 0,
          dismissible: false,
        })
      );
      return nt.payload.id;
    },
    [dispatch]
  );

  const dismissNotify = useCallback((id: string) => dispatch(dismissNotification(id)), [dispatch]);
  const dismissNotifyAll = useCallback(() => dispatch(dismissNotifications()), [dispatch]);

  return {
    notifySystem,
    notifySuccess,
    notifyError,
    notifyLoading,
    dismissNotify,
    dismissNotifyAll,
  };
};

export default useNotify;
