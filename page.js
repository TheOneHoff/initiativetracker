$(document).ready(() => {
    if(localStorage.data) {reload_data()};
    $('#add_row').click(add_empty_row);
    $('#table tr td:last-child').click(remove_row);
    $('#next_row').click(highlight_next_row);
    $('#sort_rows').click(sort_rows);
    $('#delete_all').click(remove_all_rows);
    $('input').on('input', save_page);
    $('textarea').on('input', save_page);
    $('input[type=number]').on('keypress', prevent_non_numerical_input);
    $('textarea').each(function() {resize_textarea(this);});
    $('textarea').on('input', function() {resize_textarea(this);});
});

const row_html = `
<tr>
<td><input type='number'></input></td>
<td><textarea></textarea></td>
<td><input type='number'></input></td>
<td><input type='number'></input></td>
<td>close</td>
</tr>
`

function add_empty_row() {
    $('#table table tbody').append(row_html);
    $('#table tr:last-child td:last-child').click(remove_row);
    add_input_click();
    save_page();
};

function remove_row() {
    $(this).parent().remove();
    save_page();
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
    save_page();
};

function comparer(index) {
    return function(a, b) {
        var valA = get_cell_value(a, index), valB = get_cell_value(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
    };
};

function get_cell_value(row, index) {
    let temp = $(row).children('td').eq(index).children('input, textarea').val();
    return temp;
};

function remove_all_rows() {
    $('#table tr:not(:first-child)').remove();
    localStorage.rows = 0;
    localStorage.data = '';
};

function save_page() {
    let values = $('#table input, textarea').map(function() {return this.value}).get();
    localStorage.data = values;
    localStorage.rows = values.length / 4;
};

function reload_data() {
    let rows = localStorage.rows;
    let data = localStorage.data.split(',');
    for(let i = 0; i < rows; i++) {add_empty_row()};
    $('#table input, textarea').each(function(i) {
        $(this).val(data[i]);
    });
};

function prevent_non_numerical_input(e) {
    let character = String.fromCharCode(e.keyCode);

    if(!character.match(/^[0-9]+$/)) {
        e.preventDefault();
    };
};

function resize_textarea(element) {
    $(element).height(31);
    let scroll_height = $(element).prop('scrollHeight');
    $(element).height(scroll_height);
};