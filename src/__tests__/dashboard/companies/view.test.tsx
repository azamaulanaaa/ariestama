import { cleanup, render, screen, waitFor } from "@testing-library/react";

import ViewPage from "@/pages/dashboard/companies/view";
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

const layoutDashboard = {
  useAlertsSystem: jest.fn(),
};
jest.mock("@/components/Layout", () => ({
  __esModule: true,
  default: () => ({
    dashboard: () => layoutDashboard,
  }),
}));

describe("Dashboard View Companies Page", () => {
  afterEach(() => {
    cleanup();
  });

  it("let user stay on the page if user have permission", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        company_read: true,
      },
      companyData: {
        id: "id",
        name: "name",
        branch: "branch",
        address: "address",
        sub_district: "sub_district",
        city: "city",
        province: "province",
        zip_code: 1000,
        user_id: "user_id",
      },
    };

    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
      query: testdata.routerQuery,
    });

    const database = new Database({} as any);
    jest.spyOn(database.company, "getsById").mockResolvedValue({
      error: null,
      data: [testdata.companyData],
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

  it("render company data printed keys", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        company_read: true,
      },
      keys: {
        address: "Address",
        sub_district: "Sub District",
        city: "City",
        province: "Province",
        zip_code: "Zip Code",
      },
      companyData: {
        id: "id",
        name: "name",
        branch: "branch",
        address: "address",
        sub_district: "sub_district",
        city: "city",
        province: "province",
        zip_code: 1000,
        user_id: "user_id",
      },
    };
    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
      query: testdata.routerQuery,
    });

    const database = new Database({} as any);
    jest.spyOn(database.company, "getsById").mockResolvedValue({
      error: null,
      data: [testdata.companyData],
      count: 1,
    });

    useSessionContext.mockReturnValue({
      database: database,
      user: {
        permission: testdata.userPermission,
      },
    });

    render(<ViewPage />);
    const address_tag = screen.getByTestId("key_address");
    const sub_district_tag = screen.getByTestId("key_sub_district");
    const city_tag = screen.getByTestId("key_city");
    const province_tag = screen.getByTestId("key_province");
    const zip_code_tag = screen.getByTestId("key_zip_code");

    await waitFor(() => {
      expect(address_tag).toHaveTextContent(testdata.keys.address);
      expect(sub_district_tag).toHaveTextContent(testdata.keys.sub_district);
      expect(city_tag).toHaveTextContent(testdata.keys.city);
      expect(province_tag).toHaveTextContent(testdata.keys.province);
      expect(zip_code_tag).toHaveTextContent(String(testdata.keys.zip_code));
    });
  });

  it("render company data", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        company_read: true,
      },
      companyData: {
        id: "id",
        name: "name",
        branch: "branch",
        address: "address",
        sub_district: "sub_district",
        city: "city",
        province: "province",
        zip_code: 1000,
        user_id: "user_id",
      },
    };
    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
      query: testdata.routerQuery,
    });

    const database = new Database({} as any);
    jest.spyOn(database.company, "getsById").mockResolvedValue({
      error: null,
      data: [testdata.companyData],
      count: 1,
    });

    useSessionContext.mockReturnValue({
      database: database,
      user: {
        permission: testdata.userPermission,
      },
    });

    render(<ViewPage />);
    const name_tag = screen.getByTestId("company-name");
    const branch_tag = screen.getByTestId("company-branch");
    const address_tag = screen.getByTestId("value_address");
    const sub_district_tag = screen.getByTestId("value_sub_district");
    const city_tag = screen.getByTestId("value_city");
    const province_tag = screen.getByTestId("value_province");
    const zip_code_tag = screen.getByTestId("value_zip_code");

    await waitFor(() => {
      expect(name_tag).toHaveTextContent(testdata.companyData.name);
      expect(branch_tag).toHaveTextContent(testdata.companyData.branch);
      expect(address_tag).toHaveTextContent(testdata.companyData.address);
      expect(sub_district_tag).toHaveTextContent(
        testdata.companyData.sub_district
      );
      expect(city_tag).toHaveTextContent(testdata.companyData.city);
      expect(province_tag).toHaveTextContent(testdata.companyData.province);
      expect(zip_code_tag).toHaveTextContent(
        String(testdata.companyData.zip_code)
      );
    });
  });

  it("send alert on error fetching company data", async () => {
    const testdata = {
      routerQuery: { id: "some" },
      userPermission: {
        company_read: true,
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
    jest.spyOn(database.company, "getsById").mockResolvedValue({
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
