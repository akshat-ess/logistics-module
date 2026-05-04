/* ============================================================
   LICENSE MANAGEMENT SYSTEM — SCRIPT.JS
   Pure Vanilla JS | LocalStorage | Production Ready
   ============================================================ */

'use strict';

/* ---- SEED DATA ---- */
const SEED_LICENSES = [
  { id: 'LIC-001', licenseNo: '0025375', description: 'GPA POLICY', issueDate: '2024-01-01', expiryDate: '2024-12-31', renewalDate: '2024-12-01', office: 'HLL', attachment: 'H-GPA.pdf', createdAt: '2024-08-26 08:01:59', updatedAt: '2024-08-26 08:01:59' },
  { id: 'LIC-002', licenseNo: '04184', description: 'FIRE SAFETY CERTIFICATE', issueDate: '2025-04-21', expiryDate: '2028-04-20', renewalDate: '2028-04-01', office: 'CFS', attachment: 'FIRECERTIFICATE.pdf', createdAt: '2025-06-26 13:09:30', updatedAt: '2025-06-26 13:09:30' },
  { id: 'LIC-003', licenseNo: '101-806-995', description: 'TIN', issueDate: '2003-04-09', expiryDate: '3222-12-31', renewalDate: '3222-12-31', office: 'TRS', attachment: 'TIN.pdf', createdAt: '2023-12-22 16:33:09', updatedAt: '2023-12-22 16:33:09' },
  { id: 'LIC-004', licenseNo: '101-806-995', description: 'VAT', issueDate: '2013-12-23', expiryDate: '3222-12-31', renewalDate: '3222-12-31', office: 'TRS', attachment: 'VAT.pdf', createdAt: '2023-12-22 16:33:25', updatedAt: '2023-12-22 16:33:25' },
  { id: 'LIC-005', licenseNo: '11024-36531-60220', description: 'ELECTRONIC ALL RISK', issueDate: '2024-01-01', expiryDate: '2024-12-31', renewalDate: '2024-12-01', office: 'INSURANCE', attachment: 'Electronic-All-Risk.pdf', createdAt: '2024-08-26 07:56:00', updatedAt: '2024-08-26 07:56:00' },
  { id: 'LIC-006', licenseNo: '11024-36531-61421', description: 'PLANT & MACHINERY POLICY', issueDate: '2024-01-01', expiryDate: '2024-12-31', renewalDate: '2024-12-01', office: 'INSURANCE', attachment: 'PLANT-AND-MAVHINERY.pdf', createdAt: '2024-08-26 07:53:00', updatedAt: '2024-08-26 07:53:00' },
  { id: 'LIC-007', licenseNo: '2024-TRADE-001', description: 'TRADE LICENSE', issueDate: '2024-03-15', expiryDate: '2025-03-14', renewalDate: '2025-02-01', office: 'HLL', attachment: 'Trade-License.pdf', createdAt: '2024-03-15 09:00:00', updatedAt: '2024-03-15 09:00:00' },
  { id: 'LIC-008', licenseNo: 'ENV-2026-00234', description: 'ENVIRONMENTAL PERMIT', issueDate: '2026-01-01', expiryDate: '2027-12-31', renewalDate: '2027-11-01', office: 'CFS', attachment: 'Env-Permit.pdf', createdAt: '2026-01-02 10:15:00', updatedAt: '2026-01-02 10:15:00' },
];

/* ============================================================
   STORAGE HELPERS
   ============================================================ */
