import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";

export default function AccountEdit() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "Nguyễn Văn A",
    role: "Cán bộ kế toán",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    address: "Phường La Khê, Hà Đông, Hà Nội",
    avatar: "/images/avatar.jpg",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile({ ...profile, avatar: URL.createObjectURL(file) });
    }
  };

  const handleSave = () => {
    alert("Đã lưu thông tin (mô phỏng)");
    navigate("/account");
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="w-full h-full p-6 md:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Chỉnh sửa thông tin
              </h1>
              <p className="text-gray-600 mt-1 text-sm">
                Cập nhật thông tin cá nhân của tài khoản cán bộ
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-8">
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                />
                <label className="mt-3 text-sm cursor-pointer text-blue-600 hover:underline">
                  Đổi ảnh đại diện
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Chức vụ
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={profile.role}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex gap-4 justify-end">
                <button
                  onClick={() => navigate("/account")}
                  className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Huỷ
                </button>

                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-6">
              <Link to="/account" className="text-blue-600 hover:underline">
                ← Quay lại thông tin tài khoản
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
