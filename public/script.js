function showInput(id) {
    const addBtn = document.querySelector(`.column-${id} #add-card`);
    const inputContainer = document.querySelector(`.column-${id} #inputContainer`);
  
    addBtn.style.display = "none";
    inputContainer.style.display = "block";
  }
  
  const month = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  
  function submitInput(id) {
    const userInput = document.querySelector(`.column-${id} #userInput`);
    const addBtn = document.querySelector(`.column-${id} #add-card`);
    const inputContainer = document.querySelector(`.column-${id} #inputContainer`);
    const inputValue = userInput.value;
  
    if (inputValue) {
      cardRender(inputValue, id);
    }
  
    inputContainer.style.display = "none";
    addBtn.style.display = "flex";
    userInput.value = "";
  }
  
  function cardRender(inputValue, id) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <h3 class="head">${inputValue}
          <i onClick="delTodo(this)"><img src="icons8-delete-key-32.png" alt="del"></i>
        </h3>
        <p>
          <textarea class="desc" onBlur="updateDescription(this)">${inputValue}</textarea>
        </p>
        <div class="priority">
          <select class="priority-select medium" onChange="updatePriority(this)">
            <option value="low" style="background-color: #2ecc71">Low</option>
            <option value="medium" style="background-color: #f39c12" selected>Medium</option>
            <option value="urgent" style="background-color: #e74c3c">Urgent</option>
          </select>
        </div>
        <div class="time">📅 ${month[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()} | ⏰ Just now</div>
      `;
  
    const column = document.querySelector(`.column-${id}`);
    const addBtn = document.querySelector(`.column-${id} #add-card`);
  
    column.insertBefore(card, addBtn);
  }
  
  function delTodo(element) {
    const card = element.closest(".card");
    card.remove();
  }
  
  function updateDescription(element) {
    const newDesc = element.value;
    element.textContent = newDesc; // Update the value of the description field
  }
  
  function updatePriority(element) {
    const selectedPriority = element.value;
    const prioritySelect = element;
  
    // Update background color based on priority
    if (selectedPriority === "low") {
      prioritySelect.style.backgroundColor = "#2ecc71"; // Green for low
    } else if (selectedPriority === "medium") {
      prioritySelect.style.backgroundColor = "#f39c12"; // Yellow for medium
    } else if (selectedPriority === "urgent") {
      prioritySelect.style.backgroundColor = "#e74c3c"; // Red for urgent
    }
  }
  