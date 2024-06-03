import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { CircularProgress, Grid, OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./index.css";
import { Post, Put } from "../../services/services";
import { networkURLs } from "../../services/networkUrls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fffff",
  borderRadius: "10px",
  borderColor: "none",
  boxShadow: 24,
  p: 4,
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  customerId: Yup.string().required("Customer ID is required"),
  customerType: Yup.string().required("Customer Type is required"),
  totalInvestment: Yup.number().required("Total Investment is required"),
  noOfFunds: Yup.number().required("Number of Funds is required"),
});

export default function BasicModal({ open, handleCloseModal, data }) {
  const [done, setDone] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      name: data?.name ? data?.name : "",
      customerId: data?.customerId ? data?.customerId : "",
      customerType: data?.customerType ? data?.customerType : "",
      totalInvestment: data?.totalInvestment ? data?.totalInvestment : "",
      noOfFunds: data?.noOfFunds ? data?.noOfFunds : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (data) handleUpdate(values);
      else handleAdd(values);
    },
  });

  const handleAdd = async (values) => {
    console.log(data, "adding");
    setDone(true);
    const { name, customerId, customerType, noOfFunds, totalInvestment } =
      values;
    console.log(values, "values");
    const payload = {
      salesforce_customer_id: 648,
      customer_name: name,
      customer_type: customerType,
      total_investment: totalInvestment,
      no_of_funds: noOfFunds,
    };
    try {
      const response = await Post(networkURLs.postCustomer, payload, false);
      console.log(response, "response");
      setDone(false);
      handleCloseModal();
    } catch (e) {
      console.log(e);
      setDone(false);
      handleCloseModal();
    }
  };

  const handleUpdate = async (values) => {
    setDone(true);
    const { name, customerId, customerType, noOfFunds, totalInvestment } =
      values;
    const payload = {
      salesforce_customer_id: customerId,
      customer_name: name,
      customer_type: customerType,
      total_investment: totalInvestment,
      no_of_funds: noOfFunds,
    };
    try {
      const responsee = await Put(networkURLs.updateCustomer, payload, false);
      console.log(responsee);
      handleCloseModal();
      setDone(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleCloseModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ paddingBottom: "5%" }}
          >
            {data ? "Update" : "Add"} Customer Information
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box
              style={{
                gap: 20,
                display: "flex",
                flexDirection: "column",
                marginLeft: "0px",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="customer-name"
                label="Name of the Customer"
                variant="outlined"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                style={{ width: "100%" }}
              />
              <TextField
                required
                id="customer"
                label="Customer ID"
                variant="outlined"
                name="customerId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.customerId}
                error={
                  formik.touched.customerId && Boolean(formik.errors.customerId)
                }
                helperText={
                  formik.touched.customerId && formik.errors.customerId
                }
                style={{ width: "100%" }}
              />
              <Grid style={{ width: "100%" }}>
                <Select
                  labelId="customer-type-label"
                  id="customer-type"
                  value={formik.values.customerType}
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // label="Age"
                  input={<OutlinedInput label="Name" />}
                  name="customerType"
                  style={{ width: "100%" }}
                  error={
                    formik.touched.customerType &&
                    Boolean(formik.errors.customerType)
                  }
                  helperText={
                    formik.touched.customerType && formik.errors.customerType
                  }
                >
                  <MenuItem value={"INDIVIDUAL"}>INDIVIDUAL</MenuItem>
                  <MenuItem value={"CORPORATE"}>CORPORATE</MenuItem>
                </Select>
              </Grid>
              <TextField
                required
                id="total"
                label="Total Investments"
                variant="outlined"
                name="totalInvestment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.totalInvestment}
                error={
                  formik.touched.totalInvestment &&
                  Boolean(formik.errors.totalInvestment)
                }
                helperText={
                  formik.touched.totalInvestment &&
                  formik.errors.totalInvestment
                }
                style={{ width: "100%" }}
              />
              <TextField
                required
                id="funds"
                label="Number of Funds"
                variant="outlined"
                name="noOfFunds"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.noOfFunds}
                error={
                  formik.touched.noOfFunds && Boolean(formik.errors.noOfFunds)
                }
                helperText={formik.touched.noOfFunds && formik.errors.noOfFunds}
                style={{ width: "100%" }}
              />
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="outlined"
                  type="button"
                  onClick={() => handleCloseModal()}
                  disabled={done}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  style={{ marginLeft: "5%", backgroundColor: "#005286" }}
                  type="submit"
                  endIcon={
                    done && (
                      <CircularProgress style={{ color: "white" }} size={20} />
                    )
                  }
                >
                  {data ? "Update" : "Add"}
                </Button>
              </Grid>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
