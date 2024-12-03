import {Route, Routes} from "react-router-dom";
import SignIn from "features/Login/Login.jsx";
import SignUp from "features/Registration/Registration.jsx";
import Layout from "widgets/Layout/Layout.jsx"
import HomePage from "pages/HomePage/HomePage.jsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.jsx";
import ProjectDetails from "pages/ProjectDetails/ProjectDetails.jsx";
import SelectedTask from "pages/SelectedTask/SelectedTask.jsx";
import DashboardPage from "pages/DashboardPage/DashboardPage.jsx";
import GanttPage from "pages/GanttPage/GanttPage.jsx";


function App() {


    return (
        <div>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/project/:Code' element={<ProjectDetails/>}/>
                    <Route path='project/:Code/task/:TaskId' element={<SelectedTask/>}/>
                    <Route path='/dashboard' element={<DashboardPage/>}/>
                    <Route path='/diagram' element={<GanttPage/>}/>
                </Route>
                <Route path='/profile/:id' element={<ProfilePage/>}/>
                <Route path='/login' element={<SignIn/>}/>
                <Route path='/register' element={<SignUp/>}/>
            </Routes>
        </div>
    )
}

export default App
