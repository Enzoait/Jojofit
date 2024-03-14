import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Colors from '../../Utils/Colors';

export default function Nutrition() {
  const [searchText, setSearchText] = useState('');
  const [nutrients, setNutrients] = useState({
    weight: '0',
    proteins: '0',
    lipids: '0',
    fat: '0',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState([{ ...nutrients }]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/search?query=${searchText}`);
      if (!response.ok) {
        console.error('Network response was not ok:', response.status);
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data.foods.food);
    } catch (error) {
      console.error('Error fetching or parsing search results:', error);
      setError('An error occurred while fetching search results. Please try again later.');
    }
    
  };

  const handleSearch2 = () => {
    if (searchText.trim() !== '') {
      handleSearch(searchText);
    }
  };

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const handleAddCard = () => {
    setCards([...cards, { ...nutrients }]);
  };

  const renderNutrientField = (label, nutrientKey, cardIndex) => (
    <View style={styles.fieldContainer} key={nutrientKey}>
      <Text style={styles.label}>{label}:</Text>
      {isEditing ? (
        <TextInput
          style={styles.textInput}
          value={cards[cardIndex][nutrientKey]}
          onChangeText={(text) => {
            const newCards = [...cards];
            newCards[cardIndex][nutrientKey] = text;
            setCards(newCards);
          }}
        />
      ) : (
        <Text style={styles.text}>
          {`${cards[cardIndex][nutrientKey]} g`}
        </Text>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>

        <Text style={styles.title}>Nutrition</Text>

          {cards.map((card, index) => (
          <View style={styles.cardContainer} key={index}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              onSubmitEditing={handleSearch2}
            />

            <View style={styles.nutritionDetails}>
              <View style={styles.column}>
                {renderNutrientField('Weight', 'weight', index)}
                {renderNutrientField('Lipids', 'lipids', index)}
              </View>
              <View style={styles.column}>
                {renderNutrientField('Proteins', 'proteins', index)}
                {renderNutrientField('Fat', 'fat', index)}
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
  nutritionDetails: {
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