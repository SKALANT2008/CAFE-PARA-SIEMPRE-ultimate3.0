const CONCEPTOS_POR_TIPO = {
    Ingreso: [
        "Venta de café en tienda en línea",
        "Venta directa de café en finca",
        "Venta de suscripción mensual de café",
        "Venta de café pergamino o trillado",
        "OTRO"
    ],
    Egreso: [
        "Pago de jornales de recolección",
        "Pago de jornales de mantenimiento / guadaña",
        "Compra de fertilizantes y abonos",
        "Compra de insumos fitosanitarios / cal",
        "Compra de bolsas, empaques y etiquetas",
        "Servicios de trilla o tueste",
        "Transporte y envío de pedidos",
        "Servicios públicos y mantenimiento de finca",
        "OTRO"
    ]
};

let usuariosData = JSON.parse(localStorage.getItem('cps_v7_usuarios')) || [
    { id: "USR-001", nombre: "Valeria Gómez", email: "valeria.gomez@gmail.com", telefono: "311 456 7890", rol: "Cliente", estado: "Activo" },
    { id: "USR-002", nombre: "Andrés Ospina", email: "andres.ospina@hotmail.com", telefono: "300 987 6543", rol: "Cliente", estado: "Activo" },
    { id: "USR-003", nombre: "Mateo Montoya", email: "mateo.montoya@outlook.com", telefono: "320 123 9876", rol: "Cliente", estado: "Activo" }
];

let notificacionesData = JSON.parse(localStorage.getItem('cps_v7_notificaciones')) || [
    { id: 1, tipo: "user", titulo: "Cuenta de cliente activa", detalle: "Valeria Gómez registró perfil en la tienda en línea.", hora: "Hace 5 min", leida: false },
    { id: 2, tipo: "order", titulo: "Pedido ingresado", detalle: "PED-9021: Valeria Gómez adquirió Borbón Rosado Honey (500g).", hora: "Hace 18 min", leida: false },
    { id: 3, tipo: "stock", titulo: "Control de bodega", detalle: "Geisha Aniversario Natural (CPS-103) cuenta con 8 unidades.", hora: "Hace 42 min", leida: false }
];

let inventarioData = JSON.parse(localStorage.getItem('cps_v7_inventario')) || [
    { id: "CPS-101", nombre: "Borbón Rosado Honey", variedad: "Borbón Rosado", presentacion: "500g", precio: 35000, stock: 18 },
    { id: "CPS-102", nombre: "Castillo Tradición Lavado", variedad: "Castillo", presentacion: "1000g", precio: 48000, stock: 30 },
    { id: "CPS-103", nombre: "Geisha Aniversario Natural", variedad: "Geisha", presentacion: "250g", precio: 45000, stock: 8 },
    { id: "CPS-104", nombre: "Caturra Especial Finca", variedad: "Caturra", presentacion: "500g", precio: 28000, stock: 25 }
];

let lotesData = JSON.parse(localStorage.getItem('cps_v7_lotes')) || [
    { id: "LOT-001", variedad: "Borbón Rosado", area: "1.5 Ha", arboles: "3,200 árboles", kilos: "1,800 kg", destino: "85% Tienda / 15% Consumo Interno", estado: "En Producción" },
    { id: "LOT-002", variedad: "Geisha Especial", area: "1.0 Ha", arboles: "2,100 árboles", kilos: "1,620 kg", destino: "85% Tienda / 15% Consumo Interno", estado: "En Producción" },
    { id: "LOT-003", variedad: "Castillo Tradición", area: "1.2 Ha", arboles: "2,800 árboles", kilos: "1,450 kg", destino: "100% Comercialización Tienda", estado: "En Producción" },
    { id: "LOT-004", variedad: "Caturra Finca", area: "0.8 Ha", arboles: "1,500 árboles", kilos: "0 kg", destino: "100% Reserva Familiar", estado: "En Crecimiento" }
];

let beneficioData = JSON.parse(localStorage.getItem('cps_v7_beneficio')) || [
    { codigo: "BEN-101", lote: "LOT-001", metodo: "Honey", fermentacion: "48 horas", humedad: 11.2, estado: "Listo para Trilla" },
    { codigo: "BEN-102", lote: "LOT-002", metodo: "Natural", fermentacion: "72 horas", humedad: 11.5, estado: "En Secado" }
];

let nominaData = JSON.parse(localStorage.getItem('cps_v7_nomina')) || [
    { id: "TRB-01", nombre: "Jorge Ramírez", labor: "Recolección y mantenimiento", jornales: 20, valorJornal: 65000 },
    { id: "TRB-02", nombre: "Luz Marina López", labor: "Beneficio y secado", jornales: 18, valorJornal: 68000 }
];

let insumosData = JSON.parse(localStorage.getItem('cps_v7_insumos')) || [
    { id: "INS-001", nombre: "Abono Orgánico Compostado", cat: "Nutrición Orgánica", cant: "45 Bultos", costoUnit: "$35.000", costoTotal: "$1.575.000", estado: "Óptimo" },
    { id: "INS-002", nombre: "Fertilizante Químico NPK", cat: "Nutrición Edáfica", cant: "20 Bultos", costoUnit: "$125.000", costoTotal: "$2.500.000", estado: "Óptimo" },
    { id: "INS-003", nombre: "Cal Agrícola", cat: "Enmienda de Suelos", cant: "15 Bultos", costoUnit: "$28.000", costoTotal: "$420.000", estado: "Bajo Stock" },
    { id: "INS-004", nombre: "Fungicida Cúprico", cat: "Control Fitosanitario", cant: "8 Garrafas", costoUnit: "$95.000", costoTotal: "$760.000", estado: "Óptimo" }
];

let contabilidadData = JSON.parse(localStorage.getItem('cps_v7_contabilidad')) || [
    { fecha: "2026-11-18", tipo: "Ingreso", concepto: "Venta de café en tienda en línea (PED-9021 • Valeria Gómez)", categoria: "Ventas Tienda", monto: 35000 },
    { fecha: "2026-11-17", tipo: "Ingreso", concepto: "Venta de café en tienda en línea (PED-9020 • Andrés Ospina)", categoria: "Ventas Tienda", monto: 45000 },
    { fecha: "2026-11-15", tipo: "Egreso", concepto: "Compra de bolsas, empaques y etiquetas", categoria: "Empaque y Logística", monto: 480000 }
];

let pedidosData = JSON.parse(localStorage.getItem('cps_v7_pedidos')) || [
    { id: "PED-9021", cliente: "Valeria Gómez", cafe: "Borbón Rosado Honey (500g)", canal: "Tienda Web", total: "$35.000", estado: "En Preparación" },
    { id: "PED-9020", cliente: "Andrés Ospina", cafe: "Geisha Aniversario Natural (250g)", canal: "Tienda Web", total: "$45.000", estado: "En Ruta" },
    { id: "PED-9019", cliente: "Mateo Montoya", cafe: "Castillo Tradición Lavado (1000g)", canal: "Tienda Web", total: "$48.000", estado: "Entregado" }
];

function persistirTodo() {
    localStorage.setItem('cps_v7_usuarios', JSON.stringify(usuariosData));
    localStorage.setItem('cps_v7_notificaciones', JSON.stringify(notificacionesData));
    localStorage.setItem('cps_v7_inventario', JSON.stringify(inventarioData));
    localStorage.setItem('cps_v7_lotes', JSON.stringify(lotesData));
    localStorage.setItem('cps_v7_beneficio', JSON.stringify(beneficioData));
    localStorage.setItem('cps_v7_nomina', JSON.stringify(nominaData));
    localStorage.setItem('cps_v7_insumos', JSON.stringify(insumosData));
    localStorage.setItem('cps_v7_contabilidad', JSON.stringify(contabilidadData));
    localStorage.setItem('cps_v7_pedidos', JSON.stringify(pedidosData));
}

function parseKilosNum(txt) {
    const limpio = String(txt || "0").replace(/[^\d.]/g, "");
    return parseFloat(limpio) || 0;
}

function toggleCampoExtra(selectId, inputId) {
    const sel = document.getElementById(selectId);
    const inp = document.getElementById(inputId);
    if (!sel || !inp) return;
    inp.style.display = sel.value === "OTRO" ? "block" : "none";
    inp.required = sel.value === "OTRO";
}

function asegurarOpcionSelect(selectId, extraInputId, valorActual) {
    const sel = document.getElementById(selectId);
    const inp = document.getElementById(extraInputId);
    if (!sel) return;
    const existe = Array.from(sel.options).some(opt => opt.value === String(valorActual));
    if (existe) {
        sel.value = String(valorActual);
        if (inp) { inp.style.display = "none"; inp.required = false; inp.value = ""; }
    } else if (inp) {
        sel.value = "OTRO";
        inp.style.display = "block";
        inp.required = true;
        inp.value = String(valorActual || "");
    }
}

