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
                strokeOpacity: 0.6,
                stroke: "domicilio_barrio",
              }, 
            )
          ),
          Plot.dot(filteredData,
            Plot.selectMaxY(
                Plot.binX(
                  { y: "count", title: d => d[0].hora_ingreso },
                  { x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
                    thresholds: d3.utcHour,
                    marker: "circle",
                    fill: "rgb(220, 120, 30)",
                    r: 7
                  }, 
                )
            )
          ),
        ],

        width: 1000,
        height: 500,
        insetLeft: 40,
        insetRight: 40,
        marginBottom: 90,
        marginTop: 30,
        marginRight: 30,
        marginLeft: 100,

        style: {
          fontFamily: "Segoe UI",
          fontSize: 18,
          color: 'black',
          fontWeight: 400,
        },
        y: {
          grid: true,
          label: '',
          labelOffset: 100,
          zero: true,
          domain: [0, 65],

        },
  
        x: {
          type: 'time',
          label: 'Hora',
          labelOffset: 50,
          tickFormat: d3.timeFormat('%H:%M'),
        },

        color: {
          range: ["#54288f", "#54288f"]
        }
      })
   
  
    d3.select("#chart3").append(() => chart);
  });
