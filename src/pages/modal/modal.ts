import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  nombre:String = "";
  edad:number = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl:ViewController) {

    this.nombre = navParams.get('nombre');
    this.edad = navParams.get('edad');
  }

  cerrar_con_parametros(){
    let data = {
      nombre:"Eduardo",
      edad:21,
      cords:{
        lat:10,
        lng:-10
      }
    };

    this.viewCtrl.dismiss(data);
  }

  cerrar_sin_parametros(){
    this.viewCtrl.dismiss();

  }

}
