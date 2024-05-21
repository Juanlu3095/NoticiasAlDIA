import { Component, OnInit } from '@angular/core';
import { IonText } from '@ionic/angular/standalone';
import { EltiempoapiService } from 'src/app/services/eltiempoapi.service';
import { ChatgptService } from 'src/app/services/chatgpt.service';

@Component({
  selector: 'app-eltiemponacional',
  templateUrl: './eltiemponacional.component.html',
  styleUrls: ['./eltiemponacional.component.scss'],
  standalone: true,
  imports: [ IonText ]
})
export class EltiemponacionalComponent  implements OnInit {

  prediccionHoy: string;
  textoCorregidoHoy: string;
  textoCorregidoHoyFinal: string;

  constructor(private eltiemposervice: EltiempoapiService, private chatgpt: ChatgptService) { }

  ngOnInit() {
    this.eltiemposervice.getPrediccionNacionalHoy().subscribe( (response) => {
    this.prediccionHoy = response;
    this.textoCorregidoHoy = this.prediccionHoy.replace(/(\.[^\.]*\.)/g, '$1<br><br>');
    this.textoCorregidoHoyFinal = this.textoCorregidoHoy.replace(/(?=A\.-)/g, '<br><br>');
    })
    
  }

  
  

}
