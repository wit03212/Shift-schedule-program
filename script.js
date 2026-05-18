const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

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

  result.innerHTML = "กำลังส่งข้อมูล...";

  try {

    await fetch(CONFIG.API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    result.innerHTML = "ส่งข้อมูลเรียบร้อยแล้ว";

    form.reset();

  } catch (err) {

    console.log(err);
    result.innerHTML = "เกิดข้อผิดพลาด";

  }
});
