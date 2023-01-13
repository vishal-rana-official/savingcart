showsaveTodo();
// function to add a todo in localstorage

function addtodo(input_title, input_description) {
    let c = new Date();
    let dataobj = {
        title: input_title,
        desc: input_description,
        saved_time: `${c.getDate()}-${c.getMonth() + 1}-${c.getFullYear()} || ${c.getHours()}:${c.getMinutes()}:${c.getSeconds()}`
    };
    let dataArr;
    if (!localStorage.getItem('saved'))
        dataArr = [];
    else
        dataArr = JSON.parse(localStorage.getItem('saved'));

    dataArr.push(dataobj);
    localStorage.setItem('saved', JSON.stringify(dataArr));

}

function addanoteEvent() {
    let titletext = document.querySelector('.inp-title').value;
    let desctext = document.querySelector('.inp-desc').value;
    if (titletext.length == 0 && desctext == 0)
        alert('please enter title and description')
    else if (titletext.length == 0)
        alert('please enter title')
    else if (desctext.length == 0)
        alert('please enter description')
    else {
        addtodo(titletext, desctext);
        clearinputs();
        showsaveTodo();
    }
}

//   add eventlistener to handle button - add note

document.querySelector('.add-note-btn').addEventListener('click', addanoteEvent);

// function for clear input

function clearinputs() {
    document.querySelector('.inp-title').value = '';
    document.querySelector('.inp-desc').value = '';
}

// event listener to handle clear button

document.querySelector('.clear-text-btn').addEventListener('click', clearinputs);

// function to show text when there is nothing in the saved list

function showtext(key, ele, message) {
    if (!localStorage.getItem(key)) {
        ele.innerHTML = `<p class="text-md-left my-4">${message}</p>`;
    }
}

// function to show saved todo list

function showsaveTodo() {
    let savedtodo = document.querySelector('.saved-todos');
    let carr = [], ihtml;
    if (!localStorage.getItem('saved'))
        carr = [];
    else {
        carr = JSON.parse(localStorage.getItem('saved'));
        for (let i = 0; i < carr.length; i++) {
            ihtml += `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h3 class="card-title">${carr[i].title}</h3>
              <h6 class="card-subtitle mb-2 text-muted">${carr[i].desc}</h6>
              <footer class="blockquote-footer" style="font-size: 0.75rem; margin-bottom: 0.5rem">Saved at : <cite title="Source Title">${carr[i].saved_time}</cite></footer>
              <button type="button" id="${i}" class="btn btn-warning delete-btn" onclick="deleteATodo(this.id)"><img
                                src="https://img.icons8.com/material-rounded/24/null/trash.png" /></button>
                        <button type="button" id="t-${i}" class="btn btn-success task-btn" onclick="taskComplete(this.id)"><img
                                src="https://img.icons8.com/ios-glyphs/24/null/task-completed.png" /></button>
            </div>
          </div>`
            console.log(`${carr[i].title}`)

        }
    }
    savedtodo.innerHTML = ihtml
    savedtodo.firstChild.remove();

    showtext('saved', savedtodo, 'nothing to show in the todo list...');
    // showcompletedtodo();


}


// function to handle the delete of a  desired event

function deleteATodo(index) {
    let tarr;
    if (!localStorage.getItem('saved'))
        tarr = [];
    else {
        tarr = JSON.parse(localStorage.getItem('saved'))
        tarr.splice(index, 1);
        localStorage.setItem('saved', JSON.stringify(tarr));
    }
    if (localStorage.getItem('saved') == '[]') {
        localStorage.removeItem('saved')

    }


    showsaveTodo();
}

// function to show complete todo task

function showcompletedtodo() {
    let completetodoelement = document.querySelector('.completed-todos')
    let ihtml, carr;
    if (!localStorage.getItem('completed'))
        carr = [];
    else
    {
        carr = JSON.parse(localStorage.getItem('completed'))

        for (let i = 0; i < carr.length; i++) {
            ihtml +=
                `<div class="container c-todo border border-success mt-3 py-2 px-3">
        <details style="position: relative;">
            <summary class="h5">${carr[i].title} 
            <button type="button" id=comp-${i} class="btn btn-warning c-delete-btn" onclick="deleteACompletedTodo(this.id)"><img class="c-delete-img"
                    src="https://img.icons8.com/material-rounded/24/null/trash.png" /></button>
            </summary>
            <p class="text-monospace">${carr[i].desc}</p>
            <footer class="blockquote-footer">Saved at : <cite title="Source Title">${carr[i].saved_time}</cite></footer>
            <footer class="blockquote-footer">Completed at : <cite title="Source Title">${carr[i].completed_time}</cite></footer>
        </details>
    </div>
    `
        }
    }
    completetodoelement.innerHTML=ihtml;
    completetodoelement.firstChild.remove();
    showtext('completed',completetodoelement,'nothing to show in the completed todo list...')

}
// showcompletedtodo();

