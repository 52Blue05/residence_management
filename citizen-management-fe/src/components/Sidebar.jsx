import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, HelpCircle, Home, UserCheck, Users } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menuName) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  // Sidebar không chứa URL dynamic, chỉ chứa prefix
  const menuItems = useMemo(
    () => [
      {
        id: "dashboard",
        name: "Dashboard",
        icon: "📊",
        link: "/dashboard",
      },
      {
        id: "residents",
        name: "Quản lý Nhân khẩu",
        icon: "Users",
        submenu: [
          { name: "Danh sách nhân khẩu", link: "/residents" },
          { name: "Thêm nhân khẩu mới", link: "/residents/add" },
          { name: "Tìm kiếm nâng cao", link: "/residents/search" },
        ],
      },
      {
        id: "feeManagement",
        name: "Quản lý thu phí, đóng góp",
        icon: "💰",
        submenu: [
          { name: "Danh sách loại phí", link: "/fee-management/types" },
          { name: "Thu phí theo loại", link: "/fee-management/type" }, // prefix
          { name: "Thu phí theo hộ khẩu", link: "/fee-management/household" }, // prefix
          { name: "Lịch sử thu phí", link: "/fee-management/history" }, // prefix
          { name: "Đóng góp", link: "/fee-management/contribute" },
        ],
      },
      {
        id: "households",
        name: "Quản lý Hộ khẩu",
        icon: "Home",
        submenu: [
          { name: "Danh sách hộ khẩu", link: "/households" },
          { name: "Thêm hộ khẩu mới", link: "/households/add" },
          { name: "Tìm kiếm theo tổ DP", link: "/households/by-area" },
        ],
      },
      {
        id: "sinhvien",
        name: "Sinh viên Thuê trọ",
        icon: "🎓",
        badge: 5,
        submenu: [
          { name: "Danh sách sinh viên", link: "/sinhvien/danh-sach" },
          { name: "Đăng ký mới", link: "/sinhvien/dang-ky" },
          { name: "Sắp hết hạn thuê", link: "/sinhvien/het-han", badge: 5 },
        ],
      },
      {
        id: "kinhdoanh",
        name: "Hộ Kinh doanh",
        icon: "💼",
        submenu: [
          { name: "Danh sách hộ KD", link: "/kinhdoanh/danh-sach" },
          { name: "Đăng ký mới", link: "/kinhdoanh/dang-ky" },
          { name: "Theo loại hình", link: "/kinhdoanh/loai-hinh" },
        ],
      },
      {
        id: "temporary",
        name: "Dân cư Tạm trú",
        icon: "UserCheck",
        link: "/temporary-residents",
      },
      {
        id: "baocao",
        name: "Báo cáo & Thống kê",
        icon: "📈",
        submenu: [
          { name: "Báo cáo dân số", link: "/baocao/danso" },
          { name: "Báo cáo sinh viên", link: "/baocao/sinhvien" },
          { name: "Báo cáo kinh doanh", link: "/baocao/kinhdoanh" },
          { name: "Biến động dân cư", link: "/baocao/bien-dong" },
        ],
      },
      {
        id: "tailieu",
        name: "Quản lý Tài liệu",
        icon: "📁",
        submenu: [
          { name: "Upload tài liệu", link: "/tailieu/upload" },
          { name: "Thư viện file", link: "/tailieu/thu-vien" },
          { name: "Mẫu biểu", link: "/tailieu/mau-bieu" },
        ],
      },
      {
        id: "caidat",
        name: "Cài đặt",
        icon: "⚙️",
        submenu: [
          { name: "Cài đặt hệ thống", link: "/caidat/he-thong" },
          { name: "Quản lý người dùng", link: "/caidat/nguoi-dung" },
        ],
      },
      {
        id: "help",
        name: "Trợ giúp",
        icon: "HelpCircle",
        link: "/help",
      },
    ],
    []
  );

  // Xác định auto expand submenu
  const expandedAuto = useMemo(() => {
    const result = {};
    menuItems.forEach((item) => {
      if (
        item.submenu &&
        item.submenu.some((sub) => location.pathname.startsWith(sub.link))
      ) {
        result[item.id] = true;
      }
    });
    return result;
  }, [location.pathname, menuItems]);

  // Sync state
  useEffect(() => {
    setExpandedMenus(expandedAuto);
  }, [expandedAuto]);

  const renderIcon = (icon) => {
    if (icon === "UserCheck") return <UserCheck className="w-5 h-5" />;
    if (icon === "HelpCircle") return <HelpCircle className="w-5 h-5" />;
    if (icon === "Home") return <Home className="w-5 h-5" />;
    if (icon === "Users") return <Users className="w-5 h-5" />;
    return <span className="text-xl">{icon}</span>;
  };

  const isPathActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="w-64 min-w-[250px] bg-blue-900 text-white h-screen overflow-y-auto">
      <div className="p-6 border-b border-blue-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-blue-900">QL</span>
          </div>
          <div>
            <h1 className="text-sm font-bold">Quản lý Dân cư</h1>
            <p className="text-xs text-blue-200">Phường La Khê</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const hasSubmenu = Array.isArray(item.submenu);
          const isActive = hasSubmenu
            ? expandedMenus[item.id]
            : isPathActive(item.link);

          const baseClasses =
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition";
          const stateClasses = isActive
            ? "bg-white/20 text-white font-semibold"
            : "text-blue-100 hover:bg-white/10";

          return (
            <div key={item.id}>
              {hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={baseClasses + " " + stateClasses}
                  >
                    {renderIcon(item.icon)}
                    <span className="flex-1">{item.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedMenus[item.id] ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </button>

                  {expandedMenus[item.id] && (
                    <div className="ml-2 mt-1 bg-blue-800 rounded-xl border border-blue-700 overflow-hidden">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.link}
                          to={sub.link}
                          className={`flex items-center gap-3 px-4 py-2 text-sm border-l-2 ${
                            isPathActive(sub.link)
                              ? "text-white bg-white/10 border-white font-semibold"
                              : "text-blue-200 hover:bg-white/10"
                          }`}
                        >
                          • {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.link}
                  className={baseClasses + " " + stateClasses}
                >
                  {renderIcon(item.icon)}
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
