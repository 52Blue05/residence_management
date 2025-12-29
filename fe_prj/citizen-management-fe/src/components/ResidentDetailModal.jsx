import { useState } from "react";

export default function ResidentDetailModal({ resident, isOpen, onClose }) {
  if (!isOpen || !resident) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-emerald-50 border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Chi tiết nhân khẩu
            </p>
            <h2 className="text-2xl font-semibold text-gray-900">
              {resident?.hoTen || resident?.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Row 1: Name, Gender, Age */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
                Họ tên
              </label>
              <p className="text-gray-900">
                {resident?.hoTen || resident?.name}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
                Giới tính
              </label>
              <p className="text-gray-900">
                {resident?.gioiTinh || resident?.gender || "—"}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
                Tuổi
              </label>
              <p className="text-gray-900">
                {resident?.tuoi || resident?.age || "—"}
              </p>
            </div>
          </div>

          {/* Row 2: Birth Date, Birth Place */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
                Ngày sinh
              </label>
              <p className="text-gray-900">
                {resident?.ngaySinh || resident?.birthDate || "—"}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
                Nơi sinh
              </label>
              <p className="text-gray-900">
                {resident?.noiSinh || resident?.birthPlace || "—"}
              </p>
            </div>
          </div>

          {/* Row 3: CCCD, Issue Date */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
                Số CCCD
              </label>
              <p className="text-gray-900 font-mono">
                {resident?.soCCCD || resident?.cccd || "—"}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
                Ngày cấp
              </label>
              <p className="text-gray-900">
                {resident?.ngayCapCCCD || resident?.issueDate || "—"}
              </p>
            </div>
          </div>

          {/* Row 4: Issue Place */}
          <div>
            <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
              Nơi cấp CCCD
            </label>
            <p className="text-gray-900">
              {resident?.noiCapCCCD || resident?.issuePlace || "—"}
            </p>
          </div>

          {/* Row 5: Phone */}
          <div>
            <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
              Số điện thoại
            </label>
            <p className="text-gray-900">
              {resident?.soDienThoai || resident?.phone || "—"}
            </p>
          </div>

          {/* Row 6: Occupation, Workplace */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
                Nghề nghiệp
              </label>
              <p className="text-gray-900">
                {resident?.ngheNghiep || resident?.occupation || "—"}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
                Nơi làm việc
              </label>
              <p className="text-gray-900">
                {resident?.noiLamViec || resident?.workplace || "—"}
              </p>
            </div>
          </div>

          {/* Row 7: Residence Type, Household */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
                Loại cư trú
              </label>
              <div>
                <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700 border border-blue-300">
                  {(resident?.loaiCuTru || resident?.residenceType) ===
                  "thuong-tru"
                    ? "Thường trú"
                    : (resident?.loaiCuTru || resident?.residenceType) ===
                      "tam-tru"
                    ? "Tạm trú"
                    : "Khác"}
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 block mb-1">
                Hộ khẩu
              </label>
              <p className="text-gray-900 font-mono">
                {resident?.soHoKhau || resident?.household || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
