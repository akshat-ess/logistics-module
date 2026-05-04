/* =====================================================
   ROUND TRIP ERP - Shared JavaScript
   ===================================================== */

// ---- MOCK DATA ----
const MOCK_CONSIGNMENTS = [
  { fileNo: 'TC-2024-001', referNo: 'REF-001', tansadNo: 'TSD-001', consignee: 'ACME Corp', destination: 'Nairobi', containers: '2x20', eta: '2024-03-10', etb: '2024-03-11', vessel: 'MSC OSCAR', blNumber: 'BL001234', slDoDate: '2024-03-05', status: 'active' },
  { fileNo: 'TC-2024-002', referNo: 'REF-002', tansadNo: 'TSD-002', consignee: 'Global Traders Ltd', destination: 'Kampala', containers: '1x40', eta: '2024-03-12', etb: '2024-03-13', vessel: 'EVER GIVEN', blNumber: 'BL002345', slDoDate: '2024-03-07', status: 'pending' },
  { fileNo: 'TC-2024-003', referNo: 'REF-003', tansadNo: 'TSD-003', consignee: 'East Africa Imports', destination: 'Kigali', containers: '3x20', eta: '2024-03-14', etb: '2024-03-15', vessel: 'CMA CGM MARCO POLO', blNumber: 'BL003456', slDoDate: '2024-03-09', status: 'active' },
  { fileNo: 'TC-2024-004', referNo: 'REF-004', tansadNo: 'TSD-004', consignee: 'Sunrise Logistics', destination: 'Dar es Salaam', containers: '2x40', eta: '2024-03-16', etb: '2024-03-17', vessel: 'MAERSK ALABAMA', blNumber: 'BL004567', slDoDate: '2024-03-11', status: 'draft' },
  { fileNo: 'TC-2024-005', referNo: 'REF-005', tansadNo: 'TSD-005', consignee: 'Horizon Freight', destination: 'Addis Ababa', containers: '1x20', eta: '2024-03-18', etb: '2024-03-19', vessel: 'HAPAG LLOYD', blNumber: 'BL005678', slDoDate: '2024-03-13', status: 'active' },
  { fileNo: 'TC-2024-006', referNo: 'REF-006', tansadNo: 'TSD-006', consignee: 'Trans Africa Co', destination: 'Lusaka', containers: '2x20', eta: '2024-03-20', etb: '2024-03-21', vessel: 'ONE COMMITMENT', blNumber: 'BL006789', slDoDate: '2024-03-15', status: 'pending' },
  { fileNo: 'TC-2024-007', referNo: 'REF-007', tansadNo: 'TSD-007', consignee: 'Coastal Merchants', destination: 'Harare', containers: '3x40', eta: '2024-03-22', etb: '2024-03-23', vessel: 'YANG MING', blNumber: 'BL007890', slDoDate: '2024-03-17', status: 'active' },
  { fileNo: 'TC-2024-008', referNo: 'REF-008', tansadNo: 'TSD-008', consignee: 'Inland Services', destination: 'Bujumbura', containers: '1x40', eta: '2024-03-24', etb: '2024-03-25', vessel: 'EVERGREEN', blNumber: 'BL008901', slDoDate: '2024-03-19', status: 'draft' },
];

const MOCK_RETURN_CONSIGNMENTS = [
  { uin: 'UIN-001', fileNo: 'RC-2024-001', client: 'ACME Corp', destination: 'Mombasa Port', truckDetails: 'KBZ 123A - Isuzu FRR', remarks: 'Empty containers return', status: 'active' },
  { uin: 'UIN-002', fileNo: 'RC-2024-002', client: 'Global Traders Ltd', destination: 'Mombasa Port', truckDetails: 'KCA 456B - Mercedes Actros', remarks: 'On schedule', status: 'pending' },
  { uin: 'UIN-003', fileNo: 'RC-2024-003', client: 'East Africa Imports', destination: 'Mombasa Port', truckDetails: 'KDB 789C - Volvo FH', remarks: 'Priority clearance', status: 'active' },
  { uin: 'UIN-004', fileNo: 'RC-2024-004', client: 'Sunrise Logistics', destination: 'Kilindini', truckDetails: 'KDA 012D - MAN TGX', remarks: 'Delayed - customs hold', status: 'draft' },
  { uin: 'UIN-005', fileNo: 'RC-2024-005', client: 'Horizon Freight', destination: 'Mombasa Port', truckDetails: 'KDD 345E - Scania R', remarks: '', status: 'active' },
];

