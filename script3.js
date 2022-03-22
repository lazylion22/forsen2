google.charts.load('current', { 'packages': ['corechart'] });

const dates = ["09-08-2021", "10-08-2021", "11-08-2021", "12-08-2021","14-08-2021", "15-08-2021","16-08-2021", "17-08-2021", "18-08-2021","20-08-2021", "22-08-2021","24-08-2021","25-08-2021","27-08-2021","29-08-2021","30-08-2021","31-08-2021","01-09-2021","02-09-2021","03-09-2021"]
var loadedDates = []
dates.forEach((x) => {
  console.log(x)
  var a = document.getElementById("selectDates");
  var option = document.createElement("option");
  option.text = x;

  a.add(option);
  var div = document.createElement("div");
  var divID = x.replaceAll("-", "")
  div.id = divID
  div.style.display = "none"
  document.body.appendChild(div);
});
function showDiv(divDate) {
  var dl = document.getElementById("download")
  dl.href=divDate+".json"
  dl.style.display ="block"
  dl.innerHTML = "download "+ divDate+".json"
   document.getElementById("downloadAll").style.display="block"
  dates.forEach((x) => {
    var divID = x.replaceAll("-", "")
    document.getElementById(divID).style.display = "none"
  });
  document.getElementById("chart_div").style.display = "none"
  var divID = divDate.replaceAll("-", "")
  console.log("showing " + divID)
  document.getElementById(divID).style.display = "block"

}
function showMain() {
  var dl = document.getElementById("download")
  document.getElementById("downloadAll").style.display="none"

  dl.style.display = "none"
  dates.forEach((x) => {
    var divID = x.replaceAll("-", "")
    document.getElementById(divID).style.display = "none"
  });
  document.getElementById("chart_div").style.display = "block"

}
document.getElementById("selectDates").onchange = function () {
  var d = document.getElementById("selectDates").value;
  if (dates.includes(d)) {
    if (loadedDates.includes(d)) {
      showDiv(d)
    }
    else {
      console.log("d = " + d)
      document.getElementById("loading").style.display = "block"
      async function fetchjson() {
        const res = await fetch(d + ".json").catch((error) => {
          console.log(error)
        });
        const jfile = await res.json()

        // Object.entries(jfile).forEach(([key, value]) => {
        //   jDate = new Date(parseInt(value.mstime))
        //   data.addRows([[jDate, parseInt(value.percent)]])



        // });
        // console.log(jfile["1629223126000"].mstime)


        console.log("finished async")
        return jfile
      }
      fetchjson().then((jfile) => {
        console.log("drawing")
        drawChart2(d, jfile)
        document.getElementById("loading").style.display = "none"
      });
      loadedDates.push(d)


      showDiv(d)
      
    }
  }
  else {
    showMain()


  }
  
}


function drawChart2(divDate, jfile) {
  var divID = divDate.replaceAll("-", "")

  var data = new google.visualization.DataTable();

  data.addColumn('datetime', 'Time');
  data.addColumn('number', 'Percentage');


  var options = {
    title: capStr(streamer) + ' Jump King Progress ' + divDate,
    width: 1300,
    height: 500,
    focusTarget: 'category',
    crosshair: { orientation: 'vertical', trigger: 'focus' },
    explorer: {
      axis: 'horizontal',
      keepInBounds: true,
      maxZoomIn: 9.0
    },
    hAxis: {
      format: 'HH:mm:ss',
      gridlines: { count: 10 }
    },
    vAxis: {
      gridlines: { color: 'none' },
      minValue: 0
    }
  };


  var chart = new google.visualization.LineChart(document.getElementById(divID));
  console.log('here')

  Object.entries(jfile).forEach(([key, value]) => {
    jDate = new Date(parseInt(value.mstime))
    data.addRows([[jDate, parseInt(value.percent)]])

  });
  // console.log(jfile["1629223126000"].mstime)
  chart.draw(data, options);

}
