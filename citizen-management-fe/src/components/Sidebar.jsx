import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, HelpCircle, Home, UserCheck, Users } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const menuItems = useMemo(() => [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', submenu: null, link: '/dashboard', type: 'single' },
    {
      id: 'residents',
      name: 'Quản lý Nhân khẩu',
      icon: 'Users',
      submenu: [
        { name: 'Danh sách nhân khẩu', link: '/residents', description: 'Xem toàn bộ danh sách nhân khẩu trong phường' },
        { name: 'Thêm nhân khẩu mới', link: '/residents/add', description: 'Đăng ký nhân khẩu mới vào hệ thống' },
        { name: 'Tìm kiếm nâng cao', link: '/residents/search', description: 'Tìm kiếm với nhiều tiêu chí phức tạp' }
      ]
    },
    {
      id: 'households',
      name: 'Quản lý Hộ khẩu',
      icon: 'Home',
      submenu: [
        { name: 'Danh sách hộ khẩu', link: '/households', description: 'Xem toàn bộ hộ khẩu trong phường' },
        { name: 'Thêm hộ khẩu mới', link: '/households/add', description: 'Đăng ký hộ khẩu mới' },
        { name: 'Tìm kiếm theo tổ DP', link: '/households/by-area', description: 'Xem hộ khẩu theo 7 tổ dân phố' }
      ]
    },
    {
      id: 'sinhvien', name: 'Sinh viên Thuê trọ', icon: '🎓', badge: 5, submenu: [
        { name: 'Danh sách sinh viên', link: '/sinhvien/danh-sach' },
        { name: 'Đăng ký mới', link: '/sinhvien/dang-ky' },
        { name: 'Sắp hết hạn thuê', link: '/sinhvien/het-han', badge: 5 }
      ]
    },
    {
      id: 'kinhdoanh', name: 'Hộ Kinh doanh', icon: '💼', submenu: [
        { name: 'Danh sách hộ KD', link: '/kinhdoanh/danh-sach' },
        { name: 'Đăng ký mới', link: '/kinhdoanh/dang-ky' },
        { name: 'Theo loại hình', link: '/kinhdoanh/loai-hinh' }
      ]
    },
    {
      id: 'temporary',
      name: 'Dân cư Tạm trú',
      icon: 'UserCheck',
      submenu: null,
      link: '/temporary-residents',
      type: 'single'
    },
    {
      id: 'fees', name: 'Quản lý Thu - Chi', icon: '💰', submenu: [
        { name: 'Phí vệ sinh', link: '/fees/sanitation', description: 'Danh sách thu phí vệ sinh' },
        { name: 'Lập phiếu thu', link: '/fees/sanitation/collect', description: 'Thu phí vệ sinh' },
        { name: 'Thống kê theo năm', link: '/fees/sanitation/statistics', description: 'Báo cáo phí vệ sinh' },
        { name: 'Hộ chưa đóng', link: '/fees/sanitation/unpaid', description: 'Danh sách hộ chưa nộp' },
        { name: 'Đóng góp tự nguyện', link: '/donations/campaigns', description: 'Các đợt đóng góp' },
        { name: 'Tạo đợt mới', link: '/donations/campaigns/create', description: 'Tạo đợt đóng góp' },
        { name: 'Thu đóng góp', link: '/donations/collect', description: 'Thu tiền đóng góp' },
        { name: 'Báo cáo tổng hợp', link: '/fees/reports/monthly', description: 'Tổng thu theo tháng' },
        { name: 'Cài đặt định mức', link: '/fees/settings/sanitation-rate', description: 'Định mức phí vệ sinh' }
      ]
    },
    {
      id: 'baocao', name: 'Báo cáo & Thống kê', icon: '📈', submenu: [
        { name: 'Báo cáo dân số', link: '/baocao/danso' },
        { name: 'Báo cáo sinh viên', link: '/baocao/sinhvien' },
        { name: 'Báo cáo kinh doanh', link: '/baocao/kinhdoanh' },
        { name: 'Biến động dân cư', link: '/baocao/bien-dong' }
      ]
    },
    {
      id: 'tailieu', name: 'Quản lý Tài liệu', icon: '📁', submenu: [
        { name: 'Cấp giấy', link: '/tailieu/cap-giay' },
        { name: 'Upload tài liệu', link: '/tailieu/upload' },
        { name: 'Thư viện file', link: '/tailieu/thu-vien' },
        { name: 'Mẫu biểu', link: '/tailieu/mau-bieu' }
      ]
    },
    {
      id: 'caidat', name: 'Cài đặt', icon: '⚙️', submenu: [
        { name: 'Cài đặt hệ thống', link: '/caidat/he-thong' },
        { name: 'Quản lý người dùng', link: '/caidat/nguoi-dung' }
      ]
    },
    {
      id: 'help',
      name: 'Trợ giúp',
      icon: 'HelpCircle',
      submenu: null,
      link: '/help',
      type: 'single'
    }
  ], []);

  useEffect(() => {
    setExpandedMenus(prev => {
      const next = { ...prev };
      menuItems.forEach(item => {
        if (item.submenu && item.submenu.some(sub => location.pathname.startsWith(sub.link))) {
          next[item.id] = true;
        }
      });
      return next;
    });
  }, [location.pathname, menuItems]);

  const renderIcon = (icon) => {
    if (icon === 'UserCheck') {
      return <UserCheck className="w-5 h-5" />;
    }
    if (icon === 'HelpCircle') {
      return <HelpCircle className="w-5 h-5" />;
    }
    if (icon === 'Home') {
      return <Home className="w-5 h-5" />;
    }
    if (icon === 'Users') {
      return <Users className="w-5 h-5" />;
    }
    return <span className="text-xl">{icon}</span>;
  };

  const isPathActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <div className="w-64 min-w-[250px] bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 text-white h-screen overflow-y-auto flex-shrink-0">
      {/* Header */}
      <div className="p-6 border-b border-blue-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-blue-900">QL</span>
          </div>
          <div>
            <h1 className="text-sm font-bold">Quản lý Dân cư</h1>
            <p className="text-xs text-blue-200">Phường La Khê</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-1">
        {menuItems.map(item => {
          const hasSubmenu = Array.isArray(item.submenu);
          const activeSubmenu = hasSubmenu && item.submenu.some(sub => isPathActive(sub.link));
          const isActive = !hasSubmenu && item.link ? isPathActive(item.link) : activeSubmenu;

          const baseClasses = "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 text-sm";
          const stateClasses = isActive
            ? "bg-white/15 text-white font-semibold shadow-md"
            : "text-blue-100 hover:bg-white/10 hover:text-white";

          return (
            <div key={item.id}>
              {hasSubmenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`${baseClasses} ${stateClasses}`}
                  >
                    {renderIcon(item.icon)}
                    <span className="flex-1 text-left truncate">{item.name}</span>
                    {item.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-50 font-semibold">{item.badge}</span>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${expandedMenus[item.id] ? "rotate-0" : "-rotate-90"}`}
                    />
                  </button>
                  {expandedMenus[item.id] && (
                    <div className="bg-blue-900/40 rounded-xl mt-1 ml-2 border border-blue-800/40 overflow-hidden">
                      {item.submenu.map((subitem) => {
                        const subActive = isPathActive(subitem.link);
                        return (
                          <Link
                            key={subitem.link}
                            to={subitem.link}
                            className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-200 border-l-2 ${
                              subActive
                                ? "bg-white/10 text-white border-white font-semibold"
                                : "text-blue-100 border-transparent hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <span className="text-blue-300 text-xs">•</span>
                            <span className="flex-1 truncate">{subitem.name}</span>
                            {subitem.badge && (
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-50 font-semibold">
                                {subitem.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.link}
                  className={`${baseClasses} ${stateClasses}`}
                >
                  {renderIcon(item.icon)}
                  <span className="flex-1 text-left truncate">{item.name}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
