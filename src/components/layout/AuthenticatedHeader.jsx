import { useState } from "react";
import { FiMenu, FiUser, FiBell } from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { getPageTitle } from "../../config/pageTitle";
import useCurrentUser from "../../hooks/useCurrentUser";
import { localizeRole } from "../../utils/localization";

export default function AuthenticatedHeader({
  onMenuClick,
  description,
  backTo,
  actions,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useCurrentUser();

  const pageTitle = getPageTitle(location.pathname);
  const fullName = user?.fullName || user?.name || "";
  const email = user?.email || "";
  const role = localizeRole(user?.role);

  const profileImageUrl = user?.profileImageUrl?.trim() || "";
  const [failedImageUrl, setFailedImageUrl] = useState("");

  const showProfileImage =
    profileImageUrl && failedImageUrl !== profileImageUrl;

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-20 border-b border-gray-200 bg-white px-4 py-3 sm:px-6"
    >
      <div className="mx-auto flex min-h-10 w-full max-w-7xl items-center justify-between">
        {/* اليمين: عنوان الصفحة */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="فتح القائمة"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#003469] hover:bg-gray-100 lg:hidden"
            >
              <FiMenu className="text-xl" />
            </button>
          )}

          {backTo && (
            <button
              type="button"
              onClick={() => navigate(backTo)}
              aria-label="العودة"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#003469] hover:bg-gray-100"
            >
              <MdArrowForward className="text-xl" />
            </button>
          )}

          <div className="min-w-0">
            <h1 className="truncate text-base font-normal text-[#003469] sm:text-xl">
              {pageTitle}
            </h1>

            {description && (
              <p className="mt-0.5 hidden truncate text-xs text-gray-500 sm:block">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* اليسار: المستخدم + الإشعارات */}
        <div className="flex shrink-0 items-center gap-5">
          {actions}

          {/* الإشعارات */}
          <button
            type="button"
            aria-label="الإشعارات"
            className="relative grid h-10 w-10 place-items-center text-[#4B5563] hover:text-[#003469]"
          >
            <FiBell className="text-[23px]" />

            {/* النقطة الحمراء */}
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-600" />
          </button>

          {/* بيانات المستخدم */}
          <div className="flex items-center gap-3">
            {/* الاسم والدور */}
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-gray-800">
                {fullName || email || "مستخدم كفيلي"}
              </p>

              {role && <p className="text-xs text-gray-500">{role}</p>}
            </div>

            {/* الصورة */}
            <div
              className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-[#0D4B8E] bg-gray-100 text-[#003469]"
              aria-label="الصورة الشخصية"
            >
              <FiUser />

              {showProfileImage && (
                <img
                  src={profileImageUrl}
                  alt={fullName || "صورة المستخدم"}
                  onError={() => setFailedImageUrl(profileImageUrl)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
