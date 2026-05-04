/* ============================================================
   ERP Vehicle Licenses System — script.js
   Shared data store + utilities used by index.html & edit.html
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   DUMMY DATA STORE
   ───────────────────────────────────────────────────────────── */
var VehicleDB = [
  {
    id: 1, username: 'ABDUL SULTAN DAKO', vehicleType: 'MOTOR Commercial Vehicle',
    makeModel: 'DAF', regNo: 'T694DMW', regDate: '', purchaseDate: '', purchaseCost: '',
    purchaseDealer: '', office: '',
    roadSafetyReport: '', roadSafetyIssue: '', roadSafetyExpiry: '', roadSafetyRenewal: '', roadSafetyCost: '',
    traSticker: '', traIssue: '', traExpiry: '', traRenewal: '', traCost: '',
    insurer: '', insurerIssue: '', insurerExpiry: '', insurerRenewal: '', insuredAmount: '', insurerCost: '',
    tkIssuedBy: '', tkIssue: '', tkExpiry: '', tkRenewal: '', tkCost: ''
  },
  {
    id: 2, username: 'AHMED SHAMSHU MWAMED', vehicleType: 'MOTOR Private Vehicle',
    makeModel: 'TOYOTA HILUX', regNo: 'T972DBW', regDate: '2012-07-24', purchaseDate: '', purchaseCost: '',
    purchaseDealer: '', office: 'HLL',
    roadSafetyReport: 'RS-2022-001', roadSafetyIssue: '2022-01-01', roadSafetyExpiry: '2023-01-01', roadSafetyRenewal: '2023-01-01', roadSafetyCost: '150,000',
    traSticker: '', traIssue: '', traExpiry: '', traRenewal: '', traCost: '',
    insurer: 'JUBILEE', insurerIssue: '2022-03-01', insurerExpiry: '2023-03-01', insurerRenewal: '2023-03-01', insuredAmount: '5,000,000', insurerCost: '250,000',
    tkIssuedBy: '', tkIssue: '', tkExpiry: '', tkRenewal: '', tkCost: ''
  },
  {
    id: 3, username: 'ALLY HASSAN', vehicleType: 'MOTOR Private Vehicle',
    makeModel: 'NISSAN PATROL', regNo: 'MC742BYJ', regDate: '2018-05-21', purchaseDate: '', purchaseCost: '',
    purchaseDealer: '', office: 'CFS',
    roadSafetyReport: '', roadSafetyIssue: '', roadSafetyExpiry: '', roadSafetyRenewal: '', roadSafetyCost: '',
    traSticker: 'TRA-88992', traIssue: '2021-06-01', traExpiry: '2022-06-01', traRenewal: '2022-06-01', traCost: '80,000',
    insurer: '', insurerIssue: '', insurerExpiry: '', insurerRenewal: '', insuredAmount: '', insurerCost: '',
    tkIssuedBy: '', tkIssue: '', tkExpiry: '', tkRenewal: '', tkCost: ''
  },
  {
    id: 4, username: 'ALLY SEIF MWEYOMBWE', vehicleType: 'MOTOR Commercial Vehicle',
    makeModel: 'MERCEDES ACTROS', regNo: 'MC 124CVA', regDate: '2021-03-29', purchaseDate: '2021-03-29', purchaseCost: '2,501,000',
    purchaseDealer: 'METL', office: 'TRS',
    roadSafetyReport: 'RS-2021-044', roadSafetyIssue: '2021-04-01', roadSafetyExpiry: '2022-04-01', roadSafetyRenewal: '2022-04-01', roadSafetyCost: '200,000',
    traSticker: 'TRA-55123', traIssue: '2021-05-01', traExpiry: '2022-05-01', traRenewal: '2022-05-01', traCost: '100,000',
    insurer: 'AAR', insurerIssue: '2021-04-01', insurerExpiry: '2022-04-01', insurerRenewal: '2022-04-01', insuredAmount: '12,000,000', insurerCost: '600,000',
    tkIssuedBy: 'KIBALI OFFICE', tkIssue: '2021-06-01', tkExpiry: '2022-06-01', tkRenewal: '2022-06-01', tkCost: '50,000'
  },
  {
    id: 5, username: 'BARAKA JUMA ALLY', vehicleType: 'MOTOR Private Vehicle',
    makeModel: 'LAND ROVER DEFENDER', regNo: 'SM 345LVK', regDate: '2019-11-10', purchaseDate: '2019-11-10', purchaseCost: '1,800,000',
    purchaseDealer: 'ALLIANCE MOTORS', office: 'HLL',
    roadSafetyReport: 'RS-2020-010', roadSafetyIssue: '2020-01-01', roadSafetyExpiry: '2021-01-01', roadSafetyRenewal: '2021-01-01', roadSafetyCost: '130,000',
    traSticker: 'TRA-66234', traIssue: '2020-02-01', traExpiry: '2021-02-01', traRenewal: '2021-02-01', traCost: '90,000',
    insurer: 'ZANELE', insurerIssue: '2020-03-01', insurerExpiry: '2021-03-01', insurerRenewal: '2021-03-01', insuredAmount: '8,000,000', insurerCost: '400,000',
    tkIssuedBy: '', tkIssue: '', tkExpiry: '', tkRenewal: '', tkCost: ''
  },
  {
    id: 6, username: 'FATUMA IBRAHIM SAID', vehicleType: 'MOTOR Commercial Vehicle',
    makeModel: 'ISUZU FVR', regNo: 'T811GKL', regDate: '2020-08-15', purchaseDate: '2020-08-20', purchaseCost: '3,200,000',
    purchaseDealer: 'CMC MOTORS', office: 'CFS',
    roadSafetyReport: 'RS-2020-055', roadSafetyIssue: '2020-09-01', roadSafetyExpiry: '2021-09-01', roadSafetyRenewal: '2021-09-01', roadSafetyCost: '175,000',
    traSticker: 'TRA-77891', traIssue: '2020-10-01', traExpiry: '2021-10-01', traRenewal: '2021-10-01', traCost: '95,000',
    insurer: 'JUBILEE', insurerIssue: '2020-09-15', insurerExpiry: '2021-09-15', insurerRenewal: '2021-09-15', insuredAmount: '15,000,000', insurerCost: '750,000',
    tkIssuedBy: 'KIBALI OFFICE', tkIssue: '2020-11-01', tkExpiry: '2021-11-01', tkRenewal: '2021-11-01', tkCost: '60,000'
  },
  {
    id: 7, username: 'HAMISI KOMBO OMAR', vehicleType: 'MOTOR Private Vehicle',
    makeModel: 'TOYOTA PRADO', regNo: 'MC 567PRD', regDate: '2017-04-05', purchaseDate: '2017-04-10', purchaseCost: '2,100,000',
    purchaseDealer: 'TOYOTA TANZANIA', office: 'TRS',
    roadSafetyReport: '', roadSafetyIssue: '', roadSafetyExpiry: '', roadSafetyRenewal: '', roadSafetyCost: '',
    traSticker: '', traIssue: '', traExpiry: '', traRenewal: '', traCost: '',
    insurer: 'GA INSURANCE', insurerIssue: '2021-01-01', insurerExpiry: '2022-01-01', insurerRenewal: '2022-01-01', insuredAmount: '10,000,000', insurerCost: '500,000',
    tkIssuedBy: '', tkIssue: '', tkExpiry: '', tkRenewal: '', tkCost: ''
  },
  {
    id: 8, username: 'JUMA MRISHO SALUM', vehicleType: 'MOTOR Commercial Vehicle',
    makeModel: 'HINO 500', regNo: 'T334MJK', regDate: '2016-06-20', purchaseDate: '2016-07-01', purchaseCost: '1,500,000',
    purchaseDealer: 'HINO TANZANIA', office: 'HLL',
    roadSafetyReport: 'RS-2022-099', roadSafetyIssue: '2022-06-01', roadSafetyExpiry: '2023-06-01', roadSafetyRenewal: '2023-06-01', roadSafetyCost: '120,000',
    traSticker: 'TRA-34521', traIssue: '2022-07-01', traExpiry: '2023-07-01', traRenewal: '2023-07-01', traCost: '85,000',
    insurer: 'UAP INSURANCE', insurerIssue: '2022-06-15', insurerExpiry: '2023-06-15', insurerRenewal: '2023-06-15', insuredAmount: '6,000,000', insurerCost: '300,000',
    tkIssuedBy: 'MAIN OFFICE', tkIssue: '2022-08-01', tkExpiry: '2023-08-01', tkRenewal: '2023-08-01', tkCost: '45,000'
  },
  {
    id: 9, username: 'KHADIJA SALIM NASSOR', vehicleType: 'MOTOR Private Vehicle',
    makeModel: 'HONDA CR-V', regNo: 'SM 901HCV', regDate: '2023-01-12', purchaseDate: '2023-01-15', purchaseCost: '2,800,000',
    purchaseDealer: 'HONDA EAST AFRICA', office: 'CFS',
    roadSafetyReport: 'RS-2023-011', roadSafetyIssue: '2023-02-01', roadSafetyExpiry: '2024-02-01', roadSafetyRenewal: '2024-02-01', roadSafetyCost: '160,000',
    traSticker: 'TRA-90321', traIssue: '2023-03-01', traExpiry: '2024-03-01', traRenewal: '2024-03-01', traCost: '110,000',
    insurer: 'BRITAM', insurerIssue: '2023-02-01', insurerExpiry: '2024-02-01', insurerRenewal: '2024-02-01', insuredAmount: '9,000,000', insurerCost: '450,000',
    tkIssuedBy: '', tkIssue: '', tkExpiry: '', tkRenewal: '', tkCost: ''
  },
  {
    id: 10, username: 'MUSA ABDALLAH WAZIRI', vehicleType: 'MOTOR Commercial Vehicle',
    makeModel: 'SCANIA R500', regNo: 'T789SCR', regDate: '2022-05-30', purchaseDate: '2022-06-01', purchaseCost: '5,000,000',
    purchaseDealer: 'SCANIA AFRICA', office: 'TRS',
    roadSafetyReport: 'RS-2022-200', roadSafetyIssue: '2022-07-01', roadSafetyExpiry: '2023-07-01', roadSafetyRenewal: '2023-07-01', roadSafetyCost: '220,000',
    traSticker: 'TRA-11234', traIssue: '2022-08-01', traExpiry: '2023-08-01', traRenewal: '2023-08-01', traCost: '130,000',
    insurer: 'JUBILEE', insurerIssue: '2022-07-15', insurerExpiry: '2023-07-15', insurerRenewal: '2023-07-15', insuredAmount: '20,000,000', insurerCost: '1,000,000',
    tkIssuedBy: 'REGIONAL OFFICE', tkIssue: '2022-09-01', tkExpiry: '2023-09-01', tkRenewal: '2023-09-01', tkCost: '75,000'
  },
  {
    id: 11, username: 'NAIMA YUSUF KHAMIS', vehicleType: 'MOTOR Private Vehicle',
    makeModel: 'VOLKSWAGEN TIGUAN', regNo: 'MC 232VWT', regDate: '2021-10-10', purchaseDate: '2021-10-15', purchaseCost: '3,500,000',
    purchaseDealer: 'VW EAST AFRICA', office: 'HLL',
    roadSafetyReport: '', roadSafetyIssue: '', roadSafetyExpiry: '', roadSafetyRenewal: '', roadSafetyCost: '',
    traSticker: 'TRA-22567', traIssue: '2021-11-01', traExpiry: '2022-11-01', traRenewal: '2022-11-01', traCost: '100,000',
    insurer: 'AAR', insurerIssue: '2021-10-20', insurerExpiry: '2022-10-20', insurerRenewal: '2022-10-20', insuredAmount: '11,000,000', insurerCost: '550,000',
    tkIssuedBy: '', tkIssue: '', tkExpiry: '', tkRenewal: '', tkCost: ''
  },
  {
    id: 12, username: 'OMAR RASHID JUMA', vehicleType: 'MOTOR Commercial Vehicle',
    makeModel: 'MAN TGS', regNo: 'T456MTS', regDate: '2015-03-25', purchaseDate: '2015-04-01', purchaseCost: '4,200,000',
    purchaseDealer: 'MAN AFRICA', office: 'CFS',
    roadSafetyReport: 'RS-2023-150', roadSafetyIssue: '2023-04-01', roadSafetyExpiry: '2024-04-01', roadSafetyRenewal: '2024-04-01', roadSafetyCost: '190,000',
    traSticker: 'TRA-44899', traIssue: '2023-05-01', traExpiry: '2024-05-01', traRenewal: '2024-05-01', traCost: '115,000',
    insurer: 'ZANELE', insurerIssue: '2023-04-15', insurerExpiry: '2024-04-15', insurerRenewal: '2024-04-15', insuredAmount: '18,000,000', insurerCost: '900,000',
    tkIssuedBy: 'KIBALI OFFICE', tkIssue: '2023-06-01', tkExpiry: '2024-06-01', tkRenewal: '2024-06-01', tkCost: '65,000'
  }
];

