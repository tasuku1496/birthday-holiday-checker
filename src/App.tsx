import { useState } from "react";
import { triggerConfetti } from "./triggerConfetti";

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
      const isWeekend = parsedDate.getDay() === 0 || parsedDate.getDay() === 6; // 0は土曜日、6は日曜日

      return {
        year,
        date,
        isWeekend,
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
      <div className="mb-4 flex space-x-4">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="">月を選択してください</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m.toString()}>
              {m}
            </option>
          ))}
        </select>
        <span className="text-base leading-[2.5rem]">月</span>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border border-gray-300 rounded p-2 w-50"
        >
          <option value="">日を選択してください</option>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d.toString()}>
              {d}
            </option>
          ))}
        </select>
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
                {result.isWeekend ? "土日です 🎉" : "平日です 😔"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BirthdayHolidayChecker;
