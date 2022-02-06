import SocialBlade, {YouTubeTop, YouTubeUser} from '../lib/index';
import 'isomorphic-unfetch';
import {describe, it} from 'mocha';
import {expect} from 'chai';
describe('YouTube Client API', function () {
  before('Create Social Blade Client', async function () {
    this.client = new SocialBlade(process.env.SOCIALBLADE_CLIENT_ID!, process.env.SOCIALBLADE_ACCESS_TOKEN!);
  });
  describe('YouTube User', function () {
    before('Create SocialBlade Client', async function() {
      this.sbStats = await this.client.youtube.user('socialblade');
    });
    it('SocialBlade has more than 100K subscribers?', async function() {
      expect((this.sbStats as YouTubeUser).statistics.total.subscribers).to.be.greaterThan(1e5);
    });
    it('Subscribers should be a number', async function() {
      expect((this.sbStats as YouTubeUser).statistics.total.subscribers).to.be.a('number');
    });
    it('History should contain 30 days', async function() {
      expect((this.sbStats as YouTubeUser).daily.length).to.be.eq(30);
    });
  });
  describe('YouTube Top Lists', function () {
    before('Create Social Blade Client', async function ) {
      this.sbTop = await this.client.youtube.top('subscribers', 0);
    });
    it('Should have 5 users', async function() {
      expect((this.sbTop as YouTubeTop[]).length).to.be.eq(5);
    });
    it('All users should have more than 50M subscribers', async function() {
      (this.sbTop as YouTubeTop[]).map((user) => expect(user.statistics.total.subscribers).to.be.greaterThan(5e7));
    });
  });
});
