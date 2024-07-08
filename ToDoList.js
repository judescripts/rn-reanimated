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
