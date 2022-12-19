import { ChangeDetectorRef, Component } from '@angular/core';
//import { FirebaseService } from '../../firebase.service';

import { AlertController, ModalController } from '@ionic/angular';
import { DataService, Data } from '../services/data.service';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchTerm: string;
  datas: Data[] = [];

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private router: Router
  ) {
    this.dataService.getDatas().subscribe((res) => {
      this.datas = res;
      this.cd.detectChanges();
    });
  }

  async openData(data: Data) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: data.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8,
    });

    await modal.present();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
