
 
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-community/async-storage/lib/index'


export default class dataAccessService
{

    baseUrl;
    token;
    constructor()
    {
        this.baseUrl="http://10.0.2.2:5030/api/";
        AsyncStorage.getItem("token").then(value=>{
            this.token=value;
        });
    }


    async CheckNet()
    {
      let result=  await NetInfo.fetch();
      if(!result.isConnected)
      throw new Error("اتصال برقرار نیست");
      

    }
    async register(name,model)
    {
        await this.CheckNet();

        let data=new FormData();
       
        for (let key in model) {
            data.append(key,model[key]);
        }

        const config = {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                "Content-Type": "multipart/form-data",
                "Cookie":this.token
            },
            body:data
            };

            let result= await fetch(this.baseUrl+name,config);
           
            if(result.status==200)
            {
            return await result.json();
            }
            else
            {
             await this.getError(result);
            }

    }

    async remove(name,model)
    {
        await this.CheckNet();

        let data=new FormData();
       
        for (let key in model) {
            data.append(key,model[key]);
        }

        const config = {
            method: 'DELETE',
            headers: {
                 Accept: 'application/json',
                "Content-Type": "multipart/form-data",
                "Cookie":this.token,
        
            },
            body:data
            };

            let result= await fetch(this.baseUrl+name,config);
           
            if(result.status==200)
            {
            return await result.json();
            }
            else
            {
                await this.getError(result);
            }

    }
    async search(name,sendData)
    {

        await this.CheckNet();

        let route="";
        if(sendData!=null)
        {
            for (let key in sendData) {
                route+="/"+sendData[key];
            }
        }
       
        let result= await fetch(this.baseUrl+name+route,{method:"GET",headers:{ "Cookie":this.token}});
            if(result.status==200)
            {
            return await result.json();
            }
            else
            {
                await this.getError(result);
            }
    }

  async  getError(result)
    {
        let errorMessage=await result.text();
        throw new Error(errorMessage);
    }

    async login(userName,Password)
    {
        await this.CheckNet();

        let data=new FormData();
        data.append('userName',userName);
        data.append('passWord',Password);
           
        const config = {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                "Content-Type": "multipart/form-data",
            },
            body:data
            };

            let result=await fetch('http://10.0.2.2:5030/Account/Login',config);
         
            if(result.status==200)
             {
             this.token=result.headers.get('set-cookie');
             AsyncStorage.setItem("token",this.token);
              return await result.json();
            }
            else
            {
                throw new Error(await result.text());
            }
    }

    async logOut()
    {
        await this.CheckNet();
           
        const config = {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                "Content-Type": "multipart/form-data",
                "Cookie":this.token
            },
         
            };

            let result=await fetch('http://10.0.2.2:5030/Account/Logout',config);
         
            if(result.status==200)
             {
             
            }
            else
            {
             throw new Error(await result.text());
            }
    }

}