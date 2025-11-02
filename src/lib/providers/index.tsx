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

// src/lib/providers/index.tsx
"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import AuthSyncProvider from "@/components/providers/AuthSyncProvider";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <AuthSyncProvider>
      {children}
    </AuthSyncProvider>
  </Provider>
);

export default Providers;
