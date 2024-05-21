import { Component, OnInit } from '@angular/core';
import { IonImg } from '@ionic/angular/standalone';
import { EltiempoapiService } from 'src/app/services/eltiempoapi.service';

@Component({
  selector: 'app-eltiempoisobaras',
  templateUrl: './eltiempoisobaras.component.html',
  styleUrls: ['./eltiempoisobaras.component.scss'],
  standalone: true,
  imports: [IonImg, ],
})
export class EltiempoisobarasComponent  implements OnInit {

  mapa: any;

  constructor(private eltiemposervice: EltiempoapiService) { }

  ngOnInit() {
    this.eltiemposervice.getisobaras().subscribe( (response) => {
      this.mapa = URL.createObjectURL(response); // Obtenemos la url guardada con el blob
    })
  }

}