const Storage = {
  KEY: 'lms_licenses',

  getAll() {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  save(data) {
    try { localStorage.setItem(this.KEY, JSON.stringify(data)); } catch (e) { console.error('Storage error', e); }
  },

  init() {
    if (!this.getAll()) this.save(SEED_LICENSES);
  },

  getLicenses() {
    this.init();
    return this.getAll() || [];
  },

  addLicense(license) {
    const list = this.getLicenses();
    list.unshift(license);
    this.save(list);
  },

  updateLicense(id, data) {
    const list = this.getLicenses();
    const idx = list.findIndex(l => l.id === id);
    if (idx !== -1) { list[idx] = { ...list[idx], ...data, updatedAt: now() }; this.save(list); return true; }
    return false;
  },

  deleteLicense(id) {
    const list = this.getLicenses().filter(l => l.id !== id);
    this.save(list);
  }
};

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */
function now() {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
}

function genId() {
  return 'LIC-' + Date.now().toString(36).toUpperCase();
}

/**
 * Classify a license date status
 * @returns 'expired' | 'active' | 'upcoming'
 */
function dateStatus(expiryDateStr) {
  if (!expiryDateStr) return 'neutral';
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const exp = new Date(expiryDateStr); exp.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((exp - today) / 86400000);
  if (diffDays < 0) return 'expired';
  if (diffDays <= 90) return 'upcoming';
  return 'active';
}

function dateBadge(dateStr, status) {
  if (!dateStr) return '—';
  const cls = { expired: 'badge-expired', active: 'badge-active', upcoming: 'badge-upcoming', neutral: 'badge-neutral' };
  const formatted = formatDate(dateStr);
  return `<span class="date-badge ${cls[status] || 'badge-neutral'}">${formatted}</span>`;
}

function formatDate(str) {
  if (!str) return '—';
  const d = new Date(str);
  if (isNaN(d)) return str;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatBytes(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(type, title, message, duration = 3500) {
    this.init();
    const icons = {
      success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#057a55" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>`,
      error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e02424" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      info:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a56db" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<div class="toast-icon">${icons[type] || icons.info}</div><div class="toast-body"><div class="toast-title">${escHtml(title)}</div><div class="toast-msg">${escHtml(message)}</div></div>`;
    this.container.appendChild(el);
    setTimeout(() => {
      el.classList.add('fade-out');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }, duration);
  }
};

/* ============================================================
   LOADER
   ============================================================ */
function hideLoader() {
  const l = document.getElementById('pageLoader');
  if (l) { l.classList.add('hidden'); setTimeout(() => l.remove(), 500); }
}

/* ============================================================
   DASHBOARD PAGE
   ============================================================ */
const Dashboard = {
  licenses: [],
  filtered: [],
  sortKey: 'createdAt',
  sortDir: 'desc',
  page: 1,
  perPage: 10,
  searchQ: '',
  editId: null,

  init() {
    this.licenses = Storage.getLicenses();
    this.filtered  = [...this.licenses];
    this.renderKPIs();
    this.renderTable();
    this.bindEvents();
    hideLoader();
  },

  /* ---------- KPI CARDS ---------- */
  renderKPIs() {
    const today = new Date(); today.setHours(0,0,0,0);
    const total   = this.licenses.length;
    const expired = this.licenses.filter(l => dateStatus(l.expiryDate) === 'expired').length;
    const active  = this.licenses.filter(l => dateStatus(l.expiryDate) === 'active').length;

    const set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
    set('kpiTotal',   total);
    set('kpiExpired', expired);
    set('kpiActive',  active);
  },

  /* ---------- TABLE ---------- */
  applyFilters() {
    const q = this.searchQ.toLowerCase().trim();
    this.filtered = this.licenses.filter(l => {
      if (!q) return true;
      return [l.licenseNo, l.description, l.office, l.attachment].some(v => v && v.toLowerCase().includes(q));
    });
    this.sortData();
  },

  sortData() {
    const { sortKey, sortDir } = this;
    this.filtered.sort((a, b) => {
      let va = a[sortKey] || '', vb = b[sortKey] || '';
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ?  1 : -1;
      return 0;
    });
  },

  renderTable() {
    this.applyFilters();
    const start = (this.page - 1) * this.perPage;
    const slice = this.filtered.slice(start, start + this.perPage);

    const tbody = document.getElementById('licenseTableBody');
    if (!tbody) return;

    if (!slice.length) {
      tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg><p>No licenses found</p></div></td></tr>`;
    } else {
      tbody.innerHTML = slice.map(l => this.rowHtml(l)).join('');
    }

    this.renderPagination();
    this.updateSortIcons();
    this.bindRowEvents();
  },

  rowHtml(l) {
    const status = dateStatus(l.expiryDate);
    const iStatus = dateStatus(l.issueDate);
    const rStatus = dateStatus(l.renewalDate);
    return `
    <tr data-id="${escHtml(l.id)}">
      <td><span class="license-no">${escHtml(l.licenseNo)}</span></td>
      <td><span class="description-cell">${escHtml(l.description)}</span></td>
      <td>${dateBadge(l.issueDate, 'active')}</td>
      <td>${dateBadge(l.expiryDate, status)}</td>
      <td>${dateBadge(l.renewalDate, rStatus)}</td>
      <td>${l.attachment ? `<a class="attach-link" href="#" data-attach="${escHtml(l.attachment)}">📎 ${escHtml(l.attachment)}</a>` : '—'}</td>
      <td class="datetime-cell">${escHtml(l.createdAt)}</td>
      <td class="datetime-cell">${escHtml(l.updatedAt)}</td>
      <td>
        <div class="action-group">
          <button class="action-btn action-btn-edit" data-action="edit" data-id="${escHtml(l.id)}" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="action-btn action-btn-delete" data-action="delete" data-id="${escHtml(l.id)}" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </td>
    </tr>`;
  },

  renderPagination() {
    const total = this.filtered.length;
    const pages = Math.ceil(total / this.perPage) || 1;
    this.page = Math.min(this.page, pages);

    const start = total ? (this.page - 1) * this.perPage + 1 : 0;
    const end   = Math.min(this.page * this.perPage, total);

    const infoEl = document.getElementById('pageInfo');
    if (infoEl) infoEl.textContent = `Showing ${start}–${end} of ${total} records`;

    const pgEl = document.getElementById('pagination');
    if (!pgEl) return;

    let html = `<button class="page-btn" id="pgPrev" ${this.page <= 1 ? 'disabled' : ''}>‹</button>`;
    const range = this.pageRange(this.page, pages);
    range.forEach(p => {
      if (p === '…') html += `<span class="page-btn" style="cursor:default">…</span>`;
      else html += `<button class="page-btn ${p === this.page ? 'active' : ''}" data-page="${p}">${p}</button>`;
    });
    html += `<button class="page-btn" id="pgNext" ${this.page >= pages ? 'disabled' : ''}>›</button>`;
    pgEl.innerHTML = html;

    pgEl.querySelectorAll('[data-page]').forEach(b => b.addEventListener('click', () => { this.page = +b.dataset.page; this.renderTable(); }));
    const prev = document.getElementById('pgPrev');
    const next = document.getElementById('pgNext');
    if (prev) prev.addEventListener('click', () => { if (this.page > 1) { this.page--; this.renderTable(); } });
    if (next) next.addEventListener('click', () => { if (this.page < pages) { this.page++; this.renderTable(); } });
  },

  pageRange(cur, total) {
    if (total <= 7) return Array.from({length: total}, (_, i) => i + 1);
    const pages = [];
    pages.push(1);
    if (cur > 3) pages.push('…');
    for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i);
    if (cur < total - 2) pages.push('…');
    pages.push(total);
    return pages;
  },

  updateSortIcons() {
    document.querySelectorAll('th[data-sort]').forEach(th => {
      const icon = th.querySelector('.sort-icon');
      if (!icon) return;
      if (th.dataset.sort === this.sortKey) {
        icon.className = `sort-icon ${this.sortDir}`;
        icon.textContent = this.sortDir === 'asc' ? '▲' : '▼';
      } else {
        icon.className = 'sort-icon';
        icon.textContent = '⇅';
      }
    });
  },

  /* ---------- EVENTS ---------- */
  bindEvents() {
    // Search
    const searchEl = document.getElementById('searchInput');
    if (searchEl) {
      searchEl.addEventListener('input', () => {
        this.searchQ = searchEl.value;
        this.page = 1;
        this.renderTable();
      });
    }

    // Records per page
    const rppEl = document.getElementById('rppSelect');
    if (rppEl) {
      rppEl.addEventListener('change', () => {
        this.perPage = +rppEl.value;
        this.page = 1;
        this.renderTable();
      });
    }

    // Column sort
    document.querySelectorAll('th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const key = th.dataset.sort;
        if (this.sortKey === key) this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
        else { this.sortKey = key; this.sortDir = 'asc'; }
        this.renderTable();
      });
    });

    // Refresh
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('spin');
        this.licenses = Storage.getLicenses();
        this.renderKPIs();
        this.renderTable();
        setTimeout(() => refreshBtn.classList.remove('spin'), 600);
        Toast.show('info', 'Refreshed', 'License data refreshed.');
      });
    }

    // KPI view details
    document.querySelectorAll('[data-filter-status]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const status = el.dataset.filterStatus;
        if (status === 'all') {
          this.searchQ = '';
          const searchEl = document.getElementById('searchInput');
          if (searchEl) searchEl.value = '';
        }
        this.page = 1;
        this.renderTable();
      });
    });

    // Export Excel
    const excelBtn = document.getElementById('exportExcel');
    if (excelBtn) excelBtn.addEventListener('click', () => this.exportExcel());

    // Export PDF
    const pdfBtn = document.getElementById('exportPDF');
    if (pdfBtn) pdfBtn.addEventListener('click', () => this.exportPDF());
  },

  bindRowEvents() {
    const tbody = document.getElementById('licenseTableBody');
    if (!tbody) return;

    tbody.querySelectorAll('[data-action="edit"]').forEach(btn => {
      btn.addEventListener('click', () => this.openEditModal(btn.dataset.id));
    });
    tbody.querySelectorAll('[data-action="delete"]').forEach(btn => {
      btn.addEventListener('click', () => this.confirmDelete(btn.dataset.id));
    });
  },

  /* ---------- EDIT MODAL ---------- */
  openEditModal(id) {
    const l = this.licenses.find(x => x.id === id);
    if (!l) return;
    this.editId = id;

    const set = (fid, val) => { const el = document.getElementById(fid); if(el) el.value = val || ''; };
    set('editLicenseNo',   l.licenseNo);
    set('editDescription', l.description);
    set('editIssueDate',   l.issueDate);
    set('editExpiryDate',  l.expiryDate);
    set('editRenewalDate', l.renewalDate);
    set('editOffice',      l.office);

    document.getElementById('editModal').classList.add('open');
  },

  closeEditModal() {
    document.getElementById('editModal').classList.remove('open');
    this.editId = null;
  },

  saveEdit() {
    if (!this.editId) return;
    const get = id => document.getElementById(id)?.value?.trim() || '';
    const data = {
      licenseNo:   get('editLicenseNo'),
      description: get('editDescription'),
      issueDate:   get('editIssueDate'),
      expiryDate:  get('editExpiryDate'),
      renewalDate: get('editRenewalDate'),
      office:      get('editOffice'),
    };
    if (!data.licenseNo || !data.description) {
      Toast.show('error', 'Validation Error', 'License No and Description are required.'); return;
    }
    Storage.updateLicense(this.editId, data);
    this.licenses = Storage.getLicenses();
    this.renderKPIs();
    this.renderTable();
    this.closeEditModal();
    Toast.show('success', 'Updated', 'License record updated successfully.');
  },

  /* ---------- DELETE CONFIRM ---------- */
  confirmDelete(id) {
    const l = this.licenses.find(x => x.id === id);
    if (!l) return;
    const msg = document.getElementById('confirmMsg');
    if (msg) msg.textContent = `Are you sure you want to delete "${l.description}" (${l.licenseNo})? This action cannot be undone.`;
    document.getElementById('confirmDeleteId').value = id;
    document.getElementById('confirmModal').classList.add('open');
  },

  doDelete() {
    const id = document.getElementById('confirmDeleteId')?.value;
    if (!id) return;
    Storage.deleteLicense(id);
    this.licenses = Storage.getLicenses();
    this.renderKPIs();
    this.renderTable();
    document.getElementById('confirmModal').classList.remove('open');
    Toast.show('success', 'Deleted', 'License record deleted successfully.');
  },

  /* ---------- EXPORT EXCEL ---------- */
  exportExcel() {
    const headers = ['License No','Description','Issue Date','Expiry Date','Renewal Date','Office','Attachment','Created At','Updated At'];
    const rows = this.filtered.map(l => [
      l.licenseNo, l.description, l.issueDate, l.expiryDate, l.renewalDate,
      l.office, l.attachment, l.createdAt, l.updatedAt
    ]);
    let csv = headers.join(',') + '\n';
    rows.forEach(r => { csv += r.map(v => `"${String(v||'').replace(/"/g,'""')}"`).join(',') + '\n'; });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href: url, download: 'licenses_export.csv' });
    a.click(); URL.revokeObjectURL(url);
    Toast.show('success', 'Export', 'Licenses exported as CSV/Excel.');
  },

  /* ---------- EXPORT PDF ---------- */
  exportPDF() {
    const win = window.open('', '_blank');
    const rows = this.filtered.map(l => `
      <tr>
        <td>${escHtml(l.licenseNo)}</td>
        <td>${escHtml(l.description)}</td>
        <td>${escHtml(l.issueDate)}</td>
        <td>${escHtml(l.expiryDate)}</td>
        <td>${escHtml(l.renewalDate)}</td>
        <td>${escHtml(l.office)}</td>
        <td>${escHtml(l.attachment)}</td>
      </tr>`).join('');
    win.document.write(`<!DOCTYPE html><html><head><title>License Report</title>
    <style>
      body { font-family: Arial, sans-serif; font-size: 11px; margin: 20px; color: #111; }
      h2 { margin-bottom: 4px; font-size: 16px; }
      p  { margin-bottom: 12px; color: #555; font-size: 11px; }
      table { width: 100%; border-collapse: collapse; }
      th { background: #1a56db; color: #fff; padding: 7px 8px; text-align: left; font-size: 10px; text-transform: uppercase; }
      td { padding: 6px 8px; border-bottom: 1px solid #e5e7eb; }
      tr:nth-child(even) td { background: #f9fafb; }
      @media print { body { margin: 0; } }
    </style></head><body>
    <h2>License Management Report</h2>
    <p>Generated: ${new Date().toLocaleString()} &nbsp;|&nbsp; Total: ${this.filtered.length} records</p>
    <table><thead><tr><th>License No</th><th>Description</th><th>Issue Date</th><th>Expiry Date</th><th>Renewal</th><th>Office</th><th>Attachment</th></tr></thead>
    <tbody>${rows}</tbody></table>
    <script>window.onload=function(){window.print();}<\/script></body></html>`);
    win.document.close();
    Toast.show('info', 'Print/PDF', 'Print dialog opened.');
  }
};

