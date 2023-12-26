const getData = async () => {
  const response = await fetch('data.json');
  const results = await response.json();
  
  return results;
}

getData()
  .then(results => {
    console.log("Promise resolved:", results)
    const chartBox= document.querySelector('#chartBox').getContext('2d');
    
    //Statically generated data
    /*let days = [
      "mon",
      "tue",
      "wed",
      "thur",
      "fri",
      "sat",
      "sun",
    ];*/
    //let  spendings = [17.45, 34.91, 52.36, 31.07, 23.39, 43.28, 25.48];
    
    //Dynamically generated data
    var days = results.map(function(e) {
      return e.day;
    });
    var spendings = results.map(function(e) {
      return e.amount;
    });
    
    let spendingChart = new Chart(chartBox, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          {
          label: "Amount",
          data: spendings,
          backgroundColor: [
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
            "hsl(186, 34%, 60%)",
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
          ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        
        plugins:{
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        },
        
        scales: {
          y: {
            display: false,
            ticks: {
              beginAtZero: true
            }
          }, 
          x: {
            grid: {
              display: false,
              drawBorder: false
            }
          }
        },
        
        elements: {
          bar: {
            borderRadius: 6,
            borderSkipped: false
          }
        }
      }
    });
  })
  .catch(err => console.log("Promise rejected", err));

window.onload = getData;