const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { URL } = require("node:url");
const { DatabaseSync } = require("node:sqlite");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 8010);
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, "data");
const DB_PATH = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(DATA_DIR, "santa-luzmila.db");
const SESSION_DAYS = 7;

const DEFAULT_SUPERADMIN = {
  id: "seed-superadmin",
  username: "AndreeJMGz",
  password: "5777374221710",
  nombreCompleto: "AndreeJMGz",
  correo: "",
  celular: "",
  cargoJunta: "superadmin",
  role: "superadmin",
  active: true,
  protected: true
};

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function createDefaultState() {
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

function sanitizeState(raw) {
  const fallback = createDefaultState();
  return {
    records: Array.isArray(raw?.records) ? raw.records : fallback.records,
    finance: {
      charges: Array.isArray(raw?.finance?.charges) ? raw.finance.charges : fallback.finance.charges,
      payments: Array.isArray(raw?.finance?.payments) ? raw.finance.payments : fallback.finance.payments,
      activities: Array.isArray(raw?.finance?.activities) ? raw.finance.activities : fallback.finance.activities,
      activityLots: Array.isArray(raw?.finance?.activityLots) ? raw.finance.activityLots : fallback.finance.activityLots,
      activityMovements: Array.isArray(raw?.finance?.activityMovements) ? raw.finance.activityMovements : fallback.finance.activityMovements
    },
    treasury: {
      providers: Array.isArray(raw?.treasury?.providers) ? raw.treasury.providers : fallback.treasury.providers,
      expenses: Array.isArray(raw?.treasury?.expenses) ? raw.treasury.expenses : fallback.treasury.expenses
    },
    incidents: {
      incidents: Array.isArray(raw?.incidents?.incidents) ? raw.incidents.incidents : fallback.incidents.incidents,
      workOrders: Array.isArray(raw?.incidents?.workOrders) ? raw.incidents.workOrders : fallback.incidents.workOrders
    },
    governance: {
      assemblies: Array.isArray(raw?.governance?.assemblies) ? raw.governance.assemblies : fallback.governance.assemblies,
      agreements: Array.isArray(raw?.governance?.agreements) ? raw.governance.agreements : fallback.governance.agreements,
      documents: Array.isArray(raw?.governance?.documents) ? raw.governance.documents : fallback.governance.documents
    }
  };
}

function buildPublicState(state) {
  return {
    records: (Array.isArray(state.records) ? state.records : []).map((record) => ({
      id: record?.id || "",
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
    finance: state.finance,
    treasury: {
      expenses: Array.isArray(state?.treasury?.expenses) ? state.treasury.expenses : []
    },
    governance: state.governance
  };
}

function toIsoNow() {
  return new Date().toISOString();
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash || typeof storedHash !== "string") {
    return false;
  }

  const [algorithm, salt, hash] = storedHash.split(":");
  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  const candidate = crypto.scryptSync(password, salt, 64);
  const reference = Buffer.from(hash, "hex");
  return reference.length === candidate.length && crypto.timingSafeEqual(reference, candidate);
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function createSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

function mapUserRow(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    username: row.username,
    nombreCompleto: row.nombre_completo,
    correo: row.correo || "",
    celular: row.celular || "",
    cargoJunta: row.cargo_junta,
    role: row.role,
    active: Boolean(row.active),
    protected: Boolean(row.protected),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Length": Buffer.byteLength(body)
  });
  response.end(body);
}

function sendText(response, statusCode, message) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Content-Length": Buffer.byteLength(message)
  });
  response.end(message);
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let raw = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 10 * 1024 * 1024) {
        reject(new Error("El cuerpo de la solicitud es demasiado grande."));
      }
    });
    request.on("end", () => resolve(raw));
    request.on("error", reject);
  });
}

async function readJsonBody(request) {
  const raw = await readRequestBody(request);
  if (!raw) {
    return {};
  }
  return JSON.parse(raw);
}

function resolveStaticPath(requestPath) {
  const normalized = requestPath === "/" ? "/index.html" : requestPath;
  const safeRelative = path.normalize(normalized).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT_DIR, safeRelative);
  if (!filePath.startsWith(ROOT_DIR)) {
    return null;
  }
  return filePath;
}

