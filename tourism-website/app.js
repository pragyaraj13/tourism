// Save from index.html
function goToSelect() {
  const name = document.getElementById("name").value;
  const people = document.getElementById("people").value;
  const city = document.getElementById("city").value;

  if (!name || !people || !city) {
    alert("Please fill all fields!");
    return;
  }

  localStorage.setItem("name", name);
  localStorage.setItem("people", people);
  localStorage.setItem("city", city);

  window.location.href = "select.html";
}

// Save attractions and go to schedule
function goToSchedule() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  if (checkboxes.length !== 3) {
    alert("Please select exactly 3 attractions!");
    return;
  }
  const attractions = Array.from(checkboxes).map(cb => cb.value);
  localStorage.setItem("attractions", JSON.stringify(attractions));
  window.location.href = "schedule.html";
}

// Generate schedule
if (window.location.pathname.includes("schedule.html")) {
  const name = localStorage.getItem("name");
  const people = localStorage.getItem("people");
  const city = localStorage.getItem("city");
  const attractions = JSON.parse(localStorage.getItem("attractions"));

  const scheduleDiv = document.getElementById("schedule");

  let groups = 5;
  let maxPerGroup = 100;
  let groupNum = Math.floor(Math.random() * groups) + 1;

  let times = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

  let html = `<p class="text-lg"><b>${name}</b>, your group of <b>${people}</b> in <b>${city}</b> has been assigned to <b>Group ${groupNum}</b>.</p>`;
  html += "<ul class='list-disc pl-6 mt-3'>";
  attractions.forEach((place, i) => {
    html += `<li>${place} → ${times[i]}</li>`;
  });
  html += "</ul>";

  scheduleDiv.innerHTML = html;

  // Generate QR Code
  const ticketData = {
    name,
    people,
    city,
    group: groupNum,
    attractions,
  };
  QRCode.toCanvas(document.getElementById("qrCode"), JSON.stringify(ticketData), { width: 200 }, function (error) {
    if (error) console.error(error);
  });
}
