const recordsKey = "asoviv.demo.records";
const accountsKey = "asoviv.admin.accounts";
const sessionKey = "asoviv.current.session";
const financeKey = "asoviv.finance.data";
const treasuryKey = "asoviv.treasury.data";
const incidentsKey = "asoviv.incidents.data";
const governanceKey = "asoviv.governance.data";

const defaultSuperAdmin = {
  id: "seed-superadmin",
  username: "AndreeJMGz",
  password: "5777374221710",
  nombreCompleto: "AndreeJMGz",
  correo: "",
  celular: "",
  cargoJunta: "superadmin",
  role: "superadmin",
  active: true,
  protected: true,
  createdAt: "2026-05-25T00:00:00.000Z",
  updatedAt: "2026-05-25T00:00:00.000Z"
};

function buildLotes(total, overrides = {}) {
  return Array.from({ length: total }, (_, index) => {
    const numero = String(index + 1);
    const override = overrides[numero] || {};
    return {
      numero,
      area: override.area ?? 200,
      perimetro: override.perimetro ?? 66,
      referencial: true
    };
  });
}

const masterData = [
  { codigo: "A", nombre: "Manzana A", lotes: buildLotes(16, { "1": { area: 219.53, perimetro: 76.99 }, "2": { area: 197.15, perimetro: 59.23 }, "3": { area: 207.89, perimetro: 65.33 }, "16": { area: 173.19, perimetro: 60.31 } }) },
  { codigo: "A-1", nombre: "Manzana A-1", lotes: buildLotes(15) },
  { codigo: "A-2", nombre: "Manzana A-2", lotes: buildLotes(15, { "1": { area: 200, perimetro: 60 }, "3": { area: 200, perimetro: 60 } }) },
  { codigo: "A-3", nombre: "Manzana A-3", lotes: buildLotes(5, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "B", nombre: "Manzana B", lotes: buildLotes(16) },
  { codigo: "B-1", nombre: "Manzana B-1", lotes: buildLotes(15) },
  { codigo: "B-2", nombre: "Manzana B-2", lotes: buildLotes(15, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "B-3", nombre: "Manzana B-3", lotes: buildLotes(5, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "C", nombre: "Manzana C", lotes: buildLotes(16, { "1": { area: 286.93, perimetro: 72.96 } }) },
  { codigo: "C-1", nombre: "Manzana C-1", lotes: buildLotes(15) },
  { codigo: "C-2", nombre: "Manzana C-2", lotes: buildLotes(5, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "C-3", nombre: "Manzana C-3", lotes: buildLotes(5, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "D", nombre: "Manzana D", lotes: buildLotes(16, { "1": { area: 265.82, perimetro: 71.27 } }) },
  { codigo: "D-1", nombre: "Manzana D-1", lotes: buildLotes(16, { "1": { area: 200.4, perimetro: 66.7 } }) },
  { codigo: "D-2", nombre: "Manzana D-2", lotes: buildLotes(15, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "D-3", nombre: "Manzana D-3", lotes: buildLotes(5, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "E", nombre: "Manzana E", lotes: buildLotes(16, { "1": { area: 244.72, perimetro: 69.58 } }) },
  { codigo: "E-1", nombre: "Manzana E-1", lotes: buildLotes(8, { "1": { area: 200.4, perimetro: 66.7 } }) },
  { codigo: "E-2", nombre: "Manzana E-2", lotes: buildLotes(7, { "2": { area: 200, perimetro: 60 } }) },
  { codigo: "E-3", nombre: "Manzana E-3", lotes: buildLotes(5, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "F", nombre: "Manzana F", lotes: buildLotes(16, { "3": { area: 223.61, perimetro: 67.89 } }) },
  { codigo: "F-1", nombre: "Manzana F-1", lotes: buildLotes(16, { "1": { area: 200.4, perimetro: 64.7 } }) },
  { codigo: "F-2", nombre: "Manzana F-2", lotes: buildLotes(15, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "F-3", nombre: "Manzana F-3", lotes: buildLotes(5, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "G", nombre: "Manzana G", lotes: buildLotes(16, { "3": { area: 202.5, perimetro: 66.2 } }) },
  { codigo: "G-1", nombre: "Manzana G-1", lotes: buildLotes(15) },
  { codigo: "G-2", nombre: "Manzana G-2", lotes: buildLotes(15, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "G-3", nombre: "Manzana G-3", lotes: buildLotes(5, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "H", nombre: "Manzana H", lotes: buildLotes(16, { "3": { area: 181.4, perimetro: 64.51 } }) },
  { codigo: "H-1", nombre: "Manzana H-1", lotes: buildLotes(15) },
  { codigo: "H-2", nombre: "Manzana H-2", lotes: buildLotes(15, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "H-3", nombre: "Manzana H-3", lotes: buildLotes(5, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "I", nombre: "Manzana I", lotes: buildLotes(16, { "3": { area: 360.29, perimetro: 78.83 } }) },
  { codigo: "I-1", nombre: "Manzana I-1", lotes: buildLotes(15) },
  { codigo: "I-2", nombre: "Manzana I-2", lotes: buildLotes(12) },
  { codigo: "I-3", nombre: "Manzana I-3", lotes: buildLotes(5, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "J", nombre: "Manzana J", lotes: buildLotes(16, { "3": { area: 339.19, perimetro: 77.14 } }) },
  { codigo: "J-1", nombre: "Manzana J-1", lotes: buildLotes(15) },
  { codigo: "J-2", nombre: "Manzana J-2", lotes: buildLotes(15, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "J-3", nombre: "Manzana J-3", lotes: buildLotes(5, { "1": { area: 200, perimetro: 60 } }) },
  { codigo: "K", nombre: "Manzana K", lotes: buildLotes(16, { "3": { area: 318.08, perimetro: 74.45 } }) },
  { codigo: "K-1", nombre: "Manzana K-1", lotes: buildLotes(15) },
  { codigo: "K-2", nombre: "Manzana K-2", lotes: buildLotes(12) },
  { codigo: "K-3", nombre: "Manzana K-3", lotes: buildLotes(5) },
  { codigo: "L", nombre: "Manzana L", lotes: buildLotes(16, { "3": { area: 296.97, perimetro: 73.76 } }) },
  { codigo: "L-1", nombre: "Manzana L-1", lotes: buildLotes(15) },
  { codigo: "L-2", nombre: "Manzana L-2", lotes: buildLotes(12) },
  { codigo: "L-3", nombre: "Manzana L-3", lotes: buildLotes(5) },
  { codigo: "M", nombre: "Manzana M", lotes: buildLotes(16, { "3": { area: 275.87, perimetro: 72.07 } }) },
  { codigo: "M-1", nombre: "Manzana M-1", lotes: buildLotes(15) },
  { codigo: "M-2", nombre: "Manzana M-2", lotes: buildLotes(12) },
  { codigo: "M-3", nombre: "Manzana M-3", lotes: buildLotes(5) },
  { codigo: "N", nombre: "Manzana N", lotes: buildLotes(16, { "3": { area: 254.76, perimetro: 70.38 } }) },
  { codigo: "N-1", nombre: "Manzana N-1", lotes: buildLotes(15) },
  { codigo: "N-2", nombre: "Manzana N-2", lotes: buildLotes(12) },
  { codigo: "N-3", nombre: "Manzana N-3", lotes: buildLotes(5) },
  { codigo: "Ñ", nombre: "Manzana Ñ", lotes: buildLotes(16, { "3": { area: 233.66, perimetro: 68.69 } }) },
  { codigo: "Ñ-1", nombre: "Manzana Ñ-1", lotes: buildLotes(15) },
  { codigo: "Ñ-2", nombre: "Manzana Ñ-2", lotes: buildLotes(12) },
  { codigo: "Ñ-3", nombre: "Manzana Ñ-3", lotes: buildLotes(5) },
  { codigo: "O", nombre: "Manzana O", lotes: buildLotes(1, { "1": { area: 3000, perimetro: 220 } }) },
  { codigo: "O-1", nombre: "Manzana O-1", lotes: buildLotes(1, { "1": { area: 77.66, perimetro: 46.5 } }) },
  { codigo: "P-1", nombre: "Manzana P-1", lotes: buildLotes(1, { "1": { area: 305.32, perimetro: 90.8 } }) },
  { codigo: "P-2", nombre: "Manzana P-2", lotes: buildLotes(9, { "1": { area: 204, perimetro: 65 }, "2": { area: 492.88, perimetro: 107.66 }, "3": { area: 204, perimetro: 65 } }) },
  { codigo: "P-3", nombre: "Manzana P-3", lotes: buildLotes(6, { "6": { area: 339.13, perimetro: 76.43 } }) }
];

const authView = document.getElementById("auth-view");
const portalView = document.getElementById("portal-view");
const appView = document.getElementById("app-view");
const openPortalButton = document.getElementById("open-portal-button");
const portalBackButton = document.getElementById("portal-back-button");
const tabButtons = [...document.querySelectorAll(".tab-button")];
const registroTabPanel = document.getElementById("tab-panel-registro");
const finanzasTabPanel = document.getElementById("tab-panel-finanzas");
const tesoreriaTabPanel = document.getElementById("tab-panel-tesoreria");
const incidenciasTabPanel = document.getElementById("tab-panel-incidencias");
const asambleasTabPanel = document.getElementById("tab-panel-asambleas");
const reportesTabPanel = document.getElementById("tab-panel-reportes");
const usuariosTabPanel = document.getElementById("tab-panel-usuarios");
const superadminTabPanel = document.getElementById("tab-panel-superadmin");
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const logoutButton = document.getElementById("logout-button");
const currentUserName = document.getElementById("current-user-name");
const currentUserRole = document.getElementById("current-user-role");
const accountAdminSection = document.getElementById("account-admin-section");
const accountForm = document.getElementById("account-form");
const accountFormTitle = document.getElementById("account-form-title");
const accountMessage = document.getElementById("account-message");
const accountsList = document.getElementById("accounts-list");
const accountsEmpty = document.getElementById("accounts-empty");
const accountCancelButton = document.getElementById("account-cancel");
const superadminOverview = document.getElementById("superadmin-overview");
const superadminMessage = document.getElementById("superadmin-message");
const superadminActivity = document.getElementById("superadmin-activity");

const form = document.getElementById("socio-form");
const manzanaSelect = document.getElementById("manzana");
const loteSelect = document.getElementById("lote");
const lotMeta = document.getElementById("lot-meta");
const summary = document.getElementById("summary");
const messageBox = document.getElementById("form-message");
const recordsList = document.getElementById("records-list");
const recordsEmpty = document.getElementById("records-empty");
const cotitularesList = document.getElementById("cotitulares-list");
const cotitularTemplate = document.getElementById("cotitular-template");
const resetButton = document.getElementById("reset-button");
const clearStorageButton = document.getElementById("clear-storage");
const addCotitularButton = document.getElementById("add-cotitular");
const financeDashboard = document.getElementById("finance-dashboard");
const financeSearchInput = document.getElementById("finance-search");
const financeRecordsEmpty = document.getElementById("finance-records-empty");
const financeRecordsList = document.getElementById("finance-records-list");
const financeSelectedCard = document.getElementById("finance-selected-card");
const activityForm = document.getElementById("activity-form");
const activityFormTitle = document.getElementById("activity-form-title");
const activityMessage = document.getElementById("activity-message");
const activityCancelButton = document.getElementById("activity-cancel");
const activityTitleInput = document.getElementById("activity-title");
const activityDescriptionInput = document.getElementById("activity-description");
const activityDateInput = document.getElementById("activity-date");
const activityTargetInput = document.getElementById("activity-target");
const activitySuggestedInput = document.getElementById("activity-suggested");
const activitySuggestedHelp = document.getElementById("activity-suggested-help");
const activityStatusInput = document.getElementById("activity-status");
const movementForm = document.getElementById("movement-form");
const movementFormTitle = document.getElementById("movement-form-title");
const movementMessage = document.getElementById("movement-message");
const movementCancelButton = document.getElementById("movement-cancel");
const movementSubmitButton = document.getElementById("movement-submit");
const movementLotSelect = document.getElementById("movement-lot");
const movementTypeSelect = document.getElementById("movement-type");
const movementAmountInput = document.getElementById("movement-amount");
const movementDateInput = document.getElementById("movement-date");
const movementMethodSelect = document.getElementById("movement-method");
const movementDetailInput = document.getElementById("movement-detail");
const activityLotFilterSelect = document.getElementById("activity-lot-filter");
const chargesList = document.getElementById("charges-list");
const chargesEmpty = document.getElementById("charges-empty");
const treasuryDashboard = document.getElementById("treasury-dashboard");
const providerForm = document.getElementById("provider-form");
const providerMessage = document.getElementById("provider-message");
const providerCancelButton = document.getElementById("provider-cancel");
const providersList = document.getElementById("providers-list");
const providersEmpty = document.getElementById("providers-empty");
const expenseForm = document.getElementById("expense-form");
const expenseMessage = document.getElementById("expense-message");
const expenseCancelButton = document.getElementById("expense-cancel");
const expenseProviderSelect = document.getElementById("expense-provider");
const expenseRelatedRecordSelect = document.getElementById("expense-related-record");
const expensesList = document.getElementById("expenses-list");
const expensesEmpty = document.getElementById("expenses-empty");
const incidentsDashboard = document.getElementById("incidents-dashboard");
const incidentForm = document.getElementById("incident-form");
const incidentMessage = document.getElementById("incident-message");
const incidentCancelButton = document.getElementById("incident-cancel");
const incidentRecordSelect = document.getElementById("incident-record");
const incidentsList = document.getElementById("incidents-list");
const incidentsEmpty = document.getElementById("incidents-empty");
const workOrderForm = document.getElementById("work-order-form");
const workOrderMessage = document.getElementById("workorder-message");
const workOrderCancelButton = document.getElementById("workorder-cancel");
const workOrderIncidentSelect = document.getElementById("workorder-incident");
const workOrderProviderSelect = document.getElementById("workorder-provider");
const workOrdersList = document.getElementById("workorders-list");
const workOrdersEmpty = document.getElementById("workorders-empty");
const governanceDashboard = document.getElementById("governance-dashboard");
const assemblyForm = document.getElementById("assembly-form");
const assemblyMessage = document.getElementById("assembly-message");
const assemblyCancelButton = document.getElementById("assembly-cancel");
const assembliesList = document.getElementById("assemblies-list");
const assembliesEmpty = document.getElementById("assemblies-empty");
const agreementForm = document.getElementById("agreement-form");
const agreementMessage = document.getElementById("agreement-message");
const agreementCancelButton = document.getElementById("agreement-cancel");
const agreementAssemblySelect = document.getElementById("agreement-assembly");
const agreementsList = document.getElementById("agreements-list");
const agreementsEmpty = document.getElementById("agreements-empty");
const documentForm = document.getElementById("document-form");
const documentMessage = document.getElementById("document-message");
const documentCancelButton = document.getElementById("document-cancel");
const documentsList = document.getElementById("documents-list");
const documentsEmpty = document.getElementById("documents-empty");
const reportsOverview = document.getElementById("reports-overview");
const reportsBreakdown = document.getElementById("reports-breakdown");
const reportsActivity = document.getElementById("reports-activity");
const reportsMessage = document.getElementById("reports-message");
const exportRecordsButton = document.getElementById("export-records");
const exportFinanceButton = document.getElementById("export-finance");
const exportExpensesButton = document.getElementById("export-expenses");
const portalOverview = document.getElementById("portal-overview");
const portalActivitySearchInput = document.getElementById("portal-activity-search");
const portalActivityStatusFilter = document.getElementById("portal-activity-status-filter");
const portalActivitiesEmpty = document.getElementById("portal-activities-empty");
const portalActivitiesList = document.getElementById("portal-activities-list");
const portalRecentActivity = document.getElementById("portal-recent-activity");
const portalLookupForm = document.getElementById("portal-lookup-form");
const portalLookupMessage = document.getElementById("portal-lookup-message");
const portalDocumentInput = document.getElementById("portal-document");
const portalManzanaSelect = document.getElementById("portal-manzana");
const portalLoteSelect = document.getElementById("portal-lote");
const portalClearButton = document.getElementById("portal-clear-button");
const portalAccountResult = document.getElementById("portal-account-result");
const superadminNavButtons = [...document.querySelectorAll("[data-superadmin-nav]")];
const superadminActionButtons = [...document.querySelectorAll("[data-superadmin-action]")];
const remoteStore = window.SantaLuzmilaStore;

let editingRecordId = null;
let editingAccountId = null;
let editingFinanceActivityId = null;
let editingMovementId = null;
let editingProviderId = null;
let editingExpenseId = null;
let editingIncidentId = null;
let editingWorkOrderId = null;
let editingAssemblyId = null;
let editingAgreementId = null;
let editingDocumentId = null;
let activeTab = "registro";
let activeSurface = "auth";
let selectedFinanceRecordId = null;
let selectedFinanceLotId = null;
let activeActivityLotFilter = "todos";
let portalLookupState = {
  documentNumber: "",
  manzana: "",
  lote: ""
};

function generateId() {
  return window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function setMessage(element, text, type) {
  element.textContent = text;
  element.className = `form-message ${type}`;
}

function clearMessage(element) {
  element.textContent = "";
  element.className = "form-message hidden";
}

function getAccounts() {
  return remoteStore.getAccounts();
}

function saveAccounts(accounts) {
  return remoteStore.saveAccounts(accounts);
}

function getRecords() {
  return remoteStore.getRecords();
}

function saveRecords(records) {
  return remoteStore.saveRecords(records);
}

function getFinanceData() {
  return remoteStore.getFinanceData();
}

function saveFinanceData(financeData) {
  return remoteStore.saveFinanceData(financeData);
}

function getTreasuryData() {
  return remoteStore.getTreasuryData();
}

function saveTreasuryData(treasuryData) {
  return remoteStore.saveTreasuryData(treasuryData);
}

function getIncidentsData() {
  return remoteStore.getIncidentsData();
}

function saveIncidentsData(incidentsData) {
  return remoteStore.saveIncidentsData(incidentsData);
}

function getGovernanceData() {
  return remoteStore.getGovernanceData();
}

function saveGovernanceData(governanceData) {
  return remoteStore.saveGovernanceData(governanceData);
}

function getPortalRecords() {
  return remoteStore.getPortalRecords();
}

function getPortalFinanceData() {
  return remoteStore.getPortalFinanceData();
}

function getPortalTreasuryData() {
  return remoteStore.getPortalTreasuryData();
}

function getPortalGovernanceData() {
  return remoteStore.getPortalGovernanceData();
}

function formatCurrency(value) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2
  }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("es-PE");
}

function getTodayIso() {
  return new Date().toISOString().slice(0, 10);
}

function getCurrentMonthIso() {
  return new Date().toISOString().slice(0, 7);
}

function formatPeriodLabel(periodValue) {
  if (!periodValue) {
    return "";
  }

  const [year, month] = periodValue.split("-").map(Number);
  if (!year || !month) {
    return periodValue;
  }

  return new Date(year, month - 1, 1).toLocaleDateString("es-PE", {
    month: "long",
    year: "numeric"
  });
}

function humanizeStatus(status) {
  const labels = {
    pendiente: "Pendiente",
    pagado: "Pagado",
    parcial: "Pago parcial"
  };

  return labels[status] || status;
}

function getRecordById(recordId) {
  return getRecords().find((record) => record.id === recordId) || null;
}

function ensureSeedAccounts() {
  remoteStore.ensureLocalSuperAdmin(defaultSuperAdmin);
}

function setSession(accountId) {
  remoteStore.setLocalSession(accountId);
}

function clearSession() {
  return remoteStore.logout();
}

function getCurrentUser() {
  return remoteStore.getCurrentUser();
}

function roleLabel(account) {
  if (!account) {
    return "-";
  }

  if (account.role === "superadmin") {
    return "Super admin";
  }

  return `Directivo - ${humanizeValue(account.cargoJunta)}`;
}

function canAccessMoneyModules(user) {
  if (!user) {
    return false;
  }

  if (user.role === "superadmin") {
    return true;
  }

  return ["tesorero", "tesorera"].includes(user.cargoJunta);
}

function availableTabsForUser(user) {
  if (!user) {
    return ["registro", "incidencias", "asambleas", "reportes"];
  }

  const baseTabs = ["registro", "incidencias", "asambleas", "reportes"];
  const moneyTabs = canAccessMoneyModules(user) ? ["finanzas", "tesoreria"] : [];

  if (user.role === "superadmin") {
    return ["superadmin", ...baseTabs, ...moneyTabs, "usuarios"];
  }

  return [...baseTabs, ...moneyTabs];
}

function setActiveTab(tabId) {
  const currentUser = getCurrentUser();
  const allowedTabs = availableTabsForUser(currentUser);
  activeTab = allowedTabs.includes(tabId) ? tabId : allowedTabs[0];

  if (activeTab === "finanzas" && !selectedFinanceRecordId) {
    const firstActivity = getFinanceData().activities[0];
    if (firstActivity) {
      selectedFinanceRecordId = firstActivity.id;
    }
  }

  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === activeTab;
    const isAllowed = allowedTabs.includes(button.dataset.tab);
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.classList.toggle("hidden", !isAllowed);
  });

  registroTabPanel.classList.toggle("hidden", activeTab !== "registro");
  finanzasTabPanel.classList.toggle("hidden", activeTab !== "finanzas");
  tesoreriaTabPanel.classList.toggle("hidden", activeTab !== "tesoreria");
  incidenciasTabPanel.classList.toggle("hidden", activeTab !== "incidencias");
  asambleasTabPanel.classList.toggle("hidden", activeTab !== "asambleas");
  reportesTabPanel.classList.toggle("hidden", activeTab !== "reportes");
  usuariosTabPanel.classList.toggle("hidden", activeTab !== "usuarios");
  superadminTabPanel.classList.toggle("hidden", activeTab !== "superadmin");
}

function getManzanaByCode(code) {
  return masterData.find((item) => item.codigo === code);
}

function getSelectedLot() {
  const manzana = getManzanaByCode(manzanaSelect.value);
  if (!manzana) {
    return null;
  }

  return manzana.lotes.find((item) => item.numero === loteSelect.value) || null;
}

function getOccupancyForLot(manzanaCode, loteNumero, ignoreId) {
  return getRecords().filter((record) => {
    const sameLot = record.ubicacion.manzana === manzanaCode && record.ubicacion.lote === loteNumero;
    const active = record.titular.estadoSocio !== "retirado";
    const otherRecord = record.id !== ignoreId;
    return sameLot && active && otherRecord;
  });
}

function getRecordLabel(record) {
  if (!record) {
    return "Socio no encontrado";
  }

  return `${record.titular.nombres} ${record.titular.apellidos} - ${record.ubicacion.manzana}/Lote ${record.ubicacion.lote}`;
}

function getSelectedFinanceRecord() {
  return selectedFinanceRecordId
    ? getFinanceData().activities.find((activity) => activity.id === selectedFinanceRecordId) || null
    : null;
}

function getActivityById(activityId) {
  return getFinanceData().activities.find((activity) => activity.id === activityId) || null;
}

function getMovementTypeLabel(type) {
  const labels = {
    aporte_dinero: "Aporto dinero",
    devolucion: "Devolucion de aporte",
    apoyo_fisico: "Ayudo fisicamente",
    compensacion_aprobada: "Compensacion aprobada",
    exoneracion: "Exonerado por junta",
    sin_respuesta: "Sin respuesta",
    observacion: "Observacion"
  };

  return labels[type] || humanizeValue(type);
}

function getMethodLabel(method) {
  const labels = {
    efectivo: "Efectivo",
    transferencia: "Transferencia",
    deposito: "Deposito",
    yape_plin: "Yape / Plin",
    acuerdo_junta: "Acuerdo de junta",
    visita_verificada: "Visita verificada",
    mensaje: "Mensaje",
    otro: "Otro"
  };

  return labels[method] || humanizeValue(method);
}

function getActivityLots(activityId) {
  return getFinanceData().activityLots.filter((activityLot) => activityLot.activityId === activityId);
}

function getActivityLotById(activityLotId) {
  return getFinanceData().activityLots.find((activityLot) => activityLot.id === activityLotId) || null;
}

function getMovementById(movementId) {
  return getFinanceData().activityMovements.find((movement) => movement.id === movementId) || null;
}

function getActivityMovements(activityLotId) {
  return getFinanceData().activityMovements
    .filter((movement) => movement.activityLotId === activityLotId)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function syncActivityLotsForActivity(activity, finance) {
  const activeRecords = getRecords().filter((record) => record.titular.estadoSocio !== "retirado");
  const currentLots = finance.activityLots.filter((activityLot) => activityLot.activityId === activity.id);
  const otherLots = finance.activityLots.filter((activityLot) => activityLot.activityId !== activity.id);
  const now = new Date().toISOString();

  const nextLots = activeRecords.map((record) => {
    const existing = currentLots.find((activityLot) => activityLot.recordId === record.id);
    return {
      id: existing ? existing.id : generateId(),
      activityId: activity.id,
      recordId: record.id,
      recordSnapshot: {
        titular: `${record.titular.nombres} ${record.titular.apellidos}`,
        documento: `${record.titular.tipoDocumento} ${record.titular.numeroDocumento}`,
        manzana: record.ubicacion.manzana,
        lote: record.ubicacion.lote
      },
      suggestedAmount: Number(activity.suggestedPerLot || 0),
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now
    };
  });

  const orphanLots = currentLots.filter((activityLot) => !activeRecords.some((record) => record.id === activityLot.recordId));

  return {
    ...finance,
    activityLots: [...otherLots, ...nextLots, ...orphanLots]
  };
}

function getActivityLotComputedState(activityLot, options = {}) {
  const { ignoreMovementId = null } = options;
  const movements = getActivityMovements(activityLot.id);
  const activeMovements = movements.filter((movement) => movement.status !== "anulado" && movement.id !== ignoreMovementId);
  const suggestedAmount = Number(activityLot.suggestedAmount || 0);
  const grossMoneyAmount = activeMovements
    .filter((movement) => movement.type === "aporte_dinero")
    .reduce((sum, movement) => sum + Number(movement.amount || 0), 0);
  const returnedAmount = activeMovements
    .filter((movement) => movement.type === "devolucion")
    .reduce((sum, movement) => sum + Number(movement.amount || 0), 0);
  const moneyAmount = Math.max(grossMoneyAmount - returnedAmount, 0);
  const approvedCompensation = activeMovements
    .filter((movement) => movement.type === "compensacion_aprobada")
    .reduce((sum, movement) => sum + Number(movement.amount || 0), 0);
  const hasPhysicalSupport = activeMovements.some((movement) => movement.type === "apoyo_fisico");
  const isExonerated = activeMovements.some((movement) => movement.type === "exoneracion");
  const noResponseMarked = activeMovements.some((movement) => movement.type === "sin_respuesta");
  const recognizedAmount = moneyAmount + approvedCompensation;
  const remainingAmount = isExonerated ? 0 : Math.max(suggestedAmount - recognizedAmount, 0);
  const maxRefundableAmount = Math.max(grossMoneyAmount - returnedAmount, 0);
  let status = "pendiente";

  if (isExonerated) {
    status = "exonerado";
  } else if (recognizedAmount >= suggestedAmount && approvedCompensation > 0) {
    status = "compensado_por_junta";
  } else if (moneyAmount >= suggestedAmount && moneyAmount > 0) {
    status = "aporte_completo";
  } else if (moneyAmount > 0) {
    status = "aporte_parcial";
  } else if (hasPhysicalSupport) {
    status = "apoyo_fisico_registrado";
  } else if (noResponseMarked) {
    status = "sin_respuesta";
  }

  return {
    movements,
    activeMovements,
    moneyAmount,
    grossMoneyAmount,
    returnedAmount,
    approvedCompensation,
    recognizedAmount,
    remainingAmount,
    maxRefundableAmount,
    hasPhysicalSupport,
    isExonerated,
    noResponseMarked,
    status
  };
}

function getActivityComputedSummary(activity) {
  if (!activity) {
    return {
      targetAmount: 0,
      collectedAmount: 0,
      missingAmount: 0,
      totalLots: 0,
      paidLots: 0,
      supportLots: 0,
      compensatedLots: 0,
      noResponseLots: 0,
      pendingLots: 0
    };
  }

  const activityLots = getActivityLots(activity.id);
  return activityLots.reduce(
    (accumulator, activityLot) => {
      const computed = getActivityLotComputedState(activityLot);
      accumulator.targetAmount = Number(activity.targetAmount || 0);
      accumulator.collectedAmount += computed.moneyAmount;
      accumulator.totalLots += 1;
      if (computed.moneyAmount > 0) {
        accumulator.paidLots += 1;
      }
      if (computed.hasPhysicalSupport) {
        accumulator.supportLots += 1;
      }
      if (computed.status === "compensado_por_junta" || computed.status === "exonerado") {
        accumulator.compensatedLots += 1;
      }
      if (computed.status === "sin_respuesta") {
        accumulator.noResponseLots += 1;
      }
      if (computed.remainingAmount > 0 && !computed.isExonerated) {
        accumulator.pendingLots += 1;
      }
      return accumulator;
    },
    {
      targetAmount: Number(activity.targetAmount || 0),
      collectedAmount: 0,
      missingAmount: 0,
      totalLots: 0,
      paidLots: 0,
      supportLots: 0,
      compensatedLots: 0,
      noResponseLots: 0,
      pendingLots: 0
    }
  );
}

function getPortalActivityById(activityId) {
  return getPortalFinanceData().activities.find((activity) => activity.id === activityId) || null;
}

function getPortalActivityLots(activityId) {
  return getPortalFinanceData().activityLots.filter((activityLot) => activityLot.activityId === activityId);
}

function getPortalActivityMovements(activityLotId) {
  return getPortalFinanceData().activityMovements
    .filter((movement) => movement.activityLotId === activityLotId)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function getPortalActivityLotComputedState(activityLot) {
  const movements = getPortalActivityMovements(activityLot.id);
  const activeMovements = movements.filter((movement) => movement.status !== "anulado");
  const suggestedAmount = Number(activityLot.suggestedAmount || 0);
  const grossMoneyAmount = activeMovements
    .filter((movement) => movement.type === "aporte_dinero")
    .reduce((sum, movement) => sum + Number(movement.amount || 0), 0);
  const returnedAmount = activeMovements
    .filter((movement) => movement.type === "devolucion")
    .reduce((sum, movement) => sum + Number(movement.amount || 0), 0);
  const moneyAmount = Math.max(grossMoneyAmount - returnedAmount, 0);
  const approvedCompensation = activeMovements
    .filter((movement) => movement.type === "compensacion_aprobada")
    .reduce((sum, movement) => sum + Number(movement.amount || 0), 0);
  const hasPhysicalSupport = activeMovements.some((movement) => movement.type === "apoyo_fisico");
  const isExonerated = activeMovements.some((movement) => movement.type === "exoneracion");
  const noResponseMarked = activeMovements.some((movement) => movement.type === "sin_respuesta");
  const recognizedAmount = moneyAmount + approvedCompensation;
  const remainingAmount = isExonerated ? 0 : Math.max(suggestedAmount - recognizedAmount, 0);
  let status = "pendiente";

  if (isExonerated) {
    status = "exonerado";
  } else if (recognizedAmount >= suggestedAmount && approvedCompensation > 0) {
    status = "compensado_por_junta";
  } else if (moneyAmount >= suggestedAmount && moneyAmount > 0) {
    status = "aporte_completo";
  } else if (moneyAmount > 0) {
    status = "aporte_parcial";
  } else if (hasPhysicalSupport) {
    status = "apoyo_fisico_registrado";
  } else if (noResponseMarked) {
    status = "sin_respuesta";
  }

  return {
    movements,
    activeMovements,
    moneyAmount,
    grossMoneyAmount,
    returnedAmount,
    approvedCompensation,
    recognizedAmount,
    remainingAmount,
    hasPhysicalSupport,
    isExonerated,
    noResponseMarked,
    status
  };
}

function getPortalActivityComputedSummary(activity) {
  if (!activity) {
    return {
      targetAmount: 0,
      collectedAmount: 0,
      missingAmount: 0,
      totalLots: 0,
      paidLots: 0,
      supportLots: 0,
      compensatedLots: 0,
      noResponseLots: 0,
      pendingLots: 0
    };
  }

  const activityLots = getPortalActivityLots(activity.id);
  return activityLots.reduce(
    (accumulator, activityLot) => {
      const computed = getPortalActivityLotComputedState(activityLot);
      accumulator.targetAmount = Number(activity.targetAmount || 0);
      accumulator.collectedAmount += computed.moneyAmount;
      accumulator.totalLots += 1;
      if (computed.moneyAmount > 0) {
        accumulator.paidLots += 1;
      }
      if (computed.hasPhysicalSupport) {
        accumulator.supportLots += 1;
      }
      if (computed.status === "compensado_por_junta" || computed.status === "exonerado") {
        accumulator.compensatedLots += 1;
      }
      if (computed.status === "sin_respuesta") {
        accumulator.noResponseLots += 1;
      }
      if (computed.remainingAmount > 0 && !computed.isExonerated) {
        accumulator.pendingLots += 1;
      }
      return accumulator;
    },
    {
      targetAmount: Number(activity.targetAmount || 0),
      collectedAmount: 0,
      missingAmount: 0,
      totalLots: 0,
      paidLots: 0,
      supportLots: 0,
      compensatedLots: 0,
      noResponseLots: 0,
      pendingLots: 0
    }
  );
}

function getFinanceSummaryForSocio(recordId) {
  const activityLots = getFinanceData().activityLots.filter((activityLot) => activityLot.recordId === recordId);
  return activityLots.reduce(
    (accumulator, activityLot) => {
      const computed = getActivityLotComputedState(activityLot);
      accumulator.total += Number(activityLot.suggestedAmount || 0);
      accumulator.paid += computed.moneyAmount;
      accumulator.balance += computed.remainingAmount;
      accumulator.pendingCount += computed.remainingAmount > 0 ? 1 : 0;
      return accumulator;
    },
    { total: 0, paid: 0, balance: 0, pendingCount: 0 }
  );
}

function getActiveActivityParticipants() {
  return getRecords().filter((record) => record.titular.estadoSocio !== "retirado");
}

function calculateSuggestedPerLot(targetAmount) {
  const participantCount = getActiveActivityParticipants().length;
  const normalizedTarget = Number(targetAmount || 0);
  const suggestedAmount = participantCount > 0 && normalizedTarget > 0
    ? normalizedTarget / participantCount
    : 0;

  return {
    participantCount,
    suggestedAmount
  };
}

function updateSuggestedPerLotField() {
  const { participantCount, suggestedAmount } = calculateSuggestedPerLot(activityTargetInput.value);
  activitySuggestedInput.value = participantCount > 0 && suggestedAmount > 0 ? suggestedAmount.toFixed(2) : "";

  if (!activitySuggestedHelp) {
    return;
  }

  activitySuggestedHelp.textContent = participantCount === 0
    ? "Primero registra al menos un lote/socio activo para calcular la sugerencia."
    : `Calculado automaticamente: meta total dividida entre ${participantCount} lote(s) activo(s).`;
}

function populatePortalManzanas() {
  const currentValue = portalManzanaSelect.value;
  portalManzanaSelect.innerHTML = '<option value="">Todas las manzanas</option>';

  masterData.forEach((manzana) => {
    const option = document.createElement("option");
    option.value = manzana.codigo;
    option.textContent = `${manzana.codigo} - ${manzana.nombre}`;
    portalManzanaSelect.appendChild(option);
  });

  portalManzanaSelect.value = currentValue || "";
}

function populatePortalLotes(selectedLote = "") {
  portalLoteSelect.innerHTML = '<option value="">Todos los lotes</option>';
  const manzana = getManzanaByCode(portalManzanaSelect.value);

  if (!manzana) {
    portalLoteSelect.disabled = true;
    return;
  }

  portalLoteSelect.disabled = false;

  manzana.lotes.forEach((lote) => {
    const option = document.createElement("option");
    option.value = lote.numero;
    option.textContent = `Lote ${lote.numero}`;
    portalLoteSelect.appendChild(option);
  });

  portalLoteSelect.value = selectedLote;
}

function buildPortalRecentActivity() {
  const finance = getPortalFinanceData();
  const treasury = getPortalTreasuryData();
  const incidentsData = getCurrentUser() ? getIncidentsData() : { incidents: [] };
  const governance = getPortalGovernanceData();
  const items = [];

  finance.activities.forEach((activity) => {
    items.push({
      at: activity.updatedAt || activity.createdAt,
      title: activity.title,
      detail: `Actividad ${humanizeValue(activity.status)} con meta ${formatCurrency(activity.targetAmount)}`,
      tag: "Actividades"
    });
  });

  finance.activityMovements.forEach((movement) => {
    const relatedActivity = getPortalActivityById(movement.activityId);
    items.push({
      at: movement.updatedAt || movement.createdAt,
      title: getMovementTypeLabel(movement.type),
      detail: `${relatedActivity ? relatedActivity.title : "Actividad comunal"}${movement.amount ? ` por ${formatCurrency(movement.amount)}` : ""}${movement.status === "anulado" ? " (anulado)" : ""}`,
      tag: "Movimientos"
    });
  });

  treasury.expenses.forEach((expense) => {
    items.push({
      at: expense.updatedAt || expense.createdAt,
      title: expense.detail || humanizeValue(expense.category),
      detail: `Egreso desde ${humanizeValue(expense.fund)} por ${formatCurrency(expense.amount)}`,
      tag: "Tesoreria"
    });
  });

  governance.assemblies.forEach((assembly) => {
    items.push({
      at: assembly.updatedAt || assembly.createdAt,
      title: assembly.title,
      detail: `Asamblea ${humanizeValue(assembly.status)} programada para ${formatDate(assembly.date)}`,
      tag: "Asambleas"
    });
  });

  incidentsData.incidents.forEach((incident) => {
    items.push({
      at: incident.updatedAt || incident.createdAt,
      title: incident.title,
      detail: `Incidencia ${humanizeValue(incident.status)} con prioridad ${humanizeValue(incident.priority)}`,
      tag: "Incidencias"
    });
  });

  return items
    .filter((item) => item.at)
    .sort((a, b) => (a.at < b.at ? 1 : -1))
    .slice(0, 10);
}

function getPortalLookupRecords() {
  const documentNumber = portalLookupState.documentNumber.trim().toLowerCase();
  if (!documentNumber) {
    return [];
  }

  return getPortalRecords()
    .filter((record) => (
      String(record.titular.numeroDocumento || "").trim().toLowerCase() === documentNumber
      && (!portalLookupState.manzana || record.ubicacion.manzana === portalLookupState.manzana)
      && (!portalLookupState.lote || record.ubicacion.lote === portalLookupState.lote)
    ))
    .sort((left, right) => {
      const byManzana = String(left.ubicacion.manzana || "").localeCompare(String(right.ubicacion.manzana || ""));
      if (byManzana !== 0) {
        return byManzana;
      }
      return String(left.ubicacion.lote || "").localeCompare(String(right.ubicacion.lote || ""), undefined, { numeric: true });
    });
}

function renderPortalOverview() {
  const finance = getPortalFinanceData();
  const treasury = getPortalTreasuryData();
  const governance = getPortalGovernanceData();
  const activitiesSummary = finance.activities.reduce(
    (accumulator, activity) => {
      const summary = getPortalActivityComputedSummary(activity);
      accumulator.target += summary.targetAmount;
      accumulator.collected += summary.collectedAmount;
      accumulator.pendingLots += summary.pendingLots;
      accumulator.total += 1;
      return accumulator;
    },
    { target: 0, collected: 0, pendingLots: 0, total: 0 }
  );
  const missingAmount = Math.max(activitiesSummary.target - activitiesSummary.collected, 0);
  const totalExpenses = treasury.expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  portalOverview.innerHTML = `
    <article class="superadmin-card">
      <h3>Actividades</h3>
      <p>Total de actividades comunales visibles</p>
      <span class="superadmin-value">${activitiesSummary.total}</span>
    </article>
    <article class="superadmin-card">
      <h3>Meta acumulada</h3>
      <p>Monto total esperado</p>
      <span class="superadmin-value">${formatCurrency(activitiesSummary.target)}</span>
    </article>
    <article class="superadmin-card">
      <h3>Recaudado</h3>
      <p>Dinero neto registrado</p>
      <span class="superadmin-value">${formatCurrency(activitiesSummary.collected)}</span>
    </article>
    <article class="superadmin-card">
      <h3>Faltante</h3>
      <p>Monto aun no cubierto</p>
      <span class="superadmin-value">${formatCurrency(missingAmount)}</span>
    </article>
    <article class="superadmin-card">
      <h3>Egresos</h3>
      <p>Total registrado en tesoreria</p>
      <span class="superadmin-value">${formatCurrency(totalExpenses)}</span>
    </article>
    <article class="superadmin-card">
      <h3>Asambleas</h3>
      <p>Asambleas y acuerdos visibles</p>
      <span class="superadmin-value">${governance.assemblies.length + governance.agreements.length}</span>
    </article>
  `;
}

function renderPortalActivities() {
  const searchTerm = portalActivitySearchInput.value.trim().toLowerCase();
  const statusFilter = portalActivityStatusFilter.value;
  const finance = getPortalFinanceData();
  const activities = finance.activities
    .filter((activity) => {
      const matchesSearch = !searchTerm || [activity.title, activity.description, activity.date]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm);
      const matchesStatus = statusFilter === "todos" || activity.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  portalActivitiesList.innerHTML = "";
  portalActivitiesEmpty.style.display = activities.length === 0 ? "block" : "none";
  portalActivitiesEmpty.textContent = finance.activities.length === 0
    ? "Aun no hay actividades comunales registradas."
    : "No hay actividades que coincidan con ese filtro.";

  activities.forEach((activity) => {
    const summary = getPortalActivityComputedSummary(activity);
    const missingAmount = Math.max(summary.targetAmount - summary.collectedAmount, 0);
    const progressPercent = summary.targetAmount > 0
      ? Math.min((summary.collectedAmount / summary.targetAmount) * 100, 100)
      : 0;
    const card = document.createElement("article");
    card.className = "record-card";
    card.innerHTML = `
      <div class="record-header">
        <div>
          <h3 class="record-title">${activity.title}</h3>
          <p class="record-subtitle">${formatDate(activity.date)} | ${humanizeValue(activity.status)}</p>
          <p class="record-extra">${activity.description || "Sin detalle adicional."}</p>
          <p class="record-extra">Meta: ${formatCurrency(activity.targetAmount)} | Recaudado: ${formatCurrency(summary.collectedAmount)} | Faltante: ${formatCurrency(missingAmount)}</p>
          <p class="record-extra">Lotes con aporte: ${summary.paidLots} | Ayuda fisica: ${summary.supportLots} | Pendientes: ${summary.pendingLots}</p>
        </div>
        <div class="tag-row">
          <span class="tag">${progressPercent.toFixed(1)}%</span>
        </div>
      </div>
      <div class="activity-progress">
        <div class="activity-progress-bar" aria-hidden="true">
          <span class="activity-progress-fill" style="width: ${progressPercent.toFixed(1)}%"></span>
        </div>
      </div>
    `;
    portalActivitiesList.appendChild(card);
  });
}

function renderPortalRecentActivity() {
  const items = buildPortalRecentActivity();
  portalRecentActivity.innerHTML = items.length === 0
    ? '<div class="empty-state">Aun no hay actividad visible en el portal.</div>'
    : "";

  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "record-card";
    article.innerHTML = `
      <div class="record-header">
        <div>
          <h3 class="record-title">${item.title}</h3>
          <p class="record-subtitle">${item.tag}</p>
          <p class="record-extra">${item.detail}</p>
        </div>
        <div class="tag-row">
          <span class="tag">${new Date(item.at).toLocaleString()}</span>
        </div>
      </div>
    `;
    portalRecentActivity.appendChild(article);
  });
}

function getPortalActivityStatusLabel(status) {
  const labels = {
    pendiente: "Por coordinar",
    aporte_completo: "Aporte completo",
    aporte_parcial: "Aporte parcial",
    apoyo_fisico_registrado: "Apoyo fisico registrado",
    compensado_por_junta: "Compensado por junta",
    exonerado: "Exonerado por junta",
    sin_respuesta: "Sin respuesta"
  };

  return labels[status] || humanizeValue(status);
}

function getPortalLotSummary(total) {
  if (total.suggested <= 0 && total.paid <= 0 && total.compensated <= 0) {
    return {
      label: "Sin actividades registradas",
      className: "neutral-tag"
    };
  }

  if (total.balance <= 0 && (total.paid > 0 || total.compensated > 0 || total.suggested > 0)) {
    return {
      label: "Al dia o regularizado",
      className: "success-tag"
    };
  }

  if (total.paid > 0 || total.compensated > 0) {
    return {
      label: "Con avance registrado",
      className: "warning-tag"
    };
  }

  return {
    label: "Por coordinar con la junta",
    className: "warning-tag"
  };
}

function renderPortalAccountResult() {
  const hasLookup = portalLookupState.documentNumber;
  if (!hasLookup) {
    portalAccountResult.innerHTML = '<div class="empty-state">Completa al menos el documento para revisar los lotes asociados.</div>';
    return;
  }

  const records = getPortalLookupRecords();
  if (records.length === 0) {
    portalAccountResult.innerHTML = '<div class="empty-state">No se encontraron lotes asociados a ese documento con los filtros indicados.</div>';
    return;
  }

  const people = [...new Set(records.map((record) => `${record.titular.nombres} ${record.titular.apellidos}`.trim()).filter(Boolean))];
  const globalTotals = { suggested: 0, paid: 0, returned: 0, compensated: 0, balance: 0 };

  const lotCardsHtml = records.map((record) => {
    const activityLots = getPortalFinanceData().activityLots
      .filter((activityLot) => (
        activityLot.recordId === record.id
        && activityLot.recordSnapshot?.manzana === record.ubicacion.manzana
        && activityLot.recordSnapshot?.lote === record.ubicacion.lote
      ))
      .sort((a, b) => {
        const leftActivity = getPortalActivityById(a.activityId);
        const rightActivity = getPortalActivityById(b.activityId);
        return (leftActivity?.date || "") < (rightActivity?.date || "") ? 1 : -1;
      });

    const totals = activityLots.reduce(
      (accumulator, activityLot) => {
        const computed = getPortalActivityLotComputedState(activityLot);
        accumulator.suggested += Number(activityLot.suggestedAmount || 0);
        accumulator.paid += computed.moneyAmount;
        accumulator.returned += computed.returnedAmount;
        accumulator.compensated += computed.approvedCompensation;
        accumulator.balance += computed.remainingAmount;
        return accumulator;
      },
      { suggested: 0, paid: 0, returned: 0, compensated: 0, balance: 0 }
    );

    globalTotals.suggested += totals.suggested;
    globalTotals.paid += totals.paid;
    globalTotals.returned += totals.returned;
    globalTotals.compensated += totals.compensated;
    globalTotals.balance += totals.balance;

    const lotState = getPortalLotSummary(totals);
    const activitiesHtml = activityLots.length === 0
      ? '<div class="empty-state">Este lote aun no tiene actividades comunales asociadas.</div>'
      : activityLots.map((activityLot) => {
        const activity = getPortalActivityById(activityLot.activityId);
        const computed = getPortalActivityLotComputedState(activityLot);
        return `
          <article class="record-card">
            <div class="record-header">
              <div>
                <h3 class="record-title">${activity ? activity.title : "Actividad no encontrada"}</h3>
                <p class="record-subtitle">${activity ? formatDate(activity.date) : "-"} | ${getPortalActivityStatusLabel(computed.status)}</p>
                <p class="record-extra">Aporte referencial: ${formatCurrency(activityLot.suggestedAmount)} | Registrado a favor: ${formatCurrency(computed.moneyAmount)} | Devuelto: ${formatCurrency(computed.returnedAmount)} | Por regularizar: ${formatCurrency(computed.remainingAmount)}</p>
              </div>
              <div class="tag-row">
                <span class="tag ${statusTagClass(computed.status)}">${getPortalActivityStatusLabel(computed.status)}</span>
              </div>
            </div>
            <div class="movement-log">
              ${computed.movements.length === 0
                ? '<div class="empty-state">Sin movimientos registrados.</div>'
                : computed.movements.map((movement) => `
                  <article class="movement-item ${movement.status === "anulado" ? "annulled" : ""}">
                    <div class="movement-item-main">
                      <div>
                        <strong>${getMovementTypeLabel(movement.type)}</strong>
                        <p class="record-meta">${formatDate(movement.date)}${movement.method ? ` | ${getMethodLabel(movement.method)}` : ""}${movement.amount ? ` | ${formatCurrency(movement.amount)}` : ""}</p>
                        <p class="record-extra">${movement.detail || "Sin detalle adicional."}</p>
                      </div>
                      <div class="tag-row">
                        <span class="tag ${movement.status === "anulado" ? "danger-tag" : "success-tag"}">${movement.status === "anulado" ? "Anulado" : "Activo"}</span>
                      </div>
                    </div>
                  </article>
                `).join("")}
            </div>
          </article>
        `;
      }).join("");

    return `
      <section class="panel inner-panel">
        <div class="record-header">
          <div>
            <h3 class="record-title">${record.ubicacion.manzana} / Lote ${record.ubicacion.lote}</h3>
            <p class="record-subtitle">${record.titular.nombres} ${record.titular.apellidos}</p>
            <p class="record-meta">${record.titular.tipoDocumento} ${record.titular.numeroDocumento}</p>
            <p class="record-extra">Referencia acumulada: ${formatCurrency(totals.suggested)} | Registrado a favor: ${formatCurrency(totals.paid)} | Devuelto: ${formatCurrency(totals.returned)} | Por regularizar: ${formatCurrency(totals.balance)}</p>
          </div>
          <div class="tag-row">
            <span class="tag ${lotState.className}">${lotState.label}</span>
          </div>
        </div>
        <div class="records-list">
          ${activitiesHtml}
        </div>
      </section>
    `;
  }).join("");

  portalAccountResult.innerHTML = `
    <div class="panel notice-panel">
      <strong>Importante:</strong> los montos mostrados aqui son referenciales para seguimiento de actividades.
      No representan una multa automatica ni una deuda fija cerrada; cualquier regularizacion depende de lo registrado y de lo acordado por la junta.
    </div>
    <div class="summary">
      <article class="summary-card">
        <h4>${people[0] || "Consulta encontrada"}</h4>
        <p>${records.length} lote(s) asociado(s) al documento consultado</p>
        <p class="record-meta">Documento: ${records[0].titular.tipoDocumento} ${records[0].titular.numeroDocumento}</p>
      </article>
      <article class="summary-card">
        <h4>Resumen general</h4>
        <p>Referencia acumulada de actividades: ${formatCurrency(globalTotals.suggested)}</p>
        <p class="record-meta">Registrado a favor: ${formatCurrency(globalTotals.paid)}</p>
        <p class="record-meta">Devuelto: ${formatCurrency(globalTotals.returned)}</p>
        <p class="record-meta">Monto por regularizar o coordinar: ${formatCurrency(globalTotals.balance)}</p>
      </article>
    </div>
    <div class="records-list">
      ${lotCardsHtml}
    </div>
  `;
}

function renderPortalView() {
  renderPortalOverview();
  renderPortalActivities();
  renderPortalRecentActivity();
  renderPortalAccountResult();
}

function resetPortalLookup(preserveMessage = false) {
  portalLookupState = {
    documentNumber: "",
    manzana: "",
    lote: ""
  };
  portalLookupForm.reset();
  portalManzanaSelect.value = "";
  populatePortalLotes("");
  portalLoteSelect.disabled = true;
  if (!preserveMessage) {
    clearMessage(portalLookupMessage);
  }
  renderPortalAccountResult();
}

function selectFinanceRecord(activityId, switchToFinance = false) {
  selectedFinanceRecordId = activityId || null;
  selectedFinanceLotId = null;

  if (switchToFinance) {
    setActiveTab("finanzas");
  }

  renderFinanceRecordPicker();
  renderFinanceSelectedCard();
  renderFinanceDashboard();
  renderPaymentChargeOptions();
  renderCharges();
}

function renderFinanceDashboard() {
  const finance = getFinanceData();
  const selectedActivity = getSelectedFinanceRecord();

  if (!selectedActivity) {
    const globalSummary = finance.activities.reduce(
      (accumulator, activity) => {
        const summary = getActivityComputedSummary(activity);
        accumulator.targetAmount += summary.targetAmount;
        accumulator.collectedAmount += summary.collectedAmount;
        accumulator.pendingLots += summary.pendingLots;
        accumulator.totalActivities += 1;
        return accumulator;
      },
      { targetAmount: 0, collectedAmount: 0, pendingLots: 0, totalActivities: 0 }
    );
    const missingAmount = Math.max(globalSummary.targetAmount - globalSummary.collectedAmount, 0);
    financeDashboard.innerHTML = `
      <article class="finance-card">
        <h3>Actividades</h3>
        <p>Total de actividades comunales registradas</p>
        <span class="finance-amount">${globalSummary.totalActivities}</span>
      </article>
      <article class="finance-card">
        <h3>Meta acumulada</h3>
        <p>Total esperado entre actividades</p>
        <span class="finance-amount">${formatCurrency(globalSummary.targetAmount)}</span>
      </article>
      <article class="finance-card">
        <h3>Recaudado</h3>
        <p>Dinero efectivamente reunido</p>
        <span class="finance-amount">${formatCurrency(globalSummary.collectedAmount)}</span>
      </article>
      <article class="finance-card">
        <h3>Faltante</h3>
        <p>Monto que aun falta alcanzar</p>
        <span class="finance-amount">${formatCurrency(missingAmount)}</span>
      </article>
    `;
    return;
  }

  const summary = getActivityComputedSummary(selectedActivity);
  summary.missingAmount = Math.max(summary.targetAmount - summary.collectedAmount, 0);
  financeDashboard.innerHTML = `
    <article class="finance-card">
      <h3>Meta total</h3>
      <p>Monto que se espera reunir</p>
      <span class="finance-amount">${formatCurrency(summary.targetAmount)}</span>
    </article>
    <article class="finance-card">
      <h3>Recaudado</h3>
      <p>Dinero recibido hasta ahora</p>
      <span class="finance-amount">${formatCurrency(summary.collectedAmount)}</span>
    </article>
    <article class="finance-card">
      <h3>Falta para la meta</h3>
      <p>Monto que aun no se cubre</p>
      <span class="finance-amount">${formatCurrency(summary.missingAmount)}</span>
    </article>
    <article class="finance-card">
      <h3>Lotes pendientes</h3>
      <p>Lotes que aun requieren decision o cumplimiento</p>
      <span class="finance-amount">${summary.pendingLots}</span>
    </article>
  `;
}

function renderFinanceRecordPicker() {
  const activities = getFinanceData().activities;
  const searchTerm = financeSearchInput.value.trim().toLowerCase();
  const filteredActivities = activities.filter((activity) => {
    if (!searchTerm) {
      return true;
    }

    return [
      activity.title,
      activity.description,
      activity.date,
      activity.status
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm);
  });

  financeRecordsList.innerHTML = "";
  financeRecordsEmpty.style.display = filteredActivities.length === 0 ? "block" : "none";
  financeRecordsEmpty.textContent = activities.length === 0
    ? "Aun no hay actividades comunales registradas."
    : "No se encontraron actividades con ese criterio.";

  filteredActivities
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .forEach((activity) => {
      const summary = getActivityComputedSummary(activity);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `finance-record-button ${activity.id === selectedFinanceRecordId ? "active" : ""}`;
      button.dataset.recordId = activity.id;
      button.innerHTML = `
        <strong>${activity.title}</strong>
        <p class="record-subtitle">${formatDate(activity.date)} | ${humanizeValue(activity.status)}</p>
        <p class="record-meta">Meta ${formatCurrency(activity.targetAmount)} | Recaudado ${formatCurrency(summary.collectedAmount)}</p>
        <div class="tag-row">
          <span class="tag">${summary.totalLots} lote(s)</span>
          <span class="tag ${summary.pendingLots > 0 ? "warning-tag" : "success-tag"}">
            ${summary.pendingLots > 0 ? `${summary.pendingLots} pendiente(s)` : "Sin pendientes"}
          </span>
        </div>
      `;
      financeRecordsList.appendChild(button);
    });
}

function renderFinanceSelectedCard() {
  const activity = getSelectedFinanceRecord();
  if (!activity) {
    financeSelectedCard.innerHTML = "<p>Selecciona una actividad desde la lista de la izquierda.</p>";
    return;
  }

  const summary = getActivityComputedSummary(activity);
  const missingAmount = Math.max(summary.targetAmount - summary.collectedAmount, 0);
  const progressPercent = summary.targetAmount > 0
    ? Math.min((summary.collectedAmount / summary.targetAmount) * 100, 100)
    : 0;
  financeSelectedCard.innerHTML = `
    <article class="summary-card">
      <div class="record-header">
        <div>
          <h4>${activity.title}</h4>
          <p>${formatDate(activity.date)} | ${humanizeValue(activity.status)}</p>
          <p class="record-meta">${activity.description || "Sin detalle adicional."}</p>
        </div>
        <div class="record-actions">
          <button class="secondary-button" data-activity-action="edit" data-id="${activity.id}" type="button">Editar actividad</button>
          <button class="ghost-button" data-activity-action="delete" data-id="${activity.id}" type="button">Eliminar actividad</button>
        </div>
      </div>
      <div class="activity-progress">
        <div class="activity-progress-bar" aria-hidden="true">
          <span class="activity-progress-fill" style="width: ${progressPercent.toFixed(1)}%"></span>
        </div>
        <p class="record-meta">Avance de meta: ${progressPercent.toFixed(1)}%</p>
      </div>
    </article>
    <article class="summary-card">
      <h4>Resumen por lote</h4>
      <p>Aporte sugerido: ${formatCurrency(activity.suggestedPerLot)}</p>
      <p class="record-meta">Lotes con dinero: ${summary.paidLots} | Ayuda fisica: ${summary.supportLots}</p>
      <p class="record-meta">Compensados / exonerados: ${summary.compensatedLots} | Sin respuesta: ${summary.noResponseLots}</p>
      <p class="record-meta">Faltante de meta: ${formatCurrency(missingAmount)}</p>
    </article>
  `;
}

function renderPaymentChargeOptions(selectedValue = "") {
  const activity = getSelectedFinanceRecord();
  const activityLots = activity ? getActivityLots(activity.id) : [];
  movementLotSelect.innerHTML = `<option value="">${activityLots.length === 0 ? "Primero selecciona una actividad" : "Selecciona un lote participante"}</option>`;

  activityLots.forEach((activityLot) => {
    const computed = getActivityLotComputedState(activityLot);
    const option = document.createElement("option");
    option.value = activityLot.id;
    option.textContent = `${activityLot.recordSnapshot?.manzana || ""}/Lote ${activityLot.recordSnapshot?.lote || ""} - ${activityLot.recordSnapshot?.titular || "Sin titular"} - ${humanizeValue(computed.status)} - saldo ${formatCurrency(computed.remainingAmount)}`;
    movementLotSelect.appendChild(option);
  });

  movementLotSelect.value = selectedValue || "";
}

function populateManzanas() {
  const currentValue = manzanaSelect.value;
  manzanaSelect.innerHTML = '<option value="">Selecciona una manzana</option>';

  masterData.forEach((manzana) => {
    const option = document.createElement("option");
    option.value = manzana.codigo;
    option.textContent = `${manzana.codigo} - ${manzana.nombre}`;
    manzanaSelect.appendChild(option);
  });

  manzanaSelect.value = currentValue || "";
}

function populateLotes(selectedLote = "") {
  loteSelect.innerHTML = '<option value="">Selecciona un lote</option>';
  const manzana = getManzanaByCode(manzanaSelect.value);

  if (!manzana) {
    loteSelect.disabled = true;
    return;
  }

  loteSelect.disabled = false;

  manzana.lotes.forEach((lote) => {
    const option = document.createElement("option");
    option.value = lote.numero;
    option.textContent = `Lote ${lote.numero}`;
    loteSelect.appendChild(option);
  });

  loteSelect.value = selectedLote;
}

function updateLotMeta() {
  const lot = getSelectedLot();

  if (!lot || !manzanaSelect.value || !loteSelect.value) {
    lotMeta.className = "lot-meta empty";
    lotMeta.textContent = "Selecciona una manzana y un lote para ver el detalle.";
    return;
  }

  const occupancy = getOccupancyForLot(manzanaSelect.value, loteSelect.value, editingRecordId);
  const occupiedText = occupancy.length > 0
    ? `Advertencia: este lote ya tiene ${occupancy.length} registro(s) activo(s) guardado(s) en la demo.`
    : "Lote disponible en esta demo.";

  lotMeta.className = occupancy.length > 0 ? "lot-meta info" : "lot-meta success";
  lotMeta.innerHTML = `
    <strong>${manzanaSelect.value} - Lote ${lot.numero}</strong><br>
    Area: ${lot.area.toFixed(2)} m2 | Perimetro: ${lot.perimetro.toFixed(2)} ml<br>
    ${occupiedText}<br>
    Catalogo referencial del prototipo, pendiente de importacion final desde el PDF.
  `;
}

function buildCotitularCard(data = {}) {
  const fragment = cotitularTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".cotitular-card");

  card.querySelectorAll("[data-field]").forEach((input) => {
    const field = input.dataset.field;
    input.value = data[field] || "";
    input.addEventListener("input", renderSummary);
    input.addEventListener("change", renderSummary);
  });

  card.querySelector(".remove-cotitular").addEventListener("click", () => {
    card.remove();
    refreshCotitularTitles();
    renderSummary();
  });

  cotitularesList.appendChild(card);
  refreshCotitularTitles();
}

function refreshCotitularTitles() {
  [...cotitularesList.querySelectorAll(".cotitular-card")].forEach((card, index) => {
    card.querySelector(".cotitular-title").textContent = `Cotitular ${index + 1}`;
  });
}

function getCotitularesData() {
  return [...cotitularesList.querySelectorAll(".cotitular-card")]
    .map((card) => {
      const data = {};
      card.querySelectorAll("[data-field]").forEach((input) => {
        data[input.dataset.field] = input.value.trim();
      });
      return data;
    })
    .filter((item) => item.nombres || item.apellidos || item.numeroDocumento);
}

function gatherFormData() {
  const selectedLot = getSelectedLot();
  const currentUser = getCurrentUser();

  return {
    id: editingRecordId || generateId(),
    ubicacion: {
      manzana: manzanaSelect.value,
      lote: loteSelect.value,
      area: selectedLot ? selectedLot.area : null,
      perimetro: selectedLot ? selectedLot.perimetro : null
    },
    titular: {
      nombres: document.getElementById("nombres").value.trim(),
      apellidos: document.getElementById("apellidos").value.trim(),
      tipoDocumento: document.getElementById("tipo-documento").value,
      numeroDocumento: document.getElementById("numero-documento").value.trim(),
      fechaNacimiento: document.getElementById("fecha-nacimiento").value,
      estadoSocio: document.getElementById("estado-socio").value
    },
    cotitulares: getCotitularesData(),
    contacto: {
      celularPrincipal: document.getElementById("celular-principal").value.trim(),
      celularAlterno: document.getElementById("celular-alterno").value.trim(),
      correoPrincipal: document.getElementById("correo-principal").value.trim(),
      correoAlterno: document.getElementById("correo-alterno").value.trim(),
      direccionContacto: document.getElementById("direccion-contacto").value.trim(),
      contactoEmergencia: document.getElementById("contacto-emergencia").value.trim(),
      telefonoEmergencia: document.getElementById("telefono-emergencia").value.trim()
    },
    observaciones: document.getElementById("observaciones").value.trim(),
    updatedAt: new Date().toISOString(),
    updatedBy: currentUser ? currentUser.username : "sistema"
  };
}

function validateRecord(record) {
  if (!record.ubicacion.manzana || !record.ubicacion.lote) {
    return "Debes seleccionar una manzana y un lote.";
  }

  if (!record.titular.nombres || !record.titular.apellidos || !record.titular.numeroDocumento) {
    return "Completa los datos del titular principal.";
  }

  if (!record.contacto.celularPrincipal) {
    return "El celular principal es obligatorio.";
  }

  const occupied = getOccupancyForLot(record.ubicacion.manzana, record.ubicacion.lote, editingRecordId);
  if (occupied.length > 0) {
    return "Ese lote ya tiene un titular principal activo en esta demo. Edita el registro existente o cambia el lote.";
  }

  return "";
}

function renderSummary() {
  const data = gatherFormData();
  const currentUser = getCurrentUser();
  const titular = `${data.titular.nombres} ${data.titular.apellidos}`.trim() || "Sin titular definido";
  const cotitularesHtml = data.cotitulares.length > 0
    ? `<ul class="summary-list">${data.cotitulares.map((item) => `<li>${item.nombres || "Sin nombre"} ${item.apellidos || ""}</li>`).join("")}</ul>`
    : "<p>No hay cotitulares agregados.</p>";

  summary.innerHTML = `
    <article class="summary-card">
      <h4>Ubicacion</h4>
      <p>${data.ubicacion.manzana || "-"} / Lote ${data.ubicacion.lote || "-"}</p>
    </article>
    <article class="summary-card">
      <h4>Titular principal</h4>
      <p>${titular}</p>
      <p class="record-meta">${data.titular.tipoDocumento} ${data.titular.numeroDocumento || "-"}</p>
    </article>
    <article class="summary-card">
      <h4>Cotitulares</h4>
      ${cotitularesHtml}
    </article>
    <article class="summary-card">
      <h4>Contacto</h4>
      <p>${data.contacto.celularPrincipal || "Sin celular principal"}</p>
      <p class="record-meta">${data.contacto.correoPrincipal || "Sin correo principal"}</p>
    </article>
    <article class="summary-card">
      <h4>Gestionado por</h4>
      <p>${currentUser ? currentUser.nombreCompleto : "Sin sesion"}</p>
      <p class="record-meta">${currentUser ? roleLabel(currentUser) : "-"}</p>
    </article>
  `;
}

function renderRecords() {
  const records = getRecords();
  recordsList.innerHTML = "";
  recordsEmpty.style.display = records.length === 0 ? "block" : "none";

  records.forEach((record) => {
    const financeSummary = getFinanceSummaryForSocio(record.id);
    const debtTag = financeSummary.balance > 0
      ? `<span class="tag warning-tag">Pendiente en actividades ${formatCurrency(financeSummary.balance)}</span>`
      : `<span class="tag success-tag">Sin pendientes</span>`;
    const card = document.createElement("article");
    card.className = "record-card";
    card.innerHTML = `
      <div class="record-header">
        <div>
          <h3 class="record-title">${record.titular.nombres} ${record.titular.apellidos}</h3>
          <p class="record-subtitle">${record.ubicacion.manzana} - Lote ${record.ubicacion.lote}</p>
          <p class="record-meta">${record.titular.tipoDocumento} ${record.titular.numeroDocumento}</p>
          <p class="record-extra">${record.contacto.celularPrincipal || "-"} | ${record.contacto.correoPrincipal || "sin correo"}</p>
          <p class="record-extra">Ultima gestion: ${new Date(record.updatedAt).toLocaleString()} por ${record.updatedBy || "sistema"}</p>
        </div>
        <div class="record-actions">
          <button class="secondary-button" data-action="edit" data-id="${record.id}" type="button">Editar</button>
          <button class="ghost-button" data-action="delete" data-id="${record.id}" type="button">Eliminar</button>
        </div>
      </div>
      <div class="tag-row">
        <span class="tag">${record.cotitulares.length} cotitular(es)</span>
        <span class="tag">${record.titular.estadoSocio}</span>
        ${debtTag}
      </div>
      ${record.observaciones ? `<p class="record-extra">${record.observaciones}</p>` : ""}
    `;
    recordsList.appendChild(card);
  });
}

function resetForm(preserveMessage = false) {
  editingRecordId = null;
  form.reset();
  manzanaSelect.value = "";
  populateLotes("");
  loteSelect.disabled = true;
  cotitularesList.innerHTML = "";
  updateLotMeta();
  if (!preserveMessage) {
    clearMessage(messageBox);
  }
  renderSummary();
}

function fillForm(record) {
  editingRecordId = record.id;
  manzanaSelect.value = record.ubicacion.manzana;
  populateLotes(record.ubicacion.lote);
  document.getElementById("nombres").value = record.titular.nombres;
  document.getElementById("apellidos").value = record.titular.apellidos;
  document.getElementById("tipo-documento").value = record.titular.tipoDocumento;
  document.getElementById("numero-documento").value = record.titular.numeroDocumento;
  document.getElementById("fecha-nacimiento").value = record.titular.fechaNacimiento || "";
  document.getElementById("estado-socio").value = record.titular.estadoSocio;
  document.getElementById("celular-principal").value = record.contacto.celularPrincipal || "";
  document.getElementById("celular-alterno").value = record.contacto.celularAlterno || "";
  document.getElementById("correo-principal").value = record.contacto.correoPrincipal || "";
  document.getElementById("correo-alterno").value = record.contacto.correoAlterno || "";
  document.getElementById("direccion-contacto").value = record.contacto.direccionContacto || "";
  document.getElementById("contacto-emergencia").value = record.contacto.contactoEmergencia || "";
  document.getElementById("telefono-emergencia").value = record.contacto.telefonoEmergencia || "";
  document.getElementById("observaciones").value = record.observaciones || "";

  cotitularesList.innerHTML = "";
  record.cotitulares.forEach((item) => buildCotitularCard(item));
  updateLotMeta();
  renderSummary();
  setMessage(messageBox, "Editando registro existente.", "success");
}

function humanizeValue(value) {
  if (!value) {
    return "-";
  }

  return String(value)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function statusTagClass(status) {
  if (["pagado", "activo", "resuelta", "cerrada", "cumplido", "realizada", "aporte_completo", "compensado_por_junta", "exonerado"].includes(status)) {
    return "success-tag";
  }

  if (["alta", "critica", "suspendido", "retirado", "sin_respuesta"].includes(status)) {
    return "danger-tag";
  }

  return "warning-tag";
}

function getProviderById(providerId) {
  return getTreasuryData().providers.find((provider) => provider.id === providerId) || null;
}

function getIncidentById(incidentId) {
  return getIncidentsData().incidents.find((incident) => incident.id === incidentId) || null;
}

function getAssemblyById(assemblyId) {
  return getGovernanceData().assemblies.find((assembly) => assembly.id === assemblyId) || null;
}

function renderExpenseRecordOptions(selectedValue = "") {
  const records = getRecords();
  expenseRelatedRecordSelect.innerHTML = '<option value="">Sin socio relacionado</option>';

  records.forEach((record) => {
    const option = document.createElement("option");
    option.value = record.id;
    option.textContent = getRecordLabel(record);
    expenseRelatedRecordSelect.appendChild(option);
  });

  expenseRelatedRecordSelect.value = selectedValue || "";
}

function renderProviderOptions(expenseSelected = "", workOrderSelected = "") {
  const providers = getTreasuryData().providers;
  expenseProviderSelect.innerHTML = '<option value="">Sin proveedor</option>';
  workOrderProviderSelect.innerHTML = '<option value="">Sin proveedor</option>';

  providers.forEach((provider) => {
    const expenseOption = document.createElement("option");
    expenseOption.value = provider.id;
    expenseOption.textContent = provider.name;
    expenseProviderSelect.appendChild(expenseOption);

    const workOrderOption = document.createElement("option");
    workOrderOption.value = provider.id;
    workOrderOption.textContent = provider.name;
    workOrderProviderSelect.appendChild(workOrderOption);
  });

  expenseProviderSelect.value = expenseSelected || "";
  workOrderProviderSelect.value = workOrderSelected || "";
}

function renderIncidentRecordOptions(selectedValue = "") {
  const records = getRecords();
  incidentRecordSelect.innerHTML = '<option value="">Sin socio relacionado</option>';

  records.forEach((record) => {
    const option = document.createElement("option");
    option.value = record.id;
    option.textContent = getRecordLabel(record);
    incidentRecordSelect.appendChild(option);
  });

  incidentRecordSelect.value = selectedValue || "";
}

function renderWorkOrderIncidentOptions(selectedValue = "") {
  const incidents = getIncidentsData().incidents;
  workOrderIncidentSelect.innerHTML = `<option value="">${incidents.length === 0 ? "Primero registra una incidencia" : "Selecciona una incidencia"}</option>`;

  incidents.forEach((incident) => {
    const option = document.createElement("option");
    option.value = incident.id;
    option.textContent = `${incident.title} - ${humanizeValue(incident.status)}`;
    workOrderIncidentSelect.appendChild(option);
  });

  workOrderIncidentSelect.value = selectedValue || "";
}

function renderAgreementAssemblyOptions(selectedValue = "") {
  const assemblies = getGovernanceData().assemblies;
  agreementAssemblySelect.innerHTML = `<option value="">${assemblies.length === 0 ? "Primero registra una asamblea" : "Selecciona una asamblea"}</option>`;

  assemblies.forEach((assembly) => {
    const option = document.createElement("option");
    option.value = assembly.id;
    option.textContent = `${assembly.title} - ${formatDate(assembly.date)}`;
    agreementAssemblySelect.appendChild(option);
  });

  agreementAssemblySelect.value = selectedValue || "";
}

function resetProviderForm(preserveMessage = false) {
  editingProviderId = null;
  providerForm.reset();
  document.getElementById("provider-status").value = "activo";
  if (!preserveMessage) {
    clearMessage(providerMessage);
  }
}

function fillProviderForm(provider) {
  editingProviderId = provider.id;
  document.getElementById("provider-name").value = provider.name;
  document.getElementById("provider-category").value = provider.category || "";
  document.getElementById("provider-contact").value = provider.contact || "";
  document.getElementById("provider-phone").value = provider.phone || "";
  document.getElementById("provider-email").value = provider.email || "";
  document.getElementById("provider-status").value = provider.status || "activo";
  setMessage(providerMessage, "Editando proveedor existente.", "success");
}

function resetExpenseForm(preserveMessage = false) {
  editingExpenseId = null;
  expenseForm.reset();
  document.getElementById("expense-date").value = getTodayIso();
  renderProviderOptions();
  renderExpenseRecordOptions();
  if (!preserveMessage) {
    clearMessage(expenseMessage);
  }
}

function fillExpenseForm(expense) {
  editingExpenseId = expense.id;
  document.getElementById("expense-date").value = expense.date || getTodayIso();
  document.getElementById("expense-amount").value = Number(expense.amount || 0);
  document.getElementById("expense-category").value = expense.category || "servicios";
  document.getElementById("expense-fund").value = expense.fund || "caja";
  document.getElementById("expense-cost-center").value = expense.costCenter || "";
  document.getElementById("expense-detail").value = expense.detail || "";
  renderProviderOptions(expense.providerId || "", "");
  renderExpenseRecordOptions(expense.relatedRecordId || "");
  setMessage(expenseMessage, "Editando egreso existente.", "success");
}

function resetIncidentForm(preserveMessage = false) {
  editingIncidentId = null;
  incidentForm.reset();
  document.getElementById("incident-status").value = "abierta";
  document.getElementById("incident-priority").value = "media";
  renderIncidentRecordOptions();
  if (!preserveMessage) {
    clearMessage(incidentMessage);
  }
}

function fillIncidentForm(incident) {
  editingIncidentId = incident.id;
  renderIncidentRecordOptions(incident.recordId || "");
  document.getElementById("incident-area").value = incident.area || "";
  document.getElementById("incident-title").value = incident.title;
  document.getElementById("incident-description").value = incident.description || "";
  document.getElementById("incident-priority").value = incident.priority || "media";
  document.getElementById("incident-status").value = incident.status || "abierta";
  document.getElementById("incident-responsible").value = incident.responsible || "";
  document.getElementById("incident-target-date").value = incident.targetDate || "";
  setMessage(incidentMessage, "Editando incidencia existente.", "success");
}

function resetWorkOrderForm(preserveMessage = false) {
  editingWorkOrderId = null;
  workOrderForm.reset();
  document.getElementById("workorder-status").value = "pendiente";
  renderWorkOrderIncidentOptions();
  renderProviderOptions("", "");
  if (!preserveMessage) {
    clearMessage(workOrderMessage);
  }
}

function fillWorkOrderForm(workOrder) {
  editingWorkOrderId = workOrder.id;
  renderWorkOrderIncidentOptions(workOrder.incidentId || "");
  renderProviderOptions("", workOrder.providerId || "");
  document.getElementById("workorder-responsible").value = workOrder.responsible || "";
  document.getElementById("workorder-cost").value = Number(workOrder.cost || 0);
  document.getElementById("workorder-date").value = workOrder.targetDate || "";
  document.getElementById("workorder-status").value = workOrder.status || "pendiente";
  document.getElementById("workorder-notes").value = workOrder.notes || "";
  setMessage(workOrderMessage, "Editando orden de trabajo existente.", "success");
}

function resetAssemblyForm(preserveMessage = false) {
  editingAssemblyId = null;
  assemblyForm.reset();
  document.getElementById("assembly-date").value = getTodayIso();
  document.getElementById("assembly-status").value = "programada";
  if (!preserveMessage) {
    clearMessage(assemblyMessage);
  }
}

function fillAssemblyForm(assembly) {
  editingAssemblyId = assembly.id;
  document.getElementById("assembly-title").value = assembly.title;
  document.getElementById("assembly-date").value = assembly.date || getTodayIso();
  document.getElementById("assembly-status").value = assembly.status || "programada";
  document.getElementById("assembly-attendance").value = Number(assembly.attendance || 0);
  document.getElementById("assembly-agenda").value = assembly.agenda || "";
  setMessage(assemblyMessage, "Editando asamblea existente.", "success");
}

function resetAgreementForm(preserveMessage = false) {
  editingAgreementId = null;
  agreementForm.reset();
  document.getElementById("agreement-status").value = "pendiente";
  renderAgreementAssemblyOptions();
  if (!preserveMessage) {
    clearMessage(agreementMessage);
  }
}

function fillAgreementForm(agreement) {
  editingAgreementId = agreement.id;
  renderAgreementAssemblyOptions(agreement.assemblyId || "");
  document.getElementById("agreement-title").value = agreement.title;
  document.getElementById("agreement-owner").value = agreement.owner || "";
  document.getElementById("agreement-date").value = agreement.targetDate || "";
  document.getElementById("agreement-status").value = agreement.status || "pendiente";
  document.getElementById("agreement-detail").value = agreement.detail || "";
  setMessage(agreementMessage, "Editando acuerdo existente.", "success");
}

function resetDocumentForm(preserveMessage = false) {
  editingDocumentId = null;
  documentForm.reset();
  document.getElementById("document-date").value = getTodayIso();
  document.getElementById("document-type").value = "acta";
  if (!preserveMessage) {
    clearMessage(documentMessage);
  }
}

function fillDocumentForm(documentRecord) {
  editingDocumentId = documentRecord.id;
  document.getElementById("document-type").value = documentRecord.type || "acta";
  document.getElementById("document-title").value = documentRecord.title;
  document.getElementById("document-date").value = documentRecord.date || getTodayIso();
  document.getElementById("document-audience").value = documentRecord.audience || "";
  document.getElementById("document-notes").value = documentRecord.notes || "";
  setMessage(documentMessage, "Editando documento existente.", "success");
}

function renderTreasuryDashboard() {
  const treasury = getTreasuryData();
  const totalExpenses = treasury.expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const cashExpenses = treasury.expenses
    .filter((expense) => expense.fund === "caja")
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const bankExpenses = treasury.expenses
    .filter((expense) => expense.fund === "banco")
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const activeProviders = treasury.providers.filter((provider) => provider.status === "activo").length;

  treasuryDashboard.innerHTML = `
    <article class="finance-card">
      <h3>Total egresado</h3>
      <p>Pagos y gastos registrados</p>
      <span class="finance-amount">${formatCurrency(totalExpenses)}</span>
    </article>
    <article class="finance-card">
      <h3>Desde caja</h3>
      <p>Salidas registradas en efectivo</p>
      <span class="finance-amount">${formatCurrency(cashExpenses)}</span>
    </article>
    <article class="finance-card">
      <h3>Desde banco</h3>
      <p>Salidas registradas por cuenta bancaria</p>
      <span class="finance-amount">${formatCurrency(bankExpenses)}</span>
    </article>
    <article class="finance-card">
      <h3>Proveedores activos</h3>
      <p>Contactos disponibles para contratacion</p>
      <span class="finance-amount">${activeProviders}</span>
    </article>
  `;
}

function renderProviders() {
  const treasury = getTreasuryData();
  providersList.innerHTML = "";
  providersEmpty.style.display = treasury.providers.length === 0 ? "block" : "none";

  treasury.providers.forEach((provider) => {
    const card = document.createElement("article");
    card.className = "record-card";
    card.innerHTML = `
      <div class="record-header">
        <div>
          <h3 class="record-title">${provider.name}</h3>
          <p class="record-subtitle">${provider.category || "Sin rubro definido"}</p>
          <p class="record-meta">${provider.contact || "Sin contacto"}${provider.phone ? ` | ${provider.phone}` : ""}</p>
          <p class="record-extra">${provider.email || "Sin correo"}</p>
        </div>
        <div class="record-actions">
          <button class="secondary-button" data-provider-action="edit" data-id="${provider.id}" type="button">Editar</button>
          <button class="ghost-button" data-provider-action="delete" data-id="${provider.id}" type="button">Eliminar</button>
        </div>
      </div>
      <div class="tag-row">
        <span class="tag ${statusTagClass(provider.status)}">${humanizeValue(provider.status)}</span>
      </div>
    `;
    providersList.appendChild(card);
  });
}

function renderExpenses() {
  const treasury = getTreasuryData();
  expensesList.innerHTML = "";
  expensesEmpty.style.display = treasury.expenses.length === 0 ? "block" : "none";

  treasury.expenses
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .forEach((expense) => {
      const provider = getProviderById(expense.providerId);
      const relatedRecord = getRecordById(expense.relatedRecordId);
      const card = document.createElement("article");
      card.className = "record-card";
      card.innerHTML = `
        <div class="record-header">
          <div>
            <h3 class="record-title">${expense.detail || humanizeValue(expense.category)}</h3>
            <p class="record-subtitle">${formatDate(expense.date)} | ${humanizeValue(expense.category)}</p>
            <p class="record-meta">${provider ? provider.name : "Sin proveedor"} | ${humanizeValue(expense.fund)}</p>
            <p class="record-extra">${expense.costCenter || "Sin centro de costo"}${relatedRecord ? ` | ${getRecordLabel(relatedRecord)}` : ""}</p>
          </div>
          <div class="record-actions">
            <button class="secondary-button" data-expense-action="edit" data-id="${expense.id}" type="button">Editar</button>
            <button class="ghost-button" data-expense-action="delete" data-id="${expense.id}" type="button">Eliminar</button>
          </div>
        </div>
        <div class="tag-row">
          <span class="tag warning-tag">${formatCurrency(expense.amount)}</span>
        </div>
      `;
      expensesList.appendChild(card);
    });
}

function renderIncidentsDashboard() {
  const incidentsData = getIncidentsData();
  const openIncidents = incidentsData.incidents.filter((incident) => !["resuelta", "cerrada"].includes(incident.status)).length;
  const urgentIncidents = incidentsData.incidents.filter((incident) => ["alta", "critica"].includes(incident.priority)).length;
  const activeOrders = incidentsData.workOrders.filter((workOrder) => workOrder.status !== "cerrada").length;
  const estimatedCost = incidentsData.workOrders.reduce((sum, workOrder) => sum + Number(workOrder.cost || 0), 0);

  incidentsDashboard.innerHTML = `
    <article class="finance-card">
      <h3>Incidencias abiertas</h3>
      <p>Casos que aun requieren seguimiento</p>
      <span class="finance-amount">${openIncidents}</span>
    </article>
    <article class="finance-card">
      <h3>Alta prioridad</h3>
      <p>Incidencias urgentes o criticas</p>
      <span class="finance-amount">${urgentIncidents}</span>
    </article>
    <article class="finance-card">
      <h3>Ordenes activas</h3>
      <p>Trabajos asignados o en ejecucion</p>
      <span class="finance-amount">${activeOrders}</span>
    </article>
    <article class="finance-card">
      <h3>Costo estimado</h3>
      <p>Sumatoria de ordenes registradas</p>
      <span class="finance-amount">${formatCurrency(estimatedCost)}</span>
    </article>
  `;
}

function renderIncidents() {
  const incidentsData = getIncidentsData();
  incidentsList.innerHTML = "";
  incidentsEmpty.style.display = incidentsData.incidents.length === 0 ? "block" : "none";

  incidentsData.incidents
    .slice()
    .sort((a, b) => ((a.targetDate || a.createdAt) > (b.targetDate || b.createdAt) ? 1 : -1))
    .forEach((incident) => {
      const record = getRecordById(incident.recordId);
      const card = document.createElement("article");
      card.className = "record-card";
      card.innerHTML = `
        <div class="record-header">
          <div>
            <h3 class="record-title">${incident.title}</h3>
            <p class="record-subtitle">${incident.area || "Area no definida"}${record ? ` | ${getRecordLabel(record)}` : ""}</p>
            <p class="record-meta">${incident.responsible || "Sin responsable"}${incident.targetDate ? ` | Compromiso: ${formatDate(incident.targetDate)}` : ""}</p>
            <p class="record-extra">${incident.description}</p>
          </div>
          <div class="record-actions">
            <button class="secondary-button" data-incident-action="edit" data-id="${incident.id}" type="button">Editar</button>
            <button class="ghost-button" data-incident-action="delete" data-id="${incident.id}" type="button">Eliminar</button>
          </div>
        </div>
        <div class="tag-row">
          <span class="tag ${statusTagClass(incident.priority)}">${humanizeValue(incident.priority)}</span>
          <span class="tag ${statusTagClass(incident.status)}">${humanizeValue(incident.status)}</span>
        </div>
      `;
      incidentsList.appendChild(card);
    });
}

function renderWorkOrders() {
  const incidentsData = getIncidentsData();
  workOrdersList.innerHTML = "";
  workOrdersEmpty.style.display = incidentsData.workOrders.length === 0 ? "block" : "none";

  incidentsData.workOrders
    .slice()
    .sort((a, b) => ((a.targetDate || a.createdAt) > (b.targetDate || b.createdAt) ? 1 : -1))
    .forEach((workOrder) => {
      const incident = getIncidentById(workOrder.incidentId);
      const provider = getProviderById(workOrder.providerId);
      const card = document.createElement("article");
      card.className = "record-card";
      card.innerHTML = `
        <div class="record-header">
          <div>
            <h3 class="record-title">${incident ? incident.title : "Incidencia no encontrada"}</h3>
            <p class="record-subtitle">${provider ? provider.name : "Sin proveedor"}${workOrder.responsible ? ` | ${workOrder.responsible}` : ""}</p>
            <p class="record-meta">${workOrder.targetDate ? `Compromiso: ${formatDate(workOrder.targetDate)}` : "Sin fecha compromiso"}${workOrder.cost ? ` | ${formatCurrency(workOrder.cost)}` : ""}</p>
            <p class="record-extra">${workOrder.notes || "Sin notas adicionales"}</p>
          </div>
          <div class="record-actions">
            <button class="secondary-button" data-workorder-action="edit" data-id="${workOrder.id}" type="button">Editar</button>
            <button class="ghost-button" data-workorder-action="delete" data-id="${workOrder.id}" type="button">Eliminar</button>
          </div>
        </div>
        <div class="tag-row">
          <span class="tag ${statusTagClass(workOrder.status)}">${humanizeValue(workOrder.status)}</span>
        </div>
      `;
      workOrdersList.appendChild(card);
    });
}

function renderGovernanceDashboard() {
  const governance = getGovernanceData();
  const pendingAgreements = governance.agreements.filter((agreement) => !["cumplido", "cerrado"].includes(agreement.status)).length;
  const plannedAssemblies = governance.assemblies.filter((assembly) => assembly.status === "programada").length;
  const documentsCount = governance.documents.length;
  const totalAttendance = governance.assemblies.reduce((sum, assembly) => sum + Number(assembly.attendance || 0), 0);

  governanceDashboard.innerHTML = `
    <article class="finance-card">
      <h3>Asambleas programadas</h3>
      <p>Reuniones pendientes o por convocar</p>
      <span class="finance-amount">${plannedAssemblies}</span>
    </article>
    <article class="finance-card">
      <h3>Acuerdos pendientes</h3>
      <p>Temas que aun deben cerrarse</p>
      <span class="finance-amount">${pendingAgreements}</span>
    </article>
    <article class="finance-card">
      <h3>Documentos</h3>
      <p>Registros y comunicados almacenados</p>
      <span class="finance-amount">${documentsCount}</span>
    </article>
    <article class="finance-card">
      <h3>Asistencia acumulada</h3>
      <p>Suma de participantes registrados</p>
      <span class="finance-amount">${totalAttendance}</span>
    </article>
  `;
}

function renderAssemblies() {
  const governance = getGovernanceData();
  assembliesList.innerHTML = "";
  assembliesEmpty.style.display = governance.assemblies.length === 0 ? "block" : "none";

  governance.assemblies
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .forEach((assembly) => {
      const card = document.createElement("article");
      card.className = "record-card";
      card.innerHTML = `
        <div class="record-header">
          <div>
            <h3 class="record-title">${assembly.title}</h3>
            <p class="record-subtitle">${formatDate(assembly.date)}</p>
            <p class="record-meta">Asistencia: ${Number(assembly.attendance || 0)}</p>
            <p class="record-extra">${assembly.agenda || "Sin agenda registrada"}</p>
          </div>
          <div class="record-actions">
            <button class="secondary-button" data-assembly-action="edit" data-id="${assembly.id}" type="button">Editar</button>
            <button class="ghost-button" data-assembly-action="delete" data-id="${assembly.id}" type="button">Eliminar</button>
          </div>
        </div>
        <div class="tag-row">
          <span class="tag ${statusTagClass(assembly.status)}">${humanizeValue(assembly.status)}</span>
        </div>
      `;
      assembliesList.appendChild(card);
    });
}

function renderAgreements() {
  const governance = getGovernanceData();
  agreementsList.innerHTML = "";
  agreementsEmpty.style.display = governance.agreements.length === 0 ? "block" : "none";

  governance.agreements
    .slice()
    .sort((a, b) => ((a.targetDate || a.createdAt) > (b.targetDate || b.createdAt) ? 1 : -1))
    .forEach((agreement) => {
      const assembly = getAssemblyById(agreement.assemblyId);
      const card = document.createElement("article");
      card.className = "record-card";
      card.innerHTML = `
        <div class="record-header">
          <div>
            <h3 class="record-title">${agreement.title}</h3>
            <p class="record-subtitle">${assembly ? assembly.title : "Sin asamblea asociada"}</p>
            <p class="record-meta">${agreement.owner || "Sin responsable"}${agreement.targetDate ? ` | Limite: ${formatDate(agreement.targetDate)}` : ""}</p>
            <p class="record-extra">${agreement.detail || "Sin detalle adicional"}</p>
          </div>
          <div class="record-actions">
            <button class="secondary-button" data-agreement-action="edit" data-id="${agreement.id}" type="button">Editar</button>
            <button class="ghost-button" data-agreement-action="delete" data-id="${agreement.id}" type="button">Eliminar</button>
          </div>
        </div>
        <div class="tag-row">
          <span class="tag ${statusTagClass(agreement.status)}">${humanizeValue(agreement.status)}</span>
        </div>
      `;
      agreementsList.appendChild(card);
    });
}

function renderDocuments() {
  const governance = getGovernanceData();
  documentsList.innerHTML = "";
  documentsEmpty.style.display = governance.documents.length === 0 ? "block" : "none";

  governance.documents
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .forEach((documentRecord) => {
      const card = document.createElement("article");
      card.className = "record-card";
      card.innerHTML = `
        <div class="record-header">
          <div>
            <h3 class="record-title">${documentRecord.title}</h3>
            <p class="record-subtitle">${formatDate(documentRecord.date)} | ${humanizeValue(documentRecord.type)}</p>
            <p class="record-meta">${documentRecord.audience || "Sin publico definido"}</p>
            <p class="record-extra">${documentRecord.notes || "Sin notas"}</p>
          </div>
          <div class="record-actions">
            <button class="secondary-button" data-document-action="edit" data-id="${documentRecord.id}" type="button">Editar</button>
            <button class="ghost-button" data-document-action="delete" data-id="${documentRecord.id}" type="button">Eliminar</button>
          </div>
        </div>
      `;
      documentsList.appendChild(card);
    });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function convertRowsToExcelTable(rows, sheetTitle = "Reporte") {
  if (rows.length === 0) {
    rows = [{ mensaje: "No hay datos para exportar" }];
  }

  const headers = Object.keys(rows[0]);
  const headerHtml = headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("");
  const rowsHtml = rows
    .map((row) => `<tr>${headers.map((header) => `<td>${escapeHtml(row[header])}</td>`).join("")}</tr>`)
    .join("");

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(sheetTitle)}</title>
</head>
<body>
  <table border="1">
    <thead>
      <tr>${headerHtml}</tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
</body>
</html>`;
}

function downloadTextFile(filename, content, mimeType = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function downloadExcelFile(filename, rows, sheetTitle) {
  downloadTextFile(
    filename,
    convertRowsToExcelTable(rows, sheetTitle),
    "application/vnd.ms-excel;charset=utf-8"
  );
}

function renderReportsPanel() {
  const records = getRecords();
  const finance = getFinanceData();
  const treasury = getTreasuryData();
  const incidentsData = getIncidentsData();
  const governance = getGovernanceData();
  const financeSummary = finance.activities.reduce(
    (accumulator, activity) => {
      const summary = getActivityComputedSummary(activity);
      accumulator.target += summary.targetAmount;
      accumulator.collected += summary.collectedAmount;
      accumulator.pendingLots += summary.pendingLots;
      accumulator.activities += 1;
      return accumulator;
    },
    { target: 0, collected: 0, pendingLots: 0, activities: 0 }
  );
  const totalPendingFinance = Math.max(financeSummary.target - financeSummary.collected, 0);
  const pendingAgreements = governance.agreements.filter((agreement) => !["cumplido", "cerrado"].includes(agreement.status)).length;
  const openIncidents = incidentsData.incidents.filter((incident) => !["resuelta", "cerrada"].includes(incident.status)).length;

  reportsOverview.innerHTML = `
    <article class="superadmin-card">
      <h3>Socios</h3>
      <p>Total de fichas registradas</p>
      <span class="superadmin-value">${records.length}</span>
    </article>
    <article class="superadmin-card">
      <h3>Falta para metas</h3>
      <p>Monto aun no cubierto en actividades</p>
      <span class="superadmin-value">${formatCurrency(totalPendingFinance)}</span>
    </article>
    <article class="superadmin-card">
      <h3>Egresos</h3>
      <p>Total registrado en tesoreria</p>
      <span class="superadmin-value">${formatCurrency(treasury.expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0))}</span>
    </article>
    <article class="superadmin-card">
      <h3>Incidencias abiertas</h3>
      <p>Casos y acuerdos pendientes</p>
      <span class="superadmin-value">${openIncidents + pendingAgreements}</span>
    </article>
  `;

  reportsBreakdown.innerHTML = `
    <article class="record-card">
      <h3 class="record-title">Finanzas</h3>
      <p class="record-extra">${financeSummary.activities} actividades, ${finance.activityMovements.length} movimientos y ${financeSummary.pendingLots} lote(s) pendientes.</p>
    </article>
    <article class="record-card">
      <h3 class="record-title">Tesoreria</h3>
      <p class="record-extra">${treasury.providers.length} proveedores y ${treasury.expenses.length} egresos registrados.</p>
    </article>
    <article class="record-card">
      <h3 class="record-title">Incidencias</h3>
      <p class="record-extra">${incidentsData.incidents.length} incidencias y ${incidentsData.workOrders.length} ordenes de trabajo registradas.</p>
    </article>
    <article class="record-card">
      <h3 class="record-title">Asambleas</h3>
      <p class="record-extra">${governance.assemblies.length} asambleas, ${governance.agreements.length} acuerdos y ${governance.documents.length} documentos registrados.</p>
    </article>
  `;

  const activities = buildRecentActivity();
  reportsActivity.innerHTML = activities.length === 0
    ? '<div class="empty-state">Aun no hay actividad registrada en esta demo.</div>'
    : "";

  activities.forEach((activity) => {
    const item = document.createElement("article");
    item.className = "record-card";
    item.innerHTML = `
      <div class="record-header">
        <div>
          <h3 class="record-title">${activity.title}</h3>
          <p class="record-subtitle">${activity.tag}</p>
          <p class="record-extra">${activity.detail}</p>
        </div>
        <div class="tag-row">
          <span class="tag">${new Date(activity.at).toLocaleString()}</span>
        </div>
      </div>
    `;
    reportsActivity.appendChild(item);
  });
}

function resetChargeForm(preserveMessage = false) {
  editingFinanceActivityId = null;
  activityForm.reset();
  activityFormTitle.textContent = "Nueva actividad comunal";
  activityDateInput.value = getTodayIso();
  activityStatusInput.value = "abierta";
  updateSuggestedPerLotField();
  if (!preserveMessage) {
    clearMessage(activityMessage);
  }
}

function gatherChargeData() {
  const currentUser = getCurrentUser();
  const { suggestedAmount } = calculateSuggestedPerLot(activityTargetInput.value);
  return {
    id: editingFinanceActivityId || generateId(),
    title: activityTitleInput.value.trim(),
    description: activityDescriptionInput.value.trim(),
    date: activityDateInput.value,
    targetAmount: Number(activityTargetInput.value || 0),
    suggestedPerLot: suggestedAmount,
    status: activityStatusInput.value,
    updatedAt: new Date().toISOString(),
    createdBy: currentUser ? currentUser.username : "sistema"
  };
}

function validateChargeData(activity) {
  if (!activity.title) {
    return "Debes escribir el nombre de la actividad.";
  }

  if (!activity.date) {
    return "La fecha de la actividad es obligatoria.";
  }

  if (!activity.targetAmount || activity.targetAmount <= 0) {
    return "La meta total debe ser mayor a cero.";
  }

  if (getActiveActivityParticipants().length === 0) {
    return "Primero registra al menos un socio/lote activo para calcular el aporte sugerido.";
  }

  return "";
}

function fillChargeForm(activity) {
  editingFinanceActivityId = activity.id;
  activityFormTitle.textContent = `Editar actividad: ${activity.title}`;
  activityTitleInput.value = activity.title;
  activityDescriptionInput.value = activity.description || "";
  activityDateInput.value = activity.date || getTodayIso();
  activityTargetInput.value = Number(activity.targetAmount || 0);
  activityStatusInput.value = activity.status || "abierta";
  updateSuggestedPerLotField();
  setMessage(activityMessage, "Editando actividad comunal existente.", "success");
}

function syncMovementFormWithSelectedLot() {
  const activityLot = getActivityLotById(movementLotSelect.value);
  if (!activityLot) {
    return;
  }

  const computed = getActivityLotComputedState(activityLot, { ignoreMovementId: editingMovementId });
  const movementType = movementTypeSelect.value;

  if (movementType === "aporte_dinero" || movementType === "compensacion_aprobada") {
    movementAmountInput.value = computed.remainingAmount > 0 ? computed.remainingAmount.toFixed(2) : "";
  } else if (movementType === "devolucion") {
    movementAmountInput.value = computed.maxRefundableAmount > 0 ? computed.maxRefundableAmount.toFixed(2) : "";
  } else if (movementType === "exoneracion") {
    movementAmountInput.value = "0.00";
  } else {
    movementAmountInput.value = "";
  }

  if (!movementDateInput.value) {
    movementDateInput.value = getTodayIso();
  }
}

function resetMovementForm(preserveMessage = false) {
  editingMovementId = null;
  movementForm.reset();
  movementFormTitle.textContent = "Registrar movimiento";
  movementSubmitButton.textContent = "Guardar movimiento";
  movementTypeSelect.value = "aporte_dinero";
  movementDateInput.value = getTodayIso();
  renderPaymentChargeOptions(selectedFinanceLotId || "");
  if (selectedFinanceLotId) {
    movementLotSelect.value = selectedFinanceLotId;
  }
  syncMovementFormWithSelectedLot();
  if (!preserveMessage) {
    clearMessage(movementMessage);
  }
}

function fillMovementForm(movement, action = "edit") {
  const activityLot = getActivityLotById(movement.activityLotId);
  if (!activityLot) {
    return;
  }

  editingMovementId = action === "edit" ? movement.id : null;
  selectedFinanceLotId = movement.activityLotId;
  renderPaymentChargeOptions(movement.activityLotId);
  movementLotSelect.value = movement.activityLotId;

  if (action === "refund") {
    const computed = getActivityLotComputedState(activityLot);
    movementFormTitle.textContent = "Registrar devolucion";
    movementSubmitButton.textContent = "Guardar devolucion";
    movementTypeSelect.value = "devolucion";
    movementAmountInput.value = Math.min(Number(movement.amount || 0), computed.maxRefundableAmount).toFixed(2);
    movementDateInput.value = getTodayIso();
    movementMethodSelect.value = movement.method || "efectivo";
    movementDetailInput.value = `Devolucion del aporte registrado el ${formatDate(movement.date)}.`;
    setMessage(movementMessage, "Revisa el monto y guarda la devolucion para dejar historial.", "success");
    return;
  }

  movementFormTitle.textContent = "Editar movimiento";
  movementSubmitButton.textContent = "Guardar cambios";
  movementTypeSelect.value = movement.type;
  movementAmountInput.value = Number(movement.amount || 0) > 0 ? Number(movement.amount || 0).toFixed(2) : "";
  movementDateInput.value = movement.date || getTodayIso();
  movementMethodSelect.value = movement.method || "otro";
  movementDetailInput.value = movement.detail || "";
  setMessage(movementMessage, "Editando movimiento existente.", "success");
}

function renderCharges() {
  const activity = getSelectedFinanceRecord();
  chargesList.innerHTML = "";

  if (!activity) {
    chargesEmpty.style.display = "block";
    chargesEmpty.textContent = "Selecciona una actividad para ver sus lotes participantes.";
    return;
  }

  activityLotFilterSelect.value = activeActivityLotFilter;
  const filter = activeActivityLotFilter;
  const activityLots = getActivityLots(activity.id)
    .slice()
    .sort((a, b) => {
      const left = `${a.recordSnapshot?.manzana || ""}-${a.recordSnapshot?.lote || ""}`;
      const right = `${b.recordSnapshot?.manzana || ""}-${b.recordSnapshot?.lote || ""}`;
      return left > right ? 1 : -1;
    })
    .filter((activityLot) => {
      const computed = getActivityLotComputedState(activityLot);
      if (filter === "aportaron") {
        return computed.moneyAmount > 0;
      }
      if (filter === "pendientes") {
        return computed.remainingAmount > 0 && !computed.isExonerated;
      }
      if (filter === "apoyo_fisico") {
        return computed.hasPhysicalSupport;
      }
      if (filter === "compensados") {
        return computed.status === "compensado_por_junta" || computed.status === "exonerado";
      }
      if (filter === "sin_respuesta") {
        return computed.status === "sin_respuesta";
      }
      return true;
    });

  chargesEmpty.style.display = activityLots.length === 0 ? "block" : "none";
  chargesEmpty.textContent = "No hay lotes que coincidan con ese filtro en esta actividad.";

  activityLots.forEach((activityLot) => {
    const computed = getActivityLotComputedState(activityLot);
    const movementsHtml = computed.movements.length > 0
      ? `
        <div class="movement-log">
          ${computed.movements.map((movement) => `
            <article class="movement-item ${movement.status === "anulado" ? "annulled" : ""}">
              <div class="movement-item-main">
                <div>
                  <strong>${getMovementTypeLabel(movement.type)}</strong>
                  <p class="record-meta">${formatDate(movement.date)}${movement.method ? ` | ${getMethodLabel(movement.method)}` : ""}${movement.amount ? ` | ${formatCurrency(movement.amount)}` : ""}</p>
                  <p class="record-extra">${movement.detail || "Sin detalle adicional."}</p>
                </div>
                <div class="tag-row">
                  <span class="tag ${movement.status === "anulado" ? "danger-tag" : "success-tag"}">${movement.status === "anulado" ? "Anulado" : "Activo"}</span>
                </div>
              </div>
              <div class="movement-actions">
                ${movement.status === "anulado" ? "" : `
                  <button class="secondary-button" data-movement-action="edit" data-id="${movement.id}" type="button">Editar</button>
                  ${movement.type === "aporte_dinero" ? `<button class="primary-button" data-movement-action="refund" data-id="${movement.id}" type="button">Devolucion</button>` : ""}
                  <button class="ghost-button" data-movement-action="annul" data-id="${movement.id}" type="button">Anular</button>
                `}
                <button class="ghost-button" data-movement-action="delete" data-id="${movement.id}" type="button">Eliminar</button>
              </div>
            </article>
          `).join("")}
        </div>
      `
      : '<p class="record-extra">Aun no tiene movimientos registrados.</p>';
    const card = document.createElement("article");
    card.className = "record-card";
    card.innerHTML = `
      <div class="record-header">
        <div>
          <h3 class="record-title">${activityLot.recordSnapshot?.manzana || ""} - Lote ${activityLot.recordSnapshot?.lote || ""}</h3>
          <p class="record-subtitle">${activityLot.recordSnapshot?.titular || "Sin titular"} </p>
          <p class="record-meta">${activityLot.recordSnapshot?.documento || "Sin documento"}</p>
          <p class="record-extra">Aporte sugerido: ${formatCurrency(activityLot.suggestedAmount)} | Dinero neto: ${formatCurrency(computed.moneyAmount)} | Devuelto: ${formatCurrency(computed.returnedAmount)} | Compensado por junta: ${formatCurrency(computed.approvedCompensation)} | Saldo: ${formatCurrency(computed.remainingAmount)}</p>
        </div>
        <div class="record-actions">
          <button class="primary-button" data-charge-action="move" data-id="${activityLot.id}" type="button">Registrar movimiento</button>
        </div>
      </div>
      <div class="tag-row">
        <span class="tag ${statusTagClass(computed.status)}">${humanizeValue(computed.status)}</span>
        ${computed.hasPhysicalSupport ? '<span class="tag">Ayuda fisica</span>' : ""}
        ${computed.noResponseMarked ? '<span class="tag danger-tag">Sin respuesta</span>' : ""}
      </div>
      ${movementsHtml}
    `;
    chargesList.appendChild(card);
  });
}

function resetAccountForm(preserveMessage = false) {
  editingAccountId = null;
  accountForm.reset();
  document.getElementById("account-active").checked = true;
  accountFormTitle.textContent = "Nueva cuenta directiva";
  if (!preserveMessage) {
    clearMessage(accountMessage);
  }
}

function fillAccountForm(account) {
  editingAccountId = account.id;
  accountFormTitle.textContent = `Editar cuenta: ${account.username}`;
  document.getElementById("account-name").value = account.nombreCompleto;
  document.getElementById("account-username").value = account.username;
  document.getElementById("account-email").value = account.correo || "";
  document.getElementById("account-phone").value = account.celular || "";
  document.getElementById("account-position").value = account.cargoJunta === "superadmin" ? "directivo" : account.cargoJunta;
  document.getElementById("account-password").value = "";
  document.getElementById("account-active").checked = account.active;
  setMessage(accountMessage, "Editando cuenta directiva. Si escribes una nueva contrasena, se actualizara.", "success");
}

function renderAccounts() {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "superadmin") {
    return;
  }

  const accounts = getAccounts();
  accountsList.innerHTML = "";
  const visibleAccounts = accounts.filter((account) => account.role !== "superadmin" || account.protected);
  accountsEmpty.style.display = visibleAccounts.length === 0 ? "block" : "none";

  visibleAccounts.forEach((account) => {
    const card = document.createElement("article");
    card.className = "record-card";
    const protectedNote = account.protected ? '<p class="protected-note">Cuenta protegida del sistema.</p>' : "";
    card.innerHTML = `
      <div class="record-header">
        <div>
          <h3 class="record-title">${account.nombreCompleto}</h3>
          <p class="record-subtitle">@${account.username}</p>
          <p class="record-meta">${account.correo || "sin correo"}${account.celular ? ` | ${account.celular}` : ""}</p>
          <p class="record-extra">Cargo: ${account.cargoJunta}</p>
          ${protectedNote}
        </div>
        <div class="record-actions">
          ${account.protected ? "" : `<button class="secondary-button" data-account-action="edit" data-id="${account.id}" type="button">Editar</button>`}
          ${account.protected ? "" : `<button class="ghost-button" data-account-action="delete" data-id="${account.id}" type="button">Eliminar</button>`}
        </div>
      </div>
      <div class="tag-row">
        <span class="account-role">${roleLabel(account)}</span>
        <span class="account-status ${account.active ? "" : "inactive"}">${account.active ? "Activa" : "Inactiva"}</span>
      </div>
    `;
    accountsList.appendChild(card);
  });
}

function buildRecentActivity() {
  const activities = [];

  getRecords().forEach((record) => {
    activities.push({
      at: record.updatedAt,
      title: `${record.titular.nombres} ${record.titular.apellidos}`,
      detail: `Ficha de socio actualizada por ${record.updatedBy || "sistema"}`,
      tag: "Socios"
    });
  });

  const finance = getFinanceData();
  finance.activities.forEach((activity) => {
    activities.push({
      at: activity.updatedAt || activity.createdAt,
      title: activity.title,
      detail: `Actividad ${humanizeValue(activity.status)} con meta ${formatCurrency(activity.targetAmount)}`,
      tag: "Actividades"
    });
  });

  finance.activityMovements.forEach((movement) => {
    activities.push({
      at: movement.updatedAt || movement.createdAt,
      title: getMovementTypeLabel(movement.type),
      detail: `${movement.activityLotSnapshot?.titular || "Lote"}${movement.amount ? ` por ${formatCurrency(movement.amount)}` : ""}${movement.status === "anulado" ? " (anulado)" : ""}`,
      tag: "Aportes"
    });
  });

  const treasury = getTreasuryData();
  treasury.providers.forEach((provider) => {
    activities.push({
      at: provider.updatedAt || provider.createdAt,
      title: provider.name,
      detail: `Proveedor ${provider.status || "activo"} en rubro ${provider.category || "general"}`,
      tag: "Tesoreria"
    });
  });

  treasury.expenses.forEach((expense) => {
    activities.push({
      at: expense.updatedAt || expense.createdAt,
      title: expense.detail || humanizeValue(expense.category),
      detail: `Egreso por ${formatCurrency(expense.amount)} desde ${humanizeValue(expense.fund)}`,
      tag: "Egresos"
    });
  });

  const incidentsData = getIncidentsData();
  incidentsData.incidents.forEach((incident) => {
    activities.push({
      at: incident.updatedAt || incident.createdAt,
      title: incident.title,
      detail: `Incidencia ${humanizeValue(incident.status)} con prioridad ${humanizeValue(incident.priority)}`,
      tag: "Incidencias"
    });
  });

  incidentsData.workOrders.forEach((workOrder) => {
    activities.push({
      at: workOrder.updatedAt || workOrder.createdAt,
      title: "Orden de trabajo",
      detail: `${humanizeValue(workOrder.status)}${workOrder.cost ? ` por ${formatCurrency(workOrder.cost)}` : ""}`,
      tag: "Mantenimiento"
    });
  });

  const governance = getGovernanceData();
  governance.assemblies.forEach((assembly) => {
    activities.push({
      at: assembly.updatedAt || assembly.createdAt,
      title: assembly.title,
      detail: `Asamblea ${humanizeValue(assembly.status)} para ${formatDate(assembly.date)}`,
      tag: "Asambleas"
    });
  });

  governance.agreements.forEach((agreement) => {
    activities.push({
      at: agreement.updatedAt || agreement.createdAt,
      title: agreement.title,
      detail: `Acuerdo ${humanizeValue(agreement.status)}`,
      tag: "Acuerdos"
    });
  });

  governance.documents.forEach((documentRecord) => {
    activities.push({
      at: documentRecord.updatedAt || documentRecord.createdAt,
      title: documentRecord.title,
      detail: `Documento tipo ${humanizeValue(documentRecord.type)}`,
      tag: "Documentos"
    });
  });

  getAccounts().forEach((account) => {
    activities.push({
      at: account.updatedAt || account.createdAt,
      title: account.nombreCompleto,
      detail: `Cuenta ${account.role === "superadmin" ? "super admin" : "directiva"} ${account.active ? "activa" : "inactiva"}`,
      tag: "Usuarios"
    });
  });

  return activities
    .filter((item) => item.at)
    .sort((a, b) => (a.at < b.at ? 1 : -1))
    .slice(0, 8);
}

function renderSuperAdminPanel() {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "superadmin") {
    return;
  }

  const records = getRecords();
  const accounts = getAccounts();
  const finance = getFinanceData();
  const treasury = getTreasuryData();
  const incidentsData = getIncidentsData();
  const governance = getGovernanceData();
  const activeDirectivos = accounts.filter((account) => account.role !== "superadmin" && account.active).length;
  const financeTotals = finance.activities.reduce(
    (accumulator, activity) => {
      const summary = getActivityComputedSummary(activity);
      accumulator.target += summary.targetAmount;
      accumulator.collected += summary.collectedAmount;
      accumulator.pendingLots += summary.pendingLots;
      return accumulator;
    },
    { target: 0, collected: 0, pendingLots: 0 }
  );
  const financeMissing = Math.max(financeTotals.target - financeTotals.collected, 0);

  superadminOverview.innerHTML = `
    <article class="superadmin-card">
      <h3>Socios</h3>
      <p>Fichas registradas en el sistema</p>
      <span class="superadmin-value">${records.length}</span>
    </article>
    <article class="superadmin-card">
      <h3>Directivos activos</h3>
      <p>Cuentas administrativas habilitadas</p>
      <span class="superadmin-value">${activeDirectivos}</span>
    </article>
    <article class="superadmin-card">
      <h3>Falta para metas</h3>
      <p>Monto aun no cubierto por actividades</p>
      <span class="superadmin-value">${formatCurrency(financeMissing)}</span>
    </article>
    <article class="superadmin-card">
      <h3>Alertas activas</h3>
      <p>Incidencias y acuerdos aun por atender</p>
      <span class="superadmin-value">${incidentsData.incidents.filter((item) => !["resuelta", "cerrada"].includes(item.status)).length + governance.agreements.filter((item) => !["cumplido", "cerrado"].includes(item.status)).length}</span>
    </article>
    <article class="superadmin-card">
      <h3>Egresos</h3>
      <p>Total registrado en tesoreria</p>
      <span class="superadmin-value">${formatCurrency(treasury.expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0))}</span>
    </article>
    <article class="superadmin-card">
      <h3>Documentos</h3>
      <p>Archivos y comunicados registrados</p>
      <span class="superadmin-value">${governance.documents.length}</span>
    </article>
  `;

  const activities = buildRecentActivity();
  superadminActivity.innerHTML = "";

  if (activities.length === 0) {
    superadminActivity.innerHTML = '<div class="empty-state">Aun no hay actividad registrada en esta demo.</div>';
    return;
  }

  activities.forEach((activity) => {
    const item = document.createElement("article");
    item.className = "record-card";
    item.innerHTML = `
      <div class="record-header">
        <div>
          <h3 class="record-title">${activity.title}</h3>
          <p class="record-subtitle">${activity.tag}</p>
          <p class="record-extra">${activity.detail}</p>
        </div>
        <div class="tag-row">
          <span class="tag">${new Date(activity.at).toLocaleString()}</span>
        </div>
      </div>
    `;
    superadminActivity.appendChild(item);
  });
}

function refreshAllViews() {
  renderSummary();
  renderRecords();
  renderFinanceRecordPicker();
  renderFinanceSelectedCard();
  renderPaymentChargeOptions();
  renderCharges();
  renderFinanceDashboard();
  updateSuggestedPerLotField();
  renderProviderOptions();
  renderExpenseRecordOptions();
  renderTreasuryDashboard();
  renderProviders();
  renderExpenses();
  renderIncidentRecordOptions();
  renderWorkOrderIncidentOptions();
  renderIncidentsDashboard();
  renderIncidents();
  renderWorkOrders();
  renderAgreementAssemblyOptions();
  renderGovernanceDashboard();
  renderAssemblies();
  renderAgreements();
  renderDocuments();
  renderReportsPanel();
  renderAccounts();
  renderSuperAdminPanel();
  renderPortalView();
}

function renderAppState() {
  const currentUser = getCurrentUser();

  if (activeSurface === "portal") {
    authView.classList.add("hidden");
    appView.classList.add("hidden");
    portalView.classList.remove("hidden");
    renderPortalView();
    return;
  }

  if (!currentUser) {
    activeSurface = "auth";
    authView.classList.remove("hidden");
    portalView.classList.add("hidden");
    appView.classList.add("hidden");
    currentUserName.textContent = "-";
    currentUserRole.textContent = "-";
    setActiveTab("registro");
    return;
  }

  activeSurface = "app";
  authView.classList.add("hidden");
  portalView.classList.add("hidden");
  appView.classList.remove("hidden");
  currentUserName.textContent = currentUser.nombreCompleto;
  currentUserRole.textContent = roleLabel(currentUser);

  if (currentUser.role === "superadmin") {
    accountAdminSection.classList.remove("hidden");
    renderAccounts();
    renderSuperAdminPanel();
  } else {
    accountAdminSection.classList.add("hidden");
    resetAccountForm();
    clearMessage(superadminMessage);
  }

  const allowedTabs = availableTabsForUser(currentUser);
  if (!allowedTabs.includes(activeTab)) {
    activeTab = allowedTabs[0];
  }
  setActiveTab(activeTab);
  refreshAllViews();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  let account = null;
  try {
    account = await remoteStore.login(username, password);
  } catch (error) {
    console.error("No se pudo iniciar sesion.", error);
    setMessage(loginMessage, "No se pudo conectar con la base de datos. Revisa la configuracion remota.", "error");
    return;
  }

  if (!account) {
    setMessage(loginMessage, "Usuario o contrasena incorrectos.", "error");
    return;
  }

  clearMessage(loginMessage);
  activeSurface = "app";
  activeTab = account.role === "superadmin" ? "superadmin" : "registro";
  loginForm.reset();
  renderAppState();
});

logoutButton.addEventListener("click", async () => {
  await clearSession();
  clearMessage(loginMessage);
  activeSurface = "auth";
  activeTab = "registro";
  renderAppState();
});

openPortalButton.addEventListener("click", () => {
  clearMessage(loginMessage);
  activeSurface = "portal";
  renderAppState();
});

portalBackButton.addEventListener("click", () => {
  activeSurface = getCurrentUser() ? "app" : "auth";
  renderAppState();
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.tab);
  });
});

financeSearchInput.addEventListener("input", () => {
  renderFinanceRecordPicker();
});

financeRecordsList.addEventListener("click", (event) => {
  const button = event.target.closest(".finance-record-button");
  if (!button) {
    return;
  }

  selectFinanceRecord(button.dataset.recordId, false);
  renderFinanceRecordPicker();
});

superadminNavButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.superadminNav);
  });
});

superadminActionButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "superadmin") {
      setMessage(superadminMessage, "Solo el super admin puede ejecutar estas acciones.", "error");
      return;
    }

    try {
      if (button.dataset.superadminAction === "clear-finance") {
        await saveFinanceData({
          charges: [],
          payments: [],
          activities: [],
          activityLots: [],
          activityMovements: []
        });
        editingFinanceActivityId = null;
        selectedFinanceRecordId = null;
        selectedFinanceLotId = null;
        refreshAllViews();
        setMessage(superadminMessage, "Se limpiaron todas las actividades y aportes de la demo.", "success");
        return;
      }

      if (button.dataset.superadminAction === "clear-directivos") {
        const protectedAccounts = getAccounts().filter((account) => account.protected);
        await saveAccounts(protectedAccounts);
        editingAccountId = null;
        refreshAllViews();
        setMessage(superadminMessage, "Se eliminaron las cuentas directivas y se mantuvo solo el super admin.", "success");
        return;
      }

      if (button.dataset.superadminAction === "reset-demo") {
        await saveRecords([]);
        await saveFinanceData({
          charges: [],
          payments: [],
          activities: [],
          activityLots: [],
          activityMovements: []
        });
        await saveTreasuryData({ providers: [], expenses: [] });
        await saveIncidentsData({ incidents: [], workOrders: [] });
        await saveGovernanceData({ assemblies: [], agreements: [], documents: [] });
        await saveAccounts(getAccounts().filter((account) => account.protected));
        editingRecordId = null;
        editingFinanceActivityId = null;
        editingAccountId = null;
        selectedFinanceRecordId = null;
        selectedFinanceLotId = null;
        resetForm(true);
        resetChargeForm(true);
        resetAccountForm(true);
        refreshAllViews();
        setActiveTab("superadmin");
        setMessage(superadminMessage, "La demo fue reiniciada. Solo se conservo la cuenta del super admin.", "success");
      }
    } catch (error) {
      console.error("No se pudo completar la accion del super admin.", error);
      setMessage(superadminMessage, "No se pudo sincronizar la accion con la base de datos.", "error");
    }
  });
});

accountForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "superadmin") {
    setMessage(accountMessage, "Solo el super admin puede gestionar cuentas.", "error");
    return;
  }

  const nombreCompleto = document.getElementById("account-name").value.trim();
  const username = document.getElementById("account-username").value.trim();
  const correo = document.getElementById("account-email").value.trim();
  const celular = document.getElementById("account-phone").value.trim();
  const cargoJunta = document.getElementById("account-position").value;
  const password = document.getElementById("account-password").value;
  const active = document.getElementById("account-active").checked;
  const accounts = getAccounts();

  if (!nombreCompleto || !username) {
    setMessage(accountMessage, "Nombre y usuario son obligatorios.", "error");
    return;
  }

  const duplicatedUser = accounts.find((account) => account.username.toLowerCase() === username.toLowerCase() && account.id !== editingAccountId);
  if (duplicatedUser) {
    setMessage(accountMessage, "Ese usuario ya existe.", "error");
    return;
  }

  const duplicatedEmail = correo
    ? accounts.find((account) => account.correo && account.correo.toLowerCase() === correo.toLowerCase() && account.id !== editingAccountId)
    : null;
  if (duplicatedEmail) {
    setMessage(accountMessage, "Ese correo ya esta asignado a otra cuenta.", "error");
    return;
  }

  if (!editingAccountId && !password) {
    setMessage(accountMessage, "La contrasena es obligatoria para crear la cuenta.", "error");
    return;
  }

  try {
    if (editingAccountId) {
      const index = accounts.findIndex((account) => account.id === editingAccountId);
      if (index === -1 || accounts[index].protected) {
        setMessage(accountMessage, "No se puede editar esa cuenta.", "error");
        return;
      }

      accounts[index] = {
        ...accounts[index],
        nombreCompleto,
        username,
        correo,
        celular,
        cargoJunta,
        active,
        password: password || (remoteStore.isRemoteEnabled() ? "" : accounts[index].password),
        updatedAt: new Date().toISOString()
      };

      await saveAccounts(accounts);
      renderAccounts();
      renderSuperAdminPanel();
      resetAccountForm(true);
      setMessage(accountMessage, "Cuenta directiva actualizada correctamente.", "success");
      return;
    }

    accounts.push({
      id: generateId(),
      username,
      password,
      nombreCompleto,
      correo,
      celular,
      cargoJunta,
      role: "directivo",
      active,
      protected: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    await saveAccounts(accounts);
    renderAccounts();
    renderSuperAdminPanel();
    resetAccountForm(true);
    setMessage(accountMessage, "Cuenta directiva creada correctamente.", "success");
  } catch (error) {
    console.error("No se pudo guardar la cuenta.", error);
    setMessage(accountMessage, "No se pudo guardar la cuenta en la base de datos.", "error");
  }
});

accountCancelButton.addEventListener("click", () => {
  resetAccountForm();
});

accountsList.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-account-action]");
  if (!button) {
    return;
  }

  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== "superadmin") {
    return;
  }

  const accounts = getAccounts();
  const account = accounts.find((item) => item.id === button.dataset.id);
  if (!account || account.protected) {
    return;
  }

  if (button.dataset.accountAction === "edit") {
    fillAccountForm(account);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    return;
  }

  if (button.dataset.accountAction === "delete") {
    try {
      const nextAccounts = accounts.filter((item) => item.id !== account.id);
      await saveAccounts(nextAccounts);
      renderAccounts();
      renderSuperAdminPanel();
      resetAccountForm(true);
      setMessage(accountMessage, "Cuenta directiva eliminada.", "success");
    } catch (error) {
      console.error("No se pudo eliminar la cuenta.", error);
      setMessage(accountMessage, "No se pudo eliminar la cuenta en la base de datos.", "error");
    }
  }
});

activityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const activity = gatherChargeData();
  const validationError = validateChargeData(activity);

  if (validationError) {
    setMessage(activityMessage, validationError, "error");
    return;
  }

  let finance = getFinanceData();
  const existingIndex = finance.activities.findIndex((item) => item.id === activity.id);
  if (existingIndex >= 0) {
    finance.activities[existingIndex] = {
      ...finance.activities[existingIndex],
      ...activity
    };
  } else {
    finance.activities.unshift({
      ...activity,
      createdAt: new Date().toISOString()
    });
  }

  finance = syncActivityLotsForActivity(activity, finance);
  saveFinanceData(finance);
  selectFinanceRecord(activity.id);
  refreshAllViews();
  resetChargeForm(true);
  setMessage(activityMessage, existingIndex >= 0 ? "Actividad actualizada correctamente." : "Actividad guardada correctamente.", "success");
});

activityCancelButton.addEventListener("click", () => {
  resetChargeForm();
});

movementForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const activityLotId = movementLotSelect.value;
  const movementType = movementTypeSelect.value;
  const amount = Number(movementAmountInput.value || 0);
  const movementDate = movementDateInput.value;
  const method = movementMethodSelect.value;
  const detail = movementDetailInput.value.trim();

  if (!activityLotId) {
    setMessage(movementMessage, "Debes seleccionar un lote participante.", "error");
    return;
  }

  if (!movementDate) {
    setMessage(movementMessage, "La fecha del movimiento es obligatoria.", "error");
    return;
  }

  if (["aporte_dinero", "compensacion_aprobada"].includes(movementType) && amount <= 0) {
    setMessage(movementMessage, "Ese tipo de movimiento requiere un monto mayor a cero.", "error");
    return;
  }

  const finance = getFinanceData();
  const activityLot = finance.activityLots.find((item) => item.id === activityLotId);
  if (!activityLot) {
    setMessage(movementMessage, "El lote seleccionado ya no existe en esta actividad.", "error");
    return;
  }

  const computed = getActivityLotComputedState(activityLot, { ignoreMovementId: editingMovementId });
  if (["aporte_dinero", "compensacion_aprobada"].includes(movementType) && amount > computed.remainingAmount) {
    setMessage(movementMessage, `El monto no puede superar el saldo pendiente de ${formatCurrency(computed.remainingAmount)}.`, "error");
    return;
  }

  if (movementType === "devolucion" && amount <= 0) {
    setMessage(movementMessage, "La devolucion debe ser mayor a cero.", "error");
    return;
  }

  if (movementType === "devolucion" && amount > computed.maxRefundableAmount) {
    setMessage(movementMessage, `La devolucion no puede superar el aporte neto disponible de ${formatCurrency(computed.maxRefundableAmount)}.`, "error");
    return;
  }

  const currentUser = getCurrentUser();
  const isEditingMovement = Boolean(editingMovementId);
  const movementPayload = {
    activityId: activityLot.activityId,
    activityLotId,
    type: movementType,
    amount,
    date: movementDate,
    method,
    detail,
    status: "activo",
    activityLotSnapshot: {
      titular: activityLot.recordSnapshot?.titular,
      manzana: activityLot.recordSnapshot?.manzana,
      lote: activityLot.recordSnapshot?.lote
    },
    updatedAt: new Date().toISOString(),
    updatedBy: currentUser ? currentUser.username : "sistema"
  };

  if (editingMovementId) {
    const movementIndex = finance.activityMovements.findIndex((movement) => movement.id === editingMovementId);
    if (movementIndex < 0) {
      setMessage(movementMessage, "El movimiento que intentas editar ya no existe.", "error");
      return;
    }
    finance.activityMovements[movementIndex] = {
      ...finance.activityMovements[movementIndex],
      ...movementPayload
    };
  } else {
    finance.activityMovements.unshift({
      id: generateId(),
      ...movementPayload,
      createdAt: new Date().toISOString(),
      createdBy: currentUser ? currentUser.username : "sistema"
    });
  }

  saveFinanceData(finance);
  selectedFinanceLotId = activityLotId;
  refreshAllViews();
  resetMovementForm(true);
  setMessage(movementMessage, isEditingMovement ? "Movimiento actualizado correctamente." : "Movimiento registrado correctamente.", "success");
});

movementCancelButton.addEventListener("click", () => {
  resetMovementForm();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const record = gatherFormData();
  const validationError = validateRecord(record);

  if (validationError) {
    setMessage(messageBox, validationError, "error");
    return;
  }

  const records = getRecords();
  const existingIndex = records.findIndex((item) => item.id === record.id);
  if (existingIndex >= 0) {
    records[existingIndex] = { ...records[existingIndex], ...record };
  } else {
    records.unshift(record);
  }

  saveRecords(records);
  const finance = getFinanceData();
  const updatedSnapshot = {
    titular: `${record.titular.nombres} ${record.titular.apellidos}`,
    documento: `${record.titular.tipoDocumento} ${record.titular.numeroDocumento}`,
    manzana: record.ubicacion.manzana,
    lote: record.ubicacion.lote
  };
  saveFinanceData({
    ...finance,
    activityLots: finance.activityLots.map((activityLot) => (
      activityLot.recordId === record.id
        ? { ...activityLot, recordSnapshot: updatedSnapshot, updatedAt: new Date().toISOString() }
        : activityLot
    ))
  });
  renderRecords();
  renderFinanceRecordPicker();
  updateLotMeta();
  renderSuperAdminPanel();
  resetForm(true);
  setMessage(messageBox, existingIndex >= 0 ? "Registro actualizado correctamente." : "Socio guardado en la demo.", "success");
});

manzanaSelect.addEventListener("change", () => {
  populateLotes("");
  updateLotMeta();
  renderSummary();
});

loteSelect.addEventListener("change", () => {
  updateLotMeta();
  renderSummary();
});

addCotitularButton.addEventListener("click", () => {
  buildCotitularCard();
  renderSummary();
});

resetButton.addEventListener("click", () => {
  resetForm();
});

clearStorageButton.addEventListener("click", async () => {
  const finance = getFinanceData();
  if (finance.activities.length > 0 || finance.activityLots.length > 0 || finance.activityMovements.length > 0) {
    setMessage(messageBox, "No puedes limpiar los socios mientras existan actividades comunales registradas.", "error");
    return;
  }

  await saveRecords([]);
  if (selectedFinanceRecordId) {
    selectedFinanceRecordId = null;
  }
  renderRecords();
  renderFinanceRecordPicker();
  renderFinanceSelectedCard();
  renderCharges();
  renderFinanceDashboard();
  renderPaymentChargeOptions();
  updateLotMeta();
  renderSuperAdminPanel();
  setMessage(messageBox, "Se limpio la informacion local de socios en esta demo.", "success");
});

recordsList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const records = getRecords();
  const record = records.find((item) => item.id === button.dataset.id);
  if (!record) {
    return;
  }

  if (button.dataset.action === "edit") {
    fillForm(record);
    setActiveTab("registro");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (button.dataset.action === "delete") {
    const finance = getFinanceData();
    const hasActivityHistory = finance.activityLots.some((activityLot) => activityLot.recordId === record.id);
    if (hasActivityHistory) {
      setMessage(messageBox, "No puedes eliminar este socio porque ya participa en actividades comunales. Elimina primero ese historial.", "error");
      return;
    }

    const nextRecords = records.filter((item) => item.id !== record.id);
    saveRecords(nextRecords);
    renderRecords();
    renderFinanceRecordPicker();
    renderFinanceSelectedCard();
    renderCharges();
    renderFinanceDashboard();
    renderPaymentChargeOptions();
    updateLotMeta();
    renderSuperAdminPanel();
    setMessage(messageBox, "Registro eliminado de la demo.", "success");

    if (editingRecordId === record.id) {
      resetForm(true);
    }
  }
});

chargesList.addEventListener("click", (event) => {
  const movementButton = event.target.closest("button[data-movement-action]");
  if (movementButton) {
    const movement = getMovementById(movementButton.dataset.id);
    if (!movement) {
      return;
    }

    if (movementButton.dataset.movementAction === "edit") {
      fillMovementForm(movement, "edit");
      setActiveTab("finanzas");
      window.scrollTo({ top: movementForm.offsetTop - 120, behavior: "smooth" });
      return;
    }

    if (movementButton.dataset.movementAction === "refund") {
      fillMovementForm(movement, "refund");
      setActiveTab("finanzas");
      window.scrollTo({ top: movementForm.offsetTop - 120, behavior: "smooth" });
      return;
    }

    if (movementButton.dataset.movementAction === "annul") {
      const finance = getFinanceData();
      const movementIndex = finance.activityMovements.findIndex((item) => item.id === movement.id);
      if (movementIndex < 0) {
        return;
      }

      const currentUser = getCurrentUser();
      finance.activityMovements[movementIndex] = {
        ...finance.activityMovements[movementIndex],
        status: "anulado",
        updatedAt: new Date().toISOString(),
        updatedBy: currentUser ? currentUser.username : "sistema",
        annulledAt: new Date().toISOString(),
        annulledBy: currentUser ? currentUser.username : "sistema"
      };
      saveFinanceData(finance);
      selectedFinanceLotId = movement.activityLotId;
      refreshAllViews();
      resetMovementForm(true);
      setMessage(movementMessage, "Movimiento anulado. El historial se conserva.", "success");
      return;
    }

    if (movementButton.dataset.movementAction === "delete") {
      const shouldDelete = window.confirm("Esto eliminara el movimiento de forma permanente. Usa 'Anular' si quieres conservar historial. Deseas continuar?");
      if (!shouldDelete) {
        return;
      }

      const finance = getFinanceData();
      saveFinanceData({
        ...finance,
        activityMovements: finance.activityMovements.filter((item) => item.id !== movement.id)
      });
      selectedFinanceLotId = movement.activityLotId;
      refreshAllViews();
      resetMovementForm(true);
      setMessage(movementMessage, "Movimiento eliminado permanentemente.", "success");
      return;
    }
  }

  const button = event.target.closest("button[data-charge-action]");
  if (!button) {
    return;
  }

  const activityLot = getActivityLotById(button.dataset.id);
  if (!activityLot) {
    return;
  }

  if (button.dataset.chargeAction === "move") {
    selectedFinanceLotId = activityLot.id;
    resetMovementForm(true);
    renderPaymentChargeOptions(activityLot.id);
    movementLotSelect.value = activityLot.id;
    syncMovementFormWithSelectedLot();
    setActiveTab("finanzas");
    window.scrollTo({ top: chargesList.offsetTop - 120, behavior: "smooth" });
    setMessage(movementMessage, "Lote preseleccionado para registrar el movimiento.", "success");
    return;
  }
});

financeSelectedCard.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-activity-action]");
  if (!button) {
    return;
  }

  const activity = getActivityById(button.dataset.id);
  if (!activity) {
    return;
  }

  if (button.dataset.activityAction === "edit") {
    fillChargeForm(activity);
    setActiveTab("finanzas");
    window.scrollTo({ top: financeSelectedCard.offsetTop - 120, behavior: "smooth" });
    return;
  }

  if (button.dataset.activityAction === "delete") {
    const finance = getFinanceData();
    const remainingLots = finance.activityLots.filter((activityLot) => activityLot.activityId !== activity.id);
    const removedLotIds = finance.activityLots.filter((activityLot) => activityLot.activityId === activity.id).map((activityLot) => activityLot.id);
    saveFinanceData({
      ...finance,
      activities: finance.activities.filter((item) => item.id !== activity.id),
      activityLots: remainingLots,
      activityMovements: finance.activityMovements.filter((movement) => !removedLotIds.includes(movement.activityLotId))
    });
    if (selectedFinanceRecordId === activity.id) {
      selectedFinanceRecordId = null;
      selectedFinanceLotId = null;
    }
    refreshAllViews();
    resetChargeForm(true);
    setMessage(activityMessage, "Actividad eliminada junto con sus lotes y movimientos.", "success");
  }
});

providerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("provider-name").value.trim();

  if (!name) {
    setMessage(providerMessage, "El nombre del proveedor es obligatorio.", "error");
    return;
  }

  const treasury = getTreasuryData();
  const currentUser = getCurrentUser();
  const provider = {
    id: editingProviderId || generateId(),
    name,
    category: document.getElementById("provider-category").value.trim(),
    contact: document.getElementById("provider-contact").value.trim(),
    phone: document.getElementById("provider-phone").value.trim(),
    email: document.getElementById("provider-email").value.trim(),
    status: document.getElementById("provider-status").value,
    updatedAt: new Date().toISOString(),
    createdBy: currentUser ? currentUser.username : "sistema"
  };
  const existingIndex = treasury.providers.findIndex((item) => item.id === provider.id);

  if (existingIndex >= 0) {
    treasury.providers[existingIndex] = { ...treasury.providers[existingIndex], ...provider };
  } else {
    treasury.providers.unshift({ ...provider, createdAt: new Date().toISOString() });
  }

  saveTreasuryData(treasury);
  refreshAllViews();
  resetProviderForm(true);
  setMessage(providerMessage, existingIndex >= 0 ? "Proveedor actualizado correctamente." : "Proveedor guardado correctamente.", "success");
});

providerCancelButton.addEventListener("click", () => {
  resetProviderForm();
});

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = Number(document.getElementById("expense-amount").value || 0);
  const date = document.getElementById("expense-date").value;

  if (!date) {
    setMessage(expenseMessage, "La fecha del egreso es obligatoria.", "error");
    return;
  }

  if (!amount || amount <= 0) {
    setMessage(expenseMessage, "El monto del egreso debe ser mayor a cero.", "error");
    return;
  }

  const treasury = getTreasuryData();
  const currentUser = getCurrentUser();
  const expense = {
    id: editingExpenseId || generateId(),
    date,
    amount,
    category: document.getElementById("expense-category").value,
    fund: document.getElementById("expense-fund").value,
    costCenter: document.getElementById("expense-cost-center").value.trim(),
    providerId: expenseProviderSelect.value,
    relatedRecordId: expenseRelatedRecordSelect.value,
    detail: document.getElementById("expense-detail").value.trim(),
    updatedAt: new Date().toISOString(),
    createdBy: currentUser ? currentUser.username : "sistema"
  };
  const existingIndex = treasury.expenses.findIndex((item) => item.id === expense.id);

  if (existingIndex >= 0) {
    treasury.expenses[existingIndex] = { ...treasury.expenses[existingIndex], ...expense };
  } else {
    treasury.expenses.unshift({ ...expense, createdAt: new Date().toISOString() });
  }

  saveTreasuryData(treasury);
  refreshAllViews();
  resetExpenseForm(true);
  setMessage(expenseMessage, existingIndex >= 0 ? "Egreso actualizado correctamente." : "Egreso guardado correctamente.", "success");
});

expenseCancelButton.addEventListener("click", () => {
  resetExpenseForm();
});

incidentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("incident-title").value.trim();
  const description = document.getElementById("incident-description").value.trim();

  if (!title || !description) {
    setMessage(incidentMessage, "Debes completar al menos el titulo y el detalle de la incidencia.", "error");
    return;
  }

  const incidentsData = getIncidentsData();
  const currentUser = getCurrentUser();
  const incident = {
    id: editingIncidentId || generateId(),
    recordId: incidentRecordSelect.value,
    area: document.getElementById("incident-area").value.trim(),
    title,
    description,
    priority: document.getElementById("incident-priority").value,
    status: document.getElementById("incident-status").value,
    responsible: document.getElementById("incident-responsible").value.trim(),
    targetDate: document.getElementById("incident-target-date").value,
    updatedAt: new Date().toISOString(),
    createdBy: currentUser ? currentUser.username : "sistema"
  };
  const existingIndex = incidentsData.incidents.findIndex((item) => item.id === incident.id);

  if (existingIndex >= 0) {
    incidentsData.incidents[existingIndex] = { ...incidentsData.incidents[existingIndex], ...incident };
  } else {
    incidentsData.incidents.unshift({ ...incident, createdAt: new Date().toISOString() });
  }

  saveIncidentsData(incidentsData);
  refreshAllViews();
  resetIncidentForm(true);
  setMessage(incidentMessage, existingIndex >= 0 ? "Incidencia actualizada correctamente." : "Incidencia guardada correctamente.", "success");
});

incidentCancelButton.addEventListener("click", () => {
  resetIncidentForm();
});

workOrderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const incidentId = workOrderIncidentSelect.value;

  if (!incidentId) {
    setMessage(workOrderMessage, "Debes seleccionar una incidencia para la orden de trabajo.", "error");
    return;
  }

  const incidentsData = getIncidentsData();
  const currentUser = getCurrentUser();
  const workOrder = {
    id: editingWorkOrderId || generateId(),
    incidentId,
    providerId: workOrderProviderSelect.value,
    responsible: document.getElementById("workorder-responsible").value.trim(),
    cost: Number(document.getElementById("workorder-cost").value || 0),
    targetDate: document.getElementById("workorder-date").value,
    status: document.getElementById("workorder-status").value,
    notes: document.getElementById("workorder-notes").value.trim(),
    updatedAt: new Date().toISOString(),
    createdBy: currentUser ? currentUser.username : "sistema"
  };
  const existingIndex = incidentsData.workOrders.findIndex((item) => item.id === workOrder.id);

  if (existingIndex >= 0) {
    incidentsData.workOrders[existingIndex] = { ...incidentsData.workOrders[existingIndex], ...workOrder };
  } else {
    incidentsData.workOrders.unshift({ ...workOrder, createdAt: new Date().toISOString() });
  }

  saveIncidentsData(incidentsData);
  refreshAllViews();
  resetWorkOrderForm(true);
  setMessage(workOrderMessage, existingIndex >= 0 ? "Orden de trabajo actualizada." : "Orden de trabajo guardada.", "success");
});

workOrderCancelButton.addEventListener("click", () => {
  resetWorkOrderForm();
});

assemblyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("assembly-title").value.trim();
  const date = document.getElementById("assembly-date").value;

  if (!title || !date) {
    setMessage(assemblyMessage, "Debes completar el titulo y la fecha de la asamblea.", "error");
    return;
  }

  const governance = getGovernanceData();
  const currentUser = getCurrentUser();
  const assembly = {
    id: editingAssemblyId || generateId(),
    title,
    date,
    status: document.getElementById("assembly-status").value,
    attendance: Number(document.getElementById("assembly-attendance").value || 0),
    agenda: document.getElementById("assembly-agenda").value.trim(),
    updatedAt: new Date().toISOString(),
    createdBy: currentUser ? currentUser.username : "sistema"
  };
  const existingIndex = governance.assemblies.findIndex((item) => item.id === assembly.id);

  if (existingIndex >= 0) {
    governance.assemblies[existingIndex] = { ...governance.assemblies[existingIndex], ...assembly };
  } else {
    governance.assemblies.unshift({ ...assembly, createdAt: new Date().toISOString() });
  }

  saveGovernanceData(governance);
  refreshAllViews();
  resetAssemblyForm(true);
  setMessage(assemblyMessage, existingIndex >= 0 ? "Asamblea actualizada correctamente." : "Asamblea guardada correctamente.", "success");
});

assemblyCancelButton.addEventListener("click", () => {
  resetAssemblyForm();
});

agreementForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const assemblyId = agreementAssemblySelect.value;
  const title = document.getElementById("agreement-title").value.trim();

  if (!assemblyId || !title) {
    setMessage(agreementMessage, "Debes seleccionar una asamblea y escribir el titulo del acuerdo.", "error");
    return;
  }

  const governance = getGovernanceData();
  const currentUser = getCurrentUser();
  const agreement = {
    id: editingAgreementId || generateId(),
    assemblyId,
    title,
    owner: document.getElementById("agreement-owner").value.trim(),
    targetDate: document.getElementById("agreement-date").value,
    status: document.getElementById("agreement-status").value,
    detail: document.getElementById("agreement-detail").value.trim(),
    updatedAt: new Date().toISOString(),
    createdBy: currentUser ? currentUser.username : "sistema"
  };
  const existingIndex = governance.agreements.findIndex((item) => item.id === agreement.id);

  if (existingIndex >= 0) {
    governance.agreements[existingIndex] = { ...governance.agreements[existingIndex], ...agreement };
  } else {
    governance.agreements.unshift({ ...agreement, createdAt: new Date().toISOString() });
  }

  saveGovernanceData(governance);
  refreshAllViews();
  resetAgreementForm(true);
  setMessage(agreementMessage, existingIndex >= 0 ? "Acuerdo actualizado correctamente." : "Acuerdo guardado correctamente.", "success");
});

agreementCancelButton.addEventListener("click", () => {
  resetAgreementForm();
});

documentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("document-title").value.trim();
  const date = document.getElementById("document-date").value;

  if (!title || !date) {
    setMessage(documentMessage, "Debes completar el titulo y la fecha del documento.", "error");
    return;
  }

  const governance = getGovernanceData();
  const currentUser = getCurrentUser();
  const documentRecord = {
    id: editingDocumentId || generateId(),
    type: document.getElementById("document-type").value,
    title,
    date,
    audience: document.getElementById("document-audience").value.trim(),
    notes: document.getElementById("document-notes").value.trim(),
    updatedAt: new Date().toISOString(),
    createdBy: currentUser ? currentUser.username : "sistema"
  };
  const existingIndex = governance.documents.findIndex((item) => item.id === documentRecord.id);

  if (existingIndex >= 0) {
    governance.documents[existingIndex] = { ...governance.documents[existingIndex], ...documentRecord };
  } else {
    governance.documents.unshift({ ...documentRecord, createdAt: new Date().toISOString() });
  }

  saveGovernanceData(governance);
  refreshAllViews();
  resetDocumentForm(true);
  setMessage(documentMessage, existingIndex >= 0 ? "Documento actualizado correctamente." : "Documento guardado correctamente.", "success");
});

documentCancelButton.addEventListener("click", () => {
  resetDocumentForm();
});

providersList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-provider-action]");
  if (!button) {
    return;
  }

  const treasury = getTreasuryData();
  const provider = treasury.providers.find((item) => item.id === button.dataset.id);
  if (!provider) {
    return;
  }

  if (button.dataset.providerAction === "edit") {
    fillProviderForm(provider);
    setActiveTab("tesoreria");
    return;
  }

  if (treasury.expenses.some((expense) => expense.providerId === provider.id) || getIncidentsData().workOrders.some((workOrder) => workOrder.providerId === provider.id)) {
    setMessage(providerMessage, "No puedes eliminar este proveedor porque ya esta siendo usado en egresos u ordenes.", "error");
    return;
  }

  saveTreasuryData({
    ...treasury,
    providers: treasury.providers.filter((item) => item.id !== provider.id)
  });
  refreshAllViews();
  setMessage(providerMessage, "Proveedor eliminado.", "success");
});

expensesList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-expense-action]");
  if (!button) {
    return;
  }

  const treasury = getTreasuryData();
  const expense = treasury.expenses.find((item) => item.id === button.dataset.id);
  if (!expense) {
    return;
  }

  if (button.dataset.expenseAction === "edit") {
    fillExpenseForm(expense);
    setActiveTab("tesoreria");
    return;
  }

  saveTreasuryData({
    ...treasury,
    expenses: treasury.expenses.filter((item) => item.id !== expense.id)
  });
  refreshAllViews();
  setMessage(expenseMessage, "Egreso eliminado.", "success");
});

incidentsList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-incident-action]");
  if (!button) {
    return;
  }

  const incidentsData = getIncidentsData();
  const incident = incidentsData.incidents.find((item) => item.id === button.dataset.id);
  if (!incident) {
    return;
  }

  if (button.dataset.incidentAction === "edit") {
    fillIncidentForm(incident);
    setActiveTab("incidencias");
    return;
  }

  saveIncidentsData({
    incidents: incidentsData.incidents.filter((item) => item.id !== incident.id),
    workOrders: incidentsData.workOrders.filter((item) => item.incidentId !== incident.id)
  });
  refreshAllViews();
  setMessage(incidentMessage, "Incidencia eliminada junto con sus ordenes relacionadas.", "success");
});

workOrdersList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-workorder-action]");
  if (!button) {
    return;
  }

  const incidentsData = getIncidentsData();
  const workOrder = incidentsData.workOrders.find((item) => item.id === button.dataset.id);
  if (!workOrder) {
    return;
  }

  if (button.dataset.workorderAction === "edit") {
    fillWorkOrderForm(workOrder);
    setActiveTab("incidencias");
    return;
  }

  saveIncidentsData({
    ...incidentsData,
    workOrders: incidentsData.workOrders.filter((item) => item.id !== workOrder.id)
  });
  refreshAllViews();
  setMessage(workOrderMessage, "Orden de trabajo eliminada.", "success");
});

assembliesList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-assembly-action]");
  if (!button) {
    return;
  }

  const governance = getGovernanceData();
  const assembly = governance.assemblies.find((item) => item.id === button.dataset.id);
  if (!assembly) {
    return;
  }

  if (button.dataset.assemblyAction === "edit") {
    fillAssemblyForm(assembly);
    setActiveTab("asambleas");
    return;
  }

  saveGovernanceData({
    assemblies: governance.assemblies.filter((item) => item.id !== assembly.id),
    agreements: governance.agreements.filter((item) => item.assemblyId !== assembly.id),
    documents: governance.documents
  });
  refreshAllViews();
  setMessage(assemblyMessage, "Asamblea eliminada junto con sus acuerdos relacionados.", "success");
});

agreementsList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-agreement-action]");
  if (!button) {
    return;
  }

  const governance = getGovernanceData();
  const agreement = governance.agreements.find((item) => item.id === button.dataset.id);
  if (!agreement) {
    return;
  }

  if (button.dataset.agreementAction === "edit") {
    fillAgreementForm(agreement);
    setActiveTab("asambleas");
    return;
  }

  saveGovernanceData({
    ...governance,
    agreements: governance.agreements.filter((item) => item.id !== agreement.id)
  });
  refreshAllViews();
  setMessage(agreementMessage, "Acuerdo eliminado.", "success");
});

documentsList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-document-action]");
  if (!button) {
    return;
  }

  const governance = getGovernanceData();
  const documentRecord = governance.documents.find((item) => item.id === button.dataset.id);
  if (!documentRecord) {
    return;
  }

  if (button.dataset.documentAction === "edit") {
    fillDocumentForm(documentRecord);
    setActiveTab("asambleas");
    return;
  }

  saveGovernanceData({
    ...governance,
    documents: governance.documents.filter((item) => item.id !== documentRecord.id)
  });
  refreshAllViews();
  setMessage(documentMessage, "Documento eliminado.", "success");
});

exportRecordsButton.addEventListener("click", () => {
  const rows = getRecords().map((record) => ({
    manzana: record.ubicacion.manzana,
    lote: record.ubicacion.lote,
    nombres: record.titular.nombres,
    apellidos: record.titular.apellidos,
    documento: `${record.titular.tipoDocumento} ${record.titular.numeroDocumento}`,
    celular: record.contacto.celularPrincipal,
    estado: record.titular.estadoSocio
  }));
  downloadExcelFile("socios.xls", rows, "Socios");
  setMessage(reportsMessage, "Se exporto el listado de socios en Excel.", "success");
});

exportFinanceButton.addEventListener("click", () => {
  const rows = getFinanceData().activityLots.map((activityLot) => {
    const activity = getActivityById(activityLot.activityId);
    const computed = getActivityLotComputedState(activityLot);
    return {
      actividad: activity?.title || "",
      fecha: activity?.date || "",
      manzana: activityLot.recordSnapshot?.manzana || "",
      lote: activityLot.recordSnapshot?.lote || "",
      titular: activityLot.recordSnapshot?.titular || "",
      aporte_sugerido: Number(activityLot.suggestedAmount || 0).toFixed(2),
      dinero_recibido: computed.moneyAmount.toFixed(2),
      dinero_devuelto: computed.returnedAmount.toFixed(2),
      ayuda_fisica: computed.hasPhysicalSupport ? "Si" : "No",
      compensacion_aprobada: computed.approvedCompensation.toFixed(2),
      sin_respuesta: computed.noResponseMarked ? "Si" : "No",
      saldo_pendiente: computed.remainingAmount.toFixed(2),
      estado: humanizeValue(computed.status)
    };
  });
  downloadExcelFile("finanzas.xls", rows, "Finanzas");
  setMessage(reportsMessage, "Se exporto el resumen financiero en Excel.", "success");
});

exportExpensesButton.addEventListener("click", () => {
  const rows = getTreasuryData().expenses.map((expense) => ({
    fecha: expense.date,
    categoria: humanizeValue(expense.category),
    detalle: expense.detail || "",
    fondo: humanizeValue(expense.fund),
    monto: Number(expense.amount || 0).toFixed(2),
    centro_costo: expense.costCenter || ""
  }));
  downloadExcelFile("egresos.xls", rows, "Egresos");
  setMessage(reportsMessage, "Se exporto el resumen de egresos en Excel.", "success");
});

[...form.querySelectorAll("input, select, textarea")].forEach((field) => {
  field.addEventListener("input", renderSummary);
  field.addEventListener("change", renderSummary);
});

movementTypeSelect.addEventListener("change", () => {
  syncMovementFormWithSelectedLot();
});

activityTargetInput.addEventListener("input", () => {
  updateSuggestedPerLotField();
});

portalActivitySearchInput.addEventListener("input", () => {
  renderPortalActivities();
});

portalActivityStatusFilter.addEventListener("change", () => {
  renderPortalActivities();
});

portalManzanaSelect.addEventListener("change", () => {
  populatePortalLotes("");
});

portalLookupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  portalLookupState = {
    documentNumber: portalDocumentInput.value.trim(),
    manzana: portalManzanaSelect.value,
    lote: portalLoteSelect.value
  };

  if (!portalLookupState.documentNumber) {
    setMessage(portalLookupMessage, "Escribe al menos el numero de documento para consultar.", "error");
    renderPortalAccountResult();
    return;
  }

  const records = getPortalLookupRecords();
  if (records.length === 0) {
    setMessage(portalLookupMessage, "No se encontraron lotes con esos datos.", "error");
    renderPortalAccountResult();
    return;
  }

  setMessage(
    portalLookupMessage,
    records.length === 1
      ? "Consulta encontrada. Mostrando el lote asociado."
      : `Consulta encontrada. Mostrando ${records.length} lotes asociados al documento.`,
    "success"
  );
  renderPortalAccountResult();
});

portalClearButton.addEventListener("click", () => {
  resetPortalLookup();
});

movementLotSelect.addEventListener("change", () => {
  selectedFinanceLotId = movementLotSelect.value || null;
  syncMovementFormWithSelectedLot();
});

activityLotFilterSelect.addEventListener("input", () => {
  activeActivityLotFilter = activityLotFilterSelect.value || "todos";
  renderCharges();
});

activityLotFilterSelect.addEventListener("change", () => {
  activeActivityLotFilter = activityLotFilterSelect.value || "todos";
  renderCharges();
});

async function bootstrapApp() {
  await remoteStore.init({ defaultSuperAdmin });
  ensureSeedAccounts();
  populateManzanas();
  populateLotes("");
  populatePortalManzanas();
  populatePortalLotes("");
  updateLotMeta();
  renderSummary();
  renderRecords();
  renderAppState();
  resetPortalLookup(true);
  resetChargeForm();
  resetMovementForm();
  resetProviderForm();
  resetExpenseForm();
  resetIncidentForm();
  resetWorkOrderForm();
  resetAssemblyForm();
  resetAgreementForm();
  resetDocumentForm();
}

bootstrapApp().catch((error) => {
  console.error("No se pudo iniciar la aplicacion.", error);
  setMessage(loginMessage, "No se pudo iniciar la aplicacion. Revisa la configuracion de la base de datos.", "error");
});
