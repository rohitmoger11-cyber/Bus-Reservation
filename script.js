// ======== Elements ========
const routesEl = document.getElementById('routes');
const resultCount = document.getElementById('resultCount');
const ticketTable = document.getElementById('ticketTable');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const confirmBtn = document.getElementById('confirmBtn');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('themeToggle');
const fromEl = document.getElementById('from');
const toEl = document.getElementById('to');
const busTypeEl = document.getElementById('busType');
const dateEl = document.getElementById('date');
const qtyEl = document.getElementById('qty');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

// ======== Data ========
  const sampleRoutes = [
  { id: 1, operator: 'Coastal Express', from: 'Bengaluru', to: 'Udupi', depart: '22:15', arrive: '06:10', type: 'Sleeper', rating: 4.6, price: 899 },
  { id: 2, operator: 'Malnad Travels', from: 'Bengaluru', to: 'Mangaluru', depart: '21:30', arrive: '05:45', type: 'AC', rating: 4.3, price: 500 },
  { id: 3, operator: 'Ghat Roadlines', from: 'Shivamogga', to: 'Mangaluru', depart: '20:05', arrive: '02:40', type: 'Semi-Sleeper', rating: 4.1, price: 749 },
  { id: 4, operator: 'Konkan Rider', from: 'Karwar', to: 'Bengaluru', depart: '19:45', arrive: '05:55', type: 'Non-AC', rating: 3.9, price: 599 },
  { id: 5, operator: 'VRL Travels', from: 'Bengaluru', to: 'Hubballi', depart: '22:00', arrive: '05:00', type: 'Sleeper', rating: 4.7, price: 899 },
  { id: 6, operator: 'Durgamba Motors', from: 'Mangaluru', to: 'Udupi', depart: '08:30', arrive: '09:30', type: 'Non-AC', rating: 4.2, price: 199 },
  { id: 7, operator: 'Sugama Travels', from: 'Bengaluru', to: 'Karwar', depart: '19:30', arrive: '07:00', type: 'AC Sleeper', rating: 4.4, price: 1050 },
  { id: 8, operator: 'Canara Express', from: 'Udupi', to: 'Dharwad', depart: '06:00', arrive: '12:30', type: 'AC', rating: 4.3, price: 850 },
  { id: 9, operator: 'Mysore Travels', from: 'Bengaluru', to: 'Mysuru', depart: '18:00', arrive: '20:30', type: 'Non-AC', rating: 4.0, price: 299 },
  { id: 10, operator: 'Riverline Coaches', from: 'Shimoga', to: 'Bengaluru', depart: '21:15', arrive: '05:30', type: 'Sleeper', rating: 4.5, price: 799 },
   { id:11, operator: 'Shreekumar Travles', from: 'Bengaluru', to: 'Udupi', depart: '22:15', arrive: '06:10', type: 'Sleeper', rating: 4.6, price: 999 },
  { id:12, operator: 'Malnad Travels', from: 'Mangaluru', to: 'Bengaluru', depart: '21:30', arrive: '05:45', type: 'AC', rating: 4.3, price: 899 },
  { id:13, operator: 'Ghat Roadlines', from: 'Mangaluru', to: 'Shivamogga', depart: '20:05', arrive: '02:40', type: 'Semi-Sleeper', rating: 4.1, price: 749 },
  { id:14, operator: 'Konkan Rider', from: 'Karwar', to: 'Bengaluru', depart: '19:45', arrive: '05:55', type: 'Non-AC', rating: 3.9, price: 599 },
  { id:15, operator: 'VRL Travels', from: 'Bengaluru', to: 'Hubballi', depart: '22:00', arrive: '05:00', type: 'Sleeper', rating: 4.7, price: 899 },
  { id:16, operator: 'Durgamba Motors', from: 'Udupi', to: 'Mangaluru', depart: '08:30', arrive: '09:30', type: 'Non-AC', rating: 4.2, price: 199 },
  { id:17, operator: 'Sugama Travels', from: 'Karwar', to: 'Bengaluru', depart: '19:30', arrive: '07:00', type: 'AC Sleeper', rating: 4.4, price: 1050 },
  { id:18, operator: 'Shreekumar Travels', from: 'Udupi', to: 'Dharwad', depart: '06:00', arrive: '12:30', type: 'AC', rating: 4.3, price: 850 },
  { id:19, operator: 'Mysore Travels', from: 'Mysuru', to: 'Bengaluru', depart: '18:00', arrive: '20:30', type: 'Non-AC', rating: 4.0, price: 299 },
  { id:20, operator: 'Riverline Coaches', from: 'Shimoga', to: 'Bengaluru', depart: '21:15', arrive: '05:30', type: 'Sleeper', rating: 4.5, price: 799 },
   { id: 1, operator: 'EvoBus', from: 'Bengaluru', to: 'Mangaluru', depart: '22:15', arrive: '06:10', type: 'Sleeper', rating: 4.6, price: 989 },
    { id: 1, operator: 'Varad Lines', from: 'Bengaluru', to: 'Mangaluru', depart: '22:15', arrive: '05:10', type: 'Sleeper', rating: 4.6, price: 899 },

  
];



