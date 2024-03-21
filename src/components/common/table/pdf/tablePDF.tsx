import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import TablePDFRow from "./tablePDFRow";
import TablePDFHeader from "./tablePDFHeader";
import { Row, Table } from "@tanstack/react-table";

interface Props {
  table: Table<any>;
  filter: string;
  dataFiltered: Row<any>[];
}

//getCoreRowModel -->all files
//getRowModel --> just some data
const TablePDF = ({ table, filter, dataFiltered }: Props) => {

  return (
    <PDFViewer height={"450px"} width={"100%"}>
      <Document>
        <Page>
          <View style={styles.tableContainer}>
            {table.getHeaderGroups().map((group) => (
              <TablePDFHeader key={group.id} headers={group.headers} />
            ))}

{/* if someone search the pdf shows the filtered data , if nobody search... the table show the full data */}
            <TablePDFRow
              rows={
                filter != ""
                  ? dataFiltered
                  : table.getCoreRowModel().rows.filter((row) => row.original)
              }
            />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default TablePDF;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
  },
});
