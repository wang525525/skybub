/**
 * Created by BIT TECHNOLOGIES on 5/28/2017.
 */

/* eslint-disable import/prefer-default-export */

export default class Forum {


    constructor( data ) {

        this.id = data.id||'';


        this.title = data.title || '';
        this.description = data.description || '';

        this.URL = data.URL || '';

        this.iconPic = data.iconPic || '';
        this.coverPic  = data.coverPic || '';
        this.coverColor = data.coverColor || '';

        this.keywords = data.keywords||[];
        this.breadcrumbs = data.breadcrumbs || [];

        this.authorId = data.authorId || '';
        this.parentId = data.parentId || '';
        this.parents = data.parents || [];

        this.isOwner = data.isOwner || false;

        this.preferredLang = data.preferredLang || data.language || null;

        this.country = data.country || '';
        this.city = data.city || '';
        this.dtCreation = ((typeof data.dtCreation === "string")&&(data.dtCreation !== '')) ? Date.parse(data.dtCreation) : new Date(data.dtCreation||new Date());
        this.dtLastActivity = ((typeof data.dtLastActivity === "string")&&(data.dtLastActivity !== '')) ? Date.parse(data.dtLastActivity) : new Date(data.dtLastActivity||new Date());

        this.longitude = data.longitude || -666;
        this.latitude = data.latitude || -666;

        this.addInfo = data.addInfo || {};

        if (typeof this.addInfo.dtCreation !== 'undefined'){
            this.addInfo.dtCreation = ((typeof this.addInfo.dtCreation === "string")&&(this.addInfo.dtCreation !== '')) ? Date.parse(this.addInfo.dtCreation) : new Date(this.addInfo.dtCreation||new Date());
        }

        //console.log('Forum Assigned', data);
    }



}