/* ============================================================
   ADD LICENSE PAGE
   ============================================================ */
const AddLicense = {
  fileData: null,

  init() {
    this.bindEvents();
    hideLoader();
  },

  bindEvents() {
    const form = document.getElementById('addLicenseForm');
    if (!form) return;

    // Save
    document.getElementById('saveBtn')?.addEventListener('click', () => this.submit());

    // Reset
    document.getElementById('resetBtn')?.addEventListener('click', () => this.reset());

    // File upload
    const fileInput = document.getElementById('attachmentFile');
    const dropArea  = document.getElementById('fileDropArea');

    if (fileInput) {
      fileInput.addEventListener('change', () => this.handleFile(fileInput.files[0]));
    }
    if (dropArea) {
      dropArea.addEventListener('dragover', e => { e.preventDefault(); dropArea.classList.add('dragover'); });
      dropArea.addEventListener('dragleave', () => dropArea.classList.remove('dragover'));
      dropArea.addEventListener('drop', e => {
        e.preventDefault(); dropArea.classList.remove('dragover');
        const f = e.dataTransfer.files[0];
        if (f) { fileInput.files = e.dataTransfer.files; this.handleFile(f); }
      });
    }

    // Live validation clearing
    form.querySelectorAll('.form-control').forEach(el => {
      el.addEventListener('input', () => { el.classList.remove('error'); const err = el.closest('.form-group')?.querySelector('.form-error'); if(err) err.textContent = ''; });
    });
  },

  handleFile(file) {
    if (!file) return;
    this.fileData = { name: file.name, size: file.size };
    const preview = document.getElementById('filePreview');
    if (preview) {
      preview.style.display = 'flex';
      preview.querySelector('.file-preview-name').textContent = file.name;
      preview.querySelector('.file-preview-size').textContent = formatBytes(file.size);
      preview.querySelector('.file-preview-remove').onclick = () => {
        this.fileData = null;
        preview.style.display = 'none';
        document.getElementById('attachmentFile').value = '';
      };
    }
  },

  validate() {
    let valid = true;
    const required = [
      { id: 'licenseNo',   label: 'License No' },
      { id: 'description', label: 'Description' },
      { id: 'issueDate',   label: 'Issue Date' },
      { id: 'expiryDate',  label: 'Expiry Date' },
    ];
    required.forEach(({ id, label }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const errEl = el.closest('.form-group')?.querySelector('.form-error');
      if (!el.value.trim()) {
        el.classList.add('error');
        if (errEl) errEl.textContent = `${label} is required.`;
        valid = false;
      }
    });
    // Date cross-check
    const issue  = document.getElementById('issueDate')?.value;
    const expiry = document.getElementById('expiryDate')?.value;
    if (issue && expiry && new Date(expiry) < new Date(issue)) {
      const el = document.getElementById('expiryDate');
      el.classList.add('error');
      const errEl = el.closest('.form-group')?.querySelector('.form-error');
      if (errEl) errEl.textContent = 'Expiry Date must be after Issue Date.';
      valid = false;
    }
    return valid;
  },

  submit() {
    if (!this.validate()) {
      Toast.show('error', 'Validation Failed', 'Please fix the highlighted fields.');
      return;
    }
    const get = id => document.getElementById(id)?.value?.trim() || '';
    const license = {
      id:          genId(),
      licenseNo:   get('licenseNo'),
      description: get('description'),
      issueDate:   get('issueDate'),
      expiryDate:  get('expiryDate'),
      renewalDate: get('renewalDate'),
      office:      get('office'),
      attachment:  this.fileData ? this.fileData.name : '',
      createdAt:   now(),
      updatedAt:   now(),
    };
    Storage.addLicense(license);
    Toast.show('success', 'Saved', `"${license.description}" has been added successfully.`);
    this.reset();

    // Auto-redirect after short delay
    setTimeout(() => { window.location.href = 'index.html'; }, 1800);
  },

  reset() {
    const form = document.getElementById('addLicenseForm');
    if (form) { form.querySelectorAll('.form-control').forEach(el => { el.value = ''; el.classList.remove('error'); }); }
    this.fileData = null;
    const preview = document.getElementById('filePreview');
    if (preview) preview.style.display = 'none';
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    Toast.show('info', 'Cleared', 'Form has been reset.');
  }
};