// ---- DROPDOWN OPTIONS ----
const OPTIONS = {
  declarant: ['Select...', 'John Kamau', 'Mary Wanjiku', 'Peter Otieno', 'Grace Muthoni', 'James Ngugi'],
  portAgent: ['Select...', 'Kenya Ports Authority', 'Mombasa Port Agent', 'Express Shipping Ltd', 'Blue Ocean Agency'],
  category: ['Select...', 'General Cargo', 'Dangerous Goods', 'Perishables', 'Machinery', 'Electronics', 'Chemicals'],
  sourceOfBusiness: ['Select...', 'Direct Client', 'Agent', 'Broker', 'Partnership', 'Government'],
  billingCustomer: ['Select...', 'ACME Corp', 'Global Traders Ltd', 'East Africa Imports', 'Sunrise Logistics', 'Horizon Freight'],
  consignee: ['Select...', 'ACME Corp', 'Global Traders Ltd', 'East Africa Imports', 'Sunrise Logistics', 'Horizon Freight', 'Trans Africa Co'],
  supplier: ['Select...', 'China Export Co', 'US Suppliers Inc', 'European Goods Ltd', 'Asian Manufacturers'],
  polCountry: ['Select...', 'China', 'United States', 'Germany', 'United Kingdom', 'India', 'Japan', 'South Korea', 'Netherlands'],
  sline: ['Select...', 'MSC', 'Maersk', 'CMA CGM', 'COSCO', 'Hapag-Lloyd', 'ONE', 'Yang Ming', 'Evergreen'],
  salesOffice: ['Select...', 'Mombasa', 'Nairobi', 'Kampala', 'Dar es Salaam'],
  client: ['Select...', 'ACME Corp', 'Global Traders Ltd', 'East Africa Imports', 'Sunrise Logistics', 'Horizon Freight'],
  isFromNetwork: ['Select...', 'Yes', 'No'],
  uin: ['Select...', 'UIN-001', 'UIN-002', 'UIN-003', 'UIN-004', 'UIN-005'],
  blType: ['Select...', 'Original', 'Telex Release', 'Sea Waybill', 'Express BL'],
  transportation: ['With Transport', 'Without Transport', 'Self Collection', 'Third Party'],
  icd: ['Select...', 'Inland Container Depot A', 'Inland Container Depot B', 'CFS Nairobi', 'CFS Kampala'],
  country: ['Select...', 'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia', 'Sudan', 'Democratic Republic of Congo'],
  border: ['Select...', 'Busia', 'Malaba', 'Namanga', 'Holili', 'Lungalunga', 'Taveta'],
  destination: ['Select...', 'Nairobi', 'Kampala', 'Kigali', 'Dar es Salaam', 'Addis Ababa', 'Lusaka', 'Harare', 'Bujumbura'],
  materialDescr: ['Select...', 'General Merchandise', 'Electronics', 'Clothing', 'Food Items', 'Machinery Parts', 'Chemicals', 'Steel Products'],
  bookingStatus: ['Select...', 'Booked', 'Pending', 'Confirmed', 'Cancelled'],
};

// ---- UTILITIES ----
function showToast(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function showSpinner() { document.querySelector('.spinner-overlay')?.classList.add('show'); }
function hideSpinner() { document.querySelector('.spinner-overlay')?.classList.remove('show'); }

function populateSelect(el, optKey) {
  if (!el || !OPTIONS[optKey]) return;
  el.innerHTML = OPTIONS[optKey].map(o => `<option value="${o === 'Select...' ? '' : o}">${o}</option>`).join('');
}

function initDropdowns() {
  document.querySelectorAll('[data-options]').forEach(el => {
    populateSelect(el, el.dataset.options);
  });
}

// ---- TABS ----
function initTabs() {
  document.querySelectorAll('.erp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.closest('.tab-group') || tab.parentElement;
      const targetId = tab.dataset.tab;
      group.querySelectorAll('.erp-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(c => {
        if (c.id === targetId) c.classList.add('active');
        else c.classList.remove('active');
      });
    });
  });
}

