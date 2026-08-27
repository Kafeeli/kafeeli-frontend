import { useState } from "react";
import { FiMenu, FiUser } from "react-icons/fi";
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
  const showProfileImage = profileImageUrl && failedImageUrl !== profileImageUrl;

  return (
    <header dir="rtl" className="sticky top-0 z-20 border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="mx-auto flex min-h-10 w-full max-w-7xl items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {onMenuClick && (
            <button type="button" onClick={onMenuClick} aria-label="فتح القائمة" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#003469] hover:bg-gray-100 lg:hidden">
              <FiMenu className="text-xl" />
            </button>
          )}
          {backTo && (
            <button type="button" onClick={() => navigate(backTo)} aria-label="العودة" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#003469] hover:bg-gray-100">
              <MdArrowForward className="text-xl" />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="truncate text-base font-extrabold text-[#003469] sm:text-xl">{pageTitle}</h1>
            {description && <p className="mt-0.5 hidden truncate text-xs text-gray-500 sm:block">{description}</p>}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {actions}
          <div className="hidden max-w-52 text-right sm:block">
            <p className="truncate text-sm font-bold text-gray-800">{fullName || email || "مستخدم كفيلي"}</p>
            {role && <p className="truncate text-xs text-gray-500">{role}</p>}
          </div>
          <div className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-[#0D4B8E] text-[#003469]" aria-label="الصورة الشخصية الافتراضية">
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
    </header>
  );
}
