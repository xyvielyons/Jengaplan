type TablePreviewProps = {
    tableData: any[];
  };
  
  const TablePreview = ({ tableData }: TablePreviewProps) => {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>PDF Content Preview</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>Week</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Lesson</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Topic</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Sub-Topic</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Objectives</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>T/L Activities</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>T/L Aids</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Reference</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {row.map((cell:any, cellIndex:any) => (
                  <td key={cellIndex} style={{ border: "1px solid black", padding: "8px" }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TablePreview;
  