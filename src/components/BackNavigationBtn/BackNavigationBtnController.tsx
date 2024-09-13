import { Component } from 'react';
import { Navigation } from '../../types';

interface BackNavigationBtnControllerProps {
  navigation: Navigation['navigation'];
}

interface BackNavigationBtnControllerState {}

export class BackNavigationBtnController extends Component<
  BackNavigationBtnControllerProps,
  BackNavigationBtnControllerState
> {
  goBack = () => {
    this.props.navigation.goBack();
  };
}

export default BackNavigationBtnController;
