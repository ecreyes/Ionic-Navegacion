import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pagina3Page } from "../index.paginas";

/**
 * Generated class for the Pagina2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pagina2',
  templateUrl: 'pagina2.html',
})
export class Pagina2Page {
  pagina3:any = Pagina3Page;
  mutantes:any[]=[
    {
      nombre:"Magneto",
      poder:"Controlar mentes"
    },
    {
      nombre:"Wolverine",
      poder:"Regeneración acelerada"
    },
    {
      nombre:"Profesor x",
      poder:"Poderes psiquicos"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pagina2Page');
  }
  
  irPagina3(mutante:any){
    this.navCtrl.push(Pagina3Page,{'mutante':mutante});
  }

}
