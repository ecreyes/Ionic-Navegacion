import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pagina3',
  templateUrl: 'pagina3.html',
})
export class Pagina3Page {
  mutante:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //es lo mismo
    //console.log(navParams.data.mutante);
    this.mutante = this.navParams.get('mutante');
    console.log(this.mutante);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pagina3Page');
  }

  irAtras(){
    this.navCtrl.pop();
  }

  irRoot(){
    this.navCtrl.popToRoot();
  }
}
