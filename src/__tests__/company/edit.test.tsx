import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EditPage from "@/pages/company/edit";
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
  useAlertsContext: () => useAlertsContext,
}));

jest.mock("@/layout/Dashboard", () => ({
  __esModule: true,
  default: (props: { children: any }) => <>{props.children}</>,
}));

describe("Dashboard Edit Company Page", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it("render company form", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        company_read: true,
        company_update: true,
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
      render(<EditPage />);
    });

    screen.getByTestId("CompanyForm");
  });

  it("redirect if user is not login", async () => {
    const testdata = {
      routerQuery: { id: "id" },
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
                  data: [],
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

    await act(async () => {
      render(<EditPage />);
    });

    expect(router.push).toHaveBeenCalledWith(Config.Url.SignIn);
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("stay on the page if user is login", async () => {
    const testdata = {
      routerQuery: { id: "id" },
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
                  data: [],
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

    await act(async () => {
      render(<EditPage />);
    });

    expect(router.push).toHaveBeenCalledTimes(0);
  });

  it("render blocker if user does not have company_read permission", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        company_read: false,
        company_update: true,
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
      render(<EditPage />);
    });

    const blocker = screen.getByTestId("blocker");

    expect(blocker).toBeVisible();
  });

  it("render blocker if user does not have company_update permission", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        company_read: true,
        company_update: false,
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
      render(<EditPage />);
    });

    const blocker = screen.getByTestId("blocker");

    expect(blocker).toBeVisible();
  });

  it("no blocker if user have company_read and company_update permission", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        company_read: true,
        company_update: true,
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

    await act(async () => {
      render(<EditPage />);
    });

    const blocker = screen.getByTestId("blocker");

    expect(blocker).not.toBeVisible();
  });

  it("render company data", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      userPermission: {
        company_read: true,
        company_update: true,
      },
      companyData: {
        id: "id",
        name: "nama",
        branch: "branch",
        address: "address",
        district: "district",
        city: "city",
        province: "province",
        zip_code: 1000,
        user_id: "user_id",
        created_at: "",
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
      render(<EditPage />);
    });

    const form = screen.getByTestId("CompanyForm");
    const name_input = within(form).getByLabelText(/name/i);
    const branch_input = within(form).getByLabelText(/branch/i);
    const address_input = within(form).getByLabelText(/address/i);
    const district_input = within(form).getByLabelText(/district/i);
    const city_input = within(form).getByLabelText(/city/i);
    const province_input = within(form).getByLabelText(/province/i);
    const zip_code_input = within(form).getByLabelText(/zip code/i);

    expect(name_input).toHaveDisplayValue(testdata.companyData.name);
    expect(branch_input).toHaveDisplayValue(testdata.companyData.branch);
    expect(address_input).toHaveDisplayValue(testdata.companyData.address);
    expect(district_input).toHaveDisplayValue(testdata.companyData.district);
    expect(city_input).toHaveDisplayValue(testdata.companyData.city);
    expect(province_input).toHaveDisplayValue(testdata.companyData.province);
    expect(zip_code_input).toHaveDisplayValue(
      String(testdata.companyData.zip_code),
    );
  });

  it("send data as is on update", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      user: {
        id: "id",
      },
      userPermission: {
        company_read: true,
        company_update: true,
      },
      companyData: {
        id: "123",
        name: "NAME",
        branch: "branch",
        address: "address",
        district: "district",
        city: "city",
        province: "province",
        zip_code: 1000,
        user_id: "user_id",
      },
      newName: "NEWNAME",
    };

    const router = {
      isReady: true,
      push: jest.fn(),
      query: testdata.routerQuery,
    };
    useRouter.mockReturnValue(router);

    const company_db_update_eq = jest.fn().mockResolvedValue({
      error: null,
    });
    const company_db = {
      select: () => ({
        eq: jest.fn().mockResolvedValue({
          data: [testdata.companyData],
          error: null,
        }),
      }),
      update: jest.fn().mockReturnValue({
        eq: company_db_update_eq,
      }),
    };
    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: testdata.user } },
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
            return company_db;
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database,
    });

    const user = userEvent.setup();

    await act(async () => {
      render(<EditPage />);
    });

    const button = screen.getByRole("button");
    const input_name = screen.getByLabelText(/name/i);

    await user.click(input_name);
    await user.keyboard("{Control>}[KeyA]{/Control}{Backspace}");
    await user.type(input_name, testdata.newName);

    await user.click(button);

    expect(company_db.update).toHaveBeenCalledWith({
      name: testdata.newName,
      branch: testdata.companyData.branch,
      address: testdata.companyData.address,
      district: testdata.companyData.district,
      city: testdata.companyData.city,
      province: testdata.companyData.province,
      zip_code: testdata.companyData.zip_code,
    });
    expect(company_db_update_eq).toHaveBeenCalledWith(
      "id",
      testdata.companyData.id,
    );
    expect(company_db.update).toHaveBeenCalledTimes(1);
  });

  it("render alert if something goes wrong with update data", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      user: {
        id: "id",
      },
      userPermission: {
        company_read: true,
        company_update: true,
      },
      companyData: {
        id: "123",
        name: "NAME",
        branch: "branch",
        address: "address",
        district: "district",
        city: "city",
        province: "province",
        zip_code: 1000,
        user_id: "user_id",
      },
      error: {
        message: "error",
      },
    };

    const router = {
      isReady: true,
      push: jest.fn(),
      query: testdata.routerQuery,
    };
    useRouter.mockReturnValue(router);
    const company_db = {
      select: () => ({
        eq: jest.fn().mockResolvedValue({
          data: [testdata.companyData],
          error: null,
        }),
      }),
      update: () => ({
        eq: jest.fn().mockResolvedValue({
          data: null,
          error: testdata.error,
        }),
      }),
    };
    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: testdata.user } },
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
            return company_db;
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

    const user = userEvent.setup();

    await act(async () => {
      render(<EditPage />);
    });

    const form = screen.getByTestId("CompanyForm");
    const button = within(form).getByRole("button");

    await user.click(button);

    expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(1);
  });

  it("render alert if no data is found", async () => {
    const testdata = {
      routerQuery: { id: "id" },
      user: {
        id: "id",
      },
      userPermission: {
        company_read: true,
        company_update: true,
      },
    };

    const router = {
      isReady: true,
      push: jest.fn(),
      query: testdata.routerQuery,
    };
    useRouter.mockReturnValue(router);
    const company_db = {
      select: () => ({
        eq: jest.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
      }),
      update: () => ({
        eq: jest.fn().mockResolvedValue({
          data: null,
          error: null,
        }),
      }),
    };
    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: testdata.user } },
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
            return company_db;
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
      render(<EditPage />);
    });

    expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(1);
  });
});
