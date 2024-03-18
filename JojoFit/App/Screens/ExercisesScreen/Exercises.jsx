import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Colors from '../../Utils/Colors';

export default function Exercises() {
  const [searchText, setSearchText] = useState('');
  const [exercises, setExercises] = useState({
    weight: '0',
    repetitions: '0',
    difficulty: 'normal',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState([{...exercises}]);

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const handleAddCard = () => {
    setCards([...cards, { ...exercises }]);
  };

  const renderExerciseField = (label, exerciseKey, cardIndex) => (
    <View style={styles.fieldContainer} key={exerciseKey}>
      <Text style={styles.label}>{label}:</Text>
      {isEditing ? (
        <TextInput
          style={styles.textInput}
          value={cards[cardIndex][exerciseKey]}
          onChangeText={(text) => {
            const newCards = [...cards];
            newCards[cardIndex][exerciseKey] = text;
            setCards(newCards);
          }}
        />
      ) : (
        <Text style={styles.text}>
          {`${cards[cardIndex][exerciseKey]} ${exerciseKey === 'Weight' ? ' kg' : ''}`}
        </Text>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>

        <Text style={styles.title}>Exercises</Text>

        {cards.map((card, index) => (
          <View style={styles.cardContainer} key={index}>
            <TextInput
              style={styles.input}
              placeholder="Search exercises..."
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />

            <View style={styles.exerciseDetails}>
              <View style={styles.column}>
                {renderExerciseField('Poids', 'weight', index)}
                {renderExerciseField('Intensité', 'difficulty', index)}
              </View>
              <View style={styles.column}>
                {renderExerciseField('Répétitions', 'repetitions', index)}
              </View>
            </View>

            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
              <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.azureBreeze,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: Colors.black,
  },
  cardContainer: {
    backgroundColor: Colors.etherealBlue,
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 35,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  exerciseDetails: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
  fieldContainer: {
    marginBottom: 30,
    backgroundColor: Colors.oceanicBlue,
    width: '100%',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 5,
  },
  textInput: {
    fontSize: 18,
    marginBottom: 10,
    color: Colors.black,
    borderColor: Colors.gray,
    borderWidth: 0.5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: Colors.black,
    width: '100%',
  },
  editButton: {
    backgroundColor: Colors.gray,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  editButtonText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: Colors.blueSky,
  },

  addButton: {
    backgroundColor: Colors.green,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
});