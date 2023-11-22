import { cleanup, render, screen, waitFor } from "@testing-library/react";
import CompaniesPage from "@/pages/company";
import Config from "@/config";
import Database from "@/services/database";

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

jest.mock("@/layout/Dashboard", () => ({
  __esModule: true,
  default: (props: { children: any }) => <>{props.children}</>,
}));

describe("Dashboard Companies Page", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it("redirect to dashboard if user does not have read company permission", async () => {
    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
    });

    const database = new Database({} as any);
    jest.spyOn(database.company, "gets").mockResolvedValue({} as any);
    useSessionContext.mockReturnValue({
      database: database,
      user: {
        permission: {},
      },
    });

    render(<CompaniesPage />);

    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledTimes(1);
      expect(routerPush).toHaveBeenCalledWith(Config.Url.Dashboard);
    });
  });

  it("stays in page if user has company read permission", async () => {
    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
    });

    const database = new Database({} as any);
    jest.spyOn(database.company, "gets").mockResolvedValue({} as any);
    useSessionContext.mockReturnValue({
      database: database,
      user: {
        permission: {
          company_read: true,
        },
      },
    });

    render(<CompaniesPage />);

    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledTimes(0);
    });
  });

  it("render table header if user has company read permission", async () => {
    const testdata = {
      headers: ["Name", "Branch", "City", "Province"],
    };

    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
    });

    const database = new Database({} as any);
    jest.spyOn(database.company, "gets").mockResolvedValue({} as any);
    useSessionContext.mockReturnValue({
      database: database,
      user: {
        permission: { company_read: true },
      },
    });

    render(<CompaniesPage />);

    await waitFor(() => {
      const colheaders = screen.getAllByRole("columnheader");
      testdata.headers.forEach((header, index) => {
        expect(colheaders[index]).toHaveTextContent(header);
      });
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

    const routerPush = jest.fn();
    useRouter.mockReturnValue({
      isReady: true,
      push: routerPush,
    });

    const database = new Database({} as any);
    const companylist = jest.spyOn(database.company, "gets").mockResolvedValue({
      data: testdata.items,
      ...({} as any),
    });
    useSessionContext.mockReturnValue({
      database: database,
      user: {
        permission: { company_read: true },
      },
    });

    render(<CompaniesPage />);

    await waitFor(() => {
      expect(companylist).toHaveBeenCalledTimes(1);

      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(testdata.items.length + 1);
      testdata.items.forEach((item, index) => {
        const row = rows[index + 1];
        expect(row).toHaveTextContent(item.name);
        expect(row).toHaveTextContent(item.branch);
        expect(row).toHaveTextContent(item.city);
        expect(row).toHaveTextContent(item.province);
      });
    });
  });
});
