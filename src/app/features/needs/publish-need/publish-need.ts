import { Component, inject, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // IMPORTANTE: Importar Router
import { NeedService } from '../../../core/services/need.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-publish-need',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './publish-need.html',
  styleUrl: './publish-need.css'
})
export class PublishNeed {
  needService = inject(NeedService);
  toastService = inject(ToastService);
  router = inject(Router); // Injetar o Router

  @Output() close = new EventEmitter<void>();

  formNeed = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    value: new FormControl(null, [Validators.required]),
    cep: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl('', [Validators.required]),
    imageBase64: new FormControl('')
  });

  async searchCep() {
    const cep = this.formNeed.get('cep')?.value;
    if (cep && cep.length >= 8) {
      const data = await this.needService.getAddressByCep(cep);
      if (!data.erro) {
        const fullAddress = `${data.logradouro}, ${data.bairro} - ${data.localidade}`;
        this.formNeed.patchValue({ address: fullAddress });
        this.toastService.add("Endereço encontrado!", "sucess");
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formNeed.patchValue({ imageBase64: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  async submit() {
    if (this.formNeed.invalid) {
      // CORREÇÃO: Mensagem correta e para o fluxo aqui
      this.toastService.add("Preencha os campos obrigatórios", "warning");
      return;
    }

    const payload = {
      ...this.formNeed.value,
      // ATENÇÃO: Substitua este CPF por um que EXISTA no seu banco de dados H2
      // Se você criou um usuário na UH1, use o CPF dele aqui.
      userCpf: '95547975087', 
      tags: [this.formNeed.get('category')?.value]
    };

    const { data, status } = await this.needService.publishNeed(payload);

    if (status === 201) {
      this.toastService.add("Necessidade criada com sucesso!", "sucess");
      this.closeAndRedirect();
    } else if (status === 409) {
      this.toastService.add("Necessidade já existe!", "warning");
    } else {
      // O back-end agora retorna 500 com mensagem de erro
      this.toastService.add("Falha ao publicar necessidade", "error");
    }
  }

  cancel() {
    this.toastService.add("Publicação cancelada!", "warning");
    this.closeAndRedirect();
  }

  closeAndRedirect() {
    this.close.emit();
    // Redireciona para fora da tela (Login ou outra rota)
    this.router.navigate(['/auth/login']); 
  }

  // Getters para o HTML
  get titleLength() { return this.formNeed.get('title')?.value?.length || 0; }
  get descLength() { return this.formNeed.get('description')?.value?.length || 0; }
}