import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const donationAmounts = [1, 5, 10];

const TransactionScreen = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  //  amount selection
  const handleAmountPress = (amount: number | 'other') => {
    if (amount === 'other') {
      setSelectedAmount(null);  
      setCustomAmount('');      
      setShowOptions(true);     
    } else {
      setSelectedAmount(amount); 
      setCustomAmount('');       
      setShowOptions(true);       
    }
  };

  const handleOtherInput = (value: string) => {
    setCustomAmount(value);  
    setSelectedAmount(null); 
    setShowOptions(value !== '');  
  };

  const displayAmount = selectedAmount || customAmount;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.wavyLine} />

        {/* Logo */}
        <Image
          source={require('../../assets/images/LotLover_Logo.png')}
          style={styles.logo}
        />

        {/* Message for donations */}
        <Text style={styles.message}>
          At LotLover, we strive to make parking on campus easier and more accessible for everyone. Your donation helps us maintain and improve your experience!
        </Text>

        {/* Amount Selection */}
        <Text style={styles.selectText}>Choose an amount to donate:</Text>
        <View style={styles.amountRow}>
          {donationAmounts.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[
                styles.amountBox,
                selectedAmount === amount && styles.amountBoxSelected,
              ]}
              onPress={() => handleAmountPress(amount)}
            >
              <Text
                style={[
                  styles.amountText,
                  selectedAmount === amount && styles.amountTextSelected,
                ]}
              >
                ${amount}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[
              styles.amountBox,
              customAmount !== '' && styles.amountBoxSelected,
            ]}
            onPress={() => handleAmountPress('other')}
          >
            <Text
              style={[
                styles.amountText,
                customAmount !== '' && styles.amountTextSelected,
              ]}
            >
              Other
            </Text>
          </TouchableOpacity>
        </View>

        {/* Custom Amount Input */}
        {showOptions && selectedAmount === null && (
          <TextInput
            style={styles.input}
            placeholder="Enter custom amount"
            keyboardType="numeric"
            value={customAmount}
            onChangeText={handleOtherInput}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        )}

        {/* Payment Options */}
        {showOptions && (displayAmount || customAmount) && (
          <>
            <Text style={styles.paymentHeader}>
              Donate ${displayAmount} using:
            </Text>

            <View style={styles.paymentRow}>
              {/* Credit Card Option */}
              <TouchableOpacity style={styles.paymentButton}>
                <View style={styles.iconGroup}>
                  <FontAwesome name="cc-visa" size={24} color="#1a1f71" style={styles.cardIcon} />
                  <FontAwesome name="cc-mastercard" size={24} color="#eb001b" style={styles.cardIcon} />
                  <FontAwesome name="cc-amex" size={24} color="#2e77bc" style={styles.cardIcon} />
                </View>
                <Text style={styles.paymentText}>Credit Card</Text>
              </TouchableOpacity>

              {/* PayPal Option */}
              <TouchableOpacity style={styles.paymentButton}>
                <FontAwesome name="cc-paypal" size={24} color="#003087" style={styles.leftIcon} />
                <Text style={styles.paymentText}>PayPal</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: -50,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#023047',
    marginBottom: 100,
    paddingHorizontal: 10,
  },
  selectText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#023047',
  },
  amountRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },
  amountBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  amountBoxSelected: {
    backgroundColor: '#FB8500',
    borderColor: '#FB8500',
  },
  amountText: {
    fontSize: 16,
    color: '#333',
  },
  amountTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  input: {
    width: '60%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#fff', 
  },
  paymentHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    color: '#023047',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minWidth: 150,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#023047',
  },
  leftIcon: {
    marginRight: 10,
  },
  iconGroup: {
    flexDirection: 'row',
    marginRight: 10,
  },
  cardIcon: {
    marginRight: 5,
  },
  wavyLine: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 500,
    backgroundColor: '#8ECAE6', 
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    transform: [{ scaleX: 1.4 }],
    opacity: 1,
  },
});

export default TransactionScreen;
