import React, { useState, useEffect } from "react";

type ProfileSetupStepProps = {
  onValidityChange: (isValid: boolean) => void;
};

const ProfileSetupStep: React.FC<ProfileSetupStepProps> = ({
  onValidityChange,
}) => {
  const [nickname, setNickname] = useState("");

  // 닉네임이 비어있지 않아야 유효함
  const isValid = nickname.trim().length > 0;

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="nickname" className="block text-sm font-medium">
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      {/* 추가 프로필 설정 항목이 있다면 이곳에 추가 */}
    </div>
  );
};

export default ProfileSetupStep;
