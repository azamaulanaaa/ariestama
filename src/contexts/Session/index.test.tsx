import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { createClient } from "@supabase/supabase-js";

import { SessionContextProvider, useSessionContext } from ".";
import Database from "@/services/database";

describe("SessionContext Component", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  const supabaseClient = createClient("http://localhost:8080", "some.fake.key");
  const database = new Database(supabaseClient);
  const wrapper = ({ children }: { children: ReactNode }) => (
    <SessionContextProvider database={database}>
      {children}
    </SessionContextProvider>
  );

  it("useSessionContext must return database", async () => {
    const { result } = renderHook(() => useSessionContext(), { wrapper });

    await waitFor(() => {
      expect(result.current.database).toEqual(database);
    });
  });
});
