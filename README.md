# Animated To-Do List with Reanimated 2 and Expo

This project demonstrates how to create an animated to-do list application using Reanimated 2 in a React Native app with Expo. The app allows users to add, remove, and reorder tasks with smooth animations.

### 👀 You can find the tutoral blog here! => 🔗 [Animated To-Do List with Reanimated 2 and Expo](https://)

## Prerequisites

Ensure you have the following installed:

- Node.js
- Expo CLI (`npm install -g expo-cli`)

## Getting Started

Follow these steps to set up and run the project.

### Step 1: Create a New Expo Project

Create a new Expo project using the Reanimated template:

```bash
yarn create expo-app my-todo-app -e with-reanimated
cd my-todo-app
```

### Step 2: Install Required Libraries

Install `react-native-gesture-handler`:

```bash
yarn add react-native-gesture-handler
```

### Step 3: Implement the To-Do List

Create a `ToDoList.js` component:

```javascript
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import TaskItem from './TaskItem';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: task }]);
      setTask('');
    }
  };

  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <TaskItem item={item} removeTask={removeTask} />
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Add a task"
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ToDoList;
```

Create a `TaskItem.js` component:

```javascript
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const TaskItem = ({ item, removeTask }) => {
  const translateX = useSharedValue(0);
  const taskHeight = useSharedValue(70);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      height: taskHeight.value,
      opacity: taskHeight.value / 70,
    };
  });

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      // Initialize context here if needed
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value < -150) {
        translateX.value = withTiming(-200);
        taskHeight.value = withTiming(0, {}, () => {
          runOnJS(removeTask)(item.id);
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.task, animatedStyle]}>
        <Text>{item.title}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  task: {
    height: 70,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default TaskItem;
```

Update `App.js` to include the `ToDoList` component:

```javascript
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ToDoList from './ToDoList';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToDoList />
    </GestureHandlerRootView>
  );
}
```

### Running the Project

To run the project, use the following commands based on the platform you want to test:

- **Start the Expo development server:**

  ```bash
  yarn start --reset-cache
  ```

  This will give you options to choose the platform or run directly by:


- **Run on iOS:**

  ```bash
  yarn ios
  ```

- **Run on Android:**

  ```bash
  yarn android
  ```
  
---
 

### Next Steps

For an additional challenge, try implementing the ability to reorder tasks within the to-do list. Share your results and any issues you encounter!

---
