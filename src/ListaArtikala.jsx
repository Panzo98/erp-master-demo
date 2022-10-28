import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TAX_RATE = 0.17;

function ccyFormat(num) {
  return `${num.toFixed(4)}`;
}

function cijenaRow(kolicina, vrijednost) {
  return kolicina * vrijednost;
}

function createRow(
  id,
  naziv,
  vrijednost,
  kolicina,
  rabat,
  rabat2,
  akciza,
  taksa,
  porez
) {
  const cijena = cijenaRow(kolicina, vrijednost);
  return {
    id,
    naziv,
    vrijednost,
    kolicina,
    rabat,
    rabat2,
    akciza,
    taksa,
    porez,
    cijena,
  };
}

function subtotal(items) {
  return items.map(({ cijena }) => cijena).reduce((sum, i) => sum + i, 0);
}

const rows = [
  //   createRow("Paperclips (Box)", 100, 1.15),
  //   createRow("Paperclips (Box)", 100, 1.15),
  //   createRow("Paper (Case)", 10, 45.99),
  createRow(432, "Kifla velika", 0.5, 4, 0, 0, 0, 0, 0),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function ListaArtikala() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow
            style={{
              backgroundColor: "gainsboro",
              borderTop: "1px solid grey",
              borderBottom: "1px solid grey",
            }}
          >
            <TableCell>Artikal</TableCell>
            <TableCell align="left">Naziv artikla</TableCell>
            <TableCell align="right">Cijena</TableCell>
            <TableCell align="right">Kolicina</TableCell>
            <TableCell align="right">Rabat %</TableCell>
            <TableCell align="right">Rabat</TableCell>
            <TableCell align="right">Akciza</TableCell>
            <TableCell align="right">Taksa</TableCell>
            <TableCell align="right">Porez</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.naziv}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.naziv}</TableCell>
              <TableCell align="right">
                {parseFloat(row.vrijednost).toFixed(4)}
              </TableCell>
              <TableCell align="right">
                {parseFloat(row.kolicina).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {parseFloat(row.rabat).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {parseFloat(row.rabat2).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {parseFloat(row.akciza).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {parseFloat(row.taksa).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {parseFloat(row.porez).toFixed(2)}
              </TableCell>
              <TableCell align="right">{ccyFormat(row.cijena)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={7} />
            <TableCell rowSpan={7} />
            <TableCell rowSpan={7} />
            <TableCell rowSpan={7} />
            <TableCell rowSpan={7} />
            <TableCell rowSpan={7} />
            <TableCell rowSpan={7} />
            <TableCell colSpan={2}>Osnovica</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Porez</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
