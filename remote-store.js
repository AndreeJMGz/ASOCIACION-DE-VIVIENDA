(() => {
  const LOCAL_KEYS = {
    records: "asoviv.demo.records",
    accounts: "asoviv.admin.accounts",
    session: "asoviv.current.session",
    finance: "asoviv.finance.data",
    treasury: "asoviv.treasury.data",
    incidents: "asoviv.incidents.data",
    governance: "asoviv.governance.data"
  };

  function cloneJson(value, fallback) {
    try {
      return JSON.parse(JSON.stringify(value ?? fallback));
    } catch (error) {
      return fallback;
    }
  }

  function readLocalJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : cloneJson(fallback, fallback);
    } catch (error) {
      console.error(`No se pudo leer ${key}`, error);
      return cloneJson(fallback, fallback);
    }
  }

  function writeLocalJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function createDefaultBusinessState() {
    return {
      records: [],
      finance: {
        charges: [],
        payments: [],
        activities: [],
        activityLots: [],
        activityMovements: []
      },
      treasury: {
        providers: [],
        expenses: []
      },
      incidents: {
        incidents: [],
        workOrders: []
      },
      governance: {
        assemblies: [],
        agreements: [],
        documents: []
      }
    };
  }

  function createDefaultPortalState() {
    const state = createDefaultBusinessState();
    return {
      records: [],
      finance: state.finance,
      treasury: { expenses: [] },
      governance: state.governance
    };
  }

  function normalizeFinanceData(raw) {
    return {
      charges: Array.isArray(raw?.charges) ? cloneJson(raw.charges, []) : [],
      payments: Array.isArray(raw?.payments) ? cloneJson(raw.payments, []) : [],
      activities: Array.isArray(raw?.activities) ? cloneJson(raw.activities, []) : [],
      activityLots: Array.isArray(raw?.activityLots) ? cloneJson(raw.activityLots, []) : [],
      activityMovements: Array.isArray(raw?.activityMovements) ? cloneJson(raw.activityMovements, []) : []
    };
  }

  function normalizeTreasuryData(raw) {
    return {
      providers: Array.isArray(raw?.providers) ? cloneJson(raw.providers, []) : [],
      expenses: Array.isArray(raw?.expenses) ? cloneJson(raw.expenses, []) : []
    };
  }

  function normalizeIncidentsData(raw) {
    return {
      incidents: Array.isArray(raw?.incidents) ? cloneJson(raw.incidents, []) : [],
      workOrders: Array.isArray(raw?.workOrders) ? cloneJson(raw.workOrders, []) : []
    };
  }

  function normalizeGovernanceData(raw) {
    return {
      assemblies: Array.isArray(raw?.assemblies) ? cloneJson(raw.assemblies, []) : [],
      agreements: Array.isArray(raw?.agreements) ? cloneJson(raw.agreements, []) : [],
      documents: Array.isArray(raw?.documents) ? cloneJson(raw.documents, []) : []
    };
  }

  function normalizeBusinessState(raw) {
    return {
      records: Array.isArray(raw?.records) ? cloneJson(raw.records, []) : [],
      finance: normalizeFinanceData(raw?.finance),
      treasury: normalizeTreasuryData(raw?.treasury),
      incidents: normalizeIncidentsData(raw?.incidents),
      governance: normalizeGovernanceData(raw?.governance)
    };
  }

  function normalizePortalState(raw) {
    return {
      records: Array.isArray(raw?.records) ? cloneJson(raw.records, []) : [],
      finance: normalizeFinanceData(raw?.finance),
      treasury: {
        expenses: Array.isArray(raw?.treasury?.expenses) ? cloneJson(raw.treasury.expenses, []) : []
      },
      governance: normalizeGovernanceData(raw?.governance)
    };
  }

  function normalizeAccount(account) {
    return {
      id: account?.id || "",
      username: String(account?.username || "").trim(),
      password: account?.password || "",
      nombreCompleto: String(account?.nombreCompleto || "").trim(),
      correo: String(account?.correo || "").trim(),
      celular: String(account?.celular || "").trim(),
      cargoJunta: account?.cargoJunta || "directivo",
      role: account?.role || (account?.cargoJunta === "superadmin" ? "superadmin" : "directivo"),
      active: account?.active !== false,
      protected: Boolean(account?.protected),
      createdAt: account?.createdAt || new Date().toISOString(),
      updatedAt: account?.updatedAt || new Date().toISOString()
    };
  }

  function normalizeAccounts(raw) {
    return Array.isArray(raw)
      ? raw.map((item) => normalizeAccount(item)).filter((item) => item.id && item.username)
      : [];
  }

  function buildPortalStateFromBusinessState(state) {
    return {
      records: (Array.isArray(state?.records) ? state.records : []).map((record) => ({
        id: record.id,
        titular: {
          nombres: record?.titular?.nombres || "",
          apellidos: record?.titular?.apellidos || "",
          tipoDocumento: record?.titular?.tipoDocumento || "DNI",
          numeroDocumento: record?.titular?.numeroDocumento || ""
        },
        ubicacion: {
          manzana: record?.ubicacion?.manzana || "",
          lote: record?.ubicacion?.lote || ""
        }
      })),
      finance: normalizeFinanceData(state?.finance),
      treasury: {
        expenses: Array.isArray(state?.treasury?.expenses) ? cloneJson(state.treasury.expenses, []) : []
      },
      governance: normalizeGovernanceData(state?.governance)
    };
  }

  function readLocalBusinessState() {
    return normalizeBusinessState({
      records: readLocalJson(LOCAL_KEYS.records, []),
      finance: readLocalJson(LOCAL_KEYS.finance, createDefaultBusinessState().finance),
      treasury: readLocalJson(LOCAL_KEYS.treasury, createDefaultBusinessState().treasury),
      incidents: readLocalJson(LOCAL_KEYS.incidents, createDefaultBusinessState().incidents),
      governance: readLocalJson(LOCAL_KEYS.governance, createDefaultBusinessState().governance)
    });
  }

  function writeLocalBusinessState(state) {
    writeLocalJson(LOCAL_KEYS.records, state.records);
    writeLocalJson(LOCAL_KEYS.finance, state.finance);
    writeLocalJson(LOCAL_KEYS.treasury, state.treasury);
    writeLocalJson(LOCAL_KEYS.incidents, state.incidents);
    writeLocalJson(LOCAL_KEYS.governance, state.governance);
  }

  function persistSession(session) {
    if (session) {
      sessionStorage.setItem(LOCAL_KEYS.session, JSON.stringify(session));
    } else {
      sessionStorage.removeItem(LOCAL_KEYS.session);
    }
  }

  function readSession() {
    try {
      const raw = sessionStorage.getItem(LOCAL_KEYS.session);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function buildAuthHeaders(token) {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  let businessState = readLocalBusinessState();
  let portalState = buildPortalStateFromBusinessState(businessState);
  let accountsCache = normalizeAccounts(readLocalJson(LOCAL_KEYS.accounts, []));
  let currentSession = readSession();
  let serverEnabled = false;
  let syncQueue = Promise.resolve();
  let defaultSuperAdminCache = null;
  let initPromise = null;

  async function apiRequest(pathname, options = {}) {
    const response = await fetch(pathname, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...buildAuthHeaders(options.token),
        ...(options.headers || {})
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });

    const text = await response.text();
    const payload = text ? JSON.parse(text) : null;
    if (!response.ok) {
      throw new Error(payload?.error || "No se pudo completar la operacion.");
    }

    return payload;
  }

  function queueRemoteTask(task) {
    syncQueue = syncQueue
      .catch(() => undefined)
      .then(task);
    return syncQueue;
  }

  function ensureLocalSuperAdmin(defaultSuperAdmin) {
    if (!defaultSuperAdmin) {
      return;
    }

    defaultSuperAdminCache = normalizeAccount(defaultSuperAdmin);
    const exists = accountsCache.some((account) => account.id === defaultSuperAdminCache.id);
    if (!exists) {
      accountsCache = [defaultSuperAdminCache, ...accountsCache];
      writeLocalJson(LOCAL_KEYS.accounts, accountsCache);
    }
  }

  function setLocalSession(accountId) {
    currentSession = {
      mode: "local",
      accountId
    };
    persistSession(currentSession);
  }

  function getCurrentUser() {
    if (!currentSession) {
      return null;
    }

    if (currentSession.mode === "server") {
      return currentSession.user ? cloneJson(currentSession.user, null) : null;
    }

    return cloneJson(
      accountsCache.find((account) => account.id === currentSession.accountId && account.active) || null,
      null
    );
  }

  function syncCurrentUserFromAccounts() {
    if (!currentSession?.user?.id) {
      return;
    }

    const matching = accountsCache.find((account) => account.id === currentSession.user.id);
    if (!matching) {
      return;
    }

    currentSession.user = {
      ...currentSession.user,
      ...cloneJson(matching, {})
    };
    persistSession(currentSession);
  }

  async function loadServerState() {
    if (!currentSession?.token) {
      return;
    }
    businessState = normalizeBusinessState(await apiRequest("/api/state", { token: currentSession.token }));
    writeLocalBusinessState(businessState);
    portalState = buildPortalStateFromBusinessState(businessState);
  }

  async function loadServerUsers() {
    if (!currentSession?.token || currentSession.user?.role !== "superadmin") {
      return;
    }

    accountsCache = normalizeAccounts(await apiRequest("/api/users", { token: currentSession.token }));
    writeLocalJson(LOCAL_KEYS.accounts, accountsCache);
    syncCurrentUserFromAccounts();
  }

  async function init(options = {}) {
    if (initPromise) {
      return initPromise;
    }

    initPromise = (async () => {
      ensureLocalSuperAdmin(options.defaultSuperAdmin);

      try {
        await apiRequest("/api/health");
        serverEnabled = true;
      } catch (error) {
        serverEnabled = false;
        if (currentSession?.mode === "server") {
          currentSession = null;
          persistSession(null);
        }
        return;
      }

      try {
        portalState = normalizePortalState(await apiRequest("/api/public-state"));
      } catch (error) {
        console.warn("No se pudo cargar el estado publico del servidor.", error);
      }

      const storedSession = readSession();
      if (!storedSession?.token) {
        currentSession = null;
        persistSession(null);
        return;
      }

      try {
        const me = await apiRequest("/api/me", { token: storedSession.token });
        currentSession = {
          mode: "server",
          token: storedSession.token,
          user: normalizeAccount(me.user)
        };
        persistSession(currentSession);
        await loadServerState();
        await loadServerUsers();
      } catch (error) {
        console.warn("La sesion del servidor ya no es valida.", error);
        currentSession = null;
        persistSession(null);
      }
    })();

    return initPromise;
  }

  async function login(username, password) {
    if (!serverEnabled) {
      const account = accountsCache.find((item) => (
        item.username.toLowerCase() === username.toLowerCase()
        && item.password === password
        && item.active
      ));

      if (!account) {
        return null;
      }

      setLocalSession(account.id);
      return cloneJson(account, null);
    }

    const payload = await apiRequest("/api/login", {
      method: "POST",
      body: { username, password }
    });

    currentSession = {
      mode: "server",
      token: payload.token,
      user: normalizeAccount(payload.user)
    };
    persistSession(currentSession);
    await loadServerState();
    await loadServerUsers();
    return cloneJson(currentSession.user, null);
  }

  async function logout() {
    if (serverEnabled && currentSession?.token) {
      try {
        await apiRequest("/api/logout", {
          method: "POST",
          token: currentSession.token
        });
      } catch (error) {
        console.warn("No se pudo cerrar la sesion del servidor.", error);
      }
    }

    currentSession = null;
    persistSession(null);
  }

  function getAccounts() {
    return cloneJson(accountsCache, []);
  }

  async function saveAccounts(accounts) {
    accountsCache = normalizeAccounts(accounts);
    writeLocalJson(LOCAL_KEYS.accounts, accountsCache);
    syncCurrentUserFromAccounts();

    if (!serverEnabled || !currentSession?.token) {
      return getAccounts();
    }

    const nextAccounts = normalizeAccounts(await apiRequest("/api/users", {
      method: "PUT",
      token: currentSession.token,
      body: { users: accountsCache }
    }));
    accountsCache = nextAccounts;
    writeLocalJson(LOCAL_KEYS.accounts, accountsCache);
    syncCurrentUserFromAccounts();
    return getAccounts();
  }

  function updateBusinessState(nextState) {
    businessState = normalizeBusinessState(nextState);
    writeLocalBusinessState(businessState);
    portalState = buildPortalStateFromBusinessState(businessState);
  }

  function syncStateToServer() {
    if (!serverEnabled || !currentSession?.token) {
      return Promise.resolve(businessState);
    }

    return queueRemoteTask(async () => {
      const synced = await apiRequest("/api/state", {
        method: "PUT",
        token: currentSession.token,
        body: businessState
      });
      updateBusinessState(synced);
      return businessState;
    });
  }

  function getRecords() {
    return cloneJson(businessState.records, []);
  }

  function saveRecords(records) {
    updateBusinessState({ ...businessState, records: Array.isArray(records) ? records : [] });
    return syncStateToServer();
  }

  function getFinanceData() {
    return normalizeFinanceData(businessState.finance);
  }

  function saveFinanceData(financeData) {
    updateBusinessState({ ...businessState, finance: normalizeFinanceData(financeData) });
    return syncStateToServer();
  }

  function getTreasuryData() {
    return normalizeTreasuryData(businessState.treasury);
  }

  function saveTreasuryData(treasuryData) {
    updateBusinessState({ ...businessState, treasury: normalizeTreasuryData(treasuryData) });
    return syncStateToServer();
  }

  function getIncidentsData() {
    return normalizeIncidentsData(businessState.incidents);
  }

  function saveIncidentsData(incidentsData) {
    updateBusinessState({ ...businessState, incidents: normalizeIncidentsData(incidentsData) });
    return syncStateToServer();
  }

  function getGovernanceData() {
    return normalizeGovernanceData(businessState.governance);
  }

  function saveGovernanceData(governanceData) {
    updateBusinessState({ ...businessState, governance: normalizeGovernanceData(governanceData) });
    return syncStateToServer();
  }

  function getPortalRecords() {
    return cloneJson(portalState.records, []);
  }

  function getPortalFinanceData() {
    return normalizeFinanceData(portalState.finance);
  }

  function getPortalTreasuryData() {
    return {
      expenses: Array.isArray(portalState?.treasury?.expenses) ? cloneJson(portalState.treasury.expenses, []) : []
    };
  }

  function getPortalGovernanceData() {
    return normalizeGovernanceData(portalState.governance);
  }

  window.SantaLuzmilaStore = {
    init,
    isRemoteEnabled: () => serverEnabled,
    ensureLocalSuperAdmin,
    setLocalSession,
    login,
    logout,
    getCurrentUser,
    getAccounts,
    saveAccounts,
    getRecords,
    saveRecords,
    getFinanceData,
    saveFinanceData,
    getTreasuryData,
    saveTreasuryData,
    getIncidentsData,
    saveIncidentsData,
    getGovernanceData,
    saveGovernanceData,
    getPortalRecords,
    getPortalFinanceData,
    getPortalTreasuryData,
    getPortalGovernanceData
  };
})();
