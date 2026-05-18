const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const submitBtn =
    document.querySelector(".submit-btn");

  submitBtn.innerHTML =
    "กำลังบันทึก...";

  const data = {

    empId: empId.value,
    fullName: fullName.value,
    department: department.value,

    oldDate: oldDate.value,
    oldShift: oldShift.value,

    newDate: newDate.value,
    newShift: newShift.value,

    reason: reason.value

  };

  try {

    await fetch(CONFIG.API_URL, {

      method:"POST",

      mode:"no-cors",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(data)

    });

    result.innerHTML =
      "ส่งข้อมูลเรียบร้อยแล้ว";

    submitBtn.innerHTML =
      "บันทึกข้อมูล";

    form.reset();

  } catch(err){

    console.log(err);

    result.innerHTML =
      "เกิดข้อผิดพลาด";

    submitBtn.innerHTML =
      "บันทึกข้อมูล";
  }

});
