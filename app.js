// app.js

// --- INICIO CONFIGURACIÓN FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdebHVRx9sjd-R3SmX688mCMBJHY8FslE",
  authDomain: "domingo-baf09.firebaseapp.com",
  databaseURL: "https://domingo-baf09-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "domingo-baf09",
  storageBucket: "domingo-baf09.firebasestorage.app",
  messagingSenderId: "1071812210485",
  appId: "1:1071812210485:web:9d49812c4c9c84525aa67c",
  measurementId: "G-2E8KYMYKS6"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

let sessionId = null; // Para registrar si el mismo usuario entra varias veces

function registrarAccion(bloqueId, textoOpcion, esCorrecta = null) {
  if (!userName || !sessionId) return;
  const dbRef = ref(db, `historial_rutas/${userName}/${sessionId}`);
  push(dbRef, {
    bloque: bloqueId,
    opcion: textoOpcion,
    esCorrecta: esCorrecta,
    timestamp: new Date().toISOString()
  }).catch(err => console.error("Error guardando en Firebase:", err));
}
// --- FIN CONFIGURACIÓN FIREBASE ---

const AUDIO_EXT = 'mp3';
const IMAGE_EXT = 'png';
const VALID_NAMES = ['adrian', 'alejandro', 'carlos', 'manuel', 'miguel', 'luca', 'mihai'];

const normalizeName = value =>
  value.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const getPersona = n => {
  const m = {
    mihai: 'Blaster',
    miguel: 'Luca',
    carlos: 'Fufo',
    luca: 'Pichillas',
    alejandro: 'Mihai',
    manuel: 'Madero',
    adrian: 'Blaster'
  };
  return m[normalizeName(n)] || 'Blaster';
};

const rv = (t, u, p) =>
  String(t)
    .replace(/\{usuario\}/gi, u)
    .replace(/\{persona\}/gi, p)
    .replace(/\[Usuario\]/g, u)
    .replace(/\[Persona\]/g, p);

const now = () => {
  const d = new Date();
  return d.getHours() + ':' + d.getMinutes().toString().padStart(2, '0');
};

const a = id => ({ type: 'audio', content: '', audioId: id });
const t = c => ({ type: 'text', content: c });
const img = (id, c, temp) => ({ type: 'image', content: c, imageId: id, isTemp: !!temp });
const sys = c => ({ type: 'system', content: c });

