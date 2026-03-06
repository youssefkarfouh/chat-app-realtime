import { Link } from 'react-router-dom'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useForm } from "react-hook-form";
import { useLogin } from './hooks/useLogin';
import { useState } from 'react';

function Login() {
  const { login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "user",
      password: "Admin@123",
    },
  });

  const onSubmit = (data: any) => {
    login(data);
  }

  return (
    <div className="min-h-screen bg-[#f6f5f7] text-[#333] flex flex-col">
      <div className="flex-1 w-full flex flex-col md:flex-row bg-white overflow-hidden">

        {/* Left Side: Create Account (Purple) */}
        <div className="md:w-[40%] bg-linear-to-r from-[#6633cc] to-[#5c33a3] text-white flex flex-col items-center justify-center p-12 text-center order-2 md:order-2 relative h-full min-h-[40vh] md:min-h-screen">
          <div className="absolute top-10 left-10 flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg">
            </div>
            <span className="font-bold text-2xl tracking-tight">Chatty</span>
          </div>

          <div className="max-w-[420px]">
            <h2 className="text-5xl font-extrabold mb-8 tracking-tight">Hello, Friend!</h2>
            <p className="text-base leading-relaxed mb-12 opacity-80">
              Enter your personal details and start journey with us
            </p>
            <Link
              to="/register"
              className="inline-block px-14 py-4 border-2 border-white text-base font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-[#5c33a3] active:scale-95"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Right Side: Sign In (White) */}
        <div className="md:w-[60%] bg-white flex flex-col items-center justify-center  order-1 md:order-1 h-full min-h-[60vh] md:min-h-screen">
          <div className="w-full max-w-[420px] flex flex-col items-center">
            <h1 className="text-5xl font-black text-[#6633cc] mb-10 tracking-tight">Sign In</h1>


            <p className="text-sm text-gray-400 mb-10 tracking-wide">or use your account</p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
              <div className="group">
                <div className='relative'>
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6633cc] transition-colors">
                    <FaUser />
                  </span>
                  <input
                    {...register('username', {
                      required: 'Username is required.',
                    })}
                    type="text"
                    placeholder="Username"
                    className="w-full bg-[#f8f8f8] border-none py-4 pl-14 pr-5 text-base focus:ring-0 focus:bg-[#f0f0f0] outline-none transition-all"
                  />
                </div>
                {errors.username && (
                  <div className="text-red-500 text-sm mt-1">{errors.username.message}</div>
                )}
              </div>

              <div className="group">
                <div className='relative'>
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6633cc] transition-colors">
                    <FaLock />
                  </span>
                  <input
                    {...register('password', {
                      required: 'Password is required.',
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full bg-[#f8f8f8] border-none py-4 pl-14 pr-12 text-base focus:ring-0 focus:bg-[#f0f0f0] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6633cc] cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
                )}
              </div>

              <a href="#" className="text-sm text-gray-600 hover:text-[#6633cc] block text-center mt-4">Forgot your password?</a>

              <div className="flex justify-center pt-8">
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-[#6633cc] cursor-pointer text-white px-20 py-4 text-sm font-black uppercase tracking-[0.2em] transition-all hover:bg-[#5c33a3] hover:translate-y-[-2px] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login