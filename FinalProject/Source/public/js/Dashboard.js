//<!-- Include Chart.js -->

// Example data
const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
const data = {
  labels: labels,
  datasets: [{
    label: 'Revenue',
    backgroundColor: '#fd3d57',
    borderColor: '#fd3d57',
    borderWidth: 1,
    data: [100, 200, 300, 400, 500, 600, 700], // Example revenue data
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

// Render the chart
const ctx = document.getElementById('totalRevenueChart').getContext('2d');
new Chart(ctx, config);