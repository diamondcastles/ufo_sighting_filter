// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
const filters = []

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    const element = d3.select(this)
    // 4b. Save the value that was changed as a variable.
    let value = d3.select(this).property("value");
    // 4c. Save the id of the filter that was changed as a variable.
    let element_id = d3.select(this).property("id");
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (element) {
      const obj = {id: element_id, value: value}
      filters.push(obj)
    }
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable(filters);
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    // console.log('Filters: ', filters)
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    for (var i = 0; i < filters.length; i++) {
      console.log('Filter: ', filters[i])
      const value = filters[i].value;
      if (filters[i].id === 'datetime') {
        console.log('Filter Present: Date')
        filteredData = filteredData.filter(row => row.datetime === value)
      }
      if (filters[i].id === 'city_input') {
        console.log('Filter Present: City')
        const cleaned = value.toLowerCase()
        filteredData = filteredData.filter(row => row.city === cleaned)
      }
      if (filters[i].id === 'state_input') {
        console.log('Filter Present: State')
        const cleaned = value.toLowerCase()
        filteredData = filteredData.filter(row => row.state === cleaned)
      }
      if (filters[i].id === 'country_input') {
        console.log('Filter Present: Country')
        const cleaned = value.toLowerCase()
        filteredData = filteredData.filter(row => row.state === cleaned)
      }
      if (filters[i].id === 'ufo_shape') {
        console.log('Filter Present: Shape')
        const cleaned = value.toLowerCase()
        filteredData = filteredData.filter(row => row.state === cleaned)
      }
    }  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData)
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll('.filter').on('change', updateFilters)
  
  // Build the table when the page loads
  buildTable(tableData);
