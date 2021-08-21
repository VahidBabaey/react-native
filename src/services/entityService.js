import AsyncStorage from '@react-native-community/async-storage/lib/index'

import dataAccessService from './dataAccessService'

export default class entityService
{
    model=null;
    list=[];
   dataAccess;
    entityName;
    constructor(PentityName)
    {
        this.entityName=PentityName;
        this.dataAccess=new dataAccessService();
    }
   async register()
    {
       await this.dataAccess.register(this.entityName,this.model);

    }

   async remove(pid)
    {
       await this.dataAccess.remove(this.entityName,{id:pid});
        
    }

   
    async find(pid)
    {
        this.model=await this.dataAccess.search(this.entityName+"/Find",{id:pid});
        return this.model;
    }
   async getList()
    {
     this.list=await this.dataAccess.search(this.entityName,null);
    }
}

export class EnitityModel
{
    constructor()
    {
        this.id=0;
       
    }
    id;
    
}