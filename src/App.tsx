import { useState } from "react";
import { isHoliday } from "holiday-jp";
import { triggerConfetti } from "./triggerConfetti";
import MonthDaySelect from "./components/MonthDaySelect";
import CustomButton from "./components/CustomButton";
import ResultItem from "./components/ResultItem";

type HolidayCheck = {
  year: number;
  date: string;
  isWeekend: boolean;
};

const BirthdayHolidayChecker = () => {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [results, setResults] = useState<HolidayCheck[]>([]);
  const [showResults, setShowResults] = useState(false);

  const checkHolidays = () => {
    const birthDate = `${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

    const checks: HolidayCheck[] = years.map((year) => {
      const date = `${year}-${birthDate}`;
      const parsedDate = new Date(date);

      // 土日かどうかを判定
      const isWeekend = parsedDate.getDay() === 0 || parsedDate.getDay() === 6;

      // 祝日かどうかを判定
      const isHolidayFlag = isHoliday(parsedDate);

      return {
        year,
        date,
        isWeekend: isWeekend || isHolidayFlag,
      };
    });

    setResults(checks);
    setShowResults(true);
  };

  const reset = () => {
    setMonth("");
    setDay("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">お誕生日休日チェッカー</h1>
      <p className="mb-4">これからの誕生日が平日か土日かを教えてあげます</p>
      <div className="mb-4 flex space-x-4 items-center">
        <MonthDaySelect type="month" value={month} setValue={setMonth} />
        <span className="text-base leading-[2.5rem]">月</span>
        <MonthDaySelect type="day" value={day} setValue={setDay} />
        <span className="text-base leading-[2.5rem]">日</span>
      </div>
      <div className="flex space-x-4">
        <CustomButton
          variantType="blue"
          style={{ padding: "12px 24px" }}
          onClick={() => {
            checkHolidays();
            triggerConfetti();
          }}
          disabled={!month || !day}
        >
          チェックする
        </CustomButton>
        {showResults && (
          <CustomButton
            variantType="gray"
            style={{ padding: "12px 24px" }}
            onClick={() => reset()}
          >
            リセットする
          </CustomButton>
        )}
      </div>
      {showResults && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            {month}月{day}日が誕生日のあなたは...
          </h2>
          <ul className="space-y-2">
            {results.map((result) => (
              <ResultItem
                key={result.year}
                year={result.year}
                isWeekend={result.isWeekend}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BirthdayHolidayChecker;