let currentSelection = null;
let dark = true;

// ======== Helpers ========
function skeleton(n){
  return Array.from({length:n}).map(()=>
    `<div class="route">\n  <div class="top"><span class="pill">Loading…</span><span class="price">&nbsp;</span></div>\n  <div class="meta">&nbsp;</div>\n</div>`
  ).join('');
}
function showToast(msg){
  toast.textContent = msg; toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 2200);
}
function persist(){
  const data = Array.from(ticketTable.querySelectorAll('tr'))
    .map(tr => Array.from(tr.children).map(td=>td.textContent));
  localStorage.setItem('bookings', JSON.stringify(data));
}
function restore(){
  const data = JSON.parse(localStorage.getItem('bookings')||'[]');
  data.forEach(cells => { const row = ticketTable.insertRow(); row.innerHTML = cells.map(c=>`<td>${c}</td>`).join(''); });
}

// ======== UI Render ========
function renderRoutes(list, date){
  resultCount.textContent = `${list.length} found`;
  routesEl.innerHTML = list.map(r => routeCard(r, date)).join('');
}
function routeCard(r, date){
  return `<div class="route">\n    <div class="top"><strong>${r.operator}</strong><span class="price">₹${r.price}</span></div>\n    <div class="meta">${r.from} → ${r.to} • ${r.type} • ⭐ ${r.rating} • ${r.depart} → ${r.arrive}</div>\n    <div class="actions-row" style="margin-top:10px;">\n      <button class="btn" onclick='openModal(${JSON.stringify(JSON.stringify(r))}, ${JSON.stringify(date)})'>View</button>\n      <button class="btn primary" onclick='openModal(${JSON.stringify(JSON.stringify(r))}, ${JSON.stringify(date)})'>Book</button>\n    </div>\n  </div>`
}

// ======== Actions ========
function clearForm(){
  fromEl.value = '';
  toEl.value = '';
  dateEl.value = '';
  busTypeEl.value = 'Sleeper';
  qtyEl.value = '1';
}


function openModal(routeJSON, date){
  const r = JSON.parse(routeJSON);
  const qty = parseInt(qtyEl.value, 10);

  if(!date){
    showToast('Please select a Date before booking.');
    return;
  }

  currentSelection = { r, date, qty };
  const total = r.price * qty;

  modalBody.innerHTML = `
    <div class="grid grid-1">
      <div>
        <div class="meta" style="margin:0 0 8px">${r.from} → ${r.to} • ${r.type} • ${r.depart} → ${r.arrive}</div>
        <div style="font-weight:700; font-size: 18px">${r.operator}</div>
        <div class="meta">Seats: ${qty}</div>
        <div style="margin-top:10px; display:flex; align-items:center; justify-content: space-between;">
          <span class="pill">Travel Date: ${date}</span>
          <span style="font-weight:800; font-size:22px">₹${total}</span>
        </div>
      </div>
    </div>`;
  modal.classList.add('active');
}

