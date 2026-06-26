import os
import re
import glob

# Mapping of ES basename -> EN basename
es_to_en = {
    'preguntas-frecuentes.html': 'faq.html',
    'privacidad.html': 'privacy.html',
    'legales.html': 'legal.html',
    'index.html': 'index.html'
}
en_to_es = {v: k for k, v in es_to_en.items()}

# Find all html files
files = glob.glob('**/*.html', recursive=True)

for file in files:
    if '404' in file:
        continue
    
    parts = file.split('/')
    is_en = parts[0] == 'en'
    
    depth = len(parts) - 1
    prefix = '../' * depth if depth > 0 else './'
    
    basename = parts[-1]
    
    if is_en:
        # We are in EN site
        # Find ES counterpart
        if basename in en_to_es:
            es_base = en_to_es[basename]
        else:
            es_base = basename
            
        es_path = prefix + ('/'.join(parts[1:-1]) + '/' + es_base if len(parts) > 2 else es_base)
        en_path = basename
        
        # We need to construct the hrefs
        es_href = es_path
        en_href = en_path
        active_es = ""
        active_en = " active"
    else:
        # We are in ES site
        # Find EN counterpart
        if basename in es_to_en:
            en_base = es_to_en[basename]
        else:
            en_base = basename
            
        en_path = prefix + 'en/' + ('/'.join(parts[:-1]) + '/' + en_base if len(parts) > 1 else en_base)
        es_path = basename
        
        es_href = es_path
        en_href = en_path
        active_es = " active"
        active_en = ""
        
    # Clean up paths
    es_href = es_href.replace('./', '')
    if es_href == '': es_href = 'index.html'
    if en_href == '': en_href = 'index.html'
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace the li
    pattern = r'<li class="nav-lang-li">.*?</li>'
    replacement = f'<li class="nav-lang-li"><a class="lang-btn{active_es}" href="{es_href}">ES</a><span class="lang-sep">|</span><a class="lang-btn{active_en}" href="{en_href}">EN</a></li>'
    
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)

print("Done updating language links.")
