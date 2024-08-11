import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import About from "../pages/About";
import Service from "../pages/Service";
import Project from "../pages/Project";
import Contract from "../pages/Contract";


export const routes = [
    {
        path: '/',
        page: Home,
        isHeader: true,
    },
    {
        path: '/about',
        page: About,
        isHeader: true,
    },
    {
        path: '/service',
        page: Service,
        isHeader: true,
    },
    {
        path: '/project',
        page: Project,
        isHeader: true,
    },
    {
        path: '/contract',
        page: Contract,
        isHeader: true,
    },
    {
        path: '*',
        page: NotFound,
        isHeader: false,
    }
]