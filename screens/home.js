import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  CheckBox,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from "react-native";
// import Header from "../components/header";
import TodoItem from "../components/todoItem";
import AddTodo from "../components/addTodo";
// import ReviewDetails from "./reviewDetails";
import Constants from "expo-constants";

// function wait(timeout) {
//   return new Promise(resolve => {
//     setTimeout(resolve, timeout);
//   });
// }

export default function Home({ navigation }) {

  
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);

  //   wait(2000).then(() => setRefreshing(false));
  // }, [refreshing]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
      .then(response => response.json())
      .then(response => {
        setTodos(response), setLoading(false);
      })
      .then(json => console.log(json))

      .catch(e => {
        console.error(e);
      });
  }, []);

  // useEffect(async () => {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
  //   const data = await response.json();
  //   const item = data;
  //   setTodos(item)

  // }, [])
  // if(loading)
  useEffect(async () => {
    try {
      await AsyncStorage.setItem("Todos", JSON.stringify(todos));
    } catch (error) {
      // Error saving data
    }
  }, []);
  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem("Todos");
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }, []);


  const pressHandler = id => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id != id);
    });
  };

  const pressHandler1 = (item) => {
    navigation.navigate("ReviewDetails", {item, edit});
    // navigation.push('ReviewDetails');
  };

  const pressHandler2 = id => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => {
        if ((todo.id != id) == false) {
          todo.completed = !todo.completed;
        }
        return true;
      });
    });
  };

  const edit = (id, title) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo =>{
        if((todo.id != id) == false){
          todo.title = title;
        }
        return true;
      });
    });
    navigation.navigate('Home');
  }

  const submitHandler = title => {
    if (title.length > 3) {
      setTodos(prevTodos => {
        return [
          { title: title, id: Math.random().toString(), completed: false },
          ...prevTodos
        ];
      });
    } else {
      Alert.alert("OOPS!", "Todos must over 3 chars long", [
        { title: "Understood", onPress: () => console.log("alert closed") }
      ]);
    }
  };

  // const refreshPage = () => {
  //   window.location.reload(false);
  // }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed keyboard");
      }}
    >
      <View style={styles.container}>
        {/* <Header /> */}
        <View style={styles.contant}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                // <TouchableOpacity onPress={() => navigation.navigate("ReviewDetails", {edit})} >
                  <TodoItem
                    item={item}
                    pressHandler={pressHandler}
                    pressHandler1={pressHandler1}
                    pressHandler2={pressHandler2}
                    edit={edit}
                  />
                  // </TouchableOpacity>
              )}
            />
          </View>
        </View>
        {/* <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Pull down to see RefreshControl indicator</Text> */}
        {/* </ScrollView> */}
        <Button title="Refresh" color="coral"  />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contant: {
    padding: 40,
    // backgroundColor: "#666",
    flex: 1
  },
  list: {
    marginTop: 28,
    flex: 1
  }
});