const BLOCKS = {
  intro: {
    messages: [a('audio1')],
    options: [{ label: 'Vamos a darle 💪', next: 'bloque1' }]
  },

  bloque1: {
    messages: [t('Estate atento 👀'), a('audio2')],
    options: [
      { label: 'Me vas a comer los huevos 🥚', next: 'bloque1a' },
      { label: 'Pero todo esto ¿por qué me lo cuentas? 🤔', next: 'bloque1b' }
    ]
  },

  bloque1a: {
    messages: [a('audio3'), t('A ver bobo, si te has enterado de esto 👇')],
    quiz: {
      question: 'Toda esa electricidad brutal que entra a los servidores para procesar datos... ¿en qué acaba transformándose casi al 100%?',
      answers: [
        { text: 'En ruido de los ventiladores', correct: false },
        { text: 'En potencia de red extra', correct: false },
        { text: 'En puro calor residual 🔥', correct: true },
        { text: 'Se consume y desaparece', correct: false }
      ],
      wrongAudioId: 'audio4',
      wrongText: '',
      correctFirstAudioId: 'audio5',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio6',
      correctAfterFailText: '',
      next: 'bloque2'
    }
  },

  bloque1b: {
    messages: [a('audio7'), t('Va zagal, te voy a poner a prueba 💪')],
    quiz: {
      question: '¿Por qué un centro de datos necesita climatización constante?',
      answers: [
        { text: 'Para que los trabajadores estén cómodos', correct: false },
        { text: 'Porque toda la electricidad se convierte en calor y sin refrigeración los equipos se funden 🔥', correct: true },
        { text: 'Porque los servidores necesitan humedad para funcionar', correct: false },
        { text: 'Para mantener el ruido de los ventiladores bajo', correct: false }
      ],
      wrongAudioId: 'audio8',
      wrongText: '',
      correctFirstAudioId: 'audio9',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio10',
      correctAfterFailText: '',
      next: 'bloque2'
    }
  },

  bloque2: {
    messages: [a('audio11'), t('A ver si te entra en la cabeza, responde a esto sin cagarla 🧠')],
    quiz: {
      question: '¿Por qué demonios nos gastamos un pastizal en separar los servidores en "pasillos fríos" y "pasillos calientes" cerrados con puertas?',
      answers: [
        { text: 'Para que los técnicos no pasen frío al pasear', correct: false },
        { text: 'Porque las luces del pasillo caliente consumen menos', correct: false },
        { text: 'Para evitar que el aire ardiendo que escupen los servidores se mezcle con el aire frío que entra 🌡️', correct: true },
        { text: 'Para separar los servidores caros de los baratos', correct: false }
      ],
      wrongAudioId: 'audio12',
      wrongText: '',
      correctFirstAudioId: 'audio13',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio14',
      correctAfterFailText: '',
      next: 'bloque3'
    }
  },

  bloque3: {
    messages: [a('audio15'), t('Elige tu veneno, ¿de qué te hablo ahora? 🧪')],
    options: [
      { label: 'Háblame de cómo medís la eficiencia (PUE) 📊', next: 'bloque3a' },
      { label: 'He oído que abrís la ventana y entra aire (Free Cooling) 🌬️', next: 'bloque3b' },
      { label: '¿No es mejor usar agua fría? (Chillers) 💧', next: 'bloque3c' }
    ]
  },

  bloque3a: {
    messages: [a('audio16'), t('A ver si sabes matemáticas de primaria 🔢')],
    quiz: {
      question: 'Si el jefe me dice que tenemos un PUE de 2.0 y quiere que lo bajemos a 1.2... ¿Qué significa ese 2.0?',
      answers: [
        { text: 'Que tenemos 2 servidores por cada aparato de aire', correct: false },
        { text: 'Que estamos gastando el doble de energía: por cada vatio del servidor, tiramos otro en clima ⚡', correct: true },
        { text: 'Que el centro es el doble de eficiente de normal', correct: false },
        { text: 'Que la temperatura está a 20 grados', correct: false }
      ],
      wrongAudioId: 'audio17',
      wrongText: '',
      correctFirstAudioId: 'audio18',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio19',
      correctAfterFailText: '',
      next: 'bloque4'
    }
  },

  bloque3b: {
    messages: [a('audio20'), t('Pregunta de geografía, a ver cómo andas de lógica 🗺️')],
    quiz: {
      question: 'Si quiero basar todo mi Data Center en Free Cooling para ahorrar dinero... ¿Dónde narices construyo el edificio?',
      answers: [
        { text: 'En el desierto del Sahara, donde hay mucho espacio 🏜️', correct: false },
        { text: 'Debajo de la tierra en Sevilla', correct: false },
        { text: 'En países fríos como Islandia o Noruega ❄️', correct: true },
        { text: 'En el centro de Madrid', correct: false }
      ],
      wrongAudioId: 'audio21',
      wrongText: '',
      correctFirstAudioId: 'audio22',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio23',
      correctAfterFailText: '',
      next: 'bloque4'
    }
  },

  bloque3c: {
    messages: [a('audio24'), t('Demuestra que no eres un peligro público ⚠️')],
    quiz: {
      question: 'Si meter agua cerca de cables eléctricos da tanto miedo... ¿Por qué demonios lo hacemos?',
      answers: [
        { text: 'Porque el agua sale gratis y la cogemos de la lluvia', correct: false },
        { text: 'Porque los servidores flotan si hay inundación', correct: false },
        { text: 'Porque el agua transporta el calor muchísimo mejor que el aire 🌊', correct: true },
        { text: 'Para limpiar los servidores por dentro', correct: false }
      ],
      wrongAudioId: 'audio25',
      wrongText: '',
      correctFirstAudioId: 'audio26',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio27',
      correctAfterFailText: '',
      next: 'bloque4'
    }
  },

  bloque4: {
    messages: [a('audio28'), t('Venga, elige algo que te divierta para no dormirnos 😄')],
    options: [
      { label: '¿Cómo ves la liga de fútbol este año? ⚽', next: 'bloque4_futbol' },
      { label: '¿Inviertes en Bitcoin o en bolsa? 💰', next: 'bloque4_bolsa' },
      { label: 'Menudo tiempo de locos hace últimamente ☁️', next: 'bloque4_tiempo' }
    ]
  },

  bloque4_futbol: {
    messages: [a('audio29')],
    autoNext: 'bloque4_tema_real'
  },

  bloque4_bolsa: {
    messages: [a('audio30')],
    autoNext: 'bloque4_tema_real'
  },

  bloque4_tiempo: {
    messages: [a('audio31')],
    autoNext: 'bloque4_tema_real'
  },

  bloque4_tema_real: {
    messages: [a('audio32'), t('A ver si prestas atención a lo moderno 🧪')],
    quiz: {
      question: 'Si tengo un rack lleno de GPUs para Inteligencia Artificial que generan un calor insoportable... ¿Qué técnica extrema tengo que usar?',
      answers: [
        { text: 'Poner ventiladores más grandes y rápidos', correct: false },
        { text: 'Usar Inmersión o Refrigeración Directa al Chip 💧', correct: true },
        { text: 'Bajar la temperatura del aire a cero grados', correct: false },
        { text: 'Abrir las ventanas de par en par', correct: false }
      ],
      wrongAudioId: 'audio33',
      wrongText: '',
      correctFirstAudioId: 'audio34',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio35',
      correctAfterFailText: '',
      next: 'bloque5_intro'
    }
  },

  bloque5_intro: {
    messages: [
      a('audio36'),
      img('cat', 'Foto de un gato sobre un router', true),
      a('audio37')
    ],
    autoNext: 'bloque5'
  },

  bloque5: {
    messages: [
      { type: 'image', content: 'Imagen térmica del rack', imageId: 'thermal', removeTemp: true },
      a('audio38'),
      t('Pregunta seria, que nos jugamos el tipo 🎯')
    ],
    quiz: {
      question: 'Estás mirando la cámara térmica y ves una mancha roja gigante en un rack del pasillo frío. ¿Cuál es el motivo más probable?',
      answers: [
        { text: 'Que el servidor ha pillado un virus informático 🦠', correct: false },
        { text: 'Que alguien ha dejado un hueco libre en el rack sin tapar y el aire se está fugando 🕳️', correct: true },
        { text: 'Que Rufo el gato se ha colado en el Data Center 🐱', correct: false },
        { text: 'Apago el centro de datos entero dándole a la seta de emergencia 🔴', correct: false }
      ],
      wrongAudioId: 'audio39',
      wrongText: '',
      correctFirstAudioId: 'audio40',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio41',
      correctAfterFailText: '',
      next: 'bloque6_intro'
    }
  },

  bloque6_intro: {
    messages: [a('audio42'), a('scare'), a('audio43'), a('real_audio'), t('A ver qué tal andas de oído 👂')],
    quiz: {
      question: 'Según los ruidos de ese audio... ¿Qué dos máquinas nos acaban de salvar el culo?',
      answers: [
        { text: 'El microondas de la sala de descanso y el camión de la basura', correct: false },
        { text: 'La alarma de incendios y el ventilador de un servidor roto', correct: false },
        { text: 'Las baterías de emergencia (SAIs) pitando, y luego el generador diésel arrancando ⚡🔋', correct: true },
        { text: 'Un hacker entrando al sistema y el aire acondicionado reiniciándose', correct: false }
      ],
      wrongAudioId: 'audio44',
      wrongText: '',
      correctFirstAudioId: 'audio45',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio46',
      correctAfterFailText: '',
      next: 'bloque7'
    }
  },

  bloque7: {
    messages: [a('audio47'), t('¿En qué invertimos el calor sobrante? Elige una opción ♻️')],
    options: [
      { label: 'Calefacción para edificios vecinos 🏘️', next: 'bloque7a' },
      { label: 'Invernaderos o granjas de peces 🌿🐟', next: 'bloque7b' },
      { label: 'Generar electricidad de nuevo ⚡', next: 'bloque7c' }
    ]
  },

  bloque7a: {
    messages: [a('audio48')],
    quiz: {
      question: '¿Cuál es el mayor problema de la calefacción urbana?',
      answers: [
        { text: 'En verano nadie quiere calefacción y perdemos la eficiencia ☀️', correct: true },
        { text: 'Que los vecinos roban el Wi-Fi por los tubos 📡', correct: false }
      ],
      wrongAudioId: 'audio51',
      wrongText: '',
      next: 'bloque7a_2'
    }
  },

  bloque7a_2: {
    messages: [a('audio48_bis')],
    quiz: {
      question: '¿Cómo solucionamos el exceso de calor en verano en estos sistemas?',
      answers: [
        { text: 'Usamos máquinas de absorción para convertir ese calor en frío para aire acondicionado ❄️', correct: true },
        { text: 'Abrimos las tuberías para que el agua se evapore al aire', correct: false }
      ],
      wrongAudioId: 'audio51',
      wrongText: '',
      correctFirstAudioId: 'audio52',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio52',
      correctAfterFailText: '',
      next: 'bloque8'
    }
  },

  bloque7b: {
    messages: [a('audio49')],
    quiz: {
      question: '¿Por qué es bueno para el Data Center enviar el calor a un invernadero?',
      answers: [
        { text: 'Porque el invernadero actúa como un radiador gigante gratuito 🌡️', correct: true },
        { text: 'Porque nos regalan tomates para la ensalada 🍅', correct: false }
      ],
      wrongAudioId: 'audio51',
      wrongText: '',
      next: 'bloque7b_2'
    }
  },

  bloque7b_2: {
    messages: [a('audio49_bis')],
    quiz: {
      question: '¿Qué componente técnico es vital entre el servidor y el invernadero?',
      answers: [
        { text: 'Un intercambiador de calor para que los aires no se mezclen nunca 🔄', correct: true },
        { text: 'Un ventilador de techo gigante para remover el aire', correct: false }
      ],
      wrongAudioId: 'audio51',
      wrongText: '',
      correctFirstAudioId: 'audio52',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio52',
      correctAfterFailText: '',
      next: 'bloque8'
    }
  },

  bloque7c: {
    messages: [a('audio50')],
    quiz: {
      question: '¿Por qué no se hace esto siempre si parece ideal?',
      answers: [
        { text: 'Porque la eficiencia de convertir calor "templado" en electricidad es bajísima 📉', correct: true },
        { text: 'Porque los servidores se marean con las turbinas 🌀', correct: false }
      ],
      wrongAudioId: 'audio51',
      wrongText: '',
      next: 'bloque7c_2'
    }
  },

  bloque7c_2: {
    messages: [a('audio50_bis')],
    quiz: {
      question: '¿Qué tipo de fluido se usa en estas turbinas especiales?',
      answers: [
        { text: 'Fluidos orgánicos (como refrigerantes) que hierven a temperaturas mucho más bajas que el agua 🧪', correct: true },
        { text: 'Aceite de oliva virgen extra porque aguanta mejor la presión 🫒', correct: false }
      ],
      wrongAudioId: 'audio51',
      wrongText: '',
      correctFirstAudioId: 'audio52',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio52',
      correctAfterFailText: '',
      next: 'bloque8'
    }
  },

  bloque8: {
    messages: [
      a('audio53'),
      t('Por cierto, mira lo que ha dicho {persona} de ti:'),
      sys('↩️ Reenviado:\n"{usuario} es un puto retrasado que no tiene ni idea de nada."'),
      a('audio54'),
      t('Elige una rama para dejar en evidencia a {persona} 💪')
    ],
    options: [
      { label: 'El peligro de la Humedad Baja (Electricidad Estática) ⚡', next: 'bloque8a' },
      { label: 'El peligro de la Humedad Alta (Condensación y Óxido) 💧', next: 'bloque8b' }
    ]
  },

  bloque8a: {
    messages: [a('audio55')],
    quiz: {
      question: 'Si el sensor marca un 15% de humedad (aire muy seco)... ¿Qué pasa si toco un servidor sin pulsera antiestática?',
      answers: [
        { text: 'Que le metas una descarga de miles de voltios y quemes la placa base ⚡💀', correct: true },
        { text: 'Que el servidor se ponga a sudar para compensar 💦', correct: false }
      ],
      wrongAudioId: 'audio57',
      wrongText: '',
      correctFirstAudioId: 'audio58',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio58',
      correctAfterFailText: '',
      next: 'bloque9'
    }
  },

  bloque8b: {
    messages: [a('audio56')],
    quiz: {
      question: '¿Por qué no ponemos la humedad al 90% para estar "fresquitos"?',
      answers: [
        { text: 'Porque el agua se condensaría en las partes frías y provocaría cortocircuitos 💥', correct: true },
        { text: 'Porque los servidores empezarían a oler a humedad como un sótano 🏚️', correct: false }
      ],
      wrongAudioId: 'audio57',
      wrongText: '',
      correctFirstAudioId: 'audio58',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio58',
      correctAfterFailText: '',
      next: 'bloque9'
    }
  },

  bloque9: {
    messages: [a('audio59'), t('Elige qué "locura" tecnológica te suena más real para el futuro 🚀')],
    options: [
      { label: 'El Proyecto Natick (Servidores bajo el mar) 🌊', next: 'bloque9a' },
      { label: 'Liquid Immersion (Servidores en piscinas de líquido) 🧪', next: 'bloque9b' },
      { label: 'IA Predictiva (Cero humanos controlando el clima) 🤖', next: 'bloque9c' }
    ]
  },

  bloque9a: {
    messages: [a('audio60')],
    quiz: {
      question: '¿Cuál es la mayor ventaja de tener el Data Center bajo el agua además del frío gratis?',
      answers: [
        { text: 'Que el oxígeno se sustituye por nitrógeno seco, así nada se oxida ni se quema 🔬', correct: true },
        { text: 'Que si hay un incendio, solo hay que abrir una ventana 🪟', correct: false }
      ],
      wrongAudioId: 'audio63',
      wrongText: '',
      correctFirstAudioId: 'audio64',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio64',
      correctAfterFailText: '',
      next: 'bloque10'
    }
  },

  bloque9b: {
    messages: [a('audio61')],
    quiz: {
      question: '¿Por qué no usamos agua normal para esta "bañera" de servidores?',
      answers: [
        { text: 'Porque el agua es conductora y provocaría un cortocircuito masivo; usamos líquido dieléctrico ⚡', correct: true },
        { text: 'Porque el agua se evapora muy rápido con el calor de los procesadores 💨', correct: false }
      ],
      wrongAudioId: 'audio63',
      wrongText: '',
      correctFirstAudioId: 'audio64',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio64',
      correctAfterFailText: '',
      next: 'bloque10'
    }
  },

  bloque9c: {
    messages: [a('audio62')],
    quiz: {
      question: 'Si la IA detecta que un servidor va a fallar antes de que pase... ¿Qué hace con la climatización?',
      answers: [
        { text: 'Mueve la carga a otro lado y pre-enfría esa zona antes del pico de calor 🧠', correct: true },
        { text: 'Apaga Internet en todo el edificio para que no se caliente nada 🔌', correct: false }
      ],
      wrongAudioId: 'audio63',
      wrongText: '',
      correctFirstAudioId: 'audio64',
      correctFirstText: '',
      correctAfterFailAudioId: 'audio64',
      correctAfterFailText: '',
      next: 'bloque10'
    }
  },

  bloque10: {
    messages: [
      a('audio65'),
      sys('⚠️ ALERTA CRÍTICA: TEMPERATURA SALA TÉCNICA 38°C Y SUBIENDO\nSELECCIONA ACCIÓN DE EMERGENCIA (QUEDAN 2 PASOS)')
    ],
    quiz: {
      question: '¡Rápido! El aire caliente no está saliendo de los racks. ¿Qué hacemos con la arquitectura física?',
      answers: [
        { text: 'Cierra las puertas de contención y arranca los extractores al 100% 🔒💨', correct: true },
        { text: 'Abre todas las puertas para que corra el aire de la calle 🚪', correct: false },
        { text: 'Apaga los servidores que más luz gasten a lo loco ❌', correct: false }
      ],
      wrongAudioId: 'audio_death',
      wrongText: '',
      next: 'bloque10_paso2'
    }
  },

  bloque10_paso2: {
    messages: [
      a('audio66'),
      sys('⚠️ TEMPERATURA 42°C. RIESGO DE FUSIÓN DE HARDWARE.\nELIGE LA ÚLTIMA MANIOBRA')
    ],
    quiz: {
      question: '¿Qué hacemos para bajar la temperatura de los racks de alta densidad (IA) ahora mismo?',
      answers: [
        { text: 'Activa el bypass de Free Cooling y desvía el caudal a la refrigeración directa al chip 💧🧊', correct: true },
        { text: 'Tira cubos de hielo sobre las rejillas del suelo técnico 🧊', correct: false },
        { text: 'Reza para que el PUE baje solo 🙏', correct: false }
      ],
      wrongAudioId: 'audio_death',
      wrongText: '',
      next: 'final_bueno'
    }
  },

  quiz10_muerte: {
    messages: [a('audio67'), sys('💀 [SISTEMA OFFLINE] — GAME OVER\nHas fundido el chiringuito.')],
    isGameOver: true,
    retryBlock: 'bloque10'
  },

  final_bueno: {
    messages: [
      a('audio68'),
      a('audio69'),
      sys('✅ MISIÓN CUMPLIDA\n🏆 Estatus: Maestro de la Climatización\n📊 PUE Final: 1.1\n📜 Certificado de Chema: CONSEGUIDO')
    ],
    isEnd: true
  }
};

