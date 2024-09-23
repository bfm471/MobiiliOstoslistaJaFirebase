import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { app } from './firebaseConfig';
import { getDatabase, push, ref, onValue, remove } from "firebase/database";

export default function App() {
  const [product, setProduct] = useState({
    name: '',
    amount: ''
  });
  const [items, setItems] = useState([]);
  const inputFocus = useRef(null);
  const database = getDatabase(app);

  useEffect(() => { 
    inputFocus.current.focus();
  }, []);

  const handleSave = () =>  {
    if (product.amount && product.name) {
      push(ref(database, 'ostokset/'), product);
      handleClear();
    } else {
      Alert.alert("Nothing to add...");
    }
  }

  useEffect(() => {
    const itemsRef = ref(database, 'ostokset/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const keys = Object.keys(data);
        const keysAndData = Object.values(data).map((obj, index) => {
          return { ...obj, key: keys[index] }
        })
        setItems(keysAndData);
      } else {
        setItems([]);
      }
    })
  }, []);

  const deleteItem = async (key) => {
    try {
      remove(ref(database, `ostokset/${key}`))
    }
    catch (error) {
      console.error('Could not delete item', error);
    }
  }

  const handleClear = () => {
    setProduct({});
    inputFocus.current.focus();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Enter item'
          onChangeText={text => setProduct({...product, name: text})}
          value={product.name}
          ref={inputFocus}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter amount'
          onChangeText={text => setProduct({...product, amount: text})}
          value={product.amount}
        />

        <View style={styles.buttonContainer}>
          <Button title='ADD' onPress={handleSave} />
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={items}
          renderItem={({ item }) =>
            <View style={styles.listItemContainer}>
              <Text style={styles.listItem}>{item.name}, </Text>
              <Text style={styles.listItem}>{item.amount}</Text>
              <Text style={styles.deletePress} onPress={() => deleteItem(item.key)}>  Bought</Text>
            </View>
          }
          ListHeaderComponent={<Text style={styles.listHeader}>Shopping List</Text>}
          ListEmptyComponent={<Text style={styles.listEmpty}>No items to get...</Text>}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    fontSize: 18,
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 10
  },
  listContainer: {
    flex: 3,
  },
  listHeader: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#008b8b',
    textShadowColor: '#404040',
    textShadowOffset: { width: 1, height: -1 },
    textShadowRadius: 1,
  },
  listEmpty: {
    fontSize: 15,
    marginTop: 20,
  },
  list: {
    textAlign: 'left',
    marginLeft: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    fontSize: '25px'
  },
  listItem: {
    fontSize: 19,
  },
  deletePress: {
    color: '#009DCF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
