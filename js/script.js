const todoForm = document.querySelector('#form-todo');
const author = document.getElementById('author');
const post = document.getElementById('post');

const todoTitle = document.querySelector('.todo__title');

const list = document.querySelector('.todo__list');


const base = {
    employee: 'Петров Сергей Иванович',
    todo: [
        {
            id: 'td1',
            author: 'Денис Петрович',
            post: 'Выполнить отгрузку пылесосов',
            ready: false,
        },
        {
            id: 'td2',
            author: 'Борис Федорович',
            post: 'Отправить бригаду починить оборудование',
            ready: true,
        }
    ],
    check (id) {
        console.log(id);
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


    todoForm.reset();
}

function createTodo(objTodo) {
    const listItem = `
            <article class="post">
                <h3 class="post__author">${objTodo.author}</h3>
                <p class="post__todo">${objTodo.post}</p>
                <button class="post__ready" type="button">✔</button>
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
    console.log(btn);
}

renderTodo();

todoForm.addEventListener('submit', addTodo);
list.addEventListener('click', checkTodo);