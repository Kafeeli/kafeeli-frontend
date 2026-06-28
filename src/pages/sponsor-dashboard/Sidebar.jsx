import React, { useState, useEffect } from 'react'
import { FiAlignJustify, FiLogOut } from 'react-icons/fi'
import { IoCloseSharp } from 'react-icons/io5'
import {
  FaThLarge,
  FaIdCard,
  FaHandHoldingHeart,
  FaUsers,
  FaSmile,
  FaLayerGroup,
  FaAward,
  FaBell,
  FaCog,
  FaSync
} from 'react-icons/fa'
import logo from '../../assets/title.png'

const ICONS = {
  dashboard: <FaThLarge />,
  profile: <FaIdCard />,
  orphans: <FaSmile />,
  families: <FaUsers />,
  mycare: <FaHandHoldingHeart />,
  payments: <FaLayerGroup />,
  certificates: <FaAward />,
  notifications: <FaSync />,
  alerts: <FaBell />,
  settings: <FaCog />,
}

function getIcon(name) {
  return ICONS[name] || null
}

const menuItems = [
  { icon: 'dashboard', label: 'الرئيسية', path: '/' },
  { icon: 'profile', label: 'ملفي الشخصي', path: '/profile' },
  { icon: 'orphans', label: 'تصفح الأيتام', path: '/orphans' },
  { icon: 'families', label: 'تصفح العائلات', path: '/families' },
  { icon: 'mycare', label: 'رعايتي', path: '/my-care' },
  { icon: 'payments', label: 'المدفوعات', path: '/payments' },
  { icon: 'certificates', label: 'الشهادات', path: '/certificates' },
  { icon: 'notifications', label: 'التحديثات', path: '/updates' },
  { icon: 'alerts', label: 'الإشعارات', path: '/alerts' },
  { icon: 'settings', label: 'الإعدادات', path: '/settings' },
]

function MenuList({ items, activePath, activeClass, inactiveClass, onItemClick }) {
  return (
  <nav className="flex-1 px-3 py-2">
    {items.map(function (item, index) {
      var isActive = item.path === activePath;
      var cls = isActive ? activeClass : inactiveClass;
      return (
        <a
          key={index}
          href={item.path}
          className={cls}
          onClick={onItemClick}
        >
          <span className="text-base">{getIcon(item.icon)}</span>
          <span>{item.label}</span>
        </a>
      );
    })}
  </nav>
);
}

/**
 * isOpen / onClose: ممرّرين من الأب (Dashboard) عشان نقدر نتحكم بفتح القائمة
 * من زر داخل الـ navbar نفسه (يمين الشاشة بالموبايل) بدل زر عائم منفصل
 */
function Sidebar({ activePath = '/', isOpen, onClose }) {

  useEffect(function () {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return function () {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const desktopActiveClass =
    'flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 bg-[#00d4ff] text-[#1e3a5f] font-bold text-sm'
  const desktopInactiveClass =
    'flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 hover:bg-white/10 text-gray-200 text-sm'

  const mobileActiveClass =
    'flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 bg-cyan-300 text-[#1e3a5f] font-bold text-sm'
  const mobileInactiveClass =
    'flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 hover:bg-gray-100 text-gray-700 text-sm'

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* نسخة الديسكتوب - sticky بدل min-h-screen عشان يضل ثابت أثناء السكرول */}
      <aside className="hidden lg:flex w-64 bg-[rgba(0,52,105,1)] sticky top-0 h-screen flex-col text-white flex-shrink-0">
        <div className="p-4 text-center border-b border-white/10">
          <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center overflow-hidden">
  <img src="/src/assets/title.png" alt="كفيلي" className="w-20 h-20 object-contain mt-3" />
</div>
          <h2 className="text-lg font-bold">كفيلي</h2>
          <p className="text-xs text-gray-300">منصة الكفالة الإنسانية</p>
        </div>

        <MenuList
          items={menuItems}
          activePath={activePath}
          activeClass={desktopActiveClass}
          inactiveClass={desktopInactiveClass}
        />

        <div className="px-3 py-3 border-t border-white/10">
          <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg">
            <FiLogOut className="text-base" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

     {/* نسخة الموبايل (drawer) - بنفس ألوان نسخة الديسكتوب */}
<aside
  className={
    'fixed top-0 right-0 h-full w-80 bg-[rgba(0,52,105,1)] z-50 transform transition-transform duration-300 lg:hidden flex flex-col text-white ' +
    (isOpen ? 'translate-x-0' : 'translate-x-full')
  }
>
  <button
    onClick={onClose}
    className="absolute top-4 left-4 text-gray-300 hover:text-white z-10"
  >
    <IoCloseSharp />
  </button>

  <div className="p-4 text-center border-b border-white/10">
    <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center overflow-hidden">
      <img src="/src/assets/title.png" alt="كفيلي" className="w-20 h-20 object-contain mt-3" />
    </div>
    <h2 className="text-lg font-bold">كفيلي</h2>
    <p className="text-xs text-gray-300">منصة الكفالة الإنسانية</p>
  </div>

  <MenuList
    items={menuItems}
    activePath={activePath}
    activeClass={desktopActiveClass}
    inactiveClass={desktopInactiveClass}
    onItemClick={onClose}
  />

  <div className="px-3 py-3 border-t border-white/10">
    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg">
      <FiLogOut className="text-base" />
      <span>تسجيل الخروج</span>
    </button>
  </div>
</aside>
    </div>
  )
}

export default Sidebar