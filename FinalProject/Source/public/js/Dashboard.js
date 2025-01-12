document.addEventListener("DOMContentLoaded", function () {
  const timeRangeFilter = document.getElementById("timeRange");
  const revenue = document.getElementById("revenue")

  const revenueData = JSON.parse(revenue.getAttribute('data-revenue'));

  // Chart.js
  const data = {
    labels: revenueData.period,
    datasets: [{
      label: 'Revenue',
      backgroundColor: '#fd3d57',
      borderColor: '#fd3d57',
      borderWidth: 1,
      data: revenueData.total,
    }]
  };

  // Chart configuration
  const config = {
    type: 'line', // You can change this to 'bar', 'pie', etc.
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Total Revenue Over Time'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const fetchRevenues = function (timeRange) {
    const params = new URLSearchParams({ ...timeRange });
    const url = `/?${params.toString()}`;
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const revenueData = JSON.parse(result.revenue);
        // Chart.js
        const data = {
          labels: revenueData.period,
          datasets: [{
            label: 'Revenue',
            backgroundColor: '#fd3d57',
            borderColor: '#fd3d57',
            borderWidth: 1,
            data: revenueData.total,
          }]
        };

        // Chart configuration
        const config = {
          type: 'line', // You can change this to 'bar', 'pie', etc.
          data: data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Total Revenue Over Time'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return '$' + value;
                  }
                }
              }
            }
          },
        };

        revenue.innerHTML = result.html;

        // Render the chart
        const ctx = document.getElementById('totalRevenueChart').getContext('2d');
        if (window.myChart instanceof Chart) {
          window.myChart.destroy();
        }
        window.myChart = new Chart(ctx, config);
        
      })
      .catch((error) => console.error("Error fetching revenue:", error));
  };

  timeRangeFilter.addEventListener("change", () => {
    const timeRange = timeRangeFilter.value;
    fetchRevenues({timeRange});
  });

  // Initial fetch of products (optional, if you want to load products on page load)
  const timeRange = timeRangeFilter.value;
  fetchRevenues({timeRange});
});