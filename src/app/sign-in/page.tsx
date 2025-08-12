"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/user-api";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginUser({ email, password });
      console.log("Login success:", result);

      const token = result.data?.access_token;
      const orgId = result.data?.user?.organisation_id;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (orgId) {
        localStorage.setItem("org_id", orgId.toString());
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err.message);
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE1E0] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#7F55B1] mb-6">Sign In</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button text="Sign In" type="submit" />
        </form>

        <p className="text-center text-sm text-[#7F55B1] mt-4">
          Don’t have an account?{" "}
          <span className="text-[#F49BAB] font-medium cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
