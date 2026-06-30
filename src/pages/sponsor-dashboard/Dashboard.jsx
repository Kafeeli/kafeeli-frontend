import React, { useState } from 'react'
import Sidebar from './Sidebar'
import {
  FaBell,
  FaHandHoldingHeart,
  FaSmile,
  FaCalendarCheck,
  FaAward,
  FaEnvelope,
  FaUserTie
} from 'react-icons/fa'
import { FiAlertTriangle, FiAlignJustify } from 'react-icons/fi'
import { FaBriefcase, FaShieldAlt } from 'react-icons/fa'
import { FiEye } from 'react-icons/fi'

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // بيانات الحساب - لاحقاً رح تجي من API بدل ما تكون ثابتة هون
  const [accountData] = useState({
    emailVerified: true,      // true = موثّق / false = غير موثق
    accountStatus: 'active',  // 'active' = نشط / 'suspended' = موقوف
    accountType: 'كفيل'
  })

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">

      <Sidebar
        activePath="/main"
        isOpen={isSidebarOpen}
        onClose={function () { setIsSidebarOpen(false) }}
      />

      <div className="flex-1 flex flex-col overflow-auto">

        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* زر القائمة بالموبايل */}
            <button
              onClick={function () { setIsSidebarOpen(true) }}
              className="lg:hidden p-2 text-gray-600 hover:text-[#1e3a5f]"
            >
              <FiAlignJustify className="text-xl" />
            </button>
            <p className="hidden sm:block text-sm text-gray-600">
              مرحباً، <span className="font-bold text-[#1e3a5f]">محمد أحمد</span> أهلاً بك في لوحة تحكم الكفيل في <span className="font-bold text-[#1e3a5f]">كفيلي</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
          <button className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#003469] hover:bg-gray-100 transition">
            <FaBell />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
          </button>
            

            <div className="text-right">
              <p className="text-sm font-bold text-[#003469]">محمد أحمد</p>
              <p className="text-xs text-gray-500">كفيل معتمد</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden">
                          <FaUserTie className="text-gray-500 text-lg" />
                        </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 space-y-4">

          {/* تنبيه */}
          <div className="bg-[rgba(255,251,235,1)] border border-[rgba(253,230,138,1)] rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 text-[rgba(146,64,14,1)] text-sm">
              <FiAlertTriangle className="text-[rgba(217,119,6,1)] text-lg flex-shrink-0" />
              <span>يرجى تأكيد بريدك الإلكتروني حتى تتمكن من استخدام جميع مزايا المنصة</span>
            </div>
            <button className="bg-yellow-500 text-white text-sm px-4 py-1.5 rounded-lg font-bold hover:bg-yellow-600 whitespace-nowrap w-full sm:w-auto">
              تأكيد الآن
            </button>
          </div>

          {/* حالة الحساب */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* حالة البريد */}
            <div className="bg-white rounded-xl border border-gray-300 p-6 flex items-center justify-start gap-3 hover:shadow-md hover:border-gray-400 transition cursor-pointer">
              <div className={'w-14 h-14 rounded-4xl flex items-center justify-center ' + (accountData.emailVerified ? 'bg-green-50' : 'bg-red-50')}>
                <FaEnvelope className={(accountData.emailVerified ? 'text-green-500' : 'text-red-500') + ' text-2xl'} />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-2">حالة البريد</p>
                <p className={'text-base font-bold ' + (accountData.emailVerified ? 'text-green-500' : 'text-red-500')}>
                  {accountData.emailVerified ? 'موثّق' : 'غير موثق'}
                </p>
              </div>
            </div>

            {/* حالة الحساب */}
            <div className="bg-white rounded-xl border border-gray-300 p-6 flex items-center justify-start gap-3 hover:shadow-md hover:border-gray-400 transition cursor-pointer">
              <div className={'w-14 h-14 rounded-4xl flex items-center justify-center ' + (accountData.accountStatus === 'active' ? 'bg-blue-50' : 'bg-red-50')}>
                <FaShieldAlt className={(accountData.accountStatus === 'active' ? 'text-blue-500' : 'text-red-500') + ' text-2xl'} />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-2">حالة الحساب</p>
                <p className={'text-base font-bold ' + (accountData.accountStatus === 'active' ? 'text-black' : 'text-red-500')}>
                  {accountData.accountStatus === 'active' ? 'نشط' : 'موقوف'}
                </p>
              </div>
            </div>

            {/* نوع الحساب */}
            <div className="bg-white rounded-xl border border-gray-300 p-6 flex items-center justify-start gap-3 hover:shadow-md hover:border-gray-400 transition cursor-pointer">
              <div className="w-14 h-14 bg-[rgba(217,164,65,0.1)] rounded-4xl flex items-center justify-center">
                <FaBriefcase className="text-[rgba(217,164,65,1)] text-2xl" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-2">نوع الحساب</p>
                <p className="text-base font-bold text-yellow-500">{accountData.accountType}</p>
              </div>
            </div>

          </div>

          {/* إحصائيات */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[rgba(45,188,195,0.05)] rounded-xl border border-[rgba(194,198,210,1)] p-6 flex flex-col justify-between" style={{ minHeight: '150px' }}>
              <div className="flex items-center justify-between">
                <FaSmile className="text-blue-400 text-2xl" />
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">+2 جديد</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1e3a5f] text-right">4</p>
                <p className="text-xs text-gray-500 text-right">أيتام مكفولين</p>
              </div>
            </div>

            <div className="bg-[rgba(45,188,195,0.05)] rounded-xl border border-[rgba(194,198,210,1)] p-6 flex flex-col justify-between" style={{ minHeight: '150px' }}>
              <FaCalendarCheck className="text-blue-500 text-2xl" />
              <div>
                <p className="text-2xl font-bold text-[#1e3a5f]">1</p>
                <p className="text-xs text-gray-500">رعايات قيد الدفع</p>
              </div>
            </div>

            <div className="bg-[rgba(45,188,195,0.05)] rounded-xl border border-[rgba(194,198,210,1)] p-6 flex flex-col justify-between" style={{ minHeight: '150px' }}>
              <FaAward className="text-yellow-500 text-2xl" />
              <div>
                <p className="text-2xl font-bold text-yellow-500">3</p>
                <p className="text-xs text-gray-500">عدد الشهادات</p>
              </div>
            </div>

            <div className="bg-[rgba(45,188,195,0.05)] rounded-xl border border-[rgba(194,198,210,1)] p-6 flex flex-col justify-between" style={{ minHeight: '150px' }}>
              <FaHandHoldingHeart className="text-[#1e3a5f] text-2xl" />
              <div>
                <p className="text-2xl font-bold text-[#1e3a5f]">12</p>
                <p className="text-xs text-gray-500">حالات متاحة</p>
              </div>
            </div>
          </div>

          {/* رعاياتي النشطة */}
          <div
            dir="rtl"
            className="bg-white overflow-hidden"
            style={{
              borderRadius: '12px',
              border: '1px solid #C2C6D2',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-sm font-bold text-gray-800">رعاياتي النشطة</p>
              <p className="text-sm font-medium text-[#0F7F8C] cursor-pointer hover:underline">
                عرض الكل
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F5F6F8] text-gray-600 text-xs">
                    <th className="px-4 py-3 font-medium text-right whitespace-nowrap">
                      المستفيد
                    </th>
                    <th className="px-4 py-3 font-medium text-right whitespace-nowrap">
                      نوع الكفالة
                    </th>
                    <th className="px-4 py-3 font-medium text-right whitespace-nowrap">
                      حالة الكفالة
                    </th>
                    <th className="px-4 py-3 font-medium text-right whitespace-nowrap">
                      بدء الكفالة
                    </th>
                    <th className="px-4 py-3 font-medium text-right whitespace-nowrap">
                      الدفعة التالية
                    </th>
                    <th className="px-4 py-3 font-medium text-right whitespace-nowrap">
                      الإجراء
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    {
                      name: 'محمد',
                      type: 'يتيم',
                      status: 'نشطة',
                      start: '2/2/2026',
                      next: '2/3/2026',
                      avatar: 'م'
                    },
                    {
                      name: 'أبو محمد',
                      type: 'عائلة',
                      status: 'نشطة',
                      start: '2/2/2026',
                      next: '2/3/2026',
                      avatar: 'أ'
                    }
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#EAF6FA] text-[#1E3A5F] flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {row.avatar}
                          </div>
                          <span className="font-bold text-gray-800">
                            {row.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-gray-600 text-right whitespace-nowrap">
                        {row.type}
                      </td>

                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <span className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xs font-medium px-3 py-1">
                          {row.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-gray-600 text-right whitespace-nowrap">
                        {row.start}
                      </td>

                      <td className="px-4 py-3 text-gray-600 text-right whitespace-nowrap">
                        {row.next}
                      </td>

                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button className="inline-flex items-center gap-1 text-[#0F7F8C] text-xs font-bold hover:underline">
                          التفاصيل
                          <FiEye className="text-sm" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default Dashboard