function obtenerValorSelectOExtra(selectId, extraInputId) {
    const sel = document.getElementById(selectId);
    const inp = document.getElementById(extraInputId);
    if (sel && sel.value === "OTRO" && inp) return inp.value.trim();
    return sel ? sel.value : "";
}

function refrescarResumenGeneral() {
    const activos = usuariosData.filter(u => u.estado === 'Activo').length;
    const totalStock = inventarioData.reduce((acc, p) => acc + (parseInt(p.stock) || 0), 0);
    const ingresos = contabilidadData.filter(a => a.tipo === 'Ingreso').reduce((acc, a) => acc + (parseInt(a.monto) || 0), 0);
    const egresos = contabilidadData.filter(a => a.tipo === 'Egreso').reduce((acc, a) => acc + (parseInt(a.monto) || 0), 0);
    const balance = ingresos - egresos;
    const noLeidas = notificacionesData.filter(n => !n.leida).length;

    document.getElementById('kpi-usuarios-val').innerText = `${usuariosData.length}`;
    document.getElementById('kpi-usuarios-sub').innerText = `${activos} activos en plataforma`;
    document.getElementById('kpi-bolsas-val').innerText = `${totalStock}`;
    document.getElementById('kpi-bolsas-sub').innerText = `${inventarioData.length} referencias en catálogo`;
    document.getElementById('kpi-ingresos-val').innerText = `$${ingresos.toLocaleString('es-CO')}`;
    document.getElementById('kpi-pedidos-sub').innerText = `${pedidosData.length} pedidos registrados`;
    document.getElementById('kpi-utilidad-val').innerText = `${balance >= 0 ? '+' : '-'}$${Math.abs(balance).toLocaleString('es-CO')}`;
    document.getElementById('kpi-egresos-sub').innerText = `Egresos: $${egresos.toLocaleString('es-CO')}`;

    const totalKilos = lotesData.reduce((acc, l) => acc + parseKilosNum(l.kilos), 0);
    const enProduccion = lotesData.filter(l => l.estado.includes('Producción')).length;
    document.getElementById('res-lotes-val').innerText = `${lotesData.length} lotes`;
    document.getElementById('res-lotes-desc').innerText = `${totalKilos.toLocaleString('es-CO')} kg acumulados · ${enProduccion} lotes en producción.`;

    const listosTrilla = beneficioData.filter(b => b.estado.includes('Listo')).length;
    document.getElementById('res-ben-val').innerText = `${beneficioData.length} batches`;
    document.getElementById('res-ben-desc').innerText = `${listosTrilla} listos para trilla y ${beneficioData.length - listosTrilla} en otro estado.`;

    const totalJornales = nominaData.reduce((acc, t) => acc + (parseInt(t.jornales) || 0), 0);
    const costoNomina = nominaData.reduce((acc, t) => acc + ((parseInt(t.jornales) || 0) * (parseInt(t.valorJornal) || 0)), 0);
    document.getElementById('res-nom-val').innerText = `${nominaData.length} personas`;
    document.getElementById('res-nom-desc').innerText = `${totalJornales} jornales registrados · $${costoNomina.toLocaleString('es-CO')} estimados.`;

    const bajoStockIns = insumosData.filter(i => i.estado !== 'Óptimo').length;
    document.getElementById('res-ins-val').innerText = `${insumosData.length} insumos`;
    document.getElementById('res-ins-desc').innerText = bajoStockIns > 0
        ? `${bajoStockIns} insumo(s) con alerta de reposición o bajo stock.`
        : `Todos los insumos agrícolas en estado óptimo.`;

    const pedidosEntregados = pedidosData.filter(p => p.estado === 'Entregado').length;
    document.getElementById('res-ped-val').innerText = `${pedidosData.length} pedidos`;
    document.getElementById('res-ped-desc').innerText = `${pedidosEntregados} entregados · Balance contable: ${balance >= 0 ? '+' : '-'}$${Math.abs(balance).toLocaleString('es-CO')}.`;

    document.getElementById('res-alert-val').innerText = `${noLeidas} pendientes`;
    document.getElementById('res-alert-desc').innerText = `${notificacionesData.length} eventos en historial · ${usuariosData.length} usuarios en el sistema.`;
}

window.onload = function() {
    refrescarNotificacionesUI();
    refrescarTablaUsuarios();
    refrescarTablaInventario();
    refrescarTablaLotes();
    refrescarTablaBeneficio();
    refrescarTablaNomina();
    refrescarTablaInsumos();
    refrescarContabilidad();
    refrescarTablaPedidos();
    refrescarResumenGeneral();
};

document.addEventListener("click", function(e) {
    const panel = document.getElementById("notifDropdown");
    const bell = document.querySelector(".notif-bell-btn");
    if (panel && bell && !panel.contains(e.target) && !bell.contains(e.target)) {
        panel.classList.remove("active");
    }
});

function cerrarModal(id) { document.getElementById(id).classList.remove('active'); }

