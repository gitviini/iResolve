import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../core/services/profile/profile.service';
import { ToastService } from '../../core/services/toast/toast.service';
import { UserProfile } from '../../core/models/interfaces/profile.interface';
import { Navbar } from '../../core/components/navbar/navbar';
import { Needcard } from '../../shared/components/needcard/needcard';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FileService } from '../../core/services/file/file.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, RouterLink, Navbar, Needcard],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileService = inject(ProfileService);
  toastService = inject(ToastService);
  fileService = inject(FileService);
  activatedRoute = inject(ActivatedRoute);

  profile!: UserProfile;
  isEditing = false;
  isAddSkill = false;
  addSkillContent = "";
  isLoading = false;
  editForm!: UserProfile;
  nickname = this.activatedRoute.snapshot.paramMap.get('nickname') ?? undefined;
  ownProfile = false;

  // --- Variáveis do Calendário (UH11) ---
  showCalendarModal = false;
  tempStatus: 'AVAILABLE' | 'BUSY' = 'AVAILABLE';
  tempBlockedDates: string[] = []; // Agora armazena 'YYYY-MM-DD'

  // Controle de Navegação do Calendário
  currentDate = new Date(); // Data base para o mês exibido
  calendarDays: { day: number | null; fullDate?: string }[] = [];
  weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  ngOnInit(): void {
    let user: UserProfile = JSON.parse(localStorage.getItem('user') ?? '{}');
    if (user.nickname == this.nickname) {
      this.ownProfile = true;
    }

    this.profileService.getProfile(this.nickname).subscribe((data: any) => {
      this.profile = data;
      this.editForm = { ...data };
      
      if(!data.skills){
        this.profile.skills = []
        this.editForm.skills = []
      }
      if(this.profile.skills[0].includes("[")){
        this.profile.skills = this.profile.skills.toString().replaceAll("]","").replaceAll("[","").split(",")
        this.editForm.skills = this.editForm.skills.toString().replaceAll("]","").replaceAll("[","").split(",")
      }

      this.loadAvailability();
    });
  }

  // --- Lógica de Perfil (UH12) ---
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) this.editForm = { ...this.profile };
  }

  save() {
    this.isLoading = true;
    this.profileService.updateProfile(this.editForm).subscribe({
      next: (_data) => {
        this.isLoading = false;
        this.isEditing = false;
        this.toastService.add('Perfil atualizado!', 'sucess');
        // insert changes in profile
        console.log(this.profile);
        this.profile = { ...this.editForm };
        console.log(this.profile);
        if(this.profile.skills[0].includes("[")){
          this.profile.skills = this.profile.skills.toString().replaceAll("]","").replaceAll("[","").split(",");
        }
        localStorage.setItem('user', JSON.stringify(this.profile));
      },
      error: (err) => {
        this.isLoading = false;
        this.isEditing = false;
        this.toastService.add('Falha ao atualizar perfil!', 'error');
      },
    });
  }

  cancel() {
    this.isEditing = false;
  }

  // --- Lógica mudar imagem ---
  changeImage(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.fileService.fileToBase64(file).then((imageUrl) => {
      this.profile.avatarUrl = imageUrl;
      this.editForm.avatarUrl = imageUrl;
    });
  }

  // --- Lógica de Adicionar skill ---
  toggleAddSkill(){
    this.isAddSkill = !this.isAddSkill
  }

  addSkillSave(){
    if(!this.addSkillContent.trim().length) return;

    console.log(this.addSkillContent)

    this.profile.skills.push(this.addSkillContent);
    this.editForm.skills.push(this.addSkillContent);
    this.addSkillContent = "";
    this.isAddSkill = false;
  }

  removeSkill(index: number){
    if(!this.isEditing) return;
    this.profile.skills.splice(index, 1);
    this.editForm.skills.splice(index, 1);

    console.log(this.editForm.skills)
  }

  // --- Lógica de Calendário (UH11) ---

  loadAvailability() {
    let isBlokedCurrentDate = false;
    const currentDate = new Date()
      .toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      .split('/')
      .reverse()
      .join('-');
    this.profile.blockedDates?.forEach((date) => {
      if (currentDate == date) {
        isBlokedCurrentDate = true;
      }
    });
    this.profile.status = isBlokedCurrentDate ? 'BUSY' : 'AVAILABLE';
  }

  openCalendar() {
    if (!this.profile) return;
    this.tempBlockedDates = [...(this.profile.blockedDates ?? [])];
    this.tempStatus = this.profile.status ?? 'BUSY';
    this.generateCalendar(); // Gera os dias do mês atual
    this.showCalendarModal = true;
  }

  closeCalendar() {
    this.showCalendarModal = false;
  }

  // Gera a grade do mês
  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Primeiro dia do mês (0 = Domingo, 1 = Segunda...)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Total de dias no mês
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.calendarDays = [];

    // Preenche espaços vazios antes do dia 1
    for (let i = 0; i < firstDayIndex; i++) {
      this.calendarDays.push({ day: null });
    }

    // Preenche os dias reais
    for (let i = 1; i <= daysInMonth; i++) {
      // Formata YYYY-MM-DD para comparar fácil
      const fullDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${i
        .toString()
        .padStart(2, '0')}`;
      this.calendarDays.push({ day: i, fullDate });
    }
  }

  changeMonth(step: number) {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + step));
    this.generateCalendar();
  }

  toggleDate(dateStr?: string) {
    if (!dateStr) return;

    if (this.tempBlockedDates.includes(dateStr)) {
      // Desbloquear
      this.tempBlockedDates = this.tempBlockedDates.filter((d) => d !== dateStr);
    } else {
      // Bloquear
      this.tempBlockedDates.push(dateStr);
    }
  }

  toggleGlobalStatus() {
    this.tempStatus = this.tempStatus === 'AVAILABLE' ? 'BUSY' : 'AVAILABLE';
  }

  async saveAvailability() {
    this.isLoading = true;
    this.profileService.updateAvailability(this.tempStatus, this.tempBlockedDates).subscribe({
      next: (_data) => {
        this.isLoading = false;
        this.isEditing = false;
        this.loadAvailability();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.isEditing = false;
        this.toastService.add('Falha ao atualizar disponibilidade!', 'error');
      },
    });
    this.profile.blockedDates = this.tempBlockedDates;
    this.isLoading = false;
    this.showCalendarModal = false;
  }
}
