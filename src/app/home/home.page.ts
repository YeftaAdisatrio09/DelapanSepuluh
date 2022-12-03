import { ChangeDetectorRef, Component } from '@angular/core';
//import { FirebaseService } from '../../firebase.service';

import { AlertController, ModalController } from '@ionic/angular';
import { DataService, Note } from '../services/data.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchTerm: string;
  notes: Note[] = [];

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.dataService.getNotes().subscribe((res) => {
      this.notes = res;
      this.cd.detectChanges();
    });
  }

  async openNote(note: Note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8,
    });

    await modal.present();
  }
}
