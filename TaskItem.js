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
