import React, { useState } from 'react'
import Sidebar from './Sidebar'

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaVenusMars,
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarAlt,
  FaBell,
  FaEdit,
  FaSave,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaShieldAlt,
  FaKey,
  FaStar,
  FaInfoCircle,
  FaUserTie
} from 'react-icons/fa'

import { FiMenu } from 'react-icons/fi'

const initialProfileData = {
  displayName: 'أحمد العلي',
  fullName: 'أحمد بن فهد العلي',
  email: 'ahmed.alali@example.com',
  phone: '+965 9876 5432',
  gender: 'ذكر',
  country: 'الكويت',
  city: 'مدينة الكويت',
  birthDate: '05/15/1985',
  role: 'كفيل',
  accountStatus: 'نشط',
  emailStatus: 'موثق',
  joinDate: '12 يناير 2022',
  sponsoredChildren: 5
}

function TopNavbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="h-14 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-[#003469] hover:bg-gray-100 transition"
            aria-label="فتح القائمة"
          >
            <FiMenu className="text-xl" />
          </button>

          <h1 className="text-sm sm:text-base font-bold text-[#003469]">
            ملفي الشخصي
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#003469] hover:bg-gray-100 transition">
            <FaBell />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
          </button>

          <div className="hidden sm:flex items-center gap-3">
            <div className="text-right leading-tight">
              <p className="text-sm font-bold text-[#003469]">
                أحمد العلي
              </p>
              <p className="text-xs text-gray-500">
                كفيل معتمد
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden">
              <FaUserTie className="text-gray-500 text-lg" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function ProfileSummaryCard({ data }) {
  return (
    <div className="w-full max-w-[309px] h-[467px] mx-auto bg-white rounded-xl border border-[#C2C6D2] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-md transition overflow-hidden">
      <div className="h-[120px] bg-gradient-to-l from-[#003469] to-[#008b8b]" />

      <div className="-mt-16 px-5 pb-5 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-white border-[5px] border-white shadow-lg flex items-center justify-center overflow-hidden">
          {data.avatar ? (
            <img
              src={data.avatar}
              alt={data.displayName}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
              <FaUserTie className="text-4xl text-gray-500" />
            </div>
          )}
        </div>

        <h2 className="mt-8 text-xl font-bold text-[#003469]">
          {data.displayName}
        </h2>

        <p className="mt-5 text-sm text-gray-600 leading-7">
          عضو في كفيلي منذ عامين، ساهم في كفالة
          <br />
          {data.sponsoredChildren} أطفال
        </p>

        <div className="mt-6 w-full space-y-4">
          <div className="flex items-center justify-center gap-9">
            <span className="text-sm text-gray-600">
              حالة الحساب:
            </span>

            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#73F2F9] text-[#006E72] text-sm font-bold shadow-sm hover:shadow-md transition">
              <FaCheckCircle className="text-[#007b83] text-sm" />
              نشط
            </span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-gray-600">
              البريد الإلكتروني:
            </span>

            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D5E3FF] text-[#024689] text-sm font-bold shadow-sm hover:shadow-md transition">
              <FaShieldAlt className="text-[#0050a8] text-sm" />
              موثق
            </span>
          </div>

          <div className="flex items-center justify-center pt-1">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5BD5833]/20 text-[#EAB34F] text-sm font-bold shadow-sm hover:shadow-md transition">
              <span className="w-7 h-7 rounded-full border-2 border-[#5b3a00] flex items-center justify-center">
                <FaStar className="text-[#483100] text-xs" />
              </span>
              تاريخ الانضمام: {data.joinDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SecurityCard() {
  return (
    <div className="h-full min-h-[240px] bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition p-6 text-center flex flex-col justify-center">
      <div className="flex items-center justify-center gap-2 text-[#003469] mb-4">
        <FaShieldAlt className="text-lg" />
        <h3 className="font-bold text-base">
          أمن الحساب
        </h3>
      </div>

      <p className="text-sm text-gray-600 leading-7 mb-5">
        تغيير كلمة المرور
        <br />
        يُنصح بتغيير كلمة المرور كل 3 أشهر لضمان أقصى درجات الأمان.
      </p>

      <button className="w-full h-11 rounded-lg border-2 border-[#003469] text-[#003469] font-bold text-sm hover:bg-[#003469] hover:text-white transition shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer">
        <FaKey />
        تحديث كلمة المرور
      </button>
    </div>
  )
}

function FormField({
  label,
  name,
  value,
  icon,
  type = 'text',
  readOnly = false,
  hint,
  isEditing,
  onChange
}) {
  const canEdit = isEditing && !readOnly

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-[#003469]">
        {label}

        {readOnly && (
          <span className="mr-1 text-xs font-normal text-gray-500">
            (غير قابل للتعديل)
          </span>
        )}
      </label>

      <div
        className={[
          'h-11 rounded-lg border px-3 flex items-center gap-3 transition shadow-sm',
          canEdit
            ? 'bg-white border-gray-300 hover:border-[#003469] focus-within:border-[#003469] focus-within:ring-2 focus-within:ring-[#003469]/10'
            : 'bg-gray-50 border-gray-300 text-gray-500'
        ].join(' ')}
      >
        <span className={canEdit ? 'text-[#003469]' : 'text-gray-500'}>
          {icon}
        </span>

        <input
          name={name}
          type={type}
          value={value}
          readOnly={!canEdit}
          onChange={onChange}
          dir={type === 'email' || type === 'tel' ? 'ltr' : 'rtl'}
          className={[
            'w-full bg-transparent outline-none text-sm text-right',
            canEdit ? 'text-gray-800' : 'text-gray-500 cursor-default'
          ].join(' ')}
        />
      </div>

      {hint && (
        <p className="text-xs text-cyan-700 leading-5">
          {hint}
        </p>
      )}
    </div>
  )
}

function EditProfileSection({
  formData,
  isEditing,
  onChange,
  onEdit,
  onSave,
  onCancel
}) {
  return (
    <div className="h-full bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition overflow-hidden">
      <div className="px-5 sm:px-7 py-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#003469]">
            تعديل البيانات الشخصية
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            نموذج تعديل يحتوي على الحقول المسموح تعديلها فقط، مع توضيح الحقول المرتبطة بالحساب الأساسي.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onEdit}
            disabled={isEditing}
            className={[
              'h-11 px-5 rounded-lg font-bold text-sm transition shadow-sm hover:shadow-md flex items-center justify-center gap-2',
              isEditing
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#003469] text-white hover:bg-[#004b8f] cursor-pointer'
            ].join(' ')}
          >
            <FaEdit />
            تعديل البيانات
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="mb-6 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 flex items-start gap-3 text-cyan-800 shadow-sm">
          <FaInfoCircle className="mt-1 shrink-0" />
          <p className="text-sm leading-6">
            الاسم الكامل والبريد الإلكتروني مرتبطان بالحساب الأساسي وقد لا يكونان قابلين للتعديل من هذه الصفحة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            label="الاسم الكامل"
            name="fullName"
            value={formData.fullName}
            icon={<FaUser />}
            readOnly
            isEditing={isEditing}
            onChange={onChange}
          />

          <FormField
            label="البريد الإلكتروني"
            name="email"
            value={formData.email}
            icon={<FaEnvelope />}
            type="email"
            readOnly
            isEditing={isEditing}
            onChange={onChange}
          />

          <FormField
            label="رقم الهاتف"
            name="phone"
            value={formData.phone}
            icon={<FaPhoneAlt />}
            type="tel"
            hint="تأكد من صحة الرقم لتلقي تحديثات الكفالة."
            isEditing={isEditing}
            onChange={onChange}
          />

          <FormField
            label="الجنس"
            name="gender"
            value={formData.gender}
            icon={<FaVenusMars />}
            isEditing={isEditing}
            onChange={onChange}
          />

          <FormField
            label="الدولة"
            name="country"
            value={formData.country}
            icon={<FaGlobe />}
            isEditing={isEditing}
            onChange={onChange}
          />

          <FormField
            label="المدينة"
            name="city"
            value={formData.city}
            icon={<FaMapMarkerAlt />}
            isEditing={isEditing}
            onChange={onChange}
          />

          <div className="md:col-span-2">
            <FormField
              label="تاريخ الميلاد"
              name="birthDate"
              value={formData.birthDate}
              icon={<FaCalendarAlt />}
              isEditing={isEditing}
              onChange={onChange}
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 flex items-start gap-3 text-orange-800 shadow-sm">
            <FaExclamationCircle className="mt-1 shrink-0" />
            <p className="text-sm leading-6">
              بعد حفظ التعديلات، سيتم تدقيق البيانات المحدثة من قبل فريق المنصة لضمان دقة معلومات الكفالة.
            </p>
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-gray-200 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={onCancel}
            disabled={!isEditing}
            className={[
              'h-11 px-8 rounded-lg font-bold text-sm transition shadow-sm hover:shadow-md flex items-center justify-center gap-2',
              isEditing
                ? 'border border-gray-400 text-gray-700 hover:bg-gray-100 cursor-pointer'
                : 'border border-gray-200 text-gray-400 cursor-not-allowed'
            ].join(' ')}
          >
            <FaTimes />
            إلغاء
          </button>

          <button
            onClick={onSave}
            disabled={!isEditing}
            className={[
              'h-11 px-8 rounded-lg font-bold text-sm transition shadow-sm hover:shadow-md flex items-center justify-center gap-2',
              isEditing
                ? 'bg-[#003469] text-white hover:bg-[#004b8f] cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            ].join(' ')}
          >
            <FaSave />
            حفظ التعديلات
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(initialProfileData)

  function handleChange(e) {
    const { name, value } = e.target

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  function handleEdit() {
    setIsEditing(true)
  }

  function handleSave() {
    setIsEditing(false)
  }

  function handleCancel() {
    setFormData(initialProfileData)
    setIsEditing(false)
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#f4f6f9]">
      <div className="flex min-h-screen">
        <Sidebar
          activePath="/profile"
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 min-w-0 flex flex-col">
          <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 p-4 sm:p-5 lg:p-6">
            <div
              dir="rtl"
              className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-5 lg:gap-6"
            >
              <aside className="w-full lg:w-[300px] xl:w-[320px] shrink-0 flex flex-col gap-5 self-stretch">
                <ProfileSummaryCard data={formData} />

                <div className="flex-1">
                  <SecurityCard />
                </div>
              </aside>

              <section className="flex-1 min-w-0 self-stretch">
                <EditProfileSection
                  formData={formData}
                  isEditing={isEditing}
                  onChange={handleChange}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </section>
            </div>
          </main>
           <footer className="mt-20 py-2 border-t border-[#E5E7EB] text-center">
            <p className="text-sm text-[#6B7280] mt-4">
              © 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}