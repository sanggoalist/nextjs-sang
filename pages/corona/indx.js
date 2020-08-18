import style from "../../styles/corona.module.scss";
import Head from "next/head";
import Chart from "../../components/chart";
import { getData } from "../../lib/gets";
import useSWR from "swr";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FormHelperText, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import * as moment from "moment";

export default function CoronaIndex() {
  const [country, setCountry] = React.useState("");
  // const { data, error } = useSWR("/api/corona/indx", getData(country));
  const [data, setData] = React.useState([]);
  const [start, setStart] = React.useState(new Date());
  const [end, setEnd] = React.useState(new Date());
  const onChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleClick = () => {
    if (country !== "" && moment(start).isValid() && moment(end).isValid()) {
      const startString = moment(start).format("YYYY-MM-DD") + "T00:00:00Z";
      var endString = "";
      if (
        moment(end).format("YYYY-MM-DD") ===
        moment(new Date()).format("YYYY-MM-DD")
      ) {
        endString = moment(end).format("YYYY-MM-DD") + "T00:00:00Z";
      } else {
        endString = moment(end).format("YYYY-MM-DD") + "T23:59:59Z";
      }

      getData(country, startString, endString)
        .then((res) => {
          setData(res);
        })
        .catch((err) => alert("Error"));
    } else {
      alert("Required Field!!!");
    }
  };
  const handleStartDateChange = (date) => {
    setStart(date);
  };
  const handleEndDateChange = (date) => {
    setEnd(date);
  };

  return (
    <>
      <Head>
        <title>Corona Statictis</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <div className={style.container}>
        <div className={style.input_container}>
          <FormControl className={style.input} error={country === ""}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              onChange={onChangeCountry}
            >
              <MenuItem value="" disabled>
                Please select your country
              </MenuItem>
              <MenuItem value={"vietnam"}>Việt Nam</MenuItem>
              <MenuItem value={"japan"}>日本</MenuItem>
            </Select>
            <FormHelperText>Please select your country</FormHelperText>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="flex-start">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="start-date-picker-inline"
                label="Start Date"
                value={start}
                maxDate={end}
                onChange={handleStartDateChange}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="flex-start">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="end-date-picker-inline"
                label="End Date"
                value={end}
                minDate={start}
                maxDate={new Date()}
                onChange={handleEndDateChange}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <FormControl>
            <Button color="primary" onClick={handleClick}>
              Click!!
            </Button>
          </FormControl>
        </div>
        <Chart data={data}></Chart>
      </div>
    </>
  );
}
// export async function getServerSideProps() {
//   const data = await getData();
//   return { props: { data } };
// }
