
const menu_buttons = document.getElementById('menu_buttons');
const viewportElement = document.getElementById('viewport');
// List of Text Box objects. Each scene/room is a "tbox" that holds info about its: ID, name, text(body), and some number between 0-10 of prompt/connections
// I would think that this entire list can eventually become the bulk of the JSON file used for playing games
var tboxes = [];

//A flag used to only allow user to have 1 "new text box" window open at a time
var new_text_bool = false;

// The counters for prompt/connection fields are, unintuitively, global variables, that get reset to the correct values upon entering "edit text box" and "new text box" forms.
// I had trouble passing variables into "addPrompt" functions so this was the ugly solution that worked.
// EDIT: If we did something like: "addEventListener(() => addEditPromptField(tbox))" that could probably take this tbox's list of prompt fields into the function
let prompt_count = 1;
let edit_prompt_count = 1;


const prompt_container = document.getElementById("prompt_container");
const edit_prompt_container = document.getElementById("edit_prompt_container");

// Displays the new text box form and creates a new text box when submitted
function newTextBox(btn) {    
    if (new_text_bool === false) {
        new_text_bool = true;
        document.getElementById("new_tbox_form").style.display = "block";
        btn.removeEventListener('click', () => newTextBox(btn));

        // Buttton for submitting form
        const form = document.getElementById("new_tbox");
        form.addEventListener("submit", handleSubmit);

        // Button for adding more prompt/connections
        const add_prompt = document.getElementById("prompt_btn");
        add_prompt.addEventListener("click", addPromptField);

        // Upon submitting form, we populate a tbox object with the user's input
        function handleSubmit(event) {
            event.preventDefault();
            var new_tbox = document.createElement('button');

            // This might be simplified if we just querySelect for input and not label, then we wouldn't need to iterate through prompt_field and select by type = "text/nubmer"
            const prompt_field = prompt_container.querySelectorAll("input, label");
            const prompt_fields = []

            for (i = 0; i < prompt_field.length; i++) {
                if (prompt_field[i].type === "text" || prompt_field[i].type === "number") {
                    const new_field = prompt_field[i].cloneNode(true); 
                    prompt_fields.push(new_field);
                }
            }

            // The tbox object holds all of the user's data for the scene, ID = unique number, name = text, text = text, prompt fields = list of prompt texts and connecting scene IDs
            // TODO: Force IDs to be unique and force connections to be an already exisiting ID number
            var tbox = [document.getElementById('tbox_id').value, document.getElementById('tbox_name').value, document.getElementById('tbox_text').value, 
            prompt_fields];
            tboxes.push(tbox);

            // Name the newly created button in viewport tbox.name
            new_tbox.innerText = tbox[1];

            const tableBody = document.getElementById('tableBody');
            const newRow = tableBody.insertRow(0);
            const cell = newRow.insertCell(0);
            cell.appendChild(new_tbox);

            new_tbox.addEventListener('click', () => editTextBox(tbox, new_tbox));
            document.getElementById("new_tbox_form").style.display = "none";
            form.removeEventListener("submit", handleSubmit);
            prompt_container.removeEventListener("click", addPromptField);
            new_text_bool = false;

            form.reset();

            for (i = 2; i < prompt_field.length; i++){
                prompt_container.removeChild(prompt_field[i]);
            }
            prompt_count = 1;
        }           
    }
}

