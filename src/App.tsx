import { useState } from "react";
import { isHoliday } from "holiday-jp";
import { triggerConfetti } from "./triggerConfetti";
import MonthDaySelect from "./components/MonthDaySelect";

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
      <h1 className="text-2xl font-bold mb-4">誕生日休日チェッカー</h1>
      <p className="mb-4">これからの誕生日が平日か土日かを教えてあげます</p>
      <div className="mb-4 flex space-x-4 items-center">
        <MonthDaySelect type="month" value={month} setValue={setMonth} />
        <span className="text-base leading-[2.5rem]">月</span>
        <MonthDaySelect type="day" value={day} setValue={setDay} />
        <span className="text-base leading-[2.5rem]">日</span>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => {
            checkHolidays();
            triggerConfetti();
          }}
          disabled={!month || !day}
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
        >
          チェックする
        </button>
        {showResults && (
          <button
            onClick={reset}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            リセットする
          </button>
        )}
      </div>
      {showResults && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            {month}月{day}日が誕生日のあなたは...
          </h2>
          <ul className="space-y-2">
            {results.map((result) => (
              <li
                key={result.year}
                className={`p-2 rounded ${
                  result.isWeekend ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {result.year}年の誕生日は{" "}
                {result.isWeekend ? "土日祝です 🎉" : "平日です 😔"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BirthdayHolidayChecker;