/* ─────────────────────────────────────────────────────────────
   UTILITY FUNCTIONS
   ───────────────────────────────────────────────────────────── */

/** Format date string YYYY-MM-DD → DD-Mon-YYYY */
function fmtDate(str) {
  if (!str) return '';
  var d = new Date(str + 'T00:00:00');
  if (isNaN(d)) return str;
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return d.getDate() + '-' + months[d.getMonth()] + '-' + d.getFullYear();
}

/** Determine badge class based on date expiry */
function dateBadgeClass(str) {
  if (!str) return 'none';
  var d = new Date(str + 'T00:00:00');
  var now = new Date();
  var diffDays = (d - now) / 86400000;
  if (diffDays < 0)   return 'red';
  if (diffDays < 60)  return 'orange';
  return 'blue';
}

/** Render a date badge HTML string */
function renderDateBadge(str) {
  if (!str) return '<span class="date-badge none">–</span>';
  var cls = dateBadgeClass(str);
  return '<span class="date-badge ' + cls + '">' + fmtDate(str) + '</span>';
}

/** Show a toast notification */
function showToast(msg, type) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast ' + (type || 'success') + ' show';
  setTimeout(function() { t.className = 'toast'; }, 2800);
}

/** Get/set record by ID */
function getRecord(id) {
  return VehicleDB.find(function(r) { return r.id === id; }) || null;
}
function saveRecord(obj) {
  var idx = VehicleDB.findIndex(function(r) { return r.id === obj.id; });
  if (idx > -1) { VehicleDB[idx] = obj; }
  else { obj.id = Date.now(); VehicleDB.push(obj); }
}
function deleteRecord(id) {
  VehicleDB = VehicleDB.filter(function(r) { return r.id !== id; });
}

