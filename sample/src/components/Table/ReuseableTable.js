import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Backdrop, Button, CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import BasicModal from "../Modal/ReuseableModal";
import "./index.css";
import { Get } from "../../services/services";
import { networkURLs } from "../../services/networkUrls";
import { useNavigate } from "react-router-dom";

export default function BasicTable() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState();
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const editHandler = (row) => {
    setOpen(true);
    setData(row);
  };

  const fetchData = async () => {
    try {
      const response = await Get(networkURLs.getAllCustomer, false);
      if (response?.data?.response?.statusCode === 200) {
        const data = response?.data?.response?.data?.rows;
        const updatedData = data.map((customer) => ({
          customerId: customer?.salesforce_customer_id,
          name: customer?.customer_name,
          customerType: customer?.customer_type,
          totalInvestment: customer?.total_investment,
          noOfFunds: customer?.no_of_funds,
        }));
        setRows(updatedData);
        setIsLoading(false);
      } else {
        navigate("/errorpage");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setData(undefined);
  };

  React.useEffect(() => {
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 3000);
    fetchData();

    // Cleanup interval on component unmount
    // return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1%",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem" }}>Customer Information</h1>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#005286",
            height: "41px",
            fontSize: "0.8rem",
          }}
          type="button"
          onClick={() => {
            setOpen(true);
            setData(undefined);
          }}
        >
          Add Customer Info
        </Button>
      </div>

      {isLoading ? (
        <>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              opacity: "0.5",
            }}
            open={true}
          >
            <CircularProgress style={{ color: "#005286" }} />
          </Backdrop>
        </>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead
                style={{
                  backgroundColor: "#005286",
                }}
              >
                <TableRow>
                  <TableCell className="tableheader">
                    Name of Customer
                  </TableCell>
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
        </>
      )}
      {open && (
        <BasicModal
          open={open}
          handleCloseModal={handleCloseModal}
          data={data}
        />
      )}
    </>
  );
}
