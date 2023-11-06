    // fields
const menu_buttons = document.getElementById('menu_buttons');
const viewportElement = document.getElementById('viewport');
var tboxes = [];
var new_text_bool = false;
var edit_text_bool = false;
let prompt_count = 0;
let edit_prompt_count = 1;
const prompt_container = document.getElementById("prompt_container");
const edit_prompt_container = document.getElementById("edit_prompt_container");

function newTextBox(btn) {
    if (new_text_bool === false && edit_text_bool === false) {
        new_text_bool = true;
        document.getElementById("new_tbox_form").style.display = "block";
        btn.removeEventListener('click', () => newTextBox(btn));
        const form = document.getElementById("new_tbox");
        form.addEventListener("submit", handleSubmit);
        const add_prompt = document.getElementById("prompt_btn");
        add_prompt.addEventListener("click", addPromptField);
        const new_close = document.getElementById("close_new");
        new_close.addEventListener("click", () => closeNewBox(form, handleSubmit));
        
        function handleSubmit(event) {
            event.preventDefault();
            // New feature checks to make sure name field is not empty (needs to be added to edit_form)
            tbox_name = document.getElementById('tbox_name').value;
            if (document.getElementById('tbox_name').value === "") {
                alert('Please enter Scene name');
                return;
            }
            this_box_id = document.getElementById('tbox_id').value;
            // New feature checks to make sure scene id is unique (needs to be added to edit_form)
            for (let i = 0; i < tboxes.length; i++) {
                if (parseInt(tboxes[i][0]) === parseInt(this_box_id)) {
                alert('Scene ID must be unique!');
                return;
            }
            }
            if (tboxes.indexOf(document.getElementById('tbox_id')) === -1) {

            }
            const new_tbox = document.createElement('button');
            const prompt_field = prompt_container.querySelectorAll("input");
            const prompt_fields = [];
            for (i = 0; i < prompt_field.length-1; i+=2) {
                prompt_fields.push([prompt_field[i].cloneNode(true), prompt_field[i+1].cloneNode(true)]);
            }

            const tbox = [this_box_id, tbox_name, document.getElementById('tbox_text').value, prompt_fields];
            tboxes.push(tbox);
            new_tbox.innerText = tbox[0] + ": " + tbox[1];

            const tableBody = document.getElementById('tableBody');
            const newRow = tableBody.insertRow(tableBody.rows.length);
            const cell = newRow.insertCell(0);
            cell.appendChild(new_tbox);
            new_tbox.addEventListener('click', () => editTextBox(tbox, new_tbox));

            document.getElementById("new_tbox_form").style.display = "none";
            form.removeEventListener("submit", handleSubmit);
            add_prompt.removeEventListener("click", addPromptField);
            new_close.removeEventListener("click", closeNewBox)
            new_text_bool = false;
            form.reset();

            // remove prompt fields
            while (prompt_container.firstChild) {
                prompt_container.removeChild(prompt_container.lastChild);
            }

            prompt_count = 0;
        }
    }
}

function closeNewBox(form, handleSubmit)
{
    document.getElementById("new_tbox_form").style.display = "none";
    new_text_bool = false;
    form.reset();

    // remove prompt fields
    while (prompt_container.firstChild) {
        prompt_container.removeChild(prompt_container.lastChild);
    }
    prompt_count = 0;
    form.removeEventListener("submit", handleSubmit);
}


function editTextBox(tbox, btn) {
    if (edit_text_bool === false && new_text_bool === false ) {
        edit_text_bool = true;
        document.getElementById("edit_tbox_form").style.display = "block";
        document.getElementById("edit_id").value = tbox[0];
        original_id = tbox[0];
        document.getElementById("edit_name").value = tbox[1];
        document.getElementById("edit_text").value = tbox[2];
 
        for (let i = 0; i < tbox[3].length; i++) {
            displayPromptFields(tbox[3][i][0], i);
            displayConnectionFields(tbox[3][i][1], i);
        }
 
        edit_prompt_count = tbox[3].length;
        const add_edit_prompt = document.getElementById("prompt_btn_edit");
        add_edit_prompt.addEventListener("click", addEditPromptField);
        const edit_form = document.getElementById("edit_tbox");
        edit_form.addEventListener("submit", handleEdit);
        const edit_close = document.getElementById("close_edit");
        edit_close.addEventListener("click", () => closeEditBox());



        // handles the submitted edit form
        function handleEdit(event) {
            event.preventDefault();
 
            edit_name = document.getElementById('edit_name').value;
            if (edit_name === "") {
                alert('Please enter Scene name');
                return;
            }
            edit_id = document.getElementById('edit_id').value;
            // New feature checks to make sure scene id is unique (needs to be added to edit_form)
            for (let i = 0; i < tboxes.length; i++) {
                if (parseInt(tboxes[i][0]) === parseInt(edit_id) && parseInt(edit_id) !== parseInt(original_id)) {
                    alert('Scene ID must be unique!');
                    return;
                }
            }
 
 
            const edit_prompt_container = document.getElementById("edit_prompt_container");
            const prompt_fields = edit_prompt_container.querySelectorAll("input");
            tbox[0] = document.getElementById("edit_id").value;
            tbox[1] = document.getElementById("edit_name").value;
            tbox[2] = document.getElementById("edit_text").value;
            btn.innerText = tbox[0] + ": " + tbox[1];
 
            // hide edit form
            document.getElementById("edit_tbox_form").style.display = "none";
            edit_form.removeEventListener("submit", handleEdit);
            add_edit_prompt.removeEventListener("click", addEditPromptField(tbox));
            let j = 0;
            for (let i = 0; i < prompt_fields.length-1; i+=2) {
                if (prompt_fields[i].value !== undefined && prompt_fields[i+1].value !== undefined) {
                    if (tbox[3].length - 1 < j) {
                        tbox[3].push([]);
                    }
                    tbox[3][j][0] = prompt_fields[i];
                    tbox[3][j][1] = prompt_fields[i+1];
                    j++;
                }
            }
            edit_text_bool = false;
            while (edit_prompt_container.firstChild) {
                edit_prompt_container.removeChild(edit_prompt_container.lastChild);
            }
        }

        function closeEditBox()
        {
            document.getElementById("edit_tbox_form").style.display = "none";
            edit_text_bool = false;
            edit_form.removeEventListener("submit", handleEdit);
            add_edit_prompt.removeEventListener("click", addEditPromptField);
            
            // remove prompt fields
            while (edit_prompt_container.firstChild) {
                edit_prompt_container.removeChild(edit_prompt_container.lastChild);
            }
        }
    }
}

