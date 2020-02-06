import { Component, OnInit, NgZone, OnDestroy, AfterViewInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { RespuestaApiPanel } from 'src/app/models/respuesta-api-panel';
import { ProductoMasComprado } from 'src/app/models/producto-mas-comprado';
import { Producto } from 'src/app/models/producto.model';
import { ProductoMasCompradoChart } from 'src/app/models/producto-mas-comprado-chart';
import { ConfigApi } from "../../models/config-api.model";
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-panel-productos-comprados',
  templateUrl: './panel-productos-comprados.component.html',
  styleUrls: ['./panel-productos-comprados.component.scss']
})
export class PanelProductosCompradosComponent implements OnInit, AfterViewInit, OnDestroy {
  private arrayProductosChart: ProductoMasCompradoChart[] = [];
  private rutaImagenes: string = new ConfigApi().getApiImagenes() + '/productos/';
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone, private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.getProductosMasComprados().subscribe((apiData: RespuestaApiPanel) => {
      apiData.data.forEach(prod => {
        let producto: Producto = new Producto(prod.id, prod.nombre, prod.precio, prod.descripcion, prod.imagen);
        let productoMasComprado: ProductoMasComprado = new ProductoMasComprado(producto, prod.numVendidos);
        this.arrayProductosChart.push(
          new ProductoMasCompradoChart(
            productoMasComprado.producto.nombre,
            productoMasComprado.cantidad,
            am4core.color('green'),
            this.rutaImagenes + productoMasComprado.producto.imagen
          ));
      });
      this.crearGrafica();
    });
  }

  ngAfterViewInit() {
  }

  crearGrafica() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create('chartProductosMasComprados', am4charts.XYChart);

      // Add data
      console.log(this.arrayProductosChart);

      chart.data = this.arrayProductosChart;
      // chart.data = this.arrayProductosChart;

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'name';
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.inside = true;
      categoryAxis.renderer.labels.template.disabled = true;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = 'Unidades vendidas';
      valueAxis.renderer.grid.template.strokeDasharray = '4,4';
      valueAxis.min = 0;

      // Do not crop bullets
      chart.maskBullets = false;

      // Remove padding
      chart.paddingBottom = 0;

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = 'points';
      series.dataFields.categoryX = 'name';
      series.columns.template.propertyFields.fill = 'color';
      series.columns.template.propertyFields.stroke = 'color';
      series.columns.template.column.cornerRadiusTopLeft = 8;
      series.columns.template.column.cornerRadiusTopRight = 8;
      series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/b]';

      // Add bullets
      let bullet = series.bullets.push(new am4charts.Bullet());
      let image = bullet.createChild(am4core.Image);
      image.horizontalCenter = 'middle';
      image.verticalCenter = 'bottom';
      image.dy = 20;
      image.y = am4core.percent(100);
      image.propertyFields.href = 'bullet';
      image.tooltipText = series.columns.template.tooltipText;
      image.propertyFields.fill = 'color';
      image.filters.push(new am4core.DropShadowFilter());

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
