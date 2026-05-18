const form =
document.getElementById("form");

form.addEventListener(
  "submit",
  async (e) => {

  e.preventDefault();

  const data = {

    empId:
      empId.value,

    fullName:
      fullName.value,

    department:
      department.value,

    oldDate:
      oldDate.value,

    oldShift:
      oldShift.value,

    newDate:
      newDate.value,

    newShift:
      newShift.value,

    reason:
      reason.value

  };

  result.innerHTML =
    "กำลังบันทึกข้อมูล...";

  try {

    const response =
      await fetch(
        CONFIG.API_URL,
        {
          method: "POST",

          body: JSON.stringify(data)
        }
      );

    const json =
      await response.json();

    if(json.result=="duplicate"){

      result.innerHTML =
        "ข้อมูลซ้ำ";

      return;

    }

    result.innerHTML =
      "บันทึกสำเร็จ";

    form.reset();

  } catch(error){

    result.innerHTML =
      "เกิดข้อผิดพลาด";

  }

});

function toggleDark(){

  document.body
    .classList.toggle("dark");

}
