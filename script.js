const form =
document.getElementById("form");

const historyTable =
document.getElementById("historyTable");

const searchInput =
document.getElementById("searchInput");

const monthlyTotal =
document.getElementById("monthlyTotal");

const empId =
document.getElementById("empId");

const fullName =
document.getElementById("fullName");

const department =
document.getElementById("department");

const oldDate =
document.getElementById("oldDate");

const oldShift =
document.getElementById("oldShift");

const newDate =
document.getElementById("newDate");

const newShift =
document.getElementById("newShift");

const reason =
document.getElementById("reason");

const totalRequest =
document.getElementById("totalRequest");

let allRows = [];

let chart;
let currentPage = 1;

const rowsPerPage = 5;
/* =========================
   AUTO EMPLOYEE
========================= */

empId.addEventListener(
"change",
async()=>{

  if(!empId.value) return;

  try{

    const res =
    await fetch(

      `${CONFIG.API_URL}?action=employee&empId=${empId.value}`,

      {
        method:"GET",
        mode:"cors"
      }

    );

    const data =
    await res.json();

    if(data.found){

      fullName.value =
      data.fullName;

      department.value =
      data.department;

    }else{

      Swal.fire({

        icon:"warning",

        title:"ไม่พบข้อมูลพนักงาน"

      });

      fullName.value = "";
      department.value = "";

    }

  }catch(err){

    console.log(err);

  }

});

/* =========================
   DASHBOARD
========================= */

let total = 0;

function updateDashboard(){

  totalRequest.innerHTML =
  total;

}

/* =========================
   HISTORY
========================= */

async function loadHistory(){

  try{

    const res =
    await fetch(

      `${CONFIG.API_URL}?action=history`,

      {
        method:"GET",
        mode:"cors"
      }

    );

    const rows =
    await res.json();

    allRows =
    rows.reverse();

    renderTable(allRows);

    updateDashboard();

    updateMonthlySummary();

    createChart();

  }catch(err){

    console.log(err);

  }

}

/* =========================
   RENDER TABLE
========================= */

function renderTable(rows){

  historyTable.innerHTML =
  "";

  total = rows.length;

  const start =
  (currentPage - 1)
  * rowsPerPage;

  const end =
  start + rowsPerPage;

  const paginatedRows =
  rows.slice(start,end);

  paginatedRows.forEach(row=>{

    historyTable.innerHTML +=
    `
    <tr>

      <td>${row[1] || ""}</td>

      <td>${row[2] || ""}</td>

      <td>${row[3] || ""}</td>

      <td>${row[4] || ""}</td>

      <td>${row[5] || ""}</td>

      <td>${row[6] || ""}</td>

      <td>${row[7] || ""}</td>

    </tr>
    `;

  });

  renderPagination(rows);

}

function renderPagination(rows){

  const pageNumbers =
  document.getElementById(
    "pageNumbers"
  );

  pageNumbers.innerHTML =
  "";

  const totalPages =
  Math.ceil(
    rows.length / rowsPerPage
  );

  for(
    let i=1;
    i<=totalPages;
    i++
  ){

    const btn =
document.createElement(
  "button"
);

btn.type = "button";

    btn.innerText = i;

    if(i === currentPage){

      btn.classList.add(
        "active"
      );

    }

    btn.addEventListener(
      "click",
      ()=>{

        currentPage = i;

        renderTable(rows);

      }
    );

    pageNumbers.appendChild(btn);

  }

}

/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
"keyup",
()=>{

  const keyword =
  searchInput.value
  .toLowerCase();

  const filtered =
  allRows.filter(row=>{

    return (

      String(row[1] || "")
      .toLowerCase()
      .includes(keyword)

      ||

      String(row[2] || "")
      .toLowerCase()
      .includes(keyword)

    );

  });

  renderTable(filtered);

});

/* =========================
   MONTHLY SUMMARY
========================= */

