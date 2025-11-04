import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { register as registerUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

const Register = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleRegisterUser = async (data) => {
        const { email, firstName, lastName, password } = data;
        try {
            await dispatch(
                registerUser({
                    email,
                    fullName: {
                        firstName,
                        lastName,
                    },
                    password,
                })
            ).unwrap();
            toast.success("Account created successfully!");
            reset();
        } catch (error) {
            toast.error(error || "Registration failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create your account</h1>
                    <p className="text-gray-600 dark:text-gray-400">Join us to start your AI journey</p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSubmit(handleRegisterUser)} className="space-y-5">
                        {/* Name Fields Row */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    {...register("firstName", {
                                        required: "First name is required.",
                                        minLength: { value: 2, message: "Minimum 2 characters" }
                                    })}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.firstName
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors`}
                                    placeholder="John"
                                />
                                {errors.firstName && (
                                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    {...register("lastName", {
                                        required: "Last name is required.",
                                        minLength: { value: 2, message: "Minimum 2 characters" }
                                    })}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.lastName
                                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors`}
                                    placeholder="Doe"
                                />
                                {errors.lastName && (
                                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required.",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.email
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors`}
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: "Password is required.",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                })}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.password
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors`}
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <span>Create account</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                Already have an account?
                            </span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <Link
                        to="/login"
                        className="block w-full text-center py-3 px-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        Sign in instead
                    </Link>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a>
                    {" "}and{" "}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
                </p>
            </div>
        </div>
    )
}

export default Register