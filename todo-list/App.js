import React, { useState } from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {Calendar} from 'react-native-calendars';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});

  const handleAddTask = () => {
    const updatedTaskItems = [...taskItems, { date: selectedDate, task: task }];
    const updatedMarkedDates = { ...markedDates, [selectedDate]: { marked: true } };

    setTaskItems(updatedTaskItems);
    setMarkedDates(updatedMarkedDates);

    setTask('');
    Keyboard.dismiss();
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    const deletedItem = itemsCopy.splice(index, 1)[0];
    if (deletedItem.date === selectedDate) {
      const filteredTasks = itemsCopy.filter((item) => item.date === selectedDate);
      if (filteredTasks.length === 0) {
        const updatedMarkedDates = { ...markedDates };
        delete updatedMarkedDates[selectedDate]; 
        setMarkedDates(updatedMarkedDates); 
      }
    }
    setTaskItems(itemsCopy);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const filteredTasks = taskItems.filter((item) => item.date === selectedDate);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.calendarWrapper}>
          <Text style={styles.title}>Todo-list </Text>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{ ...markedDates, [selectedDate]: { selected: true } }}
          />
        </View>

        {selectedDate ? (
          <View>
            <Text style={styles.selectedDateText}> 선택된 날짜 : {selectedDate} </Text>
            <View style={styles.writeTaskWrapper}>
            <TextInput
              style={styles.input}
              placeholder="입력하기"
              value={task}
              onChangeText={text => setTask(text)}
            />
            <TouchableOpacity onPress={handleAddTask} style={styles.addWrapper}>
              <Text> + </Text>
            </TouchableOpacity>
            </View>
            <View style={styles.tasksWrapper}>
              <View style={styles.items}>
                {filteredTasks.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item.task} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7ecef',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  calendarWrapper: { //캘린더
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tasksWrapper: { //리스트 화면
    paddingHorizontal: 20,
  },
  title: { //todo-list 글씨
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  selectedDateText: { //날짜 출력
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: { //입력하기, + 버튼
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: { //입력하기 버튼
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: { //+ 버튼
    marginLeft: 10,
    width: 55,
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});
