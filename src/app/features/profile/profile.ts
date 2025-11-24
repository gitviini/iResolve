import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  profileService = inject(ProfileService);
  toastService = inject(ToastService);
  route = inject(ActivatedRoute);

  user: any = {};
  isAvailable: boolean = true;
  isEditing: boolean = false;
  userId: string = '';
  
  // Variáveis para o formulário de edição
  editForm: any = {};
  newSkill: string = '';

  async ngOnInit() {
    // Pega o ID da URL (ex: /profile/123)
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    
    // Se não tiver ID na URL, tenta pegar um ID fixo de teste (o que criamos na UH3/UH5)
    if (!this.userId) { 
        // ATENÇÃO: Num app real, pegaríamos do Token de Login
        // Aqui vou chutar um ID que vamos descobrir no banco depois
        this.userId = 'id-do-usuario-aqui'; 
    }

    await this.loadProfile();
  }

  async loadProfile() {
    try {
      this.user = await this.profileService.getProfile(this.userId);
    } catch (e) {
      this.toastService.add("Erro ao carregar perfil", "error");
    }
  }

  toggleAvailability() {
    this.isAvailable = !this.isAvailable;
    // Opcional: Se quiser salvar isso no banco imediatamente
    // this.saveAvailability(); 
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      // Clona os dados para o formulário
      this.editForm = { ...this.user };
    }
  }

  // Adiciona skill na lista (Edição)
  addSkill() {
    if (this.newSkill.trim()) {
      const currentSkills = this.editForm.skills ? this.editForm.skills.split(',') : [];
      currentSkills.push(this.newSkill.trim());
      this.editForm.skills = currentSkills.join(',');
      this.newSkill = '';
    }
  }

  // Remove skill (Edição)
  removeSkill(skillToRemove: string) {
    let skills = this.editForm.skills.split(',');
    skills = skills.filter((s: string) => s.trim() !== skillToRemove.trim());
    this.editForm.skills = skills.join(',');
  }

  // Imagem
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => { this.editForm.avatarUrl = e.target.result; };
      reader.readAsDataURL(file);
    }
  }

  async save() {
    try {
      const updatedUser = await this.profileService.updateProfile(this.userId, this.editForm);
      this.user = updatedUser; // Atualiza a tela de visualização
      this.isEditing = false;
      this.toastService.add("Perfil atualizado com sucesso!", "sucess");
    } catch (e) {
      this.toastService.add("Erro ao salvar perfil", "error");
    }
  }

  // Helper para exibir skills como array
  getSkillsArray(skillsString: string): string[] {
    if (!skillsString) return [];
    return skillsString.split(',').filter(s => s.trim() !== '');
  }
}