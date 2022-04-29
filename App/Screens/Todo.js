import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteTaskList,
  setTaskList,
  taskListSelector,
  updateTaskList,
} from '../redux/appSlice';

export const Todo = () => {
  const dispatch = useDispatch();
  const taskList = useSelector(taskListSelector);
  const [task, setTask] = useState('');
  const [item, setItem] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const AddTaskHandler = () => {
    if (taskList?.length > 0)
      dispatch(
        setTaskList([...taskList, {task: task, id: new Date().getTime()}]),
      );
    else dispatch(setTaskList([{task: task, id: new Date().getTime}]));
    setTask('');
  };

  const EditHandler = item => {
    setIsEditing(true);
    setTask(item.task);
    setItem(item);
  };

  const updateTaskHandler = () => {
    dispatch(updateTaskList({task: task, id: item?.id}));
    setIsEditing(false);
  };

  const DeleteHandler = item => {
    Alert.alert(
      'Confirm Dialogue',
      `Are you sure you want to delete ${item?.task}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {text: 'OK', onPress: () => dispatch(deleteTaskList(item))},
      ],
    );
  };

  const ClearAllHandler = () => {
    dispatch(setTaskList([]));
  };

  const renderItem = ({item}) => (
    <View style={Style.Item}>
      <Text style={Style.ItemText}>{item?.task}</Text>
      <View style={Style.TaskActions}>
        <TouchableOpacity
          style={Style.EditAction}
          onPress={() => EditHandler(item)}>
          <Text style={Style.ActionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Style.DeleteAction}
          onPress={() => DeleteHandler(item)}>
          <Text style={Style.ActionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={Style.Container}>
      <Text style={Style.TitleText}>To Do List</Text>
      <TextInput
        placeholder="Add task"
        value={task}
        style={Style.input}
        onChangeText={setTask}
      />
      <TouchableOpacity
        style={Style.AddTaskButton}
        onPress={!isEditing ? AddTaskHandler : updateTaskHandler}>
        <Text style={Style.AddButtonText}>
          {!isEditing ? 'Add Task' : 'Update Task'}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={taskList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
      />
      <TouchableOpacity style={Style.ClearTaskButton} onPress={ClearAllHandler}>
        <Text style={Style.ClearText}>Clear All task</Text>
      </TouchableOpacity>
    </View>
  );
};

const Style = StyleSheet.create({
  Container: {
    flex: 1,
    margin: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  Item: {
    marginVertical: 16,
    padding: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ItemText: {
    fontSize: 20,
  },
  AddTaskButton: {
    alignItems: 'center',
    backgroundColor: '#8add25',
    padding: 16,
  },
  AddButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  TaskActions: {flexDirection: 'row', justifyContent: 'flex-end'},
  EditAction: {
    marginRight: 10,
  },
  ActionText: {
    fontSize: 16,
  },
  ClearTaskButton: {
    alignItems: 'center',
    backgroundColor: '#8add25',
    padding: 16,
    width: '45%',
    alignSelf: 'flex-end',
  },
  ClearText: {
    color: '#ffffff',
    fontSize: 16,
  },
  TitleText: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
