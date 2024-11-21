'use client';

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GradeTableProps {
  variant?: string;
  week?: string;
}

const getRowLabels = (variant: string) => {
  switch (variant) {
    case "first":
      return ["СРО", "Практика"];
    case "second":
      return ["Лекция", "СРО", "Практика"];
    case "third":
      return ["Лекция", "СРО", "Лабка", "Практика"];
    case "four":
      return ["Лекция", "СРО", "Лабка"];
    default:
      return ["Лекция", "СРО", "Практика"];
  }
};

const getColumns = (variant: string) => {
  return variant === 'first' ? 7 : 8
}

const getWeight = (variant: string) => {
  switch (variant) {
    case "first":
      return [0.4, 0.6];
    case "second":
      return [0.2, 0.35, 0.45];
    case "third":
      return [0.2, 0.2, 0.2, 0.4];
    case "four":
      return [0.2, 0.4, 0.4];
    default:
      return [0.2, 0.2, 0.6];
  }
};

const GradeTable = ({ variant = "second", week = 'first' }: GradeTableProps) => {
  const [tableData, setTableData] = useState<string[][]>([]);
  const [midterm, setMidterm] = useState("");
  const [overall, setOverall] = useState("");
  const [general, setGeneral] = useState<number | undefined>();
  const [errors, setErrors] = useState<boolean[][]>([]);
  const [midtermError, setMidtermError] = useState(false);

  const rowLabels = getRowLabels(variant);

  useEffect(() => {
    const initialData = Array(getRowLabels(variant).length)
      .fill(null)
      .map(() => Array(getColumns(week)).fill(""));
    const initialErrors = Array(getRowLabels(variant).length)
      .fill(null)
      .map(() => Array(getColumns(week)).fill(false));

    setTableData(initialData);
    setErrors(initialErrors);
  }, [variant, week]);

  const validateInput = (value: string) => {
    if (value === "") return false;
    if (value === "н" || value === "н.п") return true;
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
  };

  const isAllFieldsFilled = () => {
    // Check all table data fields
    const allTableFieldsFilled = tableData.every(row => 
      row.every(cell => cell !== "" && validateInput(cell))
    );

    // Check midterm field
    const midtermFilled = midterm !== "" && validateInput(midterm);

    return allTableFieldsFilled && midtermFilled;
  };

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newTableData = [...tableData];
    const newErrors = [...errors];

    newTableData[rowIndex][colIndex] = value;
    newErrors[rowIndex][colIndex] = !validateInput(value);

    setTableData(newTableData);
    setErrors(newErrors);
  };

  const handleMidtermChange = (value: string) => {
    setMidterm(value);
    setMidtermError(!validateInput(value));
  };

  const calculateOverallGrade = () => {
    const averages = tableData.map((row) => {
      let n = getColumns(week);
      const sum = row.reduce((acc, grade) => {
        if (grade === "н.п") {
          n -= 1; 
          return acc;
        }
        if (grade === "" || grade === "н") return acc + 0; 
        return acc + Number(grade);
      }, 0);
  
      return n === 0 ? 0 : sum / n;
    });
  
    const weight = getWeight(variant);
  
    const weeklyWeightedAverage = averages.reduce(
      (acc, avg, idx) => acc + avg * weight[idx],
      0
    );
    setGeneral(weeklyWeightedAverage);
  
    const midtermValue =
      midterm === "н.п" ? 0 : midterm === "н" || midterm === "" ? 0 : Number(midterm);
  
    const finalGrade = weeklyWeightedAverage * 0.6 + midtermValue * 0.4;
  
    setOverall(Math.round(finalGrade * 10) / 10 + "");
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg bg-white">
      <table
        className="w-full border-collapse table-auto"
        role="grid"
        aria-label="Editable grade table"
      >
        <thead>
          <tr>
            <th className="border border-gray-300 bg-gray-50 p-3 text-left font-semibold text-gray-600">
              Типы
            </th>
            {Array(getColumns(week))
              .fill(null)
              .map((_, index) => (
                <th
                  key={index}
                  className="border border-gray-300 bg-gray-50 p-3 text-left font-semibold text-gray-600"
                  role="columnheader"
                >
                  {index + 1} неделя
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200">
              <td className="border border-gray-300 bg-gray-50 p-3 font-medium text-gray-600">
                {rowLabels[rowIndex]}
              </td>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className="relative border border-gray-300 p-2 transition-all hover:bg-gray-50"
                >
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) =>
                      handleCellChange(rowIndex, colIndex, e.target.value)
                    }
                    className={`w-full h-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded 
                      ${cell === "н.п" ? "bg-gray-200" : ""}
                      ${errors[rowIndex][colIndex] ? "border-red-500" : "border-transparent"}`}
                    aria-label={`Week ${colIndex + 1} ${rowLabels[rowIndex]}`}
                  />
                  {errors[rowIndex][colIndex] && (
                    <div className="absolute -top-1 -right-1">
                      <AlertCircle
                        className="text-red-500 h-4 w-4"
                        aria-label="Invalid input"
                      />
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-6 flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Рубежка:</label>
          <div className="relative">
            <input
              type="text"
              value={midterm}
              onChange={(e) => handleMidtermChange(e.target.value)}
              className={`w-24 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
                ${midtermError ? "border-red-500" : "border-gray-300"}`}
              aria-label="Midterm grade"
            />
            {midtermError && (
              <div className="absolute -top-1 -right-1">
                <AlertCircle
                  className="text-red-500 h-4 w-4"
                  aria-label="Invalid input"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Общий ТК1:</label>
          <input
            type="text"
            value={general}
            readOnly
            className="w-24 p-2 border border-gray-300 rounded bg-gray-100"
            aria-label="Overall grade"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Рейтинг:</label>
          <input
            type="text"
            value={overall}
            readOnly
            className="w-24 p-2 border border-gray-300 rounded bg-gray-100"
            aria-label="Overall grade"
          />
        </div>

        <Button
          disabled={!isAllFieldsFilled()}
          onClick={calculateOverallGrade}
          variant="outline"
          className="ml-4"
        >
          Вычислить
        </Button>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Входные данные: Числа (0-100), `н`, или `н.п`
      </div>
    </div>
  );
};

export default GradeTable;