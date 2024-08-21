// object
const task = {
    id: 0,
    name: 'Almoço',
    time: '10:30',
    label: 'work',
    done: true
  }
  
  
  // Array of list of task
  let listTasks = [
    task, 
    {
      id: 1,
      name: 'Academia em grupo',
      time: '11:00',
      label: 'work',
      done: false
    },
    {
      id:2,
      name: 'Gaming session',
      time: '11:30',
      label: 'work',
      done: true
    }
  ]
  
  // Task
  const createTask = (task) => {
    let input = `
    <input 
    onchange="taskDone(event)"
    value="${task.id}"
    type="checkbox" 
    `
  
    if(task.done) {
      input += 'checked'
    }
  
    input += '>'
  
  
    return `
    <div class="card-bg">
      ${input}
  
      <div>
        
        <i class="fa-solid fa-circle-check active"></i>
  
        <i class="fa-regular fa-circle-check inactive"></i>
  
        <span>${task.name}</span>
        
        </div>
  
      <span>${task.time }</span>
    <div class="label">
    <span>${task.label}</span>
    </div>
    
    </div>
    
    
    `
  }
  
  
    const updateTaskList = () => {
      const section = document.querySelector('section')
      section.innerHTML = ''
      
      // Check if array is empty
      if (listTasks.length == 0) {
        section.innerHTML = `<p>No tasks for today</p>`
        return
      }
  
      for(let task of listTasks) {
        section.innerHTML += createTask(task)
      }
  }
  
  updateTaskList()
  
  const taskUpdate = (event) => {
    event.preventDefault()
    const formDetails = new FormData(event.target)
  
    const name = formDetails.get('task')
    const label = formDetails.get('label')
    const time = formDetails.get('time')
    const id = listTasks.length + 1 ;
   
  
    const newTask = {
      id,
      name,
      label,
      time,
      done: false
    }
  
    const duplicateTask = listTasks.find((task) => {
      return task.time == newTask.time
    })
  
    if (duplicateTask) {
      return alert('Time not available')
    }
  
    listTasks = [newTask, ...listTasks]
    updateTaskList()
  }
  
  
  
  const taskTimes = () => {
    let hours = ''
  
    for (let i = 6; i < 23; i++) {
      const hora = String(i).padStart(2, '0')
      hours += `
        <option value="${hora}:00">${hora}:00</option>
      `
      hours += `
        <option value="${hora}:30">${hora}:30</option>
      `
    }
  
    document.querySelector('select[name="time"]').innerHTML = hours
  }
  taskTimes()
  
  const taskDone = (event) => {
    const input = event.target
    const dataDesteInput = input.value
  
    const task = listTasks.find((task) => {
      return task.id == dataDesteInput
    })
  
    if (!task) {
      return
    }
  
    task.done = !task.done
  }