import { useState, useMemo, useRef, useEffect } from "react";

const TIPOS_CUPO = [
  { codigo: "A", descripcion: "AUGE", tipologia: "NUEVO" },
  { codigo: "AC", descripcion: "AUTORIZADO POR CUADERNO", tipologia: "CONTROL" },
  { codigo: "AD", descripcion: "ADULTO", tipologia: "NUEVO" },
  { codigo: "AO", descripcion: "ANTERIO POSTERIOR", tipologia: "NUEVO" },
  { codigo: "AP", descripcion: "APS", tipologia: "NUEVO" },
  { codigo: "AT", descripcion: "ARTRITIS", tipologia: "CONTROL" },
  { codigo: "AV", descripcion: "ACCIDENTE VASCULAR ENCEFA", tipologia: "CONTROL" },
  { codigo: "BE", descripcion: "BECADOS", tipologia: "CONTROL" },
  { codigo: "BI", descripcion: "BIOPSIA", tipologia: "NUEVO" },
  { codigo: "BR", descripcion: "BRONCOPULMUNAR INF", tipologia: "NUEVO" },
  { codigo: "C", descripcion: "CONTROL", tipologia: "CONTROL" },
  { codigo: "CC", descripcion: "COLONOSCOPIA CORTA", tipologia: "NUEVO" },
  { codigo: "CG", descripcion: "COMGES", tipologia: "NUEVO" },
  { codigo: "CI", descripcion: "CIRUGÍA MENOR", tipologia: "NUEVO" },
  { codigo: "CL", descripcion: "COLONOSCOPÍA LARGA", tipologia: "NUEVO" },
  { codigo: "CN", descripcion: "CIRUGÍA INFANTIL", tipologia: "NUEVO" },
  { codigo: "CR", descripcion: "CIRUGÍA", tipologia: "NUEVO" },
  { codigo: "CS", descripcion: "CISTOSCOPÍA", tipologia: "NUEVO" },
  { codigo: "CU", descripcion: "CURACIÓN", tipologia: "NUEVO" },
  { codigo: "DE", descripcion: "PIEZA ANTERIOR", tipologia: "NUEVO" },
  { codigo: "DO", descripcion: "DOPLEX", tipologia: "NUEVO" },
  { codigo: "EC", descripcion: "ECO DUPLEX CAROTIDEO", tipologia: "NUEVO" },
  { codigo: "ED", descripcion: "ECO DUPLEX EXTREMIDADES", tipologia: "NUEVO" },
  { codigo: "EF", descripcion: "ENFERMEDADES DEL TEJIDO", tipologia: "CONTROL" },
  { codigo: "ER", descripcion: "ECO ARTERIAL RENAL", tipologia: "NUEVO" },
  { codigo: "EX", descripcion: "EXAMENES DE LABORATORIO", tipologia: "NUEVO" },
  { codigo: "FP", descripcion: "FUNCION PULMONAR", tipologia: "NUEVO" },
  { codigo: "FU", descripcion: "FUNCIONARIOS", tipologia: "NUEVO" },
  { codigo: "GA", descripcion: "GASES ARTERIALES", tipologia: "NUEVO" },
  { codigo: "GC", descripcion: "GASTRO CDT", tipologia: "NUEVO" },
  { codigo: "H", descripcion: "HOSPITALIZADO", tipologia: "NUEVO" },
  { codigo: "HE", descripcion: "HEMODINAMIA", tipologia: "CONTROL" },
  { codigo: "HI", descripcion: "HIPERTENCION", tipologia: "NUEVO" },
  { codigo: "HM", descripcion: "HEMOFILIA", tipologia: "CONTROL" },
  { codigo: "IA", descripcion: "INFARTADO AUGE", tipologia: "CONTROL" },
  { codigo: "IO", descripcion: "CRIOTERAPIA", tipologia: "CONTROL" },
  { codigo: "LA", descripcion: "LASER", tipologia: "NUEVO" },
  { codigo: "LH", descripcion: "LINFOMA DE HODGKING", tipologia: "CONTROL" },
  { codigo: "LL", descripcion: "LEUCEMIA LINFATICA CRONIC", tipologia: "CONTROL" },
  { codigo: "LM", descripcion: "LEUCEMIA METODICA CRONICA", tipologia: "CONTROL" },
  { codigo: "LN", descripcion: "LINFOME NO HODGKING", tipologia: "CONTROL" },
  { codigo: "LV", descripcion: "LABORATORIO DE VOZ", tipologia: "NUEVO" },
  { codigo: "MD", descripcion: "MEDICINA", tipologia: "NUEVO" },
  { codigo: "ME", descripcion: "METACOLINA", tipologia: "NUEVO" },
  { codigo: "MM", descripcion: "MELANOMA MULTIPLE", tipologia: "CONTROL" },
  { codigo: "MO", descripcion: "MOLAR", tipologia: "NUEVO" },
  { codigo: "MX", descripcion: "MAXILOFACIAL", tipologia: "NUEVO" },
  { codigo: "N", descripcion: "NUEVO", tipologia: "NUEVO" },
  { codigo: "NI", descripcion: "NIÑOS", tipologia: "NUEVO" },
  { codigo: "NU", descripcion: "NEUROCIRUGIA", tipologia: "NUEVO" },
  { codigo: "OA", descripcion: "OPERATORIA", tipologia: "NUEVO" },
  { codigo: "OC", descripcion: "ONCO AUGE CDT", tipologia: "NUEVO" },
  { codigo: "OD", descripcion: "OXIGENO DEPENDENCIA", tipologia: "CONTROL" },
  { codigo: "OE", descripcion: "ONCO GINE", tipologia: "NUEVO" },
  { codigo: "OG", descripcion: "ONCO GINE CDT", tipologia: "NUEVO" },
  { codigo: "OO", descripcion: "OTORRINO OFTALMOLOGIA", tipologia: "NUEVO" },
  { codigo: "OR", descripcion: "OFTALMOLOGIA RETINA", tipologia: "NUEVO" },
  { codigo: "OT", descripcion: "TEST DE OPERCULO TORAXICO", tipologia: "NUEVO" },
  { codigo: "PA", descripcion: "PARKINSON", tipologia: "NUEVO" },
  { codigo: "PB", descripcion: "PABELLON", tipologia: "CONTROL" },
  { codigo: "PD", descripcion: "PIE DIABETICO", tipologia: "NUEVO" },
  { codigo: "PE", descripcion: "PREMOLAR", tipologia: "NUEVO" },
  { codigo: "PH", descripcion: "PSIQUIATRIA HOSPITAL", tipologia: "NUEVO" },
  { codigo: "PI", descripcion: "PEDIATRIA", tipologia: "NUEVO" },
  { codigo: "PJ", descripcion: "PERITAJE NUEVO", tipologia: "NUEVO" },
  { codigo: "PL", descripcion: "POLIPECTOMIA", tipologia: "NUEVO" },
  { codigo: "PM", descripcion: "PREMATURO", tipologia: "CONTROL" },
  { codigo: "PQ", descripcion: "PSIQUIATRIA POLI", tipologia: "NUEVO" },
  { codigo: "PR", descripcion: "PRAIS", tipologia: "NUEVO" },
  { codigo: "PS", descripcion: "PRIVACION DE SUEÑO", tipologia: "NUEVO" },
  { codigo: "PT", descripcion: "PUNCION TIROIDEA", tipologia: "NUEVO" },
  { codigo: "PU", descripcion: "PARTICULAR", tipologia: "NUEVO" },
  { codigo: "PV", descripcion: "PREVENTIVAS", tipologia: "NUEVO" },
  { codigo: "PZ", descripcion: "PENSIONADO", tipologia: "NUEVO" },
  { codigo: "P1", descripcion: "PLETISMOGRAFIA DIGITAL", tipologia: "NUEVO" },
  { codigo: "QU", descripcion: "QUEMADOS", tipologia: "NUEVO" },
  { codigo: "R", descripcion: "RECETA", tipologia: "CONTROL" },
  { codigo: "RE", descripcion: "REPOSICIONES", tipologia: "NUEVO" },
  { codigo: "RL", descripcion: "RECTOLIGADURA", tipologia: "NUEVO" },
  { codigo: "RR", descripcion: "RECETA", tipologia: "NUEVO" },
  { codigo: "RU", descripcion: "CONTROLES DE URGENCIA", tipologia: "CONTROL" },
  { codigo: "RY", descripcion: "TEST DE RAYNAUD", tipologia: "CONTROL" },
  { codigo: "R3", descripcion: "LEY R. SOTO-N", tipologia: "NUEVO" },
  { codigo: "R4", descripcion: "LEY R. SOTO-C", tipologia: "CONTROL" },
  { codigo: "SI", descripcion: "SIDA", tipologia: "CONTROL" },
  { codigo: "TA", descripcion: "TRATAMIENTO ANTICOAGULANT", tipologia: "CONTROL" },
  { codigo: "TB", descripcion: "TUBERCULOSIS", tipologia: "NUEVO" },
  { codigo: "TC", descripcion: "TEST DE CAMINATA", tipologia: "NUEVO" },
  { codigo: "TE", descripcion: "TEST DE ESFUERZO VASCULAR", tipologia: "NUEVO" },
  { codigo: "TG", descripcion: "TTGO", tipologia: "NUEVO" },
  { codigo: "TI", descripcion: "TRAUMATOLOGIA", tipologia: "NUEVO" },
  { codigo: "TR", descripcion: "TRANSPLANTES", tipologia: "NUEVO" },
  { codigo: "TT", descripcion: "TRATAMIENTO", tipologia: "CONTROL" },
  { codigo: "U", descripcion: "URGENCIA", tipologia: "NUEVO" },
  { codigo: "UC", descripcion: "UCRI", tipologia: "NUEVO" },
  { codigo: "UR", descripcion: "UROLOGIA", tipologia: "NUEVO" },
  { codigo: "VP", descripcion: "PVR", tipologia: "NUEVO" },
];

