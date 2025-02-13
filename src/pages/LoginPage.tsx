import React, { useState } from "react";
import { Button } from "../component/Button/Button";
import { Input } from "../component/Input/Input";
import { Link } from "react-router-dom";

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
      let value = e.target.value;

      if (field === "phone") {
        // 숫자만 남기기
        value = value.replace(/\D/g, "");

        // 입력 길이 제한 (010-1234-5678 형식: 최대 13자)
        if (value.length > 11) {
          return; // 더 이상 입력 불가
        }

        // 010-1234-5678 형식으로 변환
        if (value.length > 3 && value.length <= 7) {
          value = value.replace(/(\d{3})(\d+)/, "$1-$2");
        } else if (value.length > 7) {
          value = value.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
        }
      }

      // 변환된 값을 상태에 반영
      setFormData({ ...formData, [field]: value });
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
    <div className="w-full flex flex-col justify-center bg-white">
      <div className="flex items-center justify-center">
        <div className="p-6 w-[25rem]">
          <div className="text-2xl mb-10 text-left">
            <span className="text-blue-500 font-pretendard font-semibold">
              바로잡
            </span>
            <span className="font-pretendard font-medium"> 시작하기</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col font-pretendard"
          >
            {/* 전화번호 */}
            <Input
              label="전화번호"
              type="text"
              inputMode="numeric"
              placeholder="휴대폰번호( - 없이 숫자만 입력)"
              value={formData.phone}
              onChange={handleChange("phone")}
              variant={errors.phone ? "error" : "default"}
              errorMessage={errors.phone}
              className="mb-4"
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
              showToggleIcon
            />

            {/* 로그인 버튼 */}
            <div className="flex justify-center mt-8 mb-3">
              <Button primary label="로그인" size="large" />
            </div>
            <div className="flex justify-center">
              <Link to="/signup" className="w-full">
                <Button secondary label="회원가입" size="large" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
