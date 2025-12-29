import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { taiKhoanService } from "../services";
import { useFetch } from "../hooks/useApi";

export default function AccountInfo() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user ID from localStorage or AuthContext
  const userId = localStorage.getItem("userId") || 1;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const userData = await taiKhoanService.getById(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message || "Không thể tải thông tin tài khoản");
        console.error("Error fetching user info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <p className="text-gray-600">Đang tải thông tin...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">Lỗi: {error}</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Thông tin tài khoản</h1>

          {user ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Tên đăng nhập
                  </label>
                  <div className="mt-1 text-gray-900">
                    {user.username || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Họ và tên
                  </label>
                  <div className="mt-1 text-gray-900">
                    {user.fullName || user.tenDayDu || "-"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 text-gray-900">{user.email || "-"}</div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Vai trò
                  </label>
                  <div className="mt-1 text-gray-900">
                    {user.role || user.vaiTro || "-"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Số điện thoại
                  </label>
                  <div className="mt-1 text-gray-900">
                    {user.phone || user.soDienThoai || "-"}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Quay lại
                </button>

                <button
                  onClick={() => navigate("/account/change-password")}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600">Không có dữ liệu tài khoản</p>
          )}
        </div>
      </div>
    </div>
  );
}
