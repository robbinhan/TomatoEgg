/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AlertIOS
} = React;

var TomatoEgg = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function() {
    return {
      timeouting:true,
      timeoutText:'25:00'
    };
  },

  _onPressButton: function() {
    //request api
    fetch("http://127.0.0.1:5000/mail", {
      method: "POST",
      body: JSON.stringify({
        title: "nraboy"
      })
    })
    .then((responseData) => {
        AlertIOS.alert(
            "POST Response",
            "Response Body -> " + JSON.stringify(responseData.body)
        )
    })
    .done();

    var timeout = 5;
    console.log('Clicked');
    this.setState({
      timeouting: true
    });
    var interID = this.setInterval(
          () => {
            timeout--;
            var min = Math.floor(timeout/60) % 60;
            var sec = timeout % 60;
            this.setState({
              timeoutText: min+':'+sec
            });
            if (timeout == 0) {
              this.clearInterval(interID);
              AlertIOS.alert(
                '时间到！',
                '你尽然吃掉了一个番茄！',
                [
                  {
                    text: '确认', onPress: () => {
                      //request api
                      console.log('OK Pressed!')
                    }
                  },
                ]
              )
            }
            console.log('timeout',min+':'+sec);
          },
          1000
        );
  },

  render: function() {
    console.log(this.state.timeouting,this.state.timeoutText)
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._onPressButton}>
          <Image source={require('./imgs/next.png')} />
        </TouchableHighlight>
        {this.state.timeouting ? <Text>{this.state.timeoutText}</Text> : null }
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TomatoEgg', () => TomatoEgg);
