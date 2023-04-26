d3.dsv(';','data/dataset.csv', d3.autoType).then(data =>  {
    console.log(data)

    let filteredData = data.filter(d => d["domicilio_barrio"] === "PALERMO");
    console.log(filteredData);
    
      let chart = Plot.plot({
        marks: [
          Plot.line(filteredData, 
            Plot.binX(
              { y: "count", },
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
                  { y: "count"},
                  { x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
                    thresholds: d3.utcHour,
                    marker: "circle",
                    fill: "#f08a48",
                    r: 7,
                  }, 
                )
            )
          ),
          Plot.text(filteredData,
            Plot.selectMaxY(
              Plot.binX(
                { y: "count", text: "first" },
                {
                  x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
                  thresholds: d3.utcHour,
                  text: (d) => `22hs - 23hs`,
                  textAnchor: "top",
                  dy: -22,
                  fill: "#f08a48",
                  fontWeight: "bold"
                  
                }
              )
            )
          )
        ],

        width: 900,
        height: 500,
        insetLeft: 20,
        insetRight: 30,
        marginBottom: 40,
        marginTop: 10,
        marginRight: 30,
        marginLeft: 30,

        style: {
          fontFamily: "Montserrat",
          fontSize: 16,
          color: 'black',
          fontWeight: 400,
        },
        y: {
          grid: true,
          label: '',
          labelOffset: 100,
          zero: true,
          domain: [0, 70],
          line: true,
          tickSize: 0,
          ticks: 8

        },
  
        x: {
          type: 'time',
          label: 'Hora',
          labelOffset: 50,
          tickFormat: d3.timeFormat('%H:%M'),
          line: true,
        },

        color: {
          range: ["#54288f", "#54288f"]
        }
      })
   
  
    d3.select("#chart3").append(() => chart);
  });

