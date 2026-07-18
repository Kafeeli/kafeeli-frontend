import { useNavigate } from "react-router-dom";
import { MdLocationOn, MdInfoOutline } from "react-icons/md";
import { FAMILY_STATUS_CONFIG, FAMILY_CARD_STYLE } from "../../../config/familyStatus";

/**
 * كرت عائلة واحد بصفحة القائمة. مبني على الديزاين الأصلي (ManagingFamilyCards)
 * بس مربوط ببيانات حقيقية + إعدادات الحالة المشتركة بدل بيانات ثابتة لكل كرت.
 */
function FamilyCard({ family }) {
  const navigate = useNavigate();
  const statusConfig = FAMILY_STATUS_CONFIG[family.statusKey] || FAMILY_STATUS_CONFIG.pending;
  const cardStyle = FAMILY_CARD_STYLE[family.statusKey] || FAMILY_CARD_STYLE.pending;
  const StatusIcon = statusConfig.banner.icon;

  return (
    <article
      className={`h-full min-h-[430px] overflow-hidden rounded-[12px] border ${cardStyle.borderClass} ${cardStyle.cardBg} shadow-sm hover:shadow-md transition flex flex-col`}
    >
      <div className={`relative h-[96px] ${cardStyle.headerClass} shrink-0`}>
        <div className="absolute right-6 bottom-[-26px] w-[62px] h-[62px] rounded-[8px] bg-white shadow-[0_3px_10px_rgba(16,24,40,0.12)] flex items-center justify-center">
          <span className={`text-[38px] ${cardStyle.iconClass}`}>
            <StatusIcon />
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 px-6 pt-12 pb-5 text-right">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-[Cairo] text-[16px] font-bold text-[#003469] leading-6">
              عائلة {family.headOfHouseholdName}
            </h3>

            <p className="mt-2 font-[Cairo] text-[13px] text-[#6B7280] flex items-center justify-start gap-1">
              <MdLocationOn className="text-[17px] shrink-0" />
              <span>{family.city}</span>
            </p>
          </div>

          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-[Cairo] text-[13px] font-bold whitespace-nowrap ${statusConfig.badgeClass}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {statusConfig.badgeLabel}
          </span>
        </div>

        <div className="mt-5 min-h-[70px]">
          {family.description && (
            <p className="font-[Cairo] text-[14px] leading-8 text-[#5F6673] line-clamp-3">
              {family.description}
            </p>
          )}
        </div>

        <div className="border-t border-[#D6DCE5]" />

        <div className="grid grid-cols-2 gap-4 py-6">
          <div>
            <p className="font-[Cairo] text-[14px] text-[#6B7280]">
              الاحتياج الشهري
            </p>
            <p className="mt-1 font-[Cairo] text-[14px] font-bold text-[#003469]">
              {family.monthlyNeedAmount} ILS
            </p>
          </div>

          <div>
            <p className="font-[Cairo] text-[14px] text-[#6B7280]">
              تاريخ الإضافة
            </p>
            <p className="mt-1 font-[Cairo] text-[14px] font-bold text-[#111827]">
              {family.createdAt ? new Date(family.createdAt).toLocaleDateString("ar-EG") : "—"}
            </p>
          </div>
        </div>

        <div className="border-t border-[#D6DCE5]" />

        <div className="mt-4 min-h-[70px]">
          {family.statusKey === "active" && cardStyle.note && (
            <div className="rounded-[8px] bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 flex items-start gap-2">
              <MdInfoOutline className="text-[#007B83] text-[17px] mt-0.5 shrink-0" />
              <p className="font-[Cairo] text-[12px] leading-6 text-[#6B7280]">
                {cardStyle.note}
              </p>
            </div>
          )}

          {family.statusKey === "needsEdit" && family.needsUpdateReason && (
            <div className="rounded-[8px] bg-[#FFD8D8] border border-[#F5A9A9] px-4 py-4">
              <p className="font-[Cairo] text-[13px] leading-7 text-[#C81E1E]">
                <span className="font-bold">السبب: </span>
                {family.needsUpdateReason}
              </p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={() => navigate(`/families/${family.familyId}`)}
            className="w-full h-[44px] rounded-[7px] border border-[#003469] bg-white text-[#003469] font-[Cairo] text-[15px] font-bold hover:bg-[#003469] hover:text-white transition"
          >
            عرض التفاصيل
          </button>
        </div>
      </div>
    </article>
  );
}

export default FamilyCard;
