import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";

export default function AddTodo({ submitHandler }) {

  const [title, setTitle] = useState("");

  const changeHandler = val => {
    setTitle(val);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        multiline minHeight={20} maxLength={100} 
        placeholder="new todo..."
        onChangeText={changeHandler}
      />
      <Button onPress={() => submitHandler(title)} title='add todo' color='coral' /> 
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
});