function switchDashboardView(viewId, linkElement) {
    document.querySelectorAll('.dashboard-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    if (linkElement) linkElement.classList.add('active');

    const titulos = {
        'view-analytics': 'Resumen y KPIs Operativos',
        'view-usuarios': 'Clientes y Usuarios del Sistema',
        'view-notificaciones': 'Centro de Notificaciones',
        'view-lotes': 'Lotes y Destino de Cosecha',
        'view-beneficio': 'Control de Beneficio, Fermentación y Secado',
        'view-nomina': 'Personal de Finca y Jornales',
        'view-insumos': 'Insumos y Costos Agrícolas',
        'view-contabilidad': 'Libro Contable de Ingresos y Egresos',
        'view-inventario': 'Inventario y Precios en Tienda',
        'view-pedidos': 'Pedidos de Clientes Registrados'
    };
    document.getElementById('topbar-title-text').innerText = titulos[viewId] || 'Gestión Empresarial';
    if (viewId === 'view-analytics') refrescarResumenGeneral();
}

function refrescarTablaUsuarios() {
    const tbody = document.getElementById('tabla-usuarios-content');
    const q = (document.getElementById('buscar-usuario')?.value || '').toLowerCase().trim();
    tbody.innerHTML = '';
    document.getElementById('sidebar-user-badge').innerText = usuariosData.length;

    usuariosData.forEach((u, index) => {
        if (q && !u.id.toLowerCase().includes(q) && !u.nombre.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return;
        tbody.innerHTML += `
            <tr>
                <td><b>${u.id}</b></td>
                <td>${u.nombre}</td>
                <td>${u.email}</td>
                <td>${u.telefono}</td>
                <td><span class="status-pill ${u.rol === 'Administrador' ? 'info' : 'warning'}">${u.rol}</span></td>
                <td><span class="status-pill ${u.estado === 'Activo' ? 'success' : 'danger'}">${u.estado}</span></td>
                <td>
                    <div class="action-btns-group">
                        <button type="button" class="btn-table-action btn-edit-action" onclick="abrirModalUsuario(${index})">✎ Editar</button>
                        <button type="button" class="btn-table-action btn-delete-action" onclick="eliminarUsuario(${index})">✕ Eliminar</button>
                    </div>
                </td>
            </tr>
        `;
    });
    persistirTodo();
    refrescarResumenGeneral();
}

function abrirModalUsuario(index = -1) {
    document.getElementById('modal-usuario-box').classList.add('active');
    document.getElementById('user-edit-index').value = index;
    if (index > -1) {
        const u = usuariosData[index];
        document.getElementById('modal-user-titulo').innerText = "Editar Usuario";
        document.getElementById('user-id-input').value = u.id;
        document.getElementById('user-nombre-input').value = u.nombre;
        document.getElementById('user-email-input').value = u.email;
        document.getElementById('user-telefono-input').value = u.telefono;
        document.getElementById('user-rol-input').value = u.rol;
        document.getElementById('user-estado-input').value = u.estado;
    } else {
        document.getElementById('modal-user-titulo').innerText = "Nuevo Usuario";
        document.getElementById('user-id-input').value = `USR-00${usuariosData.length + 1}`;
        document.getElementById('user-nombre-input').value = "";
        document.getElementById('user-email-input').value = "";
        document.getElementById('user-telefono-input').value = "";
        document.getElementById('user-rol-input').value = "Cliente";
        document.getElementById('user-estado-input').value = "Activo";
    }
}

function guardarUsuarioSistema(e) {
    e.preventDefault();
    const index = parseInt(document.getElementById('user-edit-index').value);
    const obj = {
        id: document.getElementById('user-id-input').value,
        nombre: document.getElementById('user-nombre-input').value,
        email: document.getElementById('user-email-input').value,
        telefono: document.getElementById('user-telefono-input').value,
        rol: document.getElementById('user-rol-input').value,
        estado: document.getElementById('user-estado-input').value
    };
    if (index > -1) {
        usuariosData[index] = obj;
        agregarNotificacion("user", "Datos de usuario actualizados", `Se guardaron cambios para ${obj.nombre}.`);
    } else {
        usuariosData.push(obj);
        agregarNotificacion("user", "Nuevo usuario registrado", `${obj.nombre} (${obj.rol}) habilitado en el sistema.`);
    }
    refrescarTablaUsuarios();
    cerrarModal('modal-usuario-box');
}

function eliminarUsuario(index) {
    if (confirm('¿Confirmas eliminar este usuario?')) {
        const del = usuariosData.splice(index, 1)[0];
        agregarNotificacion("user", "Usuario eliminado", `Se dio de baja el registro de ${del.nombre}.`);
        refrescarTablaUsuarios();
    }
}

function toggleNotifDropdown(e) { e.stopPropagation(); document.getElementById("notifDropdown").classList.toggle("active"); }

function irAVistaNotificaciones() {
    document.getElementById("notifDropdown").classList.remove("active");
    switchDashboardView('view-notificaciones', document.querySelector(".sidebar-menu a[onclick*='view-notificaciones']"));
}

function agregarNotificacion(tipo, titulo, detalle) {
    notificacionesData.unshift({ id: Date.now(), tipo, titulo, detalle, hora: "Ahora", leida: false });
    refrescarNotificacionesUI();
}

function marcarLeida(id) {
    const item = notificacionesData.find(n => n.id === id);
    if (item) item.leida = true;
    refrescarNotificacionesUI();
}

function marcarTodasLeidas() {
    notificacionesData.forEach(n => n.leida = true);
    refrescarNotificacionesUI();
}

function eliminarNotificacion(id) {
    if (confirm('¿Eliminar esta notificación?')) {
        notificacionesData = notificacionesData.filter(n => n.id !== id);
        refrescarNotificacionesUI();
    }
}

function eliminarTodasNotificaciones() {
    if (notificacionesData.length === 0) return;
    if (confirm('¿Eliminar todas las notificaciones visibles?')) {
        const filtro = document.getElementById("filtro-tipo-notif")?.value || "todas";
        if (filtro === "todas") notificacionesData = [];
        else notificacionesData = notificacionesData.filter(n => n.tipo !== filtro);
        refrescarNotificacionesUI();
    }
}

function refrescarNotificacionesUI() {
    const noLeidas = notificacionesData.filter(n => !n.leida).length;
    const topCount = document.getElementById("topbar-notif-count");
    const sideBadge = document.getElementById("sidebar-notif-badge");
    topCount.innerText = noLeidas;
    sideBadge.innerText = noLeidas;
    topCount.style.display = noLeidas > 0 ? "flex" : "none";
    sideBadge.style.display = noLeidas > 0 ? "inline-block" : "none";

    const dropList = document.getElementById("notifDropdownList");
    dropList.innerHTML = "";
    if (notificacionesData.length === 0) {
        dropList.innerHTML = `<div style="padding:18px;text-align:center;font-size:0.82rem;color:var(--text-muted);">No hay notificaciones registradas.</div>`;
    } else {
        notificacionesData.slice(0, 6).forEach(n => {
            const marca = n.tipo === "user" ? "U" : (n.tipo === "order" ? "P" : "B");
            dropList.innerHTML += `
                <div class="notif-item ${n.leida ? '' : 'unread'}" onclick="marcarLeida(${n.id})">
                    <div class="notif-item-icon ${n.tipo}"><b>${marca}</b></div>
                    <div class="notif-item-content">
                        <strong>${n.titulo} ${n.leida ? '' : '•'}</strong>
                        <p>${n.detalle}</p>
                        <small>${n.hora}</small>
                    </div>
                </div>
            `;
        });
    }
    refrescarCentroNotificaciones();
    persistirTodo();
    refrescarResumenGeneral();
}

function refrescarCentroNotificaciones() {
    const filtro = document.getElementById("filtro-tipo-notif");
    if (!filtro) return;
    const tipoSel = filtro.value;
    const tbody = document.getElementById("tabla-notificaciones-content");
    tbody.innerHTML = "";
    const lista = notificacionesData.filter(n => tipoSel === "todas" || n.tipo === tipoSel);
    if (lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);">No hay notificaciones en esta categoría.</td></tr>`;
        return;
    }
    lista.forEach(n => {
        const tag = n.tipo === "user" ? '<span class="status-pill info">Usuario</span>' : (n.tipo === "order" ? '<span class="status-pill success">Pedido</span>' : '<span class="status-pill warning">Bodega / Finca</span>');
        tbody.innerHTML += `
            <tr>
                <td>${tag}</td>
                <td><b>${n.titulo}</b></td>
                <td>${n.detalle}</td>
                <td>${n.hora}</td>
                <td>${n.leida ? '<span class="status-pill" style="background:#EFEFEF;color:#666;">Leída</span>' : '<span class="status-pill danger">Pendiente</span>'}</td>
                <td>
                    <div class="action-btns-group">
                        ${n.leida ? '' : `<button type="button" class="btn-table-action btn-edit-action" onclick="marcarLeida(${n.id})">Marcar leída</button>`}
                        <button type="button" class="btn-table-action btn-delete-action" onclick="eliminarNotificacion(${n.id})">✕ Eliminar</button>
                    </div>
                </td>
            </tr>
        `;
    });
}

function refrescarTablaLotes() {
    const tbody = document.getElementById('tabla-lotes-content');
    const q = (document.getElementById('buscar-lote')?.value || '').toLowerCase().trim();
    tbody.innerHTML = '';
    lotesData.forEach((l, index) => {
        if (q && !l.id.toLowerCase().includes(q) && !l.variedad.toLowerCase().includes(q)) return;
        tbody.innerHTML += `
            <tr>
                <td><b>${l.id}</b></td>
                <td>${l.variedad}</td>
                <td>${l.area}</td>
                <td>${l.arboles}</td>
                <td>${l.kilos}</td>
                <td><span style="font-size:0.8rem;font-weight:700;color:var(--tamesis-green);">${l.destino}</span></td>
                <td><span class="status-pill ${l.estado.includes('Producción') ? 'success' : 'warning'}">${l.estado}</span></td>
                <td>
                    <div class="action-btns-group">
                        <button type="button" class="btn-table-action btn-edit-action" onclick="abrirModalLote(${index})">✎</button>
                        <button type="button" class="btn-table-action btn-delete-action" onclick="eliminarLote(${index})">✕</button>
                    </div>
                </td>
            </tr>
        `;
    });
    persistirTodo();
    refrescarResumenGeneral();
}

function abrirModalLote(index = -1) {
    document.getElementById('modal-lote-box').classList.add('active');
    document.getElementById('lote-edit-index').value = index;
    if (index > -1) {
        const l = lotesData[index];
        document.getElementById('modal-lote-titulo').innerText = "Editar Lote";
        document.getElementById('lote-id-input').value = l.id;
        asegurarOpcionSelect('lote-variedad-input', null, l.variedad);
        asegurarOpcionSelect('lote-area-input', null, l.area);
        asegurarOpcionSelect('lote-arboles-input', null, l.arboles);
        asegurarOpcionSelect('lote-kilos-input', 'lote-kilos-otro', l.kilos);
        asegurarOpcionSelect('lote-destino-input', null, l.destino);
        asegurarOpcionSelect('lote-estado-input', null, l.estado);
    } else {
        document.getElementById('modal-lote-titulo').innerText = "Nuevo Lote";
        document.getElementById('lote-id-input').value = `LOT-00${lotesData.length + 1}`;
        document.getElementById('lote-variedad-input').selectedIndex = 0;
        document.getElementById('lote-area-input').value = "1.0 Ha";
        document.getElementById('lote-arboles-input').value = "2,100 árboles";
        asegurarOpcionSelect('lote-kilos-input', 'lote-kilos-otro', "0 kg");
        document.getElementById('lote-destino-input').selectedIndex = 0;
        document.getElementById('lote-estado-input').value = "En Producción";
    }
}

function guardarLoteSistema(e) {
    e.preventDefault();
    const index = parseInt(document.getElementById('lote-edit-index').value);
    const obj = {
        id: document.getElementById('lote-id-input').value,
        variedad: document.getElementById('lote-variedad-input').value,
        area: document.getElementById('lote-area-input').value,
        arboles: document.getElementById('lote-arboles-input').value,
        kilos: obtenerValorSelectOExtra('lote-kilos-input', 'lote-kilos-otro'),
        destino: document.getElementById('lote-destino-input').value,
        estado: document.getElementById('lote-estado-input').value
    };
    if (index > -1) lotesData[index] = obj;
    else lotesData.push(obj);
    refrescarTablaLotes();
    cerrarModal('modal-lote-box');
}

function eliminarLote(index) {
    if (confirm('¿Eliminar este lote?')) { lotesData.splice(index, 1); refrescarTablaLotes(); }
}

function refrescarTablaBeneficio() {
    const tbody = document.getElementById('tabla-beneficio-content');
    tbody.innerHTML = '';
    beneficioData.forEach((b, index) => {
        tbody.innerHTML += `
            <tr>
                <td><b>${b.codigo}</b></td>
                <td>${b.lote}</td>
                <td><span class="status-pill info">${b.metodo}</span></td>
                <td>${b.fermentacion}</td>
                <td>${b.humedad}%</td>
                <td><span class="status-pill ${b.estado.includes('Listo') ? 'success' : 'warning'}">${b.estado}</span></td>
                <td>
                    <div class="action-btns-group">
                        <button type="button" class="btn-table-action btn-edit-action" onclick="abrirModalBeneficio(${index})">✎</button>
                        <button type="button" class="btn-table-action btn-delete-action" onclick="eliminarBeneficio(${index})">✕</button>
                    </div>
                </td>
            </tr>
        `;
    });
    persistirTodo();
    refrescarResumenGeneral();
}

function cargarOpcionesLotesEnBeneficio(valorActual) {
    const sel = document.getElementById('ben-lote-input');
    sel.innerHTML = '';
    lotesData.forEach(l => {
        sel.innerHTML += `<option value="${l.id}">${l.id} — ${l.variedad}</option>`;
    });
    if (valorActual && Array.from(sel.options).some(o => o.value === valorActual)) {
        sel.value = valorActual;
    }
}

function abrirModalBeneficio(index = -1) {
    document.getElementById('modal-beneficio-box').classList.add('active');
    document.getElementById('ben-edit-index').value = index;
    if (index > -1) {
        const b = beneficioData[index];
        document.getElementById('ben-codigo-input').value = b.codigo;
        cargarOpcionesLotesEnBeneficio(b.lote);
        document.getElementById('ben-metodo-input').value = b.metodo;
        document.getElementById('ben-ferm-input').value = b.fermentacion;
        document.getElementById('ben-hum-input').value = String(b.humedad);
        document.getElementById('ben-estado-input').value = b.estado;
    } else {
        document.getElementById('ben-codigo-input').value = `BEN-${101 + beneficioData.length}`;
        cargarOpcionesLotesEnBeneficio(lotesData[0]?.id || "LOT-001");
        document.getElementById('ben-metodo-input').value = "Lavado";
        document.getElementById('ben-ferm-input').value = "36 horas";
        document.getElementById('ben-hum-input').value = "11.2";
        document.getElementById('ben-estado-input').value = "En Secado";
    }
}

function guardarBeneficio(e) {
    e.preventDefault();
    const index = parseInt(document.getElementById('ben-edit-index').value);
    const obj = {
        codigo: document.getElementById('ben-codigo-input').value,
        lote: document.getElementById('ben-lote-input').value,
        metodo: document.getElementById('ben-metodo-input').value,
        fermentacion: document.getElementById('ben-ferm-input').value,
        humedad: parseFloat(document.getElementById('ben-hum-input').value),
        estado: document.getElementById('ben-estado-input').value
    };
    if (index > -1) beneficioData[index] = obj;
    else beneficioData.push(obj);
    refrescarTablaBeneficio();
    cerrarModal('modal-beneficio-box');
}

function eliminarBeneficio(index) {
    if (confirm('¿Eliminar este batch?')) { beneficioData.splice(index, 1); refrescarTablaBeneficio(); }
}

function refrescarTablaNomina() {
    const tbody = document.getElementById('tabla-nomina-content');
    tbody.innerHTML = '';
    nominaData.forEach((t, index) => {
        const total = t.jornales * t.valorJornal;
        tbody.innerHTML += `
            <tr>
                <td><b>${t.id}</b></td>
                <td>${t.nombre}</td>
                <td>${t.labor}</td>
                <td>${t.jornales}</td>
                <td>$${t.valorJornal.toLocaleString('es-CO')}</td>
                <td><b>$${total.toLocaleString('es-CO')}</b></td>
                <td>
                    <div class="action-btns-group">
                        <button type="button" class="btn-table-action btn-edit-action" onclick="abrirModalTrabajador(${index})">✎</button>
                        <button type="button" class="btn-table-action btn-delete-action" onclick="eliminarTrabajador(${index})">✕</button>
                    </div>
                </td>
            </tr>
        `;
    });
    persistirTodo();
    refrescarResumenGeneral();
}

function abrirModalTrabajador(index = -1) {
    document.getElementById('modal-nomina-box').classList.add('active');
    document.getElementById('nom-edit-index').value = index;
    if (index > -1) {
        const t = nominaData[index];
        document.getElementById('nom-id-input').value = t.id;
        document.getElementById('nom-nombre-input').value = t.nombre;
        asegurarOpcionSelect('nom-labor-input', 'nom-labor-otro', t.labor);
        document.getElementById('nom-jornales-input').value = String(t.jornales);
        document.getElementById('nom-valor-input').value = String(t.valorJornal);
    } else {
        document.getElementById('nom-id-input').value = `TRB-0${nominaData.length + 1}`;
        document.getElementById('nom-nombre-input').value = "";
        asegurarOpcionSelect('nom-labor-input', 'nom-labor-otro', "Recolección de café cereza");
        document.getElementById('nom-jornales-input').value = "15";
        document.getElementById('nom-valor-input').value = "65000";
    }
}

function guardarTrabajador(e) {
    e.preventDefault();
    const index = parseInt(document.getElementById('nom-edit-index').value);
    const obj = {
        id: document.getElementById('nom-id-input').value,
        nombre: document.getElementById('nom-nombre-input').value,
        labor: obtenerValorSelectOExtra('nom-labor-input', 'nom-labor-otro'),
        jornales: parseInt(document.getElementById('nom-jornales-input').value),
        valorJornal: parseInt(document.getElementById('nom-valor-input').value)
    };
    if (index > -1) nominaData[index] = obj;
    else nominaData.push(obj);
    refrescarTablaNomina();
    cerrarModal('modal-nomina-box');
}

function eliminarTrabajador(index) {
    if (confirm('¿Eliminar este registro?')) { nominaData.splice(index, 1); refrescarTablaNomina(); }
}

function refrescarTablaInsumos() {
    const tbody = document.getElementById('tabla-insumos-content');
    const catSel = document.getElementById('filtro-cat-insumo')?.value || 'todas';
    tbody.innerHTML = '';
    insumosData.forEach((i, index) => {
        if (catSel !== 'todas' && i.cat !== catSel) return;
        tbody.innerHTML += `
            <tr>
                <td><b>${i.id}</b></td>
                <td>${i.nombre}</td>
                <td><span class="status-pill info">${i.cat}</span></td>
                <td>${i.cant}</td>
                <td>${i.costoUnit}</td>
                <td><b>${i.costoTotal}</b></td>
                <td><span class="status-pill ${i.estado === 'Óptimo' ? 'success' : 'warning'}">${i.estado}</span></td>
                <td>
                    <div class="action-btns-group">
                        <button type="button" class="btn-table-action btn-edit-action" onclick="abrirModalInsumo(${index})">✎</button>
                        <button type="button" class="btn-table-action btn-delete-action" onclick="eliminarInsumo(${index})">✕</button>
                    </div>
                </td>
            </tr>
        `;
    });
    persistirTodo();
    refrescarResumenGeneral();
}

function abrirModalInsumo(index = -1) {
    document.getElementById('modal-insumo-box').classList.add('active');
    document.getElementById('ins-edit-index').value = index;
    if (index > -1) {
        const i = insumosData[index];
        document.getElementById('modal-insumo-titulo').innerText = "Editar Insumo";
        document.getElementById('ins-id-input').value = i.id;
        asegurarOpcionSelect('ins-nombre-input', 'ins-nombre-otro', i.nombre);
        document.getElementById('ins-cat-input').value = i.cat;
        asegurarOpcionSelect('ins-cant-input', 'ins-cant-otro', i.cant);
        asegurarOpcionSelect('ins-costounit-input', 'ins-costounit-otro', i.costoUnit);
        asegurarOpcionSelect('ins-costototal-input', 'ins-costototal-otro', i.costoTotal);
        document.getElementById('ins-estado-input').value = i.estado;
    } else {
        document.getElementById('modal-insumo-titulo').innerText = "Nuevo Insumo";
        document.getElementById('ins-id-input').value = `INS-00${insumosData.length + 1}`;
        asegurarOpcionSelect('ins-nombre-input', 'ins-nombre-otro', "Abono Orgánico Compostado");
        document.getElementById('ins-cat-input').value = "Nutrición Orgánica";
        asegurarOpcionSelect('ins-cant-input', 'ins-cant-otro', "10 Bultos");
        asegurarOpcionSelect('ins-costounit-input', 'ins-costounit-otro', "$35.000");
        asegurarOpcionSelect('ins-costototal-input', 'ins-costototal-otro', "$350.000");
        document.getElementById('ins-estado-input').value = "Óptimo";
    }
}

function guardarInsumoSistema(e) {
    e.preventDefault();
    const index = parseInt(document.getElementById('ins-edit-index').value);
    const obj = {
        id: document.getElementById('ins-id-input').value,
        nombre: obtenerValorSelectOExtra('ins-nombre-input', 'ins-nombre-otro'),
        cat: document.getElementById('ins-cat-input').value,
        cant: obtenerValorSelectOExtra('ins-cant-input', 'ins-cant-otro'),
        costoUnit: obtenerValorSelectOExtra('ins-costounit-input', 'ins-costounit-otro'),
        costoTotal: obtenerValorSelectOExtra('ins-costototal-input', 'ins-costototal-otro'),
        estado: document.getElementById('ins-estado-input').value
    };
    if (index > -1) insumosData[index] = obj;
    else insumosData.push(obj);
    refrescarTablaInsumos();
    cerrarModal('modal-insumo-box');
}

function eliminarInsumo(index) {
    if (confirm('¿Eliminar este insumo?')) { insumosData.splice(index, 1); refrescarTablaInsumos(); }
}

function actualizarOpcionesConcepto(valorActual) {
    const tipo = document.getElementById('asiento-tipo-input').value;
    const sel = document.getElementById('asiento-concepto-select');
    const inp = document.getElementById('asiento-concepto-otro');
    const opciones = CONCEPTOS_POR_TIPO[tipo] || CONCEPTOS_POR_TIPO.Ingreso;
    sel.innerHTML = '';
    opciones.forEach(op => {
        sel.innerHTML += `<option value="${op}">${op === "OTRO" ? "Escribir otro concepto..." : op}</option>`;
    });
    if (valorActual) {
        asegurarOpcionSelect('asiento-concepto-select', 'asiento-concepto-otro', valorActual);
    } else {
        sel.selectedIndex = 0;
        if (inp) { inp.style.display = "none"; inp.required = false; inp.value = ""; }
    }
}

function refrescarContabilidad() {
    const tbody = document.getElementById('tabla-contabilidad-content');
    const tipoSel = document.getElementById('filtro-tipo-conta')?.value || 'todos';
    tbody.innerHTML = '';

    let ingresos = 0;
    let egresos = 0;
    contabilidadData.forEach(a => {
        if (a.tipo === 'Ingreso') ingresos += a.monto;
        else egresos += a.monto;
    });
    const balance = ingresos - egresos;

    document.getElementById('conta-total-ingresos').innerText = `$${ingresos.toLocaleString('es-CO')}`;
    document.getElementById('conta-total-egresos').innerText = `$${egresos.toLocaleString('es-CO')}`;
    const balEl = document.getElementById('conta-balance-neto');
    balEl.innerText = `${balance >= 0 ? '+' : '-'}$${Math.abs(balance).toLocaleString('es-CO')}`;
    balEl.style.color = balance >= 0 ? 'var(--success)' : 'var(--danger)';

    contabilidadData.forEach((a, index) => {
        if (tipoSel !== 'todos' && a.tipo !== tipoSel) return;
        tbody.innerHTML += `
            <tr>
                <td>${a.fecha}</td>
                <td><span class="status-pill ${a.tipo === 'Ingreso' ? 'success' : 'danger'}">${a.tipo}</span></td>
                <td><b>${a.concepto}</b></td>
                <td>${a.categoria}</td>
                <td><b>$${a.monto.toLocaleString('es-CO')}</b></td>
                <td>
                    <div class="action-btns-group">
                        <button type="button" class="btn-table-action btn-edit-action" onclick="abrirModalAsiento(${index})">✎ Editar</button>
                        <button type="button" class="btn-table-action btn-delete-action" onclick="eliminarAsiento(${index})">✕</button>
                    </div>
                </td>
            </tr>
        `;
    });
    persistirTodo();
    refrescarResumenGeneral();
}

function abrirModalAsiento(index = -1) {
    document.getElementById('modal-asiento-box').classList.add('active');
    document.getElementById('asiento-edit-index').value = index;
    if (index > -1) {
        const a = contabilidadData[index];
        document.getElementById('modal-asiento-titulo').innerText = "Editar Movimiento";
        document.getElementById('asiento-fecha-input').value = a.fecha;
        document.getElementById('asiento-tipo-input').value = a.tipo;
        actualizarOpcionesConcepto(a.concepto);
        asegurarOpcionSelect('asiento-cat-input', 'asiento-cat-otro', a.categoria);
        document.getElementById('asiento-monto-input').value = a.monto;
    } else {
        document.getElementById('modal-asiento-titulo').innerText = "Nuevo Movimiento";
        document.getElementById('asiento-fecha-input').value = "2026-11-25";
        document.getElementById('asiento-tipo-input').value = "Ingreso";
        actualizarOpcionesConcepto(null);
        asegurarOpcionSelect('asiento-cat-input', 'asiento-cat-otro', "Ventas Tienda");
        document.getElementById('asiento-monto-input').value = "";
    }
}

function guardarAsientoContable(e) {
    e.preventDefault();
    const index = parseInt(document.getElementById('asiento-edit-index').value);
    const obj = {
        fecha: document.getElementById('asiento-fecha-input').value,
        tipo: document.getElementById('asiento-tipo-input').value,
        concepto: obtenerValorSelectOExtra('asiento-concepto-select', 'asiento-concepto-otro'),
        categoria: obtenerValorSelectOExtra('asiento-cat-input', 'asiento-cat-otro'),
        monto: parseInt(document.getElementById('asiento-monto-input').value)
    };
    if (index > -1) contabilidadData[index] = obj;
    else contabilidadData.unshift(obj);
    refrescarContabilidad();
    cerrarModal('modal-asiento-box');
}

function eliminarAsiento(index) {
    if (confirm('¿Eliminar este movimiento contable?')) { contabilidadData.splice(index, 1); refrescarContabilidad(); }
}

function refrescarTablaInventario() {
    const tbody = document.getElementById('tabla-inventario-content');
    const q = (document.getElementById('buscar-inv')?.value || '').toLowerCase().trim();
    tbody.innerHTML = '';

    inventarioData.forEach((prod, index) => {
        if (q && !prod.id.toLowerCase().includes(q) && !prod.nombre.toLowerCase().includes(q) && !prod.variedad.toLowerCase().includes(q)) return;
        tbody.innerHTML += `
            <tr>
                <td><b>${prod.id}</b></td>
                <td>${prod.nombre}</td>
                <td>${prod.variedad}</td>
                <td>${prod.presentacion}</td>
                <td><b>$${prod.precio.toLocaleString('es-CO')}</b></td>
                <td><span class="status-pill ${prod.stock <= 10 ? 'warning' : 'success'}">${prod.stock} und.</span></td>
                <td>
                    <div class="action-btns-group">
                        <button type="button" class="btn-table-action btn-edit-action" onclick="abrirModalInventario(${index})">✎</button>
                        <button type="button" class="btn-table-action btn-delete-action" onclick="removerItemInventario(${index})">✕</button>
                    </div>
                </td>
            </tr>
        `;
    });
    persistirTodo();
    refrescarResumenGeneral();
}

function abrirModalInventario(index = -1) {
    document.getElementById('modal-inventario-box').classList.add('active');
    document.getElementById('inv-edit-index').value = index;
    if (index > -1) {
        const p = inventarioData[index];
        document.getElementById('modal-inv-titulo').innerText = "Editar Producto";
        document.getElementById('inv-id-input').value = p.id;
        asegurarOpcionSelect('inv-nombre-input', 'inv-nombre-otro', p.nombre);
        asegurarOpcionSelect('inv-variedad-input', null, p.variedad);
        asegurarOpcionSelect('inv-pres-input', null, p.presentacion);
        document.getElementById('inv-precio-input').value = p.precio;
        document.getElementById('inv-stock-input').value = p.stock;
    } else {
        document.getElementById('modal-inv-titulo').innerText = "Nuevo Producto";
        document.getElementById('inv-id-input').value = `CPS-10${inventarioData.length + 1}`;
        asegurarOpcionSelect('inv-nombre-input', 'inv-nombre-otro', "Borbón Rosado Honey");
        document.getElementById('inv-variedad-input').selectedIndex = 0;
        document.getElementById('inv-pres-input').value = "500g";
        document.getElementById('inv-precio-input').value = "35000";
        document.getElementById('inv-stock-input').value = "20";
    }
}

function guardarProductoInventario(e) {
    e.preventDefault();
    const index = parseInt(document.getElementById('inv-edit-index').value);
    const obj = {
        id: document.getElementById('inv-id-input').value,
        nombre: obtenerValorSelectOExtra('inv-nombre-input', 'inv-nombre-otro'),
        variedad: document.getElementById('inv-variedad-input').value,
        presentacion: document.getElementById('inv-pres-input').value,
        precio: parseInt(document.getElementById('inv-precio-input').value),
        stock: parseInt(document.getElementById('inv-stock-input').value)
    };
    if (index > -1) inventarioData[index] = obj;
    else inventarioData.push(obj);
    refrescarTablaInventario();
    cerrarModal('modal-inventario-box');
}

function removerItemInventario(index) {
    if (confirm('¿Eliminar este producto?')) { inventarioData.splice(index, 1); refrescarTablaInventario(); }
}

function refrescarTablaPedidos() {
    const tbody = document.getElementById('tabla-pedidos-content');
    const q = (document.getElementById('buscar-pedido')?.value || '').toLowerCase().trim();
    tbody.innerHTML = '';

    pedidosData.forEach((p, index) => {
        if (q && !p.id.toLowerCase().includes(q) && !p.cliente.toLowerCase().includes(q) && !p.cafe.toLowerCase().includes(q)) return;
        let badge = 'warning';
        if (p.estado === 'Entregado') badge = 'success';
        else if (p.estado === 'En Ruta') badge = 'info';

        tbody.innerHTML += `
            <tr>
                <td><b>${p.id}</b></td>
                <td><b>${p.cliente}</b></td>
                <td>${p.cafe}</td>
                <td><span class="status-pill success">${p.canal}</span></td>
                <td><b>${p.total}</b></td>
                <td><span class="status-pill ${badge}">${p.estado}</span></td>
                <td>
                    <div class="action-btns-group">
                        <button type="button" class="btn-table-action btn-edit-action" onclick="abrirModalPedido(${index})">✎ Envío</button>
                        <button type="button" class="btn-table-action btn-delete-action" onclick="eliminarPedido(${index})">✕</button>
                    </div>
                </td>
            </tr>
        `;
    });
    persistirTodo();
    refrescarResumenGeneral();
}

function abrirModalPedido(index) {
    const p = pedidosData[index];
    document.getElementById('modal-pedido-box').classList.add('active');
    document.getElementById('ped-edit-index').value = index;
    document.getElementById('ped-id-input').value = p.id;
    document.getElementById('ped-cliente-input').value = p.cliente;
    document.getElementById('ped-detalle-input').value = p.cafe;
    document.getElementById('ped-estado-input').value = p.estado;
}

function guardarEstadoPedido(e) {
    e.preventDefault();
    const index = parseInt(document.getElementById('ped-edit-index').value);
    const nuevoEstado = document.getElementById('ped-estado-input').value;
    pedidosData[index].estado = nuevoEstado;
    agregarNotificacion("order", "Envío actualizado", `Pedido ${pedidosData[index].id} (${pedidosData[index].cliente}): ${nuevoEstado}.`);
    refrescarTablaPedidos();
    cerrarModal('modal-pedido-box');
}

function eliminarPedido(index) {
    if (confirm('¿Eliminar este pedido?')) { pedidosData.splice(index, 1); refrescarTablaPedidos(); }
}

function escaparHTML(texto) {
    return String(texto ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function renderFilaExcel(celdas, opciones = {}) {
    const align = opciones.align || "center";
    const bg = opciones.bg || "#FFFFFF";
    const color = opciones.color || "#2A211D";
    const bold = opciones.bold ? "font-weight:700;" : "font-weight:500;";
    const fontSize = opciones.fontSize || "10pt";
    const height = opciones.height || "24";
    const border = opciones.border === false ? "border:none;" : "border:1px solid #D8CBB8;";

    const tds = celdas.map((val, idx) => {
        const colAlign = Array.isArray(align) ? (align[idx] || "center") : align;
        return `<td align="${colAlign}" valign="middle" style="background:${bg};color:${color};${bold}font-size:${fontSize};padding:7px 10px;${border}mso-number-format:'\\@';">${escaparHTML(val)}</td>`;
    }).join("");

    return `<tr height="${height}">${tds}</tr>`;
}

function renderBannerEmpresa(tituloReporte, subtituloReporte, numColumnas, fechaExportacion) {
    return `
        <tr height="38">
            <td colspan="${numColumnas}" align="center" valign="middle" style="background:#1E120B;color:#F7EFE5;font-size:16pt;font-weight:800;letter-spacing:0.6px;border:1px solid #1E120B;padding:10px;">
                CAFÉ PARA SIEMPRE — FINCA LA SIERRA
            </td>
        </tr>
        <tr height="24">
            <td colspan="${numColumnas}" align="center" valign="middle" style="background:#244822;color:#FFFFFF;font-size:10.5pt;font-weight:700;border:1px solid #244822;padding:6px;">
                Vereda La Alacena • Támesis, Antioquia • ${escaparHTML(tituloReporte)}
            </td>
        </tr>
        <tr height="22">
            <td colspan="${numColumnas}" align="center" valign="middle" style="background:#F7EFE5;color:#5A463A;font-size:9pt;font-weight:600;border:1px solid #E6DFD1;padding:5px;">
                ${escaparHTML(subtituloReporte)} • Exportado el ${escaparHTML(fechaExportacion)}
            </td>
        </tr>
        <tr height="12"><td colspan="${numColumnas}" style="background:#FFFFFF;border:none;"></td></tr>
    `;
}

function renderTituloSeccion(titulo, numColumnas, bg = "#C68B59", color = "#1E120B") {
    return `
        <tr height="28">
            <td colspan="${numColumnas}" align="center" valign="middle" style="background:${bg};color:${color};font-size:11pt;font-weight:800;border:1px solid #B57845;padding:7px;">
                ${escaparHTML(titulo)}
            </td>
        </tr>
    `;
}

function renderEncabezadoTabla(headers, bg = "#2C1B12", color = "#FFFFFF") {
    const ths = headers.map(h =>
        `<th align="center" valign="middle" style="background:${bg};color:${color};font-size:10pt;font-weight:700;padding:8px 10px;border:1px solid #1E120B;">${escaparHTML(h)}</th>`
    ).join("");
    return `<tr height="28">${ths}</tr>`;
}

function descargarExcelEstilizado(cuerpoHTML, nombreArchivo) {
    const htmlCompleto = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office"
              xmlns:x="urn:schemas-microsoft-com:office:excel"
              xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta charset="UTF-8">
            <!--[if gte mso 9]>
            <xml>
                <x:ExcelWorkbook>
                    <x:ExcelWorksheets>
                        <x:ExcelWorksheet>
                            <x:Name>Café para Siempre</x:Name>
                            <x:WorksheetOptions>
                                <x:DisplayGridlines/>
                                <x:ProtectContents>False</x:ProtectContents>
                            </x:WorksheetOptions>
                        </x:ExcelWorksheet>
                    </x:ExcelWorksheets>
                </x:ExcelWorkbook>
            </xml>
            <![endif]-->
        </head>
        <body style="font-family:'Calibri','Segoe UI',Arial,sans-serif;background:#FFFFFF;margin:0;padding:12px;">
            <table cellspacing="0" cellpadding="0" border="1" align="center" style="border-collapse:collapse;margin:0 auto;width:100%;">
                ${cuerpoHTML}
            </table>
        </body>
        </html>
    `;

    const blob = new Blob(["\uFEFF" + htmlCompleto], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = nombreArchivo;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
}

function exportarCSV(tipo) {
    const fechaExportacion = new Date().toLocaleString("es-CO");
    const totalStock = inventarioData.reduce((acc, p) => acc + (parseInt(p.stock) || 0), 0);
    const ingresos = contabilidadData.filter(a => a.tipo === 'Ingreso').reduce((acc, a) => acc + (parseInt(a.monto) || 0), 0);
    const egresos = contabilidadData.filter(a => a.tipo === 'Egreso').reduce((acc, a) => acc + (parseInt(a.monto) || 0), 0);
    const utilidad = ingresos - egresos;
    const totalKilos = lotesData.reduce((acc, l) => acc + parseKilosNum(l.kilos), 0);
    const totalJornales = nominaData.reduce((acc, t) => acc + (parseInt(t.jornales) || 0), 0);
    const costoJornales = nominaData.reduce((acc, t) => acc + ((parseInt(t.jornales) || 0) * (parseInt(t.valorJornal) || 0)), 0);

    let html = "";

    if (tipo === 'resumen') {
        const cols = 6;
        html += renderBannerEmpresa("REPORTE EJECUTIVO COMPLETO", "Consolidado de finca, beneficio, personal, insumos, contabilidad, catálogo y pedidos", cols, fechaExportacion);

        html += renderTituloSeccion("INDICADORES PRINCIPALES DEL SISTEMA", cols, "#244822", "#FFFFFF");
        html += renderEncabezadoTabla(["Módulo", "Nombre / Indicador", "Cantidad / Valor", "Detalle Operativo", "Estado General", "Observaciones"], "#1E120B", "#F7EFE5");

        const filasResumen = [
            ["Clientes y Usuarios", "Usuarios Registrados", usuariosData.length, `${usuariosData.filter(u => u.estado === 'Activo').length} activos en plataforma`, "Operativo", "Base de clientes y administradores"],
            ["Inventario y Catálogo", "Unidades en Bodega", `${totalStock} unidades`, `${inventarioData.length} referencias de café`, "Disponible", "Control de existencias por presentación"],
            ["Lotes y Cosecha", "Lotes de Producción", `${lotesData.length} lotes`, `${totalKilos.toLocaleString('es-CO')} kg cosecha acumulada`, "En seguimiento", "Finca La Sierra — Támesis"],
            ["Beneficio y Secado", "Batches Registrados", `${beneficioData.length} batches`, `${beneficioData.filter(b => b.estado.includes('Listo')).length} listos para trilla`, "Control activo", "Fermentación, secado y humedad"],
            ["Personal y Jornales", "Trabajadores de Campo", `${nominaData.length} trabajadores`, `${totalJornales} jornales acumulados`, `$${costoJornales.toLocaleString('es-CO')} COP`, "Costo estimado de mano de obra"],
            ["Insumos Agrícolas", "Insumos en Bodega", `${insumosData.length} insumos`, `${insumosData.filter(i => i.estado !== 'Óptimo').length} con bajo stock o alerta`, "Bodega agrícola", "Nutrición, suelos y control fitosanitario"],
            ["Pedidos de Clientes", "Pedidos Registrados", `${pedidosData.length} pedidos`, `${pedidosData.filter(p => p.estado === 'Entregado').length} entregados`, "Seguimiento envío", "Tienda en línea Café para Siempre"],
            ["Contabilidad", "Total Ingresos Contables", `$${ingresos.toLocaleString('es-CO')} COP`, "Entradas registradas", "Positivo", "Libro contable"],
            ["Contabilidad", "Total Egresos Contables", `$${egresos.toLocaleString('es-CO')} COP`, "Salidas registradas", "Control de gastos", "Libro contable"],
            ["Contabilidad", "Utilidad Neta", `${utilidad >= 0 ? '+' : '-'}$${Math.abs(utilidad).toLocaleString('es-CO')} COP`, "Ingresos menos egresos", utilidad >= 0 ? "Superávit" : "Déficit", "Balance general"]
        ];

        filasResumen.forEach((f, i) => {
            const bg = i % 2 === 0 ? "#FFFFFF" : "#FAF6EE";
            const esUtilidad = f[1] === "Utilidad Neta";
            const colorValor = esUtilidad ? (utilidad >= 0 ? "#1E8449" : "#B83227") : "#1E120B";
            html += renderFilaExcel(f, {
                align: ["center", "center", "center", "center", "center", "center"],
                bg,
                color: "#2A211D",
                bold: esUtilidad
            });
            if (esUtilidad) {
                html = html.replace(
                    `<td align="center" valign="middle" style="background:${bg};color:#2A211D;font-weight:700;font-size:10pt;padding:7px 10px;border:1px solid #D8CBB8;mso-number-format:'\\@';">${escaparHTML(f[2])}</td>`,
                    `<td align="center" valign="middle" style="background:${utilidad >= 0 ? '#E8F8F0' : '#FDECEA'};color:${colorValor};font-weight:800;font-size:10.5pt;padding:7px 10px;border:1px solid #D8CBB8;mso-number-format:'\\@';">${escaparHTML(f[2])}</td>`
                );
            }
        });

        html += `<tr height="14"><td colspan="${cols}" style="background:#FFFFFF;border:none;"></td></tr>`;
        html += renderTituloSeccion("DETALLE DE LOTES Y COSECHA", cols, "#C68B59", "#1E120B");
        html += renderEncabezadoTabla(["ID Lote", "Variedad de Café", "Área", "Cantidad de Árboles", "Cosecha Acumulada", "Destino y Estado"], "#2C1B12", "#FFFFFF");
        lotesData.forEach((l, i) => {
            html += renderFilaExcel([l.id, l.variedad, l.area, l.arboles, l.kilos, `${l.destino} (${l.estado})`], {
                align: "center",
                bg: i % 2 === 0 ? "#FFFFFF" : "#FAF6EE",
                bold: i % 2 === 0
            });
        });

        html += `<tr height="14"><td colspan="${cols}" style="background:#FFFFFF;border:none;"></td></tr>`;
        html += renderTituloSeccion("DETALLE DE INVENTARIO Y CATÁLOGO", cols, "#244822", "#FFFFFF");
        html += renderEncabezadoTabla(["Código", "Nombre Comercial del Café", "Variedad", "Presentación", "Precio Unitario (COP)", "Stock Disponible"], "#2C1B12", "#FFFFFF");
        inventarioData.forEach((p, i) => {
            html += renderFilaExcel([p.id, p.nombre, p.variedad, p.presentacion, `$${Number(p.precio).toLocaleString('es-CO')}`, `${p.stock} unidades`], {
                align: "center",
                bg: i % 2 === 0 ? "#FFFFFF" : "#FAF6EE"
            });
        });

        html += `<tr height="14"><td colspan="${cols}" style="background:#FFFFFF;border:none;"></td></tr>`;
        html += renderTituloSeccion("DETALLE DE PEDIDOS DE CLIENTES", cols, "#C68B59", "#1E120B");
        html += renderEncabezadoTabla(["Número de Pedido", "Nombre del Cliente", "Café Adquirido", "Canal de Venta", "Total del Pedido", "Estado de Envío"], "#2C1B12", "#FFFFFF");
        pedidosData.forEach((p, i) => {
            html += renderFilaExcel([p.id, p.cliente, p.cafe, p.canal, p.total, p.estado], {
                align: "center",
                bg: i % 2 === 0 ? "#FFFFFF" : "#FAF6EE"
            });
        });
    } else if (tipo === 'usuarios') {
        const cols = 6;
        html += renderBannerEmpresa("CLIENTES Y USUARIOS DEL SISTEMA", "Listado completo de cuentas registradas en Café para Siempre", cols, fechaExportacion);
        html += renderTituloSeccion("BASE DE USUARIOS Y CLIENTES", cols, "#244822", "#FFFFFF");
        html += renderEncabezadoTabla(["ID Usuario", "Nombre Completo", "Correo Electrónico", "Teléfono de Contacto", "Rol en Sistema", "Estado de Cuenta"], "#1E120B", "#F7EFE5");
        usuariosData.forEach((u, i) => {
            html += renderFilaExcel([u.id, u.nombre, u.email, u.telefono, u.rol, u.estado], {
                align: "center",
                bg: i % 2 === 0 ? "#FFFFFF" : "#FAF6EE"
            });
        });
    } else if (tipo === 'inventario') {
        const cols = 6;
        html += renderBannerEmpresa("INVENTARIO Y CATÁLOGO DE CAFÉ", "Referencias comerciales, presentaciones, precios y existencias", cols, fechaExportacion);
        html += renderTituloSeccion("PRODUCTOS DISPONIBLES", cols, "#244822", "#FFFFFF");
        html += renderEncabezadoTabla(["Código Producto", "Nombre Comercial", "Variedad de Café", "Presentación", "Precio (COP)", "Unidades en Stock"], "#1E120B", "#F7EFE5");
        inventarioData.forEach((p, i) => {
            html += renderFilaExcel([p.id, p.nombre, p.variedad, p.presentacion, `$${Number(p.precio).toLocaleString('es-CO')}`, `${p.stock} und.`], {
                align: "center",
                bg: i % 2 === 0 ? "#FFFFFF" : "#FAF6EE"
            });
        });
    } else if (tipo === 'insumos') {
        const cols = 7;
        html += renderBannerEmpresa("INSUMOS Y COSTOS AGRÍCOLAS", "Control de nutrición, suelos y sanidad en Finca La Sierra", cols, fechaExportacion);
        html += renderTituloSeccion("BODEGA DE INSUMOS AGRÍCOLAS", cols, "#244822", "#FFFFFF");
        html += renderEncabezadoTabla(["ID Insumo", "Nombre del Insumo Agrícola", "Categoría", "Cantidad en Bodega", "Costo Unitario", "Costo Total", "Estado"], "#1E120B", "#F7EFE5");
        insumosData.forEach((ins, i) => {
            html += renderFilaExcel([ins.id, ins.nombre, ins.cat, ins.cant, ins.costoUnit, ins.costoTotal, ins.estado], {
                align: "center",
                bg: i % 2 === 0 ? "#FFFFFF" : "#FAF6EE"
            });
        });
    } else if (tipo === 'lotes') {
        const cols = 7;
        html += renderBannerEmpresa("LOTES Y DESTINO DE COSECHA", "Seguimiento de variedades, áreas, árboles y producción", cols, fechaExportacion);
        html += renderTituloSeccion("LOTES DE PRODUCCIÓN CAFÉ PARA SIEMPRE", cols, "#244822", "#FFFFFF");
        html += renderEncabezadoTabla(["ID Lote", "Variedad de Café", "Área del Lote", "Cantidad de Árboles", "Cosecha Acumulada", "Destino de Cosecha", "Estado del Lote"], "#1E120B", "#F7EFE5");
        lotesData.forEach((l, i) => {
            html += renderFilaExcel([l.id, l.variedad, l.area, l.arboles, l.kilos, l.destino, l.estado], {
                align: "center",
                bg: i % 2 === 0 ? "#FFFFFF" : "#FAF6EE"
            });
        });
    } else if (tipo === 'contabilidad') {
        const cols = 5;
        html += renderBannerEmpresa("LIBRO CONTABLE — INGRESOS Y EGRESOS", "Registro financiero de operación y balance neto", cols, fechaExportacion);
        html += renderTituloSeccion("MOVIMIENTOS CONTABLES", cols, "#244822", "#FFFFFF");
        html += renderEncabezadoTabla(["Fecha", "Tipo de Movimiento", "Concepto Detallado", "Categoría Contable", "Monto (COP)"], "#1E120B", "#F7EFE5");
        contabilidadData.forEach((a, i) => {
            html += renderFilaExcel([a.fecha, a.tipo, a.concepto, a.categoria, `$${Number(a.monto).toLocaleString('es-CO')}`], {
                align: "center",
                bg: i % 2 === 0 ? "#FFFFFF" : "#FAF6EE"
            });
        });
        html += `<tr height="10"><td colspan="${cols}" style="background:#FFFFFF;border:none;"></td></tr>`;
        html += renderFilaExcel(["", "", "", "Total Ingresos Contables", `$${ingresos.toLocaleString('es-CO')}`], { align: "center", bg: "#E8F8F0", color: "#1E8449", bold: true });
        html += renderFilaExcel(["", "", "", "Total Egresos Contables", `$${egresos.toLocaleString('es-CO')}`], { align: "center", bg: "#FDECEA", color: "#B83227", bold: true });
        html += renderFilaExcel(["", "", "", "Utilidad Neta", `${utilidad >= 0 ? '+' : '-'}$${Math.abs(utilidad).toLocaleString('es-CO')}`], { align: "center", bg: "#F7EFE5", color: "#1E120B", bold: true, fontSize: "11pt" });
    } else if (tipo === 'pedidos') {
        const cols = 6;
        html += renderBannerEmpresa("PEDIDOS DE CLIENTES — CAFÉ PARA SIEMPRE", "Historial de compras y seguimiento de entregas", cols, fechaExportacion);
        html += renderTituloSeccion("PEDIDOS REGISTRADOS", cols, "#244822", "#FFFFFF");
        html += renderEncabezadoTabla(["Número de Pedido", "Nombre del Cliente", "Café Adquirido", "Canal de Venta", "Valor Total", "Estado de Envío"], "#1E120B", "#F7EFE5");
        pedidosData.forEach((p, i) => {
            html += renderFilaExcel([p.id, p.cliente, p.cafe, p.canal, p.total, p.estado], {
                align: "center",
                bg: i % 2 === 0 ? "#FFFFFF" : "#FAF6EE"
            });
        });
    }

    if (html) {
        descargarExcelEstilizado(html, `cafe_para_siempre_${tipo}.xls`);
    }
}

const COFFEE_DOMAIN_KEYWORDS = [
    'cafe', 'coffee', 'taza', 'tinto', 'grano', 'semilla', 'cereza', 'finca', 'tamesis',
    'antioquia', 'colombia', 'arabica', 'robusta', 'geisha', 'borbon', 'caturra', 'castillo', 'tabi',
    'beneficio', 'lavado', 'natural', 'honey', 'secado', 'tueste', 'v60', 'prensa', 'espresso',
    'pedido', 'inventario', 'usuario', 'contabilidad', 'lote'
];

const COFFEE_ENCYCLOPEDIA = [
    { keys: ['que es', 'significa', 'definicion'], resp: "El café es una bebida preparada a partir de las semillas tostadas y molidas del fruto del cafeto. Su sabor depende de la variedad, el origen, el beneficio, el tueste y la preparación." },
    { keys: ['historia', 'origen', 'etiopia', 'yemen'], resp: "El café se asocia originalmente con Etiopía, pasó a Yemen y se extendió a Europa y América. En Támesis, Antioquia, la altura y el clima favorecen cafés de calidad." },
    { keys: ['arabica', 'robusta', 'variedades', 'geisha', 'borbon', 'caturra', 'castillo'], resp: "La variedad Arábica suele dar mayor aroma y dulzor; Robusta aporta más cafeína y cuerpo. Entre las variedades cultivadas destacan Geisha, Borbón, Caturra y Castillo." },
    { keys: ['beneficio', 'lavado', 'natural', 'honey', 'secado'], resp: "En beneficio: el lavado busca limpieza en taza; el natural seca la cereza entera con mayor cuerpo; el honey conserva parte del mucílago durante el secado." },
    { keys: ['v60', 'prensa', 'espresso', 'preparar', 'tueste'], resp: "El tueste define el balance entre acidez, dulzor y cuerpo. V60 resalta claridad, la prensa francesa da más cuerpo y el espresso concentra sabores." }
];

function toggleAdminAIChat() { document.getElementById("adminAiWindow").classList.toggle("active"); }
function handleAdminAIKey(e) { if (e.key === "Enter") processAdminAIQuery(); }
function sendAdminChipQuery(txt) { document.getElementById("adminAiUserInput").value = txt; processAdminAIQuery(); }

function processAdminAIQuery() {
    const input = document.getElementById("adminAiUserInput");
    const msg = input.value.trim();
    if (!msg) return;
    const box = document.getElementById("adminAiMessages");
    box.innerHTML += `<div class="ai-msg user">${msg}</div>`;
    input.value = "";
    box.scrollTop = box.scrollHeight;
    setTimeout(() => {
        box.innerHTML += `<div class="ai-msg bot">${responderConsultaCafeAdmin(msg)}</div>`;
        box.scrollTop = box.scrollHeight;
    }, 200);
}

function responderConsultaCafeAdmin(query) {
    const norm = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!COFFEE_DOMAIN_KEYWORDS.some(k => norm.includes(k))) {
        return "Este asistente responde sobre el mundo del café y la operación de Café para Siempre en Támesis.";
    }
    for (const item of COFFEE_ENCYCLOPEDIA) {
        if (item.keys.some(k => norm.includes(k))) return item.resp;
    }
    return `En el sistema tienes ${usuariosData.length} usuarios, ${lotesData.length} lotes, ${inventarioData.reduce((a,b)=>a+b.stock,0)} unidades en bodega y ${pedidosData.length} pedidos.`;
}

function cerrarSesionSistema() {
    localStorage.removeItem('usuarioActivo');
    localStorage.removeItem('rolUsuario');
}