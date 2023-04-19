d3.dsv(';','../data/dataset.csv', d3.autoType).then(data =>  {
    console.log(data)

    let filteredData = data.filter(d => d["domicilio_barrio"] === "PALERMO");
    console.log(filteredData);
    
      let chart = Plot.plot({
        marks: [
          Plot.line(filteredData, 
            Plot.binX(
              { y: "count", title: d => d[0].hora_ingreso },
              { x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
                thresholds: d3.utcHour,
                strokeWidth: 3,
                strokeOpacity: 0.5,
                marker: "circle",
                r: 0.5,
                stroke: "domicilio_barrio",
              }, 
            )
          )
        ],

        width: 1000,
        height: 400,
        insetLeft: 40,
        insetRight: 40,
        marginBottom: 90,
        marginTop: 30,
        marginRight: 30,
        marginLeft: 100,

        y: {
          grid: true,
          label: 'Reclamos',
          labelOffset: 75,
          zero: true,
          domain: [0, 70]
        },
  
        x: {
          type: 'time',
          label: 'Hora',
          labelOffset: 50,
          tickFormat: d3.timeFormat('%H:%M'),
          ticks: 12
        },

        color: {
          range: ["#54288f", "#54288f"]
        }
      })
   
  
    d3.select("#chart3").append(() => chart);
  });
  