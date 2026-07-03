import { useEffect, useState } from "react";

import {
  MdAccountBalanceWallet,
  MdOutlinePerson,
  MdOutlineLocationOn,
  MdKeyboardArrowDown,
  MdCreditCard,
  MdInfoOutline,
  MdCheckCircle,
} from "react-icons/md";

import { BsBank } from "react-icons/bs";

function TransferDataSection({ initialStatus = "empty" }) {
  const [showTransferModal, setShowTransferModal] = useState(false);

  /*
    الحالات:
    empty = لا يوجد بيانات تحويل
    pendingReview = بعد إرسال البيانات للمراجعة
    needsUpdate = الإدارة طلبت تعديل
    approved = الإدارة اعتمدت البيانات
  */
  const [accountStatus, setAccountStatus] = useState(initialStatus);

  const [provider, setProvider] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [iban, setIban] = useState("");
  const [branchName, setBranchName] = useState("");
  const [accountError, setAccountError] = useState("");

  const isEmpty = accountStatus === "empty";
  const isPendingReview = accountStatus === "pendingReview";
  const isNeedsUpdate = accountStatus === "needsUpdate";
  const isApproved = accountStatus === "approved";

  const providerOptions = [
    "بنك فلسطين",
    "البنك الإسلامي العربي",
    "البنك الإسلامي الفلسطيني",
    "بنك القاهرة عمان",
    "بنك القدس",
    "محفظتي PalPay",
    "محفظة JawwalPay",
    "محفظة Maalchat",
  ];

  const walletProviders = [
    "محفظتي PalPay",
    "محفظة JawwalPay",
    "محفظة Maalchat",
  ];

  const isWalletProvider = walletProviders.includes(provider);

  const modalTitle = isNeedsUpdate
    ? "تعديل بيانات التحويل"
    : "إضافة بيانات التحويل";

  const adminNote = "يرجى التأكد من رقم الحساب أو رقم الهاتف المرتبط بالمحفظة.";

  const palestinianPhoneRegex = /^(059|056)\d{7}$/;

  useEffect(() => {
    if (showTransferModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showTransferModal]);

  const handleProviderChange = (e) => {
    setProvider(e.target.value);
    setAccountNumber("");
    setAccountError("");
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
    setAccountError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isWalletProvider && !palestinianPhoneRegex.test(accountNumber)) {
      setAccountError(
        "يرجى إدخال رقم جوال فلسطيني صحيح من 10 أرقام يبدأ بـ 059 أو 056.",
      );
      return;
    }

    setAccountError("");
    setAccountStatus("pendingReview");
    setShowTransferModal(false);
  };

  const getMaskedAccountNumber = () => {
    if (!accountNumber) return "غير محدد";

    if (isWalletProvider) {
      return `${accountNumber.slice(0, 3)} **** ${accountNumber.slice(-3)}`;
    }

    return `**** **** ${accountNumber.slice(-4)}`;
  };

  const getMaskedIban = () => {
    if (!iban) return "غير محدد";
    return `${iban.slice(0, 4)} **** **** **** ${iban.slice(-4)}`;
  };

  return (
    <>
      <section
        dir="rtl"
        className="
          transfer-section
          w-full
          max-w-[722px]
          mx-auto
          mb-10
          bg-white
          rounded-[12px]
          border border-[#D8DEE8]
          overflow-hidden
          shadow-sm
          hover:shadow-md
          transition
        "
      >
        {/* Header */}
        <div
          className="
            transfer-header
            w-full
            min-h-[64px]
            bg-[#F3F4F5]
            border-b border-[#D8DEE8]
            px-4 sm:px-6
            py-4
            flex flex-row
            items-center
            justify-between
            gap-4
          "
        >
          <div className="transfer-header-text text-right">
            <h3 className="font-[Cairo] font-bold text-[15px] sm:text-[16px] leading-[24px] text-[#003469]">
              بيانات التحويل
            </h3>

            <p className="font-[Cairo] font-normal text-[12px] sm:text-[13px] leading-[18px] text-[#6B7280]">
              تفاصيل الحساب البنكي المستخدم في التحويلات
            </p>
          </div>

          {isPendingReview && (
            <span className="transfer-status-badge w-fit px-3 py-1 rounded-full bg-[#FFE7B8] text-[#9A6700] text-[11px] font-bold whitespace-nowrap">
              قيد المراجعة
            </span>
          )}

          {isNeedsUpdate && (
            <span className="transfer-status-badge w-fit px-3 py-1 rounded-full bg-[#FFE7B8] text-[#9A6700] text-[11px] font-bold whitespace-nowrap">
              يحتاج تعديل
            </span>
          )}

          {isApproved && (
            <span className="transfer-status-badge w-fit px-3 py-1 rounded-full bg-[#DDFBFB] text-[#018B8F] text-[11px] font-bold whitespace-nowrap">
              معتمدة
            </span>
          )}
        </div>
        {/* Empty State */}
        {isEmpty && (
          <div
            className="
              min-h-[300px] sm:min-h-[360px]
              flex flex-col
              items-center justify-center
              text-center
              px-4 sm:px-6
              py-8 sm:py-10
            "
          >
            <div className="w-[52px] h-[52px] rounded-full bg-[#DDFBFB] flex items-center justify-center mb-4">
              <MdAccountBalanceWallet className="text-[24px] text-[#018B8F]" />
            </div>

            <h4 className="font-[Cairo] font-bold text-[14px] leading-[22px] text-[#111827]">
              لم تقم بإضافة بيانات التحويل بعد
            </h4>

            <p className="mt-2 max-w-[360px] font-[Cairo] font-normal text-[12px] sm:text-[13px] leading-[22px] text-[#6B7280]">
              أضف بيانات حسابك البنكي أو محفظتك الإلكترونية ليتم مراجعتها من قبل
              الإدارة.
            </p>

            <button
              type="button"
              onClick={() => setShowTransferModal(true)}
              className="
                mt-5
                w-full max-w-[230px]
                h-[46px]
                rounded-[8px]
                bg-[#003469]
                text-white
                font-[Cairo] font-bold
                text-[12px]
                flex items-center justify-center gap-2
                shadow-sm
                hover:bg-[#002B57]
                hover:shadow-md
                hover:-translate-y-[1px]
                active:translate-y-0
                transition-all duration-200
                cursor-pointer
              "
            >
              <span>إضافة بيانات التحويل</span>
              <span className="text-[16px] leading-none">+</span>
            </button>
          </div>
        )}
        {/* Pending Review State */}
        {isPendingReview && (
          <div className="p-4 sm:p-6">
            <div className="transfer-grid-2 grid grid-cols-2 gap-5 sm:gap-8 text-right">
              <div className="space-y-4 sm:space-y-5">
                <div className="text-right">
                  <p className="font-[Cairo] text-[12px] leading-[18px] text-[#424750]">
                    اسم البنك / المحفظة
                  </p>

                  <h4
                    dir="rtl"
                    className="
      mt-1
      w-full
      font-[Cairo]
      font-bold
      text-[14px]
      leading-[22px]
      text-[#111827]
      text-right
      whitespace-normal
      break-normal
    "
                  >
                    {provider || "غير محدد"}
                  </h4>
                </div>

                <div>
                  <p className="font-[Cairo] text-[12px] leading-[18px] text-[#6B7280]">
                    {isWalletProvider
                      ? "رقم الهاتف المرتبط بالمحفظة"
                      : "رقم الحساب"}
                  </p>

                  <h4 className="mt-1 font-[Cairo] font-bold text-[14px] leading-[22px] text-[#111827] break-words">
                    {getMaskedAccountNumber()}
                  </h4>
                </div>

                <div>
                  <p className="font-[Cairo] text-[12px] leading-[18px] text-[#424750]">
                    رقم الآيبان IBAN
                  </p>

                  <h4 className="mt-1 font-[Cairo] font-bold text-[14px] leading-[22px] text-[#111827] break-words">
                    {getMaskedIban()}
                  </h4>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <p className="font-[Cairo] text-[12px] leading-[18px] text-[#424750]">
                    اسم صاحب الحساب
                  </p>

                  <h4 className="mt-1 font-[Cairo] font-bold text-[14px] leading-[22px] text-[#111827] break-words">
                    {accountHolder || "غير محدد"}
                  </h4>
                </div>

                <div>
                  <p className="font-[Cairo] text-[12px] leading-[18px] text-[#424750]">
                    الفرع
                  </p>

                  <h4 className="mt-1 font-[Cairo] font-bold text-[14px] leading-[22px] text-[#111827] break-words">
                    {branchName || "غير محدد"}
                  </h4>
                </div>
              </div>
            </div>

            <div
              className="
                transfer-alert
                mt-6
                rounded-[8px]
                bg-[#F3F4F5]
                border border-[#E5E7EB]
                px-3 sm:px-4
                py-3
                flex
                items-center justify-center
                gap-2
                text-[#6B7280]
              "
            >
              <MdInfoOutline className="text-[18px] shrink-0" />

              <p className="font-[Cairo] text-[12px] leading-[20px] text-center">
                تم إرسال بيانات التحويل وهي بانتظار مراجعة الإدارة.
              </p>
            </div>
          </div>
        )}{" "}
        {/* Needs Update State */}
        {isNeedsUpdate && (
          <div className="p-4 sm:p-6">
            <div className="transfer-needs-grid grid grid-cols-2 gap-5 sm:gap-6 items-start">
              <div className="space-y-4">
                <div className="flex items-start justify-end gap-3">
                  <div className="text-right">
                    <h4 className="font-[Cairo] font-bold text-[13px] leading-[20px] text-[#111827]">
                      {provider || "غير محدد"}
                    </h4>

                    <p className="font-[Cairo] text-[12px] leading-[18px] text-[#6B7280]">
                      بيانات التحويل
                    </p>
                  </div>

                  <div className="w-[42px] h-[42px] rounded-[8px] bg-[#EEF4FB] flex items-center justify-center shrink-0">
                    <BsBank className="text-[20px] text-[#003469]" />
                  </div>
                </div>

                <div className="space-y-3 border-t border-[#E5E7EB] pt-4">
                  <div className="transfer-info-row flex items-center justify-between gap-4 text-[12px]">
                    <span className="text-[#6B7280] shrink-0">صاحب الحساب</span>

                    <span className="text-[#111827] font-medium break-words">
                      {accountHolder || "غير محدد"}
                    </span>
                  </div>

                  <div className="transfer-info-row flex items-center justify-between gap-4 text-[12px]">
                    <span className="text-[#6B7280] shrink-0">
                      {isWalletProvider ? "رقم المحفظة" : "رقم الحساب"}
                    </span>

                    <span className="text-[#111827] font-medium break-words">
                      {getMaskedAccountNumber()}
                    </span>
                  </div>

                  <div className="transfer-info-row flex items-center justify-between gap-4 text-[12px]">
                    <span className="text-[#6B7280] shrink-0">IBAN</span>

                    <span className="text-[#111827] font-medium break-words">
                      {getMaskedIban()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="w-full rounded-[8px] border border-[#F5C77B] bg-[#FFF4DC] px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <h4 className="font-[Cairo] font-bold text-[13px] leading-[20px] text-[#7A4D00]">
                      ملاحظة الإدارة
                    </h4>

                    <span className="w-5 h-5 rounded-full bg-[#F5BD58] text-white flex items-center justify-center text-[12px] font-bold">
                      !
                    </span>
                  </div>

                  <p className="mt-2 font-[Cairo] text-[12px] leading-[22px] text-[#7A5B15]">
                    {adminNote}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowTransferModal(true)}
                  className="
                    w-full
                    h-[48px]
                    rounded-[8px]
                    bg-[#003469]
                    text-white
                    font-[Cairo] font-bold
                    text-[13px]
                    flex items-center justify-center gap-2
                    shadow-sm
                    hover:bg-[#002B57]
                    hover:shadow-md
                    hover:-translate-y-[1px]
                    active:translate-y-0
                    transition-all duration-200
                    cursor-pointer
                  "
                >
                  <span>تعديل بيانات التحويل</span>
                  <span className="text-[15px]">✎</span>
                </button>

                <p className="text-center font-[Cairo] text-[11px] leading-[18px] text-[#6B7280]">
                  بعد حفظ البيانات ستعود إلى حالة المراجعة.
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Approved State */}
        {isApproved && (
          <div className="p-4 sm:p-6">
            <div className="transfer-grid-3 grid grid-cols-3 gap-5 sm:gap-8 text-right">
              <div>
                <p className="font-[Cairo] text-[12px] leading-[18px] text-[#6B7280]">
                  اسم البنك / المحفظة
                </p>

                <div className="mt-1 flex items-center justify-end gap-2">
                  <h4 className="font-[Cairo] font-bold text-[14px] leading-[22px] text-[#111827] break-words">
                    {provider || "غير محدد"}
                  </h4>

                  <BsBank className="text-[#003469] text-[20px] shrink-0" />
                </div>
              </div>

              <div>
                <p className="font-[Cairo] text-[12px] leading-[18px] text-[#6B7280]">
                  صاحب الحساب
                </p>

                <h4 className="mt-1 font-[Cairo] font-bold text-[14px] leading-[22px] text-[#111827] break-words">
                  {accountHolder || "غير محدد"}
                </h4>
              </div>

              <div>
                <p className="font-[Cairo] text-[12px] leading-[18px] text-[#6B7280]">
                  {isWalletProvider
                    ? "رقم الهاتف المرتبط بالمحفظة"
                    : "رقم الحساب"}
                </p>

                <h4 className="mt-1 font-[Cairo] font-bold text-[14px] leading-[22px] text-[#111827] break-words">
                  {getMaskedAccountNumber()}
                </h4>
              </div>

              <div>
                <p className="font-[Cairo] text-[12px] leading-[18px] text-[#6B7280]">
                  رقم الآيبان IBAN
                </p>

                <h4 className="mt-1 font-[Cairo] font-bold text-[14px] leading-[22px] text-[#111827] break-words">
                  {getMaskedIban()}
                </h4>
              </div>

              <div>
                <p className="font-[Cairo] text-[12px] leading-[18px] text-[#6B7280]">
                  الفرع
                </p>

                <h4 className="mt-1 font-[Cairo] font-bold text-[14px] leading-[22px] text-[#111827] break-words">
                  {branchName || "غير محدد"}
                </h4>
              </div>
            </div>

            <div
              className="
                transfer-alert
                mt-6
                rounded-[8px]
                bg-[#EFFFFF]
                border border-[#9EE8E8]
                px-3 sm:px-4
                py-3
                flex
                items-center justify-center
                gap-2
                text-[#018B8F]
              "
            >
              <MdCheckCircle className="text-[18px] shrink-0" />

              <p className="font-[Cairo] text-[12px] leading-[20px] text-center">
                تم اعتماد بيانات التحويل الخاصة بك ويمكن استخدامها للدفعات
                المستقبلية.
              </p>
            </div>
          </div>
        )}
      </section>{" "}
      {/* Modal */}
      {showTransferModal && (
        <div
          className="
            transfer-modal-wrapper
            fixed inset-0 z-[999]
            bg-black/55
            flex items-center justify-center
            px-3 sm:px-4
            py-4
            overflow-hidden
          "
        >
          <div
            dir="rtl"
            className="
              transfer-modal
              w-full
              max-w-[700px]
              bg-white
              rounded-[8px]
              shadow-2xl
              overflow-visible
              font-[Cairo]
            "
          >
            {/* Modal Header */}
            <div
              dir="ltr"
              className="
                min-h-[56px]
                border-b border-[#E5E7EB]
                px-6
                py-3
                flex
                items-center
                justify-between
                gap-3
              "
            >
              <h3
                dir="rtl"
                className="
                  font-[Cairo]
                  font-bold
                  text-[18px]
                  leading-[24px]
                  text-[#003469]
                  text-left
                  whitespace-nowrap
                "
              >
                {modalTitle}
              </h3>

              <button
                type="button"
                onClick={() => setShowTransferModal(false)}
                className="
                  w-8 h-8
                  flex items-center justify-center
                  text-[#111827]
                  hover:bg-gray-100
                  rounded-md
                  transition
                  cursor-pointer
                  shrink-0
                  text-[18px]
                "
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-7 py-4 space-y-3">
              {/* اسم البنك أو المحفظة */}
              <div>
                <label className="block text-right text-[14px] font-bold text-[#003469] mb-2">
                  اسم البنك أو المحفظة
                </label>

                <div className="relative">
                  <select
                    dir="rtl"
                    value={provider}
                    onChange={handleProviderChange}
                    required
                    className="
                      w-full h-[40px]
                      rounded-[6px]
                      border border-[#D0D5DD]
                      bg-white
                      pr-11 pl-10
                      text-right
                      text-[13px] text-[#6B7280]
                      outline-none
                      focus:border-[#003469]
                      appearance-none
                      cursor-pointer
                    "
                  >
                    <option value="" disabled>
                      اختر البنك أو المحفظة
                    </option>

                    {providerOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <BsBank className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-[18px]" />

                  <MdKeyboardArrowDown className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-[18px] pointer-events-none" />
                </div>
              </div>

              {/* اسم صاحب الحساب */}
              <div>
                <label className="block text-right text-[14px] font-bold text-[#003469] mb-2">
                  اسم صاحب الحساب
                </label>

                <div className="relative">
                  <input
                    type="text"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    placeholder="أدخل الاسم الرباعي كما هو مسجل"
                    required
                    className="
                      w-full h-[40px]
                      rounded-[6px]
                      border border-[#D0D5DD]
                      bg-white
                      pr-10 pl-4
                      text-[13px]
                      text-right
                      outline-none
                      focus:border-[#003469]
                    "
                  />

                  <MdOutlinePerson className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-[17px]" />
                </div>
              </div>

              {/* رقم الحساب + IBAN */}
              <div className="transfer-form-grid grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-right text-[14px] font-bold text-[#003469] mb-2">
                    {isWalletProvider
                      ? "رقم الهاتف المرتبط بالمحفظة"
                      : "رقم الحساب"}
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={handleAccountNumberChange}
                      placeholder={
                        isWalletProvider ? "مثال: 0591234567" : "رقم الحساب"
                      }
                      required
                      className={`
                        w-full h-[40px]
                        rounded-[6px]
                        border
                        ${accountError ? "border-red-500" : "border-[#D0D5DD]"}
                        bg-white
                        pr-10 pl-4
                        text-[13px]
                        text-right
                        outline-none
                        focus:border-[#003469]
                      `}
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-[15px] font-bold">
                      #
                    </span>
                  </div>

                  {isWalletProvider && (
                    <p className="mt-1 text-right text-[11px] leading-[16px] text-[#6B7280]">
                      أدخل رقم جوال فلسطيني من 10 أرقام يبدأ بـ 059 أو 056.
                    </p>
                  )}

                  {accountError && (
                    <p className="mt-1 text-right text-[11px] leading-[16px] text-red-600">
                      {accountError}
                    </p>
                  )}
                </div>

                {/* IBAN لا يختفي عند اختيار محفظة */}
                <div>
                  <label className="block text-right text-[14px] font-bold text-[#003469] mb-2">
                    IBAN
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      dir="ltr"
                      value={iban}
                      onChange={(e) => setIban(e.target.value)}
                      placeholder="PS00 0000 0000..."
                      required
                      className="
                        w-full h-[40px]
                        rounded-[6px]
                        border border-[#D0D5DD]
                        bg-white
                        pr-10 pl-4
                        text-[13px]
                        text-left
                        outline-none
                        focus:border-[#003469]
                      "
                    />

                    <MdCreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-[17px]" />
                  </div>
                </div>
              </div>

              {/* اسم الفرع لا يختفي عند اختيار محفظة */}
              <div>
                <label className="block text-right text-[14px] font-bold text-[#003469] mb-2">
                  اسم الفرع
                </label>

                <div className="relative">
                  <input
                    type="text"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    placeholder="مثال: فرع الرمال"
                    required
                    className="
                      w-full h-[40px]
                      rounded-[6px]
                      border border-[#D0D5DD]
                      bg-white
                      pr-10 pl-4
                      text-[13px]
                      text-right
                      outline-none
                      focus:border-[#003469]
                    "
                  />

                  <MdOutlineLocationOn className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-[17px]" />
                </div>
              </div>

              {/* Buttons */}
              <div className="transfer-buttons pt-3 border-t border-[#E5E7EB] flex flex-row items-center justify-start gap-3">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="
                    h-[38px]
                    px-9
                    rounded-[6px]
                    border border-[#D0D5DD]
                    bg-white
                    text-[#111827]
                    text-[13px]
                    font-bold
                    hover:bg-gray-50
                    transition
                    cursor-pointer
                  "
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="
                    h-[38px]
                    px-10
                    rounded-[6px]
                    bg-[#003469]
                    text-white
                    text-[13px]
                    font-bold
                    hover:bg-[#002B57]
                    transition
                    cursor-pointer
                  "
                >
                  إرسال للمراجعة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TransferDataSection;
