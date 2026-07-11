import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import logo from "../assets/title.png";
import { authApi } from "../services/authApi";

function InvalidEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(
    emailFromUrl ||
      localStorage.getItem("pendingVerificationEmail") ||
      ""
  );

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);


  function getErrorMessage(error) {
    const data = error.response?.data;

    if (!data) {
      return "حدث خطأ في الاتصال بالخادم";
    }

    if (data.message) {
      return data.message;
    }

    if (data.errors) {
      if (Array.isArray(data.errors)) {
        return data.errors.join("\n");
      }

      return JSON.stringify(data.errors);
    }

    return "فشل إرسال رابط التحقق";
  }



  async function handleResend() {

    if (loading || cooldown > 0) return;


    if (!email.trim()) {
      setMessage(
        "يرجى إدخال البريد الإلكتروني"
      );
      setMessageType("error");
      return;
    }


    try {

      setLoading(true);
      setMessage("");
      setMessageType("");


      const payload = {
        email: email.trim()
      };


      console.log(
        "Resend confirmation:",
        payload
      );


      const result =
        await authApi.sendResendEmailConfirmation(
          payload
        );


      console.log(
        "Resend response:",
        result
      );


      if (result?.success !== true) {

        setMessage(
          result?.message ||
          "فشل إرسال رابط التحقق"
        );

        setMessageType("error");

        return;
      }


      localStorage.setItem(
        "pendingVerificationEmail",
        email.trim()
      );


      setMessage(
        "تم إرسال رابط تحقق جديد إلى بريدك الإلكتروني"
      );

      setMessageType("success");


      setCooldown(30);


      const timer = setInterval(() => {

        setCooldown((prev)=>{

          if(prev <= 1){

            clearInterval(timer);

            return 0;
          }

          return prev - 1;

        });

      },1000);



    } catch(error){

      console.log(
        error.response?.data
      );


      setMessage(
        getErrorMessage(error)
      );

      setMessageType("error");


    } finally {

      setLoading(false);

    }

  }



  return (
    <div className="min-h-screen flex flex-col">

      <header className="flex items-center justify-between px-4 md:px-8 py-1 bg-gray-50 shadow-sm">
        <button onClick={() => navigate("/")} className="cursor-pointer">
          <img src={logo} alt="logo" className="w-20 h-19" />
        </button>
        <h1 className="text-lg md:text-2xl font-bold text-[#003469] hidden md:block">
          كفيلي
        </h1>
        <button onClick={() => navigate("/login")} className="cursor-pointer">
          <p className="text-navy-800 font-medium text-sm md:text-base">
            تسجيل دخول
          </p>
        </button>
      </header>



      <div className="flex-1 flex items-center justify-center px-4 py-10">


        <div
          className="max-w-lg w-full text-center flex flex-col gap-6"
          dir="rtl"
        >


          <h1 className="text-3xl font-bold text-[#0e3460]">
            رابط التحقق غير صالح أو منتهي الصلاحية
          </h1>


          <p className="text-gray-500 leading-7">
            يبدو أن رابط التحقق الذي استخدمته لم يعد صالحاً.
            يرجى طلب رابط تحقق جديد لتفعيل حسابك.
          </p>



          <div className="text-right">

            <label className="block mb-2 text-gray-600">
              البريد الإلكتروني
            </label>


            <input

              type="email"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              className="w-full border rounded-xl p-3 outline-none focus:border-[#0D4B8E]"

            />

          </div>



          {
            message && (

              <div
                className={`p-3 rounded-xl text-sm whitespace-pre-wrap ${
                  messageType==="success"
                  ?
                  "bg-green-50 text-green-700 border border-green-200"
                  :
                  "bg-red-50 text-red-600 border border-red-200"
                }`}
              >

                {message}

              </div>

            )
          }




          <div className="flex gap-3">


            <button

              onClick={()=>navigate("/register")}

              className="flex-1 border border-[#0e3460] text-[#0e3460] py-3 rounded-xl flex items-center justify-center gap-2"

            >

              <FiUserPlus />

              تسجيل جديد

            </button>




            <button

              onClick={handleResend}

              disabled={loading || cooldown>0}

              className="flex-1 bg-[#0e3460] text-white py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"

            >

              <MdEmail />


              {
                loading
                ?
                "جارٍ الإرسال..."
                :
                cooldown>0
                ?
                `انتظر ${cooldown}`
                :
                "إعادة إرسال رابط تحقق"
              }


            </button>



          </div>


        </div>


      </div>


    </div>
  );
}


export default InvalidEmail;