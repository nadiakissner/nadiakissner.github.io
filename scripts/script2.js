d3.csv('dataset.csv', d3.autoType).then(data => {
    let chart = Plot.plot({
      
      marks: [
        Plot.barX(data, 
          Plot.groupY(
          { x: 'sum'},
          { y: 'canal',
            x: 'denuncias',
            sort: {y: "x", reverse: true},
          })
        ),
        Plot.text(data, {
          x: 'cantidad',
          y: 'canal',
          text: 'canal',
          fontSize: 14,
          dy: -20,
        }),
        
      ],
      width: 800,
      height: 400,
      marginLeft: 160, 
      marginRight: 100,
      marginBottom: 50,
      marginTop: 10,
      zero: true,
  
      y: {
        label: '',
        labelOffset: 150,
        insetLeft: 5
      },
      x: {
        grid: true,
        label: 'Cantidad de denuncias',
        labelOffset: 40,
        insetLeft: 7,
        
      },
    
      style: {
        fontFamily: 'sans-serif',
        fontSize: 14,
        background: 'black',
        color: 'white',
      },
      
    
    })
    d3.select('#chart').append(() => chart)
  })
  

