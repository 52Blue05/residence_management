import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import QuanLiHoKhau from "./pages/quanlihokhau";
import HouseholdAdd from "./pages/HouseholdAdd";
import HouseholdByArea from "./pages/HouseholdByArea";

import QuanLyNhanKhau from "./pages/QuanLyNhanKhau";
import ResidentsAdd from "./pages/ResidentsAdd";
import ResidentsSearch from "./pages/ResidentsSearch";

import TemporaryResidents from "./pages/TemporaryResidents";

import UserManagement from "./pages/UserManagement";
import SystemSettings from "./pages/SystemSettings";
import Help from "./pages/Help";

import AccountInfo from "./pages/AccountInfo";
import AccountEdit from "./pages/AccountEdit";
import ChangePassword from "./pages/ChangePassword";

// Fee Management
import FeeTypeList from "./pages/FeeTypeList";
import FeeCollectionByType from "./pages/FeeCollectionByType";
import FeeHouseholdDetail from "./pages/FeeHouseHoldDetail";
import FeeHistoryByHousehold from "./pages/FeeHistoryByHousehold";

// Contributions
import ContributionList from "./pages/ContributionList";
import ContributionDetail from "./pages/ContributionDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      {/* Household */}
      <Route path="/households" element={<QuanLiHoKhau />} />
      <Route path="/households/add" element={<HouseholdAdd />} />
      <Route path="/households/by-area" element={<HouseholdByArea />} />

      {/* Residents */}
      <Route path="/residents" element={<QuanLyNhanKhau />} />
      <Route path="/residents/add" element={<ResidentsAdd />} />
      <Route path="/residents/search" element={<ResidentsSearch />} />

      {/* Temporary */}
      <Route path="/temporary-residents" element={<TemporaryResidents />} />

      {/* Settings */}
      <Route path="/caidat/nguoi-dung" element={<UserManagement />} />
      <Route path="/caidat/he-thong" element={<SystemSettings />} />
      <Route path="/help" element={<Help />} />

      {/* Account */}
      <Route path="/account" element={<AccountInfo />} />
      <Route path="/account/edit" element={<AccountEdit />} />
      <Route path="/account/change-password" element={<ChangePassword />} />

      {/* Fee Management */}
      <Route path="/fee-management/types" element={<FeeTypeList />} />
      <Route
        path="/fee-management/type/:typeId"
        element={<FeeCollectionByType />}
      />
      <Route
        path="/fee-management/type/:typeId/household/:householdId"
        element={<FeeHouseholdDetail />}
      />
      <Route
        path="/fee-management/household/:householdId/history"
        element={<FeeHistoryByHousehold />}
      />

      {/* Contributions */}
      <Route path="/fee-management/contribute" element={<ContributionList />} />
      <Route
        path="/fee-management/contribute/:campaignId"
        element={<ContributionDetail />}
      />
    </Routes>
  );
}