/* ─────────────────────────────────────────────────────────────
   LIST PAGE (index.html)
   ───────────────────────────────────────────────────────────── */
function initListPage() {
  var state = {
    data: VehicleDB.slice(),
    filtered: VehicleDB.slice(),
    page: 1,
    perPage: 10,
    sortCol: 'username',
    sortDir: 1,
    search: '',
    deleteId: null
  };

  var tbody      = document.getElementById('vehicleTableBody');
  var pagInfo    = document.getElementById('pagInfo');
  var pagButtons = document.getElementById('pagButtons');
  var searchInput= document.getElementById('searchInput');
  var perPageSel = document.getElementById('perPageSel');
  var headers    = document.querySelectorAll('.erp-table th.sortable');

  /* --- Search --- */
  searchInput.addEventListener('input', function() {
    state.search = this.value.toLowerCase().trim();
    state.page = 1;
    applyFilter();
    render();
  });

  /* --- Records per page --- */
  perPageSel.addEventListener('change', function() {
    state.perPage = +this.value;
    state.page = 1;
    render();
  });

  /* --- Sort --- */
  headers.forEach(function(th) {
    th.addEventListener('click', function() {
      var col = th.dataset.col;
      if (state.sortCol === col) { state.sortDir *= -1; }
      else { state.sortCol = col; state.sortDir = 1; }
      state.page = 1;
      applyFilter();
      render();
      // Update header classes
      headers.forEach(function(h) { h.classList.remove('sort-asc','sort-desc'); });
      th.classList.add(state.sortDir === 1 ? 'sort-asc' : 'sort-desc');
    });
  });

  /* --- Refresh --- */
  document.getElementById('refreshBtn').addEventListener('click', function() {
    var icon = this;
    icon.style.transform = 'rotate(360deg)';
    setTimeout(function() { icon.style.transform = ''; }, 400);
    state.search = '';
    searchInput.value = '';
    state.page = 1;
    state.data = VehicleDB.slice();
    applyFilter();
    render();
    showToast('Table refreshed.');
  });

  /* --- Export CSV --- */
  document.getElementById('exportBtn').addEventListener('click', exportCSV);

  /* --- Print --- */
  document.getElementById('printBtn').addEventListener('click', function() { window.print(); });

  /* --- Delete modal --- */
  document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
    if (state.deleteId !== null) {
      deleteRecord(state.deleteId);
      state.data = VehicleDB.slice();
      applyFilter();
      render();
      closeModal('deleteModal');
      showToast('Record deleted.', 'danger');
      state.deleteId = null;
    }
  });
  document.getElementById('cancelDeleteBtn').addEventListener('click', function() { closeModal('deleteModal'); });

  /* --- View modal close --- */
  document.getElementById('closeViewModal').addEventListener('click', function() { closeModal('viewModal'); });
  document.getElementById('closeViewModalFooter').addEventListener('click', function() { closeModal('viewModal'); });

  /* Filter & sort */
  function applyFilter() {
    var s = state.search;
    state.filtered = state.data.filter(function(r) {
      return !s || [r.username, r.regNo, r.purchaseDealer, r.makeModel].some(function(v) {
        return (v || '').toLowerCase().includes(s);
      });
    });
    state.filtered.sort(function(a, b) {
      var av = (a[state.sortCol] || '').toLowerCase();
      var bv = (b[state.sortCol] || '').toLowerCase();
      return av < bv ? -state.sortDir : av > bv ? state.sortDir : 0;
    });
  }

  /* Render table rows + pagination */
  function render() {
    var total = state.filtered.length;
    var pages = Math.ceil(total / state.perPage) || 1;
    if (state.page > pages) state.page = pages;

    var start = (state.page - 1) * state.perPage;
    var slice = state.filtered.slice(start, start + state.perPage);

    if (slice.length === 0) {
      tbody.innerHTML = '<tr class="no-data-row"><td colspan="8">No records found.</td></tr>';
    } else {
      tbody.innerHTML = slice.map(rowHTML).join('');
      attachRowEvents();
    }

    pagInfo.textContent = 'Showing ' + (total === 0 ? 0 : start + 1) + ' – ' + Math.min(start + state.perPage, total) + ' of ' + total + ' records';
    renderPagination(pages);
  }

  function rowHTML(r) {
    var uploads = r.insurer ? '<button class="btn btn-view" style="font-size:11px;padding:3px 8px;">View</button>' : '<button class="btn btn-view" style="font-size:11px;padding:3px 8px;">View</button>';
    return '<tr>' +
      '<td class="username">' + r.username + '</td>' +
      '<td>' + (r.regNo || '') + '</td>' +
      '<td>' + renderDateBadge(r.regDate) + '</td>' +
      '<td>' + renderDateBadge(r.purchaseDate) + '</td>' +
      '<td>' + (r.purchaseCost ? r.purchaseCost : '<span style="color:#aaa">–</span>') + '</td>' +
      '<td>' + (r.purchaseDealer || '<span style="color:#aaa">–</span>') + '</td>' +
      '<td>' + uploads + '</td>' +
      '<td><div class="action-group">' +
        '<button class="btn btn-view btn-view-record" data-id="' + r.id + '" title="View">&#128065; View</button>' +
        '<button class="btn btn-edit btn-edit-record" data-id="' + r.id + '" title="Edit">&#9998;</button>' +
        '<button class="btn btn-delete btn-delete-record" data-id="' + r.id + '" title="Delete">&#10005;</button>' +
      '</div></td>' +
    '</tr>';
  }

  function attachRowEvents() {
    /* View buttons */
    document.querySelectorAll('.btn-view-record').forEach(function(btn) {
      btn.addEventListener('click', function() { openViewModal(+this.dataset.id); });
    });
    /* Edit buttons */
    document.querySelectorAll('.btn-edit-record').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = this.dataset.id;
        sessionStorage.setItem('editId', id);
        window.location.href = 'edit.html';
      });
    });
    /* Delete buttons */
    document.querySelectorAll('.btn-delete-record').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = +this.dataset.id;
        var rec = getRecord(id);
        if (!rec) return;
        state.deleteId = id;
        document.getElementById('deleteName').textContent = rec.username;
        openModal('deleteModal');
      });
    });
  }

  /* Pagination buttons */
  function renderPagination(pages) {
    var html = '';
    html += '<button class="pag-btn" id="pagPrev" ' + (state.page === 1 ? 'disabled' : '') + '>&laquo;</button>';
    var start = Math.max(1, state.page - 2);
    var end   = Math.min(pages, start + 4);
    for (var p = start; p <= end; p++) {
      html += '<button class="pag-btn ' + (p === state.page ? 'active' : '') + '" data-page="' + p + '">' + p + '</button>';
    }
    html += '<button class="pag-btn" id="pagNext" ' + (state.page === pages ? 'disabled' : '') + '>&raquo;</button>';
    pagButtons.innerHTML = html;

    document.getElementById('pagPrev').addEventListener('click', function() {
      if (state.page > 1) { state.page--; render(); }
    });
    document.getElementById('pagNext').addEventListener('click', function() {
      var pages2 = Math.ceil(state.filtered.length / state.perPage) || 1;
      if (state.page < pages2) { state.page++; render(); }
    });
    pagButtons.querySelectorAll('[data-page]').forEach(function(b) {
      b.addEventListener('click', function() { state.page = +this.dataset.page; render(); });
    });
  }

  /* View modal */
  function openViewModal(id) {
    var r = getRecord(id);
    if (!r) return;
    var body = document.getElementById('viewModalBody');
    body.innerHTML = '<div class="detail-grid">' + [
      ['Username', r.username], ['Reg. No.', r.regNo],
      ['Vehicle Type', r.vehicleType], ['Make/Model', r.makeModel],
      ['Reg. Date', fmtDate(r.regDate)], ['Purchase Date', fmtDate(r.purchaseDate)],
      ['Purchase Cost', r.purchaseCost], ['Purchase Dealer', r.purchaseDealer],
      ['Office', r.office], ['Insurer', r.insurer],
      ['Road Safety Report', r.roadSafetyReport], ['TRA Sticker', r.traSticker],
    ].map(function(pair) {
      return '<div class="detail-item"><dt>' + pair[0] + '</dt><dd>' + (pair[1] || '–') + '</dd></div>';
    }).join('') + '</div>';
    openModal('viewModal');
  }

  /* CSV Export */
  function exportCSV() {
    var cols = ['Username','Reg No','Reg Date','Purchase Date','Purchase Cost','Purchase Dealer','Insurer','Office'];
    var rows = state.filtered.map(function(r) {
      return [r.username, r.regNo, r.regDate, r.purchaseDate, r.purchaseCost, r.purchaseDealer, r.insurer, r.office].map(function(v) {
        return '"' + (v || '').replace(/"/g,'""') + '"';
      }).join(',');
    });
    var csv = cols.join(',') + '\n' + rows.join('\n');
    var a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'vehicle_licenses.csv';
    a.click();
    showToast('CSV exported.');
  }

  applyFilter();
  render();
}

