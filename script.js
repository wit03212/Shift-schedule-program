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
    const res = await fetch(CONFIG.API_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

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
