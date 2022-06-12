class CSV {

  constructor(headers, rows = []) {
    this.headers = headers;
    this.rows = rows;
  }

  getRow(index=0){
    return this.rows[index]
  }

  addRow(row) {
    this.rows = [...this.rows,row]
  }

  removeRow(index) {
    this.rows.splice(index, 1);
  }

  stringify() {
    let csv = "";
    csv += this.headers.join(",") + "\n";
    this.rows.forEach((row) => {
      csv += row.join(",") + "\n";
    });
    return csv;
  }

  parse(csv) {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");
      rows.push(row);
    }
    return new CSV(headers, rows);
  }

  toFile(anchor, filename) {
    const blob = new Blob([this.stringify()], {
      type: "text/csv;charset=utf-8;",
    });
    anchor.href = URL.createObjectURL(blob);
    anchor.download = filename;
  }
}

export default CSV;
