import { Component } from "react";
import { Navigation, Pokemon, PokemonStat } from "../../types";

interface Props {
  navigation: Navigation["navigation"];
  route: Navigation["route"];
}

interface S {
  pokemon: Pokemon | null;
}

export default class ComponentController extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pokemon: null,
    };
  }

  componentDidMount = async () => {
    const { params } = this.props.route;
    if (params?.pokemon?.id) {
      const formattedStats = this.formattingStats(params?.pokemon?.stats);
      this.setState({ pokemon: { ...params?.pokemon, stats: formattedStats } });
    }
  };

  formattingStats = (stats: any) => {
    let newStats: PokemonStat[] = [];
    stats.map((item: any) => {
      if (item.name === "hp") {
        newStats.push({
          ...item,
          name: "HP",
        });
      } else {
        let formattedName = item.name.replace("-", " ");

        const words = formattedName.split(" ");
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        newStats.push({
          ...item,
          name: words.join(" "),
        });
      }
    });

    return newStats;
  };
}