/* ============================================================
   MODAL WIRING (Dashboard)
   ============================================================ */
function wireDashboardModals() {
  // Edit modal
  document.getElementById('closeEditModal')?.addEventListener('click', () => Dashboard.closeEditModal());
  document.getElementById('cancelEditBtn')?.addEventListener('click', () => Dashboard.closeEditModal());
  document.getElementById('saveEditBtn')?.addEventListener('click',   () => Dashboard.saveEdit());

  // Confirm delete modal
  document.getElementById('closeConfirmModal')?.addEventListener('click', () => document.getElementById('confirmModal').classList.remove('open'));
  document.getElementById('cancelDeleteBtn')?.addEventListener('click',   () => document.getElementById('confirmModal').classList.remove('open'));
  document.getElementById('confirmDeleteBtn')?.addEventListener('click',  () => Dashboard.doDelete());

  // Close on overlay click
  ['editModal', 'confirmModal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', e => { if (e.target === el) el.classList.remove('open'); });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Detect page
  const isDashboard = !!document.getElementById('licenseTableBody');
  const isAddPage   = !!document.getElementById('addLicenseForm');

  if (isDashboard) {
    wireDashboardModals();
    Dashboard.init();
  }
  if (isAddPage) {
    AddLicense.init();
  }
  if (!isDashboard && !isAddPage) {
    hideLoader();
  }
});