function serveStaticFile(requestPath, response) {
  const filePath = resolveStaticPath(requestPath);
  if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    sendText(response, 404, "No se encontro el archivo.");
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extension] || "application/octet-stream";
  const stream = fs.createReadStream(filePath);
  response.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": extension === ".html" ? "no-store" : "public, max-age=300"
  });
  stream.pipe(response);
}

ensureDataDirectory();
const db = new DatabaseSync(DB_PATH);
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS app_users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    nombre_completo TEXT NOT NULL,
    correo TEXT,
    celular TEXT,
    cargo_junta TEXT NOT NULL,
    role TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 1,
    protected INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS app_sessions (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    revoked_at TEXT
  );

  CREATE TABLE IF NOT EXISTS app_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    payload TEXT NOT NULL,
    updated_by TEXT,
    updated_at TEXT NOT NULL
  );
`);

const statements = {
  getUserByUsername: db.prepare(`
    SELECT *
    FROM app_users
    WHERE lower(username) = lower(?)
    LIMIT 1
  `),
  getAllUsers: db.prepare(`
    SELECT *
    FROM app_users
    ORDER BY protected DESC, lower(username)
  `),
  getUserById: db.prepare(`
    SELECT *
    FROM app_users
    WHERE id = ?
    LIMIT 1
  `),
  insertUser: db.prepare(`
    INSERT INTO app_users (
      id, username, password_hash, nombre_completo, correo, celular, cargo_junta, role, active, protected, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `),
  updateUser: db.prepare(`
    UPDATE app_users
    SET username = ?, password_hash = ?, nombre_completo = ?, correo = ?, celular = ?, cargo_junta = ?, role = ?, active = ?, protected = ?, updated_at = ?
    WHERE id = ?
  `),
  deleteUser: db.prepare(`
    DELETE FROM app_users
    WHERE id = ?
  `),
  insertSession: db.prepare(`
    INSERT INTO app_sessions (token_hash, user_id, created_at, expires_at)
    VALUES (?, ?, ?, ?)
  `),
  revokeSession: db.prepare(`
    UPDATE app_sessions
    SET revoked_at = ?
    WHERE token_hash = ? AND revoked_at IS NULL
  `),
  getSessionUser: db.prepare(`
    SELECT u.*
    FROM app_sessions s
    JOIN app_users u ON u.id = s.user_id
    WHERE s.token_hash = ?
      AND s.revoked_at IS NULL
      AND s.expires_at > ?
      AND u.active = 1
    LIMIT 1
  `),
  getStateRow: db.prepare(`
    SELECT payload
    FROM app_state
    WHERE id = 1
  `),
  upsertState: db.prepare(`
    INSERT INTO app_state (id, payload, updated_by, updated_at)
    VALUES (1, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      payload = excluded.payload,
      updated_by = excluded.updated_by,
      updated_at = excluded.updated_at
  `)
};

function seedDatabase() {
  const existingUser = statements.getUserById.get(DEFAULT_SUPERADMIN.id);
  if (!existingUser) {
    const now = toIsoNow();
    statements.insertUser.run(
      DEFAULT_SUPERADMIN.id,
      DEFAULT_SUPERADMIN.username,
      hashPassword(DEFAULT_SUPERADMIN.password),
      DEFAULT_SUPERADMIN.nombreCompleto,
      DEFAULT_SUPERADMIN.correo,
      DEFAULT_SUPERADMIN.celular,
      DEFAULT_SUPERADMIN.cargoJunta,
      DEFAULT_SUPERADMIN.role,
      DEFAULT_SUPERADMIN.active ? 1 : 0,
      DEFAULT_SUPERADMIN.protected ? 1 : 0,
      now,
      now
    );
  }

  const stateRow = statements.getStateRow.get();
  if (!stateRow) {
    statements.upsertState.run(JSON.stringify(createDefaultState()), DEFAULT_SUPERADMIN.id, toIsoNow());
  }
}

seedDatabase();

function getState() {
  const row = statements.getStateRow.get();
  if (!row?.payload) {
    return createDefaultState();
  }

  try {
    return sanitizeState(JSON.parse(row.payload));
  } catch (error) {
    console.error("No se pudo leer el estado guardado. Se usara el estado vacio.", error);
    return createDefaultState();
  }
}

function saveState(nextState, userId) {
  const sanitized = sanitizeState(nextState);
  statements.upsertState.run(JSON.stringify(sanitized), userId || null, toIsoNow());
  return sanitized;
}

function getAuthenticatedUser(request) {
  const authorization = request.headers.authorization || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  if (!token) {
    return null;
  }

  const row = statements.getSessionUser.get(hashToken(token), toIsoNow());
  return mapUserRow(row);
}

function assertSuperadmin(user) {
  if (!user || user.role !== "superadmin") {
    const error = new Error("Solo el super admin puede realizar esta accion.");
    error.statusCode = 403;
    throw error;
  }
}

function normalizeIncomingUser(input, existing = null) {
  return {
    id: String(input?.id || existing?.id || crypto.randomUUID()),
    username: String(input?.username || existing?.username || "").trim(),
    nombreCompleto: String(input?.nombreCompleto || existing?.nombreCompleto || "").trim(),
    correo: String(input?.correo || existing?.correo || "").trim(),
    celular: String(input?.celular || existing?.celular || "").trim(),
    cargoJunta: String(input?.cargoJunta || existing?.cargo_junta || "directivo").trim() || "directivo",
    role: String(input?.role || existing?.role || "directivo").trim() === "superadmin" ? "superadmin" : "directivo",
    active: input?.active === undefined ? Boolean(existing ? existing.active : true) : Boolean(input.active),
    protected: existing ? Boolean(existing.protected) : Boolean(input?.protected),
    password: String(input?.password || "").trim()
  };
}

function ensureUniqueUsers(users) {
  const usernames = new Set();
  const emails = new Set();

  users.forEach((user) => {
    if (!user.username) {
      throw new Error("Todas las cuentas deben tener usuario.");
    }

    const usernameKey = user.username.toLowerCase();
    if (usernames.has(usernameKey)) {
      throw new Error(`El usuario ${user.username} esta repetido.`);
    }
    usernames.add(usernameKey);

    const emailKey = user.correo.toLowerCase();
    if (emailKey) {
      if (emails.has(emailKey)) {
        throw new Error(`El correo ${user.correo} esta repetido.`);
      }
      emails.add(emailKey);
    }
  });
}

function replaceUsersTransaction(incomingUsers) {
  db.exec("BEGIN");
  try {
  const existingRows = statements.getAllUsers.all();
  const existingMap = new Map(existingRows.map((row) => [row.id, row]));
  const normalizedUsers = [];

  incomingUsers.forEach((input) => {
    const existing = input?.id ? existingMap.get(String(input.id)) : null;
    if (existing?.protected) {
      normalizedUsers.push(normalizeIncomingUser({}, existing));
      return;
    }

    const normalized = normalizeIncomingUser(input, existing);
    if (!existing && !normalized.password) {
      throw new Error(`La contrasena es obligatoria al crear la cuenta ${normalized.username || ""}.`);
    }
    normalizedUsers.push(normalized);
  });

  existingRows.forEach((row) => {
    if (row.protected && !normalizedUsers.some((user) => user.id === row.id)) {
      normalizedUsers.push(normalizeIncomingUser({}, row));
    }
  });

  ensureUniqueUsers(normalizedUsers);

  const now = toIsoNow();
  const nextIds = new Set(normalizedUsers.map((user) => user.id));

  existingRows.forEach((row) => {
    if (!nextIds.has(row.id) && !row.protected) {
      statements.deleteUser.run(row.id);
    }
  });

  normalizedUsers.forEach((user) => {
    const existing = existingMap.get(user.id);
    if (existing) {
      const passwordHash = user.password ? hashPassword(user.password) : existing.password_hash;
      statements.updateUser.run(
        user.username,
        passwordHash,
        user.nombreCompleto,
        user.correo || null,
        user.celular || null,
        user.cargoJunta,
        user.role,
        user.active ? 1 : 0,
        user.protected ? 1 : 0,
        now,
        user.id
      );
      return;
    }

    statements.insertUser.run(
      user.id,
      user.username,
      hashPassword(user.password),
      user.nombreCompleto,
      user.correo || null,
      user.celular || null,
      user.cargoJunta,
      user.role,
      user.active ? 1 : 0,
      user.protected ? 1 : 0,
      now,
      now
    );
  });
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

async function handleApiRequest(request, response, pathname) {
  if (pathname === "/api/health" && request.method === "GET") {
    sendJson(response, 200, { ok: true, mode: "sqlite", database: "data/santa-luzmila.db" });
    return true;
  }

  if (pathname === "/api/public-state" && request.method === "GET") {
    sendJson(response, 200, buildPublicState(getState()));
    return true;
  }

  if (pathname === "/api/login" && request.method === "POST") {
    const body = await readJsonBody(request);
    const username = String(body?.username || "").trim();
    const password = String(body?.password || "");
    const row = statements.getUserByUsername.get(username);

    if (!row || !row.active || !verifyPassword(password, row.password_hash)) {
      sendJson(response, 401, { error: "Usuario o contrasena incorrectos." });
      return true;
    }

    const token = createSessionToken();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();
    statements.insertSession.run(hashToken(token), row.id, now.toISOString(), expiresAt);
    sendJson(response, 200, { token, user: mapUserRow(row) });
    return true;
  }

  if (pathname === "/api/logout" && request.method === "POST") {
    const user = getAuthenticatedUser(request);
    if (!user) {
      sendJson(response, 200, { ok: true });
      return true;
    }

    const authorization = request.headers.authorization || "";
    const token = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
    if (token) {
      statements.revokeSession.run(toIsoNow(), hashToken(token));
    }
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (pathname === "/api/me" && request.method === "GET") {
    const user = getAuthenticatedUser(request);
    if (!user) {
      sendJson(response, 401, { error: "Sesion invalida." });
      return true;
    }
    sendJson(response, 200, { user });
    return true;
  }

  if (pathname === "/api/state" && request.method === "GET") {
    const user = getAuthenticatedUser(request);
    if (!user) {
      sendJson(response, 401, { error: "Sesion invalida." });
      return true;
    }

    sendJson(response, 200, getState());
    return true;
  }

  if (pathname === "/api/state" && request.method === "PUT") {
    const user = getAuthenticatedUser(request);
    if (!user) {
      sendJson(response, 401, { error: "Sesion invalida." });
      return true;
    }

    const body = await readJsonBody(request);
    const nextState = saveState(body, user.id);
    sendJson(response, 200, nextState);
    return true;
  }

  if (pathname === "/api/users" && request.method === "GET") {
    const user = getAuthenticatedUser(request);
    assertSuperadmin(user);
    sendJson(response, 200, statements.getAllUsers.all().map(mapUserRow));
    return true;
  }

  if (pathname === "/api/users" && request.method === "PUT") {
    const user = getAuthenticatedUser(request);
    assertSuperadmin(user);
    const body = await readJsonBody(request);
    if (!Array.isArray(body?.users)) {
      sendJson(response, 400, { error: "La lista de usuarios es invalida." });
      return true;
    }

    replaceUsersTransaction(body.users);
    sendJson(response, 200, statements.getAllUsers.all().map(mapUserRow));
    return true;
  }

  return false;
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || `${HOST}:${PORT}`}`);
    const pathname = decodeURIComponent(url.pathname);

    const handled = await handleApiRequest(request, response, pathname);
    if (handled) {
      return;
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      sendJson(response, 405, { error: "Metodo no permitido." });
      return;
    }

    serveStaticFile(pathname, response);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    console.error(error);
    sendJson(response, statusCode, { error: error.message || "Ocurrio un error interno." });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Santa Luzmila disponible en http://${HOST}:${PORT}/`);
  if (HOST === "0.0.0.0") {
    console.log(`Acceso local sugerido: http://127.0.0.1:${PORT}/`);
  }
  console.log(`Base de datos SQLite: ${DB_PATH}`);
});
