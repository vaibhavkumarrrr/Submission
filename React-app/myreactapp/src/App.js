import './App.css';
import Component1 from './components/component1';
import MangerProfile from './components/managerProfile';
import Personprofile from './components/Personprofile';
import Datacomponenet from './components/datacomponent';
import users from './data/data'
function App() {
  return (     
        
        <div className="welcomeBody"> 
          <h1>Welcome to my page</h1>
          <p>This is quick preview layout using HTML and CSS</p>
          <div className="component1">
          <Component1 className="welcomeBody" name="vaibhav"/>
          <Personprofile ></Personprofile>
          <MangerProfile></MangerProfile>
          <Datacomponenet list={users}></Datacomponenet>
          </div>
        </div>  
        

  


  );
}

export default App;

