import json

with open('styles_recovery.txt', 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            content = data.get('content', '')
            if '1: * { margin: 0; padding: 0;' in content or '1: /*' in content or 'gift-btn' in content:
                print("FOUND POTENTIAL CSS BLOCK:")
                lines = content.split('\n')
                for l in lines:
                    if 'gift-btn' in l:
                        print(l)
        except Exception as e:
            pass
