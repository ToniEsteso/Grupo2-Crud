import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { RespuestaApiPanel } from 'src/app/models/respuesta-api-panel';
import { NumProductosCategoria } from 'src/app/models/num-productos-categoria';
import { CategoriasService } from '../../services/categorias.service';
import { RespuestaApi } from 'src/app/interfaces/respuesta-api';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-panel-compras-categoria',
  templateUrl: './panel-compras-categoria.component.html',
  styleUrls: ['./panel-compras-categoria.component.scss']
})
export class PanelComprasCategoriaComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart: am4charts.PieChart;
  private arrayComprasCategoria: NumProductosCategoria[];
  constructor(private zone: NgZone, private categoriasService: CategoriasService) { }

  ngOnInit() {
    this.categoriasService.getNumProductosCategoria().subscribe((data: RespuestaApi) => {
      this.arrayComprasCategoria = data.data;
      this.crearGrafica();
    });
  }

  ngAfterViewInit() {
  }

  crearGrafica() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create('chartComprasCategoria', am4charts.PieChart);

      // Add data
      chart.data = this.arrayComprasCategoria;

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = 'numProductos';
      pieSeries.dataFields.category = 'nombre';
      pieSeries.slices.template.stroke = am4core.color('#fff');
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      pieSeries.labels.template.text = "{category}: {value.value}";

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

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
