import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit,AfterViewInit {

  @ViewChild(IonSegment) segment: IonSegment;

  categorias = ['business', 'entertainment','general', 'health', 'science','sports', 'technology'];
  noticias : Article[] = [];

  constructor( private NoticiasService: NoticiasService ){}
  
  
  ngOnInit(){
    
    this.cargarNoticias(this.categorias[0]);

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.segment.value = this.categorias[0];

  }

  cambioCategoria(event){

    this.noticias = [];
    this.cargarNoticias( event.detail.value )
  }

  cargarNoticias( categoria: string , event? ){
    this.NoticiasService.getTopHeadLinesCategoria(categoria)
    .subscribe(resp => {  

      
      this.noticias.push( ...resp.articles );

      if( event ){
        event.target.complete();
      }

    });


  }

  loadData(event){
    
    this.cargarNoticias(this.segment.value , event);
    
  }


}
