/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useAuthHandlers } from "@/lib/authActions";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import InputField from "../shared/InputField";

type AuthFormProps = {
  type: "login" | "register";
};

type FormData = {
  name?: string;
  email: string;
  password: string;
};

export default function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === "login";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { handleRegister, handleLogin } = useAuthHandlers();
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      if (type === "register") {
        await handleRegister(data);
        router.push("/auth/login");
      } else {
        await handleLogin(data);
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <section
      className="min-h-screen mx-auto overflow-hidden flex justify-center flex-col
     w-96 md:w-[450px] lg:w-[666px] sm:px-8"
    >
      <Link href={"/"}>
        <div className="flex justify-center">
          {/* <Image src="/logo.png" alt="logo" width={100} height={100} /> */}
          <h1 className="text-primary lg:text-3xl font-bold text-xl">Dressen</h1>
        </div>
      </Link>
      <h2 className="my-6 capitalize text-center">{type} to dashboard</h2>
      <div className=" bg-accent border  px-5 py-5 border-neutral rounded-lg text-secondary">
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {type === "register" && (
            <InputField
              label="Name"
              id="name"
              placeholder="Name"
              register={register("name", { required: true })}
              error={errors.name && "Name is required"}
            />
          )}

          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="Email"
            register={register("email", { required: true })}
            error={errors.email && "Email is required"}
          />

          <div className="relative">
            <InputField
              label="Password"
              id="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              icon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              onIconClick={() => setShowPassword(!showPassword)}
              register={register("password", {
                required: "Password is required",
                validate: (value) =>
                  value.length >= 6 || "Password must be 6 characters long",
              })}
              error={errors.password?.message}
            />
          </div>
          {/* Remember me & Forgot password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-primary" />
              Remember me
            </label>
            <Link href="#" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-error text-sm">{error}</p>}
          {/* submit btn  */}
          <Button type="submit" className="w-full">
            {type === "register" ? "Register" : "Login"}
          </Button>
          {/* google login */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <hr className="w-full border-neutral" />
            <Button
              variant={"outline"}
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="justify-center rounded-full"
            >
              <Image src="/google.png" alt="logo" width={20} height={20} />
              Continue with Google
            </Button>
          </div>
        </form>
        {/* reg / login link */}
        <div className="mt-4 text-sm text-center">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={isLogin ? "/auth/register" : "/auth/login"}
              className="underline underline-offset-4 font-medium"
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
