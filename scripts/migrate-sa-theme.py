import os
import re
import sys

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replacements mapping
    # Note: text-slate-900 -> text-white, text-slate-800 -> text-white, text-slate-700 -> text-sa-muted
    # bg-white -> bg-sa-surface
    # bg-slate-50 -> bg-sa-bg
    # border-slate-200 -> border-sa-border
    replacements = [
        (r'bg-white', r'bg-sa-surface'),
        (r'bg-slate-50/80', r'bg-sa-bg/80'),
        (r'bg-slate-50/40', r'bg-sa-bg/40'),
        (r'bg-slate-50', r'bg-sa-bg'),
        (r'bg-slate-100', r'bg-sa-surface'),
        (r'bg-slate-200', r'bg-sa-border'),
        (r'bg-slate-900', r'bg-sa-bg'),
        (r'text-slate-900', r'text-white'),
        (r'text-slate-800', r'text-white'),
        (r'text-slate-700', r'text-sa-muted'),
        (r'text-slate-600', r'text-sa-muted/80'),
        (r'text-slate-500', r'text-sa-muted/60'),
        (r'text-slate-400', r'text-sa-muted/40'),
        (r'border-slate-100', r'border-sa-border'),
        (r'border-slate-200/90', r'border-sa-border/90'),
        (r'border-slate-200/60', r'border-sa-border/60'),
        (r'border-slate-200', r'border-sa-border'),
        (r'border-slate-300', r'border-sa-border'),
        (r'border-slate-400', r'border-sa-border/80'),
        (r'ring-slate-200/60', r'ring-sa-border/60'),
        (r'divide-slate-100', r'divide-sa-border'),
        (r'hover:border-slate-400', r'hover:border-sa-primary/50'),
        (r'hover:bg-slate-100', r'hover:bg-sa-bg'),
        (r'hover:bg-slate-200', r'hover:bg-sa-surface'),
        (r'hover:text-slate-900', r'hover:text-white'),
        (r'shadow-sm', r''), # Remove shadow-sm in dark mode
        # Also fix some ocean- classes
        (r'text-ocean-600', r'text-sa-primary'),
        (r'text-ocean-700', r'text-sa-primary'),
        (r'text-ocean-800', r'text-white'),
        (r'text-ocean-900', r'text-white'),
        (r'bg-ocean-50', r'bg-sa-primary/10'),
        (r'bg-ocean-100', r'bg-sa-primary/20'),
        (r'bg-ocean-600', r'bg-sa-primary'),
        (r'bg-ocean-700', r'bg-sa-primary/80'),
        (r'border-ocean-200', r'border-sa-primary/20'),
        (r'border-ocean-300', r'border-sa-primary/30'),
        (r'border-ocean-400', r'border-sa-primary/40'),
        (r'border-ocean-600', r'border-sa-primary'),
    ]

    new_content = content
    for pattern, repl in replacements:
        new_content = re.sub(pattern, repl, new_content)
        
    # Extra fix for body class
    new_content = re.sub(r'bg-slate-50', r'bg-sa-bg', new_content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes for {filepath}")

for root, _, files in os.walk(sys.argv[1]):
    for file in files:
        if file.endswith('.tsx'):
            replace_in_file(os.path.join(root, file))