const DIAS = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"];
const DIAS_SHORT = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];

const CUPO_COLORS = [
  "#2563eb","#16a34a","#dc2626","#9333ea","#ea580c","#0891b2","#be185d",
  "#854d0e","#065f46","#1e3a8a","#7c3aed","#b91c1c","#0369a1","#166534",
];

function getColorForCodigo(codigo) {
  const idx = TIPOS_CUPO.findIndex(t => t.codigo === codigo);
  return CUPO_COLORS[idx % CUPO_COLORS.length];
}

function generateTimeSlots() {
  const slots = [];
  for (let h = 7; h <= 20; h++) {
    for (let m = 0; m < 60; m += 5) {
      slots.push(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`);
    }
  }
  return slots;
}
const TIME_SLOTS = generateTimeSlots();

const INTERVALOS = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120];

export default function AgendaMedica() {
  const [step, setStep] = useState(1);
  const [cabecera, setCabecera] = useState({
    codigoRecurso: "", codigoAgenda: "", nombreProfesional: "",
    especialidad: "", fechaInicio: "", fechaTermino: "",
    escalonada: "SI", modalidadFinanciamiento: "INSTITUCIONAL",
    requiereFicha: "SI", permiteVariasHoras: "NO",
  });
  const [bloques, setBloques] = useState([]);
  const [vistaCalendario, setVistaCalendario] = useState("semanal");
  const [semanaActual, setSemanaActual] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ dia: "", hora: "", semana: 1 });
  const [formBloque, setFormBloque] = useState({ tipoCupo: "", cantidad: 1, intervalo: 15, comentarios: "" });
  const [busquedaCupo, setBusquedaCupo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [conflicto, setConflicto] = useState(null); // { bloque, mensaje }

  // Convierte "HH:MM" a minutos desde medianoche
  function toMinutes(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  }

  // Retorna { inicio, fin } en minutos para un bloque
  function rangoBloque(b) {
    const inicio = toMinutes(b.horaInicio);
    const duracionTotal = b.intervalo * (cabecera.escalonada === "SI" ? b.cantidad : 1);
    return { inicio, fin: inicio + duracionTotal };
  }

  // Verifica si un bloque nuevo se solapa con los existentes (excluyendo editIndex)
  function detectarConflicto(nuevo, excluirIdx = null) {
    const { inicio: nInicio, fin: nFin } = rangoBloque(nuevo);
    for (let i = 0; i < bloques.length; i++) {
      if (i === excluirIdx) continue;
      const b = bloques[i];
      // mismo día y misma semana (o ambos sin semana)
      const mismoDia = b.dia === nuevo.dia;
      const mismaSemana = (b.semana || 0) === (nuevo.semana || 0);
      if (!mismoDia || !mismaSemana) continue;
      const { inicio: bInicio, fin: bFin } = rangoBloque(b);
      // hay sobreposición si los rangos se intersectan
      if (nInicio < bFin && nFin > bInicio) {
        return {
          bloque: b,
          mensaje: `Se superpone con el bloque ${b.tipoCupo} (${b.horaInicio}, ${b.intervalo} min × ${b.cantidad} cupo${b.cantidad > 1 ? "s" : ""}) que ocupa hasta las ${Math.floor(bFin/60).toString().padStart(2,"0")}:${(bFin%60).toString().padStart(2,"0")}.`,
        };
      }
    }
    return null;
  }

  const cuposFiltrados = useMemo(() =>
    TIPOS_CUPO.filter(t =>
      t.codigo.toLowerCase().includes(busquedaCupo.toLowerCase()) ||
      t.descripcion.toLowerCase().includes(busquedaCupo.toLowerCase())
    ), [busquedaCupo]);

  const semanas = useMemo(() => {
    if (!cabecera.fechaInicio || !cabecera.fechaTermino) return [1, 2, 3, 4, 5];
    const start = new Date(cabecera.fechaInicio + "T00:00:00");
    const end = new Date(cabecera.fechaTermino + "T00:00:00");
    if (end < start) return [1];
    // Calcular número de semana ISO para inicio y fin
    const getISOWeek = (d) => {
      const tmp = new Date(d.getTime());
      tmp.setHours(0, 0, 0, 0);
      // Jueves de la semana actual (referencia ISO)
      tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7));
      const week1 = new Date(tmp.getFullYear(), 0, 4);
      return 1 + Math.round(((tmp - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
    };
    // Contar cuántos lunes distintos hay entre inicio y fin (semanas calendario)
    const getLunes = (d) => {
      const tmp = new Date(d.getTime());
      const day = tmp.getDay(); // 0=dom, 1=lun...
      const diff = (day === 0) ? -6 : 1 - day;
      tmp.setDate(tmp.getDate() + diff);
      tmp.setHours(0, 0, 0, 0);
      return tmp;
    };
    let lunesInicio = getLunes(start);
    const lunesFin = getLunes(end);
    let count = 1;
    while (lunesInicio < lunesFin) {
      lunesInicio.setDate(lunesInicio.getDate() + 7);
      count++;
    }
    return Array.from({ length: Math.min(count, 52) }, (_, i) => i + 1);
  }, [cabecera.fechaInicio, cabecera.fechaTermino]);

  const bloquesEnVista = useMemo(() => {
    if (vistaCalendario === "semanal") {
      return bloques.filter(b => !b.semana || b.semana === semanaActual);
    }
    return bloques;
  }, [bloques, vistaCalendario, semanaActual]);

  function abrirModal(dia, hora, semana = semanaActual) {
    setModalData({ dia, hora, semana });
    setFormBloque({ tipoCupo: "", cantidad: 1, intervalo: 15, comentarios: "" });
    setBusquedaCupo("");
    setEditIndex(null);
    setConflicto(null);
    setModalOpen(true);
  }

  function abrirEdicion(idx) {
    const b = bloques[idx];
    setModalData({ dia: b.dia, hora: b.horaInicio, semana: b.semana || semanaActual });
    setFormBloque({ tipoCupo: b.tipoCupo, cantidad: b.cantidad, intervalo: b.intervalo, comentarios: b.comentarios || "" });
    setBusquedaCupo("");
    setEditIndex(idx);
    setConflicto(null);
    setModalOpen(true);
  }

  function guardarBloque() {
    if (!formBloque.tipoCupo) return;
    const nuevo = {
      dia: modalData.dia,
      horaInicio: modalData.hora,
      semana: vistaCalendario === "semanal" ? modalData.semana : null,
      tipoCupo: formBloque.tipoCupo,
      cantidad: formBloque.cantidad,
      intervalo: formBloque.intervalo,
      comentarios: formBloque.comentarios,
    };
    const conflict = detectarConflicto(nuevo, editIndex);
    if (conflict) {
      setConflicto(conflict);
      return;
    }
    setConflicto(null);
    if (editIndex !== null) {
      setBloques(prev => prev.map((b, i) => i === editIndex ? nuevo : b));
    } else {
      setBloques(prev => [...prev, nuevo]);
    }
    setModalOpen(false);
  }

  function eliminarBloque(idx) {
    setBloques(prev => prev.filter((_, i) => i !== idx));
    setModalOpen(false);
  }

  function bloquesParaCelda(dia, hora) {
    return bloques.filter(b => b.dia === dia && b.horaInicio === hora &&
      (vistaCalendario !== "semanal" || !b.semana || b.semana === semanaActual));
  }

  const horasConBloques = useMemo(() => {
    const set = new Set(bloquesEnVista.map(b => b.horaInicio));
    return TIME_SLOTS.filter(t => set.has(t));
  }, [bloquesEnVista]);

  const horasVisibles = useMemo(() => {
    const base = TIME_SLOTS.filter((t, i) => i % 4 === 0);
    const extra = new Set([...horasConBloques, ...base]);
    return TIME_SLOTS.filter(t => extra.has(t));
  }, [horasConBloques]);

  const [modalCopiar, setModalCopiar] = useState(false);

  function copiarSemana1ATodasLasSemanas() {
    const bloquesS1 = bloques.filter(b => b.semana === 1);
    if (bloquesS1.length === 0) return;
    const semanasRestantes = semanas.filter(s => s !== 1);
    const nuevosBloques = [
      ...bloquesS1,
      ...semanasRestantes.flatMap(s =>
        bloquesS1.map(b => ({ ...b, semana: s }))
      ),
    ];
    setBloques(nuevosBloques);
    setModalCopiar(false);
  }

  const pdfRef = useRef(null);
  const [generandoPDF, setGenerandoPDF] = useState(false);

  useEffect(() => {
    // Cargar html2pdf dinámicamente
    if (!window.html2pdf) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      document.head.appendChild(script);
    }
  }, []);

  async function handlePrint() {
    if (!pdfRef.current) return;
    setGenerandoPDF(true);
    try {
      await window.html2pdf()
        .set({
          margin: 10,
          filename: `agenda_${cabecera.codigoAgenda || "medica"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        })
        .from(pdfRef.current)
        .save();
    } finally {
      setGenerandoPDF(false);
    }
  }

  const cabeceraCompleta = cabecera.codigoRecurso && cabecera.codigoAgenda &&
    cabecera.nombreProfesional && cabecera.especialidad &&
    cabecera.fechaInicio && cabecera.fechaTermino;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f0f4f8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0f4f8; }
        .btn-primary { background: #1d4ed8; color: #fff; border: none; border-radius: 8px; padding: 10px 22px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.15s; font-family: inherit; }
        .btn-primary:hover { background: #1e40af; }
        .btn-primary:disabled { background: #93c5fd; cursor: not-allowed; }
        .btn-secondary { background: #fff; color: #1d4ed8; border: 1.5px solid #1d4ed8; border-radius: 8px; padding: 10px 22px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .btn-secondary:hover { background: #eff6ff; }
        .btn-danger { background: #fee2e2; color: #dc2626; border: none; border-radius: 8px; padding: 8px 16px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .btn-danger:hover { background: #fecaca; }
        .input-field { width: 100%; padding: 9px 13px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 14px; font-family: inherit; outline: none; transition: border 0.15s; background: #fff; }
        .input-field:focus { border-color: #1d4ed8; }
        .select-field { width: 100%; padding: 9px 13px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 14px; font-family: inherit; outline: none; background: #fff; cursor: pointer; }
        .select-field:focus { border-color: #1d4ed8; }
        .label { font-size: 12px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px; display: block; }
        .card { background: #fff; border-radius: 14px; padding: 28px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
        .step-indicator { display: flex; gap: 8px; align-items: center; }
        .step-dot { width: 10px; height: 10px; border-radius: 50%; }
        .cal-cell { min-height: 44px; border: 1px solid #e2e8f0; padding: 3px; cursor: pointer; transition: background 0.1s; position: relative; vertical-align: top; }
        .cal-cell:hover { background: #eff6ff; }
        .cal-header { background: #1d4ed8; color: #fff; padding: 10px 8px; font-size: 12px; font-weight: 700; text-align: center; letter-spacing: 0.04em; }
        .cal-time { background: #f8fafc; padding: 8px 10px; font-size: 11px; font-weight: 600; color: #64748b; font-family: 'DM Mono', monospace; text-align: right; white-space: nowrap; border: 1px solid #e2e8f0; }
        .bloque-chip { border-radius: 5px; padding: 3px 6px; font-size: 11px; font-weight: 700; color: #fff; margin: 1px; display: inline-flex; align-items: center; gap: 3px; cursor: pointer; white-space: nowrap; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal { background: #fff; border-radius: 16px; padding: 28px; width: 440px; max-width: 95vw; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
        .cupo-option { padding: 8px 12px; border-radius: 7px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.1s; }
        .cupo-option:hover { background: #eff6ff; }
        .cupo-badge { width: 32px; height: 24px; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .vista-toggle { display: flex; border: 1.5px solid #cbd5e1; border-radius: 8px; overflow: hidden; }
        .vista-btn { padding: 7px 16px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .semana-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
        .semana-tab { padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; border: 1.5px solid #cbd5e1; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .grilla-row { display: grid; grid-template-columns: 90px repeat(7, 1fr); border-bottom: 1px solid #e2e8f0; }
        @media print {
          .no-print { display: none !important; }
          body { background: #fff; }
          .card { box-shadow: none; }
        }
      `}</style>

      {/* Header */}
      <div style={{ background: "#1d4ed8", color: "#fff", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }} className="no-print">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏥</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Generador de Agendas Médicas</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Sistema de confección de agendas</div>
          </div>
        </div>
        <div className="step-indicator">
          {[1, 2, 3].map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div className="step-dot" style={{ background: step >= s ? "#fff" : "rgba(255,255,255,0.3)", width: step === s ? 14 : 10, height: step === s ? 14 : 10 }} />
              {s < 3 && <div style={{ width: 24, height: 2, background: step > s ? "#fff" : "rgba(255,255,255,0.3)" }} />}
            </div>
          ))}
          <span style={{ fontSize: 12, opacity: 0.9, marginLeft: 8 }}>Paso {step} de 3</span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px" }}>

        {/* PASO 1: Cabecera */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Datos de la Agenda</h2>
              <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>Complete la información del profesional y configuración de la agenda.</p>
            </div>
            <div className="card">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label className="label">Código Recurso *</label>
                  <input className="input-field" value={cabecera.codigoRecurso} onChange={e => setCabecera(p => ({ ...p, codigoRecurso: e.target.value }))} placeholder="Ej: REC001" />
                </div>
                <div>
                  <label className="label">Código Agenda *</label>
                  <input className="input-field" value={cabecera.codigoAgenda} onChange={e => setCabecera(p => ({ ...p, codigoAgenda: e.target.value }))} placeholder="Ej: AG2024001" />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label className="label">Nombre Profesional *</label>
                  <input className="input-field" value={cabecera.nombreProfesional} onChange={e => setCabecera(p => ({ ...p, nombreProfesional: e.target.value }))} placeholder="Nombre completo del profesional" />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label className="label">Especialidad o Estamento *</label>
                  <input className="input-field" value={cabecera.especialidad} onChange={e => setCabecera(p => ({ ...p, especialidad: e.target.value }))} placeholder="Ej: Medicina Interna, Enfermería..." />
                </div>
                <div>
                  <label className="label">Fecha Inicio *</label>
                  <input type="date" className="input-field" value={cabecera.fechaInicio} onChange={e => setCabecera(p => ({ ...p, fechaInicio: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Fecha Término *</label>
                  <input type="date" className="input-field" value={cabecera.fechaTermino} onChange={e => setCabecera(p => ({ ...p, fechaTermino: e.target.value }))} />
                </div>
              </div>

              <div style={{ borderTop: "1.5px solid #f1f5f9", marginTop: 24, paddingTop: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>Configuración de la Agenda</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
                  {[
                    { key: "escalonada", label: "Escalonada" },
                    { key: "requiereFicha", label: "Requiere Ficha" },
                    { key: "permiteVariasHoras", label: "Permite +1 hora/día" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="label">{label}</label>
                      <select className="select-field" value={cabecera[key]} onChange={e => setCabecera(p => ({ ...p, [key]: e.target.value }))}>
                        <option value="SI">SÍ</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>
                  ))}
                  <div>
                    <label className="label">Modalidad Financiamiento</label>
                    <select className="select-field" value={cabecera.modalidadFinanciamiento} onChange={e => setCabecera(p => ({ ...p, modalidadFinanciamiento: e.target.value }))}>
                      <option>INSTITUCIONAL</option>
                      <option>PLAN 500</option>
                      <option>OPERATIVO</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-primary" disabled={!cabeceraCompleta} onClick={() => setStep(2)}>
                  Continuar → Calendario
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PASO 2: Calendario */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: 20, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Calendario de Cupos</h2>
                <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
                  {cabecera.nombreProfesional} — {cabecera.especialidad} &nbsp;|&nbsp; {bloques.length} bloque{bloques.length !== 1 ? "s" : ""} agregado{bloques.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <div className="vista-toggle">
                  <button className="vista-btn" onClick={() => setVistaCalendario("semanal")} style={{ background: vistaCalendario === "semanal" ? "#1d4ed8" : "#fff", color: vistaCalendario === "semanal" ? "#fff" : "#475569" }}>Semanal</button>
                  <button className="vista-btn" onClick={() => setVistaCalendario("mensual")} style={{ background: vistaCalendario === "mensual" ? "#1d4ed8" : "#fff", color: vistaCalendario === "mensual" ? "#fff" : "#475569" }}>Mensual</button>
                </div>
                <button className="btn-secondary" onClick={() => setStep(1)}>← Volver</button>
                <button className="btn-primary" disabled={bloques.length === 0} onClick={() => setStep(3)}>Ver Resumen →</button>
              </div>
            </div>

            {vistaCalendario === "semanal" && semanas.length > 1 && (
              <div className="card no-print" style={{ padding: "14px 20px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Semana:</span>
                    <div className="semana-tabs">
                      {semanas.map(s => (
                        <button key={s} className="semana-tab" onClick={() => setSemanaActual(s)}
                          style={{ background: semanaActual === s ? "#1d4ed8" : "#fff", color: semanaActual === s ? "#fff" : "#475569", borderColor: semanaActual === s ? "#1d4ed8" : "#cbd5e1" }}>
                          Semana {s}
                          {bloques.filter(b => b.semana === s).length > 0 && (
                            <span style={{ marginLeft: 5, background: semanaActual === s ? "rgba(255,255,255,0.3)" : "#e0e7ff", color: semanaActual === s ? "#fff" : "#1d4ed8", borderRadius: 10, padding: "1px 6px", fontSize: 10 }}>
                              {bloques.filter(b => b.semana === s).length}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  {bloques.filter(b => b.semana === 1).length > 0 && (
                    <button onClick={() => setModalCopiar(true)}
                      style={{ background: "#f0fdf4", color: "#16a34a", border: "1.5px solid #86efac", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                      📋 Copiar Semana 1 → Todas las semanas
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                  <thead>
                    <tr>
                      <th style={{ background: "#0f172a", color: "#fff", padding: "10px 12px", fontSize: 11, fontWeight: 700, textAlign: "left", width: 80 }}>HORA</th>
                      {DIAS.map((dia, i) => (
                        <th key={dia} className="cal-header">{vistaCalendario === "semanal" ? DIAS_SHORT[i] : dia}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {horasVisibles.map(hora => (
                      <tr key={hora}>
                        <td className="cal-time">{hora}</td>
                        {DIAS.map(dia => {
                          const bls = bloquesParaCelda(dia, hora);
                          return (
                            <td key={dia} className="cal-cell" onClick={() => abrirModal(dia, hora)}>
                              {bls.map((b, bi) => {
                                const idx = bloques.findIndex(x => x === b);
                                const color = getColorForCodigo(b.tipoCupo);
                                return (
                                  <div key={bi} className="bloque-chip" style={{ background: color }}
                                    onClick={e => { e.stopPropagation(); abrirEdicion(idx); }}>
                                    <span>{b.tipoCupo}</span>
                                    <span style={{ opacity: 0.85, fontSize: 10 }}>×{b.cantidad}</span>
                                  </div>
                                );
                              })}
                              {bls.length === 0 && (
                                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.1s" }}
                                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                  onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                                  <span style={{ fontSize: 18, color: "#93c5fd" }}>+</span>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    {/* Empty rows for clicking */}
                    {["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"].filter(h => !horasVisibles.includes(h)).slice(0,3).map(hora => (
                      <tr key={"empty-" + hora}>
                        <td className="cal-time">{hora}</td>
                        {DIAS.map(dia => (
                          <td key={dia} className="cal-cell" onClick={() => abrirModal(dia, hora)}>
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.1s" }}
                              onMouseEnter={e => e.currentTarget.style.opacity = 1}
                              onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                              <span style={{ fontSize: 18, color: "#93c5fd" }}>+</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: "12px 16px", background: "#f8fafc", borderTop: "1px solid #e2e8f0", fontSize: 12, color: "#64748b" }}>
                💡 Haz clic en cualquier celda del calendario para agregar un bloque de cupos. Clic en un bloque para editarlo o eliminarlo.
              </div>
            </div>
          </div>
        )}

        {/* PASO 3: Resumen y PDF */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }} className="no-print">
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Resumen de Agenda</h2>
                <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>Revisa los datos y genera el PDF con el formato oficial.</p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-secondary" onClick={() => setStep(2)}>← Volver</button>
                <button className="btn-primary" onClick={handlePrint} disabled={generandoPDF}>
                  {generandoPDF ? "⏳ Generando..." : "⬇️ Descargar PDF"}
                </button>
              </div>
            </div>

            {/* Formato de impresión */}
            <div ref={pdfRef} className="card" style={{ fontFamily: "Arial, sans-serif" }}>
              {/* Título */}
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", letterSpacing: 1 }}>CREAR AGENDA</div>
              </div>

              {/* Cabecera */}
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 4, fontSize: 12 }}>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #000", padding: "5px 8px", fontWeight: 700, background: "#e2e8f0", width: "20%" }}>CÓDIGO RECURSO</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px", width: "30%" }}>{cabecera.codigoRecurso}</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px", fontWeight: 700, background: "#e2e8f0", width: "20%" }}>CÓDIGO AGENDA</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px", width: "30%" }}>{cabecera.codigoAgenda}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #000", padding: "5px 8px", fontWeight: 700, background: "#e2e8f0" }}>NOMBRE PROFESIONAL</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px" }} colSpan={3}>{cabecera.nombreProfesional}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #000", padding: "5px 8px", fontWeight: 700, background: "#e2e8f0" }}>ESPECIALIDAD / ESTAMENTO</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px" }}>{cabecera.especialidad}</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px", fontWeight: 700, background: "#e2e8f0" }}>FECHA INICIO</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px" }}>{cabecera.fechaInicio}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #000", padding: "5px 8px", fontWeight: 700, background: "#e2e8f0" }}>ESCALONADA</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px" }}>{cabecera.escalonada}</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px", fontWeight: 700, background: "#e2e8f0" }}>FECHA TÉRMINO</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px" }}>{cabecera.fechaTermino}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #000", padding: "5px 8px", fontWeight: 700, background: "#e2e8f0" }}>MODALIDAD FINANCIAMIENTO</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px" }}>{cabecera.modalidadFinanciamiento}</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px", fontWeight: 700, background: "#e2e8f0" }}>REQUIERE FICHA</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px" }}>{cabecera.requiereFicha}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid #000", padding: "5px 8px", fontWeight: 700, background: "#e2e8f0" }}>PERMITE MÁS DE UNA HORA AL DÍA</td>
                    <td style={{ border: "1px solid #000", padding: "5px 8px" }} colSpan={3}>{cabecera.permiteVariasHoras}</td>
                  </tr>
                </tbody>
              </table>

              {/* Grilla de detalle */}
              <div style={{ marginTop: 20, fontSize: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13 }}>DETALLE DE AGENDA</div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #000", padding: "5px 6px", background: "#1d4ed8", color: "#fff", fontSize: 11, textAlign: "center" }}>SEMANA</th>
                      <th style={{ border: "1px solid #000", padding: "5px 6px", background: "#1d4ed8", color: "#fff", fontSize: 11, textAlign: "center" }}>DÍA</th>
                      <th style={{ border: "1px solid #000", padding: "5px 6px", background: "#1d4ed8", color: "#fff", fontSize: 11, textAlign: "center" }}>HORA INICIO</th>
                      <th style={{ border: "1px solid #000", padding: "5px 6px", background: "#1d4ed8", color: "#fff", fontSize: 11, textAlign: "center" }}>INTERVALO (min)</th>
                      <th style={{ border: "1px solid #000", padding: "5px 6px", background: "#1d4ed8", color: "#fff", fontSize: 11, textAlign: "center" }}>TIPO CUPO</th>
                      <th style={{ border: "1px solid #000", padding: "5px 6px", background: "#1d4ed8", color: "#fff", fontSize: 11, textAlign: "center" }}>CUPOS</th>
                      <th style={{ border: "1px solid #000", padding: "5px 6px", background: "#1d4ed8", color: "#fff", fontSize: 11, textAlign: "center" }}>COMENTARIOS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bloques.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ border: "1px solid #000", padding: "12px", textAlign: "center", color: "#94a3b8" }}>Sin bloques agregados</td>
                      </tr>
                    ) : (
                      [...bloques]
                        .sort((a, b) => {
                          const semA = a.semana || 0, semB = b.semana || 0;
                          if (semA !== semB) return semA - semB;
                          const dA = DIAS.indexOf(a.dia), dB = DIAS.indexOf(b.dia);
                          if (dA !== dB) return dA - dB;
                          return a.horaInicio.localeCompare(b.horaInicio);
                        })
                        .map((b, i) => {
                          const tipo = TIPOS_CUPO.find(t => t.codigo === b.tipoCupo);
                          return (
                            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                              <td style={{ border: "1px solid #d1d5db", padding: "4px 6px", textAlign: "center" }}>{b.semana ? `SEMANA ${b.semana}` : ""}</td>
                              <td style={{ border: "1px solid #d1d5db", padding: "4px 6px", textAlign: "center" }}>{b.dia}</td>
                              <td style={{ border: "1px solid #d1d5db", padding: "4px 6px", textAlign: "center", fontFamily: "monospace" }}>{b.horaInicio}</td>
                              <td style={{ border: "1px solid #d1d5db", padding: "4px 6px", textAlign: "center" }}>{b.intervalo}</td>
                              <td style={{ border: "1px solid #d1d5db", padding: "4px 6px", textAlign: "center" }}>
                                <span style={{ background: getColorForCodigo(b.tipoCupo), color: "#fff", borderRadius: 4, padding: "2px 6px", fontSize: 11, fontWeight: 700 }}>{b.tipoCupo}</span>
                                <span style={{ marginLeft: 6, color: "#475569" }}>{tipo?.descripcion}</span>
                              </td>
                              <td style={{ border: "1px solid #d1d5db", padding: "4px 6px", textAlign: "center" }}>{b.cantidad}</td>
                              <td style={{ border: "1px solid #d1d5db", padding: "4px 6px" }}>{b.comentarios}</td>
                            </tr>
                          );
                        })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Leyenda tipos de cupo usados */}
              {bloques.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 12 }}>TIPOS DE CUPO UTILIZADOS</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {[...new Set(bloques.map(b => b.tipoCupo))].map(cod => {
                      const tipo = TIPOS_CUPO.find(t => t.codigo === cod);
                      return (
                        <div key={cod} style={{ display: "flex", alignItems: "center", gap: 5, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "3px 8px", fontSize: 11 }}>
                          <span style={{ background: getColorForCodigo(cod), color: "#fff", borderRadius: 3, padding: "1px 5px", fontWeight: 700 }}>{cod}</span>
                          <span>{tipo?.descripcion}</span>
                          <span style={{ color: "#94a3b8" }}>({tipo?.tipologia})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal agregar/editar bloque */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                  {editIndex !== null ? "Editar bloque" : "Agregar cupos"}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
                  {modalData.dia} — {modalData.hora}
                  {vistaCalendario === "semanal" && semanas.length > 1 && ` — Semana ${modalData.semana}`}
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} style={{ border: "none", background: "none", fontSize: 20, cursor: "pointer", color: "#94a3b8" }}>×</button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Hora de inicio</label>
              <select className="select-field" value={modalData.hora} onChange={e => { setConflicto(null); setModalData(p => ({ ...p, hora: e.target.value })); }}>
                {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              <div>
                <label className="label">Intervalo (minutos)</label>
                <select className="select-field" value={formBloque.intervalo} onChange={e => { setConflicto(null); setFormBloque(p => ({ ...p, intervalo: Number(e.target.value) })); }}>
                  {INTERVALOS.map(i => <option key={i} value={i}>{i} min</option>)}
                </select>
              </div>
              <div>
                <label className="label">Cantidad de cupos</label>
                <input type="number" min={1} max={99} className="input-field" value={formBloque.cantidad} onChange={e => { setConflicto(null); setFormBloque(p => ({ ...p, cantidad: Number(e.target.value) })); }} />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Tipo de cupo *</label>
              <input className="input-field" placeholder="Buscar por código o nombre..." value={busquedaCupo} onChange={e => setBusquedaCupo(e.target.value)} style={{ marginBottom: 8 }} />
              <div style={{ maxHeight: 180, overflowY: "auto", border: "1.5px solid #e2e8f0", borderRadius: 8 }}>
                {cuposFiltrados.slice(0, 20).map(t => (
                  <div key={t.codigo} className="cupo-option"
                    style={{ background: formBloque.tipoCupo === t.codigo ? "#eff6ff" : undefined }}
                    onClick={() => setFormBloque(p => ({ ...p, tipoCupo: t.codigo }))}>
                    <div className="cupo-badge" style={{ background: getColorForCodigo(t.codigo) }}>{t.codigo}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{t.descripcion}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{t.tipologia}</div>
                    </div>
                    {formBloque.tipoCupo === t.codigo && <span style={{ marginLeft: "auto", color: "#1d4ed8", fontSize: 16 }}>✓</span>}
                  </div>
                ))}
                {cuposFiltrados.length === 0 && <div style={{ padding: 16, color: "#94a3b8", fontSize: 13, textAlign: "center" }}>Sin resultados</div>}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="label">Comentarios (opcional)</label>
              <input className="input-field" placeholder="Observaciones adicionales..." value={formBloque.comentarios} onChange={e => { setConflicto(null); setFormBloque(p => ({ ...p, comentarios: e.target.value })); }} />
            </div>

            {conflicto && (
              <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "12px 14px", marginBottom: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#dc2626", fontSize: 13, marginBottom: 3 }}>Superposición de horarios detectada</div>
                  <div style={{ color: "#7f1d1d", fontSize: 12, lineHeight: 1.5 }}>{conflicto.mensaje}</div>
                  <div style={{ color: "#7f1d1d", fontSize: 12, marginTop: 4 }}>Ajusta la hora de inicio, el intervalo o la cantidad de cupos para evitar la superposición.</div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
              {editIndex !== null && <button className="btn-danger" onClick={() => eliminarBloque(editIndex)}>🗑 Eliminar</button>}
              <div style={{ display: "flex", gap: 10, marginLeft: "auto" }}>
                <button className="btn-secondary" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button className="btn-primary" disabled={!formBloque.tipoCupo} onClick={guardarBloque}>
                  {editIndex !== null ? "Guardar cambios" : "Agregar bloque"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal confirmación copiar semana 1 */}
      {modalCopiar && (
        <div className="modal-overlay" onClick={() => setModalCopiar(false)}>
          <div className="modal" style={{ width: 400 }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
                Copiar Semana 1 a todas las semanas
              </div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
                Esto reemplazará los bloques de las semanas 2 a {semanas.length} con los {bloques.filter(b => b.semana === 1).length} bloques de la Semana 1.
              </div>
              {semanas.slice(1).some(s => bloques.filter(b => b.semana === s).length > 0) && (
                <div style={{ marginTop: 12, background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#92400e" }}>
                  ⚠️ Las semanas {semanas.slice(1).filter(s => bloques.filter(b => b.semana === s).length > 0).map(s => `Semana ${s}`).join(", ")} ya tienen bloques configurados. Serán reemplazados.
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button className="btn-secondary" onClick={() => setModalCopiar(false)}>Cancelar</button>
              <button className="btn-primary" onClick={copiarSemana1ATodasLasSemanas}>
                ✓ Sí, copiar a todas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
