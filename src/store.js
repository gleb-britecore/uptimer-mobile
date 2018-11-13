/*** src/store.js ***/
import {observable} from 'mobx';
import {AsyncStorage} from "react-native";
import {USER_KEY} from "./auth";
import {base_url} from "./config";


class Store {
  @observable sites;
  @observable loading_sites;

  constructor() {
    this.sites = [
        {site_url: 'dummy_1'},
        ];
    this.loading_sites = false
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


export async function addSite(site_url) {

  let token = await AsyncStorage.getItem(USER_KEY)
  let response = await fetch(base_url + '/sites/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Authorization': 'Token ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      site_url: site_url,
    }),
  });
  // let data = await response.json()
  await loadSites()

}


export async function deleteSite(self_link) {

  let token = await AsyncStorage.getItem(USER_KEY)
  let response = await fetch(self_link, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Authorization': 'Token ' + token,
    },
  });
  console.log(response.status)
  await loadSites()

}

export default store