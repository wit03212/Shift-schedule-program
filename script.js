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

  result.innerHTML = "กำลังบันทึก...";

  try {
    await fetch(CONFIG.API_URL, {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});

result.innerHTML = "ส่งข้อมูลแล้ว";
form.reset();

    const json = await res.json();

    if (json.result === "duplicate") {
      result.innerHTML = "ข้อมูลซ้ำ";
      return;
    }

    result.innerHTML = "บันทึกสำเร็จ";
    form.reset();

  } catch (err) {
    result.innerHTML = "เกิดข้อผิดพลาด";
  }
});