let userName = '';
let persona = '';
let currentBlockId = null;
let pendingMessages = [];
let quizEliminated = [];
let quizWrongCount = 0;
let nextAfter = null;
let processing = false;

const $ = s => document.querySelector(s);
const msgArea = $('#messages');
const interZone = $('#interaction-zone');

function fmtTime(value) {
  if (!Number.isFinite(value) || value < 0) return '0:00';
  const total = Math.floor(value);
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return `${min}:${String(sec).padStart(2, '0')}`;
}

function scrollBottom() {
  setTimeout(() => {
    msgArea.scrollTop = msgArea.scrollHeight;
  }, 80);
}

function addMsgDOM(msg) {
  const row = document.createElement('div');
  row.className =
    'msg-row' +
    (msg.type === 'user' ? ' sent' : msg.type === 'system' || msg.type === 'blocked' ? ' center' : '');

  if (msg.isTemp) row.dataset.temp = '1';

  if (msg.type === 'system') {
    row.innerHTML = `<div class="sys-bubble">${rv(msg.content, userName, persona)}</div>`;
  } else if (msg.type === 'blocked') {
    row.innerHTML = `<div class="blocked-bubble">🚫 ${rv(msg.content, userName, persona)}</div>`;
  } else {
    const cls = msg.type === 'user' ? 'out' : 'in';
    let inner = '';
    let extraClass = '';

    if (msg.type === 'audio' || msg.audioId) {
      inner = `
        <div class="audio-wrap">
          <button class="play-btn" type="button" aria-label="Reproducir audio">▶</button>
          <div class="audio-main">
            <div class="audio-progress"><span class="audio-progress-fill"></span></div>
          </div>
          <span class="audio-time">0:00</span>
        </div>
      `;
    } else if (msg.type === 'image' || msg.imageId) {
      extraClass = ' image-bubble';
      const altText = rv(msg.content || `Imagen ${msg.imageId}`, userName, persona);
      inner = `
        <div class="image-wrap">
          <img class="chat-image" src="${msg.imageId}.${IMAGE_EXT}" alt="${altText}" loading="lazy">
        </div>
      `;
    } else {
      inner = `<p class="text">${rv(msg.content, userName, persona)}</p>`;
    }

    if (msg.type !== 'image') {
      inner += `<div class="ts">${now()}${msg.type === 'user' ? ' ✓✓' : ''}</div>`;
    }

    row.innerHTML = `<div class="bubble ${cls}${extraClass}">${inner}</div>`;
  }

  msgArea.appendChild(row);
  scrollBottom();
  return row;
}

