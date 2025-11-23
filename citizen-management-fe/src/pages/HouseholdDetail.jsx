import Header from '../headers/Header'; // sửa đường dẫn nếu cần

export default function HouseholdDetail() {

  // Dummy data (sau này bạn load từ API)
  const household = {
    soHoKhau: "HK123456",
    chuHo: "Nguyễn Văn A",
    soNha: "25",
    duongPho: "Tố Hữu",
    phuong: "La Khê",
    quan: "Hà Đông",
  };

  const nhanKhau = [
    {
      id: 1,
      hoTen: "Nguyễn Văn A",
      biDanh: "",
      ngaySinh: "1975-02-10",
      noiSinh: "Hà Nội",
      nguyenQuan: "Nam Định",
      danToc: "Kinh",
      ngheNghiep: "Công nhân",
      noiLamViec: "Công ty CP ABC",
      cccd: "012345678901",
      ngayCap: "2016-03-01",
      noiCap: "CA Hà Nội",
      dangKyThuongTru: "2001-05-10",
      thuongTruTruoc: "Nam Định",
      quanHeChuHo: "Chủ hộ",
    },
    {
      id: 2,
      hoTen: "Trần Thị B",
      biDanh: "",
      ngaySinh: "1979-12-22",
      noiSinh: "Hà Đông",
      nguyenQuan: "Hà Nam",
      danToc: "Kinh",
      ngheNghiep: "Nội trợ",
      noiLamViec: "",
      cccd: "012345678900",
      ngayCap: "2017-08-15",
      noiCap: "CA Hà Nội",
      dangKyThuongTru: "2003-02-10",
      thuongTruTruoc: "Hà Nam",
      quanHeChuHo: "Vợ",
    },
    {
      id: 3,
      hoTen: "Nguyễn Văn C",
      biDanh: "",
      ngaySinh: "2005-06-10",
      noiSinh: "Hà Đông",
      nguyenQuan: "Hà Nội",
      danToc: "Kinh",
      ngheNghiep: "Sinh viên",
      noiLamViec: "ĐH Bách Khoa",
      cccd: "",
      ngayCap: "",
      noiCap: "",
      dangKyThuongTru: "2005-06-12",
      thuongTruTruoc: "",
      quanHeChuHo: "Con trai",
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen w-screen bg-sky-500 text-white">
        {/* Fullscreen inner area */}
        <div className="w-full h-screen p-10">
          {/* Use flex column so two sections fill and scroll if cần */}
          <div className="w-full h-full flex flex-col gap-10">
            
            {/* Hộ Khẩu */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-white/10 flex-1 overflow-auto">
              <h2 className="text-3xl font-semibold mb-6">Thông tin Hộ khẩu</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200">
                <div>
                  <p className="text-gray-400">Số hộ khẩu</p>
                  <p className="text-lg font-medium">{household.soHoKhau}</p>
                </div>

                <div>
                  <p className="text-gray-400">Họ tên chủ hộ</p>
                  <p className="text-lg font-medium">{household.chuHo}</p>
                </div>

                <div>
                  <p className="text-gray-400">Số nhà</p>
                  <p className="text-lg font-medium">{household.soNha}</p>
                </div>

                <div>
                  <p className="text-gray-400">Đường phố / Ấp</p>
                  <p className="text-lg font-medium">{household.duongPho}</p>
                </div>

                <div>
                  <p className="text-gray-400">Phường / Xã</p>
                  <p className="text-lg font-medium">{household.phuong}</p>
                </div>

                <div>
                  <p className="text-gray-400">Quận / Huyện</p>
                  <p className="text-lg font-medium">{household.quan}</p>
                </div>
              </div>
            </div>

            {/* Nhân Khẩu */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-white/10 flex-1 overflow-auto">
              <h2 className="text-3xl font-semibold mb-6">Danh sách Nhân khẩu</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-gray-200 border-collapse">
                  <thead>
                    <tr className="bg-gray-700 text-gray-300 uppercase text-sm">
                      <th className="p-3 text-left">Họ tên</th>
                      <th className="p-3 text-left">Ngày sinh</th>
                      <th className="p-3 text-left">CCCD</th>
                      <th className="p-3 text-left">Nghề nghiệp</th>
                      <th className="p-3 text-left">Quan hệ</th>
                    </tr>
                  </thead>

                  <tbody>
                    {nhanKhau.map((nk) => (
                      <tr
                        key={nk.id}
                        className={`border-b border-gray-700 hover:bg-gray-700/40 transition ${
                          nk.quanHeChuHo === "Chủ hộ" ? "bg-purple-900/30" : ""
                        }`}
                      >
                        <td className="p-3 font-medium">
                          {nk.hoTen}
                          {nk.quanHeChuHo === "Chủ hộ" && (
                            <span className="ml-2 px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                              Chủ hộ
                            </span>
                          )}
                        </td>
                        <td className="p-3">{nk.ngaySinh}</td>
                        <td className="p-3">{nk.cccd || "—"}</td>
                        <td className="p-3">{nk.ngheNghiep || "—"}</td>
                        <td className="p-3">{nk.quanHeChuHo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
