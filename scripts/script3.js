d3.dsv(';','../data/dataset.csv', d3.autoType).then(data =>  {
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
                    fill: "rgb(220, 120, 30)",
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
                  text: (d) => `Hora pico: 22hs - 23hs`,
                  textAnchor: "top",
                  dy: -20,
                  fill: "rgb(220, 120, 30)",
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


  Plot.plot({
    marks: [
      Plot.line(
        data,
        Plot.windowY(
          { reduce: "mean", k: 7, anchor: "middle" },
          Plot.binX(
            { y: "sum" },
            { x: "date", y: "price_in_usd", thresholds: d3.utcDay }
          )
        )
      ),
      Plot.dot(
        data,
        Plot.selectMaxY(
          Plot.windowY(
            { reduce: "mean", k: 7, anchor: "middle" },
            Plot.binX(
              { y: "sum" },
              { x: "date", y: "price_in_usd", thresholds: d3.utcDay }
            )
          )
        )
      ),
      Plot.text(
        data,
        Plot.selectMaxY(
          Plot.windowY(
            { reduce: "mean", k: 7, anchor: "middle" },
            Plot.binX(
              { y: "sum", text: "first" },
              {
                x: "date",
                y: "price_in_usd",
                thresholds: d3.utcDay,
                text: (d) => `Peak sales: ${d3.utcFormat("%b %d")(d.date)}`,
                textAnchor: "middle",
                dy: -5
              }
            )
          )
        )
      )
    ],
    width: 714
  })
