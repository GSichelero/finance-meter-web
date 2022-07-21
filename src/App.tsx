import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ValueChartScreen } from './pages/menu';
import { ProfitChartScreen } from './pages/menu';
import { ProfitDividChartScreen } from './pages/menu';
import { Menu } from './pages/menu';
import { UploadExcelFiles } from './pages/menu';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element= {<Menu/>} />
        <Route path="/upload-report" element= {<UploadExcelFiles/>} />
        <Route path="/value-chart" element= {<ValueChartScreen/>} />
        <Route path="/profit-chart" element= {<ProfitChartScreen/>} />
        <Route path="/profit-divid-chart" element= {<ProfitDividChartScreen/>} />
      </Routes>
    </Router>
  );
};
export default App;