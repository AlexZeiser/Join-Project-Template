function dropdownMenu(i) {
    renderDropdownMenu(i);
}


function renderDropdownMenu(i) {
    for (let n = 0; n < contactData.length; n++) {
        showDropdownMenu(n, i);
    }
}


function showDropdownMenu(n, i) {
    let dropdownContainer = document.getElementById('dropdownMenu');

    dropdownContainer.innerHTML += /* html */`
        <div onclick="renderSelectedContact(${i}, ${n})" id="contact${n}" class="dropdownContent">
            <div class="dropdownInitialsAndName">
                <div id="dropdownInitials${n}"></div>
                <div class="dropdownContact">${contactData[n]['name']}</div>
            </div>
            <img id="dropdownCheckbox${n}" class="dropdownCheckbox" src="./img/checkbox.png">
        </div>
    `;
    renderDropdownInitials(n);
    renderAlreadySelectedContacts(n, i);
}


function renderDropdownInitials(n) {
    let name = contactData[n]['name'];
    let initials = name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0);
    showDropDownInitials(initials, n);
}


function showDropDownInitials(initials, n) {
    let assignedTo = document.getElementById(`dropdownInitials${n}`);
    let backgroundColor = colorPool[n % colorPool.length];

    assignedTo.innerHTML += /* html */`
        <div class="editInitials">
            <div id="initals${n}" class="popupInitials" style="background-color: ${backgroundColor};">${initials}</div>
        </div>
    `;
}


function renderAlreadySelectedContacts(n, i) {
    for (let o = 0; o < tasks[i]['assignedTo'].length; o++) {
        const contact = tasks[i]['assignedTo'][o];
        showAleardySelectedContact(contact, n);
    }
}


function showAleardySelectedContact(contact, n) {
    if (contact == contactData[n]['name']) {
        alreadySelectedContact(n);
    }
}


function alreadySelectedContact(n) {
    let contact = document.getElementById(`contact${n}`);
    let checkImage = document.getElementById(`dropdownCheckbox${n}`);

    contact.style.backgroundColor = '#2B3647';
    contact.style.color = 'white'
    checkImage.src = './img/checkboxClickedWhite.png';
}


function renderSelectedContact(i, n) {
    if (!tasks[i]['assignedTo'].includes(contactData[n]['name'])) {
        selectedContact(i, n);
    } else {
        unselectContact(i, n);
    }
    document.getElementById(`editInitials${i}`).innerHTML = '';
    renderEditAssignedTo(i);
}


function selectedContact(i, n) {
    tasks[i]['assignedTo'].push(contactData[n]['name']);

    let contact = document.getElementById(`contact${n}`);
    let checkImage = document.getElementById(`dropdownCheckbox${n}`);

    contact.style.backgroundColor = '#2B3647';
    contact.style.color = 'white'
    checkImage.src = './img/checkboxClickedWhite.png';

    saveTasks();
}


function unselectContact(i, n) {
    tasks[i]['assignedTo'].splice(n, 1); /* splice selected name not n */

    let contact = document.getElementById(`contact${n}`);
    let checkImage = document.getElementById(`dropdownCheckbox${n}`);

    contact.style.backgroundColor = 'white';
    contact.style.color = 'black'
    checkImage.src = './img/checkbox.png';

    saveTasks();
}


function openDropdownMenu() {
    document.getElementById('dropdownMenu').style.display = 'flex';
    let arrow = document.getElementById('arrow');

    if (arrow.src.includes("/img/dropdownArrow.png")) {
        arrow.src = "./img/liftupArrow.png";
    } else {
        arrow.src = "./img/dropdownArrow.png";
        document.getElementById('dropdownMenu').style.display = 'none';
        document.getElementById('editAssignedTo').value = '';
    }
}


