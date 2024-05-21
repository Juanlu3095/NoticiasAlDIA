import { Component, OnInit } from '@angular/core';
import { } from '@ionic/angular/standalone';
import { EltiempoapiService } from 'src/app/services/eltiempoapi.service';

@Component({
  selector: 'app-eltiempoisobaras',
  templateUrl: './eltiempoisobaras.component.html',
  styleUrls: ['./eltiempoisobaras.component.scss'],
  standalone: true,
  imports: [],
})
export class EltiempoisobarasComponent  implements OnInit {

  mapa: any;

  constructor(private eltiemposervice: EltiempoapiService) { }

  ngOnInit() {
    this.eltiemposervice.getisobaras().subscribe( (response) => {
      console.log(response);
      this.mapa = URL.createObjectURL(response);
    })
  }

}
