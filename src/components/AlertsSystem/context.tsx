import {
  ReactNode,
  createContext,
  Dispatch,
  useReducer,
  useContext,
} from "react";

export type AddAlert = {
  kind: "add";
} & Omit<AlertData, "open">;

export type RemoveAlert = {
  kind: "remove";
  id: AlertData["id"];
};

type AlertData = {
  id: string;
  type: "success" | "error";
  message: string;
};

export type AlertsAction = AddAlert | RemoveAlert;

const alertsReducer = (alertState: AlertData[], action: AlertsAction) => {
  switch (action.kind) {
    case "add":
      return [
        ...alertState,
        {
          ...action,
        },
      ];
    case "remove":
      return alertState.filter((data) => {
        return data.id != action.id;
      });
    default:
      throw Error("alert action kind is unknown.");
  }
};

const AlertsContext = createContext<{
  state: AlertData[];
  dispatch: Dispatch<AlertsAction>;
}>({} as any);

export type AlertsProviderProps = {
  children: ReactNode;
  initialState?: AlertData[];
};
export const AlertsProvider = (props: AlertsProviderProps) => {
  const [alerts, alertsDispatch] = useReducer(
    alertsReducer,
    props.initialState ? props.initialState : [],
  );

  return (
    <AlertsContext.Provider
      value={{
        state: alerts,
        dispatch: alertsDispatch,
      }}
    >
      {props.children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => useContext(AlertsContext);
