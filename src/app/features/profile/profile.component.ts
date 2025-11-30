import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../core/services/profile/profile.service';
import { ToastService } from '../../core/services/toast/toast.service';
import { UserProfile } from '../../core/models/interfaces/profile.interface';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileService = inject(ProfileService);
  toastService = inject(ToastService);

  profile!: UserProfile;
  isEditing = false;
  isLoading = false;
  editForm!: UserProfile;

  // --- Variáveis do Calendário (UH11) ---
  showCalendarModal = false;
  tempStatus: 'AVAILABLE' | 'BUSY' = 'AVAILABLE';
  tempBlockedDates: string[] = []; // Agora armazena 'YYYY-MM-DD'
  
  // Controle de Navegação do Calendário
  currentDate = new Date(); // Data base para o mês exibido
  calendarDays: { day: number | null, fullDate?: string }[] = [];
  weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(data => {
      this.profile = data;
      this.editForm = { ...data };
    });
  }

  // --- Lógica de Perfil (UH12) ---
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) this.editForm = { ...this.profile };
  }

  async save() {
    this.isLoading = true;
    const success = await this.profileService.updateProfile(this.editForm);
    this.isLoading = false;
    if (success) {
      this.isEditing = false;
      this.toastService.add("Perfil atualizado!", "sucess");
    }
  }

  // --- Lógica de Calendário (UH11) ---

  openCalendar() {
    if (!this.profile) return;
    this.tempBlockedDates = [...this.profile.blockedDates];
    this.tempStatus = this.profile.status;
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
      // Desbloquear
      this.tempBlockedDates = this.tempBlockedDates.filter(d => d !== dateStr);
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
    await this.profileService.updateAvailability(this.tempStatus, this.tempBlockedDates);
    this.isLoading = false;
    this.showCalendarModal = false;
    this.toastService.add("Agenda atualizada!", "sucess");
  }
}