function removeTemps() {
  msgArea.querySelectorAll('[data-temp="1"]').forEach(el => el.remove());
}

function showTyping() {
  const el = document.createElement('div');
  el.className = 'typing-row';
  el.id = 'typing';
  el.innerHTML = '<div class="typing-bubble"><span></span><span></span><span></span></div>';
  msgArea.appendChild(el);
  scrollBottom();
}

function hideTyping() {
  const el = $('#typing');
  if (el) el.remove();
}

function attachAudioPlayer(row, audioId) {
  return new Promise(resolve => {
    if (!audioId) {
      resolve();
      return;
    }

    const wrap = row.querySelector('.audio-wrap');
    const button = row.querySelector('.play-btn');
    const timeEl = row.querySelector('.audio-time');
    const fill = row.querySelector('.audio-progress-fill');

    if (!wrap || !button || !timeEl || !fill) {
      resolve();
      return;
    }

    const audio = document.createElement('audio');
    audio.preload = 'metadata';
    audio.playsInline = true;
    audio.src = `${audioId}.${AUDIO_EXT}`;
    wrap.appendChild(audio);
    audio.load();

    let unlocked = false;
    const unlock = () => {
      if (!unlocked) {
        unlocked = true;
        resolve();
      }
    };

    const setButtonState = () => {
      const playing = !audio.paused && !audio.ended;
      button.textContent = playing ? '❚❚' : '▶';
      button.setAttribute('aria-label', playing ? 'Pausar audio' : 'Reproducir audio');
    };

    const setTimeState = () => {
      const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
      const current = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
      timeEl.textContent = !audio.paused && !audio.ended ? fmtTime(current) : fmtTime(duration || current);
      fill.style.width = duration > 0 ? `${Math.min(100, (current / duration) * 100)}%` : '0%';
    };

    button.addEventListener('click', async () => {
      if (audio.ended || (Number.isFinite(audio.duration) && audio.duration > 0 && audio.currentTime >= audio.duration - 0.05)) {
        audio.currentTime = 0;
      }

      try {
        if (audio.paused) {
          await audio.play();
        } else {
          audio.pause();
        }
      } catch {
        button.disabled = true;
        button.textContent = '!';
        timeEl.textContent = 'Error';
        unlock();
      }

      setButtonState();
      setTimeState();
    });

    audio.addEventListener('loadedmetadata', () => {
      setButtonState();
      setTimeState();
    });

    audio.addEventListener('timeupdate', setTimeState);
    audio.addEventListener('play', () => {
      setButtonState();
      setTimeState();
    });

    audio.addEventListener('pause', () => {
      setButtonState();
      setTimeState();
    });

    audio.addEventListener('ended', () => {
      fill.style.width = '100%';
      setButtonState();
      setTimeState();
      unlock();
    });

    audio.addEventListener('error', () => {
      button.disabled = true;
      button.textContent = '!';
      timeEl.textContent = 'Error';
      unlock();
    });

    setButtonState();
    setTimeState();
  });
}

