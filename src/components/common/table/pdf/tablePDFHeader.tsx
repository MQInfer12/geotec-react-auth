import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Header, flexRender } from "@tanstack/react-table";
import { tailwindColors } from "../../../../utils/tailwindConfig";

interface Props {
  headers: Header<any, unknown>[];
}

const TablePDFHeader = ({ headers }: Props) => {
  return (
    <View style={styles.row}>
      {headers.map((header) => (
        <Text key={header.id} style={styles.header}>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </Text>
      ))}
    </View>
  );
};

export default TablePDFHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: tailwindColors.gray["300"],
    backgroundColor: tailwindColors.gray["200"],
  },
  header: {
    flex: 1,
    fontSize: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
    color: tailwindColors.gray["800"],
  },
});
