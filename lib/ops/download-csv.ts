/** Trigger a UTF-8 CSV download in the browser. */
export function downloadCsv(filename: string, headers: string[], rows: string[][]) {
  const quote = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const lines = [
    headers.map(quote).join(","),
    ...rows.map((row) => row.map((cell) => quote(cell)).join(",")),
  ];
  const blob = new Blob([`\uFEFF${lines.join("\n")}`], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  anchor.click();
  URL.revokeObjectURL(url);
}
