# Documentación Ionic - Navegación de páginas.
Para crear una página desde el cli se escribe lo siguiente desde la terminal:
```typescript
ionic g page nombrepagina
```
Esto creará la página en la carpeta `pages` y tendra el nombre de `nombrecarpeta`, esta contendrá 4 archivos de los cuales hay que eliminar el module.ts y en el ts se borra un decorador `@IonicPage()`

## Estructuración de páginas.
Las páginas deben ser importadas en el `app.module.ts` para que ionic las reconoza, una vez importadas se deben añadir en `declarations` y `entryComponents`.

Si se importara una página por una se llenaria de importaciones el app.module.ts, por lo que lo recomendable es crear un archivo `index.paginas.ts` en el directorio `pages` y hacer exportaciones de la siguiente forma:
```typescript
export { AjustesPage } from "./ajustes/ajustes";
export { Ajustes2Page } from "./ajustes2/ajustes2";
export { ModalPage } from "./modal/modal";
export { Pagina2Page } from "./pagina2/pagina2";
export { Pagina3Page } from "./pagina3/pagina3";
export { PrincipalPage } from "./principal/principal";
export { TabsPage } from "./tabs/tabs";
```
ahora para importar las páginas en el `app.module.ts` solo hay que escribir:
```typescript
import { 
  AjustesPage,
  Ajustes2Page,
  ModalPage,
  Pagina2Page,
  Pagina3Page,
  PrincipalPage,
  TabsPage
} from "../pages/index.paginas";
```
y obviamente colocarla en declarations y entrycomponents como se dijo anteriormente.

## Página root.
En el `app.component.ts` aparece lo siguiente:
```typescript
import { HomePage } from '../pages/home/home';
...
export class MyApp {
    rootPage:any = HomePage;
    ....
}
```
El `rootPage` indica la página que se utilizará como inicio, en este caso se importó la página HomePage y se seteo en el root, por lo cual al abrir la aplicación será la primera página en aparecer.

## Navegación entre páginas.
Las páginas en ionic se ponen como activas cuando se utiliza el comando `push` y `pop` las saca de activa.
Las páginas cuando se llaman funcionan como una pila, por eso se utilizan esos comandos.
Para utilizar estos comandos se tiene que importar el NavController:
```typescript
import { NavController } from 'ionic-angular';
...
constructor(public navCtrl: NavController) {
}
```

Hay dos formas de llamar páginas, con código de progamación o con componentes ya fabricados.
### Por ejemplo usando código de programación:
```typescript
<button ion-button block color="primary"
(click)="navegarPagina()">Ir a página 2</button>
```
Con el evento click se llama a la función navegarPagina, que tiene que estar creada en el componente:
```typescript
import { Pagina2Page } from "../index.paginas";
...
navegarPagina(){
  this.navCtrl.push(Pagina2Page);
}
```
la función lo que hace es agregar a la pila esa página importada, por lo que se tendria que mostrar.

### Con código html
```typescript
<button ion-button block color="secondary"
[navPush]="pagina2html">Ir a página 2 - HTML</button>
```
Directamente se dice con `[navPush]` que vamos a pushear una página,pero a diferencia del caso anterior `pagina2html` es una variable declarada en el componente de esta forma:
```typescript
import { Pagina2Page } from "../index.paginas";
...
pagina2html:any = Pagina2Page;
```
## Enviar y recibir parámetros entre páginas.
Supongamos que en el componente de la página se encuetra el siguiente arreglo con objetos:
```typescript
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
```
Ahora en el html con un ng-for se muestra el contenido, nada nuevo:
```typescript
  <h1>Enviando con evento</h1>
  <ion-list>
    <ion-item *ngFor="let mutante of mutantes">
      {{mutante.nombre}}
    </ion-item>
  </ion-list>
```
Para enviar parámetros se puede hacer nuevamente de dos formas, con código de programación o con eventos ya creados.

### Utilizando el código primero
```typescript
<ion-list>
  <ion-item *ngFor="let mutante of mutantes" (click)="irPagina3(mutante)">
    {{mutante.nombre}}
  </ion-item>
</ion-list>
```
Al hacer click queremos ir a la página3 y pasarle el objetos que hemos clickeado, para hacer esto se crea la función en el componente:
```typescript
irPagina3(mutante:any){
  this.navCtrl.push(Pagina3Page,{'mutante':mutante});
}
```
El objeto que se pasó al hacer click se recibe en la función y se envia como segundo parámetro con la clave `'mutante'`, ahora en el componente de la página3 se tiene que recibir este parametro,
 para esto se utiliza `NavParams`, por lo que debe ser importado e instanciado en el constructor:
