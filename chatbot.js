/**
 * ENERGE CHATBOT V12
 * Final Suite: Commercial (Mail), Admin (Mail), Post-Sales (WhatsApp/Mail), Ubicaciones (Maps)
 */

const EnergeBot = {
    isOpen: false,
    currentFlow: null,
    step: 0,
    userData: {
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',    
        solucionTipo: '',
        provincia: '',
        objetivo: '',
        plazo: '',
        consumo: '',
        // Admin
        adminTipo: '',
        facturaFecha: '',
        facturaNro: '',
        detalleConsulta: '',
        // Postventa
        equipoTipo: '',
        direccion: '',
        detalleProblema: ''
    },
    
    init() {
        this.renderBase();
        this.addEventListeners();
        this.startConversation();
    },

    renderBase() {
        const html = `
            <div id="energe-bot-container">
                <div id="bot-launcher">
                    <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                </div>
                <div id="bot-window">
                    <div id="bot-header">
                        <div class="bot-avatar">E</div>
                        <div class="bot-info">
                            <h3>Asistente Energe</h3>
                            <span>Atención en línea</span>
                        </div>
                        <div id="bot-close">
                            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                        </div>
                    </div>
                    <div id="bot-messages">
                        <div id="bot-typing" class="msg bot" style="display:none; padding: 10px 16px; width: 50px;">
                            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
                        </div>
                    </div>
                    <div id="bot-input-area">
                        <input type="text" id="bot-user-input" placeholder="Escribí aquí...">
                        <button id="bot-send-btn">
                            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    </div>
                    <div id="bot-footer">
                        <div class="bot-brand">✦ ENERGE ENERGY ✦</div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    },

    addEventListeners() {
        const launcher = document.getElementById('bot-launcher');
        const botWindow = document.getElementById('bot-window');
        const closeBtn = document.getElementById('bot-close');
        const input = document.getElementById('bot-user-input');
        const sendBtn = document.getElementById('bot-send-btn');
        
        launcher.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            botWindow.style.display = this.isOpen ? 'flex' : 'none';
            if (window.innerWidth <= 480) {
                document.body.classList.toggle('bot-open', this.isOpen);
            }
        });

        closeBtn.addEventListener('click', () => {
            this.isOpen = false;
            botWindow.style.display = 'none';
            document.body.classList.remove('bot-open');
        });

        const handleSend = () => {
            const text = input.value.trim();
            if (text) {
                this.addMessage(text, 'user');
                input.value = '';
                this.processInput(text);
            }
        };

        sendBtn.addEventListener('click', handleSend);
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
    },

    think(callback) {
        const typing = document.getElementById('bot-typing');
        const container = document.getElementById('bot-messages');
        container.appendChild(typing);
        typing.style.display = 'block';
        container.scrollTop = container.scrollHeight;
        setTimeout(() => { typing.style.display = 'none'; callback(); }, 1200);
    },

    addMessage(text, type = 'bot', options = null) {
        const parsedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        const container = document.getElementById('bot-messages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${type}`;
        msgDiv.innerHTML = parsedText;
        if (options) {
            const optDiv = document.createElement('div');
            optDiv.className = 'bot-options';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'opt-btn';
                btn.innerText = opt.label;
                btn.onclick = () => { this.addMessage(opt.label, 'user'); opt.action(); };
                optDiv.appendChild(btn);
            });
            msgDiv.appendChild(optDiv);
        }
        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    },

    showInput(show = true) {
        document.getElementById('bot-input-area').style.display = show ? 'flex' : 'none';
    },

    startConversation() {
        this.think(() => {
            this.addMessage("¡Hola! 👋 Soy parte del equipo de Energe. ¿En qué podemos ayudarte hoy?", 'bot', [
                { label: 'Consultas comerciales', action: () => this.flowComercial() },
                { label: 'Consultas administrativas', action: () => this.flowAdministrativa() },
                { label: 'Servicio postventa', action: () => this.flowPostventa() },
                { label: '¿Dónde están ubicados?', action: () => this.flowUbicaciones() }
            ]);
        });
    },

    // --- FLOW: UBICACIONES ---

    flowUbicaciones() {
        this.think(() => {
            this.addMessage("Contamos con showrooms y oficinas técnicas en puntos estratégicos del país. ¿Qué zona te interesa?", 'bot', [
                { label: 'Casa Matriz Mendoza', action: () => this.showMap('mendoza') },
                { label: 'Local Buenos Aires', action: () => this.showMap('buenosaires') },
                { label: 'Local La Pampa', action: () => this.showMap('lapampa') },
                { label: 'Local Patagonia', action: () => this.showMap('patagonia') },
                { label: 'Local Rosario', action: () => this.showMap('rosario') }
            ]);
        });
    },

    showMap(zona) {
        const maps = {
            mendoza: { 
                name: 'Casa Matriz Mendoza', 
                address: 'Alsina 2550, M5511 Maipú, Mendoza',
                phone: '261 242 4493',
                link: 'https://maps.app.goo.gl/JUMUR9hxeS6NGvJN9' 
            },
            buenosaires: { 
                name: 'Energe Buenos Aires', 
                address: 'Av. S. Martín 7188, C1425 Buenos Aires',
                phone: '011 5817 8656',
                link: 'https://maps.app.goo.gl/G2Z7UwAnyG6sYU5X8' 
            },
            lapampa: { 
                name: 'Energe La Pampa', 
                address: 'Mansilla 602, L6300 Santa Rosa, La Pampa',
                phone: '02954 680201',
                link: 'https://maps.app.goo.gl/E7vnLnNhpBQyEvuZ7' 
            },
            patagonia: { 
                name: 'Energe Patagonia', 
                address: 'Gral. Pacheco 280, R8324 Cipolletti, Río Negro',
                phone: '0299 548 9858',
                link: 'https://maps.app.goo.gl/zor9nZeypx11YCcH9' 
            },
            rosario: { 
                name: 'Energe Rosario', 
                address: 'Barón de Maua 1082, S2000 Rosario, Santa Fe',
                phone: '0341 152 110087',
                link: 'https://maps.app.goo.gl/wGdbR77tjUi4WRLQ8' 
            }
        };
        
        const loc = maps[zona];
        this.think(() => {
            this.addMessage(`¡Excelente! Aquí tenés los datos de **${loc.name}**:`, 'bot');
            setTimeout(() => {
                this.addMessage(`📍 **Dirección:** ${loc.address}\n📞 **Teléfono:** ${loc.phone}`, 'bot');
                setTimeout(() => {
                    this.addMessage(`<a href="${loc.link}" target="_blank" class="opt-btn cta">Ver en Google Maps →</a>`, 'bot');
                    setTimeout(() => this.startConversation(), 3000);
                }, 500);
            }, 800);
        });
    },

    // --- FLOW: COMERCIAL ---

    flowComercial() {
        this.currentFlow = 'comercial';
        this.step = 0;
        this.think(() => {
            this.addMessage("¡Genial! Nos encantaría conocer tu proyecto. Decime: ¿cuál es el tipo de solución que buscás?", 'bot', [
                { label: 'Empresa / Industria', action: () => { this.userData.solucionTipo = 'Empresa/Industria'; this.qualifyComercial(true); }},
                { label: 'Comercio / Negocio', action: () => { this.userData.solucionTipo = 'Comercio/Negocio'; this.qualifyComercial(true); }},
                { label: 'Vivienda de gran consumo (>10kW)', action: () => { this.userData.solucionTipo = 'Gran Consumo'; this.qualifyComercial(true); }},
                { label: 'Casa de consumo menor (<10kW)', action: () => { this.userData.solucionTipo = 'Residencial <10kW'; this.qualifyComercial(false); }}
            ]);
        });
    },

    qualifyComercial(isQualified) {
        this.think(() => {
            if (isQualified) {
                let enriquecido = (this.userData.solucionTipo.includes('Empresa')) 
                    ? "Excelente idea. Implementar energía solar para el sector productivo es una decisión estratégica brillante."
                    : "¡Muy buena elección! Los sistemas fotovoltaicos de gran escala son los que más rápido recuperan la inversión.";
                
                this.addMessage(enriquecido, 'bot');
                setTimeout(() => {
                    this.addMessage("Para empezar, ¿con quién tengo el placer de hablar?", 'bot');
                    this.showInput(true);
                    this.step = 1;
                }, 1000);
            } else {
                this.addMessage("Te agradecemos el interés. Por el momento, en Energe nos enfocamos exclusivamente en soluciones para el sector industrial, comercial y residencias de alto consumo (>10kW).", 'bot');
                this.showInput(false);
            }
        });
    },

    // --- FLOW: ADMINISTRATIVO ---

    flowAdministrativa() {
        this.currentFlow = 'admin';
        this.step = 0;
        this.showInput(false);
        this.think(() => {
            this.addMessage("¿Sobre qué tema necesitás soporte administrativo?", 'bot', [
                { label: 'Facturación', action: () => { this.userData.adminTipo = 'Facturación'; this.startAdminFlow(); }},
                { label: 'Pagos', action: () => { this.userData.adminTipo = 'Pagos'; this.startAdminFlow(); }},
                { label: 'Seguimientos', action: () => { this.userData.adminTipo = 'Seguimientos'; this.startAdminFlow(); }},
                { label: 'Datos de la empresa', action: () => { this.userData.adminTipo = 'Datos de Empresa'; this.startAdminFlow(); }}
            ]);
        });
    },

    startAdminFlow() {
        this.think(() => {
            this.addMessage(`Iniciamos la gestión por **${this.userData.adminTipo}**.`, 'bot');
            setTimeout(() => {
                this.addMessage("¿Cuál es el nombre de la empresa o cliente asociado?", 'bot');
                this.showInput(true);
                this.step = 10;
            }, 800);
        });
    },

    // --- FLOW: POSTVENTA ---

    flowPostventa() {
        this.currentFlow = 'postventa';
        this.step = 20;
        this.think(() => {
            this.addMessage("Entiendo. Vamos a gestionar tu solicitud de servicio postventa.", 'bot');
            setTimeout(() => {
                this.addMessage("Para empezar, ¿cuál es el nombre del **Titular de la orden de venta**? (O la Razón Social de la empresa).", 'bot');
                this.showInput(true);
            }, 800);
        });
    },

    // --- PROCESS INPUTS ---

    processInput(text) {
        this.think(() => {
            if (this.currentFlow === 'comercial') {
                switch(this.step) {
                    case 1: this.userData.nombre = text; this.addMessage(`¡Un gusto, ${text.split(' ')[0]}! ¿Cuál es tu correo electrónico?`, 'bot'); this.step = 1.1; break;
                    case 1.1: if (!text.includes('@')) { this.addMessage("Por favor, ingresá un email válido.", 'bot'); return; } this.userData.email = text; this.addMessage("¿Cuál es el nombre de tu empresa o negocio? (O 'No')", 'bot'); this.step = 1.5; break;
                    case 1.5: this.userData.empresa = text.toLowerCase() === 'no' ? '' : text; this.addMessage("¿A qué número de teléfono podemos llamarte?", 'bot'); this.step = 2; break;
                    case 2: this.userData.telefono = text; this.addMessage("¿En qué provincia se encuentra el proyecto?", 'bot'); this.step = 3; break;
                    case 3: this.userData.provincia = text; this.addMessage("¿Cuál es el objetivo principal? (Ahorro, autonomía, etc.)", 'bot'); this.step = 4; break;
                    case 4: this.userData.objetivo = text; this.addMessage("¿Tenés pensado implementarlo pronto o estás analizando?", 'bot'); this.step = 5; break;
                    case 5: this.userData.plazo = text; this.addMessage("Por último, ¿cuál es tu consumo promedio mensual (en $ o kWh)?", 'bot'); this.step = 6; break;
                    case 6: this.userData.consumo = text; this.showInput(false); this.finalizeLead(); break;
                }
            } 
            else if (this.currentFlow === 'admin') {
                switch(this.step) {
                    case 10: this.userData.empresa = text; if (this.userData.adminTipo === 'Facturación') { this.addMessage("¿Nro de factura?", 'bot'); this.step = 11; } else { this.addMessage("Detalle de tu consulta:", 'bot'); this.step = 13; } break;
                    case 11: this.userData.facturaNro = text; this.addMessage("¿Fecha de la factura?", 'bot'); this.step = 12; break;
                    case 12: this.userData.facturaFecha = text; this.addMessage("Detalle de la consulta:", 'bot'); this.step = 13; break;
                    case 13: this.userData.detalleConsulta = text; this.showInput(false); this.finalizeAdmin(); break;
                }
            }
            else if (this.currentFlow === 'postventa') {
                switch(this.step) {
                    case 20: this.userData.nombre = text; this.addMessage("Gracias. ¿Cuál es el **Email del titular**? (Mismo que figura en la factura).", 'bot'); this.step = 21; break;
                    case 21: if (!text.includes('@')) { this.addMessage("Por favor, ingresá un email válido.", 'bot'); return; } this.userData.email = text; this.addMessage("¿A qué número de teléfono podemos contactarte?", 'bot'); this.step = 22; break;
                    case 22: this.userData.telefono = text; this.addMessage("¿En qué **dirección** se encuentra el equipo? (Calle, Localidad, CP y Provincia).", 'bot'); this.step = 23; break;
                    case 23: 
                        this.userData.direccion = text; 
                        this.showInput(false);
                        this.addMessage("¿En qué tipo de equipo se presenta la incidencia?", 'bot', [
                            { label: 'Fotovoltaico On grid', action: () => { this.userData.equipoTipo = 'Fotovoltaico On grid'; this.step = 24; this.addMessage("Detalle del problema:", 'bot'); this.showInput(true); }},
                            { label: 'Fotovoltaico Off grid / Híbridos', action: () => { this.userData.equipoTipo = 'Fotovoltaico Off grid / Híbridos'; this.step = 24; this.addMessage("Detalle del problema:", 'bot'); this.showInput(true); }},
                            { label: 'Termotanques y equipos combinados', action: () => { this.userData.equipoTipo = 'Termotanques y equipos combinados'; this.step = 24; this.addMessage("Detalle del problema:", 'bot'); this.showInput(true); }},
                            { label: 'Climatización de piscinas', action: () => { this.userData.equipoTipo = 'Climatización de piscinas'; this.step = 24; this.addMessage("Detalle del problema:", 'bot'); this.showInput(true); }},
                            { label: 'Otros', action: () => { this.userData.equipoTipo = 'Otros'; this.step = 24; this.addMessage("Detalle del problema:", 'bot'); this.showInput(true); }}
                        ]);
                        break;
                    case 24: this.userData.detalleProblema = text; this.showInput(false); this.finalizePostventa(); break;
                }
            }
        });
    },

    finalizeLead() {
        this.addMessage("¡Excelente! He procesado tus datos para la iniciativa comercial.", 'bot');
        const bodyText = `Nombre: ${this.userData.nombre}\nEmpresa: ${this.userData.empresa}\nEmail: ${this.userData.email}\nSolución: ${this.userData.solucionTipo}\nTeléfono: ${this.userData.telefono}\nProvincia: ${this.userData.provincia}\nObjetivo: ${this.userData.objetivo}\nPlazo: ${this.userData.plazo}\nConsumo: ${this.userData.consumo}\n\nOrigen: Chatbot Energe`;
        this.sendEmail(`Iniciativa Comercial - ${this.userData.nombre}`, bodyText, 'iniciativas@energesa.odoo.com');
    },

    finalizeAdmin() {
        this.addMessage("Las consultas administrativas se envían por correo oficial:", 'bot');
        let bodyText = `Tipo: ${this.userData.adminTipo}\nAsociado: ${this.userData.empresa}\n`;
        if (this.userData.adminTipo === 'Facturación') bodyText += `Factura Nro: ${this.userData.facturaNro}\nFecha: ${this.userData.facturaFecha}\n`;
        bodyText += `Detalle: ${this.userData.detalleConsulta}\n\nOrigen: Chatbot Energe`;
        const targetEmail = (this.userData.adminTipo === 'Facturación') ? 'facturas@energe.com.ar' : 'administracion@energe.com.ar';
        this.sendEmail(`Consulta Admin - ${this.userData.empresa}`, bodyText, targetEmail);
    },

    finalizePostventa() {
        const isTermo = this.userData.equipoTipo === 'Termotanques y equipos combinados';
        const isPiscina = this.userData.equipoTipo === 'Climatización de piscinas';

        if (isTermo || isPiscina) {
            this.addMessage(`Respecto a tu consulta sobre el **servicio técnico de ${this.userData.equipoTipo}**, te informamos que en Energe ya no realizamos este tipo de mantenimiento técnico actualmente.`, 'bot');
            const tecnico = isTermo ? 'Miguel Rivera' : 'Mauricio Prati';
            const tel = isTermo ? '5492612414275' : '5492616357579';
            const msg = `Hola ${tecnico}, soy ${this.userData.nombre} y te contacto a través del asistente de Energe por una incidencia en un equipo de ${this.userData.equipoTipo}.\nUbicación: ${this.userData.direccion}\nDetalle: ${this.userData.detalleProblema}`;
            const waLink = `https://wa.me/${tel}?text=${encodeURIComponent(msg)}`;
            setTimeout(() => {
                this.addMessage(`Para no dejarte sin solución, te compartimos el contacto de un **profesional de confianza** que realiza este trabajo de forma independiente:`, 'bot');
                setTimeout(() => {
                    this.addMessage(`<a href="${waLink}" target="_blank" class="opt-btn cta" style="background:#25d366">Contactar a ${tecnico} por WhatsApp →</a>`, 'bot');
                    setTimeout(() => this.startConversation(), 3000);
                }, 500);
            }, 800);
        } else {
            this.addMessage("¡Perfecto! Ya recolectamos la información necesaria para el servicio técnico.", 'bot');
            let bodyText = `Titular/Empresa: ${this.userData.nombre}\nEmail: ${this.userData.email}\nTeléfono: ${this.userData.telefono}\nUbicación: ${this.userData.direccion}\nEquipo: ${this.userData.equipoTipo}\n\nProblema:\n${this.userData.detalleProblema}\n\nOrigen: Chatbot Energe`;
            this.sendEmail(`Incidencia Postventa - ${this.userData.nombre}`, bodyText, 'post-venta@energesa.odoo.com');
        }
    },

    sendEmail(subject, body, to) {
        const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setTimeout(() => {
            this.addMessage(`Hacé clic abajo para enviar la información:`, 'bot');
            setTimeout(() => {
                this.addMessage(`<a href="${mailto}" class="opt-btn cta">Enviar vía Email →</a>`, 'bot');
            }, 500);
        }, 800);
    }
};

// CSS for typing indicator
const style = document.createElement('style');
style.textContent = `
    .dot { display: inline-block; width: 6px; height: 6px; background: #888; border-radius: 50%; margin: 0 2px; animation: bounce 1.4s infinite ease-in-out both; }
    .dot:nth-child(1) { animation-delay: -0.32s; }
    .dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => EnergeBot.init());
