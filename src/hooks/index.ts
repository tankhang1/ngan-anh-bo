import { format } from "date-fns";
import * as XLSX from "xlsx";

const exportExcelFile = <T>(data: T[], title?: string, sheetName?: string) => {
  const workBook = XLSX.utils.book_new();
  const worksheet = XLSX.utils?.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workBook, worksheet, sheetName ?? "NganAnh");
  XLSX.writeFile(workBook, `${title ?? "NganAnh"}.xlsx`);
};
const exportMultipleSheet = <T>(
  data: {
    sheetName: string;
    data: T[];
  }[],
  title?: string
) => {
  const workBook = XLSX.utils.book_new();
  data.forEach((element, index) => {
    const worksheet = XLSX.utils?.json_to_sheet(element.data);
    XLSX.utils.book_append_sheet(
      workBook,
      worksheet,
      element.sheetName ?? "NganAnh"
    );
  });
  XLSX.writeFile(workBook, `${title ?? "NganAnh"}.xlsx`);
};

const exportExcelFileWithHeader = <T>(
  data: T[],
  headers: { label: string; key: string }[],
  title?: string,
  sheetName?: string
) => {
  const newHeader = headers.map((header) => header.label);
  const newData = data.map((item) => [
    //@ts-ignore
    ...headers.map((header) => item[header.key] ?? ""),
  ]);
  console.log(newData);
  const ws = XLSX.utils.aoa_to_sheet([newHeader, ...newData]);
  const headerStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "000000" } },
    alignment: { horizontal: "center", vertical: "center" },
  };
  const range = XLSX.utils.decode_range(ws["!ref"]!);
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = ws[XLSX.utils.encode_cell({ r: 0, c: C })];
    if (cell) cell.s = headerStyle;
  }
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, ws, sheetName ?? "NganAnh");
  XLSX.writeFile(workBook, `${title ?? "NganAnh"}.xlsx`);
};

const fNumber = (value: number) => {
  return new Intl.NumberFormat().format(value);
};

const fParseNumber = (value: string) => {
  return parseFloat(value.replace(/\./g, ""));
};

const fDate = (date?: number | string, localFormat?: string) => {
  const stringDate =
    date?.toString() || format(new Date(), localFormat ?? "yyyyMMdd");
  return `${stringDate.slice(0, 4)}-${stringDate.slice(
    4,
    6
  )}-${stringDate.slice(6, 8)}`;
};
export {
  exportExcelFile,
  exportMultipleSheet,
  exportExcelFileWithHeader,
  fNumber,
  fDate,
  fParseNumber,
};
