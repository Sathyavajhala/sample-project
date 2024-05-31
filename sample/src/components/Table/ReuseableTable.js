import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import BasicModal from "../Modal/ReuseableModal";
import "./index.css";
import { Get } from "../../services/services";
import { networkURLs } from "../../services/networkUrls";

export default function BasicTable() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState();
  const [rows, setRows] = React.useState([
    {
      salesforce_customer_id: 648,
      customer_name: "Pucha Sandeep",
      customer_type: "Business",
      total_investment: 10000,
      no_of_funds: 1,
    },
    {
      salesforce_customer_id: 649,
      customer_name: "Alice Johnson",
      customer_type: "Individual",
      total_investment: 50000,
      no_of_funds: 5,
    },
    {
      salesforce_customer_id: 650,
      customer_name: "Bob Smith",
      customer_type: "Business",
      total_investment: 250000,
      no_of_funds: 10,
    },
    {
      salesforce_customer_id: 651,
      customer_name: "Cathy Brown",
      customer_type: "Individual",
      total_investment: 75000,
      no_of_funds: 3,
    },
    {
      salesforce_customer_id: 652,
      customer_name: "David Wilson",
      customer_type: "Corporate",
      total_investment: 300000,
      no_of_funds: 8,
    },
  ]);

  const editHandler = (row) => {
    setOpen(true);
    setData(row);
  };

  const fetchData = async () => {
    try {
      // const response = await Get(networkURLs.getAllCustomer, false);
      // const data = await response.json();
      // console.log(data, "data");
      const updatedData = rows.map((customer) => ({
        customerId: customer?.salesforce_customer_id,
        name: customer?.customer_name,
        customerType: customer?.customer_type,
        totalInvestment: customer?.total_investment,
        noOfFunds: customer?.no_of_funds,
      }));

      setRows(updatedData);
      console.log(updatedData, "updatedData");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 300000);
    fetchData();

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            style={{
              backgroundColor: "#005286",
            }}
          >
            <TableRow>
              <TableCell className="tableheader">Name of Customer</TableCell>
              <TableCell align="center" className="tableheader">
                Customer ID
              </TableCell>
              <TableCell align="center" className="tableheader">
                Customer Type
              </TableCell>
              <TableCell align="center" className="tableheader">
                Total Investment
              </TableCell>
              <TableCell align="center" className="tableheader">
                No of Funds
              </TableCell>
              <TableCell align="center" className="tableheader">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row?.customerId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell align="center">{row?.customerId}</TableCell>
                <TableCell align="center">{row?.customerType}</TableCell>
                <TableCell align="center">{row?.totalInvestment}</TableCell>
                <TableCell align="center">{row?.noOfFunds}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit">
                    <EditIcon
                      onClick={() => editHandler(row)}
                      style={{ color: "#005286" }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {open && <BasicModal open={open} setOpen={setOpen} data={data} />}
    </>
  );
}
