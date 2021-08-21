
import dataAccessService from './dataAccessService'


export default class AccountService 
{
   
    dataAccess;
    userName;
    isAdmin;

    // events
    successLogin;
    successLogOut;

    constructor()
    {
        this.dataAccess=new dataAccessService();
        this.userName='';
        this.isAdmin=false;
    }

    async login(userName,password)
    {
       let result= await this.dataAccess.login(userName,password);
       this.userName=result.userName;
       this.isAdmin=result.isAdmin;

       if(this.successLogin!=null)
         this.successLogin();
        
    }
    async logOut()
    {
       await this.dataAccess.logOut();
       this.userName='';
       this.isAdmin=false;

       if(this.successLogOut!=null)
        this.successLogOut();
    }
  

}


