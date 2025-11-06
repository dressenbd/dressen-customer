// "use client";

// import { persistor, store } from "@/redux/store";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

// const Providers = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <Provider store={store}>
//             <PersistGate loading={null} persistor={persistor}>
//                 {children}
//             </PersistGate>
//         </Provider>
//     );
// };

// export default Providers;

"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import AuthSyncProvider from "@/components/providers/AuthSyncProvider";
import { useState } from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthSyncProvider>
          {children}
        </AuthSyncProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default Providers;