// Editing text boxes is a lot like creating them, this time, we pre-populate the fields with already supplied info for this scene
function editTextBox(tbox, btn)
{
    // Displaying the user's info for ID, name, and text is as simple as reading it from tbox object
    document.getElementById("edit_tbox_form").style.display = "block";
    document.getElementById("edit_id").value= tbox[0];
    document.getElementById("edit_name").value= tbox[1];
    document.getElementById("edit_text").value= tbox[2];

    // Displaying propmts/connections requires a bit more work to get the label numbers right, these functions could probably be
    // cleverly refactored into one, but for now there are two functions: one for the prompts and one for the connections
    for(i = 0; i < tbox[3].length; i+=2){
        displayPromptFields(tbox[3][i], i);
        displayConnectionFields(tbox[3][i+1], i);
    }

    // Each prompt has to have a connection so we divide by 2 for the total number of pairs.
    edit_prompt_count = tbox[3].length / 2;

    const add_edit_prompt = document.getElementById("prompt_btn_edit");
    add_edit_prompt.addEventListener("click", addEditPromptField);


    const edit_form = document.getElementById("edit_tbox");
    edit_form.addEventListener("submit", handleEdit);


    // After the submit button is clicked, we save the new info into our tbox object and close the listeners so as not to make duplicates.
    function handleEdit(event) {
        event.preventDefault();
        const edit_prompt_container = document.getElementById("edit_prompt_container");
        const prompt_fields = edit_prompt_container.querySelectorAll("input, label");
        tbox[0] = document.getElementById("edit_id").value;
        tbox[1] = document.getElementById("edit_name").value;
        tbox[2] = document.getElementById("edit_text").value;
        btn.innerText = tbox[1];
        document.getElementById("edit_tbox_form").style.display = "none";
        edit_form.removeEventListener("submit", handleEdit);
        edit_prompt_container.removeEventListener("click", addEditPromptField);
        var j = 0;
        for (i = 0; i < prompt_fields.length; i++){
            if (prompt_fields[i].value !== undefined) {
                tbox[3][j] = prompt_fields[i];
                j++;
            }
            edit_prompt_container.removeChild(prompt_fields[i]);
        }
    }

}


// When inside the New Text Box window, clicking "Add Prompt" launches this function
function addPromptField(){
    if (prompt_count < 10) {
        prompt_count++;
        const new_label_1 = document.createElement("label");
        new_label_1.textContent = " Prompt " + prompt_count + ": ";

        const new_label_2 = document.createElement("label");
        new_label_2.textContent = " Connection " + prompt_count + ": ";

        const new_prompt = document.createElement("input");
        new_prompt.type = "text";
        new_prompt.name = "prompt" + prompt_count;
        const new_connection = document.createElement("input");
        new_connection.type = "number";
        new_connection.name = "connection" + prompt_count;
        prompt_container.appendChild(new_label_1);
        prompt_container.appendChild(new_prompt);
        prompt_container.appendChild(new_label_2);
        prompt_container.appendChild(new_connection);
    }
}

// When inside the Edit Text Box window, clicking add prompt launches this function
// This func and addPromptField() could be refactored so as to minimize duplicate code, but for now it works
function addEditPromptField(){
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
    }
}

// Populates the list of prompt fields with user's data, specifically just the prompts as they are text based
function displayPromptFields(item, index){
    const edit_prompt_container = document.getElementById("edit_prompt_container");
    const new_label_1 = document.createElement("label");
    new_label_1.textContent = " Prompt " + Math.ceil((index+1)/2) + ": ";

    const new_prompt = document.createElement("input");
    new_prompt.type = "text";
    new_prompt.name = "prompt" + prompt_count;
    new_prompt.value = item.value;
    edit_prompt_container.appendChild(new_label_1);
    edit_prompt_container.appendChild(new_prompt);
}

// Populates the list of connection fields with user's data, specifically just the connections as they are number based
// Again these functions could probably be refactored into one
function displayConnectionFields(item, index){
    const edit_prompt_container = document.getElementById("edit_prompt_container");
    const new_label_2 = document.createElement("label");
    new_label_2.setAttribute("for", "edit_connection" + (Math.ceil((index+1)/2)));
    new_label_2.textContent = " Connection " + (Math.ceil((index+1)/2)) + ": ";

    const new_connection = document.createElement("input");
    new_connection.type = "number";
    new_connection.name = "connection" + prompt_count;
    new_connection.value = item.value;
    edit_prompt_container.appendChild(new_label_2);
    edit_prompt_container.appendChild(new_connection);
}


// When the page is loaded we add an event listener to the new text box button
// TODO: Add event listener for delete and play buttons, when implemented
// TODO: Consider how to populate the page with a loaded game that already has scenes
function startPage() {
    new_tbox_btn = document.getElementById('new_text');
    new_tbox_btn.addEventListener('click', () => newTextBox(new_tbox_btn));
        
}


startPage();