```typescript
//El navController viene de colado :v
import { NavController, NavParams } from 'ionic-angular';
...
mutante:any = {};
constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.mutante = this.navParams.get('mutante');
}
```
Para ver lo que se esta recibiendo se podría hacer un console.log(navParams), pero si se desea acceder directamente a lo enviado se puede utilizar el método get y usar la clave que se definio antes para tener los datos directamente.
Ahora que ya estan recibidos se pueden mostrar como normalmente se hace.

### utilizando html
```typescript
<h1>Enviando con HTML</h1>
<ion-list>
  <ion-item *ngFor="let mutante of mutantes"
    [navPush]="pagina3"
    [navParams]="{'mutante':mutante}">
    {{mutante.nombre}}
  </ion-item>
</ion-list>
```
El navpush ya es conocido, ahora la logica es similar, se utiliza el `[navParams]` y se le pasa el objeto como se hizo anteriormente, esto se recibe en la página 3 como se mencionó anteriormente :).

## Regresando a la pantalla anterior y root.
De nuevo se puede utilizar código de programación o eventos, veamos el primer caso con código:
```typescript
<button ion-button color="primary" (click)="irAtras()">Ir atrás con evento</button>
<button ion-button color="secondary" (click)="irRoot()">Ir al root</button>
```
Ahora se crean las funciones en el component:
```typescript
  irAtras(){
    this.navCtrl.pop();
  }

  irRoot(){
    this.navCtrl.popToRoot();
  }
```
El `pop` regresa a la página anterior de la pila y el `popToRoot` regresa al root definido al inicio.
Ahora con código html se puede hacer esto:
```typescript
<button ion-button color="danger" block navPop>Ir Atrás con html</button>
```
Solo se agrega el `navPop`.

## Crear Tabs -> es el menú de abajo con botones.
Ya, primero se deciden las páginas que se van a utilizar para navegar y se importan en el componente.
```typescript
import { PrincipalPage,AjustesPage } from "../index.paginas";
```
Ahora se deben crear dos variables ya que son dos páginas y deben asignarse en el constructor:
```typescript
export class TabsPage {
  tab1:any;
  tab2:any;

  constructor() {
    this.tab1 = PrincipalPage;
    this.tab2 = AjustesPage;
  }

}
```
Ahora en el html se crean las tabs:
```typescript
<ion-tabs color="primary" selectedIndex="2">
    <ion-tab tabIcon="hammer" tabTitle="Ajustes" [root]="tab2"></ion-tab>
    <ion-tab tabIcon="hammer" tabTitle="Ajustes" [root]="tab2"></ion-tab>
    <ion-tab tabIcon="alarm" tabTitle="Principal" [root]="tab1"></ion-tab>
    <ion-tab tabIcon="hammer" tabTitle="Ajustes" [root]="tab2"></ion-tab>
    <ion-tab tabIcon="hammer" tabTitle="Ajustes" [root]="tab2"></ion-tab>
</ion-tabs>
```
El `SelectedIndex` servirá para indicar cuál página se seteara para default, en este caso es el 2 de los 5, contando de 0 hasta 4.
El `[root]` indicara que página se utilizara, notar que estan usando las variables que se crearon en la clase y se igualaron a las páginas en el constructor.

Ahora solo falta en el `app.component.ts` asignarlo al root:
```typescript
import { TabsPage } from "../pages/index.paginas";
...
rootPage:any = TabsPage;
```
¿Por qué se puede asignar?, bueno porque se utilizó el `[root]` en la creación de los tabs.

Ahora supongamos que de una página cualquiera, apretando un boton se pueda volver a la página principal del tab:
```typescript
<button ion-button block color="primary" (click)="activarPrincipal()"> Activar Principal</button>
```
En el componente colocar:
```typescript
  activarPrincipal(){
    this.navCtrl.parent.select(2);
  }
```
Aquí se le indica que tiene que volver a la 2,lo cual ya se explicó anteriormente.

