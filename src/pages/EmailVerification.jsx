import logo from "../assets/title.png";
import { useState, useEffect, useRef } from "react";
import {
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import emailImg from "../assets/email-verify.png";
import { authApi } from "../services/authApi";

export default function EmailVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const didVerifyRef = useRef(false);

  const emailFromState = location.state?.email || "";
  const emailFromUrl = searchParams.get("email") || "";
  const userIdFromUrl = searchParams.get("userId") || "";

  const tokenFromUrl =
    searchParams.get("token") ||
    searchParams.get("confirmationToken") ||
    searchParams.get("code") ||
    "";

  const initialEmail =
    emailFromState ||
    emailFromUrl ||
    localStorage.getItem("pendingVerificationEmail") ||
    "";

  const [email, setEmail] = useState(initialEmail);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  function decodeVerificationToken(rawToken) {
    if (!rawToken) return "";

    let token = rawToken.replace(/ /g, "+");

    try {
      token = decodeURIComponent(token);
    } catch {
      // التوكن ممكن يكون مفكوك مسبقًا من URLSearchParams
    }

    return token;
  }

  function getApiErrorMessage(error) {
    const data = error.response?.data;

    if (!data) {
      return error.message || "حدث خطأ في الاتصال بالخادم";
    }

    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors.join("\n");
    }

    if (data.errors && typeof data.errors === "object") {
      return Object.values(data.errors).flat().join("\n");
    }

    if (typeof data.errors === "string") {
      return data.errors;
    }

    if (data.message) {
      return data.message;
    }

    if (data.title) {
      return data.title;
    }

    return "حدث خطأ، حاول مرة أخرى";
  }

  useEffect(() => {
    if (!tokenFromUrl) return;
    if (didVerifyRef.current) return;

    didVerifyRef.current = true;

    async function verifyEmailFromLink() {
      const decodedToken = decodeVerificationToken(tokenFromUrl);

      // if (!userIdFromUrl || !decodedToken) {
      //   navigate(
      //     `/invalid-email?email=${encodeURIComponent(emailFromUrl || email)}`
      //   );
      //   return;
      // }
      if (!userIdFromUrl || !decodedToken) {
  navigate(
    `/invalid-email?email=${encodeURIComponent(emailFromUrl || email)}`,
    { replace: true }
  );
  return;
}

      const payload = {
        userId: userIdFromUrl,
        token: decodedToken,
      };

      try {
        setIsVerifying(true);
        setMessage("");
        setMessageType("");

        console.log("Verify email payload:", {
          userId: userIdFromUrl,
          token: "[hidden]",
        });

        const result = await authApi.verifyEmail(payload);

        console.log("Verify email success:", result);

        // if (result?.success !== true) {
        //   navigate(
        //     `/invalid-email?email=${encodeURIComponent(emailFromUrl || email)}`
        //   );
        //   return;
        // }
          if (result?.success !== true) {
  navigate(
    `/invalid-email?email=${encodeURIComponent(emailFromUrl || email)}`,
    { replace: true }
  );
  return;
}

        setMessage(result?.message || "تم تفعيل الحساب بنجاح");
        setMessageType("success");

        localStorage.removeItem("pendingVerificationEmail");

        setTimeout(() => {
          navigate("/email-verified-success", { replace: true });
        }, 2000);
      } 
      // catch (error) {
      //   console.log("Status:", error.response?.status);
      //   console.log(
      //     "Backend error:",
      //     JSON.stringify(error.response?.data, null, 2)
      //   );

      //   navigate(
      //     `/invalid-email?email=${encodeURIComponent(emailFromUrl || email)}`
      //   );
      // } 
      catch (error) {
  console.log("Status:", error.response?.status);
  console.log(
    "Backend error:",
    JSON.stringify(error.response?.data, null, 2)
  );

  const status = error.response?.status;

  const apiMessage =
    error.response?.data?.message?.toLowerCase() || "";

  if (
    status === 400 ||
    apiMessage.includes("token") ||
    apiMessage.includes("expired") ||
    apiMessage.includes("invalid") ||
    apiMessage.includes("confirmation")
  ) {
    navigate(
      `/invalid-email?email=${encodeURIComponent(emailFromUrl || email)}`,
      { replace: true }
    );

    return;
  }

  setMessage("حدث خطأ أثناء تأكيد البريد الإلكتروني، حاول مرة أخرى");
  setMessageType("error");
}
      finally {
        setIsVerifying(false);
      }
    }

    verifyEmailFromLink();
  }, [tokenFromUrl, userIdFromUrl, emailFromUrl, email, navigate]);

  async function handleResend() {
    if (cooldown > 0 || isSubmitting || isVerifying) return;

    setMessage("");
    setMessageType("");

    if (!email.trim()) {
      setMessage("يرجى إدخال البريد الإلكتروني لإعادة إرسال رابط التحقق");
      setMessageType("error");
      return;
    }

    const payload = {
      email: email.trim(),
    };

    try {
      setIsSubmitting(true);

      console.log("Resend email payload:", JSON.stringify(payload, null, 2));

      const result = await authApi.sendResendEmailConfirmation(payload);

      console.log("Resend email success:", result);

      if (result?.success !== true) {
        const apiMessage =
          Array.isArray(result?.errors) && result.errors.length > 0
            ? result.errors.join("\n")
            : result?.message || "فشل إعادة إرسال رابط التحقق";

        setMessage(apiMessage);
        setMessageType("error");
        return;
      }

      localStorage.setItem("pendingVerificationEmail", email.trim());

      setSent(true);
      setMessage(result?.message || "تم إرسال رابط التحقق مرة أخرى");
      setMessageType("success");

      setTimeout(() => setSent(false), 3000);
      setCooldown(30);
    } 
    catch (error) {
      console.log("Status:", error.response?.status);
      console.log(
        "Backend error:",
        JSON.stringify(error.response?.data, null, 2)
      );

      setMessage(getApiErrorMessage(error));
      setMessageType("error");
    }
     finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-8 py-1" dir="rtl">
        <div className="w-full mx-auto flex items-center justify-between">
          <a href="/">
            <img src={logo} alt="logo" className="w-20 h-19" />
          </a>

          <h1 className="text-[24px] font-bold text-[#003469] hidden md:block">
            كفيلي
          </h1>

          <nav className="flex items-center gap-6 text-sm text-gray-500">
            <span className="cursor-pointer hover:text-gray-800 transition-colors">
              الرئيسية
            </span>

            <span className="cursor-pointer hover:text-gray-800 transition-colors">
              عن المنصة
            </span>
          </nav>
        </div>
      </header>

      <div className="max-h-full bg-gray-50" dir="rtl">
        <div className="flex items-center justify-center min-h-screen px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-[80%]">
            <div className="flex-1 max-w-md">
              <div className="flex mb-4">
                <span className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
                  <MdOutlineMail className="text-[17px]" />
                  تفعيل الحساب
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 text-right mb-3">
                تحقق من بريدك الإلكتروني
              </h1>

              <p className="text-gray-500 text-sm leading-relaxed text-right mb-8">
                أرسلنا رابط تحقق إلى بريدك الإلكتروني. يرجى فتح البريد والضغط
                على رابط التحقق لتفعيل حسابك.
              </p>

              {isVerifying && (
                <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl p-4 text-sm text-right">
                  جارٍ تفعيل الحساب...
                </div>
              )}

              {message && (
                <div
                  className={`mb-4 rounded-xl p-4 text-sm text-right whitespace-pre-wrap leading-7 ${
                    messageType === "success"
                      ? "bg-green-50 border border-green-200 text-green-700"
                      : "bg-red-50 border border-red-200 text-red-600"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm text-gray-600 text-right mb-2">
                  البريد الإلكتروني
                </label>

                <input
                  type="email"
                  value={email}
                  disabled={isSubmitting || isVerifying}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                    setMessageType("");
                  }}
                  placeholder="example@domain.com"
                  className="w-full border border-gray-200 rounded-xl p-3 text-right outline-none focus:border-[#0D4B8E] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <button
                onClick={handleResend}
                disabled={cooldown > 0 || isSubmitting || isVerifying}
                className={`w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-3.5 rounded-xl mb-3 transition-colors ${
                  cooldown > 0 || isSubmitting || isVerifying
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#0D4B8E] hover:bg-[#0a3d77] cursor-pointer"
                }`}
              >
                <MdOutlineMail className="text-[19px]" />

                {isSubmitting
                  ? "جارٍ الإرسال..."
                  : sent
                    ? "تم الإرسال ✓"
                    : cooldown > 0
                      ? `إعادة الإرسال بعد ${cooldown} ثانية`
                      : "إعادة إرسال رابط تحقق"}
              </button>

              <button
                onClick={() => navigate("/register")}
                className="w-full flex items-center justify-center gap-2 border border-[#00696E] text-gray-700 hover:bg-gray-200 text-sm font-semibold py-3.5 rounded-xl mb-6 transition-colors cursor-pointer"
              >
                <FaArrowRight className="text-[#00696E]" />
                <span className="text-[#00696E]">الرجوع إلى تسجيل جديد</span>
              </button>

              <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <BsFillQuestionCircleFill className="text-[#F39C12] text-xl" />
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">
                    هل تواجه مشكلة؟
                  </p>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    تأكد من مجلد الرسائل غير المرغوب فيها (Spam) أو تواصل معنا.
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center w-85 min-h-96 bg-white border border-gray-200 rounded-2xl p-8 gap-5 shadow-sm">
              <img
                src={emailImg}
                alt="email verification"
                className="w-80 h-52 object-cover"
              />

              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-[#0D4B8E] flex items-center justify-center">
                  <FaCheckCircle className="text-white" />
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-gray-800">أمان عال</p>
                  <p className="text-xs text-gray-400">بياناتك في حفظ وأمان</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer
        dir="ltr"
        className="flex flex-col md:flex-row items-center justify-between px-8 py-4 border-t border-gray-200 gap-3"
      >
        <div className="flex gap-6 order-3 md:order-1">
          <a href="#" className="text-sm text-gray-500 hover:text-blue-700">
            اتصل بنا
          </a>

          <a href="#" className="text-sm text-gray-500 hover:text-blue-700">
            الشروط والأحكام
          </a>

          <a href="#" className="text-sm text-gray-500 hover:text-blue-700">
            سياسة الخصوصية
          </a>
        </div>

        <p className="text-sm text-gray-500 order-2 text-center">
          &copy; 2026 كفيلي - منصة رعاية الأيتام. جميع الحقوق محفوظة
        </p>

        <p className="text-lg font-bold text-blue-900 order-1 md:order-3">
          كفيلي
        </p>
      </footer>
    </>
  );
}