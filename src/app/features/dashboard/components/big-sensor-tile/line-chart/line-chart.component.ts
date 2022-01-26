import {
    AfterViewInit,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core'
import { SensorReading } from '@dashboard/models/reading.model'
import { ChartConfiguration, ChartOptions, ChartType, Color } from 'chart.js'
import {} from 'ng2-charts'
import { BaseChartDirective } from 'ng2-charts'
import 'chartjs-adapter-date-fns'
import { pl } from 'date-fns/locale'

@Component({
    selector: 'iot-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnChanges {
    @Input() data: number[] = []
    @Input() labels: Date[] = []
    @Input() label: string = ''
    @Input() stepped: boolean = false

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [5, 7, 9, 15, 20, 18, 16, 12, 15, 12, 14, 15, 15, 15],
                label: 'Temperature',
                fill: 'origin',
            },
        ],
        labels: [
            '00:00',
            '01:00',
            '02:00',
            '03:00',
            '04:00',
            '05:00',
            '06:00',
            '07:00',
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
        ],
    }

    public lineChartOptions: ChartConfiguration['options'] = {
        elements: {
            line: {
                tension: 0.5,
                stepped: false,
            },
        },
        animation: {
            duration: 1000,
        },
        scales: {
            x: {
                type: 'time',
                bounds: 'ticks',
                time: {
                    unit: 'minute',
                    displayFormats: {
                        minute: 'H:m iiii',
                    },
                },
                adapters: {
                    date: {
                        locale: pl,
                    },
                },
            },
            'y-axis': {
                position: 'left',
                ticks: {
                    precision: 0,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    }
    public lineChartType: ChartType = 'line'

    @ViewChild(BaseChartDirective) chart?: BaseChartDirective

    constructor() {}

    ngOnInit(): void {
        this.refreshChart()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes.hasOwnProperty('data') ||
            changes.hasOwnProperty('labels') ||
            changes.hasOwnProperty('stepped') ||
            changes.hasOwnProperty('label')
        ) {
            this.lineChartData.datasets[0].data = this.data
            this.lineChartData.datasets[0].label = this.label
            this.lineChartData.labels = this.labels
            this.refreshChart()
        }
        if (changes.hasOwnProperty('stepped')) {
            if (
                this.lineChartOptions &&
                this.lineChartOptions.elements &&
                this.lineChartOptions.elements.line
            ) {
                this.lineChartOptions.elements.line.stepped = this.stepped
            }
        }
    }

    private refreshChart() {
        this.chart?.update()
    }
}
