import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClienteServicesService } from './servicios/cliente-services.service';
import { OrdenServicesService } from './servicios/orden-services.service';
import Cliente from './model/Cliente';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontTurismoAngular';
  clienteActual!: string;
  clientes!: any;
  ordenes!: any;

  constructor(private servicioCliente: ClienteServicesService, private servicioOrden: OrdenServicesService){}
  ngOnInit(): void{
    this.showClientes()
    this.showOrdenes()
  }
  showClientes(){
    return this.servicioCliente.getAll().subscribe(result => this.clientes = result);
  }
  onClienteSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.clienteActual = selectElement.value;
  }
  showOrdenes(){
    return this.servicioOrden.getAll().subscribe(result => this.ordenes = result);
  }

}
