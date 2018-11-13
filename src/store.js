/*** src/store.js ***/
import {observable} from 'mobx';
import {AsyncStorage} from "react-native";
import {USER_KEY} from "./auth";

let base_url = 'http://192.168.0.103:8000'

class Store {
  @observable sites;

  constructor() {
    this.sites = [
        {site_url: 'http://a.com'},
        {site_url: 'http://b.com'},
        ];
  }
  addSite(site) {
    this.sites.push(
     site
    );
    // this._persistFeeds();
  }

}
const store = new Store()

export function addFeed(url, feed) {
  store.addFeed(url, feed);
}

export async function loadSites() {

  let token = await AsyncStorage.getItem(USER_KEY)
  let response = await fetch(base_url + '/sites/', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Authorization': 'Token ' + token,
      // 'Content-Type': 'application/json',
    },
  });
  let data = await response.json()
  store.sites.length = 0
  await data.forEach((_) => {
    store.addSite(_)
  })

}

export default store