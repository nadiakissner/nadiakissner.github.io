
d3.dsv(';','../data/dataset.csv', d3.autoType).then(data =>  {
  

  let filteredData = data.filter(d => d["domicilio_barrio"] === "PALERMO");
  console.log(filteredData);

  let canales = d3.groups(filteredData, d => d.canal)
    .map(d => {
      return {
        canal: d[0],
        sum: d[1].length,
      }
    });

  let chart = Plot.plot({
    marks: [
      Plot.barX(canales, {
        x: 'sum',
        y: 'canal',
        sort: {y: 'x', reverse: true},
        fill: d => (d.canal === "App BA 147" ? "#54288f" :"#848484" && d.canal =="GCS Web" ? "#7567af" : "#848484"),
      }),
      Plot.text(canales, {
        x: d => d.sum + 5,
        y: 'canal',
        text: d => d.sum,
        textAnchor: "top",
        fontWeight: 'bold',
        fontSize: '24px',
        fill: d => (d.canal === "App BA 147" ? "#54288f" : "#848484" && d.canal =="GCS Web" ? "#7567af" : "#848484"),
        dy: -2,
        dx: 30
      }),
    ],

    width: 800,
    height: 400,
    marginLeft: 200,
    marginBottom: 80,
    insetLeft: 20,

    style: {
      fontFamily: "Segoe UI",
      fontSize: 18,
      color: 'black',
      fontWeight: 400,
    },
    x: {
      label: '',
      labelOffset: 50,
      ticks: 5,
      tickFormat: d => `${d}`,
      domain: [0, d3.max(canales, d => d.sum) * 1.1],
      tickSize: 0
    },
    y: {
      label: '',
      labelOffset: 150,
      tickSize: 0,
    },
  })

  d3.select("#chart2").append(() => chart);
});