function showInteraction() {
  const block = BLOCKS[currentBlockId];
  if (!block) return;

  interZone.innerHTML = '';
  interZone.classList.remove('hidden');

  if (block.quiz) {
    const q = block.quiz;
    let h = `<div class="quiz-q"><div class="qlabel">❓ PREGUNTA</div><p>${rv(q.question, userName, persona)}</p></div>`;

    q.answers.forEach((ans, i) => {
      if (quizEliminated.includes(i)) return;
      h += `<button class="opt-btn" data-qi="${i}" data-correct="${ans.correct}">${rv(ans.text, userName, persona)}</button>`;
    });

    interZone.innerHTML = h;

    interZone.querySelectorAll('.opt-btn').forEach(btn => {
      btn.onclick = () => handleQuizAnswer(+btn.dataset.qi, btn.dataset.correct === 'true');
    });
  } else if (block.options) {
    let h = '';

    block.options.forEach((opt, i) => {
      h += `<button class="opt-btn" data-oi="${i}">${rv(opt.label, userName, persona)}</button>`;
    });

    interZone.innerHTML = h;

    interZone.querySelectorAll('.opt-btn').forEach(btn => {
      btn.onclick = () => handleOption(block.options[+btn.dataset.oi]);
    });
  } else if (block.isGameOver) {
    interZone.innerHTML = `<button class="retry-btn" type="button">Reintentar</button>`;
    interZone.querySelector('.retry-btn').onclick = () => {
      hideInteraction();
      quizWrongCount = 0;
      setTimeout(() => enterBlock(block.retryBlock), 300);
    };
  } else if (block.isEnd) {
    interZone.innerHTML = `<div class="end-box"><p>🚫 Chema te ha bloqueado</p></div>`;
  }

  scrollBottom();
}

