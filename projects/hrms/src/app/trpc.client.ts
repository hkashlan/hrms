import { AppRouter } from '@hrms-server/trpc-router';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/trpc',
    }),
  ],
});