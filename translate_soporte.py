import re

with open('soporte.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Meta and Head
html = html.replace('Servicio Postventa y Soporte Técnico | Energe', 'After-Sales Service and Technical Support | Energe')
html = html.replace('Solicitá soporte técnico oficial para tus sistemas de energía solar Energe. Gestión de incidencias postventa para equipos on-grid, off-grid e industriales.', 'Request official technical support for your Energe solar energy systems. After-sales incident management for on-grid, off-grid, and industrial equipment.')
html = html.replace('Especialistas en soluciones Fotovoltaicas Industriales en Argentina', 'Specialists in Industrial Photovoltaic solutions in Argentina')
html = html.replace('https://energe.com.ar/soporte.html', 'https://energe.com.ar/en/support.html')

# Nav
html = html.replace('SOLUCIONES <span class="dd-arrow">▾</span>', 'SOLUTIONS <span class="dd-arrow">▾</span>')
html = html.replace('SOLAR ON-GRID', 'ON-GRID SOLAR')
html = html.replace('OFF-GRID / BACKUP INDUSTRIAL', 'INDUSTRIAL OFF-GRID / BACKUP')
html = html.replace('OBRAS REALIZADAS', 'PROJECTS')
html = html.replace('href="blog.html">BLOG', 'href="blog.html">BLOG')
html = html.replace('PREGUNTAS FRECUENTES', 'FAQ')
html = html.replace('href="contacto.html">CONTACTO', 'href="contacto.html">CONTACT')
html = html.replace('COTIZÁ TU PROYECTO', 'GET A QUOTE')
html = html.replace('href="soporte.html">ES</a><span class="lang-sep">|</span><a class="lang-btn" href="en/soporte.html">EN</a>', 'href="../soporte.html">ES</a><span class="lang-sep">|</span><a class="lang-btn active" href="support.html">EN</a>')
html = html.replace('href="./"', 'href="./index.html"')
html = html.replace('href="soluciones-ongrid.html"', 'href="soluciones-ongrid.html"') # Will be fixed by script later
html = html.replace('Abrir menú', 'Open menu')
html = html.replace('Cerrar menú', 'Close menu')

# Hero
html = html.replace('Servicio Postventa', 'After-Sales Service')
html = html.replace('Soporte Técnico<br><em>Especializado</em>', 'Specialized<br><em>Technical Support</em>')
html = html.replace('Gestionamos tus incidencias técnicas de forma directa. Completá el formulario para que nuestro equipo de postventa analice tu caso y genere un ticket en nuestro sistema Odoo.', 'We manage your technical incidents directly. Fill out the form so our after-sales team can analyze your case and generate a ticket in our Odoo system.')

# Content
html = html.replace('Garantía de Calidad', 'Quality Guarantee')
html = html.replace('Tu inversión,<br><em>siempre operativa</em>', 'Your investment,<br><em>always operational</em>')
html = html.replace('En Energe acompañamos la vida útil de tu equipo. Nuestra área de postventa centraliza las solicitudes para brindar una respuesta ágil y técnica.', 'At Energe we accompany the useful life of your equipment. Our after-sales area centralizes requests to provide an agile and technical response.')
html = html.replace('Generación de ticket oficial en Odoo', 'Generation of an official ticket in Odoo')
html = html.replace('Análisis por ingenieros especializados', 'Analysis by specialized engineers')
html = html.replace('Seguimiento de incidencias en tiempo real', 'Real-time incident tracking')
html = html.replace('Repuestos originales y soporte oficial', 'Original spare parts and official support')

html = html.replace('Datos del Titular', 'Holder Details')
html = html.replace('Ingresá los datos tal cual figuran en tu factura de compra.', 'Enter the details exactly as they appear on your purchase invoice.')
html = html.replace('Titular o Razón Social *', 'Holder or Company Name *')
html = html.replace('Ej: Juan Pérez o Industrias SA', 'Ex: John Doe or Industries LLC')
html = html.replace('Email del Titular *', 'Holder Email *')
html = html.replace('correo@empresa.com', 'email@company.com')
html = html.replace('Teléfono de contacto *', 'Contact Phone *')
html = html.replace('Dirección del equipo *', 'Equipment Address *')
html = html.replace('Calle, Nro, Localidad y Provincia', 'Street, Number, City, and Province')
html = html.replace('Tipo de equipo *', 'Equipment Type *')
html = html.replace('Seleccioná una opción', 'Select an option')
html = html.replace('Fotovoltaico On grid', 'On-grid Photovoltaic')
html = html.replace('Fotovoltaico Off grid / Híbridos', 'Off-grid Photovoltaic / Hybrids')
html = html.replace('Termotanques y equipos combinados', 'Solar Water Heaters and Combined Equipment')
html = html.replace('Climatización de piscinas', 'Pool Heating')
html = html.replace('Otros', 'Others')
html = html.replace('Detalle del problema o incidencia *', 'Detail of the problem or incident *')
html = html.replace('Describí brevemente lo que sucede con el equipo...', 'Briefly describe what is happening with the equipment...')
html = html.replace('Generar Ticket de Soporte', 'Generate Support Ticket')

html = html.replace('Aviso importante', 'Important Notice')
html = html.replace('Informamos que actualmente Energe ya no realiza el mantenimiento técnico de estos equipos. Para tu solución, te derivamos con <strong>${tecnico}</strong>, profesional independiente de confianza.', 'Please note that Energe currently no longer performs technical maintenance on these units. For your solution, we refer you to <strong>${tecnico}</strong>, a trusted independent professional.')
html = html.replace('Contactar por WhatsApp →', 'Contact via WhatsApp →')

# Javascript
html = html.replace('Servicio Técnico de ${data.equipo}', 'Technical Service for ${data.equipo}')
html = html.replace('Hola ${tecnico}, mi nombre es ${data.nombre} y te contacto desde el sitio de Energe por una incidencia en un equipo de ${data.equipo}.\\nUbicación: ${data.direccion}\\nProblema: ${data.problema}', 'Hello ${tecnico}, my name is ${data.nombre} and I am contacting you from the Energe website regarding an incident with a ${data.equipo} unit.\\nLocation: ${data.direccion}\\nProblem: ${data.problema}')
html = html.replace('Incidencia Postventa - ${data.nombre}', 'After-Sales Incident - ${data.nombre}')
html = html.replace('Titular/Empresa: ${data.nombre}\\nEmail: ${data.email}\\nTeléfono: ${data.telefono}\\nUbicación: ${data.direccion}\\nEquipo: ${data.equipo}\\n\\nProblema:\\n${data.problema}\\n\\nOrigen: Formulario Postventa Web', 'Holder/Company: ${data.nombre}\\nEmail: ${data.email}\\nPhone: ${data.telefono}\\nLocation: ${data.direccion}\\nEquipment: ${data.equipo}\\n\\nProblem:\\n${data.problema}\\n\\nOrigin: Web After-Sales Form')
html = html.replace('¡Gracias! Se abrirá tu aplicación de correo para enviar el ticket a nuestro sistema Odoo.', 'Thank you! Your email application will open to send the ticket to our Odoo system.')
html = html.replace("const isTermo = data.equipo === 'Termotanques y equipos combinados';", "const isTermo = data.equipo === 'Solar Water Heaters and Combined Equipment';")
html = html.replace("const isPiscina = data.equipo === 'Climatización de piscinas';", "const isPiscina = data.equipo === 'Pool Heating';")

# Link fixes for english
html = html.replace('href="style.css', 'href="../style.css')
html = html.replace('href="chatbot.css', 'href="../chatbot.css')
html = html.replace('src="images/', 'src="../images/')
html = html.replace('href="images/', 'href="../images/')
html = html.replace('src="chatbot.js"', 'src="../chatbot.js"')

with open('en/support.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Created en/support.html")
