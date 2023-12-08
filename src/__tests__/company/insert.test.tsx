import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Config from "@/config";
import InsertCompanyPage from "@/pages/company/insert";

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

describe("Dashboard Insert Company Page", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it("redirect if user is not login", async () => {
    const router = {
      isReady: true,
      push: jest.fn(),
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
                  data: [{ company_insert: false }],
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
      render(<InsertCompanyPage />);
    });

    expect(router.push).toHaveBeenCalledWith(Config.Url.SignIn);
    expect(router.push).toHaveBeenCalledTimes(1);
  });

  it("stay on the page if user is login", async () => {
    const router = {
      isReady: true,
      push: jest.fn(),
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
                  data: [{ company_insert: false }],
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
      render(<InsertCompanyPage />);
    });

    expect(router.push).toHaveBeenCalledTimes(0);
  });

  it("render block if user does not have company insert permission", async () => {
    const router = {
      isReady: true,
      push: jest.fn(),
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
                  data: [{ company_insert: false }],
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
      render(<InsertCompanyPage />);
    });

    const blocker = screen.getByTestId("blocker");

    expect(blocker).toBeVisible();
  });

  it("no blocker if user has company insert permission", async () => {
    const router = {
      isReady: true,
      push: jest.fn(),
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
                  data: [{ company_insert: true }],
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
      render(<InsertCompanyPage />);
    });

    const blocker = screen.getByTestId("blocker");

    expect(blocker).not.toBeVisible();
  });

  it("render insert company form", async () => {
    const router = {
      isReady: true,
      push: jest.fn(),
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
                  data: [{ company_insert: true }],
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
      render(<InsertCompanyPage />);
    });

    screen.getByTestId("CompanyForm");
  });

  it("call onSubmit function when button pressed", async () => {
    const testdata = {
      data: {
        name: "name",
        branch: "branch",
        address: "address",
        sub_district: "sub district",
        city: "city",
        province: "province",
        user_id: "001",
        zip_code: 1234,
      },
    };

    const router = {
      isReady: true,
      push: jest.fn(),
    };
    useRouter.mockReturnValue(router);

    const company_db = {
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({}),
      }),
    };
    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: { id: testdata.data.user_id } } },
          error: null,
        }),
      },
      from: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [{ company_insert: true }],
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
      render(<InsertCompanyPage />);
    });

    const form = screen.getByTestId("CompanyForm");
    const button = within(form).getByRole("button");
    const name_input = within(form).getByLabelText(/Name/);
    const branch_input = within(form).getByLabelText(/Branch/);
    const address_input = within(form).getByLabelText(/Address/);
    const sub_district_input = within(form).getByLabelText(/Sub-District/);
    const city_input = within(form).getByLabelText(/City/);
    const province_input = within(form).getByLabelText(/Province/);
    const zip_code_input = within(form).getByLabelText(/Zip Code/);

    await user.type(name_input, testdata.data.name);
    await user.type(branch_input, testdata.data.branch);
    await user.type(address_input, testdata.data.address);
    await user.type(sub_district_input, testdata.data.sub_district);
    await user.type(city_input, testdata.data.city);
    await user.type(province_input, testdata.data.province);
    await user.type(zip_code_input, String(testdata.data.zip_code));
    await user.click(button);

    expect(company_db.insert).toHaveBeenCalledWith(testdata.data);
    expect(company_db.insert).toHaveBeenCalledTimes(1);
  });

  it("it call success alert then redirect for success insert", async () => {
    const testdata = {
      data: {
        id: "1234",
        name: "name",
        branch: "branch",
        address: "addresss",
        sub_district: "sub_district",
        city: "city",
        province: "province",
        zip_code: 2000,
        user_id: "000",
      },
    };

    const router = {
      isReady: true,
      push: jest.fn(),
    };
    useRouter.mockReturnValue(router);

    const company_db = {
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({
          data: [testdata.data],
          error: null,
        }),
      }),
    };
    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: { id: testdata.data.user_id } } },
          error: null,
        }),
      },
      from: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [{ company_insert: true }],
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
      expect(action.type).toEqual("success");
    });

    const user = userEvent.setup();

    await act(async () => {
      render(<InsertCompanyPage />);
    });

    const form = screen.getByTestId("CompanyForm");
    const button = within(form).getByRole("button");
    const name_input = within(form).getByLabelText(/Name/);
    const branch_input = within(form).getByLabelText(/Branch/);
    const address_input = within(form).getByLabelText(/Address/);
    const input_sub_district = within(form).getByLabelText(/Sub-District/);
    const city_input = within(form).getByLabelText(/City/);
    const province_input = within(form).getByLabelText(/Province/);
    const zip_code_input = within(form).getByLabelText(/Zip Code/);

    await user.type(name_input, testdata.data.name);
    await user.type(branch_input, testdata.data.branch);
    await user.type(address_input, testdata.data.address);
    await user.type(input_sub_district, testdata.data.sub_district);
    await user.type(city_input, testdata.data.city);
    await user.type(province_input, testdata.data.province);
    await user.type(zip_code_input, String(testdata.data.zip_code));
    await user.click(button);

    expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith({
      pathname: Config.Url.Company + "/view",
      query: { id: testdata.data.id },
    });
  });

  it("it call error alert for error insert", async () => {
    const testdata = {
      data: {
        id: "1234",
        name: "name",
        branch: "branch",
        address: "addresss",
        sub_district: "sub_district",
        city: "city",
        province: "province",
        zip_code: 2000,
        user_id: "000",
      },
    };

    const router = {
      isReady: true,
      push: jest.fn(),
    };
    useRouter.mockReturnValue(router);

    const company_db = {
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({
          data: [],
          error: {
            message: "message",
          },
        }),
      }),
    };
    const database = {
      auth: {
        getSession: jest.fn().mockResolvedValue({
          data: { session: { user: { id: testdata.data.user_id } } },
          error: null,
        }),
      },
      from: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [{ company_insert: true }],
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

    const user = userEvent.setup();

    await act(async () => {
      render(<InsertCompanyPage />);
    });

    const form = screen.getByTestId("CompanyForm");
    const button = within(form).getByRole("button");
    const name_input = within(form).getByLabelText(/Name/);
    const branch_input = within(form).getByLabelText(/Branch/);
    const address_input = within(form).getByLabelText(/Address/);
    const sub_disctrict_input = within(form).getByLabelText(/Sub-District/);
    const city_input = within(form).getByLabelText(/City/);
    const province_input = within(form).getByLabelText(/Province/);
    const zip_code_input = within(form).getByLabelText(/Zip Code/);

    await user.type(name_input, testdata.data.name);
    await user.type(branch_input, testdata.data.branch);
    await user.type(address_input, testdata.data.address);
    await user.type(sub_disctrict_input, testdata.data.sub_district);
    await user.type(city_input, testdata.data.city);
    await user.type(province_input, testdata.data.province);
    await user.type(zip_code_input, String(testdata.data.zip_code));
    await user.click(button);

    expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledTimes(0);
  });
});
