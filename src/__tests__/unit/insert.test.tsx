import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InsertUnitPage from "@/pages/unit/insert";
import Database from "@/services/database";
import Config from "@/config";

const useRouter = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return useRouter();
  },
}));

const useSessionContext = jest.fn();
jest.mock("@/contexts/Session", () => ({
  useSessionContext() {
    return useSessionContext();
  },
}));

const useAlertsContexts = {
  dispatch: jest.fn(),
};

jest.mock("@/contexts/Alerts", () => ({
  __esModule: true,
  useAlertsContext: () => useAlertsContexts,
}));

jest.mock("@/layout/Dashboard", () => ({
  __esModule: true,
  default: (props: { children: any }) => <>{props.children}</>,
}));

describe("Dashboard Insert Unit Page", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it("redirect to dashboard if user does not have insert unit permission", async () => {
    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
    });

    useSessionContext.mockReturnValue({
      user: {
        permission: {},
      },
    });

    render(<InsertUnitPage />);

    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledTimes(1);
      expect(routerPush).toHaveBeenCalledWith(Config.Url.Dashboard);
    });
  });

  it("stays in page if user has insert unit permission", async () => {
    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
    });

    useSessionContext.mockReturnValue({
      user: { permission: { unit_insert: true } },
    });

    render(<InsertUnitPage />);

    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledTimes(0);
    });
  });

  it("render insert unit form", () => {
    useRouter.mockReturnValue({ isReady: true });

    useSessionContext.mockReturnValue({
      user: { permission: { unit_insert: true } },
    });

    render(<InsertUnitPage />);

    const form = screen.queryByRole("form");
    const button = screen.queryByRole("button");
    const input_serial_number = screen.queryByLabelText(/serial number/i);
    const input_series = screen.queryByLabelText(/series/i);
    const input_brand = screen.queryByLabelText(/brand/i);
    const input_oem = screen.queryByLabelText(
      /original equipment manufacture/i,
    );
    const input_yom = screen.queryByLabelText(/year of manufacture/i);
    const input_made_in = screen.queryByLabelText(/made in/i);

    expect(form).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input_serial_number).toBeInTheDocument();
    expect(input_series).toBeInTheDocument();
    expect(input_brand).toBeInTheDocument();
    expect(input_oem).toBeInTheDocument();
    expect(input_yom).toBeInTheDocument();
    expect(input_made_in).toBeInTheDocument();
  });

  it("call onSubmit function when button pressed", async () => {
    const testdata = {
      data: {
        serial_number: "serial_number",
        series: "series",
        brand: "brand",
        oem: "oem",
        yom: 2000,
        made_in: "made_in",
        user_id: "user_id",
      },
    };

    const user = userEvent.setup();

    useRouter.mockReturnValue({ isReady: true, push: jest.fn() });

    const database = new Database({} as any);
    const insertUnit = jest.spyOn(database.unit, "insert").mockResolvedValue({
      error: null,
      ...({} as any),
    });
    useSessionContext.mockReturnValue({
      database: database,
      user: {
        id: testdata.data.user_id,
        permission: { unit_insert: true },
      },
    });

    render(<InsertUnitPage />);

    const button = screen.getByRole("button");
    const input_serial_number = screen.getByLabelText(/serial number/i);
    const input_series = screen.getByLabelText(/series/i);
    const input_brand = screen.getByLabelText(/brand/i);
    const input_oem = screen.getByLabelText(/original equipment manufacture/i);
    const input_yom = screen.getByLabelText(/year of manufacture/i);
    const input_made_in = screen.getByLabelText(/made in/i);

    await user.type(input_serial_number, testdata.data.serial_number);
    await user.type(input_series, testdata.data.series);
    await user.type(input_brand, testdata.data.brand);
    await user.type(input_oem, testdata.data.oem);
    await user.type(input_yom, String(testdata.data.yom));
    await user.type(input_made_in, testdata.data.made_in);
    await user.click(button);

    expect(insertUnit).toHaveBeenCalledTimes(1);
    expect(insertUnit).toHaveBeenCalledWith({
      serial_number: testdata.data.serial_number,
      series: testdata.data.series,
      brand: testdata.data.brand,
      oem: testdata.data.oem,
      yom: testdata.data.yom,
      made_in: testdata.data.made_in,
      extra: {},
      user_id: testdata.data.user_id,
    });
  });

  it("it call success alert then redirect for success insert", async () => {
    const testdata = {
      data: {
        serial_number: "serial_number",
        series: "series",
        brand: "brand",
        oem: "oem",
        yom: 2000,
        made_in: "made_in",
      },
    };

    const user = userEvent.setup();

    useAlertsContexts.dispatch.mockImplementationOnce((action) => {
      expect(action.kind).toEqual("add");
      expect(action.type).toEqual("success");
    });

    const routerPush = jest.fn();
    useRouter.mockReturnValue({ isReady: true, push: routerPush });

    const database = new Database({} as any);
    jest.spyOn(database.unit, "insert").mockResolvedValue({
      error: null,
      ...({} as any),
    });
    useSessionContext.mockReturnValue({
      database: database,
      user: { permission: { unit_insert: true } },
    });

    render(<InsertUnitPage />);

    const button = screen.getByRole("button");
    const input_serial_number = screen.getByLabelText(/serial number/i);
    const input_series = screen.getByLabelText(/series/i);
    const input_brand = screen.getByLabelText(/brand/i);
    const input_oem = screen.getByLabelText(/original equipment manufacture/i);
    const input_yom = screen.getByLabelText(/year of manufacture/i);
    const input_made_in = screen.getByLabelText(/made in/i);

    await user.type(input_serial_number, testdata.data.serial_number);
    await user.type(input_series, testdata.data.series);
    await user.type(input_brand, testdata.data.brand);
    await user.type(input_oem, testdata.data.oem);
    await user.type(input_yom, String(testdata.data.yom));
    await user.type(input_made_in, testdata.data.made_in);
    await user.click(button);

    expect(useAlertsContexts.dispatch).toHaveBeenCalledTimes(1);
    expect(routerPush).toHaveBeenCalledTimes(1);
  });

  it("it call error alert for error insert", async () => {
    const testdata = {
      data: {
        serial_number: "serial_number",
        series: "series",
        brand: "brand",
        oem: "oem",
        yom: 2000,
        made_in: "made_in",
      },
    };

    const user = userEvent.setup();

    useAlertsContexts.dispatch.mockImplementationOnce((action) => {
      expect(action.kind).toEqual("add");
      expect(action.type).toEqual("error");
    });

    const routerPush = jest.fn();
    useRouter.mockReturnValue({ isReady: true, push: routerPush });

    const database = new Database({} as any);
    jest.spyOn(database.unit, "insert").mockResolvedValue({
      error: {} as any,
      ...({} as any),
    });
    useSessionContext.mockReturnValue({
      database: database,
      user: { permission: { unit_insert: true } },
    });

    render(<InsertUnitPage />);

    const button = screen.getByRole("button");
    const input_serial_number = screen.getByLabelText(/serial number/i);
    const input_series = screen.getByLabelText(/series/i);
    const input_brand = screen.getByLabelText(/brand/i);
    const input_oem = screen.getByLabelText(/original equipment manufacture/i);
    const input_yom = screen.getByLabelText(/year of manufacture/i);
    const input_made_in = screen.getByLabelText(/made in/i);

    await user.type(input_serial_number, testdata.data.serial_number);
    await user.type(input_series, testdata.data.series);
    await user.type(input_brand, testdata.data.brand);
    await user.type(input_oem, testdata.data.oem);
    await user.type(input_yom, String(testdata.data.yom));
    await user.type(input_made_in, testdata.data.made_in);
    await user.click(button);

    expect(useAlertsContexts.dispatch).toHaveBeenCalledTimes(1);
    expect(routerPush).toHaveBeenCalledTimes(0);
  });
});
