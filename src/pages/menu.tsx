import { ValueChart } from '../components/value-chart';
import { ProfitChart } from '../components/profit-chart';
import { ProfitDividChart } from '../components/profit-divid-chart';

export function ValueChartScreen() {
    return (
        <ValueChart></ValueChart>
    )
}

export function ProfitChartScreen() {
    return (
        <ProfitChart></ProfitChart>
    )
}

export function ProfitDividChartScreen() {
    return (
        <ProfitDividChart></ProfitDividChart>
    )
}

export function Menu() {
    return (
        <div>
            <h1>Menu</h1>
            <p>This is the menu page</p>
            <ul>
                <li><a href="/upload-report">Upload Report File</a></li>
                <li><a href="/value-chart">Value Chart</a></li>
                <li><a href="/profit-chart">Profit Chart</a></li>
                <li><a href="/profit-divid-chart">Profit Divid Chart</a></li>
            </ul>
        </div>
    )
}

export function UploadExcelFiles() {
    return (
        <div>
            <h1>Upload Report Files</h1>
            <p>This is the upload report excel files page</p>
            <form action="/upload-report-file" method="post" encType="multipart/form-data">
                <input type="file" name="reports" multiple />
                <input type="submit" value="Upload" />
            </form>
        </div>
    )
}