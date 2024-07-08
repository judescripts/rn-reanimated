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
