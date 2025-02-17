type Props = {
  year: number;
  isWeekend: boolean;
};

const ResultItem = ({ year, isWeekend }: Props) => {
  return (
    <li className={`p-2 rounded ${isWeekend ? "bg-green-100" : "bg-red-100"}`}>
      {year}年の誕生日は {isWeekend ? "土日祝です 🎉" : "平日です 😔"}
    </li>
  );
};

export default ResultItem;
