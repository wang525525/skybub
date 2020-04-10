/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/25/2017.
 * (C) BIT TECHNOLOGIES
 */

import FetchService from 'services/communication/FetchService'

export default{

    CONTENT_FETCH_ROUTER_OBJECT_AND_CONTENT: async ({ commit, state, dispatch }, { url, pageIndex, pageType }) => {

        let res;
        res = await dispatch('CONTENT_FETCH_ROUTER_OBJECT', {url: url});

        console.log('##### CONTENT_FETCH_ROUTER_OBJECT', url, res);

        if  ( res.result === true){

            let parent = ((typeof res.object !== "undefined") && (res.object !== null)) ? res.object.parent||res.object.parentId : '';
            let id =     ((typeof res.object !== "undefined") && (res.object !== null)) ? res.object.id : '';

            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% RESULT",id, parent, state.contentRouter.currentObject.type);

            await dispatch('CONTENT_FETCH_ROUTER_PARENT_OBJECT', {url: parent} ); //fetching the parent object)

            switch (state.contentRouter.currentObject.type){
                case "home":
                case "forum":
                    if (pageType === 'pages'){

                        await dispatch('CONTENT_ALL_PAGES_FETCH', {parent: id,  pageIndex: Math.max(pageIndex,1), pageCount:25, reset: true, });

                    } else {
                        await dispatch('CONTENT_FORUMS_FETCH_TOP',{parent: id,  pageIndex: ((pageIndex > 0 && pageType==='forums') ? pageIndex : 1), pageCount:8, reset: (typeof window === 'undefined')||(pageIndex===0), });
                        await dispatch('CONTENT_TOPICS_FETCH_TOP',{parent: id,  pageIndex: ((pageIndex > 0 && pageType==='') ? pageIndex : 1), pageCount:8, reset: (typeof window === 'undefined')||(pageIndex===0), });
                    }
                    break;
                case "topic":
                    await dispatch('CONTENT_REPLIES_FETCH_ALL',{parent: id, reset:true, });
                    break;
            }

        }
    },



    CONTENT_FETCH_OBJECT: async ( {commit, store}, {sContentToSearchId}) => {

        console.log("CONTENT_FETCH_ROUTER_OBJECT_AND_CONTENT", {url: sContentToSearchId});

        if (sContentToSearchId !== '')
            return await FetchService.sendRequestWaitOnce('content/get-content', {id: sContentToSearchId});
        else
            return {result: false, data: {content: null}};
    },





    CONTENT_DELETE_OBJECT: async ( {commit, state, dispatch}, {objectId}) =>{
        try{

            if (objectId !== '') {
                let answer = await FetchService.sendRequestWaitOnce('content/delete-object', {id: objectId}, objectId);

                console.log('------------------------- CONTENT DELETE OBJECT',answer);
                if (answer.result === true){
                    commit('SET_CONTENT_FORUM_DELETE',{id: objectId});
                    commit('SET_CONTENT_TOPIC_DELETE',{id: objectId});
                    commit('SET_CONTENT_REPLY_DELETE',{id: objectId});
                }

                return answer;
            }

        } catch (Exception){
            console.log("Exception deleting the reply", Exception);
            throw Exception;
        }
    },





    CONTENT_URL_SLUG: async ( {commit, store}, {parent, name}) => {
        return FetchService.sendRequestWaitOnce("content/get-URL-slug", {parent:parent, name: name} );
    },

    CONTENT_URL_META: async ( {commit, store}, {link}) => {
        return FetchService.sendRequestWaitOnce("meta-extractor/extract-url", {link:link});
    },


}