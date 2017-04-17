import React from 'react';
import { render } from 'react-dom';
import TimePicker from './src/TimePicker';
import * as moment from "moment";

export default class DemoApp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '14:00:01'
    }
  }

  onChange(value, moment) {
    this.setState({
      value: value
    })
  }

  render() {
    return (
      <TimePicker
        value = {this.state.value}
        onChange = {this.onChange.bind(this)}
      />
    )
  }
}

render(
  <DemoApp />,
  document.getElementById('content')
)