function hideInteraction() {
  interZone.classList.add('hidden');
  interZone.innerHTML = '';
}

function handleOption(opt) {
  addMsgDOM({ type: 'user', content: opt.label });
  
  // AÑADIDO: Registro de Firebase
  registrarAccion(currentBlockId, rv(opt.label, userName, persona));

  hideInteraction();
  setTimeout(() => enterBlock(opt.next), 500);
}

function handleQuizAnswer(idx, correct) {
  const block = BLOCKS[currentBlockId];
  if (!block || !block.quiz) return;

  const quiz = block.quiz;
  const answerText = quiz.answers[idx].text;
  
  addMsgDOM({ type: 'user', content: answerText });
  
  // AÑADIDO: Registro de Firebase (indicando si acertó o no)
  registrarAccion(currentBlockId, rv(answerText, userName, persona), correct);

  hideInteraction();

  if (!correct) {
    if (currentBlockId === 'bloque10' || currentBlockId === 'bloque10_paso2') {
      nextAfter = null;
      setTimeout(() => {
        currentBlockId = 'quiz10_muerte';
        const deathBlock = BLOCKS.quiz10_muerte;
        pendingMessages = [...deathBlock.messages];
        processQueue();
      }, 600);
      return;
    }

    quizWrongCount++;
    quizEliminated.push(idx);

    setTimeout(() => {
      if (quiz.wrongAudioId) {
        pendingMessages = [{ type: 'audio', audioId: quiz.wrongAudioId, content: '' }];
      }
      processQueue();
    }, 600);
  } else {
    const msgs = [];

    if (quizWrongCount === 0 && quiz.correctFirstAudioId) {
      msgs.push({ type: 'audio', audioId: quiz.correctFirstAudioId, content: '' });
    } else if (quizWrongCount > 0 && quiz.correctAfterFailAudioId) {
      msgs.push({ type: 'audio', audioId: quiz.correctAfterFailAudioId, content: '' });
    }

    nextAfter = quiz.next;

    setTimeout(() => {
      if (msgs.length > 0) {
        pendingMessages = msgs;
        processQueue();
      } else {
        nextAfter = null;
        quizWrongCount = 0;
        enterBlock(quiz.next);
      }
    }, 600);
  }
}

