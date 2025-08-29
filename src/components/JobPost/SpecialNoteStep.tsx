import React, { useState } from "react";

type Props = {
  initialNote?: string;
  onChange?: (note: string) => void;
  onConfirm: () => void;
  className?: string;
};

const SpecialNoteStep: React.FC<Props> = ({
  initialNote = "",
  onChange,
  className,
}) => {
  const [note, setNote] = useState(initialNote);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setNote(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={className}>
      <div className="mb-4 text-2xl font-bold text-neutral-600">
        <span className="text-blue-600">작업 특이사항</span>을 작성해주세요
        (선택)
      </div>
      <textarea
        value={note}
        onChange={handleChange}
        rows={4}
        placeholder="ex. 그라인더를 사용한 벽면 면갈이 작업입니다."
        className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700 outline-none placeholder:text-gray-400"
      />
    </div>
  );
};

export default SpecialNoteStep;
