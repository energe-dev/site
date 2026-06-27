import glob
import re

files = ['legales.html', 'privacidad.html', 'en/legal.html', 'en/privacy.html']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Change .legal-hero padding to 96px horizontal
    content = content.replace('padding:72px 64px 56px', 'padding:72px 96px 56px')
    
    # Change .legal-wrap to have no max-width and no margin auto, and 96px padding
    content = content.replace('max-width:820px;margin:0 auto;padding:72px 64px', 'padding:72px 96px')
    
    # Give max-width to .legal-body
    content = content.replace('.legal-body{font-size:15px', '.legal-body{max-width:820px;font-size:15px')
    
    # Fix mobile padding
    content = content.replace('.legal-hero{padding:48px 20px 36px}', '.legal-hero{padding:48px 20px 36px}') # already fine
    content = content.replace('.legal-wrap{padding:48px 20px}', '.legal-wrap{padding:48px 20px}') # already fine
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed inline styles in legal docs")
