import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Card, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
    state = { loggedIn: null };
    
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCoEG1o2nM47BaRjjgm9uf5Eg4QMVX3_wQ',
            authDomain: 'auth-6d4bc.firebaseapp.com',
            databaseURL: 'https://auth-6d4bc.firebaseio.com',
            projectId: 'auth-6d4bc',
            storageBucket: 'auth-6d4bc.appspot.com',
            messagingSenderId: '1068919531472',
            appId: '1:1068919531472:web:332a90c4ae71da3c'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) { //logged in
                this.setState({ loggedIn: true });
            } else { //not logged in
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log Out
                            </Button>
                        </CardSection>
                    </Card>
                );
                
            case false:
                return <LoginForm />;

            default:
                return (
                    <View style={styles.loadingStyle}>
                        <Spinner size='large' />
                    </View>
                    
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />

                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    loadingStyle: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default App;
