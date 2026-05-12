let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let salary = Number(localStorage.getItem("salary")) || 0;

const salaryInput = document.getElementById("salary");

const expenseName = document.getElementById("expense-name");

const expenseAmount = document.getElementById("expense-amount");

const addBtn = document.getElementById("add-btn");

const totalSalary = document.getElementById("total-salary");

const totalExpense = document.getElementById("total-expense");

const balance = document.getElementById("balance");

const expenseList = document.getElementById("expense-list");

let chart;

function updateUI(){

  totalSalary.innerText = `Salary: ₹${salary}`;

  let totalExp = 0;

  expenseList.innerHTML = "";

  expenses.forEach((expense,index)=>{

    totalExp += expense.amount;

    const li = document.createElement("li");

    li.innerHTML = `
      ${expense.name} - ₹${expense.amount}
      <button onclick="deleteExpense(${index})">
      Delete
      </button>
    `;

    expenseList.appendChild(li);

  });

  totalExpense.innerText = `Expenses: ₹${totalExp}`;

  const remaining = salary - totalExp;

  balance.innerText = `Balance: ₹${remaining}`;

  if(remaining < salary * 0.1){
    balance.style.color = "red";
  }else{
    balance.style.color = "black";
  }

  localStorage.setItem("expenses",JSON.stringify(expenses));

  localStorage.setItem("salary",salary);

  updateChart(totalExp,remaining);
}

addBtn.addEventListener("click",()=>{

  const sal = Number(salaryInput.value);

  const name = expenseName.value;

  const amount = Number(expenseAmount.value);

  if(sal <= 0 || amount <= 0 || name === ""){
    alert("Invalid Input");
    return;
  }

  salary = sal;

  expenses.push({
    name:name,
    amount:amount
  });

  updateUI();
});

function deleteExpense(index){

  expenses.splice(index,1);

  updateUI();
}

function updateChart(expense,remaining){

  const ctx = document.getElementById("myChart");

  if(chart){
    chart.destroy();
  }

  chart = new Chart(ctx,{
    type:'pie',

    data:{
      labels:['Expenses','Remaining'],

      datasets:[{
        data:[expense,remaining]
      }]
    }
  });
}

updateUI();