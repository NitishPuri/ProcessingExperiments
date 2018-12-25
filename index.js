
//##
// Populate index.html
//##

function process_data(data) {
  const all_lines = data.split(/\r\n|\n/);
  const headers = all_lines[0].split(',');
  let lines = [];

  // Read all the lines
  for (let i = 1; i < all_lines.length; i++) {
    let line = all_lines[i].split(',');
    if (line.length == headers.length) {
      let obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = line[j]
      }
      lines.push(obj)
    }
  }

  let keys = ['Name', 'Category', 'Tags']
  $('#contents-header').append(keys.map((k) => $(`<th>${k}</th>`)))

  // Add entries to list
  function createListItem(line) {
    let li = $('<tr></tr>');
    li.append($('<td></td>').append(`<a href=${line.url}>${line.name}</a>`))
    li.append($('<td></td>').append(`<span>${line.category}</span>`))
    li.append($('<td></td>').append(`<span>${line.tags}</span>`))
    return li
  }
  $('#contents').append(lines.map(createListItem));

}

$(document).ready(function () {
  // Setup search.
  $("#search_input").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    $("#contents tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  // Read CSV.
  $.get({
    url: "data/posts.csv",
    dataType: "text",
    success: process_data
  })
});
