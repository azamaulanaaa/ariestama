import { cleanup, render, screen, waitFor } from "@testing-library/react";

import ViewPage from "@/pages/dashboard/units/view";
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

jest.mock("@/components/Layout/dashboard", () => ({
  __esModule: true,
  default: (props: { children: any }) => <>{props.children}</>,
}));

describe("Dashboard View Companies Page", () => {
  afterEach(() => {
    cleanup();
  });

  it("let user stay on the page if user have permission", async () => {
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

    render(<ViewPage />);

    await waitFor(() => {
      expect(routerPush).toBeCalledTimes(0);
    });
  });

  it("redirect user if user does not have permission", async () => {
    const testdata = {
      userPermission: {},
    };
    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
    });

    useSessionContext.mockReturnValue({
      user: {
        permission: testdata.userPermission,
      },
    });

    render(<ViewPage />);

    await waitFor(() => {
      expect(routerPush).toBeCalledTimes(1);
    });
  });

  it("render unit data printed keys", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        unit_read: true,
      },
      keys: {
        series: "Series",
        brand: "Brand",
        oem: "Original Equipment Manufacture",
        yom: "Year of Manufacture",
        made_in: "Made In",
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

    render(<ViewPage />);
    const series_tag = screen.getByTestId("key_series");
    const brand_tag = screen.getByTestId("key_brand");
    const oem_tag = screen.getByTestId("key_oem");
    const yom_tag = screen.getByTestId("key_yom");
    const made_in = screen.getByTestId("key_made_in");

    await waitFor(() => {
      expect(series_tag).toHaveTextContent(testdata.keys.series);
      expect(brand_tag).toHaveTextContent(testdata.keys.brand);
      expect(oem_tag).toHaveTextContent(testdata.keys.oem);
      expect(yom_tag).toHaveTextContent(testdata.keys.yom);
      expect(made_in).toHaveTextContent(testdata.keys.made_in);
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

    render(<ViewPage />);
    const serial_number_tag = screen.getByTestId("serial-number");
    const series_tag = screen.getByTestId("value_series");
    const brand_tag = screen.getByTestId("value_brand");
    const oem_tag = screen.getByTestId("value_oem");
    const yom_tag = screen.getByTestId("value_yom");
    const made_in_tag = screen.getByTestId("value_made_in");

    await waitFor(() => {
      expect(serial_number_tag).toHaveTextContent(
        testdata.unitData.serial_number,
      );
      expect(series_tag).toHaveTextContent(testdata.unitData.series);
      expect(brand_tag).toHaveTextContent(testdata.unitData.brand);
      expect(oem_tag).toHaveTextContent(testdata.unitData.oem);
      expect(yom_tag).toHaveTextContent(String(testdata.unitData.yom));
      expect(made_in_tag).toHaveTextContent(testdata.unitData.made_in);
    });
  });

  it("send alert on error fetching unit data", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        unit_read: true,
      },
      error: {
        code: "code",
        text: "some",
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
      error: testdata.error,
      data: [],
      count: 0,
    });

    useSessionContext.mockReturnValue({
      database: database,
      user: {
        permission: testdata.userPermission,
      },
    });

    render(<ViewPage />);

    await waitFor(() => {
      expect(routerPush).toBeCalledTimes(0);
    });
  });
});
