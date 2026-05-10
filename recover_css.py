import json
import re

log_path = "/Users/chinthakalakshan/.gemini/antigravity/brain/d95c91f3-9c6e-4026-9dee-5e0338b68714/.system_generated/logs/overview.txt"

content_blocks = []
with open(log_path, 'r') as f:
    for line in f:
        if 'styles.css' in line:
            content_blocks.append(line)

with open('styles_recovery.txt', 'w') as f:
    for block in content_blocks:
        f.write(block + "\n")

print(f"Found {len(content_blocks)} blocks containing styles.css")
