import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("cm_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  const login = async (email, password, keepSignedIn) => {
    // TODO: Thay thế đoạn mock này bằng gọi API thật trong backend
    // Ví dụ:
    // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    // const data = await res.json();
    // const loggedInUser = data.user;

    const isAdminAccount = email.includes("canbo") || email.includes("admin");

    const loggedInUser = isAdminAccount
      ? {
          id: "USER-ADMIN-001",
          fullName: "Cán bộ quản lý",
          email,
          maCanBo: "CB-001",
          householdId: null,
          role: "admin",
        }
      : {
          id: "USER-CITIZEN-007",
          fullName: "Người dân tổ 7",
          email,
          maCanBo: "",
          householdId: "HK-007", // hộ khẩu ví dụ, dùng chung dữ liệu với admin
          role: "citizen",
        };

    setUser(loggedInUser);
    if (keepSignedIn) {
      localStorage.setItem("cm_user", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("cm_user");
    }
    return loggedInUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cm_user");
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
