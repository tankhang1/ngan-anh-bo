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

const fNumber = (value: number) => {
  return new Intl.NumberFormat().format(value);
};
export { exportExcelFile, exportMultipleSheet, fNumber };
