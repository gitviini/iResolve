import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para editar os campos
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { ToastService } from '../../core/services/toast.service';
import { UserProfile } from '../../core/models/interfaces/profile.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileService = inject(ProfileService);
  toastService = inject(ToastService);

  profile!: UserProfile;
  isEditing = false; // Controla se mostra texto ou input
  isLoading = false;

  // Cópia temporária para edição
  editForm!: UserProfile;

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(data => {
      this.profile = data;
      this.editForm = { ...data }; // Clona os dados para o formulário
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Se cancelou, reseta o form
      this.editForm = { ...this.profile };
    }
  }

  async save() {
    this.isLoading = true;
    const success = await this.profileService.updateProfile(this.editForm);
    this.isLoading = false;

    if (success) {
      this.isEditing = false;
      this.toastService.add("Perfil atualizado com sucesso!", "sucess");
    } else {
      this.toastService.add("Erro ao atualizar perfil.", "error");
    }
  }
}