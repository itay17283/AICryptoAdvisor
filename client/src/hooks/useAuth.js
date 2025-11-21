export function useAuth() {
  const saveToken = (token) => {
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  return { saveToken, logout, isLoggedIn };
}
