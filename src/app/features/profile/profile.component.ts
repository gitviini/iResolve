import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; // Importante para o link funcionar
import { ProfileService } from '../../core/services/profile.service';
import { ToastService } from '../../core/services/toast.service';
import { UserProfile } from '../../core/models/interfaces/profile.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // RouterLink incluído aqui
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileService = inject(ProfileService);
  toastService = inject(ToastService);

  profile!: UserProfile;
  isEditing = false;
  isLoading = false;

  // Controle das abas do perfil (Publicadas vs Candidaturas)
  activeProfileTab: 'MY_NEEDS' | 'APPLICATIONS' = 'MY_NEEDS';

  // Cópia temporária para edição (UH12)
  editForm!: UserProfile;

  // Variáveis da Agenda/Disponibilidade (UH11)
  showCalendarModal = false;
  daysOfMonth = Array.from({length: 30}, (_, i) => i + 1);
  tempBlockedDates: string[] = [];
  tempStatus: 'AVAILABLE' | 'BUSY' = 'AVAILABLE';
  
  // Controle de Navegação do Calendário
  currentDate = new Date();
  calendarDays: { day: number | null, fullDate?: string }[] = [];
  weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(data => {
      this.profile = data;
      this.editForm = { ...data };
    });
  }

  // --- Lógica de Edição de Perfil (UH12) ---

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
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

  // --- Lógica de Disponibilidade (UH11) ---

  openCalendar() {
    if (!this.profile) return;
    this.tempBlockedDates = [...this.profile.blockedDates];
    this.tempStatus = this.profile.status;
    this.generateCalendar();
    this.showCalendarModal = true;
  }

  closeCalendar() {
    this.showCalendarModal = false;
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.calendarDays = [];

    // Espaços vazios
    for (let i = 0; i < firstDayIndex; i++) {
      this.calendarDays.push({ day: null });
    }

    // Dias reais
    for (let i = 1; i <= daysInMonth; i++) {
      const fullDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
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
      this.tempBlockedDates = this.tempBlockedDates.filter(d => d !== dateStr);
    } else {
      this.tempBlockedDates.push(dateStr);
    }
  }

  toggleGlobalStatus() {
    this.tempStatus = this.tempStatus === 'AVAILABLE' ? 'BUSY' : 'AVAILABLE';
  }

  async saveAvailability() {
    this.isLoading = true;
    await this.profileService.updateAvailability(this.tempStatus, this.tempBlockedDates);
    this.isLoading = false;
    this.showCalendarModal = false;
    this.toastService.add("Agenda atualizada!", "sucess");
  }
}