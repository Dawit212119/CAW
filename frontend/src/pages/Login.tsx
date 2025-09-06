import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const { isLoggingIn, login } = useAuthStore();
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [password, setShowPassword] = useState(false);
  const validateForm = () => {
    if (!FormData.email.trim()) return toast.error("Email required");
    if (!/\S+@\S+\.\S+/.test(FormData.email))
      return toast.error("Invalid email format");
    if (!(FormData.password.length < 6)) return toast.error("");
    if (!FormData.password.trim()) return toast.error("Password is required");
    return true;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(FormData);
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/*left side
       */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        {/*logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60">Sign in to your account</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control flex flex-col gap-2">
            <label className="label ">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="email@gmail.com"
                value={FormData.email}
                onChange={(e) =>
                  setFormData({ ...FormData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={password ? "password" : "text"}
                className="input input-bordered w-full pl-10 outline-none"
                placeholder="********"
                value={FormData.password}
                onChange={(e) =>
                  setFormData({ ...FormData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!password)}
              >
                {password ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <div className="text-center pt-3">
          <p className="text-base-content/60">
            Don&apos;t have an account?
            <Link to="/signup" className="link link-primary">
              Create account
            </Link>{" "}
          </p>
        </div>
      </div>
      {/*right side */}

      {/* <AuthImagePattern
          title="join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        /> */}
    </div>
  );
};

export default Login;
