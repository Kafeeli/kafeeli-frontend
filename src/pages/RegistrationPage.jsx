import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa'
import logo from '../assets/kafeeli-logo.png'
import guardianIcon from '../assets/guardian-icon.png'
import sponsorIcon from '../assets/sponsor-icon.png'
import sideIcon from '../assets/side-icon.png'
import checkIcon from '../assets/check-icon.png'
import reportIcon from '../assets/report-icon.png'

export default function RegistrationPage() {
  const [selected, setSelected] = useState(null)

  const roles = [
    { id: 'guardian', title: 'وصي / مسؤول', desc: 'أقوم بإدارة معلومات الأيتام أو الأسر', icon: guardianIcon  },
    { id: 'sponsor', title: 'كفيل / متبرع', desc: 'أريد دعم الأيتام أو الأسر', icon: sponsorIcon }
  ]
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  return (
    <>
    {/* header design */}
    <header className="flex items-center justify-between px-8 py-4 bg-gray-50 shadow-sm">
      <a href=""><img src={logo} alt="logo"  /></a>
      <h1 className="text-[24px] font-bold text-[#003469] hidden md:block">كفيلي</h1>
      <a href="/"><p className="text-navy-800 font-medium md:text[16px]">تسجيل دخول </p></a>
    </header>
   
    <main>
    {/* hero design */}
    <section id='hero' className="mx-auto max-w-lg text-center mb-2 mt-10 ">
      <p className="text-[#0D4B8E] text-2xl mb-2 font-bold md:text-4xl">إنشاء حساب جديد</p>
      <p className="text-[#191C20]">انضم إلى مجتمع كفيلي للمساهمة في رعاية وتمكين الأيتام في فلسطين وتوفير
        حياة كريمة لهم.</p>
    </section>
        
    <section className='w-[80%] mx-auto flex justify-center min-h-screen gap-5 mt-8'>
      <div id='Rdiv'>
        <div className="hidden lg:flex flex-col justify-center p-10 h-full rounded-r-lg gap-4" style={{backgroundColor: 'rgba(13, 75, 142, 1)'}}>
          <img src={sideIcon} alt="icon" className="w-12" />
          <h2 className="text-white text-3xl font-bold leading-loose text-right">
           خطوة واحدة لنصنع <br /> الفرق</h2>
           <p className="text-blue-200 text-sm leading-loose max-w-xs">من خلال تسجيلك، تفتح أبواب الأمل لآلاف الأطفال الذين ينتظرون يد العون.</p>
        <div className="flex items-center gap-2">
          <img src={checkIcon} alt="check" className="w-5 h-5" />
          <span className="text-blue-200 text-sm">تحقق أمني عالي</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={reportIcon} alt="report" className="w-5 h-5" />
          <span className="text-blue-200 text-sm">تقارير دورية شفافة</span>
        </div>
      </div>
      </div>

      <div id='Ldiv'>
        <div className="flex flex-col sm:flex-row gap-4 mx-auto max-w-lg w-full">
          {
          roles.map((role) => {
          const isSelected = selected === role.id
        return (
        <div
          key={role.id}onClick={() => setSelected(role.id)}
          className={`flex-1 rounded-xl p-5 cursor-pointer relative transition-all
          ${isSelected ? 'border-2 border-blue-600' : 'border border-gray-200 hover:border-blue-300'}`}>

          {isSelected && <FaCheckCircle className="absolute top-3 left-3 text-blue-600 text-xl" />}
        <div className="flex items-center gap-2 mb-2">
            <img src={role.icon} alt={role.title} />
            <span className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
            {role.title}
            </span>
        </div>
          <p className="text-sm text-gray-500">{role.desc}</p>
        </div>
        )
        })
        }
        </div>

        <hr className='mt-2 border-gray-200' />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-lg mt-6">

    {/* الاسم الأول */}
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 text-right">الاسم الأول</label>
      <input type="text" placeholder="محمد" className="border border-gray-200 rounded-lg p-2 text-right outline-none focus:border-blue-400" />
    </div>

    {/* اسم الأب */}
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 text-right">اسم الأب</label>
      <input type="text" placeholder="أحمد" className="border border-gray-200 rounded-lg p-2 text-right outline-none focus:border-blue-400" />
    </div>

    {/* اسم الجد */}
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 text-right">اسم الجد</label>
      <input type="text" placeholder="محمود" className="border border-gray-200 rounded-lg p-2 text-right outline-none focus:border-blue-400" />
    </div>

    {/* اسم العائلة */}
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 text-right">اسم العائلة</label>
      <input type="text" placeholder="الأسعد" className="border border-gray-200 rounded-lg p-2 text-right outline-none focus:border-blue-400" />
    </div>

    {/* البريد الإلكتروني */}
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 text-right">البريد الإلكتروني</label>
      <input type="email" placeholder="example@mail.com" className="border border-gray-200 rounded-lg p-2 text-right outline-none focus:border-blue-400" />
    </div>

    {/* رقم الهاتف */}
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 text-right">رقم الهاتف (يبدأ بـ 970+)</label>
      <input type="tel" placeholder="+970" className="border border-gray-200 rounded-lg p-2 text-right outline-none focus:border-blue-400" />
    </div>

    {/* الدولة والمدينة والجنس */}
    <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600 text-right h-10">الدولة</label>
        <input type="text" value="فلسطين" disabled className="w-full border border-gray-200 rounded-lg p-2 text-right bg-gray-100 text-gray-500 h-12" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600 text-right h-10">المدينة (قطاع غزة)</label>
        <select className="w-full border border-gray-200 rounded-lg p-2 text-right outline-none focus:border-blue-400">
          <option hidden>اختر المدينة</option>
          <option>غزة</option>
          <option>خان يونس</option>
          <option>بيت لاهيا</option>
          <option>بيت حانون</option>
          <option>نصيرات</option>
          <option>دير البلح</option>
          <option>رفح</option>
          <option>جباليا</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600 text-right h-10">الجنس</label>
        <select className="w-full border border-gray-200 rounded-lg p-2 text-right outline-none focus:border-blue-400">
          <option hidden>اختر</option>
          <option>ذكر</option>
          <option>أنثى</option>
        </select>
      </div>
    </div>

    {/* تاريخ الميلاد */}
    <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
      <label className="text-sm text-gray-600 text-right">تاريخ الميلاد</label>
      <input type="date" className="border border-gray-200 rounded-lg p-2 text-right outline-none focus:border-blue-400" />
    </div>

  </div>

        <hr className='mt-2 border-gray-200' />

  {/* كلمة المرور */}
  <div className="flex flex-col gap-1 max-w-lg mx-auto w-full mt-4">
    <label className="text-sm text-gray-600 text-right">كلمة المرور</label>
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-200 rounded-lg p-2 text-right outline-none focus:border-blue-400"
      />
      <span onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-3 cursor-pointer text-gray-400">
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
    <div className="bg-gray-50 rounded-lg p-3 mt-1">
      <p className="text-sm font-bold text-blue-800 text-right mb-2">متطلبات كلمة المرور:</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {[
          { label: '8 أحرف على الأقل', test: password.length >= 8 },
          { label: 'أحرف كبيرة (A-Z)', test: /[A-Z]/.test(password) },
          { label: 'أحرف صغيرة (a-z)', test: /[a-z]/.test(password) },
          { label: 'أرقام أو رموز خاصة', test: /[0-9!@#$%^&*]/.test(password) },
        ].map((req, i) => (
          <div key={i} className="flex items-center gap-2">
            {req.test
              ? <FaCheckCircle className="text-blue-600 text-sm" />
              : <span className="w-3 h-3 rounded-full border border-gray-400 inline-block"></span>
            }
            <span className="text-sm text-gray-600">{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* تأكيد كلمة المرور */}
  <div className="flex flex-col gap-1 max-w-lg mx-auto w-full mt-4">
    <label className="text-sm text-gray-600 text-right">تأكيد كلمة المرور</label>
    <div className="relative">
      <input
        type={showConfirm ? 'text' : 'password'}
        className="w-full border border-gray-200 rounded-lg p-2 text-right outline-none focus:border-blue-400"
      />
      <span onClick={() => setShowConfirm(!showConfirm)} className="absolute left-3 top-3 cursor-pointer text-gray-400">
        {showConfirm ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  </div>

  {/* زر إنشاء حساب */}
 <div className="mt-4 max-w-lg mx-auto w-full">
  <button
    onClick={() => navigate("/verify-email")}
    className="w-full bg-[#0D4B8E] text-white rounded-lg p-3 font-bold flex items-center justify-center gap-2 shadow-[0_4px_6px_-4px_rgba(13,75,142,0.2),0_10px_15px_-3px_rgba(13,75,142,0.2)]">
    إنشاء حساب<FaArrowLeft />
  </button>
  <p className="text-center text-sm text-gray-500 mt-3">
    بنقرك على "إنشاء حساب"، أنت توافق على{' '}
    <a href="#" className="text-[#0D4B8E] font-bold">الشروط والأحكام</a>
    {' '}و{' '}
    <a href="#" className="text-[#0D4B8E] font-bold">سياسة الخصوصية</a>
  </p>
</div>

</div>
  </section>
    </main>
<footer dir="ltr" className="flex flex-col md:flex-row items-center justify-between px-8 py-4 border-t border-gray-200 gap-3 mt-10">
    <div className="flex gap-6 order-3 md:order-1">
      <a href="#" className="text-sm text-gray-500 hover:text-blue-700">اتصل بنا</a>
      <a href="#" className="text-sm text-gray-500 hover:text-blue-700">الشروط والأحكام</a>
      <a href="#" className="text-sm text-gray-500 hover:text-blue-700">سياسة الخصوصية</a>
    </div>
    <p className="text-sm text-gray-500 order-2 text-center">&copy; 2026 كفيلي - منصة رعاية الأيتام. جميع الحقوق محفوظة</p>
    <p className="text-lg font-bold text-blue-900 order-1 md:order-3">كفيلي</p>
</footer>
    
    </>
  )
}
