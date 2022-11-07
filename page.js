$(document).ready(() => {
    $('#add_row').click(add_empty_row);
    $('#table tr td:last-child').click(remove_row);
    $('#next_row').click(highlight_next_row);
    $('#sort_rows').click(sort_rows);
});

const row_html = `
<tr>
<td><input type='number'></td>
<td><input type='text' autocomplete="on"></td>
<td><input type='number'></td>
<td><input type='number'></td>
<td>close</td>
</tr>
`

function add_empty_row() {
    $('#table table tbody').append(row_html);
    $('#table tr td:last-child').click(remove_row);
};

function remove_row() {
    $(this).parent().remove();
}

function highlight_next_row() {
    let nextRow = $('table tr.active').next();
    $('table tr.active').removeClass('active');
    if(nextRow.length == 0) {
        $('#table tr:nth-child(2)').addClass('active');
    }
    else {
        $(nextRow).addClass('active');
    };
};

function sort_rows() {
    let table = $('#table table');
    let rows = table.find('tr').slice(1).toArray();
    rows.sort(comparer(0));
    rows.reverse();
    for (var i = 0; i < rows.length; i++){table.append(rows[i])};
    $('#table tr.active').removeClass('active');
    $('#table tr:nth-child(2)').addClass('active');
};

function comparer(index) {
    return function(a, b) {
        var valA = get_cell_value(a, index), valB = get_cell_value(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
    };
};

function get_cell_value(row, index) {
    return $(row).children('td').eq(index).children('input').val();
};