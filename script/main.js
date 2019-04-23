var data = (localStorage.getItem(notCompleted)) ? JSON.parse(localStorage.getItem(notCompleted)) : {
    completed: [],
    notCompleted: []
};
//console.log( JSON.parse(localStorage.getItem('notCompleted')));
var checkPhoto = '<i class="far fa-check-circle done todo"></i>';
var binPhoto = '<i class="far fa-trash-alt"></i>';

renderNotCompletedList();


document.getElementById('addItem').addEventListener('click', function () {
    var value = document.getElementById('itemName').value;
    if (value) {
        addItem(value);
    }
});

document.getElementById('itemName').addEventListener('keydown', function (e) {
    var value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
        addItem(value);
    }
});

function addItem(value) {
    addItemToDOM(value);
    document.getElementById('itemName').value = '';

    data.notCompleted.push(value);
    dataObjectUpdated();
}

function renderNotCompletedList() {
    if (!data.notCompleted.length && !data.completed.length) return;

    for (var i = 0; i < data.notCompleted.length; i++) {
        var value = data.notCompleted[i];
        addItemToDOM(value);
    }
    for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[i];
        addItemToDOM(value, true);
    }
}

function dataObjectUpdated() {
    localStorage.setItem('notCompleted', JSON.stringify(data));
}

function deleteItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'notCompleted') {
        data.notCompleted.splice(data.notCompleted.indexOf(value), 1);

    } else {
        data.completed.splice(data.completed.indexOf(value), 1);

    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function doneItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'notCompleted') {
        data.notCompleted.splice(data.notCompleted.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.notCompleted.push(value);
    }
    dataObjectUpdated();
    var target = (id === 'notCompleted') ? document.getElementById('completed') : document.getElementById('notCompleted');

    /*  if( id==='completed'){
          target = document.getElementById('completed');    
      }else{
          target = document.getElementById('notCompleted');
      }
      /*/
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

function addItemToDOM(text, complete) {
    var list = (complete) ? document.getElementById('completed') : document.getElementById('notCompleted');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('btnContainer');

    var bin = document.createElement('button');
    bin.classList.add('bin');
    bin.innerHTML = binPhoto;

    bin.addEventListener('click', deleteItem);


    var done = document.createElement('button');
    done.classList.add('done');
    done.innerHTML = checkPhoto;

    done.addEventListener('click', doneItem);

    buttons.appendChild(bin);
    buttons.appendChild(done);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}