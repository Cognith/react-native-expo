import { Component } from "react";
import { Navigation } from "../../types";

interface Props {
  navigation: Navigation["navigation"];
}

interface S {}

export default class ComponentController extends Component<Props, S> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }
}
