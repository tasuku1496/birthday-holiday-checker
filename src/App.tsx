import { useState } from "react";

type HolidayCheck = {
  year: number;
  date: string;
  isWeekend: boolean;
};

const BirthdayHolidayChecker = () => {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [results, setResults] = useState<HolidayCheck[]>([]);

  const checkHolidays = () => {
    const birthDate = `${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

    const checks: HolidayCheck[] = years.map((year) => {
      const date = `${year}-${birthDate}`;
      const parsedDate = new Date(date);
      const isWeekend = parsedDate.getDay() === 0 || parsedDate.getDay() === 6;

      return {
        year,
        date,
        isWeekend,
      };
    });

    setResults(checks);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">誕生日休日チェッカー</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="月 (例: 1)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
        <input
          type="text"
          placeholder="日 (例: 15)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
      </div>
      <button
        onClick={checkHolidays}
        disabled={!month || !day}
        className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
      >
        チェックする
      </button>
      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">結果:</h2>
          <ul className="space-y-2">
            {results.map((result) => (
              <li
                key={result.year}
                className={`p-2 rounded ${
                  result.isWeekend ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {result.year}年の誕生日は{" "}
                {result.isWeekend ? "土日祝日です 🎉" : "平日です 😔"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BirthdayHolidayChecker;
