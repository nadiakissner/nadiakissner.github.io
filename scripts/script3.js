d3.dsv(';','../data/dataset.csv', d3.autoType).then(data =>  {
    console.log(data)

    let filteredData = data.filter(d => d["domicilio_barrio"] === "PALERMO");
    console.log(filteredData);
  
    let horas = d3.groups(filteredData, d => d.hora_ingreso)
      .map(d => {
        return {
          hora: d[0],
          sum: d[1].length,
        }
      });
    
      let chart = Plot.plot({
        marks: [
          Plot.line(horas, 
            // Plot.binX(
              { y: "sum",
                x: "hora"}, 
              // { x: "hora",  
              //   stroke: "rebecapurple",
              //   strokeWidth: 3,
              //   strokeOpacity: 0.3,
              //   marker: "circle",
              //   r: 3,
              // },
            )
          //)
        ],

        width: 800,
        height: 400,
        insetLeft: 40,
        insetRight: 40,
        marginBottom: 50,
        marginTop: 30,

        y: {
          grid: true,
          label: 'Reclamos',
          labelOffset: 75,
          zero: true
        },
  
        x: {
          label: 'Tiempo',
          labelOffset: 50,
          tickFormat: 'd',
        },
      })
   
  
    d3.select("#chart3").append(() => chart);
  });
  