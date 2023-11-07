import { act, cleanup, renderHook, waitFor } from "@testing-library/react";

import useUser from "./useUser";
import Database from "@/libs/Database";

describe("useUser of SessionContext Component", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  const database = new Database({} as any);
  it("return undefined if on process", async () => {
    jest.spyOn(database.user, "getMine").mockResolvedValue({
      data: [],
    } as any);

    const { result } = renderHook(() => useUser(database));
    await waitFor(() => {
      expect(result.current).toBeUndefined();
    });
  });

  it("call database function exactly once", async () => {
    const userGetMine = jest
      .spyOn(database.user, "getMine")
      .mockResolvedValue({ data: [] } as any);

    act(() => {
      renderHook(() => useUser(database));
    });

    await waitFor(() => {
      expect(userGetMine).toHaveBeenCalledTimes(1);
    });
  });

  it("return null for no session data", async () => {
    jest.spyOn(database.user, "getMine").mockResolvedValue({
      error: {} as any,
      data: [],
      count: 0,
    });

    const { result } = renderHook(() => useUser(database));

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });

  it("return not null for session data", async () => {
    jest.spyOn(database.user, "getMine").mockResolvedValue({
      error: null,
      data: [
        {
          id: "id",
          name: "name",
          permission: {},
        },
      ],
      count: 1,
    });

    const { result } = renderHook(() => useUser(database));

    await waitFor(() => {
      expect(result.current).not.toBeNull();
    });
  });
});
