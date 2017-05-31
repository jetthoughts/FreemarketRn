import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  base: {
    flex: 1,
    padding: 40,
  },
  input: {
    height: 40,
  },
  button: {
    paddingTop: 10,
  },
});

export default class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  submit() {
    const { login, password } = this.state;
    this.props.onSubmit({ login, password });
  }

  render() {
    return (
      <View style={styles.base}>
        <Text>Login:</Text>
        <TextInput
          style={styles.input}
          onChangeText={login => this.setState({ login })}
          value={this.state.login}
        />
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
        />
        <View style={styles.button}>
          <Button
            title="Log In"
            onPress={this.submit}
          />
        </View>
      </View>
    );
  }
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
