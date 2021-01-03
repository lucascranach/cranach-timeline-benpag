import { expect } from 'chai';
import axios from 'axios';
import sinon from 'sinon';
import state from '../../../src/store/state';
import actions from '../../../src/store/actions';
import testItemData from '../../testItemData.json';
import testFilters from '../../testFilters.json';
import testEventData from '../../testEventData.json';
import config from '../../../global.config';

describe('store actions', () => {
	let testState;
	let dispatch;
	let commit;

	beforeEach(() => {
		testState = JSON.parse(JSON.stringify(state));
		testState.allItems = testItemData;
		testState.items = testItemData;
		commit = sinon.spy();
		dispatch = sinon.spy();
	});

	it('should execute all commits on addFilter call', () => {
		const filter = testFilters[0];
		actions.addFilter({ commit, dispatch }, filter);
		expect(commit.args).to.deep.equal([
			['setLoadingState', true],
			['removeFilter', filter.name],
			['addFilter', filter],
		]);
	});
	it('should execute all actions on addFilter call', () => {
		const filter = testFilters[0];
		actions.addFilter({ commit, dispatch }, filter);
		expect(dispatch.args).to.deep.equal([
			['applyFilter'],
		]);
	});

	it('should execute all commits on removeFilter call', () => {
		const filterName = testFilters[0].name;
		actions.removeFilter({ commit, dispatch }, filterName);
		expect(commit.args).to.deep.equal([
			['removeFilter', filterName],
		]);
	});
	it('should execute all actions on removeFilter call', () => {
		const filter = testFilters[0];
		actions.removeFilter({ commit, dispatch }, filter.name);
		expect(dispatch.args).to.deep.equal([
			['applyFilter'],
		]);
	});

	it('should execute all commits on resetFilters call', () => {
		actions.resetFilters({ commit, state: testState });
		expect(commit.args).to.deep.equal([
			['resetFilters'],
			['setItems', testState.allItems],
		]);
	});

	it('should execute all commits on applyFilter call', () => {
		actions.applyFilter({ commit, state: testState });
		expect(commit.args).to.deep.equal([
			['setLoadingState', true],
			['setItems', testItemData],
			['setLoadingState', false],
		]);
	});

	it('should execute all commits on loadData', async () => {
		sinon.stub(axios, 'get').callsFake((url) => {
			const resource = config.resources.find((res) => url.includes(res));
			const event = config.events.find((e) => url.includes(e));
			if (resource) {
				const result = {};
				[result[resource]] = testItemData;
				return Promise.resolve({ data: result });
			}
			if (event) {
				return Promise.resolve({ data: testEventData });
			}
			throw new Error(`url ${url} is unknown`);
		});

		await actions.loadData({ commit });

		const expectedItemData = config.resources.map(() => testItemData[0]).flat();
		const expectedStrictCommits = [
			['setLoadingState', true],
			['setItems', expectedItemData],
			['setAllItems', expectedItemData],
			['calculateHistogram', expectedItemData],
		];

		expect(commit.args.slice(0, 4)).to.deep.equal(expectedStrictCommits);
		config.events.forEach((e) => {
			const eventData = {};
			eventData[e] = testEventData;
			const exists = commit.args.some(([name, data]) => name === 'setEvent' && JSON.stringify(data) === JSON.stringify(eventData));
			// eslint-disable-next-line no-unused-expressions
			expect(exists).to.be.true;
		});
		expect(commit.args.pop()).to.deep.equal(['setLoadingState', false]);
	});
});
