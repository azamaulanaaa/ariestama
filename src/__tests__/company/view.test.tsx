import { act, cleanup, render, screen } from "@testing-library/react";

import ViewPage from "@/pages/company/view";
import Config from "@/config";

const useRouter = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter() {
    return useRouter();
  },
}));

const useSessionContext = jest.fn();
jest.mock("@/contexts/Session", () => ({
  __esModule: true,
  useSessionContext() {
    return useSessionContext();
  },
}));

const useAlertsContext = {
  dispatch: jest.fn(),
};
jest.mock("@/contexts/Alerts", () => ({
  __esModule: true,
  useAlertsContext() {
    return useAlertsContext;
  },
}));

jest.mock("@/layout/Dashboard", () => ({
  __esModule: true,
  default: (props: { children: any }) => <>{props.children}</>,
}));

describe("Dashboard View Companies Page", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it("redirect if user is not login", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        company_read: true,
      },
    };

    const router = {
      isReady: true,
      push: jest.fn(),
      query: testdata.routerQuery,
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: null },
          error: null,
        }),
      },
      from: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [testdata.userPermission],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  error: null,
                }),
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database,
    });

    await act(async () => {
      render(<ViewPage />);
    });

    expect(router.push).toHaveBeenCalledWith(Config.Url.SignIn);
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("stay on the page if user is login", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        company_read: true,
      },
    };

    const router = {
      isReady: true,
      push: jest.fn(),
      query: testdata.routerQuery,
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: { id: "id" } } },
          error: null,
        }),
      },
      from: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [testdata.userPermission],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  error: null,
                }),
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database,
    });

    await act(async () => {
      render(<ViewPage />);
    });

    expect(router.push).toHaveBeenCalledTimes(0);
  });

  it("no blocker if user have permission", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        company_read: true,
      },
    };

    const router = {
      isReady: true,
      push: jest.fn(),
      query: testdata.routerQuery,
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: { id: {} } } },
          error: null,
        }),
      },
      from: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [testdata.userPermission],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  error: null,
                }),
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database,
    });

    await act(async () => {
      render(<ViewPage />);
    });

    const blocker = screen.getByTestId("blocker");

    expect(blocker).not.toBeVisible();
  });

  it("render blocker if user does not have permission", async () => {
    const testdata = {
      routerQuery: {
        id: "id",
      },
      userPermission: {
        company_read: false,
      },
    };

    const router = {
      isReady: true,
      push: jest.fn(),
      query: testdata.routerQuery,
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: { id: {} } } },
          error: null,
        }),
      },
      from: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [testdata.userPermission],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [{}],
                  error: null,
                }),
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database,
    });

    await act(async () => {
      render(<ViewPage />);
    });

    const blocker = screen.getByTestId("blocker");

    expect(blocker).toBeVisible();
  });

  it("send alert if no data found", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        company_read: true,
      },
    };

    const router = {
      isReady: true,
      push: jest.fn(),
      query: testdata.routerQuery,
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: { id: {} } } },
          error: null,
        }),
      },
      from: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [testdata.userPermission],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [],
                  error: null,
                }),
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database,
    });

    useAlertsContext.dispatch.mockImplementation((action) => {
      expect(action.kind).toEqual("add");
      expect(action.type).toEqual("error");
    });

    await act(async () => {
      render(<ViewPage />);
    });

    expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledTimes(0);
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

    const router = {
      isReady: true,
      push: jest.fn(),
      query: testdata.routerQuery,
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: { id: {} } } },
          error: null,
        }),
      },
      from: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [testdata.userPermission],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [testdata.companyData],
                  error: null,
                }),
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database,
    });

    await act(async () => {
      render(<ViewPage />);
    });

    const address_tag = screen.getByTestId("key_address");
    const sub_district_tag = screen.getByTestId("key_sub_district");
    const city_tag = screen.getByTestId("key_city");
    const province_tag = screen.getByTestId("key_province");
    const zip_code_tag = screen.getByTestId("key_zip_code");

    expect(address_tag).toHaveTextContent(testdata.keys.address);
    expect(sub_district_tag).toHaveTextContent(testdata.keys.sub_district);
    expect(city_tag).toHaveTextContent(testdata.keys.city);
    expect(province_tag).toHaveTextContent(testdata.keys.province);
    expect(zip_code_tag).toHaveTextContent(String(testdata.keys.zip_code));
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

    const router = {
      isReady: true,
      push: jest.fn(),
      query: testdata.routerQuery,
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: { id: {} } } },
          error: null,
        }),
      },
      from: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [testdata.userPermission],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [testdata.companyData],
                  error: null,
                }),
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database,
    });
    await act(async () => {
      render(<ViewPage />);
    });

    const name_tag = screen.getByTestId("company-name");
    const branch_tag = screen.getByTestId("company-branch");
    const address_tag = screen.getByTestId("value_address");
    const sub_district_tag = screen.getByTestId("value_sub_district");
    const city_tag = screen.getByTestId("value_city");
    const province_tag = screen.getByTestId("value_province");
    const zip_code_tag = screen.getByTestId("value_zip_code");

    expect(name_tag).toHaveTextContent(testdata.companyData.name);
    expect(branch_tag).toHaveTextContent(testdata.companyData.branch);
    expect(address_tag).toHaveTextContent(testdata.companyData.address);
    expect(sub_district_tag).toHaveTextContent(
      testdata.companyData.sub_district,
    );
    expect(city_tag).toHaveTextContent(testdata.companyData.city);
    expect(province_tag).toHaveTextContent(testdata.companyData.province);
    expect(zip_code_tag).toHaveTextContent(
      String(testdata.companyData.zip_code),
    );
  });

  it("send alert on error fetching company data", async () => {
    const testdata = {
      routerQuery: { id: "some" },
      userPermission: {
        company_read: true,
      },
      error: {
        message: "some",
      },
    };

    const router = {
      isReady: true,
      push: jest.fn(),
      query: testdata.routerQuery,
    };
    useRouter.mockReturnValue(router);

    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: { id: {} } } },
          error: null,
        }),
      },
      from: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [testdata.userPermission],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: null,
                  error: testdata.error,
                }),
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database,
    });

    useAlertsContext.dispatch.mockImplementation((action) => {
      expect(action.kind).toEqual("add");
      expect(action.type).toEqual("error");
      expect(action.message).toEqual(testdata.error.message);
    });

    await act(async () => {
      render(<ViewPage />);
    });

    expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledTimes(0);
  });
});
