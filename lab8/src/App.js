import {Fragment} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {routes} from "./routes";
import DefaultLayout from "./components/LayoutDefault";

function App() {
  return (
      <>
        <Router>
          <Routes>
            {
              routes.map((item) => {
                const Layout = item.isHeader ? DefaultLayout : Fragment;
                const Page = item.page;
                return <Route path={item.path} exact element={<Layout><Page/></Layout>} />
              })
            }
          </Routes>
        </Router>
      </>
  );
}

export default App;