//  function for completing a task 

function taskComplete(index) {
    const splitedindex = Number.parseFloat(index.split('t-')[1]);
    let c = new Date();

    let completetodoarr, savetodoarr = [];
    savetodoarr = JSON.parse(localStorage.getItem('saved'));

    let completedobj = {
        title: savetodoarr[splitedindex].title,
        desc: savetodoarr[splitedindex].desc,
        saved_time: savetodoarr[splitedindex].saved_time,
        completed_time: `${c.getDate()}-${c.getMonth() + 1}-${c.getFullYear()} || ${c.getHours()}:${c.getMinutes()}:${c.getSeconds()}`
    };
    if (!localStorage.getItem('completed'))
        completetodoarr = [];
    else
        completetodoarr = JSON.parse(localStorage.getItem('completed'));

    completetodoarr.unshift(completedobj);
    localStorage.setItem('completed', JSON.stringify(completetodoarr));
    savetodoarr.splice(splitedindex, 1)
    localStorage.setItem('saved', JSON.stringify(savetodoarr));

    if (localStorage.getItem('saved') == '[]')
        localStorage.removeItem('saved');

    showsaveTodo();

}

// function for deleting a completed task permanentely

function deleteACompletedTodo(index)
{
    let todoindex=Number.parseInt(index.split('comp-')[1]);
    let carr;
    if(!localStorage.getItem('completed'))
        carr=[];
    else{
        carr=JSON.parse(localStorage.getItem('completed'))
        carr.splice(todoindex,1);
        localStorage.setItem('completed',JSON.stringify(carr))
    }
    if(localStorage.getItem('completed')=='[]')
        localStorage.removeItem('completed');
    
    showsaveTodo();
    showcompletedtodo();
}

// function for handling display saved and display completed todo button

function displaycompletedtodo(){
    document.querySelector('.saved-todos').style.display='none';
    document.querySelector('.completed-todos').style.display='flex'
    showcompletedtodo();
}

function displaysavedtodo(){
    document.querySelector('.completed-todos').style.display='none';
    document.querySelector('.saved-todos').style.display='flex';
    showsaveTodo();
}

// function for delete all todo button

document.getElementById('deletealltodobtn').addEventListener('click',()=>{
    let c= confirm('do you really want to delete all the todos 🙄🙄🙄')

    if(c)
    {
        if(localStorage.getItem('saved'))
            localStorage.removeItem('saved')

        if(localStorage.getItem('completed'))
            localStorage.removeItem('completed')
    }


})

// enable dark mode function

// navbar navbar-dark bg-dark            btn-dark 

function enabledarkmode(){
    let dtext='Disable Dark Mode',
    darkbutton = document.getElementById('dark-mode-btn'),
    navbar=document.querySelector('.navbar'),
    jumbo=document.querySelector('.jumbotron'),
    inputbuttons=document.querySelectorAll('.form-control'),
    addbutton=document.querySelector('.add-note-btn'),
    clearbutton=document.querySelector('.clear-text-btn');


    if(darkbutton.innerText==dtext)
        darkbutton.innerText='Enable dark mode';
    else
        darkbutton.innerText=dtext;

    document.body.classList.toggle('dark');
    document.querySelector('.card-title').classList.toggle('cardtitledarkmode')

    tooglemultipleclasses(navbar,'navbar-dark bg-dark')
    tooglemultipleclasses(jumbo,'shadow-lg bg-dark')
    tooglemultipleclasses(inputbuttons[0],"dark")
    tooglemultipleclasses(addbutton,'btn-dark btn-outline-light')
    tooglemultipleclasses(clearbutton,'btn-dark btn-outline-light')


}
function tooglemultipleclasses(element,classes)
{
    let classarr=classes.split(" ");
    classarr.forEach(ele => {
        element.classList.toggle(ele)
    });
}

