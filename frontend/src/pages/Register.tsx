
import { Link } from 'react-router-dom'
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useForm } from "react-hook-form";
import { useAuth } from '../store/useAuth';
import { useEffect, useState } from 'react';

function Register() {
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, watch, handleSubmit, formState: { errors, isValid } } = useForm({
    // mode: "onChange",
    // reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });


  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  const onSubmit = (data: any) => {
    // const { name, email, password } = data;
    // registerUser({ name, email, password });
    console.log("errors", errors);

  }

  return (
    <div className="min-h-screen bg-[#f6f5f7] text-[#333] flex flex-col">
      <div className="flex-1 w-full flex flex-col md:flex-row bg-white overflow-hidden">

        {/* Left Side: Welcome Back (Purple) - Reordered and fixed for full-screen */}
        <div className="md:w-[40%] bg-linear-to-r from-[#6633cc] to-[#5c33a3] text-white flex flex-col items-center justify-center p-12 text-center order-2 md:order-1 relative h-full min-h-[40vh] md:min-h-screen">
          <div className="absolute top-10 left-10 flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg">

            </div>
            <span className="font-bold text-2xl tracking-tight">Chatty</span>
          </div>

          <div className="max-w-[420px]">
            <h2 className="text-5xl font-extrabold mb-8 tracking-tight">Welcome Back!</h2>
            <p className="text-base leading-relaxed mb-12 opacity-80">
              To Keep Connected With Us Please Login With Your Personnal Info
            </p>
            <Link
              to="/login"
              className="inline-block px-14 py-4 border-2 border-white text-base font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-[#5c33a3] active:scale-95"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Side: Create Account (White) */}
        <div className="md:w-[60%] bg-white flex flex-col items-center justify-center p-12 md:p-24 order-1 md:order-2 h-full min-h-[60vh] md:min-h-screen">
          <div className="w-full max-w-[420px] flex flex-col items-center">
            <h1 className="text-5xl font-black text-[#6633cc] mb-10 tracking-tight">Create Account</h1>

            {/* Social Icons */}
            <div className="flex gap-6 mb-8">
              <a href="#" className="w-14 h-14 flex items-center justify-center border border-gray-100 text-gray-800 transition-all hover:bg-gray-50 hover:border-gray-200">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="w-14 h-14 flex items-center justify-center border border-gray-100 text-gray-800 transition-all hover:bg-gray-50 hover:border-gray-200">
                <FaGooglePlusG size={24} />
              </a>
              <a href="#" className="w-14 h-14 flex items-center justify-center border border-gray-100 text-gray-800 transition-all hover:bg-gray-50 hover:border-gray-200">
                <FaLinkedinIn size={20} />
              </a>
            </div>

            <p className="text-sm text-gray-400 mb-10 tracking-wide">or use your email for registration</p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
              <div className=" group">
                <div className='relative'>
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6633cc] transition-colors">
                    <FaUser />
                  </span>
                  <input
                    {...register('name', {
                      required: 'Name cannot be empty.',
                    })}
                    type="text"
                    placeholder="Name"
                    className="w-full bg-[#f8f8f8] border-none py-4 pl-14 pr-5 text-base focus:ring-0 focus:bg-[#f0f0f0] outline-none transition-all"
                  />
                </div>
                {errors.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>
                )}
              </div>

              <div className="  group">
                <div className='relative'>
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6633cc] transition-colors">
                    <FaEnvelope />
                  </span>
                  <input
                    {...register('email', {
                      required: 'Email is required.',
                      validate: (value) =>
                        value.includes('@') || 'Invalid email address.',

                    })}
                    type="text"
                    placeholder="Email"
                    className="w-full bg-[#f8f8f8] border-none py-4 pl-14 pr-5 text-base focus:ring-0 focus:bg-[#f0f0f0] outline-none transition-all"
                  />
                </div>
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>
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
                      validate: {
                        longEnough: (value) =>
                          value.length >= 6 || 'Password must be at least 6 characters long.',
                        containsSymbol: (value) =>
                          /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                          'Password must contain at least one special character.',
                      },
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
              <div className="group">
                <div className='relative'>
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6633cc] transition-colors">
                    <FaLock />
                  </span>
                  <input
                    {...register('confirmPassword', {
                      required: 'Confirm Password is required.',
                      validate: (value, allValues) => {

                        return value === allValues.password || 'Passwords do not match.';
                      },
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full bg-[#f8f8f8] border-none py-4 pl-14 pr-12 text-base focus:ring-0 focus:bg-[#f0f0f0] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6633cc] cursor-pointer"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</div>
                )}
              </div>

              <div className="flex justify-center pt-8">
                <button
                  type="submit"
                  className="bg-[#6633cc] cursor-pointer text-white px-20 py-4 text-sm font-black uppercase tracking-[0.2em] transition-all hover:bg-[#5c33a3] hover:translate-y-[-2px] active:translate-y-0"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Register