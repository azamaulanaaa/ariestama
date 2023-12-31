// import { cleanup, render, screen, waitFor } from "@testing-library/react";
//
// import UnitsPage from "@/pages/unit";
// import Config from "@/config";
// import Database from "@/services/database";
//
// const useRouter = jest.fn();
// jest.mock("next/router", () => ({
//   useRouter() {
//     return useRouter();
//   },
// }));
//
// const useSessionContext = jest.fn();
// jest.mock("@/contexts/Session", () => ({
//   useSessionContext() {
//     return useSessionContext();
//   },
// }));
//
// jest.mock("@/layout/Dashboard", () => ({
//   __esModule: true,
//   default: (props: { children: any }) => <>{props.children}</>,
// }));
//
describe("Dashboard Units Page", () => {
  it("", () => {});

  //   afterEach(() => {
  //     jest.resetAllMocks();
  //     cleanup();
  //   });
  //
  //   it("redirect to dashboard if user does not have unit read permission", async () => {
  //     const routerPush = jest.fn();
  //     useRouter.mockReturnValue({
  //       isReady: true,
  //       push: routerPush,
  //     });
  //
  //     const database = new Database({} as any);
  //     jest.spyOn(database.unit, "gets").mockResolvedValue({} as any);
  //     useSessionContext.mockReturnValue({
  //       database: database,
  //       user: {
  //         permission: {},
  //       },
  //     });
  //
  //     render(<UnitsPage />);
  //
  //     await waitFor(() => {
  //       expect(routerPush).toHaveBeenCalledTimes(1);
  //       expect(routerPush).toHaveBeenCalledWith(Config.Url.Dashboard);
  //     });
  //   });
  //
  //   it("stays in page if user has unit read permission", async () => {
  //     const routerPush = jest.fn();
  //     useRouter.mockReturnValue({
  //       isReady: true,
  //       push: routerPush,
  //     });
  //
  //     const database = new Database({} as any);
  //     jest.spyOn(database.unit, "gets").mockResolvedValue({} as any);
  //     useSessionContext.mockReturnValue({
  //       database: database,
  //       unit: { permission: { unit_read: true } },
  //     });
  //
  //     render(<UnitsPage />);
  //
  //     await waitFor(() => {
  //       expect(routerPush).toHaveBeenCalledTimes(0);
  //     });
  //   });
  //
  //   it("render table header if user has read unit permission", async () => {
  //     const headers = [
  //       "Serial Number",
  //       "Series",
  //       "Brand",
  //       "Year of Manufacture",
  //       "Made In",
  //     ];
  //
  //     const routerPush = jest.fn();
  //     useRouter.mockReturnValue({
  //       isReady: true,
  //       push: routerPush,
  //     });
  //
  //     const database = new Database({} as any);
  //     jest.spyOn(database.unit, "gets").mockResolvedValue({} as any);
  //     useSessionContext.mockReturnValue({
  //       database: database,
  //       user: { permission: { unit_read: true } },
  //     });
  //
  //     render(<UnitsPage />);
  //
  //     await waitFor(() => {
  //       const colheaders = screen.getAllByRole("columnheader");
  //       headers.forEach((header, index) => {
  //         expect(colheaders[index]).toHaveTextContent(header);
  //       });
  //     });
  //   });
  //
  //   it("render table data for user has read unit permission", async () => {
  //     const items = [
  //       {
  //         id: "id",
  //         serial_number: "000",
  //         series: "series",
  //         brand: "brand",
  //         yom: 2011,
  //         made_in: "idn",
  //       },
  //     ];
  //
  //     const routerPush = jest.fn();
  //     useRouter.mockReturnValue({
  //       isReady: true,
  //       push: routerPush,
  //     });
  //
  //     const database = new Database({} as any);
  //     const unitList = jest.spyOn(database.unit, "gets").mockResolvedValue({
  //       data: items,
  //       ...({} as any),
  //     });
  //     useSessionContext.mockReturnValue({
  //       database: database,
  //       user: { permission: { unit_read: true } },
  //     });
  //
  //     render(<UnitsPage />);
  //
  //     await waitFor(() => {
  //       expect(unitList).toHaveBeenCalledTimes(1);
  //
  //       const rows = screen.getAllByRole("row");
  //       expect(rows).toHaveLength(items.length + 1);
  //       items.forEach((item, index) => {
  //         Object.values(item).forEach((value) => {
  //           expect(rows[index + 1]).toHaveTextContent(String(value));
  //         });
  //       });
  //     });
  //   });
});
