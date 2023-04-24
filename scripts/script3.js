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
                    r: 7,
                    text: (d) => `Reclamos: ${d3.utcFormat("%b %d")(d.date)}`,
                    textAnchor: "middle",
                  }, 
                )
            )
          ),
        ],

        width: 1000,
        height: 400,
        insetLeft: 40,
        insetRight: 40,
        marginBottom: 90,
        marginTop: 30,
        marginRight: 30,
        marginLeft: 50,

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
          tickSize: 0

        },
  
        x: {
          type: 'time',
          label: 'Hora',
          labelOffset: 50,
          tickFormat: d3.timeFormat('%H:%M'),
          line: true,
          ticks: 10,
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
