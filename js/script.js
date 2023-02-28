const todoForm = document.querySelector('#form-todo');
const author = document.getElementById('author');
const post = document.getElementById('post');

const todoTitle = document.querySelector('.todo__title');

const list = document.querySelector('.todo__list');


const base = {
    employee: 'Петров Сергей Иванович',
    todo: getTodoLS(),
    check (id) {
        for (let i = 0; i < base.todo.length; i++) {
            if (base.todo[i].id === id) {
                base.todo.ready = true;
            }
        };
    },

    addTodo(author, post) {
        const todo = {
            id: 'td' + (base.todo.length + 1),
            author,
            post,
            ready: false,
        };

        base.todo.push(todo)
        return todo;
    }
};


function addTodo(event) {
    event.preventDefault();

    const authorText = author.value;
    const postText = post.value;

    const objTodo = base.addTodo(authorText, postText);
    const todoLi = createTodo(objTodo);

    list.append(todoLi);
    setTodoLS();
    todoForm.reset();
}

function createTodo(objTodo) {
    const listItem = `
            <article class="post ${objTodo.ready ? 'post_complete' : ''}">
                <h3 class="post__author">${objTodo.author}</h3>
                <p class="post__todo">${objTodo.post}</p>
                ${!objTodo.ready ?
                `<button 
                class="post__ready" 
                type="button"
                data-id="${objTodo.id}"
                >✔</button>` :
                ''
            }
            </article>
    `;

    const li = document.createElement('li');
    li.classList.add('todo__list-item');
    li.innerHTML = listItem;
    return li;
}
    
function renderTodo () {
    for (let i = 0; i < base.todo.length; i++) {
        const todoLi = createTodo(base.todo[i])
        list.append(todoLi);
    }
}

function checkTodo(event) {
    const btn = event.target.closest('.post__ready');
    
    if (btn) {
        const post = btn.closest('.post');
        btn.remove();
        post.classList.add('post_complete');
        const id = btn.dataset.id;
        base.check(id);
        setTodoLS();
    }
    console.log(base.todo);
}

function getTodoLS() {
    if (localStorage.getItem('todo')) {
        return JSON.parse(localStorage.getItem('todo'));
    }

    return [];

}

function setTodoLS() {
    localStorage.setItem('todo', JSON.stringify(base.todo));
    
}


renderTodo();

todoForm.addEventListener('submit', addTodo);
list.addEventListener('click', checkTodo);