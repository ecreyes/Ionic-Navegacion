import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
import { Pagina2Page } from "../index.paginas";

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  pagina2html:any = Pagina2Page;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalPage');
  }

  navegarPagina(){
    this.navCtrl.push(Pagina2Page);
  }

  mostrarMenu(){
    this.menuCtrl.toggle();

  }

}
