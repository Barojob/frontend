import React, { useState } from "react";
import { Button } from "../component/Button/Button";
import { Input } from "../component/Input/Input";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    password: "",
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const validateForm = () => {
    const newErrors = {
      phone: "",
      password: "",
    };

    // 전화번호 유효성 검사
    if (!formData.phone.match(/^010-\d{4}-\d{4}$/)) {
      newErrors.phone = "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)";
    }

    // 비밀번호 유효성 검사
    if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    }

    setErrors(newErrors);

    // 에러가 없으면 true 반환
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("로그인 성공:", formData);
      alert("로그인이 완료되었습니다!");
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen bg-gray-100">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 w-[25rem] rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-8 text-center">로그인</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* 전화번호 */}
            <Input
              label="전화번호"
              placeholder="010-1234-5678"
              value={formData.phone}
              onChange={handleChange("phone")}
              variant={errors.phone ? "error" : "default"}
              errorMessage={errors.phone}
            />

            {/* 비밀번호 */}
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호 입력"
              value={formData.password}
              onChange={handleChange("password")}
              variant={errors.password ? "error" : "default"}
              errorMessage={errors.password}
            />

            {/* 로그인 버튼 */}
            <div className="flex justify-center mt-4">
              <Button primary label="로그인" size="large" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
