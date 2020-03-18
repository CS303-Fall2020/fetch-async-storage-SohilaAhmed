import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
    TouchableWithoutFeedback,
    Keyboard, 
    TextInput,
    Button
  } from "react-native";
//   import Home from './home';

  export default function ReviewDetails({ navigation, route }) {
    const [title, setTitle] = useState("");

    const changeHandler = val => {
      setTitle(navigation.getParam('item').title+val);
    };
    const f = navigation.getParam('edit');

    // const submitHandler = (title) => {
    //     if (title.length > 3) {
        //   todo = route.params
        //   todo.title= title
        //   navigation.setParams(todo)
          // navigation.goBack()
            // setTitle(prevTitle => {
            // return [{ title: title }, ...prevTitle];
            // navigation.goBack()
          // });
      //   }else {
      //     Alert.alert("OOPS!", "Todos must over 3 chars long", [
      //       { title: "Understood", onPress: () => console.log("alert closed") }
      //     ]);
      //    }
      // };
      
    return (
        <View>
           <TextInput style={styles.item} onChangeText={changeHandler} defaultValue={ navigation.getParam('item').title } ></TextInput>
           <Button onPress={() => f(navigation.getParam('item').id,title)} title='Done' color='coral' /> 
           {/* <Button onPress={() => (submitHandler)} title='Done' color='coral' />  */}
        </View>
    )
  }
  const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
    }
})