/*** src/store.js ***/
import {observable} from 'mobx';
class Store {
  @observable feeds;

  constructor() {
    this.feeds = [];
  }
  addFeed(url, feed) {
    this.feeds.push({
      url,
      entry: feed.entry,
      title: url,
      updated: feed.updated
    });
    // this._persistFeeds();
  }

}
const store = new Store()

export function addFeed(url, feed) {
  store.addFeed(url, feed);
}

export default store