// ---- TABLE + PAGINATION ----
function initTable(tableId, data, renderRow, columns) {
  const state = { page: 1, perPage: 10, search: '', sortCol: null, sortDir: 1, data: [...data] };

  const container = document.getElementById(tableId);
  if (!container) return;

  const searchInput = container.closest('.card')?.querySelector('.table-search');
  const perPageSel = container.closest('.card')?.querySelector('.per-page-sel');
  const prevBtn = container.closest('.card')?.querySelector('.btn-prev');
  const nextBtn = container.closest('.card')?.querySelector('.btn-next');
  const pageInfo = container.closest('.card')?.querySelector('.page-info');
  const totalInfo = container.closest('.card')?.querySelector('.total-info');

  function filtered() {
    if (!state.search) return state.data;
    const s = state.search.toLowerCase();
    return state.data.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(s)));
  }

  function sorted(rows) {
    if (!state.sortCol) return rows;
    return [...rows].sort((a, b) => {
      const av = a[state.sortCol] || '';
      const bv = b[state.sortCol] || '';
      return String(av).localeCompare(String(bv)) * state.sortDir;
    });
  }

  function render() {
    const rows = sorted(filtered());
    const total = rows.length;
    const start = (state.page - 1) * state.perPage;
    const end = Math.min(start + state.perPage, total);
    const pageRows = rows.slice(start, end);
    const tbody = container.querySelector('tbody');

    if (tbody) {
      if (pageRows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${columns.length}" class="no-data"><i class="fas fa-inbox"></i> No data available in table</td></tr>`;
      } else {
        tbody.innerHTML = pageRows.map((row, i) => renderRow(row, start + i)).join('');
      }
    }

    if (pageInfo) pageInfo.textContent = `Showing ${total === 0 ? 0 : start + 1} to ${end} of ${total} entries`;
    if (totalInfo) totalInfo.textContent = `Total items: ${total} / Total Containers: ${state.data.reduce((a, r) => a + (r.containers ? parseInt(r.containers) || 1 : 1), 0)}`;
    if (prevBtn) prevBtn.disabled = state.page <= 1;
    if (nextBtn) nextBtn.disabled = end >= total;
  }

  if (searchInput) searchInput.addEventListener('input', e => { state.search = e.target.value; state.page = 1; render(); });
  if (perPageSel) perPageSel.addEventListener('change', e => { state.perPage = +e.target.value; state.page = 1; render(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { if (state.page > 1) { state.page--; render(); } });
  if (nextBtn) nextBtn.addEventListener('click', () => { state.page++; render(); });

  container.querySelectorAll('thead th[data-col]').forEach(th => {
    th.addEventListener('click', () => {
      if (state.sortCol === th.dataset.col) state.sortDir *= -1;
      else { state.sortCol = th.dataset.col; state.sortDir = 1; }
      render();
    });
  });

  render();
  return { state, render };
}

// ---- FORM VALIDATION ----
function validateForm(formEl) {
  let valid = true;
  formEl.querySelectorAll('[required]').forEach(el => {
    el.classList.remove('is-invalid');
    if (!el.value.trim()) { el.classList.add('is-invalid'); valid = false; }
  });
  return valid;
}

// ---- SAVE HANDLER ----
function handleSave(formId, label) {
  const form = document.getElementById(formId);
  if (!form) return;
  const saveBtn = form.querySelector('.btn-save') || document.querySelector('.btn-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      showSpinner();
      setTimeout(() => {
        hideSpinner();
        const data = {};
        form.querySelectorAll('[name]').forEach(el => { data[el.name] = el.value; });
        console.log(`[${label}] Saved:`, data);
        showToast(`${label} saved successfully!`, 'success');
      }, 800);
    });
  }
}

// ---- NAV HIGHLIGHT ----
function initNavHighlight() {
  const page = window.location.pathname.split('/').pop();
  document.querySelectorAll('.erp-topnav .nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

// ---- PRINT ----
function initPrint() {
  document.querySelectorAll('.btn-print').forEach(btn => {
    btn.addEventListener('click', () => window.print());
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initDropdowns();
  initTabs();
  initNavHighlight();
  initPrint();

  // Page-specific
  if (typeof initPage === 'function') initPage();
});
