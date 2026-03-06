import { QueryClient, MutationCache, QueryCache } from '@tanstack/react-query';
import { toast } from 'sonner';

const getErrorMessage = (error: unknown): string =>
  (error as any)?.response?.data?.message ?? 'Something went wrong';

const getSuccessMessage = (data: unknown): string =>
  (data as any)?.data?.message ?? (data as any)?.message;

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data === undefined) {
        toast.error((query.meta?.errorMessage as string) ?? getErrorMessage(error));
      }
    },
  }),

  mutationCache: new MutationCache({
    onSuccess: (data, _variables, _context, mutation) => {
      toast.success((mutation.meta?.successMessage as string) ?? getSuccessMessage(data));
    },
    onError: (error, _variables, _context, mutation) => {
      toast.error((mutation.meta?.errorMessage as string) ?? getErrorMessage(error));
    },
  }),

  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});


// Now the priority chain is:

// Success: meta.successMessage → res.data.message → 'Done!'
// Error:   meta.errorMessage   → res.data.message → 'Something went wrong'