import { cleanup, waitFor, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EditPage from "@/pages/dashboard/units/edit";
import Database from "@/libs/Database";

const useRouter = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return useRouter();
  },
}));

const useSessionContext = jest.fn();
jest.mock("@/components/SessionContext", () => ({
  useSessionContext() {
    return useSessionContext();
  },
}));

jest.mock("material-ripple-effects", () => ({
  __esModule: true,
  default: () => ({
    create() {},
  }),
}));

const layoutDashboard = {
  useAlertsSystem: jest.fn(),
};
jest.mock("@/components/Layout", () => ({
  __esModule: true,
  default: () => ({
    dashboard: () => layoutDashboard,
  }),
}));

describe("Dashboard Edit Company Page", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it("redirect if user does not have unit_read permission", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        unit_update: true,
      },
      unitData: {
        id: "id",
        serial_number: "serial_number",
        series: "series",
        brand: "brand",
        oem: "oem",
        yom: 0,
        made_in: "made_in",
        user_id: "user_id",
        extra: {},
      },
    };

    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
      query: testdata.routerQuery,
    });

    const database = new Database({} as any);
    jest.spyOn(database.unit, "getsById").mockResolvedValue({
      error: null,
      data: [testdata.unitData],
      count: 1,
    });

    useSessionContext.mockReturnValue({
      database: database,
      user: {
        permission: testdata.userPermission,
      },
    });

    render(<EditPage />);

    await waitFor(() => {
      expect(routerPush).toBeCalledTimes(1);
    });
  });

  it("redirect if user does not have unit_update permission", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        unit_read: true,
      },
      unitData: {
        id: "id",
        serial_number: "serial_number",
        series: "series",
        brand: "brand",
        oem: "oem",
        yom: 0,
        made_in: "made_in",
        user_id: "user_id",
        extra: {},
      },
    };

    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
      query: testdata.routerQuery,
    });

    const database = new Database({} as any);
    jest.spyOn(database.unit, "getsById").mockResolvedValue({
      error: null,
      data: [testdata.unitData],
      count: 1,
    });

    useSessionContext.mockReturnValue({
      database: database,
      user: {
        permission: testdata.userPermission,
      },
    });

    render(<EditPage />);

    await waitFor(() => {
      expect(routerPush).toBeCalledTimes(1);
    });
  });

  it("stay on page if user have unit_read and company_update permission", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        unit_read: true,
        unit_update: true,
      },
      unitData: {
        id: "id",
        serial_number: "serial_number",
        series: "series",
        brand: "brand",
        oem: "oem",
        yom: 0,
        made_in: "made_in",
        user_id: "user_id",
        extra: {},
      },
    };

    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
      query: testdata.routerQuery,
    });

    const database = new Database({} as any);
    jest.spyOn(database.unit, "getsById").mockResolvedValue({
      error: null,
      data: [testdata.unitData],
      count: 1,
    });

    useSessionContext.mockReturnValue({
      database: database,
      user: {
        permission: testdata.userPermission,
      },
    });

    render(<EditPage />);

    await waitFor(() => {
      expect(routerPush).toBeCalledTimes(0);
    });
  });

  it("render unit data", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        unit_read: true,
      },
      unitData: {
        id: "id",
        serial_number: "serial_number",
        series: "series",
        brand: "brand",
        oem: "oem",
        yom: 0,
        made_in: "made_in",
        user_id: "user_id",
        extra: {},
      },
    };
    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
      query: testdata.routerQuery,
    });

    const database = new Database({} as any);
    jest.spyOn(database.unit, "getsById").mockResolvedValue({
      error: null,
      data: [testdata.unitData],
      count: 1,
    });

    useSessionContext.mockReturnValue({
      database: database,
      user: {
        permission: testdata.userPermission,
      },
    });

    render(<EditPage />);
    const serial_number_input = screen.getByLabelText(/serial number/i);
    const series_input = screen.getByLabelText(/series/i);
    const brand_input = screen.getByLabelText(/brand/i);
    const oem_input = screen.getByLabelText(/original equipment manufacture/i);
    const yom_input = screen.getByLabelText(/year of manufacture/i);
    const made_in_input = screen.getByLabelText(/made in/i);

    await waitFor(() => {
      expect(serial_number_input).toHaveValue(testdata.unitData.serial_number);
      expect(series_input).toHaveValue(testdata.unitData.series);
      expect(brand_input).toHaveValue(testdata.unitData.brand);
      expect(oem_input).toHaveValue(testdata.unitData.oem);
      expect(yom_input).toHaveValue(testdata.unitData.yom);
      expect(made_in_input).toHaveValue(testdata.unitData.made_in);
    });
  });

  it("call onSubmit function when button pressed", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      user: {
        id: "id",
        permission: {
          unit_read: true,
        },
      },
      unitData: {
        id: "id",
        serial_number: "serial_number",
        series: "series",
        brand: "brand",
        oem: "oem",
        yom: 0,
        made_in: "made_in",
        user_id: "user_id",
        extra: {},
      },
      newBrand: "NEWNAME",
    };
    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
      query: testdata.routerQuery,
    });

    const database = new Database({} as any);
    jest.spyOn(database.unit, "getsById").mockResolvedValue({
      error: null,
      data: [testdata.unitData],
      count: 1,
    });
    const updateUnit = jest.spyOn(database.unit, "update").mockResolvedValue({
      error: null,
      ...({} as any),
    });

    useSessionContext.mockReturnValue({
      database: database,
      user: testdata.user,
    });

    const user = userEvent.setup();

    render(<EditPage />);

    const button = screen.getByRole("button");
    const brand_input = screen.getByLabelText(/brand/i);

    await user.click(brand_input);
    await user.keyboard("{Control>}[KeyA]{/Control}{Backspace}");
    await user.type(brand_input, testdata.newBrand);

    await user.click(button);

    expect(updateUnit).toBeCalledTimes(1);
    expect(updateUnit).toBeCalledWith(testdata.unitData.id, {
      serial_number: testdata.unitData.serial_number,
      series: testdata.unitData.series,
      brand: testdata.newBrand,
      oem: testdata.unitData.oem,
      yom: testdata.unitData.yom,
      made_in: testdata.unitData.made_in,
      user_id: testdata.user.id,
    });
  });
});
