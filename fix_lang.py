import os
import re
import glob

# Mapping of ES basename -> EN basename
es_to_en = {
    'preguntas-frecuentes.html': 'faq.html',
    'privacidad.html': 'privacy.html',
    'legales.html': 'legal.html',
    'index.html': 'index.html',
    'aumento-tarifas-industriales-energia-solar.html': 'industrial-tariffs-increase-solar.html',
    'ecocuyo-2024-energe-17-anos.html': 'ecocuyo-2024-energe-17-years.html',
    'ley-generacion-distribuida.html': 'distributed-generation-law.html',
    'mendovoz-2020-parque-solar-santa-rosa.html': 'mendovoz-2020-santa-rosa-solar-park.html',
    'pv-magazine-2020-parque-solar-mendoza.html': 'pv-magazine-2020-mendoza-solar-park.html',
    'rimi-2026-energia-solar-pymes.html': 'rimi-2026-solar-energy-smes.html',
    'roi-solar-industrial.html': 'solar-roi.html',
    'vaca-muerta-energia-offgrid.html': 'vaca-muerta-offgrid-energy.html',
    'sistemas-bess.html': 'sistemas-bess.html',
    'soporte.html': 'support.html'
}

en_to_es = {v: k for k, v in es_to_en.items()}

files = glob.glob('**/*.html', recursive=True)

for file in files:
    if '404' in file:
        continue
    
    parts = file.split('/')
    is_en = parts[0] == 'en'
    
    depth = len(parts) - 1
    prefix = '../' * depth if depth > 0 else ''
    
    basename = parts[-1]
    
    if is_en:
        if basename in en_to_es:
            es_base = en_to_es[basename]
        else:
            es_base = basename
            
        if depth > 1:
            es_path = prefix + '/'.join(parts[1:-1]) + '/' + es_base
        else:
            es_path = prefix + es_base
            
        en_path = basename
        
        es_href = es_path
        en_href = en_path
        active_es = ""
        active_en = " active"
    else:
        if basename in es_to_en:
            en_base = es_to_en[basename]
        else:
            en_base = basename
            
        if depth > 0:
            en_path = prefix + 'en/' + '/'.join(parts[:-1]) + '/' + en_base
        else:
            en_path = 'en/' + en_base
            
        es_path = basename
        
        es_href = es_path
        en_href = en_path
        active_es = " active"
        active_en = ""
        
    if es_href == '': es_href = 'index.html'
    if en_href == '': en_href = 'index.html'
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    pattern = r'<li class="nav-lang-li">.*?</li>'
    replacement = f'<li class="nav-lang-li"><a class="lang-btn{active_es}" href="{es_href}">ES</a><span class="lang-sep">|</span><a class="lang-btn{active_en}" href="{en_href}">EN</a></li>'
    
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # Also fix footer links to soporten.html
    new_content = new_content.replace('href="soporte.html"', 'href="soporte.html"')
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)

print("Done mapping all pages!")
