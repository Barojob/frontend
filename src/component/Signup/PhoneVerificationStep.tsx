import React, { useState, useEffect } from "react";
import { cn } from "../../utils/classname";

type PhoneVerificationStepProps = {
  className?: string;
  onValidityChange: (isValid: boolean) => void;
};

const PhoneVerificationStep: React.FC<PhoneVerificationStepProps> = ({
  className,
  onValidityChange,
}) => {
  const [phone, setPhone] = useState("");
  const [carrier, setCarrier] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [name, setName] = useState("");

  // 간단한 유효성 검사: 전화번호 10자리 이상, 생년월일은 8자리(YYYYMMDD), 이름은 비어있지 않아야 함
  const isPhoneValid = phone.trim().length >= 10;
  const isCarrierSelected = carrier.trim() !== "";
  const isBirthDateValid = birthDate.trim().length === 8;
  const isNameValid = name.trim().length > 0;
  const isValid =
    isPhoneValid && isCarrierSelected && isBirthDateValid && isNameValid;

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className={cn("", className)}>
      <div className="mt-6 font-black text-2xl text-black">바로잡 회원가입</div>
      <label htmlFor="phone" className="block text-sm font-medium">
        휴대폰 번호
      </label>
      <input
        type="tel"
        id="phone"
        placeholder="휴대폰 번호 입력"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {isPhoneValid && !isCarrierSelected && (
        <div>
          <label htmlFor="carrier-temp" className="block text-sm font-medium">
            통신사 선택
          </label>
          <select
            id="carrier-temp"
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">통신사 선택</option>
            <option value="SKT">SKT</option>
            <option value="KT">KT</option>
            <option value="LGU">LGU+</option>
          </select>
        </div>
      )}

      {/* 통신사 선택 후, 선택된 드롭다운은 상단으로 옮겨지고 추가 입력란 노출 */}
      {isCarrierSelected && (
        <>
          <div>
            <label htmlFor="carrier" className="block text-sm font-medium">
              통신사
            </label>
            <select
              id="carrier"
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">통신사 선택</option>
              <option value="SKT">SKT</option>
              <option value="KT">KT</option>
              <option value="LGU">LGU+</option>
            </select>
          </div>
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium">
              생년월일 (YYYYMMDD)
            </label>
            <input
              type="text"
              id="birthDate"
              placeholder="예) 19900101"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {isBirthDateValid && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                이름
              </label>
              <input
                type="text"
                id="name"
                placeholder="이름 입력"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhoneVerificationStep;
