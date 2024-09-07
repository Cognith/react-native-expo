import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import PokemonsListView from "../../PokemonsListView";

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
};

const feature = loadFeature(
  "./src/pages/PokemonsList/__tests__/features/PokemonsListView.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("Render Pokemon List", ({ given, when, then }) => {
    let PokemonsListViewWrapper: ShallowWrapper;
    let instance: PokemonsListView;

    given("I am on the Pokemon List Page", () => {
      PokemonsListViewWrapper = shallow(<PokemonsListView {...props} />);
    });

    when("I successfully load Pokemon List Page", async () => {
      instance = PokemonsListViewWrapper.instance() as PokemonsListView;
    });

    then("I should see Hello World", () => {
      const helloWorldText = PokemonsListViewWrapper.find(
        '[data-test-id="hello-text"]'
      );

      expect(helloWorldText).toBeDefined();
    });
  });
});
