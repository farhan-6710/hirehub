"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./authContext";
import { Toaster } from "@/components/ui/sonner";
import { AuthModalProvider } from "./AuthModalContext";
import { RoleAccessProvider } from "./RoleAccessContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AuthModalProvider>
              <RoleAccessProvider>
                {children}
                <Toaster position="top-right" richColors closeButton />
              </RoleAccessProvider>
            </AuthModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
