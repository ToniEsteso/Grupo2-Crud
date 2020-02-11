import { Component, OnInit, NgZone, OnDestroy, AfterViewInit } from '@angular/core';
import { CarritosService } from 'src/app/services/carritos.service';
import { IngresosMes } from 'src/app/models/ingresos-mes';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-panel-ingresos',
  templateUrl: './panel-ingresos.component.html',
  styleUrls: ['./panel-ingresos.component.scss']
})
export class PanelIngresosComponent implements OnInit, AfterViewInit, OnDestroy {
  private arrayIngresosMes: IngresosMes[];
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone, private carritosService: CarritosService) { }

  ngOnInit() {
    this.carritosService.getResumenAnualIngresos().subscribe((apiData) => {
      this.arrayIngresosMes = apiData.data;
      this.crearGrafica();
    });
  }

  ngAfterViewInit() {
  }

  crearGrafica() {
    // Create chart instance
    let chart = am4core.create('chartIngresosPorMes', am4charts.XYChart);
    chart.paddingRight = 20;

    // Add data
    chart.data = this.arrayIngresosMes;
    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'fecha';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'ingresos';
    series.dataFields.categoryX = 'fecha';
    series.name = 'ingresos';
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/] €';
    series.columns.template.fillOpacity = .8;
    series.columns.template.column.cornerRadiusTopLeft = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
  }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
