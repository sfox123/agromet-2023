import React, { useEffect, useState } from "react";
import Axios from "../../../api/api";
import uuid from "react-uuid";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MenuItem } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
  },
  mTop: {
    marginTop: "4rem",
  },
  mLeft: {
    marginLeft: "2rem",
  },
  ItemCenter: {
    display: "grid",
    placeContent: "center",
    placeItems: "center",
  },
});

export default function Rainfall(props) {
  const { id, sheetList, email, rainCheck, tankCheck } = props;
  const classes = useStyles();
  const [load, setLoad] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [rain, setRain] = useState(rainCheck ? true : false);
  const [tank, setTank] = useState(rainCheck ? false : true);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sheet, setSheet] = useState({ rain: [], tank: [] });
  const { rainfall } = apiData;

  useEffect(async () => {
    if (sheet.rain.length === 0 || sheet.tank.length === 0) {
      await sheetList.map((x, i) => {
        let value = x.split("-")[1].trim();
        if (value == "rainFall") {
          sheet.rain.push(x.split("-")[0].trim());
        } else if (value == "tankWater") {
          sheet.tank.push(x.split("-")[0].trim());
        }
      });
    }

    const { data } = await Axios.post("/getRecords", {
      id: id,
      sheetList: sheet,
    });
    const { rainfall, tankwater } = data;
    setApiData(data);
    const tmp = [];
    const arr = [];

    if (rows.length === 0) {
      // const { rainfall } = apiData;
      if (rainCheck) {
        rainfall.map((x, i) => {
          if (Object.keys(x).length > 5) {
            Object.keys(x).map((key, index) => {
              if (index > 4) {
                if (email == x[index][3]) {
                  tmp.push({
                    ["rainfall"]: x[index][2],
                    ["dateMeasured"]: x[index][0],
                    ["dateRecorded"]: x[index][1],
                  });
                }
              }
            });
          }
        });
        setRows(tmp);
      }
    }
    if (cols.length === 0) {
      // const { tankwater } = apiData;
      // console.log(tankwater);
      if (tankCheck) {
        tankwater.map((x, i) => {
          let length = Object.keys(x).length;
          if (Object.keys(x).length > 5) {
            Object.keys(x).map((key, index) => {
              if (index > 4) {
                if (email == x[index][4]) {
                  arr.push({
                    ["wLevel"]: x[index][2],
                    ["wCapacity"]: x[index][3],
                    ["dateMeasured"]: x[index][1],
                    ["dateRecorded"]: x[index][0],
                  });
                }
              }
            });
          }
        });
        setCols(arr);
      }
    }
    setLoad(false);
  }, [sheet, rows, cols]);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    const value = e.target.ariaLabel;
    if (value == "rain") {
      setRain(true);
      setTank(false);
    } else if (value == "tank") {
      setTank(true);
      setRain(false);
    }

    setAnchorEl(null);
  };

  return (
    <>
      {load ? (
        <div className={classes.ItemCenter}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div
            className="m-top"
            style={{ marginLeft: "2rem", marginTop: "4rem" }}
          >
            <Button
              variant="contained"
              color="primary"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleOpen}
            >
              {rainCheck ? "Rainfall" : "tankwater"}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {rainCheck && (
                <MenuItem aria-label="rain" onClick={handleClose}>
                  Rainfall
                </MenuItem>
              )}
              {tankCheck && (
                <MenuItem aria-label="tank" onClick={handleClose}>
                  Tankwater
                </MenuItem>
              )}
            </Menu>
          </div>
          {rain && (
            <TableContainer
              className={`${classes.table} ${classes.mLeft} ${classes.mTop}`}
              component={Paper}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Rainfall (mm)</TableCell>
                    <TableCell align="right">Date Measured</TableCell>
                    <TableCell align="right">Date Recorded</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={uuid()}>
                      <TableCell component="th" scope="row">
                        {row.rainfall}
                      </TableCell>
                      <TableCell align="right">{row.dateRecorded}</TableCell>
                      <TableCell align="right">{row.dateMeasured}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {tank && (
            <TableContainer
              className={`${classes.table} ${classes.mLeft} ${classes.mTop}`}
              component={Paper}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Water Level (ft)</TableCell>
                    <TableCell>Water Capacity (Ac.ft)</TableCell>
                    <TableCell align="right">Date Measured</TableCell>
                    <TableCell align="right">Date Recorded</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cols.map((row) => (
                    <TableRow key={uuid()}>
                      <TableCell component="th" scope="row">
                        {row.wLevel}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.wCapacity}
                      </TableCell>
                      <TableCell align="right">{row.dateRecorded}</TableCell>
                      <TableCell align="right">{row.dateMeasured}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </>
  );
}
