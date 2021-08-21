
import entityService,{EnitityModel} from './entityService'

export default class workGroupClassService extends entityService
{
   
    constructor()
    {
        super("WorkGroup");
        this.model=new WorkGroupModel();
    }
    
   
}

export class WorkGroupModel  extends EnitityModel
{
    constructor()
    {
     super(); 
       this.groupName="";
       this.groupCode="";
    }
   
   groupName;
   groupCode;
}