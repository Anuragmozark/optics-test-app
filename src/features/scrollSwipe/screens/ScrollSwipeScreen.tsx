import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';

const { width } = Dimensions.get('window');

type ScrollItem = {
  id: string;
  text: string;
  color: string;
  timestamp: string;
};

type InteractiveElement = {
  id: 1 | 2 | 3 | 4;
  type: 'button' | 'counter' | 'toggle' | 'slider';
  text: string;
  color: string;
};

type ElementStates = {
  1: { taps: number };
  2: { count: number };
  3: { toggled: boolean };
  4: { value: number };
};

const generateRandomWords = (count: number): ScrollItem[] => {
  const words = [
    'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew',
    'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'peach', 'quince', 'raspberry',
    'strawberry', 'tangerine', 'vanilla', 'watermelon', 'algorithm', 'binary', 'cache',
    'debug', 'encryption', 'firewall', 'gateway', 'hash', 'interface', 'javascript',
    'kernel', 'lambda', 'middleware', 'namespace', 'object', 'protocol', 'quantum',
    'router', 'server', 'token', 'unicode', 'virtual', 'wireless', 'xml', 'yaml', 'zip',
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: Math.random().toString(36).substr(2, 9),
    text: `${words[Math.floor(Math.random() * words.length)]} ${i + 1}`,
    color: `hsl(${Math.random() * 360}, 70%, 80%)`,
    timestamp: new Date().toLocaleTimeString(),
  }));
};

const interactiveElements: InteractiveElement[] = [
  { id: 1, type: 'button', text: 'Tap Me!', color: '#667eea' },
  { id: 2, type: 'counter', text: 'Counter: 0', color: '#48bb78' },
  { id: 3, type: 'toggle', text: 'Toggle: OFF', color: '#f56565' },
  { id: 4, type: 'slider', text: 'Slider: 50%', color: '#ed8936' },
];

const ScrollSwipeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [scrollItems, setScrollItems] = useState<ScrollItem[]>(generateRandomWords(50));
  const [newItemText, setNewItemText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [elementStates, setElementStates] = useState<ElementStates>({
    1: { taps: 0 },
    2: { count: 0 },
    3: { toggled: false },
    4: { value: 50 },
  });

  const addNewItem = () => {
    if (!newItemText.trim()) return;
    setScrollItems(prev => [
      {
        id: Math.random().toString(36).substr(2, 9),
        text: newItemText.trim(),
        color: `hsl(${Math.random() * 360}, 70%, 80%)`,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
    setNewItemText('');
    Alert.alert('Success', 'Item added!');
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const deleteSelectedItems = () => {
    if (selectedItems.size === 0) {
      Alert.alert('No Selection', 'Please select items to delete.');
      return;
    }
    Alert.alert('Delete Items', `Delete ${selectedItems.size} selected item(s)?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setScrollItems(prev => prev.filter(item => !selectedItems.has(item.id)));
          setSelectedItems(new Set());
          setIsEditing(false);
        },
      },
    ]);
  };

  const handleElementPress = (element: InteractiveElement) => {
    setElementStates(prev => {
      const next = { ...prev };
      switch (element.id) {
        case 1:
          next[1] = { taps: prev[1].taps + 1 };
          Alert.alert('Button Tapped!', `You've tapped ${next[1].taps} times!`);
          break;
        case 2: next[2] = { count: prev[2].count + 1 }; break;
        case 3: next[3] = { toggled: !prev[3].toggled }; break;
        case 4: next[4] = { value: Math.min(100, prev[4].value + 10) }; break;
      }
      return next;
    });
  };

  const getElementLabel = (element: InteractiveElement): string => {
    switch (element.id) {
      case 1: return `Tap Me! (${elementStates[1].taps})`;
      case 2: return `Counter: ${elementStates[2].count}`;
      case 3: return `Toggle: ${elementStates[3].toggled ? 'ON' : 'OFF'}`;
      case 4: return `Slider: ${elementStates[4].value}%`;
    }
  };

  const renderScrollItem = ({ item }: { item: ScrollItem }) => (
    <TouchableOpacity
      style={[
        styles.scrollItem,
        { backgroundColor: item.color },
        selectedItems.has(item.id) && styles.selectedItem,
      ]}
      onPress={() => isEditing && toggleItemSelection(item.id)}
      onLongPress={() => setIsEditing(true)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item.text}</Text>
        <Text style={styles.itemTimestamp}>{item.timestamp}</Text>
      </View>
      {selectedItems.has(item.id) && (
        <View style={styles.selectionIndicator}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <>
      {/* Interactive Elements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Elements</Text>
        <View style={styles.elementsGrid}>
          {interactiveElements.map(element => (
            <TouchableOpacity
              key={element.id}
              style={[styles.elementButton, { backgroundColor: element.color }]}
              onPress={() => handleElementPress(element)}
            >
              <Text style={styles.elementButtonText}>{getElementLabel(element)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* List controls */}
      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>List ({scrollItems.length} items)</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[styles.headerButton, isEditing && styles.activeEditButton]}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={[styles.headerButtonText, isEditing && styles.activeEditText]}>
              {isEditing ? 'Done' : 'Edit'}
            </Text>
          </TouchableOpacity>
          {isEditing && (
            <TouchableOpacity
              style={[styles.headerButton, styles.deleteButton]}
              onPress={deleteSelectedItems}
            >
              <Text style={styles.deleteButtonText}>Delete ({selectedItems.size})</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isEditing && (
        <View style={styles.addItemContainer}>
          <TextInput
            style={styles.addItemInput}
            placeholder="Enter new item text..."
            value={newItemText}
            onChangeText={setNewItemText}
            onSubmitEditing={addNewItem}
          />
          <TouchableOpacity style={styles.addButton} onPress={addNewItem}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  const ListFooter = () => (
    <View style={[styles.section, { marginTop: 20 }]}>
      <TouchableOpacity
        style={styles.animationButton}
        onPress={() => navigation.navigate('Animation')}
      >
        <Text style={styles.animationButtonText}>🎭 View Animation Demo</Text>
        <Text style={styles.animationButtonSubtext}>
          Experience InstaBIZ-style loading animations
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={scrollItems}
        renderItem={renderScrollItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={<ListHeader />}
        ListFooterComponent={<ListFooter />}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContainer: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#2d3748', marginBottom: 15 },
  elementsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  elementButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: (width - 52) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  elementButtonText: { color: 'white', fontSize: 14, fontWeight: '600', textAlign: 'center' },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  headerButtons: { flexDirection: 'row', gap: 10 },
  headerButton: { backgroundColor: '#e2e8f0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  activeEditButton: { backgroundColor: '#667eea' },
  headerButtonText: { fontSize: 14, color: '#4a5568', fontWeight: '500' },
  activeEditText: { color: 'white' },
  deleteButton: { backgroundColor: '#f56565' },
  deleteButtonText: { fontSize: 14, color: 'white', fontWeight: '500' },
  addItemContainer: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  addItemInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    elevation: 2,
  },
  addButton: { backgroundColor: '#48bb78', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10, justifyContent: 'center' },
  addButtonText: { color: 'white', fontSize: 14, fontWeight: '600' },
  listContainer: {
    // removed — FlatList is now the root list
  },
  flatList: { flex: 1 },
  flatListContent: { padding: 10 },
  scrollItem: { borderRadius: 8, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center' },
  selectedItem: { borderWidth: 2, borderColor: '#667eea' },
  itemContent: { flex: 1 },
  itemText: { fontSize: 16, color: '#2d3748', fontWeight: '500' },
  itemTimestamp: { fontSize: 12, color: '#718096', marginTop: 2 },
  selectionIndicator: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#667eea', alignItems: 'center', justifyContent: 'center' },
  checkmark: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  animationButton: {
    backgroundColor: '#f093fb',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  animationButtonText: { fontSize: 18, color: 'white', fontWeight: 'bold', marginBottom: 4 },
  animationButtonSubtext: { fontSize: 14, color: 'rgba(255,255,255,0.9)', textAlign: 'center' },
});

export default ScrollSwipeScreen;
