const autocomplete_list = `
<ul class="autocomplete_items"></ul>
`

const autocomplete_entry = (item) => `
<li class="autocomplete_entry">${item}</li>
`

$(document).ready(() => {
    add_input_click();
    $(document).click(close_all_lists);
});

function add_input_click() {
    $('#table textarea').on('input', display_entries);
};

function display_entries() {
    let val = this.value;
    /* Close any open autocomplete lists */
    close_all_lists();
    /* If input value is empty, exit the list */
    if(!val) {return false;}
    /* Create div to contain autocomplete items*/
    let list = document.createElement('ul');
    list.setAttribute('class', 'autocomplete_items');
    this.parentNode.appendChild(list);
    /* Check for matching entries in the monsters array */
    for(let i = 0; i < monsters.length; i++) {
        /* Create substring of monster name of equal length to input value */
        let monster_name = monsters[i].name
        let name_substring = monster_name.substr(0, val.length).toUpperCase();
        /* Compare */
        if(name_substring != val.toUpperCase()) {continue;}
        /* Create list element for entry */
        let entry = document.createElement('li');
        entry.setAttribute('class', 'autocomplete_entry');
        entry.innerHTML = monster_name;
        list.appendChild(entry);
    };
    /* Add click event to list entries */
    $('.autocomplete_entry').click(autocomplete);
};

function close_all_lists() {
    $('.autocomplete_items').remove();
};

function autocomplete() {
    /* Fetch monster data from array */
    let name = this.textContent;
    let monster = monsters.find(x => x.name === name);
    
    $(this).parents('tr').find('textarea').eq(0).val(name);
    $(this).parents('tr').find('input').eq(1).val(monster.AC);
    $(this).parents('tr').find('input').eq(2).val(monster.HP);

    resize_textarea($(this).parents('tr').find('textarea').eq(0));
    save_page();
};