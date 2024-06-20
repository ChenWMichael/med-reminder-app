import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MedicationsScreen = () => {
    const [medications, setMedications] = useState([]);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [newMedication, setNewMedication] = useState({
        name: '',
        dosage: '',
        frequency: '',
        time: '',
        startDate: '',
        endDate: '',
        instructions: ''
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const navigation = useNavigation();

    const addMedication = () => {
        // resetNewMedication();
        const updatedMedications = [...medications, newMedication];
        console.log("Medications being added:", updatedMedications);
        setMedications(updatedMedications);
        navigation.navigate('Home', { medications: updatedMedications });
        resetNewMedication();
        setModalVisible(false);
    };

    const updateMedication = () => {
        setMedications(medications.map(med => (med === selectedMedication ? newMedication : med)));
        resetNewMedication();
        setEditModalVisible(false);
    };

    const deleteMedication = () => {
        const updatedMedications = medications.filter(med => med !== selectedMedication);
        setMedications(updatedMedications);
        navigation.navigate('Home', { medications: updatedMedications });
        resetNewMedication();
        setEditModalVisible(false);
    };

    const resetNewMedication = () => {
        setNewMedication({
            name: '',
            dosage: '',
            frequency: '',
            time: '',
            startDate: '',
            endDate: '',
            instructions: ''
        });
        setSelectedMedication(null);
    };

    const handleLongPress = (medication) => {
        setSelectedMedication(medication);
        setNewMedication(medication);
        setEditModalVisible(true);
    };

    const closeModal = () => {
        resetNewMedication();
        setModalVisible(false);
        setEditModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={medications}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.medicationItem}
                        onLongPress={() => handleLongPress(item)}
                    >
                        <Text style={styles.medicationName}>{item.name}</Text>
                        <Text style={styles.medicationText}>Dosage: {item.dosage}</Text>
                        <Text style={styles.medicationText}>Frequency: {item.frequency}</Text>
                        <Text style={styles.medicationText}>Time: {item.time}</Text>
                        <Text style={styles.medicationText}>Start Date: {item.startDate}</Text>
                        <Text style={styles.medicationText}>End Date: {item.endDate}</Text>
                        <Text style={styles.medicationText}>Instructions: {item.instructions}</Text>
                    </Pressable>
                )}
            />
            <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Add Medication</Text>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="Medication Name"
                            placeholderTextColor="#ccc"
                            value={newMedication.name}
                            onChangeText={(text) => setNewMedication({ ...newMedication, name: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="Dosage"
                            placeholderTextColor="#ccc"
                            value={newMedication.dosage}
                            onChangeText={(text) => setNewMedication({ ...newMedication, dosage: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="Frequency (in days)"
                            placeholderTextColor="#ccc"
                            value={newMedication.frequency}
                            onChangeText={(text) => setNewMedication({ ...newMedication, frequency: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="Time (military)"
                            placeholderTextColor="#ccc"
                            value={newMedication.time}
                            onChangeText={(text) => setNewMedication({ ...newMedication, time: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="Start Date (MM/DD/YYYY)"
                            placeholderTextColor="#ccc"
                            value={newMedication.startDate}
                            onChangeText={(text) => setNewMedication({ ...newMedication, startDate: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="End Date (MM/DD/YYYY)"
                            placeholderTextColor="#ccc"
                            value={newMedication.endDate}
                            onChangeText={(text) => setNewMedication({ ...newMedication, endDate: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="Special Instructions"
                            placeholderTextColor="#ccc"
                            value={newMedication.instructions}
                            onChangeText={(text) => setNewMedication({ ...newMedication, instructions: text })}
                        />
                        <View style={styles.modalButtons}>
                            <Pressable style={styles.modalButton} onPress={addMedication}>
                                <Text style={styles.buttonText}>Add</Text>
                            </Pressable>
                            <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="Medication Name"
                            placeholderTextColor="#ccc"
                            value={newMedication.name}
                            onChangeText={(text) => setNewMedication({ ...newMedication, name: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="Dosage"
                            placeholderTextColor="#ccc"
                            value={newMedication.dosage}
                            onChangeText={(text) => setNewMedication({ ...newMedication, dosage: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="Frequency"
                            placeholderTextColor="#ccc"
                            value={newMedication.frequency}
                            onChangeText={(text) => setNewMedication({ ...newMedication, frequency: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="Time"
                            placeholderTextColor="#ccc"
                            value={newMedication.time}
                            onChangeText={(text) => setNewMedication({ ...newMedication, time: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="Start Date"
                            placeholderTextColor="#ccc"
                            value={newMedication.startDate}
                            onChangeText={(text) => setNewMedication({ ...newMedication, startDate: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="End Date"
                            placeholderTextColor="#ccc"
                            value={newMedication.endDate}
                            onChangeText={(text) => setNewMedication({ ...newMedication, endDate: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            placeholder="Special Instructions"
                            placeholderTextColor="#ccc"
                            value={newMedication.instructions}
                            onChangeText={(text) => setNewMedication({ ...newMedication, instructions: text })}
                        />
                        <View style={styles.modalButtons}>
                            <Pressable style={styles.modalButton} onPress={updateMedication}>
                                <Text style={styles.buttonText}>Update</Text>
                            </Pressable>
                            <Pressable style={[styles.modalButton, styles.deleteButton]} onPress={deleteMedication}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </Pressable>
                            <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={closeModal}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    medicationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    medicationName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    medicationText: {
        fontSize: 16,
    },
    addButton: {
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    inputText: {
        color: '#000',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
});

export default MedicationsScreen;