function editSubtask(p, i) {
    let subtasks = document.getElementById(`subtasksContent${p}`);
    subtasks.style.backgroundColor = 'white';

    subtasks.innerHTML = /* html */`
        <input required id="subtasksInputContent${p}" class="subtasksEditInput">
            <div class="deleteAndDone">
                <img onclick="doneEditSubtask(${p}, ${i})" src="./img/done.png">
                <div class="subtasksImageSpacer"></div>
                <img onclick="deleteSubtask(${p}, ${i})" src="./img/delete.png">
            </div>
        </div>
    `;
    document.getElementById(`subtasksInputContent${p}`).value = `${tasks[i]['subtask'][p]}`;
}


function deleteSubtask(p, i) {
    tasks[i]['subtask'].splice(p, 1);

    document.getElementById(`editSubtasksList${i}`).innerHTML = '';
    renderEditSubtasksList(i);

    saveTasks();
    emptyContentSections();
    init();
}


function doneEditSubtask(p, i) {
    let subtask = document.getElementById(`subtasksInputContent${p}`).value;

    tasks[i]['subtask'][p] = subtask;

    saveTasks();
    document.getElementById(`editSubtasksList${i}`).innerHTML = '';
    renderEditSubtasksList(i);
}


function createNewSubtask(i) {
    let inputValue = document.getElementById(`editSubtasks${i}`).value;

    if (!inputValue == '') {
        tasks[i]['subtask'].push(inputValue);
        document.getElementById(`editSubtasks${i}`).value = '';

        document.getElementById(`editSubtasksList${i}`).innerHTML = '';
        renderEditSubtasksList(i);

        noFocusOnNewSubtask(i);
    }
}


function focusOnNewSubtask(i) {
    let input = document.getElementById(`editSubtasks${i}`);
    input.focus();

    document.getElementById(`closeAndDone${i}`).style.display = 'flex';
    document.getElementById('plus').style.display = 'none';
}


function noFocusOnNewSubtask(i) {
    let input = document.getElementById(`editSubtasks${i}`);
    input.blur();
    document.getElementById(`closeAndDone${i}`).style.display = 'none';
    document.getElementById('plus').style.display = 'flex';

}


function emptyInput(i) {
    let input = document.getElementById(`editSubtasks${i}`);
    input.focus();
    document.getElementById(`editSubtasks${i}`).value = '';
    noFocusOnNewSubtask(i);
}


function ok(i) {
    updateTitle(i);
    updateDescription(i);
    updateDueDate(i);
    saveTasks();
    emptyContentSections();
    init();
    document.getElementById('cardPopup').innerHTML = '';
    showCardPopup(i);
}


function updateTitle(i) {
    let title = document.getElementById(`editTitle${i}`).value;
    tasks[i]['title'] = null;
    tasks[i]['title'] = title;
}


function updateDescription(i) {
    let description = document.getElementById(`editDescription${i}`).value;
    tasks[i]['description'] = null;
    tasks[i]['description'] = description;
}


function updateDueDate(i) {
    let dueDate = document.getElementById(`editDueDate${i}`).value;
    tasks[i]['dueDate'] = null;
    tasks[i]['dueDate'] = dueDate;
}


function clickeddropdownCheckbox(l) {
    let checkbox = document.getElementById(`checkBoxButton${l}`);
    checkbox.src = "./img/checkbox_clicked.png";
}


function checkbox(i, l) {
    let checkbox = document.getElementById(`checkBoxButton${l}`);

    if (tasks[i]['doneSubtask'][l] == true) {
        tasks[i]['doneSubtask'][l] = false;
        tasks[i]['numberOfDoneSubtasks']++;
        clickedCheckbox(l);
    } else {
        tasks[i]['doneSubtask'][l] = true
        tasks[i]['numberOfDoneSubtasks']--;
        checkbox.src = "./img/checkbox.png"
    }
    saveTasks();
    renderSubtasks(i);
}


function clickedCheckbox(l) {
    let checkbox = document.getElementById(`checkBoxButton${l}`);
    checkbox.src = "./img/checkbox_clicked.png";
}