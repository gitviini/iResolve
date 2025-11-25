import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
// Note os dois pontos (../../) para voltar para a pasta 'app'
import { VerificationService } from '../../core/services/verification.service';
import { ToastService } from '../../core/services/toast.service';
import { VerificationStatus } from '../../core/models/interfaces/verification.interface';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [RouterLink],
  // CORREÇÃO AQUI: Os nomes devem bater com os arquivos da sua pasta (sem '.component')
  templateUrl: './verification.html',
  styleUrl: './verification.css'
})
export class VerificationComponent implements OnInit {
  verificationService = inject(VerificationService);
  toastService = inject(ToastService);

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isLoading = false;
  
  status: VerificationStatus = 'NONE';

  async ngOnInit() {
    const response = await this.verificationService.getStatus();
    this.status = response.status;
  }

  // Adicione essa propriedade na classe
  fileName: string = "";

  // Atualize este método
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.toastService.add("Por favor, selecione uma imagem.", "warning");
        return;
      }
      this.selectedFile = file;
      this.fileName = file.name; // Salva o nome para mostrar na tela
      
      const reader = new FileReader();
      reader.onload = (e) => this.previewUrl = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

  async submitDocument() {
    if (!this.selectedFile) {
      this.toastService.add("Selecione um documento primeiro.", "warning");
      return;
    }
    this.isLoading = true;
    const success = await this.verificationService.uploadDocument(this.selectedFile);
    this.isLoading = false;

    if (success) {
      this.status = 'PENDING';
      this.toastService.add("Documento enviado com sucesso!", "sucess");
    } else {
      this.toastService.add("Erro ao enviar documento.", "error");
    }
  }
}