function processQueue() {
  if (pendingMessages.length === 0 || processing) return;

  processing = true;
  showTyping();

  const msg = pendingMessages[0];
  const delay = msg.type === 'audio' ? 1200 : msg.type === 'image' ? 900 : 800;

  setTimeout(() => {
    hideTyping();

    if (msg.removeTemp) removeTemps();

    const row = addMsgDOM(msg);
    pendingMessages = pendingMessages.slice(1);
    processing = false;

    if (msg.type === 'audio' || msg.audioId) {
      const aid = msg.audioId || '';
      attachAudioPlayer(row, aid).then(() => {
        if (pendingMessages.length > 0) processQueue();
        else afterQueueDone();
      });
    } else {
      if (pendingMessages.length > 0) processQueue();
      else afterQueueDone();
    }
  }, delay);
}

function afterQueueDone() {
  if (!currentBlockId) return;

  if (nextAfter) {
    const n = nextAfter;
    nextAfter = null;
    quizWrongCount = 0;
    setTimeout(() => enterBlock(n), 600);
    return;
  }

  const block = BLOCKS[currentBlockId];
  if (!block) return;

  if (block.autoNext) {
    setTimeout(() => enterBlock(block.autoNext), 600);
    return;
  }

  if (block.options || block.quiz || block.isEnd || block.isGameOver) {
    setTimeout(() => showInteraction(), 400);
  }
}

