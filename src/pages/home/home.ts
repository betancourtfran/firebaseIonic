import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  songs: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public af:AngularFire, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
    this.songs = af.database.list('/songs');
  };

  addSong(){
    let prompt = this.alertCtrl.create({
      title: "Song Name",
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        }
      ],
      buttons: [
        {
          text:'Cancel',
          handler: data => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: 'Save',
          handler: data =>{
            this.songs.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  };

  showOptions(songId, songTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'qué quieres hacer?',
      buttons: [
        {
          text:'Borrar Cancion',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
          }
        },
        {
          text: 'Actualizar Titulo',
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel Clicked');
          }
        }
      ]
    });
    actionSheet.present();
  };
  removeSong(songId: string){
    this.songs.remove(songId).then(() => {
      console.log('cancion eliminada');
    });
  };
  updateSong(songId, songTitle){
    let prompt = this.alertCtrl.create({
      title: 'Nombre de la cancion',
      message: "Actualiza el nombre para esta cancion",
      inputs: [
        {
          name: 'title',
          placeholder: 'Titulo',
          value: songTitle
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel CLicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.songs.update(songId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
