import os

extensions = ['.ts', '.html', '.scss', '.css', '.json']
ignore_dirs = ['node_modules', '.git', 'dist', '.vscode', '.angular', 'data']
output_file = 'contexto_projeto.txt'

with open(output_file, 'w', encoding='utf-8') as outfile:
    for root, dirs, files in os.walk('.'):
        # Remove pastas ignoradas da busca
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, file)
                
                # Escreve o nome do arquivo para eu saber onde estou
                outfile.write(f'\n\n--- ARQUIVO: {file_path} ---\n\n')
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as infile:
                        outfile.write(infile.read())
                except Exception as e:
                    outfile.write(f"Erro ao ler arquivo: {e}")

print(f"Pronto! Todo o código foi salvo em '{output_file}'.")