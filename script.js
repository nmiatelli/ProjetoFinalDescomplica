document.addEventListener('DOMContentLoaded', () =>{
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImg = document.querySelector('.img-empty');
    const todosContainer = document.querySelector('.todos-container');
      
    //Tira a imagem ao criar lista de tarefas
    const toggleEmptyState = () => {
        const isEmpty = taskList.children.length === 0;

        if (isEmpty) {
            emptyImg.classList.remove('hidden');
            // todosContainer.style.width = '50%';
        } else {
            emptyImg.classList.add('hidden');
            // todosContainer.style.width = '100%';
        }
    };

    
    //Funções de criar e deletar tarefa
    const addTask = (text, completed = false) => {
       
        const taskText = text || taskInput.value.trim();
        if(!taskText) {
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : '' }>
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn">
                    <i class="fa-solid fa-pen-nib" style="color: #FFD43B;"></i>
                </button>
                <button class="delete-btn">
                    <i class="fa-regular fa-trash-can" style="color: #a80606ff;"></i>
                </button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');

        if(completed){
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto'; 
        
        });
        

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        })


        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
    };

    //Editar tarefa
    taskList.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-btn');
        if (!editBtn) return;

        const li = editBtn.closest('li');
        const span = li.querySelector('span');


        if(li.classList.contains('editing')){
            const input = li.querySelector('.edit-input');

            span.textContent = input.value.trim() || 'Tarefa sem nome';
            li.appendChild(span, input);

            li.classList.remove('editing');
            editBtn.innerHTML = `<i class="fa-solid fa-pen-nib" style="color: #FFD43B;"></i>
            `;
            return;           
        }

        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        input.classList.add('edit-input');

        li.replaceChild(input, span);
        input.focus();
        li.classList.add('editing');

        //troca o ícone
        editBtn.innerHTML=` <i class="fa-regular fa-floppy-disk" style="color: #FFD43B;"></i>`;

        //salva tarefa editada
        const saveEdit = () => {
            if(!li.classList.contains('editing')) return;

            span.textContent = input.value.trim() || 'Tarefa sem nome';
            li.replaceChild(span, input);

            li.classList.remove('editing');
            editBtn.innerHTML = ` <i class="fa-solid fa-pen-nib" style="color: #FFD43B;"></i>`;
            
        };

        input.addEventListener('keydown', (event) => {
            if(event.key === 'Enter') saveEdit();
        });

        input.addEventListener('blur', saveEdit);



    });
  

    addTaskBtn.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
        e.preventDefault();
            addTask();
        }
    });
});