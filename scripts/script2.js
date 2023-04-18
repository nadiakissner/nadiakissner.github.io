
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
        fill: d => (d.canal === "App BA 147" ? "rebeccapurple" :"#848484" && d.canal =="GCS Web" ? "purple" : "#848484"),
      }),
      Plot.text(canales, {
        x: d => d.sum + 5,
        y: 'canal',
        text: d => d.sum,
        textAnchor: "top",
        fontWeight: 'bold',
        fontSize: '14px',
        fill: d => (d.canal === "App BA 147" ? "rebeccapurple" : "#848484" && d.canal =="GCS Web" ? "purple" : "#848484"),
        dy: -2,
        dx: 15
      }),
    ],
    width: 800,
    height: 300,
    marginLeft: 200,
    marginBottom: 80,
    insetLeft: 20,
    style: {
      fontFamily: "Segoe UI",
      fontSize: 14,
      color: 'black',
      fontWeight: 400,
    },
    x: {
      label: 'Cantidad de denuncias',
      labelOffset: 50,
      ticks: 5,
      tickFormat: d => `${d}`,
      domain: [0, d3.max(canales, d => d.sum) * 1.1],
    },
    y: {
      label: 'Canal de denuncia',
      ticks: false,
      labelOffset: 150
    },
  })

  d3.select("#chart2").append(() => chart);
});
