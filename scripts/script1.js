const mapaFetch = d3.json('../data/barrios-caba.geojson')
const dataFetch = d3.dsv(';', '../data/dataset.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  /* Agrupamos reclamos x barrio */
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  

  barrios.features.forEach(d => {
    let nombreBarrio = d.properties.BARRIO
    let cantReclamos = reclamosPorBarrio.get(nombreBarrio).length
    d.properties.DENUNCIAS = cantReclamos
    console.log(nombreBarrio + ": " + cantReclamos)
  })
  
  
  let chartMap = Plot.plot({
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      n: 10,
      scheme: 'purples',
      label: 'Cantidad de denuncias',
      legend: true,
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => {
          let nombreBarrio = d.properties.BARRIO
          let cantReclamos = reclamosPorBarrio.get(nombreBarrio).length
          return cantReclamos
        },
        stroke: '#ccc',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
      Plot.text(
        barrios.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO,
          fill: (d) => d.properties.BARRIO == "PALERMO" ? "rgb(230, 230, 250)" : "black",
          fontWeight: "bold",
          fontSize: (d) => d.properties.DENUNCIAS > 400 ? 12 : 8,
          filter: (d) => d.properties.DENUNCIAS > 300,
          textAnchor: "center",
        })
      )
      
    ],
    height: 500,
    width: 500,
    marginTop: 2,
    marginBotton: 10,
    insetTop: 2,
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart').append(() => chartMap)
})
