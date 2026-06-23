// contexts/index.js

import { AuthProvider } from "./AuthContext";
import { AppProvider } from "./AppContext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <AppProvider>
        {children}
      </AppProvider>
    </AuthProvider>
  );
}