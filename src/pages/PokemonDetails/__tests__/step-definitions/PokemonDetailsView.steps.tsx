import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import PokemonDetailsView from "../../PokemonDetailsView";

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
};

const feature = loadFeature(
  "./src/pages/PokemonDetails/__tests__/features/PokemonDetailsView.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("Render Pokemon Details", ({ given, when, then }) => {
    let PokemonDetailsViewWrapper: ShallowWrapper;
    let instance: PokemonDetailsView;

    given("I am on the Pokemon Details Page", () => {
      PokemonDetailsViewWrapper = shallow(<PokemonDetailsView {...props} />);
    });

    when("I successfully load Pokemon Details Page", async () => {
      instance = PokemonDetailsViewWrapper.instance() as PokemonDetailsView;
    });

    then("I should see Hello World", () => {
      const helloWorldText = PokemonDetailsViewWrapper.find(
        '[data-test-id="hello-text"]'
      );

      expect(helloWorldText).toBeDefined();
    });
  });
});
