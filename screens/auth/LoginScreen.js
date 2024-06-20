import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      const bypassEmail = 'bypass'; // Bypass email
      const bypassPassword = 'bypass'; // Bypass password

      if (email === bypassEmail && password === bypassPassword) {
          navigation.navigate('HomeTabs');
          return;
      }

      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        navigation.navigate('HomeTabs');
      } catch (error) {
        Alert.alert('Login Error', error.message);
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      width: '100%',
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
    },
    labelText: {
      alignSelf: 'flex-start',
      width: '100%',
      color: "green",
      fontSize: 50
    },
    button: {
      backgroundColor: 'green',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
      width: '100%',
      alignItems: 'center'
    },
    buttonText: {
      color: 'white',
      fontSize: 18
    }
  });
  
export default LoginScreen;