const form = document.getElementById("form");

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

    // no-cors = ไม่ได้ response กลับ
    result.innerHTML = "ส่งข้อมูลแล้ว";
    form.reset();

  } catch (err) {
    console.log(err);
    result.innerHTML = "เกิดข้อผิดพลาด";
  }
});
