import { Line } from "react-chartjs-2";
import * as moment from "moment";
export default function Chart(props) {
  const { data } = props;
  var d = data == null || data == undefined ? [] : data;
  var datasetsD = [];
  var datasetsC = [];
  var labels = [];
  if (d.length > 0) {
    for (let index = 0; index < d.length; index++) {
      const element = d[index];
      datasetsD.push(element["Deaths"]);
      datasetsC.push(element["Confirmed"]);
      labels.push(moment(element["Date"]).format("YYYY-MM-DD"));
    }
  }

  return (
    <Line
      data={{
        datasets: [
          {
            data: datasetsD,
            label: "Deaths",
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
          },
          {
            data: datasetsC,
            label: "Confirmed",
            backgroundColor: ["rgba(255, 206, 86, 0.2)"],
            borderColor: ["rgba(255, 206, 86, 1)"],
          },
        ],
        labels: labels,
      }}
    ></Line>
  );
}
