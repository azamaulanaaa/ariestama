import { cleanup, renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import { AlertsContextProvider, useAlertsContext } from "./index";

describe("Context of Alerts System", () => {
  afterEach(cleanup);

  it("initial with empty alert data", () => {
    const { result } = renderHook(() => useAlertsContext(), {
      wrapper: AlertsContextProvider,
    });

    expect(result.current.state).toHaveLength(0);
  });

  it("add alert data", () => {
    const testdata = {
      alertData: {
        id: "id",
        type: "sucess",
        message: "success",
      },
    };

    const { result } = renderHook(() => useAlertsContext(), {
      wrapper: AlertsContextProvider,
    });

    act(() => {
      result.current.dispatch({
        kind: "add",
        ...testdata.alertData,
      } as any);
    });

    expect(result.current.state).toHaveLength(1);
  });

  it("remove alert data", () => {
    const testdata = {
      initialState: [
        {
          id: "id",
          type: "sucess",
          message: "success",
          open: true,
        },
      ],
    };

    const { result } = renderHook(() => useAlertsContext(), {
      wrapper: (props: { children: ReactNode }) => (
        <AlertsContextProvider initialState={testdata.initialState as any}>
          {props.children}
        </AlertsContextProvider>
      ),
    });

    expect(result.current.state).toHaveLength(1);

    act(() => {
      result.current.dispatch({
        kind: "remove",
        id: testdata.initialState[0].id,
      });
    });

    expect(result.current.state).toHaveLength(0);
  });
});
