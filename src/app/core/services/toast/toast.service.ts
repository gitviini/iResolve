import { Injectable } from '@angular/core';
import { ToastInterface } from '../../models/interfaces/toast.interface';

@Injectable({
  providedIn: 'root'
})

/*
 *  Toast notification [UH1]
 */

export class ToastService {
  toasts: ToastInterface[] = [];
  private duration = 4000;

  // adiciona toast a lista de toasts
  add(message: string, type: "sucess" | "warning" | "error") {
    // instancia novo toast
    const toast: ToastInterface = {
      message: message,
      type: type,
      duration: this.duration,
    }

    // adiciona ao fim da lista
    this.toasts.push(toast);
    
    // configura timeout para remover toast
    setTimeout(() => {
      this.remove(0)
    }, toast.duration);
  }

  // remove o toast da lista através do index
  remove(index: number) {
    this.toasts.splice(index, 1);
  }

  // converte o status em um tipo ("sucess" | "warning" | "error")
  statusToType(status: number): "sucess" | "warning" | "error" {
    if (status >= 200 && status < 300) {
      return "sucess";
    }
    else if (status >= 400 && status < 500) {
      return "warning";
    }
    else if (status >= 500 && status < 600) {
      return "error";
    }

    return "error";
  }
}