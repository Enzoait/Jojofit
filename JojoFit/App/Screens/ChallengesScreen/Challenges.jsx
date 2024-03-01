import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../Utils/Colors';

export default function Challenges() {
  const [challengesData, setChallengesData] = useState([
    { challenge: 'Challenge 1', deadline: '2024-03-15', status: 'On' },
    { challenge: 'Challenge 2', deadline: '2024-03-20', status: 'Off' },
    { challenge: 'Challenge 3', deadline: '2024-03-25', status: 'On' },
  ]);

  const toggleStatus = (index) => {
    const updatedChallenges = [...challengesData];
    updatedChallenges[index].status = updatedChallenges[index].status === 'On' ? 'Off' : 'On';
    setChallengesData(updatedChallenges);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Challenges</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.columnHeader}>Challenge</Text>
          <Text style={styles.columnHeader}>Deadline</Text>
          <Text style={styles.columnHeader}>On/Off</Text>
        </View>
        {challengesData.map((challenge, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{challenge.challenge}</Text>
            <Text style={styles.tableCell}>{challenge.deadline}</Text>
            <TouchableOpacity
              style={[
                styles.tableCell,
                {
                  backgroundColor: challenge.status === 'On' ? Colors.green : Colors.red,
                },
              ]}
              onPress={() => toggleStatus(index)}
            >
              <Text style={styles.buttonText}>{challenge.status}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.azureBreeze,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.black,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  columnHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
  },
  tableCell: {
    fontSize: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
  },
});
