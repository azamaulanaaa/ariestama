import { ReactNode } from "react";
import { AlertsProvider, useAlerts } from "./context";
import Toasts from "./toasts";

type AlertsSystemContentProps = {
  children: ReactNode;
};

const AlertsSystemContent = (props: AlertsSystemContentProps) => {
  const { state, dispatch } = useAlerts();

  const toastsData = state.map((data) => ({
    onClose: () => dispatch({ kind: "remove", id: data.id }),
    ...data,
  }));

  return (
    <>
      <Toasts data={toastsData} />
      {props.children}
    </>
  );
};

export type AlertsSystemProviderProps = {
  children: ReactNode;
};

export const AlertsSystemProvider = (props: AlertsSystemProviderProps) => {
  return (
    <AlertsProvider>
      <AlertsSystemContent>{props.children}</AlertsSystemContent>
    </AlertsProvider>
  );
};

export const useAlertsSystem = useAlerts;
