function login(){

  if(
    password.value !=
    CONFIG.ADMIN_PASSWORD
  ){

    alert("รหัสผ่านผิด");
    return;

  }

  adminArea.style.display =
    "block";

  loadData();

}

async function loadData(){

  const response =
    await fetch(CONFIG.API_URL);

  const data =
    await response.json();

  let html = "";

  data.forEach((row)=>{

    html += "<tr>";

    row.forEach((col)=>{

      html +=
        "<td>"+col+"</td>";

    });

    html += "</tr>";

  });

  table.innerHTML = html;

}

function exportCSV(){

  let csv = [];

  const rows =
    document.querySelectorAll("tr");

  rows.forEach((row)=>{

    const cols =
      row.querySelectorAll("td");

    let rowData = [];

    cols.forEach((col)=>{

      rowData.push(
        col.innerText
      );

    });

    csv.push(
      rowData.join(",")
    );

  });

  const blob =
    new Blob(
      [csv.join("\n")],
      {type:"text/csv"}
    );

  const link =
    document.createElement("a");

  link.href =
    window.URL
    .createObjectURL(blob);

  link.download =
    "shift-data.csv";

  link.click();

}
