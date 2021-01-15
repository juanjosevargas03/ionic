import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];
  
  constructor(private storage: Storage,
    public toastController: ToastController) {

    this.cargarFavoritos();
   }

  guardarFavoritos(noticia: Article){

    const existe = this.noticias.find( noti => noti.title === noticia.title);
    
    if(!existe){
      this.noticias.unshift( noticia ); //coloca la noticia al inicio del array
  
      this.storage.set('favoritos', this.noticias );
    }
    this.presentToast('Added to Favorites');

    
  }

  borrarNoticia(noticia: Article ){

    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias );
    this.presentToast('Removed from Favorites');


  }

  async cargarFavoritos(){
    
    const favoritos = await this.storage.get('favoritos');
     
    if( favoritos ){
      this.noticias = favoritos;

    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