function enterBlock(blockId) {
  currentBlockId = blockId;
  hideInteraction();
  quizEliminated = [];

  const block = BLOCKS[blockId];
  if (!block) return;

  if (block.messages.length > 0) {
    pendingMessages = [...block.messages];
    processQueue();
  } else if (block.autoNext) {
    setTimeout(() => enterBlock(block.autoNext), 400);
  } else {
    showInteraction();
  }
}

const nameInput = $('#name-input');
const startBtn = $('#start-btn');
const nameError = $('#name-error');

nameInput.addEventListener('input', () => {
  const value = normalizeName(nameInput.value);
  const valid = VALID_NAMES.includes(value);

  startBtn.disabled = !valid;

  if (value.length > 0 && !valid) {
    nameError.textContent = 'Nombre no válido. Usa: Adrián, Alejandro, Carlos, Manuel, Miguel, Luca o Mihai';
  } else {
    nameError.textContent = '';
  }
});

nameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !startBtn.disabled) startBtn.click();
});

startBtn.addEventListener('click', () => {
  userName = nameInput.value.trim();
  persona = getPersona(userName);
  
  // AÑADIDO: Inicializamos la sesión para Firebase y registramos el inicio
  sessionId = Date.now().toString();
  registrarAccion('inicio', 'Entró al chat');

  $('#welcome-screen').classList.add('hidden');
  $('#chat-screen').classList.remove('hidden');

  setTimeout(() => enterBlock('intro'), 300);
});
