import { QueryClient } from "@tanstack/react-query";

const queryClientSingleton = () => {
  return new QueryClient();
};

type QueryClientSingleton = ReturnType<typeof queryClientSingleton>;

const globalForQuery = globalThis as unknown as {
  queryClient: QueryClientSingleton | undefined;
};

export const queryClient = globalForQuery.queryClient ?? queryClientSingleton();

if (process.env.NODE_ENV !== "production") globalForQuery.queryClient = queryClient;
