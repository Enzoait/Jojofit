import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';

export default function Profile() {
  const { user, isLoading } = useUser();
  const [birthdate, setBirthdate] = useState('01/01/1990');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  const renderEditableField = (label, value, onChangeText, keyboardType = 'default') => {
    const renderValue = isEditing ? (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onBlur={handleSave}
        keyboardType={keyboardType}
        placeholder={label === 'Age' ? 'jj/mm/yyyy' : ''}
      />
    ) : (
      <Text style={styles.text}>
        {`${label !== 'Pseudo' ? label + ': ' : ''}${label === 'Age' ? calculateAge(value) + ' ans' : value}${
          label === 'Taille' ? ' cm' : label === 'Poids' ? ' kg' : ''
        }`}
      </Text>
    );

    return (
      <View style={styles.fieldContainer}>
        {isEditing && <Text style={styles.label}>{label}</Text>}
        {renderValue}
      </View>
    );
  };

  const calculateAge = (birthdate) => {
    const birthYear = parseInt(birthdate.split('/')[2], 10);
    const birthMonth = parseInt(birthdate.split('/')[1], 10);
    const birthDate = parseInt(birthdate.split('/')[0], 10);
    const currentYear = new Date().getFullYear();
    let age = currentYear - birthYear;
    if (birthDate > new Date().getDate()) {
      if (birthMonth <= new Date().getMonth()) {
        age += 1;
      }
      age -= 1;
    }
    return age;
  };

  const calculateIMC = () => {
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height) / 100;
    if (!isNaN(parsedWeight) && !isNaN(parsedHeight) && parsedHeight !== 0) {
      const imc = parsedWeight / parsedHeight ** 2;
      return imc.toFixed(2);
    }
    return -1;
  };

  const getColorForIMC = (imc) => {
    const imcValue = parseFloat(imc);
    if (imcValue < 18.5) {
      return Colors.azureBreeze;
    } else if (imcValue >= 18.5 && imcValue < 25) {
      return Colors.green;
    } else if (imcValue >= 25 && imcValue < 30) {
      return Colors.orange;
    } else {
      return Colors.red;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>

      <Text style={styles.pseudo}>{user?.fullName}</Text>
      {renderEditableField('Age', birthdate, setBirthdate, 'numeric', 'date')}
      {renderEditableField('Poids', weight, setWeight, 'decimal-pad')}
      {renderEditableField('Taille', height, setHeight, 'decimal-pad')}

      <View style={[styles.fieldContainerIMC,{backgroundColor: getColorForIMC(calculateIMC())}]}>
        <Text style={styles.text}>IMC: {calculateIMC()}</Text>
      </View>

      <TouchableOpacity
        onPress={() => setIsEditing(true)}
        accessible={true}
        accessibilityLabel={`Edit Profile${isEditing ? ', Editing' : ''}`}
        accessibilityRole="button"
        accessibilityState={{ disabled: isEditing }}
      >
        <Button title="Editer le profil" color={Colors.blueSky} onPress={() => setIsEditing(true)} disabled={isEditing} />
      </TouchableOpacity>
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
    marginBottom: 40,
    color: Colors.black,
  },
  pseudo: {
    fontSize: 30,
    marginBottom: 40,
    color: Colors.black,
  },
  fieldContainer: {
    marginBottom: 30,
    backgroundColor: Colors.oceanicBlue,
  },
  fieldContainerIMC: {
    width: 110,
    marginStart: 140,
    marginBottom: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 2,
    marginBottom: 2,
  },
});
