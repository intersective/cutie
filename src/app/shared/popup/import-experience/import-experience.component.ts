import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { environment } from '@environments/environment';
import { TemplateLibraryService } from '@app/template-library/template-library.service';

@Component({
  selector: 'app-import-experience',
  templateUrl: 'import-experience.component.html',
  styleUrls: ['import-experience.component.scss']
})
export class ImportExperienceComponent implements OnInit {
  url: string;
  progress = 0;
  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private service: TemplateLibraryService
  ) { }

  ngOnInit() {
    // mock the progress bar behaviour
    if (environment.demo) {
      const interval = setInterval(() => {
        this.progress += 10;
        if (this.progress === 100) {
          clearInterval(interval);
          this.modalController.dismiss();
        }
      }, 200);
      return;
    }
    if (this.url) {
      this.service.importExperienceSSE(this.url).subscribe(
        data => {
          if (data.progress) {
            this.progress = data.progress;
            console.log(this.progress);
            return;
          }
          if (data.redirect) {
            window.top.location.href = data.redirect;
          }
        },
        err => {
          this.showToast('Failed to use this experience, please try again later.');
          this.modalController.dismiss();
        }
      );
    }
  }

  // toast message pop up, by default, shown success message for 2 seconds.
  async showToast(message: string, options?: any) {
    let toastOptions: ToastOptions = {
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger'
    };
    toastOptions = Object.assign(toastOptions, options);
    const toast = await this.toastController.create(toastOptions);
    return toast.present();
  }
}
