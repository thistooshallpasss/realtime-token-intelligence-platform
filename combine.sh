#!/bin/bash

OUTPUT_FILE="copy.txt"
> "$OUTPUT_FILE"

echo "🔍 Scanning project for relevant code files..."

# 1. Export Directory Tree (Ignoring junk)
echo "// ===== PROJECT STRUCTURE =====" >> "$OUTPUT_FILE"
if command -v tree >/dev/null 2>&1; then
    # Shows structure but ignores node_modules, .next, .git, and junk folders
    tree . -I "node_modules|.next|.git|.vercel|dist|build|coverage|.DS_Store" >> "$OUTPUT_FILE"
else
    # Fallback if 'tree' is not installed
    find . -maxdepth 3 -not -path '*/.*' >> "$OUTPUT_FILE"
fi
echo "" >> "$OUTPUT_FILE"

# 2. Export Content of Critical Files Only
# Looks inside src, backend, and root config files.
# Ignores images, SVGs, JSON locks, and system files.

echo "// ===== CODE CONTENTS =====" >> "$OUTPUT_FILE"

find src backend \
    -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.mjs" \
    -not -name "*.d.ts" \
    | while read file; do
        echo "--------------------------------------------------" >> "$OUTPUT_FILE"
        echo "// FILE: $file" >> "$OUTPUT_FILE"
        echo "--------------------------------------------------" >> "$OUTPUT_FILE"
        cat "$file" >> "$OUTPUT_FILE"
        echo -e "\n\n" >> "$OUTPUT_FILE"
done

# Also add root config files
for file in package.json tsconfig.json next.config.ts tailwind.config.ts postcss.config.mjs; do
    if [ -f "$file" ]; then
        echo "--------------------------------------------------" >> "$OUTPUT_FILE"
        echo "// FILE: $file" >> "$OUTPUT_FILE"
        echo "--------------------------------------------------" >> "$OUTPUT_FILE"
        cat "$file" >> "$OUTPUT_FILE"
        echo -e "\n\n" >> "$OUTPUT_FILE"
    fi
done

echo "✅ Done! Code exported to $OUTPUT_FILE"