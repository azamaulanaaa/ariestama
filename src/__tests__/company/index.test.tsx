import { act, cleanup, render, screen, within } from "@testing-library/react";

import Config from "@/config";
import CompaniesPage from "@/pages/company";

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

describe("Dashboard Companies Page", () => {
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
                  data: [{ company_read: false }],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                then: () => {},
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database: database,
    });

    await act(async () => {
      render(<CompaniesPage />);
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
                  data: [{ company_read: false }],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                then: () => {},
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database: database,
    });

    await act(async () => {
      render(<CompaniesPage />);
    });

    expect(router.push).toHaveBeenCalledTimes(0);
  });

  it("render blocker if user does not have read company permission", async () => {
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
                  data: [{ company_read: false }],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                then: () => {},
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database: database,
    });

    await act(async () => {
      render(<CompaniesPage />);
    });

    screen.getByTestId("CompaniesTable");
    const blocker = screen.getByTestId("blocker");

    expect(database.auth.getSession).toHaveBeenCalledTimes(1);
    expect(database.from).toHaveBeenCalledTimes(2);
    expect(blocker).toBeVisible();
  });

  it("no blocker if user has company read permission", async () => {
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
                  data: [{ company_read: true }],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                then: () => {},
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database: database,
    });

    await act(async () => {
      render(<CompaniesPage />);
    });

    screen.getByTestId("CompaniesTable");
    const blocker = screen.getByTestId("blocker");

    expect(database.auth.getSession).toHaveBeenCalledTimes(1);
    expect(database.from).toHaveBeenCalledTimes(2);
    expect(blocker).not.toBeVisible();
  });

  it("render table header if user has company read permission", async () => {
    const testdata = {
      headers: ["Name", "Branch", "City", "Province"],
    };

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
                  data: [{ company_read: true }],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: () => ({
                then: () => {},
              }),
            };
          default:
        }
      }),
    };
    useSessionContext.mockReturnValue({
      database: database,
    });

    await act(async () => {
      render(<CompaniesPage />);
    });

    const table = screen.getByTestId("CompaniesTable");
    const colheaders = within(table).getAllByRole("columnheader");

    expect(database.auth.getSession).toHaveBeenCalledTimes(1);
    expect(database.from).toHaveBeenCalledTimes(2);
    testdata.headers.forEach((header, index) => {
      expect(colheaders[index]).toHaveTextContent(header);
    });
  });

  it("render table data for user has company read permission", async () => {
    const testdata = {
      items: [
        {
          id: "id",
          name: "name",
          branch: "branch",
          city: "city",
          province: "province",
        },
      ],
    };

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
      from: (table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [{ company_read: true }],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: jest
                .fn()
                .mockResolvedValue({ data: testdata.items, error: null }),
            };
          default:
        }
      },
    };
    useSessionContext.mockReturnValue({
      database: database,
    });

    await act(async () => {
      render(<CompaniesPage />);
    });

    const table = screen.getByTestId("CompaniesTable");
    const rows = within(table).getAllByRole("row");

    expect(rows).toHaveLength(testdata.items.length + 1);
    testdata.items.forEach((item, index) => {
      const row = rows[index + 1];
      expect(row).toHaveTextContent(item.name);
      expect(row).toHaveTextContent(item.branch);
      expect(row).toHaveTextContent(item.city);
      expect(row).toHaveTextContent(item.province);
    });
  });

  it("render alert for error fetching data", async () => {
    const testdata = {
      error: {
        message: "error",
      },
    };
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
      from: (table: string) => {
        switch (table) {
          case "user_permission":
            return {
              select: () => ({
                eq: jest.fn().mockResolvedValue({
                  data: [{ company_read: true }],
                  error: null,
                }),
              }),
            };
          case "company":
            return {
              select: jest
                .fn()
                .mockResolvedValue({ data: null, error: testdata.error }),
            };
          default:
        }
      },
    };
    useSessionContext.mockReturnValue({
      database: database,
    });

    useAlertsContext.dispatch.mockImplementation((action) => {
      expect(action.kind).toEqual("add");
      expect(action.type).toEqual("error");
      expect(action.message).toEqual(testdata.error.message);
    });

    await act(async () => {
      render(<CompaniesPage />);
    });

    screen.getByTestId("CompaniesTable");

    expect(useAlertsContext.dispatch).toHaveBeenCalledTimes(1);
  });
});
