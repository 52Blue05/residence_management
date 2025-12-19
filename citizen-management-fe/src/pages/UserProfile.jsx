import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import UserLayout from "../components/UserLayout";

export default function UserProfile() {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    setMessage("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Vui lòng nhập đầy đủ các trường.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    // TODO: gọi API đổi mật khẩu thật sự ở backend
    console.log("Change password", { oldPassword, newPassword });
    setMessage("Đổi mật khẩu thành công (mock).");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <UserLayout
      title="Trang cá nhân"
      subtitle="Thông tin tài khoản và đổi mật khẩu"
    >
      <div className="space-y-4">

        {/* Cover + avatar giống layout Facebook đơn giản */}
        <section className="rounded-xl overflow-hidden border border-gray-200 bg-white">
          <div className="h-40 bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500" />
          <div className="px-6 pb-4 -mt-10 flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex items-end gap-4">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-3xl font-bold text-white">
                {user?.fullName?.[0] || "U"}
              </div>
              <div className="pb-2">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {user?.fullName || "Tên tài khoản"}
                </h2>
                <p className="text-sm text-gray-600">
                  {user?.email || "email@example.com"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nội dung 2 cột */}
        <div className="grid gap-4 lg:grid-cols-[1.4fr,1.6fr]">
          {/* Thông tin tài khoản */}
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="font-semibold mb-3 text-gray-900">Giới thiệu</h3>
              <dl className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Họ tên</dt>
                  <dd className="font-medium text-gray-900">{user?.fullName || "—"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Email</dt>
                  <dd className="font-medium break-all text-gray-900">{user?.email || "—"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Mã cán bộ</dt>
                  <dd className="font-medium text-gray-900">
                    {user?.maCanBo || "Tài khoản cư dân (không phải cán bộ)"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Mã hộ khẩu</dt>
                  <dd className="font-medium text-gray-900">{user?.householdId || "—"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Loại tài khoản</dt>
                  <dd className="font-medium capitalize text-gray-900">
                    {user?.role === "admin"
                      ? "Cán bộ / Tổ trưởng"
                      : "Cư dân"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Form đổi mật khẩu */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="font-semibold mb-3 text-gray-900">Đổi mật khẩu</h3>
            <form onSubmit={handleChangePassword} className="space-y-3 text-sm">
              <div>
                <label className="block text-gray-700 mb-1">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 text-gray-900"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 text-gray-900"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 text-gray-900"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {message && (
                <p className={`text-xs mt-1 ${message.includes("thành công") ? "text-emerald-600" : "text-red-600"}`}>
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white"
              >
                Lưu mật khẩu mới
              </button>
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}


