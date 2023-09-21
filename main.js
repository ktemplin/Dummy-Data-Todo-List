
    // We'll pre-populate this array with a couple objects just so it's not undefined if your internet connection isn't working properly.

    /**
     * Initializes an array called 'arrayOfTodos' with two objects representing todo items.
     **/
    let arrayOfTodos = [
        {
        "userId": 14,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    },
    {
        "userId": 20,
        "id": 2,
        "title": "delectus aut autem",
        "completed": false
    }];
    
    const fetchTodos = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then( (response) => response.json())
        .then( (json) => arrayOfTodos = json)
        .catch( (error) => console.error(error))
    };
    // const logTodos = () => {
    //     console.log(arrayOfTodos);
    // }
    
    const createTableFromJSON = () => {
        let todoList = document.querySelector(`#todo-list`);
        let table = document.createElement("table");

        let headerRow = document.createElement("tr");
        for (let key in arrayOfTodos[0]) {
            let headerCell = document.createElement("th");
            headerCell.innerText = key;
            headerRow.appendChild(headerCell);
        
        }
        table.appendChild(headerRow);

        for (let i=0; i < arrayOfTodos.length; i++) {
            let todo = document.createElement('tr');
            for (let key in arrayOfTodos[i]) {
                let cell = document.createElement("td");
                cell.innerText = arrayOfTodos[i][key];
                todo.appendChild(cell);
            }
            table.appendChild(todo);
            
            // todo.textContent = arrayOfTodos[i].title;

            // todoList.appendChild(todo);
        };
        todoList.appendChild(table);
    };