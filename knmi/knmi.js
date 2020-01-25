let table;

function preload() {
  table = loadTable('http://weerlive.nl/api/json-data-10min.php?key=demo&locatie=Amsterdam', 'csv', 'header');
}


function setup() {
print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');

}


function draw() {

}
