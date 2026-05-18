const form =
document.getElementById("form");

const historyTable =
document.getElementById("historyTable");

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

  totalRequest.innerHTML = total;

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

    historyTable.innerHTML = "";

    total = rows.length;

    updateDashboard();

    rows.reverse();

    rows.forEach(row=>{

      historyTable.innerHTML +=
`
<tr>

  <td>${row[1]}</td>

  <td>${row[2]}</td>

  <td>${row[3]}</td>

  <td>${row[4]}</td>

  <td>${row[5]}</td>

  <td>${row[6]}</td>

  <td>${row[7]}</td>

</tr>
`;

    });

  }catch(err){

    console.log(err);

  }

}

loadHistory();

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
