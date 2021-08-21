
import entityService,{EnitityModel} from './entityService'

export default class personClassService extends entityService
{
   
    constructor()
    {
        super("Person");
       this.newModel();
    }
    

    newModel()
    {
        this.model=new PersonModel();
    }

    setLocation(lat,lng)
    {
        this.model.lat=lat;
        this.model.lng=lng;
    }
   async getBestList()
    {
      this.list=await this.dataAccess.search("Person/BestList");
      
    }
   
}

export class PersonModel  extends EnitityModel
{
    constructor()
    {
     super(); 
        this.firstName="";
        this.lastName="";
        this.tel="";
        this.pic=null;
        this.workGroupId="";
        this.showInGallery=false;
        this.showInHomePage=false;
        this.lat=0;
        this.lng=0;
        this.createDate="";
    }
   
    firstName;
    lastName;
    tel;
    pic;
    workGroupId;
    lat;
    lng;
    showInHomePage;
    showInGallery;
    createDate;
}