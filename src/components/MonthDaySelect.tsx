import React from "react";
import { Select, MenuItem, FormControl } from "@mui/material";

type Props = {
  type: "month" | "day";
  value: string;
  setValue: (value: string) => void;
  className?: string;
};

const FONT_FAMILY: string = "Kaisei Tokumin";

const MonthDaySelect: React.FC<Props> = ({
  type,
  value,
  setValue,
  className,
}) => {
  return (
    <FormControl className={className}>
      {type === "month" ? (
        <>
          <Select
            labelId="month-select-label"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            displayEmpty
            className="w-[120px]"
            sx={{ fontFamily: FONT_FAMILY, fontSize: "16px" }}
          >
            <MenuItem value="">月を選択</MenuItem>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <MenuItem
                key={m}
                value={m.toString()}
                sx={{
                  fontFamily: FONT_FAMILY,
                  fontSize: "16px",
                }}
              >
                {m}
              </MenuItem>
            ))}
          </Select>
        </>
      ) : (
        <>
          <Select
            labelId="day-select-label"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            displayEmpty
            className="w-[120px]"
            sx={{ fontFamily: FONT_FAMILY, fontSize: "16px" }}
          >
            <MenuItem value="">日を選択</MenuItem>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <MenuItem
                key={d}
                value={d.toString()}
                sx={{ fontFamily: FONT_FAMILY, fontSize: "16px" }}
              >
                {d}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </FormControl>
  );
};

export default MonthDaySelect;
