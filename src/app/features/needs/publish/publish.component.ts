import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NeedService } from '../../../core/services/need/need.service';
import { ToastService } from '../../../core/services/toast/toast.service';
import { NeedInterface } from '../../../core/models/interfaces/need.interface';

@Component({
  selector: 'app-publish',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.css'
})
export class PublishComponent {
  fb = inject(FormBuilder);
  
  needService: NeedService = inject(NeedService);
  toastService: ToastService = inject(ToastService);
  
  router = inject(Router);

  isLoading = false;
  selectedImages: { file: File, url: string }[] = [];
  
  availableCategories = ['Pedreiro', 'Pintor', 'Eletricista', 'Encanador', 'Faxina'];
  selectedCategory = '';

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(25)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    value: ['', Validators.required],
    location: ['', Validators.required]
  });

  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }

  onFileSelected(event: any) {
    if (this.selectedImages.length >= 3) {
      this.toastService.add("Máximo de 3 imagens.", "warning");
      return;
    }

    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImages.push({ file, url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
  }

  async submit() {
    if (this.form.invalid || !this.selectedCategory) {
      this.toastService.add("Preencha todos os campos e escolha uma categoria.", "warning");
      return;
    }

    this.isLoading = true;

    const newNeed: NeedInterface = {
      title: this.form.value.title ?? '',
      description: this.form.value.description ?? '',
      category: this.selectedCategory,
      value: Number(this.form.value.value),
      location: this.form.value.location ?? '',
      images: this.selectedImages.map(img => img.file),
      status: 'OPEN'
    };

    const success = await this.needService.createNeed(newNeed);
    this.isLoading = false;

    if (success) {
      this.toastService.add("Necessidade publicada com sucesso!", "sucess");
      this.router.navigate(['/home']);
    } else {
      this.toastService.add("Erro ao publicar.", "error");
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}