/* ─────────────────────────────────────────────────────────────
   EDIT PAGE (edit.html)
   ───────────────────────────────────────────────────────────── */
function initEditPage() {
  var editId = sessionStorage.getItem('editId');
  var rec = editId ? getRecord(+editId) : null;

  /* Populate form */
  function populate(r) {
    if (!r) return;
    var fields = [
      'username','vehicleType','makeModel','regNo','regDate',
      'purchaseDate','purchaseCost','purchaseDealer','office',
      'roadSafetyReport','roadSafetyIssue','roadSafetyExpiry','roadSafetyRenewal','roadSafetyCost',
      'traSticker','traIssue','traExpiry','traRenewal','traCost',
      'insurer','insurerIssue','insurerExpiry','insurerRenewal','insuredAmount','insurerCost',
      'tkIssuedBy','tkIssue','tkExpiry','tkRenewal','tkCost'
    ];
    fields.forEach(function(f) {
      var el = document.getElementById('f_' + f);
      if (el) el.value = r[f] || '';
    });
  }

  populate(rec);

  /* Refresh icon */
  var refreshBtn = document.getElementById('refreshFormBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', function() {
      populate(rec);
      showToast('Form refreshed.');
      this.style.transform = 'rotate(360deg)';
      var self = this;
      setTimeout(function() { self.style.transform = ''; }, 400);
    });
  }

  /* Save */
  document.getElementById('saveBtn').addEventListener('click', function() {
    if (!validateForm()) return;
    var updated = rec ? Object.assign({}, rec) : { id: null };
    var fields = [
      'username','vehicleType','makeModel','regNo','regDate',
      'purchaseDate','purchaseCost','purchaseDealer','office',
      'roadSafetyReport','roadSafetyIssue','roadSafetyExpiry','roadSafetyRenewal','roadSafetyCost',
      'traSticker','traIssue','traExpiry','traRenewal','traCost',
      'insurer','insurerIssue','insurerExpiry','insurerRenewal','insuredAmount','insurerCost',
      'tkIssuedBy','tkIssue','tkExpiry','tkRenewal','tkCost'
    ];
    fields.forEach(function(f) {
      var el = document.getElementById('f_' + f);
      if (el) updated[f] = el.value;
    });
    saveRecord(updated);
    showToast('Record saved successfully.');
    setTimeout(function() { window.location.href = 'index.html'; }, 1400);
  });

  /* Cancel */
  document.getElementById('cancelBtn').addEventListener('click', function() {
    window.location.href = 'index.html';
  });

  /* Back button */
  var backBtn = document.getElementById('backToListBtn');
  if (backBtn) { backBtn.addEventListener('click', function() { window.location.href = 'vehicle-license-index.html'; }); }

  /* Validation */
  function validateForm() {
    var required = ['f_username','f_vehicleType','f_regNo'];
    var ok = true;
    required.forEach(function(id) {
      var el = document.getElementById(id);
      var errEl = document.getElementById(id + '_err');
      if (!el) return;
      if (!el.value.trim()) {
        el.classList.add('error');
        if (errEl) errEl.textContent = 'This field is required.';
        ok = false;
      } else {
        el.classList.remove('error');
        if (errEl) errEl.textContent = '';
      }
    });
    // Date format check
    var dateFields = ['f_regDate','f_purchaseDate'];
    dateFields.forEach(function(id) {
      var el = document.getElementById(id);
      if (!el || !el.value) return;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(el.value)) {
        el.classList.add('error');
        var errEl = document.getElementById(id + '_err');
        if (errEl) errEl.textContent = 'Use YYYY-MM-DD format.';
        ok = false;
      }
    });
    if (!ok) showToast('Please fix validation errors.', 'danger');
    return ok;
  }

  /* Clear errors on input */
  document.querySelectorAll('.form-field input, .form-field select').forEach(function(el) {
    el.addEventListener('input', function() {
      this.classList.remove('error');
      var err = document.getElementById(this.id + '_err');
      if (err) err.textContent = '';
    });
  });
}

/* ─────────────────────────────────────────────────────────────
   MODAL HELPERS
   ───────────────────────────────────────────────────────────── */
function openModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

/* Close modals on overlay click */
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

/* ─────────────────────────────────────────────────────────────
   AUTO-INIT
   ───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('vehicleTableBody')) initListPage();
  if (document.getElementById('editForm'))         initEditPage();
});
