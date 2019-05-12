import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.page.html',
  styleUrls: ['./billetera.page.scss'],
})
export class BilleteraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  activardiv(){
     let div = document.getElementById("divoculto");
     div.style.display='';
  }

  cancelar(){
    let div = document.getElementById("divoculto");
     div.style.display='none';
  }

  cargarmonto(){
    
  }

}
