//src/app/webinar/login/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WebinarLogin() {
  const router = useRouter();
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const [validPassword, setValidPassword] = useState("");

  useEffect(() => {
    // Admin tarafından kaydedilen şifreyi al
    const pw = localStorage.getItem("webinarPassword");
    setValidPassword(pw || "");
  }, []);

  const handleLogin = () => {
    if (inputPassword === validPassword && validPassword !== "") {
      localStorage.setItem("webinarAccess", "true");
      router.push("/webinar");
    } else {
      setError("Şifre yanlış veya henüz şifre üretilmedi!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-6">Webinar Girişi</h1>
      <input
        type="text"
        placeholder="Şifreyi girin"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
        className="px-4 py-2 mb-4 rounded text-black"
      />
      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        Giriş Yap
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
