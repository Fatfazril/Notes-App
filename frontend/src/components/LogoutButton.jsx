// components/LogoutButton.jsx
import { logoutUser } from "../services/auth";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("accessToken");
      alert("Logout berhasil");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Logout gagal");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}