## Modal-> crear, enviar y recibir parámetros.
Los Modal son como las páginas popup que se abren en las web.
Supongamos que una página hay un boton que al hacer click abre un modal:
```typescript
<button ion-button block color="dark" (click)="mostrar_modal()">Mostrar modal</button>
```
En el componente hay que importar dos cosas,`ModalController` y la página que va a funcionar como Modal:
```typescript
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { ModalPage } from "../index.paginas";
...

constructor(public navCtrl: NavController, public navParams: NavParams,
            public modalCtrl:ModalController) {
}
```
Ahora se crea la función en el componente:
```typescript
  mostrar_modal(){
    //si fuera sin parametros
    //let modal = this.modalCtrl.create(ModalPage);
    let modal = this.modalCtrl.create(ModalPage,{nombre:"Eduardo",edad:23});
    modal.present();
    modal.onDidDismiss(params =>{
      if(params){
        console.log(params);
      }
    });
  }
```
Explicando el código anterior,cuando se llama la función lo primero que hará va a ser crear una variable modal, con el `this.modalCtrl.create(ModalPage,{nombre:"Eduardo",edad:23});`, lo que se esta haciendo es crear el modal que ocupará la pagina `ModalPage`, el segundo campo es opcional y es para pasarle datos  como lo hemos hecho anteriormente.

El `modal.present()` hará que se muestre el modal, ya que antes solo estaba creado.

EL `modal.onDidDismiss` se llamará una vez que se cierre el modal, este tiene una función de flecha con params como variable,es decir cuando se cierre el modal puede que este venga con datos o no venga con datos, si viene con datos van a ser guardados en params.

Ahora en el modal si es que se enviaron parametros se pueden recibir con navParams en el constructor:
```typescript
import { NavController, NavParams, ViewController } from 'ionic-angular';
...

nombre:String = "";
edad:number = 0;

constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public viewCtrl:ViewController) {

  this.nombre = navParams.get('nombre');
  this.edad = navParams.get('edad');
}
```
Notar que se importó el viewCtrl que servirá para cerrar el modal mas adelante.

Ahora si trabajamos en la página que sera el modal, la vista podria contener dos botones, uno que envia parametros y otro que no:
```typescript
<button ion-button block color="primary" (click)="cerrar_con_parametros()">Cerrar con parametros</button>
<button ion-button block color="secondary" (click)="cerrar_sin_parametros()">Cerrar sin parametros</button>
```


En el componente del modal se crean las dos funciones:
```typescript
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
```
Se utiliza el viewCtrl como se importó anteriormente, este sive para cerrar el modal, en el primero se envia algun parámetro random, en el segundo no.

## Crear el menú lateral.
El menú lateral se crea en el `app.html`:
```typescript
<ion-menu side="left" [content]="content">
    <ion-header>
        <ion-toolbar color="primary">
        <ion-title>Menu</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content>
        <ion-list>
        <button ion-item (click)="openPage(tabs)">
            Abrir tabs
        </button>
        <button ion-item (click)="openPage(ajustes2)">
            Abrir ajustes2
        </button>
        </ion-list>
    </ion-content>
</ion-menu>
<ion-nav [root]="rootPage" #content></ion-nav>
```
El side indica que se abrirá desde la izquierda, el content viene referenciado por el #content.
El contenido del menu sera de dos botones que al hacer click deberia abrir una página indicada, las variables que se estan enviando estan declaradas en el `app.component.ts`:
```typescript
import { TabsPage,Ajustes2Page } from "../pages/index.paginas";
...
  tabs = TabsPage;
  ajustes2 = Ajustes2Page;
```
Ahora el método al hacer click hace lo siguiente:
```typescript
  openPage(pagina){
    this.rootPage = pagina;
    this.menuCtrl.close();
  }
```
Setea la página root para mostrarla y cierra el menu lateral.

El problema esque este menú aun no se ve como boton, osea se puede ver arrastrando pero no aparece el icono.
Para mostrar el icono abrimos la pagina root, la principal por default y agregamos lo siguiente:
```typescript
  <ion-title>Principal</ion-title>
  <ion-buttons left>
      <button ion-button icon-only (click)="mostrarMenu()">
        <ion-icon name="menu"></ion-icon>
      </button>
  </ion-buttons>
```
Se debe importar el menu en el constructor:
```typescript
import { NavController, NavParams,MenuController } from 'ionic-angular';
...
constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController) {
}
```
Ahora se crea la función en el componente:
```typescript
  mostrarMenu(){
    this.menuCtrl.toggle();
  }
```
Esto hará que se muestre el menú al hacer click.
Igual se puede hacer solamente de esta forma:
```typescript
<ion-title>ajustes2</ion-title>
<ion-buttons left>
    <button ion-button icon-only menuToggle>
      <ion-icon name="menu"></ion-icon>
    </button>
</ion-buttons>
```
y se ahorra código.