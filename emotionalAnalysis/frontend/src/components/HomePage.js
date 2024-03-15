import React, { Component } from 'react';
import CreateProductPage from './CreateProductPage';
import ViewProductPage from './ViewProductPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Router>
                <Routes>
                    <Route path= '/' element={<p>This is the home Page</p>} />
                    <Route path= '/create' element={<CreateProductPage />} />
                    <Route path= '/view' element={<ViewProductPage />} />
                    
                </Routes>
            </Router>
        );
    }
}