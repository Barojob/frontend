import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import MathcingListCard from "@/components/MathcingListCard";
import Modal from "@/components/Modal";
import DropdownArrowIcon from "@/svgs/DropdownArrowIcon";
// import MatchIcon from "@/svgs/MatchIcon";
import PhoneIcon from "@/svgs/PhoneIcon";
import WarningIcon from "@/svgs/WarningIcon";
import { cn } from "@/utils/classname";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import SadIcon from "../svgs/SadIcon";

type CalendarItem = {
  id: string;
  date: string;
  worker: string;
  address: string;
  wage: number;
  requestDate: string;
  contactPhone: string;
};

type Props = {
  className?: string;
  items: CalendarItem[];
  onDateSelect: (date: string) => void;
  selectedDate?: string;
};

const Calendar: React.FC<Props> = ({
  className,
  items,
  onDateSelect,
  selectedDate,
}) => {
  const today = dayjs();
  const [currentYear, setCurrentYear] = useState<number>(today.year());
  const [currentMonth, setCurrentMonth] = useState<number>(today.month() + 1);
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  const itemsByDate = useMemo(() => {
    const map: Record<string, CalendarItem[]> = {};
    items.forEach((item) => {
      const key = dayjs(item.date).format("YYYY-MM-DD");
      if (!map[key]) map[key] = [];
      map[key].push(item);
    });
    return map;
  }, [items]);

  const monthStart = dayjs(
    `${currentYear}-${String(currentMonth).padStart(2, "0")}-01`,
  );
  const daysInMonth = monthStart.daysInMonth();
  const firstWeekday = monthStart.day();

  const calendarCells = useMemo(() => {
    const cells: Array<{
      dateStr: string | null;
      label: number | null;
      hasItems: boolean;
      count: number;
    }> = [];

    // 이전 달 빈 칸들
    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push({ dateStr: null, label: null, hasItems: false, count: 0 });
    }

    // 현재 달 날짜들
    for (let d = 1; d <= daysInMonth; d += 1) {
      const dateStr = dayjs(
        `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      ).format("YYYY-MM-DD");
      const dateItems = itemsByDate[dateStr] || [];
      cells.push({
        dateStr,
        label: d,
        hasItems: dateItems.length > 0,
        count: dateItems.length,
      });
    }

    // 다음 달 빈 칸들 (7의 배수로 맞춤)
    while (cells.length % 7 !== 0) {
      cells.push({ dateStr: null, label: null, hasItems: false, count: 0 });
    }

    return cells;
  }, [currentYear, currentMonth, daysInMonth, firstWeekday, itemsByDate]);

  const monthOptions = useMemo(() => {
    const arr: Array<{ value: string; label: string }> = [];
    for (let i = 0; i < 24; i += 1) {
      const d = today.subtract(i, "month");
      arr.push({
        value: d.format("YYYY-MM"),
        label: `${d.format("YY")}년 ${d.format("M")}월`,
      });
    }
    return arr;
  }, [today]);

  const totalRequestsThisMonth = useMemo(() => {
    return items.filter(
      (item) =>
        dayjs(item.date).year() === currentYear &&
        dayjs(item.date).month() + 1 === currentMonth,
    ).length;
  }, [items, currentYear, currentMonth]);

  const handleMonthSelect = (val: string) => {
    const [y, m] = val.split("-");
    setCurrentYear(Number(y));
    setCurrentMonth(Number(m));
    onDateSelect("");
    setIsMonthOpen(false);
  };
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false);

  // 캘린더 상세 카드에서는 리스트 카드의 문의하기 Drawer를 사용

  // 전화걸기 버튼이 없는 디자인으로 변경됨 (필요 시 복원)

  const selectedItems = selectedDate ? itemsByDate[selectedDate] || [] : [];

  return (
    <div className={cn("", className)}>
      {/* 상단 년월 표시 + 드롭다운 아이콘 */}
      <div className="relative mb-3 flex items-center gap-2">
        <button
          className="flex items-center gap-2 text-2xl font-bold text-neutral-600"
          onClick={() => setIsMonthOpen((v) => !v)}
        >
          <span>{`${String(currentYear).slice(2)}년 ${currentMonth}월`}</span>
          <DropdownArrowIcon className="size-3" />
        </button>
        {isMonthOpen && (
          <div className="w-30 absolute left-0 top-full z-10 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white p-2 shadow">
            <div className="max-h-52 overflow-y-auto">
              {monthOptions.map((opt) => (
                <button
                  key={opt.value}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50"
                  onClick={() => handleMonthSelect(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 배너 + 내려받기 버튼 */}
      <div className="mb-4 flex items-center justify-between rounded-[0.625rem] bg-violet-200 px-4 py-3 text-sm text-neutral-700">
        <div className="text-blue-1">
          이번 달 총{" "}
          <span className="font-bold">{totalRequestsThisMonth}명</span> 요청
          완료!
        </div>
        <Button
          size="sm"
          theme="primary"
          className="border-none px-3 font-medium"
          onClick={() => setIsPayrollModalOpen(true)}
        >
          노임대장 내려받기
        </Button>
      </div>

      {/* 캘린더 그리드 */}
      <div className="rounded-[0.625rem] bg-white p-3 shadow-sm">
        <div className="grid grid-cols-7 gap-y-2 text-center">
          {["일", "월", "화", "수", "목", "금", "토"].map((w) => (
            <div
              key={w}
              className="mb-1.5 flex items-center justify-center py-2 text-sm font-medium text-gray-500"
            >
              {w}
            </div>
          ))}
          {calendarCells.map((c, idx) => (
            <div
              key={idx}
              className="h-11.5 flex flex-col items-center justify-start"
            >
              {c.label ? (
                <button
                  onClick={() => c.dateStr && onDateSelect(c.dateStr)}
                  className="flex flex-col items-center"
                >
                  <span
                    className={cn(
                      "size-7.5 inline-flex items-center justify-center rounded-full text-sm font-bold",
                      c.dateStr === selectedDate
                        ? "bg-blue-1 text-white"
                        : c.hasItems
                          ? "text-blue-600"
                          : "text-neutral-600",
                    )}
                  >
                    {c.label}
                  </span>
                  {c.hasItems && (
                    <span className="mt-1 text-xs text-blue-600">
                      {c.count}명 요청
                    </span>
                  )}
                </button>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 날짜의 리스트 */}
      <div className="mt-4 space-y-3">
        {selectedDate && selectedItems.length === 0 && (
          <div className="flex flex-col items-center rounded-2xl bg-white py-16">
            <SadIcon className="mb-4" />
            <p className="font-semibold text-neutral-600">
              요청내역이 없습니다
            </p>
          </div>
        )}

        {selectedItems.map((item) => (
          <MathcingListCard
            key={`sel-${item.id}`}
            id={item.id}
            date={item.date}
            worker={item.worker}
            address={item.address}
            wage={item.wage}
            requestDate={item.requestDate}
            hideReviewButton
          />
        ))}
      </div>

      <Drawer
        panelClassName="bg-white"
        visible={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      >
        <div className="flex flex-col px-2">
          <div className="mb-4 flex items-center gap-3.5">
            <PhoneIcon className="size-5 text-blue-600" />
            <p className="font-bold text-neutral-600">
              통화 연결 <br />{" "}
              <span className="text-sm font-normal text-gray-500">
                1543-1543
              </span>
            </p>
          </div>
          <div className="flex w-full gap-3">
            <Button
              theme="tertiary"
              size="md"
              className="w-full font-bold"
              onClick={() => setIsInquiryOpen(false)}
            >
              취소
            </Button>
          </div>
        </div>
      </Drawer>

      <Modal
        visible={isPayrollModalOpen}
        onClose={() => setIsPayrollModalOpen(false)}
      >
        <div className="flex flex-col items-center px-4 py-9">
          <WarningIcon />
          <p className="mb-2.5 text-center text-2xl font-bold text-neutral-600">
            앗!
            <br /> 서비스 준비 중이에요
          </p>

          <p className="mb-4.5 text-center text-xs text-gray-500">
            빠른 시일 내에 준비하여 <br />
            찾아뵙겠습니다
          </p>
          <Button
            theme="secondary"
            size="md"
            className="w-35 font-bold"
            onClick={() => setIsPayrollModalOpen(false)}
          >
            확인
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Calendar;
