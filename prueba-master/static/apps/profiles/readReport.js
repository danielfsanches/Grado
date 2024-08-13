document.addEventListener('DOMContentLoaded', function () {

  function setCanvasSize(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
}

    
    // Variables para almacenar los nombres de los espacios académicos y las repeticiones totales
    var academicSpaces = [];
    var totalRepetitions = [];

    // Mapear los datos de la tabla para extraer nombres y totales
    tableData.forEach(function(row) {
        var spaceName = row[0];
        var totalRepetentes = row[row.length - 1];  // El último elemento es el total

        academicSpaces.push(spaceName);
        totalRepetitions.push(totalRepetentes);
    });
//   var academicSpaces = ['Cálculo', 'Algebra', 'Ecuaciones'];
//   var totalRepetitions = [500, 300, 400];

    setCanvasSize(document.getElementById('id_graph'), 300, 200);
  var ctx = document.getElementById('id_graph').getContext('2d');
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: academicSpaces,
          datasets: [{
              label: 'Total Repeticiones',
              data: totalRepetitions,
              backgroundColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
});
