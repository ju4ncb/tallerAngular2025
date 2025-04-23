import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClienteServicesService } from './servicios/cliente-services.service';
import { OrdenServicesService } from './servicios/orden-services.service';
import Swal from 'sweetalert2';
import Cliente from './model/Cliente';
import { JsonPipe } from '@angular/common';
import OrdenClientes from './model/OrdenClientes';
import Orden from './model/Orden';

interface OrdenClientesExtendido extends OrdenClientes {
  orderNumber: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [JsonPipe],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontTurismoAngular';
  clienteActual: Cliente = { customerName: '', customerNumber: '', phone: '' };
  ordenActual: Orden = { orderDate: '', orderNumber: '' };
  clientes!: any;
  ordenes!: Orden[];
  productosOrdenes!: any;
  productosOrdenActual: OrdenClientes[] = [];
  sumaTotalizar: number = 0;

  @ViewChild('ordenesSelect') ordenesSelect!: ElementRef<HTMLSelectElement>;

  constructor(
    private servicioCliente: ClienteServicesService,
    private servicioOrden: OrdenServicesService
  ) {}

  ngOnInit(): void {
    this.showClientes();
  }
  showClientes() {
    return this.servicioCliente
      .getAll()
      .subscribe((result) => (this.clientes = result));
  }
  onClientesClick(event: Event): void {
    this.showOrdenes(Number(this.clienteActual.customerNumber));
    this.ordenActual = { orderDate: '', orderNumber: '' };
  }
  onClientesSelectChange(event: Event): void {
    const selectedOption = (event.target as HTMLSelectElement)
      .selectedOptions[0];
    const clienteJson = selectedOption.getAttribute('data-cliente');
    if (clienteJson) {
      this.clienteActual = JSON.parse(clienteJson) as Cliente;
    }
  }
  showOrdenes(id: number) {
    return this.servicioOrden.getOrdersByCustomer(id).subscribe((result) => {
      console.log(result);
      if (result.codigo != -1) {
        this.productosOrdenes = result;
        this.ordenes = Array.from(
          new Map<number, Orden>(
            this.productosOrdenes.map((orden: Orden) => [
              orden.orderNumber,
              orden,
            ])
          ).values()
        );
        Swal.fire({
          title: 'Cliente seleccionado con exito.',
          text: 'Ahora escoge una orden.',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Este ciente no tiene ordenes.',
          icon: 'info',
        });
        this.productosOrdenes = [];
        this.ordenes = [];
      }
      this.productosOrdenActual = [];
      this.sumaTotalizar = 0;
      this.ordenesSelect.nativeElement.value = '-1';
      this.ordenActual = { orderDate: '', orderNumber: '' };
    });
  }
  onOrdenesClick(event: Event) {
    if (this.ordenes.length === 0) {
      Swal.fire({
        title: 'No hay ordenes, escoge otro cliente.',
        icon: 'warning',
      });
      return;
    }
    const filteredOrders = this.productosOrdenes.filter(
      (order: OrdenClientesExtendido) =>
        order.orderNumber === this.ordenActual.orderNumber
    );
    this.productosOrdenActual = filteredOrders.map(
      (order: OrdenClientes) => order
    );
    this.sumaTotalizar = filteredOrders
      .reduce((sum: number, order: OrdenClientes) => {
        return sum + Number(order.priceEach) * Number(order.quantityOrdered);
      }, 0)
      .toFixed(2);
    Swal.fire({
      title: 'Orden seleccionada con exito.',
      text: 'Detalles de la orden en la tabla debajo.',
      icon: 'success',
    });
  }
  onOrdenesSelectChange(event: Event): void {
    const selectedOption = (event.target as HTMLSelectElement)
      .selectedOptions[0];
    const ordenJson = selectedOption.getAttribute('data-orden');
    if (ordenJson) {
      const ordenJsonParsed = JSON.parse(ordenJson) as Orden;
      this.ordenActual = ordenJsonParsed;
    }
  }
}