// helper function for adding a new prompt when making a new text box
function addPromptField() {

    if (prompt_count < 10) {
        prompt_count++;
        const new_label_1 = document.createElement("label");
        new_label_1.textContent = "Prompt " + prompt_count + ": ";
        const new_label_2 = document.createElement("label");
        new_label_2.textContent = " Connection " + prompt_count + ": ";
        const new_prompt = document.createElement("input");
        new_prompt.type = "text";
        new_prompt.name = "prompt" + prompt_count;
        const new_connection = document.createElement("input");
        new_connection.type = "number";
        new_connection.name = "connection" + prompt_count;

        const delete_button = document.createElement("button");
        delete_button.type = "button";
        delete_button.textContent = "Delete";
        delete_button.addEventListener("click", () => deleteScene());


        prompt_container.appendChild(new_label_1);
        prompt_container.appendChild(new_prompt);
        prompt_container.appendChild(new_label_2);
        prompt_container.appendChild(new_connection);
        prompt_container.appendChild(delete_button);


        const breaker = document.createElement("br");
        prompt_container.appendChild(breaker);

    }
}

function deleteScene() {
    console.log("Got hhhhhhere!");
}

// helper function for adding a new prompt when editing an existing text box
function addEditPromptField() {
    if (edit_prompt_count < 10) {
        edit_prompt_count++;
        const new_label_1 = document.createElement("label");
        new_label_1.textContent = " Prompt " + edit_prompt_count + ": ";
        const new_label_2 = document.createElement("label");
        new_label_2.textContent = " Connection " + edit_prompt_count + ": ";
        const new_prompt = document.createElement("input");
        new_prompt.type = "text";
        new_prompt.name = "prompt" + edit_prompt_count;
        const new_connection = document.createElement("input");
        new_connection.type = "number";
        new_connection.name = "connection" + edit_prompt_count;
        edit_prompt_container.appendChild(new_label_1);
        edit_prompt_container.appendChild(new_prompt);
        edit_prompt_container.appendChild(new_label_2);
        edit_prompt_container.appendChild(new_connection);
        const breaker = document.createElement("br");
        edit_prompt_container.appendChild(breaker);
    }
}

// helper function for displaying the prompt text
function displayPromptFields(item, index) {
    index += 1;
    const new_label_1 = document.createElement("label");
    new_label_1.textContent = " Prompt " + index  + ": ";
    const new_prompt = document.createElement("input");
    new_prompt.type = "text";
    new_prompt.name = "prompt" + prompt_count;
    new_prompt.value = item.value;
    edit_prompt_container.appendChild(new_label_1);
    edit_prompt_container.appendChild(new_prompt);
}

// helper function for connecting the prompt to a new textbox ID
function displayConnectionFields(item, index) {
    index +=1;
    const new_label_2 = document.createElement("label");
    new_label_2.setAttribute("for", "edit_connection" + index);
    new_label_2.textContent = " Connection " + index  + ": ";
    const new_connection = document.createElement("input");
    new_connection.type = "number";
    new_connection.name = "connection" + prompt_count;
    new_connection.value = item.value;
    edit_prompt_container.appendChild(new_label_2);
    edit_prompt_container.appendChild(new_connection);
    const breaker = document.createElement("br");
    edit_prompt_container.appendChild(breaker);
}


// main starter function
function startPage() {
    const new_tbox_btn = document.getElementById('new_text');
    new_tbox_btn.addEventListener('click', () => newTextBox(new_tbox_btn));
}

startPage();