function updateMonthlySummary(){

  const now =
  new Date();

  const currentMonth =
  now.getMonth();

  const currentYear =
  now.getFullYear();

  let count = 0;

  allRows.forEach(row=>{

    if(!row[9]) return;

    const parts =
    String(row[9]).split("-");

    const date =
    new Date(
      parts[0],
      parts[1] - 1,
      parts[2]
    );

    if(

      date.getMonth() ==
      currentMonth

      &&

      date.getFullYear() ==
      currentYear

    ){

      count++;

    }

  });

  monthlyTotal.innerHTML =
  count;

}

/* =========================
   CHART
========================= */

function createChart(){

  const employeeCount = {};

  allRows.forEach(row=>{

    const name =
    row[2];

    if(!name) return;

    if(!employeeCount[name]){

      employeeCount[name] = 0;

    }

    employeeCount[name]++;

  });

  /* เรียงมาก -> น้อย */

  const sorted =
  Object.entries(employeeCount)
  .sort((a,b)=> b[1] - a[1])
  .slice(0,10);

  const labels =
  sorted.map(item=> item[0]);

  const data =
  sorted.map(item=> item[1]);

  const canvas =
  document.getElementById(
    "shiftChart"
  );

  if(!canvas) return;

  const ctx =
  canvas.getContext("2d");

  if(chart){

    chart.destroy();

  }

  chart = new Chart(ctx, {

    type:"bar",

    data:{

      labels:labels,

      datasets:[{

        label:
        "จำนวนการขอเปลี่ยนรอบ",

        data:data,

        backgroundColor:[
          "#2563eb",
          "#10b981",
          "#9333ea",
          "#ec4899",
          "#f59e0b",
          "#06b6d4",
          "#84cc16",
          "#ef4444",
          "#8b5cf6",
          "#14b8a6"
        ],

        borderRadius:12

      }]

    },

    options:{

      responsive:true,

      plugins:{

        legend:{
          display:false
        }

      },

      scales:{

        y:{

          beginAtZero:true,

          ticks:{
            stepSize:1
          }

        }

      }

    }

  });

}

/* =========================
   SUBMIT
========================= */

form.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

document.body.classList.add(
"loading"
);

const submitBtn =
document.querySelector(
".submit-btn"
);

submitBtn.innerHTML =
`
<i class="fa-solid fa-spinner fa-spin"></i>
กำลังบันทึก...
`;

const data = {

  empId:empId.value,
  fullName:fullName.value,
  department:department.value,

  oldDate:oldDate.value,
  oldShift:oldShift.value,

  newDate:newDate.value,
  newShift:newShift.value,

  reason:reason.value

};

try{

  const res =
  await fetch(CONFIG.API_URL,{

    method:"POST",

    mode:"cors",

    headers:{
      "Content-Type":"text/plain"
    },

    body:JSON.stringify(data)

  });

  const result =
  await res.json();

  if(result.result == "duplicate"){

    Swal.fire({

      icon:"warning",

      title:"ข้อมูลซ้ำ",

      text:"มีการส่งคำขอนี้แล้ว"

    });

  }else{

    Swal.fire({

      icon:"success",

      title:"บันทึกสำเร็จ",

      text:"ส่งคำขอเรียบร้อยแล้ว",

      confirmButtonColor:"#2563eb"

    });

    form.reset();

    loadHistory();

  }

}catch(err){

  console.log(err);

  Swal.fire({

    icon:"error",

    title:"เกิดข้อผิดพลาด",

    text:"ไม่สามารถส่งข้อมูลได้"

  });

}

submitBtn.innerHTML =
`
<i class="fa-regular fa-floppy-disk"></i>
บันทึกข้อมูล
`;

document.body.classList.remove(
"loading"
);

});

/* =========================
   START
========================= */

loadHistory();
document
.getElementById("prevPage")
.addEventListener(
"click",
()=>{

  if(currentPage > 1){

    currentPage--;

    renderTable(allRows);

  }

});

document
.getElementById("nextPage")
.addEventListener(
"click",
()=>{

  const totalPages =
  Math.ceil(
    allRows.length /
    rowsPerPage
  );

  if(currentPage < totalPages){

    currentPage++;

    renderTable(allRows);

  }

});