function closeModal(){ modal.classList.remove('active'); }
function confirmBooking(){
  const { r, date, qty } = currentSelection || {};
  if(!r) return;

  const row = ticketTable.insertRow();
  row.innerHTML = `<td>${r.from}</td><td>${r.to}</td><td>${r.type}</td><td>${date}</td><td>${qty}</td><td>₹${r.price * qty}</td>`;

  closeModal();
  showToast('✅ Booking confirmed!');
  persist();
}


// Theme toggle
function toggleTheme(){
  dark = !dark;
  document.documentElement.style.setProperty('--bg', dark ? '#0b1020' : '#f7f7fb');
  document.documentElement.style.setProperty('--bg-soft', dark ? '#0f1730' : '#ffffff');
  document.documentElement.style.setProperty('--text', dark ? '#e6e6f0' : '#111322');
  document.documentElement.style.setProperty('--muted', dark ? '#6b7280' : '#4b5563');
  document.documentElement.style.setProperty('--card', dark ? 'rgba(255,255,255,0.06)' : 'rgba(17,19,34,0.04)');
  document.documentElement.style.setProperty('--border', dark ? 'rgba(255,255,255,0.12)' : 'rgba(17,19,34,0.12)');
  themeToggle.textContent = dark ? '🌙' : '☀️';
}
function searchRoutes(){
  const from = fromEl.value.trim();
  const to = toEl.value.trim();
  const date = dateEl.value;

  if(!from || !to || !date){
    showToast("Please select From, To and Date.");
    return;
  }

  // Save selected data for next page
  localStorage.setItem("searchFrom", from);
  localStorage.setItem("searchTo", to);
  localStorage.setItem("searchDate", date);

  // Redirect to next page
  window.location.href = "results.html";
}


// ======== Event bindings ========
searchBtn.addEventListener('click', searchRoutes);
clearBtn.addEventListener('click', clearForm);
confirmBtn.addEventListener('click', confirmBooking);
closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
themeToggle.addEventListener('click', toggleTheme);

// ======== Init ========
restore();
// ---------------- SAMPLE BUS DATA ----------------
const buses = [
  {
    id: 1,
    from: "Bengaluru",
    to: "Mangaluru",
    type: "Sleeper",
    time: "10:00 PM",
    fare: 999,
    seats: 12
  },
  {
    id: 2,
    from: "Bengaluru",
    to: "Mangaluru",
    type: "AC",
    time: "08:30 PM",
    fare: 1199,
    seats: 8
  },
  {
    id: 3,
    from: "Mysuru",
    to: "Bengaluru",
    type: "Semi-Sleeper",
    time: "06:00 AM",
    fare: 499,
    seats: 20
  }
];

// ---------------- SEARCH BUTTON ----------------
document.getElementById("searchBtn").addEventListener("click", () => {
  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();
  const busType = document.getElementById("busType").value;

  const routesDiv = document.getElementById("routes");
  const resultCount = document.getElementById("resultCount");

  routesDiv.innerHTML = "";

  // Filter buses
  const filteredBuses = buses.filter(bus =>
    bus.from === from &&
    bus.to === to &&
    bus.type === busType
  );

  resultCount.textContent = `${filteredBuses.length} found`;

  if (filteredBuses.length === 0) {
    routesDiv.innerHTML = `<p style="color:#aaa">No buses available</p>`;
    return;
  }

  // Display buses
  filteredBuses.forEach(bus => {
    const busCard = document.createElement("div");
    busCard.className = "route";

    busCard.innerHTML = `
      <div class="top">
        <strong>${bus.from} → ${bus.to}</strong>
        <span class="price">₹${bus.fare}</span>
      </div>
      <div class="meta">
        ${bus.type} • ${bus.time} • Seats: ${bus.seats}
      </div>
      <button class="btn primary" onclick="bookBus(${bus.id})">
        Book Now
      </button>
    `;

    routesDiv.appendChild(busCard);
  });
});

// ---------------- BOOK BUS ----------------
function bookBus(busId) {
  const selectedBus = buses.find(b => b.id === busId);

  localStorage.setItem("selectedBus", JSON.stringify(selectedBus));
  window.location.href = "seats.html";
}
