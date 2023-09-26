
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
    var filteredTodos;
    // Create function to fetch the todos and populate the arrayOfTodos with the contents of the json being returned.
    // V1 back in action:
    const fetchTodos = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then( (response) => response.json())
        .then( (json) => arrayOfTodos = json)
        .catch( (error) => console.error(error))
    }

    // const fetchTodos = () => {
    //     return new Promise((resolve, reject) => {
    //         fetch('https://jsonplaceholder.typicode.com/todos')
    //             .then((response) => response.json())
    //             .then((json) => {
    //                 arrayOfTodos = json;
    //                 resolve(); // Resolve the promise when fetching is done
    //             })
    //             .catch((error) => reject(error));
    //     });
    // };
    // const logTodos = () => {
    //     console.log(arrayOfTodos);
    // }
    
    // Generate a table from the arrayOfTodos and populate the UI
    const createTableFromJSON = () => {
        // fetchTodos()
        // Testing
        // async removed from const createTableFromJSON = async () => {
        // if (arrayOfTodos.length < 3) {
        //     try {
        //         await fetchTodos(); // Wait for fetchTodos to complete
        //     } catch (error) {
        //         console.error(error);
        //         return; // Exit the function if there was an error fetching data
        //     }
        // }
        
        let todoList = document.querySelector(`#todo-list`);
        todoList.innerHTML = ""
        let table = document.createElement("table");

        console.log(arrayOfTodos);

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

                if (key === "completed") {
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = arrayOfTodos[i][key];
                    cell.appendChild(checkbox);
                } else {
                    // const checkbox = document.createElement("input");
                    // checkbox.type = "checkbox";
                    // cell.appendChild(checkbox);
                    cell.innerText = arrayOfTodos[i][key];
                }

                todo.appendChild(cell);
            }
            table.appendChild(todo);

        };
        todoList.appendChild(table);
    };

    /** Instead of simply filtering the values of the arrayOfTodos, I decided to make it run all the functions again. 
        This way I avoid the problem of having the user click on the two buttons one after another and return no values
        
        Addendum: I realized I needed the complete and incomplete functions to pull from a filtered table. So I'm making if/else statements for each to fetchTodos() if there is nothing in filteredTodos.**/

        const filterTable = () => {
            fetchTodos();
            const userIdInput = document.getElementById("filter");
            const userId = parseInt(userIdInput.value);
            if (isNaN(userId) || userId < 1 || userId > 10) {
                alert("Please enter a valid user ID between 1 and 10.");
                return; // Exit the function if the input is invalid
            };
    
            filteredTodos = arrayOfTodos.filter((todo) => todo.userId === userId);
            arrayOfTodos = filteredTodos;
            createTableFromJSON();
        };

    const completedToDos = () => {
        if (filteredTodos == null || filteredTodos == ''){
            fetchTodos();
            const completedTodos = arrayOfTodos.filter((todo) => todo.completed);
            arrayOfTodos = completedTodos;
        } else {
            arrayOfTodos = filteredTodos;
            const completedTodos = arrayOfTodos.filter((todo) => todo.completed);
            arrayOfTodos = completedTodos;
        }
        // const completedTodos = arrayOfTodos.filter((todo) => todo.completed);
        // arrayOfTodos = completedTodos;
        createTableFromJSON();
    };

    const incompleteToDos = () => {
        if (filteredTodos == null || filteredTodos == ''){
            fetchTodos();
        } else {
            arrayOfTodos = filteredTodos;
        }
        const completedTodos = arrayOfTodos.filter((todo) => !todo.completed);
        arrayOfTodos = completedTodos;
        createTableFromJSON();
    }

    const clearTodos = () => {
        arrayOfTodos = [];
        let todoList = document.querySelector(`#todo-list`);
        todoList.innerHTML = "";
    }