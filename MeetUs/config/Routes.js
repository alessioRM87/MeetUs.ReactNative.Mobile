import Home from '../components/home';
import Login from '../components/login';
import Registration from '../components/registration';
import Search from '../components/search';
import Create from '../components/create';
import Details from '../components/details';
import Edit from '../components/edit';


const Routes = {
    Login : { screen: Login },
    Registration: { screen: Registration },
    Home : { screen: Home },
    Search : { screen: Search },
    Create : { screen: Create },
    Details: { screen: Details },
    Edit: { screen: Edit }
};

export default Routes;